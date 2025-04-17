import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Silence deprecation warnings from dependencies (e.g. deprecated color.blue())
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  }
})
