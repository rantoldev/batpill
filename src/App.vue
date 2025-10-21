<template>
  <div id="app" class="min-h-screen relative overflow-hidden">
    <!-- Fullscreen background gif (looping) -->
    <div class="bg-loop"></div>

    <nav class="p-4 header-bar shadow flex items-center z-30 fixed top-0 left-0 right-0">
      <!-- Left: logo/title (clickable) -->
      <div class="flex-1 flex items-center space-x-4">
        <router-link to="/" class="flex items-center space-x-3">
          <img src="@/gif/pillfly.gif" alt="logo" class="logo-img" />
          <h1 class="text-xl font-bold cursor-pointer text-white">PillFly</h1>
        </router-link>
        <!-- Pumpill link placed near left header (approx 300px shift handled by header-shift elsewhere) -->
        <a href="https://www.pump.fun" target="_blank" class="pump-link pl-16 inline-flex items-center ml-4">
          <span class="pump-text">Pumpfly in pump.fun</span>
          <img src="@/images/pumpfun logo.png" alt="Pumpfun" class="pump-logo" />
          
  </a>
      </div>

      <!-- Center: score -->
      <div class="flex-1 flex justify-center">
        <div v-if="store.user || showScoreForGuests" class="score-pill">
          <div class="score-label">SCORE</div>
          <div class="score-value">{{ storeScore }}</div>
        </div>
      </div>

  <!-- Right: auth actions (shifted left by 300px per request) -->
  <div class="flex-1 flex items-center justify-end space-x-4 header-actions header-shift">
        <div v-if="!store.user">
          <router-link to="/login" class="px-3 py-1 btn-secondary">Login</router-link>
          <router-link to="/register" class="px-3 py-1 btn-secondary">Register</router-link>
        </div>
        <div v-else class="flex items-center space-x-3">
          <div class="text-white px-2 py-1">{{ store.user.username || 'Player' }}</div>
          <router-link to="/profile" class="px-3 py-1 btn-secondary">Profile</router-link>
          <button @click="logout" class="px-3 py-1 btn-secondary">Logout</button>
        </div>
      </div>
    </nav>

    <main class="pt-20 p-4 relative z-10 min-h-screen bg-transparent">
      <router-view />
    </main>

    <!-- Medal toast -->
    <div :class="['medal-toast', store.toast.show ? 'show' : '']" v-if="store.toast">
      <div class="medal-icon">🏅</div>
      <div class="medal-text">{{ store.toast.text }}</div>
    </div>

    <footer class="fixed bottom-0 left-0 right-0 p-2 footer-bar text-sm text-center z-30">
      <div>© PillFly — use arrows or WASD to move. Space to pause.</div>
    </footer>
  </div>
</template>

<script>
import { auth } from './firebase'
import { signOut } from 'firebase/auth'
import { store } from './store'

export default {
  name: 'App',
  data() {
    return { user: auth.currentUser, store, menuOpen: false, showScoreForGuests: true }
  },
  async mounted() {
    auth.onAuthStateChanged(async user => {
      this.user = user
      if (user) {
        // attempt to fetch user profile from firestore for username/medals
        try {
          const { db } = await import('./firebase')
          const { doc, getDoc } = await import('firebase/firestore')
          const ref = doc(db, 'users', user.uid)
          const snap = await getDoc(ref)
          const data = snap.exists() ? snap.data() : null
          store.user = { uid: user.uid, email: user.email, username: data?.username || user.email, totalScore: data?.totalScore || 0, medals: data?.medals || 0 }
        } catch (e) {
          store.user = store.user || { uid: user.uid, email: user.email }
        }
      } else {
        store.user = null
      }
    })
  },
  methods: {
    async logout() {
      await signOut(auth)
      store.user = null
      this.menuOpen = false
      this.$router.push('/login')
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    }
  },
  computed: {
    storeScore() {
      // return reactive store score
      return this.store.score || 0
    }
  }
}
</script>

<style scoped>
.bg-loop {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-color: #000;
  pointer-events: none;
}

/* Fast-moving small stars layer */
.bg-loop::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle 1px at 10% 20%, rgba(255, 255, 255, 0.6) 0, transparent 1px),
    radial-gradient(circle 1px at 50% 40%, rgba(255, 255, 255, 0.6) 0, transparent 1px),
    radial-gradient(circle 1px at 80% 70%, rgba(255, 255, 255, 0.6) 0, transparent 1px),
    radial-gradient(circle 1px at 30% 80%, rgba(255, 255, 255, 0.6) 0, transparent 1px);
  background-size: 200px 200px;
  animation: stars 30s linear infinite;
  opacity: 0.6;
}

/* Slower-moving larger stars layer */
.bg-loop::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle 2px at 20% 30%, rgba(255, 255, 255, 0.8) 0, transparent 2px),
    radial-gradient(circle 2px at 60% 50%, rgba(255, 255, 255, 0.8) 0, transparent 2px),
    radial-gradient(circle 2px at 90% 10%, rgba(255, 255, 255, 0.8) 0, transparent 2px),
    radial-gradient(circle 2px at 40% 90%, rgba(255, 255, 255, 0.8) 0, transparent 2px);
  background-size: 300px 300px;
  animation: stars-slow 60s linear infinite;
  opacity: 0.8;
}

@keyframes stars {
  from { background-position: 0 0; }
  to { background-position: 0 2000px; }
}

@keyframes stars-slow {
  from { background-position: 0 0; }
  to { background-position: 0 3000px; }
}

:root {
  --player-width: 80px;
  --item-width: 60px;
}

.logo-img {
  width: 48px;
  height: 48px;
}

.header-bar {
  background: #0b0b0bcc;
  color: #fff;
  backdrop-filter: blur(6px);
}

/* Shift header actions left by 300px */
.header-shift {
  transform: translateX(-300px);
}

/* ensure exactly 10px spacing between action items in header */
.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.header-bar a, .header-bar button {
  color: #fff;
}

.btn-primary {
  background: #1f8a4a;
  color: #fff;
  border-radius: 6px;
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
}

.footer-bar {
  background: rgba(0, 0, 0, 0.6);
  color: #ddd;
}

.score-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.score-label {
  font-size: 8px;
  color: #ddd;
  text-transform: uppercase;
  font-weight: bold;
}

.score-value {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}
</style>