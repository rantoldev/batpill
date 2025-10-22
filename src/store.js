import { reactive } from 'vue'

export const store = reactive({
  user: null,         // { uid, username, totalScore, medals }
  score: 0,          // live session score
  toast: {
    show: false,
    text: '',
    medalDelta: 0
  },
  setUser(u) { this.user = u },
  setScore(s) { this.score = s },
  showToast(text, medalDelta = 0) {
    this.toast.text = text
    this.toast.medalDelta = medalDelta
    this.toast.show = true
    // hide after 3s
    setTimeout(() => { this.toast.show = false }, 3000)
  }
})
