import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    host: process.env.HOST ?? 'localhost',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://www.treasurydirect.gov/NP_WS',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
