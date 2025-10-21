import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // allow imports using '@' to reference the /src directory
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // keep the overlay so vite shows errors in the browser
    hmr: { overlay: true }
  }
})
