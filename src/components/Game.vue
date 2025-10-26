<template>
<div class="relative h-screen w-full overflow-hidden">
<!-- Welcome / instructions overlay shown before game starts -->
<div v-if="showWelcome" class="absolute inset-0 z-20 flex items-center justify-center ">
<div class="welcome-box p-6 rounded-lg shadow-lg">
<h2 class="text-4xl font-bold mb-4 text-white">Welcome to batpill</h2>
<p class="mb-4 text-white">Welcome to batpill. Collect the b-points to gain scores. Avoid rocks and rockets. Use arrow keys or WASD to move. Press Space to pause.</p>
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
Game Over{{ store.user ? ', ' + gameOverName : '!' }}
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
  // touch control state for mobile
  touchActive: false,
  lastTouchX: 0,
  lastTouchY: 0,
  touchId: null,
  // base medals loaded from DB at mount; session medals are added on top
  initialMedalsBase: 0,
store,
autopilotEnabled: false,
// Autopilot tuning and state
autopilotConfig: {
safetyMinPx: 1,            // pro-level minimum clearance - allows very close passes
fixedSpriteSizes: false,   // if true, use fixed sizes below instead of CSS vars
fixedPlayerW: 300,         // fixed player sprite width when fixedSpriteSizes=true
fixedItemW: 300,           // fixed item sprite width when fixedSpriteSizes=true
predictionTime: 5.0,       // longer prediction for better planning
predictionStep: 0.1,       // finer steps for accurate simulation
targetLockTime: 800        // slightly longer lock for stability
  ,ignoreBottomPct: 0.08     // ignore b-points within bottom X% of screen (0.08 = 8%)
    ,hazardClearance: 60       // min px between intercept point and hazards to consider safe
},
autopilotTargetId: null,
autopilotTargetLockedAt: 0,
// runtime autopilot state
playerVel: { x: 0, y: 0 },
autopilotRuntime: {
  // tuned for smooth, confident movement
  maxSpeed: 14,      // fast but controllable
  minSpeed: 6,       // baseline speed
  accelLerp: 0.18,   // smooth acceleration (lower => smoother)
  turnLerp: 0.12,    // graceful turning
  jitterDeadzone: 0.3 // small deadzone to remove micro-jitters
},

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
  // flag to ensure Game Over overlay shows during auto-restart window
  showGameOverOverlay: false,
  computed: {
    playerImg() {
      return new URL('@/images/batpill.png', import.meta.url).href
    },
    // name to display on Game Over: prefer saved username, then displayName, then email local-part
    gameOverName() {
      try {
        if (this.store && this.store.user) {
          const u = this.store.user.username || this.store.user.displayName || (this.store.user.email ? this.store.user.email.split('@')[0] : null)
          if (u) return u
        }
        const cu = auth.currentUser
        if (cu) return cu.displayName || (cu.email ? cu.email.split('@')[0] : 'Player')
      } catch (e) {
        // fallback
      }
      return 'Player'
    }
  },
methods: {
getImg(type) {
// keep using the existing b-point asset for visuals but items are called 'b-point' in UI
if (type === 'b-point') return new URL('@/images/b-point.png', import.meta.url).href
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
    // Touch controls: map finger movement to player movement (drag-ish)
    handleTouchStart(e) {
      // don't begin touch control if game isn't active
      if (this.gameOver || this.showWelcome || this.paused) return
      if (!e.touches || e.touches.length === 0) return
      const t = e.touches[0]
      this.touchActive = true
      this.touchId = t.identifier
      this.lastTouchX = t.clientX
      this.lastTouchY = t.clientY
    },
    handleTouchMove(e) {
      // block movement when game isn't active
      if (this.gameOver || this.showWelcome || this.paused) return
      if (!this.touchActive) return
      // find our touch
      let t = null
      for (let i = 0; i < e.touches.length; i++) {
        if (this.touchId == null || e.touches[i].identifier === this.touchId) { t = e.touches[i]; break }
      }
      if (!t) return
      // compute delta
      const dx = t.clientX - this.lastTouchX
      const dy = t.clientY - this.lastTouchY
      // apply as movement - scale down to feel natural
      const scale = Math.min(1.0, (window.innerWidth < 640 ? 0.6 : 1.0))
      this.player.x += dx * scale
      this.player.y += dy * scale
      // clamp to play area
      const playerW = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--player-width')) || 64
      const footerHeight = 40
      this.player.x = Math.max(0, Math.min(window.innerWidth - playerW, this.player.x))
      this.player.y = Math.max(0, Math.min(window.innerHeight - playerW - footerHeight, this.player.y))
      this.lastTouchX = t.clientX
      this.lastTouchY = t.clientY
      // prevent page scrolling while interacting with game
      try { e.preventDefault() } catch (err) {}
    },
    handleTouchEnd(e) {
      this.touchActive = false
      this.touchId = null
    },
startAsPlayer() {
this.guestMode = false
this.showWelcome = false
this.gameOver = false
this.paused = false
// center player for current viewport (better for mobile)
this.player = { x: Math.max(20, Math.floor(window.innerWidth / 2) - 40), y: Math.max(60, Math.floor(window.innerHeight / 2) - 40) }
this.items = []
this.score = 0
// reset live store score for header
store.setScore(0)
this.startGame()
},
startAsGuest() {
this.guestMode = true
this.showWelcome = false
this.gameOver = false
this.paused = false
// center player for current viewport (better for mobile)
this.player = { x: Math.max(20, Math.floor(window.innerWidth / 2) - 40), y: Math.max(60, Math.floor(window.innerHeight / 2) - 40) }
this.items = []
this.score = 0
// reset live store score for header
store.setScore(0)
this.startGame()
},
spawnItem() {
if (this.paused || this.gameOver) return
// Bias towards spawning 'sol' to keep the game populated with items for autopilot
const r = Math.random()
// Make hazards (rock/rocket) more frequent than sols
// r < 0.30 -> sol (30%), 0.30 <= r < 0.75 -> rock (45%), r >= 0.75 -> rocket (25%)
let type = 'b-point'
if (r < 0.30) type = 'b-point'
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
// Force spawn a b-point at a random X position with itemSpeed tuned
const itemWidth = 60
const speedIncreaseSteps = Math.floor(this.score / 8)
const itemSpeed = this.baseItemSpeed + speedIncreaseSteps * 0.9 + Math.random() * 1.2
this.items.push({ id: this.idCounter++, type: 'b-point', x: Math.random() * (window.innerWidth - itemWidth), y: -itemWidth, speed: itemSpeed })
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
const bottomLimit = window.innerHeight - 120 // allow going lower to collect items near bottom

// safety distance baseline — increase to keep a safer buffer from hazards
const safetyDistance = 100

// helper: predict if a given b-point is safe and feasible to collect
const isSolSafe = (sol) => {
// treat b-points that are above topLimit as not worth chasing
if (sol.y < topLimit) return false

// allow b-points near bottom if the autopilot simulation shows a safe intercept
const hazards = this.items.filter(it => it.type !== 'b-point')

// Simulation parameters
const dt = this.autopilotConfig.predictionStep
const maxT = this.autopilotConfig.predictionTime
const steps = Math.floor(maxT / dt) + 1
const maxSpeed = this.autopilotRuntime.maxSpeed
const collectRadius = Math.max(28, (cssPlayerW + cssItemW) * 0.3)
const minSafeDist = Math.max(this.autopilotConfig.safetyMinPx, 6)
const simLerp = 0.25  // gradual acceleration in simulation

let simX = this.player.x
let simY = this.player.y
let simVelX = this.playerVel.x
let simVelY = this.playerVel.y

for (let step = 0; step <= steps; step++) {
const t = step * dt

// predict b-point position at time t
const solPredX = sol.x
const solPredY = sol.y + sol.speed * t

// if b-point has fallen off screen, it's no longer collectible
if (solPredY > window.innerHeight + 30) return false

// direction from sim player to predicted b-point
const dx = solPredX - simX
const dy = solPredY - simY
const dist = Math.hypot(dx, dy) || 0.001

const desiredVX = (dx / dist) * maxSpeed
const desiredVY = (dy / dist) * maxSpeed

simVelX = simVelX * (1 - simLerp) + desiredVX * simLerp
simVelY = simVelY * (1 - simLerp) + desiredVY * simLerp

simX += simVelX * dt
simY += simVelY * dt

// check if we've reached collect range
const remain = Math.hypot(solPredX - simX, solPredY - simY)
if (remain <= collectRadius) return true

// pro-level hazard checking - allow very close passes but never collide
for (const h of hazards) {
// Precise hazard prediction
const hPredX = h.x
const hPredY = h.y + h.speed * t
const d = Math.hypot(hPredX - simX, hPredY - simY)

// Allow extremely close passes (1px) but NEVER collide
if (d < minSafeDist) return false
}
}

// if simulation didn't reach the b-point within the prediction window, treat as unsafe
return false
}

// select best feasible b-point using a scoring function (distance + time-to-catch + risk)
const bottomIgnoreY = window.innerHeight * (1 - (this.autopilotConfig.ignoreBottomPct || 0.08))
// filter out b-points that are too close to the bottom (about to disappear)
const sols = this.items.filter(it => it.type === 'b-point' && (it.y <= bottomIgnoreY))
let best = null
const evaluateSol = (s) => {
  // quick reject if it's above the header
  if (s.y < topLimit) return null
  // ignore b-points that are within the bottom ignore area (almost disappearing)
  if (s.y > bottomIgnoreY) return null

  // Interception-style, permissive feasibility check:
  // Compute time until b-point falls off screen and estimated time for player to reach it.
  const hazardsLocal = this.items.filter(it => it.type !== 'b-point')
  const maxSpeedSim = Math.max(6, this.autopilotRuntime.maxSpeed || 14)
  const solSpeed = Math.max(0.01, s.speed || 0)
  const timeUntilOff = (window.innerHeight - s.y) / solSpeed
  const dx0 = s.x - this.player.x
  const dy0 = s.y - this.player.y
  const dist0 = Math.hypot(dx0, dy0)
  const estimatedTimeToReach = dist0 / maxSpeedSim
  // if we can't reach before it disappears, skip
  if (estimatedTimeToReach > timeUntilOff + 0.25) return null

  // choose intercept time (earliest reasonable)
  const interceptT = Math.min(estimatedTimeToReach, timeUntilOff)
  const solPredX = s.x
  const solPredY = s.y + solSpeed * interceptT
  // if the predicted intercept is inside the ignored bottom area, don't attempt
  if (solPredY > bottomIgnoreY) return null

  // check hazards at intercept time; only abort if a hazard will be almost exactly where the b-point will be
  let minHazardDist = Infinity
  for (const h of hazardsLocal) {
    const hPredX = h.x
    const hPredY = h.y + (h.speed || 0) * interceptT
    const d = Math.hypot(hPredX - solPredX, hPredY - solPredY)
    if (d < minHazardDist) minHazardDist = d
    // if a hazard will be closer than configured clearance, abort
    const clearance = this.autopilotConfig.hazardClearance || 60
    if (d < clearance) return null
  }

  // score quicker intercepts higher; prefer closer items
  const score = 1 / (0.01 + interceptT)
  return { score, time: interceptT, minHazardDist }
}

// If nothing feasible was found, we'll fall back to chasing the nearest visible b-point
for (const s of sols) {
  const res = evaluateSol(s)
  if (res) {
    if (!best || res.score > best.score) best = { item: s, score: res.score }
  }
}

// If we didn't find a feasible target, fall back to nearest b-point (aggressive behavior)
if (!best) {
  // consider any visible b-point but prefer those not in the ignored bottom region
  let nearest = null
  for (const s of this.items.filter(it => it.type === 'b-point')) {
  // skip b-points that are already in the bottom ignore area
    if (s.y > bottomIgnoreY) continue
    const dx = s.x - this.player.x
    const dy = s.y - this.player.y
    const dist = Math.hypot(dx, dy)
    if (!nearest || dist < nearest.dist) nearest = { item: s, dist }
  }
  // if we still didn't find anything (all sols are in the bottom area), allow nearest as fallback
  if (!nearest) {
    let fallback = null
  for (const s of this.items.filter(it => it.type === 'b-point')) {
      const dx = s.x - this.player.x
      const dy = s.y - this.player.y
      const dist = Math.hypot(dx, dy)
      if (!fallback || dist < fallback.dist) fallback = { item: s, dist }
    }
    if (fallback) best = { item: fallback.item, score: 0.0005 }
  } else {
    best = { item: nearest.item, score: 0.001 }
  }
}

// Prefer locked target unless new one is clearly better (small hysteresis)
if (this.autopilotTargetId && best) {
  const locked = this.items.find(it => it.id === this.autopilotTargetId)
  if (locked) {
    const lockedRes = evaluateSol(locked)
    if (lockedRes && best.score <= lockedRes.score * 1.03) {
      best = { item: locked, score: lockedRes.score }
    }
  }
}

// Target locking: if a target is already selected recently and still exists, prefer it for decisiveness
if (this.autopilotTargetId) {
const locked = this.items.find(it => it.id === this.autopilotTargetId)
const now = Date.now()
if (locked && (now - this.autopilotTargetLockedAt) < this.autopilotConfig.targetLockTime) {
best = { item: locked, dist: Math.hypot(locked.x - this.player.x, locked.y - this.player.y) }
} else {
// clear stale lock
this.autopilotTargetId = null
this.autopilotTargetLockedAt = 0
}
}

// steering with repulsion from hazards to maintain safetyDistance
const repel = { x: 0, y: 0 }
const hazards = this.items.filter(it => it.type !== 'b-point')
for (const h of hazards) {
const hx = h.x + (cssItemW / 2)
const hy = h.y + (cssItemW / 2)
const px = this.player.x + (cssPlayerW / 2)
const py = this.player.y + (cssPlayerW / 2)
const dx = px - hx
const dy = py - hy
const d = Math.hypot(dx, dy) || 0.001
const avoidRadius = safetyDistance + 160 // start repelling much earlier for safety
if (d < avoidRadius) {
  // repulsion strength increases as we get closer (non-linear)
  const closeness = Math.max(0, (avoidRadius - d) / avoidRadius)
  const strength = Math.pow(closeness, 1.6) * 3.5 // stronger non-linear repulsion
  repel.x += (dx / d) * strength
  repel.y += (dy / d) * strength
}
}

// compute combined attract/repel and produce a desired velocity
if (best) {
// lock target
this.autopilotTargetId = best.item.id
this.autopilotTargetLockedAt = Date.now()
// target is safe; form a desired velocity toward the target while applying repulsion
const targetX = Math.max(0, Math.min(window.innerWidth - cssPlayerW, best.item.x))
// allow going lower to chase
const targetY = Math.max(topLimit, best.item.y)
const toTarget = { x: targetX - this.player.x, y: targetY - this.player.y }
const toDist = Math.hypot(toTarget.x, toTarget.y) || 0.001

// smooth but decisive vector combination
const attractWeight = 3.0  // stronger attraction
const repelWeight = 1.5    // stronger repulsion for better avoidance
const combined = {
x: (toTarget.x / toDist) * attractWeight + repel.x * repelWeight,
y: (toTarget.y / toDist) * attractWeight + repel.y * repelWeight
}
let combinedMag = Math.hypot(combined.x, combined.y) || 0.001

// if combined vector is tiny, urgently evade by moving away from nearest hazard
if (combinedMag < 0.08) {
let nearest = null
for (const h of hazards) {
const hx = h.x + (cssItemW / 2)
const hy = h.y + (cssItemW / 2)
const px = this.player.x + (cssPlayerW / 2)
const py = this.player.y + (cssPlayerW / 2)
const dx = px - hx
const dy = py - hy
const d = Math.hypot(dx, dy) || 0.001
if (!nearest || d < nearest.d) nearest = { dx, dy, d }
}
if (nearest) {
combined.x = (nearest.dx / nearest.d) * 2.2
combined.y = (nearest.dy / nearest.d) * 2.2
combinedMag = Math.hypot(combined.x, combined.y)
}
}

// desired speed scales with proximity to target: closer -> slightly slower for precision
const desiredSpeed = Math.max(this.autopilotRuntime.minSpeed, Math.min(this.autopilotRuntime.maxSpeed, (speed * 1.6) * Math.max(0.7, Math.min(1.2, toDist / 180))))

// desired velocity
const desiredVel = { x: (combined.x / combinedMag) * desiredSpeed, y: (combined.y / combinedMag) * desiredSpeed }

// apply turn-rate limiting and smoothing by lerping current velocity toward desired
this.playerVel.x = this.playerVel.x * (1 - this.autopilotRuntime.turnLerp) + desiredVel.x * this.autopilotRuntime.turnLerp
this.playerVel.y = this.playerVel.y * (1 - this.autopilotRuntime.turnLerp) + desiredVel.y * this.autopilotRuntime.turnLerp

// apply acceleration smoothing
this.playerVel.x = this.playerVel.x * (1 - this.autopilotRuntime.accelLerp) + desiredVel.x * this.autopilotRuntime.accelLerp
this.playerVel.y = this.playerVel.y * (1 - this.autopilotRuntime.accelLerp) + desiredVel.y * this.autopilotRuntime.accelLerp

// clamp small jitter
if (Math.abs(this.playerVel.x) < this.autopilotRuntime.jitterDeadzone) this.playerVel.x = 0
if (Math.abs(this.playerVel.y) < this.autopilotRuntime.jitterDeadzone) this.playerVel.y = 0

// immediate small evasive nudge if hazard dangerously close in the next frame
let imminentDanger = false
  for (const h of hazards) {
    const hNextX = h.x
    const hNextY = h.y + (h.speed || 0)
    const dxh = (hNextX + cssItemW/2) - (this.player.x + cssPlayerW/2)
    const dyh = (hNextY + cssItemW/2) - (this.player.y + cssPlayerW/2)
    const distNext = Math.hypot(dxh, dyh)
    // widen the imminent danger window so we dodge earlier
    if (distNext < 36) { imminentDanger = true; break }
  }
if (imminentDanger) {
  // lateral nudge perpendicular to velocity for a quick dodge
  const perpX = -this.playerVel.y || 0
  const perpY = this.playerVel.x || 0
  const pm = Math.hypot(perpX, perpY) || 1
  // stronger dodge distance to avoid immediate collisions
  this.player.x += (perpX / pm) * 14
  this.player.y += (perpY / pm) * 10
  // damp velocity aggressively to avoid bounce-back
  this.playerVel.x *= 0.22; this.playerVel.y *= 0.22
} 

// move player using velocity and clamp into play zone
this.player.x += this.playerVel.x
this.player.y += this.playerVel.y
this.player.x = Math.max(0, Math.min(window.innerWidth - cssPlayerW, this.player.x))
this.player.y = Math.max(topLimit, Math.min(bottomLimit, this.player.y))
} else {
// no safe b-point: compute an evasive desired velocity based on hazards and a smooth patrol
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
const d = Math.hypot(dx, dy) || 0.001
const avoidRadius = safetyDistance + 80
if (!nearestHazard || d < nearestHazard.d) nearestHazard = { dx, dy, d }
if (d < avoidRadius) {
const strength = (avoidRadius - d) / avoidRadius * 2
repelHold.x += (dx / d) * strength
repelHold.y += (dy / d) * strength
}
}

// Smooth figure-8 patrol pattern
const t = Date.now() / 2000
const patrolX = window.innerWidth * (0.5 + 0.3 * Math.sin(t))
const patrolY = topLimit + (bottomLimit - topLimit) * (0.5 + 0.2 * Math.sin(t * 2))
// Extra smooth patrol transition
this.patrolXSmoothed = (this.patrolXSmoothed || window.innerWidth * 0.5) * 0.96 + patrolX * 0.04
const toPatrolX = this.patrolXSmoothed - this.player.x
const toPatrolY = patrolY - this.player.y
const distPatrol = Math.hypot(toPatrolX, toPatrolY) || 0.001

// combine patrol and repel, prioritizing repel strongly
const combinedHold = { x: repelHold.x * 2.2 + (toPatrolX / distPatrol) * 0.9, y: repelHold.y * 2.2 + (toPatrolY / distPatrol) * 0.9 }
const chMag = Math.hypot(combinedHold.x, combinedHold.y) || 0.001

// desired patrol speed (moderate)
const desiredPatrolSpeed = Math.max(this.autopilotRuntime.minSpeed, Math.min(this.autopilotRuntime.maxSpeed, speed * 1.1))
const desiredVel = { x: (combinedHold.x / chMag) * desiredPatrolSpeed, y: (combinedHold.y / chMag) * desiredPatrolSpeed }

// smooth velocity towards desired
this.playerVel.x = this.playerVel.x * (1 - this.autopilotRuntime.turnLerp) + desiredVel.x * this.autopilotRuntime.turnLerp
this.playerVel.y = this.playerVel.y * (1 - this.autopilotRuntime.turnLerp) + desiredVel.y * this.autopilotRuntime.turnLerp

// clamp small jitter
if (Math.abs(this.playerVel.x) < this.autopilotRuntime.jitterDeadzone) this.playerVel.x = 0
if (Math.abs(this.playerVel.y) < this.autopilotRuntime.jitterDeadzone) this.playerVel.y = 0

// move player
this.player.x += this.playerVel.x
this.player.y += this.playerVel.y
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
const activeSols = this.items.filter(it => it.type === 'b-point' && it.y >= -120)
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
if (item.type === 'b-point') {
const prevScore = this.score
this.score += 1
store.setScore(this.score)
// play collect sound
if (this.audio.collect) try { this.audio.collect.currentTime = 0; this.audio.collect.play(); } catch(e){}
// compute session-earned medals and total medals
const sessionMedals = Math.floor(this.score / 20)
const totalMedals = this.initialMedalsBase + sessionMedals
if (totalMedals > this.localMedals) {
  const delta = totalMedals - this.localMedals
  this.localMedals = totalMedals
  // persist total medals to Firestore
  this.saveMedals(totalMedals)
  // update store.user immediately so header reflects new total in real-time
  if (store.user) store.user = Object.assign({}, store.user, { medals: totalMedals })
  // show bottom-left toast with delta and total
  store.showToast(`Congratulations — you earned ${delta} new medal${delta > 1 ? 's' : ''}! Total medals ${totalMedals}.`, delta)
  // play medal sound immediately (audio unlocked on first pointerdown)
  if (this.audio.medal) try { this.audio.medal.currentTime = 0; this.audio.medal.play(); } catch(e){}
}

// sky color changes disabled; background remains dark per user preference
this.items.splice(i, 1)
} else {
            // collision with hazard: end game and stop loops immediately so overlay is visible
            this.gameOver = true
            // stop game loops so nothing runs in background
            try { clearInterval(this.gameLoop); this.gameLoop = null } catch(e){}
            try { clearInterval(this.spawnLoop); this.spawnLoop = null } catch(e){}
            // play game over sound
            if (this.audio.gameover) try { this.audio.gameover.currentTime = 0; this.audio.gameover.play(); } catch(e){}
            this.saveScore()
            // if autopilot was active, schedule auto-restart after 3s (overlay stays visible)
            if (this.autopilotEnabled) {
              if (this.autorestartTimer) clearTimeout(this.autorestartTimer)
              this.autorestartTimer = setTimeout(() => {
                this.autorestartTimer = null
                // ensure overlay hides before restart
                this.gameOver = false
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
// center player on restart
this.player = { x: Math.max(20, Math.floor(window.innerWidth / 2) - 40), y: Math.max(60, Math.floor(window.innerHeight / 2) - 40) }
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
const totalMedals = (this.store.user && typeof this.store.user.medals === 'number') ? this.store.user.medals : this.localMedals
  const text = `I'm ${username} and I collected ${this.score} scores and ${totalMedals} medals in #batpill`
// try to generate an image and share it
import('../utils/share').then(async mod => {
try {
const blob = await mod.generateShareImage({ username, score: this.score, medals: totalMedals })
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
window.addEventListener('touchstart', this.handleTouchStart, { passive: false })
window.addEventListener('touchmove', this.handleTouchMove, { passive: false })
window.addEventListener('touchend', this.handleTouchEnd)
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

// Unlock audio on first user interaction (some browsers block audio until interaction)
const unlockAudio = () => {
  try {
    // play and immediately pause to unlock the audio context
    if (this.audio.start) { this.audio.start.play().then(() => this.audio.start.pause()).catch(()=>{}) }
    if (this.audio.collect) { this.audio.collect.play().then(() => this.audio.collect.pause()).catch(()=>{}) }
    if (this.audio.medal) { this.audio.medal.play().then(() => this.audio.medal.pause()).catch(()=>{}) }
    if (this.audio.gameover) { this.audio.gameover.play().then(() => this.audio.gameover.pause()).catch(()=>{}) }
  } catch(e){}
  window.removeEventListener('pointerdown', unlockAudio)
}
window.addEventListener('pointerdown', unlockAudio)
const user = auth.currentUser
if (user) {
const ref = doc(db, 'users', user.uid)
getDoc(ref).then(async snap => {
const data = snap.exists() ? snap.data() : null
if (!data) {
// create a minimal doc with email so it's visible in Firestore console
try { await setDoc(ref, { username: user.email, email: user.email, totalScore: 0, medals: 0 }) } catch(e){}
    store.user = Object.assign({}, store.user, { username: user.email, totalScore: 0, medals: 0 })
    this.initialMedalsBase = 0
    this.localMedals = 0
  } else {
    // initial medals base is what the DB currently has
    const dbMedals = data.medals || Math.floor((data.totalScore || 0) / 20)
    this.initialMedalsBase = dbMedals
    this.localMedals = dbMedals
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
window.removeEventListener('touchstart', this.handleTouchStart)
window.removeEventListener('touchmove', this.handleTouchMove)
window.removeEventListener('touchend', this.handleTouchEnd)
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