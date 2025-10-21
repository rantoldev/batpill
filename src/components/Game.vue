<template>
  <div class="relative h-screen w-full overflow-hidden">
    <!-- Welcome / instructions overlay shown before game starts -->
    <div v-if="showWelcome" class="absolute inset-0 z-20 flex items-center justify-center game-welcome">
      <div class="welcome-box p-6 rounded-lg shadow-lg">
        <h2 class="text-4xl font-bold mb-4 text-white">Welcome to PillFly</h2>
        <p class="mb-4 text-white">Collect the suns (sol) to gain points. Avoid rocks and rockets. Use arrow keys or WASD to move. Press Space to pause.</p>
        <p class="mb-6 text-sm text-gray-300">Play as a guest to avoid saving scores, or log in to save your progress.</p>
        <div class="flex items-center justify-center space-x-4 mt-6">
          <template v-if="store.user">
            <button @click="startAsPlayer" class="px-6 py-2 btn-ghost">Play</button>
            <router-link to="/profile" class="px-6 py-2 btn-ghost">Profile</router-link>
          </template>
          <template v-else>
            <button @click="startAsGuest" class="px-6 py-2 btn-ghost">Play as Guest</button>
            <router-link to="/login" class="px-6 py-2 btn-ghost">Login</router-link>
          </template>
        </div>
      </div>
    </div>
    <!-- Player -->
    <img :src="playerImg" class="absolute player-sprite" :style="{ left: `${player.x}px`, top: `${player.y}px` }">
    <!-- Falling items -->
    <img v-for="item in items" :key="item.id" :src="getImg(item.type)" class="absolute item-sprite" :style="{ left: `${item.x}px`, top: `${item.y}px` }">
  <!-- Score: removed left-side overlay. Header will show score centrally. -->
    <!-- Paused -->
    <div v-if="paused" class="absolute inset-0 flex items-center justify-center z-30">
      <div class="paused-card text-center">
        <div class="paused-title">PAUSED</div>
        <div class="paused-sub">Press SPACE to continue</div>
      </div>
    </div>
    <!-- Game Over -->
    <div v-if="gameOver" class="absolute inset-0 flex items-center justify-center">
      <div class="welcome-box text-center p-8">
        <div class="text-4xl font-bold mb-4">
          Game Over{{ store.user ? ', ' + (store.user.username || store.user.email) : '!' }}
        </div>
        <div class="text-2xl mt-4 mb-6">Score: {{ score }}</div>
        <div class="flex items-center justify-center space-x-6">
          <button @click="restart" class="btn-ghost px-8 py-3">Restart</button>
          <button @click="goHome" class="btn-ghost px-8 py-3">Home</button>
          <button @click="shareOnX" class="btn-ghost px-6 py-3">Share on X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '../firebase'
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { store } from '../store'

export default {
  data() {
    return {
  // Position player at requested default coordinates (fixed px values)
  player: { x: 920, y: 725 },
      items: [],
      score: 0,
  // Dynamic speeds (base values)
  baseItemSpeed: 2,
  basePlayerSpeed: 6,
      paused: false,
      gameOver: false,
      showWelcome: true,
      guestMode: false,
      gameLoop: null,
      spawnLoop: null,
  idCounter: 0,
      keys: {},
      localMedals: 0,
      store,
      autopilotEnabled: false,
      autopilotConfig: {
        safetyMinPx: 80,           // minimum desired clearance in px
        fixedSpriteSizes: false,   // if true, use fixed sizes below instead of CSS vars
        fixedPlayerW: 300,         // fixed player sprite width when fixedSpriteSizes=true
        fixedItemW: 300,           // fixed item sprite width when fixedSpriteSizes=true
        predictionTime: 1.2,       // seconds to simulate into the future
        predictionStep: 0.12       // simulation time step
      }
  ,
      // audio objects (will be created on mounted)
      audio: {
        start: null,
        collect: null,
        medal: null,
        gameover: null
      },
      // smoothed patrol position to avoid rapid oscillation
      patrolXSmoothed: window.innerWidth * 0.5,
      // timer id for auto-restart when autopilot was active at game over
      autorestartTimer: null
    }
  },
  computed: {
    playerImg() {
      return new URL('@/gif/pillfly.gif', import.meta.url).href
    }
  },
  methods: {
    getImg(type) {
      if (type === 'sol') return new URL('@/gif/sol.gif', import.meta.url).href
      if (type === 'rock') return new URL('@/gif/rock.gif', import.meta.url).href
      if (type === 'rocket') return new URL('@/gif/rocket.gif', import.meta.url).href
    },
    startGame() {
      // Reset dynamic speeds
      this.baseItemSpeed = 2
      this.basePlayerSpeed = 6
      this.gameLoop = setInterval(this.update, 20)
      this.spawnLoop = setInterval(this.spawnItem, 500)
      // play start sound
      if (this.audio.start) try { this.audio.start.currentTime = 0; this.audio.start.play(); } catch(e){}
    },
    startAsPlayer() {
      this.guestMode = false
      this.showWelcome = false
      // reset live store score for header
      store.setScore(0)
      this.startGame()
    },
    startAsGuest() {
      this.guestMode = true
      this.showWelcome = false
      // reset live store score for header
      store.setScore(0)
      this.startGame()
    },
    spawnItem() {
      if (this.paused || this.gameOver) return
      // Bias towards spawning 'sol' to keep the game populated with items for autopilot
  const r = Math.random()
  let type = 'sol'
  // Make hazards (rock/rocket) more frequent than sols
  // r < 0.30 -> sol (30%), 0.30 <= r < 0.75 -> rock (45%), r >= 0.75 -> rocket (25%)
  if (r < 0.30) type = 'sol'
  else if (r < 0.75) type = 'rock'
  else type = 'rocket'
      const itemWidth = 60 // match --item-width default
      // Scale item speed earlier: every 8 points increase speed multiplier
      const speedIncreaseSteps = Math.floor(this.score / 8)
      const itemSpeed = this.baseItemSpeed + speedIncreaseSteps * 0.9 + Math.random() * 1.8
      this.items.push({
        id: this.idCounter++,
        type,
        x: Math.random() * (window.innerWidth - itemWidth),
        y: -itemWidth, // Start off top
        speed: itemSpeed
      })
    },

    spawnSol() {
      // Force spawn a sol at a random X position with itemSpeed tuned
      const itemWidth = 60
      const speedIncreaseSteps = Math.floor(this.score / 8)
      const itemSpeed = this.baseItemSpeed + speedIncreaseSteps * 0.9 + Math.random() * 1.2
      this.items.push({ id: this.idCounter++, type: 'sol', x: Math.random() * (window.innerWidth - itemWidth), y: -itemWidth, speed: itemSpeed })
    },
    update() {
      if (this.paused || this.gameOver) return

      // Move player
  // Player speed increases earlier: every 6 points
  const playerSpeedIncreaseSteps = Math.floor(this.score / 6)
  const speed = this.basePlayerSpeed + playerSpeedIncreaseSteps * 1.0

      if (this.autopilotEnabled) {
        // Silent autopilot: no toast messages when started
        // Use CSS vars to size things correctly
  const cssItemW = this.autopilotConfig.fixedSpriteSizes ? this.autopilotConfig.fixedItemW : (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--item-width')) || 60)
  const cssPlayerW = this.autopilotConfig.fixedSpriteSizes ? this.autopilotConfig.fixedPlayerW : (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--player-width')) || 80)

        // Vertical play-zone for autopilot: stay between topLimit and bottomLimit
        const topLimit = Math.max(8, Math.floor(window.innerHeight * 0.08)) // don't go too close to header
        const bottomLimit = Math.floor(window.innerHeight * 0.7) // stay within top 70% of screen

  // safety distance: never get closer than 80px to a hazard's visual box (plus sprite scaling)
  const safetyDistance = Math.max(80 + Math.floor((cssItemW + cssPlayerW) * 0.5), 120)

        // helper: predict if a given sol is safe to go after
        const isSolSafe = (sol) => {
          // don't chase sols that are too high (near header) or too low outside play zone
          if (sol.y < topLimit || sol.y > bottomLimit) return false

          // simulate hazards forward in steps and ensure none come within safetyDistance of the sol position
          const hazards = this.items.filter(it => it.type !== 'sol')
          const steps = Math.max(1, Math.floor(this.autopilotConfig.predictionTime / this.autopilotConfig.predictionStep))
          for (let step = 0; step <= steps; step++) {
            const t = step * this.autopilotConfig.predictionStep
            for (const h of hazards) {
              const predictedY = h.y + (h.speed || 0) * t
              const predictedX = h.x
              const dxh = predictedX - sol.x
              const dyh = predictedY - sol.y
              const distToSolAtArrival = Math.sqrt(dxh * dxh + dyh * dyh)
              if (distToSolAtArrival < safetyDistance) return false
            }
          }
          return true
        }

        // select nearest safe sol
        const sols = this.items.filter(it => it.type === 'sol')
        let best = null
        for (const s of sols) {
          const dx = s.x - this.player.x
          const dy = s.y - this.player.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (!best || dist < best.dist) {
            if (isSolSafe(s)) best = { item: s, dist }
          }
        }

        // steering with repulsion from hazards to maintain safetyDistance
        const repel = { x: 0, y: 0 }
        const hazards = this.items.filter(it => it.type !== 'sol')
        for (const h of hazards) {
          const hx = h.x + (cssItemW / 2)
          const hy = h.y + (cssItemW / 2)
          const px = this.player.x + (cssPlayerW / 2)
          const py = this.player.y + (cssPlayerW / 2)
          const dx = px - hx
          const dy = py - hy
          const d = Math.sqrt(dx * dx + dy * dy) || 0.001
          const avoidRadius = safetyDistance + 60 // start repelling earlier and stronger
          if (d < avoidRadius) {
            // repulsion strength increases as we get closer
            const strength = (avoidRadius - d) / avoidRadius
            repel.x += (dx / d) * strength
            repel.y += (dy / d) * strength
          }
        }

        if (best) {
          // target is safe; steer toward it while applying repulsion
          const targetX = Math.max(0, Math.min(window.innerWidth - cssPlayerW, best.item.x))
          const targetY = Math.max(topLimit, Math.min(bottomLimit, best.item.y))
          const toTarget = { x: targetX - this.player.x, y: targetY - this.player.y }
          const toDist = Math.sqrt(toTarget.x * toTarget.x + toTarget.y * toTarget.y) || 0.001

          // combine attract and repel vectors
          const attractWeight = 1.0
          const repelWeight = 1.6
          const combined = {
            x: (toTarget.x / toDist) * attractWeight + repel.x * repelWeight,
            y: (toTarget.y / toDist) * attractWeight + repel.y * repelWeight
          }
          let combinedMag = Math.sqrt(combined.x * combined.x + combined.y * combined.y) || 0.001

          // if combinedVec is very small (stall), perform an urgent evade away from nearest hazard
          if (combinedMag < 0.12) {
            // find nearest hazard and produce an urgent away vector
            let nearest = null
            for (const h of hazards) {
              const hx = h.x + (cssItemW / 2)
              const hy = h.y + (cssItemW / 2)
              const px = this.player.x + (cssPlayerW / 2)
              const py = this.player.y + (cssPlayerW / 2)
              const dx = px - hx
              const dy = py - hy
              const d = Math.sqrt(dx * dx + dy * dy) || 0.001
              if (!nearest || d < nearest.d) nearest = { dx, dy, d }
            }
            if (nearest) {
              combined.x = (nearest.dx / nearest.d) * 1.8
              combined.y = (nearest.dy / nearest.d) * 1.8
              combinedMag = Math.sqrt(combined.x * combined.x + combined.y * combined.y)
            }
          }

          const moveSpeed = Math.min(speed * 1.8, 12)
          let nx = (combined.x / combinedMag) * moveSpeed
          let ny = (combined.y / combinedMag) * moveSpeed

          // tiny jitter if movement is extremely small to avoid stalling
          if (Math.abs(nx) < 0.6 && Math.abs(ny) < 0.6) {
            nx += (Math.random() - 0.5) * 1.2
            ny += (Math.random() - 0.5) * 1.2
          }

          // apply movement but clamp into play zone and bounds
          this.player.x = Math.max(0, Math.min(window.innerWidth - cssPlayerW, this.player.x + nx))
          this.player.y = Math.max(topLimit, Math.min(bottomLimit, this.player.y + ny))
        } else {
          // no safe sol: actively evade hazards and perform a gentle patrol inside the play zone
          const moveSpeed = Math.min(speed * 1.2, 10)

          // compute repulsion vector from hazards
          let repelHold = { x: 0, y: 0 }
          let nearestHazard = null
          for (const h of hazards) {
            const hx = h.x + (cssItemW / 2)
            const hy = h.y + (cssItemW / 2)
            const px = this.player.x + (cssPlayerW / 2)
            const py = this.player.y + (cssPlayerW / 2)
            const dx = px - hx
            const dy = py - hy
            const d = Math.sqrt(dx * dx + dy * dy) || 0.001
            const avoidRadius = safetyDistance + 60
            if (!nearestHazard || d < nearestHazard.d) nearestHazard = { dx, dy, d }
            if (d < avoidRadius) {
              const strength = (avoidRadius - d) / avoidRadius
              repelHold.x += (dx / d) * strength
              repelHold.y += (dy / d) * strength
            }
          }

          // Patrol target slowly moves left-right across middle of play zone; smooth it to avoid jitter
          const patrolX = window.innerWidth * (0.3 + 0.4 * (0.5 + 0.5 * Math.sin(Date.now() / 1200)))
          const patrolY = topLimit + (bottomLimit - topLimit) * 0.5
          this.patrolXSmoothed = (this.patrolXSmoothed || window.innerWidth * 0.5) * 0.9 + patrolX * 0.1
          const toPatrolX = this.patrolXSmoothed - this.player.x
          const toPatrolY = patrolY - this.player.y
          const distPatrol = Math.sqrt(toPatrolX * toPatrolX + toPatrolY * toPatrolY) || 0.001

          // combine patrol and repel, prioritizing repel
          const combinedHold = { x: repelHold.x * 1.6 + (toPatrolX / distPatrol) * 0.8, y: repelHold.y * 1.6 + (toPatrolY / distPatrol) * 0.8 }
          const chMag = Math.sqrt(combinedHold.x * combinedHold.x + combinedHold.y * combinedHold.y) || 0.001
          // if repel is significant, scale movement by repel magnitude so we react strongly
          this.player.x += (combinedHold.x / chMag) * moveSpeed
          this.player.y += (combinedHold.y / chMag) * moveSpeed

          // ensure within play zone
          this.player.x = Math.max(0, Math.min(window.innerWidth - cssPlayerW, this.player.x))
          this.player.y = Math.max(topLimit, Math.min(bottomLimit, this.player.y))
        }
      } else {
        // Manual controls
        if (this.keys['ArrowLeft'] || this.keys['a']) this.player.x -= speed
        if (this.keys['ArrowRight'] || this.keys['d']) this.player.x += speed
        if (this.keys['ArrowUp'] || this.keys['w']) this.player.y -= speed
        if (this.keys['ArrowDown'] || this.keys['s']) this.player.y += speed
      }

      // Player bounds (prevent going below footer)
      const playerW = 80
      const playerH = 80
      const footerHeight = 40 // Approximate footer height based on p-2 and text
      this.player.x = Math.max(0, Math.min(window.innerWidth - playerW, this.player.x))
      this.player.y = Math.max(0, Math.min(window.innerHeight - playerH - footerHeight, this.player.y))

      // Move items down
      this.items.forEach(item => { item.y += item.speed })

      // Remove off-screen items
      this.items = this.items.filter(item => item.y < window.innerHeight + 30)

      // Ensure at least a couple of sols exist so autopilot always has targets
      const activeSols = this.items.filter(it => it.type === 'sol' && it.y >= -120)
      const minSols = 2
      if (activeSols.length < minSols) {
        for (let i = 0; i < (minSols - activeSols.length); i++) this.spawnSol()
      }

  // Check collisions using Axis-Aligned Bounding Box (AABB) to ensure true overlap
      // define a smaller inner hitbox to avoid collisions caused by transparent sprite edges
      const hitboxInsetX = 8
      const hitboxInsetY = 8
      const pLeft = this.player.x + hitboxInsetX
      const pTop = this.player.y + hitboxInsetY
      const pRight = this.player.x + playerW - hitboxInsetX
      const pBottom = this.player.y + playerH - hitboxInsetY

      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i]
  // Use CSS variable to match visual size (fallback to 60)
  const itemW = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--item-width')) || 60
  const itemH = itemW
        const iLeft = item.x
        const iTop = item.y
        const iRight = item.x + itemW
        const iBottom = item.y + itemH

  // tighten the detected collision box by inset values to ignore gif transparent margins
  const insetX = Math.min(14, Math.floor(itemW * 0.25))
  const insetY = Math.min(14, Math.floor(itemH * 0.25))
  const iLeftT = iLeft + insetX
  const iTopT = iTop + insetY
  const iRightT = iRight - insetX
  const iBottomT = iBottom - insetY

  const overlap = !(pRight < iLeftT || pLeft > iRightT || pBottom < iTopT || pTop > iBottomT)
        if (overlap) {
            if (item.type === 'sol') {
            this.score += 1
            store.setScore(this.score)
            // play collect sound
            if (this.audio.collect) try { this.audio.collect.currentTime = 0; this.audio.collect.play(); } catch(e){}
            const medalsNow = Math.floor(this.score / 20)
            if (medalsNow > this.localMedals) {
              const delta = medalsNow - this.localMedals
              this.localMedals = medalsNow
              this.saveMedals(medalsNow)
              store.showToast(`Congratulations — you earned ${delta} new medal${delta > 1 ? 's' : ''}! Total medals ${medalsNow}.`, delta)
              // play medal sound
              if (this.audio.medal) try { this.audio.medal.currentTime = 0; this.audio.medal.play(); } catch(e){}
            }
            this.items.splice(i, 1)
            } else {
            this.gameOver = true
            // play game over sound
            if (this.audio.gameover) try { this.audio.gameover.currentTime = 0; this.audio.gameover.play(); } catch(e){}
            this.saveScore()
            // if autopilot was active, auto-restart after 3s
            if (this.autopilotEnabled) {
              if (this.autorestartTimer) clearTimeout(this.autorestartTimer)
              this.autorestartTimer = setTimeout(() => {
                this.autorestartTimer = null
                this.restart()
              }, 3000)
            }
          }
        }
      }
    },
    async saveScore() {
      const user = auth.currentUser
      if (this.guestMode) return
      if (user) {
        const ref = doc(db, 'users', user.uid)
        const snap = await getDoc(ref)
        const current = snap.data()?.totalScore || 0
        const total = current + this.score
        await updateDoc(ref, { totalScore: total, medals: Math.floor(total / 20) })
        store.user = Object.assign({}, store.user, { totalScore: total, medals: Math.floor(total / 20) })
      }
    },
    async saveMedals(medals) {
      const user = auth.currentUser
      if (!user) return
      const ref = doc(db, 'users', user.uid)
      try {
        await updateDoc(ref, { medals })
        store.user = Object.assign({}, store.user, { medals })
      } catch (e) {
        await setDoc(ref, { username: user.displayName || user.email, totalScore: this.score, medals })
        store.user = Object.assign({}, store.user, { medals, totalScore: this.score })
      }
    },
    restart() {
      clearInterval(this.gameLoop)
      clearInterval(this.spawnLoop)
      if (this.autorestartTimer) { clearTimeout(this.autorestartTimer); this.autorestartTimer = null }
      this.player = { x: 920, y: 725 }
      this.items = []
      this.score = 0
      this.baseItemSpeed = 2
      this.basePlayerSpeed = 6
      // ensure header reflects reset score
      store.setScore(0)
      this.gameOver = false
      this.paused = false
      if (this.showWelcome) return
      this.startGame()
    },
    handleKeyDown(e) {
      // If autopilot is active, ignore manual movement keys (but allow toggling autopilot with 'l' and pausing with Space)
      if (this.autopilotEnabled && e.key.toLowerCase() !== 'l' && e.key !== ' ') {
        return
      }

      this.keys[e.key] = true
      if (e.key === ' ') {
        // If welcome screen is showing, use Space to start (as logged-in player or guest)
        if (this.showWelcome) {
          if (this.store && this.store.user) this.startAsPlayer()
          else this.startAsGuest()
          return
        }
        // If game over, restart the game
        if (this.gameOver) {
          this.restart()
          return
        }
        // Otherwise toggle pause when in-game
        this.paused = !this.paused
      } else if (e.key.toLowerCase() === 'l') {
        // If on the welcome screen, pressing 'l' should START the game and enable autopilot
        if (this.showWelcome) {
          this.autopilotEnabled = true
          // start silently from welcome (no toast)
          if (this.store && this.store.user) this.startAsPlayer()
          else this.startAsGuest()
          return
        }

  // Otherwise toggle autopilot during gameplay (silent)
  this.autopilotEnabled = !this.autopilotEnabled
      }
    },
    handleKeyUp(e) {
      this.keys[e.key] = false
    },
    goHome() {
      // stop gameplay and show welcome overlay
      clearInterval(this.gameLoop)
      clearInterval(this.spawnLoop)
      if (this.autorestartTimer) { clearTimeout(this.autorestartTimer); this.autorestartTimer = null }
      this.gameLoop = null
      this.spawnLoop = null
      this.autopilotEnabled = false
      this.gameOver = false
      this.paused = false
      this.showWelcome = true
      // ensure score reset in header
      store.setScore(0)
      // navigate root route (router's Game component shows welcome when showWelcome=true)
      this.$router.push('/')
    }
    ,
    shareOnX() {
      const username = (this.store.user && this.store.user.username) ? this.store.user.username : 'mbuser'
      const text = `I'm ${username} and I collected ${this.score} scores in #PillFly`
      // try to generate an image and share it
      import('../utils/share').then(async mod => {
        try {
          const blob = await mod.generateShareImage({ username, score: this.score, medals: this.localMedals })
          await mod.shareImageAndText({ text, blob })
        } catch (e) {
          const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`
          window.open(url, '_blank')
        }
      })
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
    // initialize audio elements (use absolute paths provided)
    try {
      this.audio.start = new Audio(new URL('@/sound/start-wav.wav', import.meta.url).href)
      this.audio.collect = new Audio(new URL('@/sound/earn-wav.wav', import.meta.url).href)
      this.audio.medal = new Audio(new URL('@/sound/medal-wav.wav', import.meta.url).href)
      this.audio.gameover = new Audio(new URL('@/sound/gameover-wav.wav', import.meta.url).href)
      // small preloads
      this.audio.start.preload = 'auto'
      this.audio.collect.preload = 'auto'
      this.audio.medal.preload = 'auto'
      this.audio.gameover.preload = 'auto'
    } catch (e) {}
    const user = auth.currentUser
    if (user) {
      const ref = doc(db, 'users', user.uid)
      getDoc(ref).then(async snap => {
        const data = snap.exists() ? snap.data() : null
        if (!data) {
          // create a minimal doc with email so it's visible in Firestore console
          try { await setDoc(ref, { username: user.email, email: user.email, totalScore: 0, medals: 0 }) } catch(e){}
          store.user = Object.assign({}, store.user, { username: user.email, totalScore: 0, medals: 0 })
        } else {
          this.localMedals = data.medals || Math.floor((data.totalScore || 0) / 20)
          store.user = Object.assign({}, store.user, { username: data.username, totalScore: data.totalScore || 0, medals: this.localMedals, email: data.email || user.email })
        }
      }).catch(() => {})
    }
    // ensure header shows the current (initially zero) score when component mounts
    store.setScore(this.score)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    clearInterval(this.gameLoop)
    clearInterval(this.spawnLoop)
  }
}
</script>

<style scoped>
.welcome-box {
  max-width: 500px;
  text-align: center;
}
.btn-dark {
  background: #1f8a4a;
  color: #fff;
  border-radius: 6px;
}
/* Ghost button: transparent background, white border, animated in/out border on hover */
.btn-ghost {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.9);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  transition: color 150ms ease;
}
.btn-ghost::before {
  content: '';
  position: absolute;
  left: -110%;
  top: 0;
  width: 110%;
  height: 100%;
  background: rgba(255,255,255,0.06);
  transform: skewX(-12deg);
  transition: left 300ms ease;
}
.btn-ghost:hover::before{
  left: 0;
}
.btn-ghost:hover{
  color: #fff;
}

.welcome-box{
  max-width: 640px;
  width: 60%;
  text-align: center;
  border: 2px solid rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.0); /* fully transparent background */
  padding: 32px;
}

/* Paused card styling */
.paused-card{
  background: rgba(0,0,0,0.7);
  padding: 36px 48px;
  border-radius: 10px;
  border: 2px solid rgba(255,255,255,0.9);
  color: #fff;
}
.paused-title{
  font-size: 48px;
  letter-spacing: 2px;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 12px;
  /* Graffiti-like look: use a heavier font if available; fallback to system bold */
  font-family: 'Impact', 'Arial Black', sans-serif;
}
.paused-sub{
  font-size: 16px;
  opacity: 0.95;
}
.player-sprite {
  width: var(--player-width, 80px);
  height: var(--player-width, 80px);
}
.item-sprite {
  width: var(--item-width, 60px);
  height: var(--item-width, 60px);
}
</style>