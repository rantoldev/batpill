import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './firebase' // Initialize Firebase
import './styles.css' // global styles (dark mode, sprites)

createApp(App).use(router).mount('#app')