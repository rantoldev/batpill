<template>
  <div class="dark-card">
    <h2 class="text-xl font-bold mb-4">Register</h2>
    <form @submit.prevent="register">
      <label>Username</label>
      <input v-model="username" />
      <label class="mt-2">Email</label>
      <input v-model="email" />
      <label class="mt-2">Password</label>
      <input type="password" v-model="password" />
      <div class="mt-4">
        <button class="btn-secondary">Create account</button>
      </div>
      <p class="text-red-600 mt-2" v-if="error">{{ error }}</p>
    </form>
  </div>
  <div class="mt-6 text-center">
    <router-link to="/" class="btn-secondary">Home</router-link>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { store } from '../store'
import { authErrorMessage } from '../utils/errorMessages'

export default {
  data() {
    return { username: '', email: '', password: '', error: null }
  },
  methods: {
    async register() {
      this.error = null
      try {
        const userCred = await createUserWithEmailAndPassword(auth, this.email, this.password)
  const uid = userCred.user.uid
  // set Firebase user displayName for consistency
  try { await updateProfile(userCred.user, { displayName: this.username }) } catch(e){}
  // include email to make it easy to find users in Firestore
  await setDoc(doc(db, 'users', uid), { username: this.username, email: this.email, totalScore: 0, medals: 0 })
  store.user = { uid, username: this.username, email: this.email, totalScore: 0, medals: 0 }
        this.$router.push('/')
      } catch (e) {
        this.error = authErrorMessage(e)
      }
    }
  }
}
</script>