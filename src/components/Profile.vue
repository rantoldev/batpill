<template>
  <div class="profile-wrapper">
    <div class="profile-card">
      <div class="card-header">
        <img src="@/gif/pillfly.gif" alt="pill" class="card-logo" />
        <h2>Profile</h2>
      </div>
      <div v-if="userDoc" class="card-body">
        <label>Username</label>
        <input v-model="userDoc.username" class="username-input" />

        <div class="stats-row">
          <div class="stat">
            <div class="stat-label">Total points collected</div>
            <div class="stat-value">{{ userDoc.totalScore }}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Medals</div>
            <div class="stat-value">{{ userDoc.medals || Math.floor(userDoc.totalScore/20) }}</div>
          </div>
        </div>

        <div class="actions">
          <button @click="saveUsername" class="btn-secondary">Save Username</button>
          <button @click="share" class="btn-secondary">Share to X</button>
          <button @click="logout" class="btn-secondary">Logout</button>
        </div>
      </div>
      <p v-else class="loading">Loading...</p>
    </div>
    <div class="mt-6 text-center">
      <router-link to="/" class="btn-secondary">Home</router-link>
    </div>
  </div>
</template>

<script>
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { store } from '../store'

export default {
  data() {
    return { userDoc: null }
  },
  async mounted() {
    const user = auth.currentUser
    if (!user) {
      this.$router.push('/login')
      return
    }
    const docRef = doc(db, 'users', user.uid)
    const snap = await getDoc(docRef)
    if (snap.exists()) this.userDoc = snap.data()
    else this.userDoc = { username: user.email, totalScore: 0 }
  },
  methods: {
    async share() {
      const uname = (this.userDoc && this.userDoc.username) ? this.userDoc.username : (store.user && store.user.username) ? store.user.username : 'Player'
      const text = `I'm ${uname} and I collected ${this.userDoc.totalScore} scores in #PillFly`
      try {
        const { generateShareImage, shareImageAndText } = await import('../utils/share')
        const blob = await generateShareImage({ username: uname, score: this.userDoc.totalScore || 0, medals: this.userDoc.medals || Math.floor(this.userDoc.totalScore/20) })
        await shareImageAndText({ text, blob })
      } catch (e) {
        const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`
        window.open(url, '_blank')
      }
    },
    async logout() {
      await signOut(auth)
      store.user = null
      this.$router.push('/login')
    },
    async saveUsername(){
      const user = auth.currentUser
      if (!user) return
      const ref = doc(db, 'users', user.uid)
      await updateDoc(ref, { username: this.userDoc.username })
      // update store
      store.user = Object.assign({}, store.user, { username: this.userDoc.username })
    }
  }
}
</script>

<style scoped>
.profile-wrapper{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:calc(100vh - 120px);padding-top:20px;padding-bottom:20px}
.profile-card{width:760px;max-width:96%;background:rgba(0,0,0,0.48);border-radius:14px;padding:28px;border:3px solid rgba(255,255,255,0.14);box-shadow:0 10px 30px rgba(0,0,0,0.6)}
.card-header{display:flex;align-items:center;gap:18px;margin-bottom:18px}
.card-header h2{font-size:24px;margin:0;color:#fff}
.card-logo{height:64px;width:64px;object-fit:contain}
.card-body{padding:12px 6px}
.username-input{width:100%;padding:12px;margin-top:8px;border-radius:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff}
.stats-row{display:flex;gap:22px;margin-top:18px}
.stat{flex:1;background:rgba(255,255,255,0.02);padding:18px;border-radius:10px;border:1px solid rgba(255,255,255,0.08)}
.stat-label{font-size:13px;color:#ddd;margin-bottom:8px}
.stat-value{font-size:32px;font-weight:900;color:#fff}
.actions{margin-top:40px;display:flex;gap:14px;text-align:center;justify-content:center}
.loading{color:#ccc;text-align:center;padding:20px}

@media (max-width:640px){
  .profile-card{width:94%}
  .stat-value{font-size:22px}
}
</style>