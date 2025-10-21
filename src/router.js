import { createRouter, createWebHistory } from 'vue-router'
import Game from './components/Game.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
import Register from './components/Register.vue'
import { auth } from './firebase'

const routes = [
  { path: '/', component: Game },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// redirect already-authenticated users away from login/register
// Wait for Firebase auth to initialize to avoid race conditions on page load.
const getCurrentUser = () => new Promise((resolve) => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    unsubscribe()
    resolve(user)
  })
})

router.beforeEach(async (to, from) => {
  const user = await getCurrentUser()
  if (user && (to.path === '/login' || to.path === '/register')) return '/'
  return true
})

export default router