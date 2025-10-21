<template>
  <div class="dark-card">
    <h2 class="text-xl font-bold mb-4">Login</h2>
    <form @submit.prevent="login">
      <label>Email</label>
      <input v-model="email" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <div class="flex justify-between items-center mt-4">
        <button class="btn-secondary">Login</button>
        <router-link to="/register" class="text-sm text-gray-400">Create account</router-link>
      </div>
      <p class="text-red-600 mt-2" v-if="error">{{ error }}</p>
    </form>
  </div>
  <div class="mt-6 text-center">
    <router-link to="/" class="btn-secondary">Home</router-link>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { store } from '../store'
import { doc, getDoc } from 'firebase/firestore'
import { authErrorMessage } from '../utils/errorMessages'
export default {
  data() {
    return { email: '', password: '', error: null }
  },
  methods: {
    async login() {
      this.error = null
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
        // hydrate minimal store user
        const u = auth.currentUser
        // load user profile from firestore, if available
        try {
          const ref = doc(db, 'users', u.uid)
          const snap = await getDoc(ref)
          const data = snap.exists() ? snap.data() : null
          // If Firestore user doc didn't exist, create a minimal one with email
          if (!data) {
            await setDoc(ref, { username: u.email, email: u.email, totalScore: 0, medals: 0 })
            store.user = { uid: u.uid, email: u.email, username: u.email, totalScore: 0, medals: 0 }
          } else {
            store.user = { uid: u.uid, email: u.email, username: data?.username || u.email, totalScore: data?.totalScore || 0, medals: data?.medals || 0 }
          }
        } catch(_) {
          store.user = { uid: u.uid, email: u.email }
        }
        this.$router.push('/')
      } catch (e) {
        this.error = authErrorMessage(e)
      }
    }
  }
}
</script>