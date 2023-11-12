/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      hmr: true,
      host: process.env.HOST ?? 'localhost',
      port: process.env.PORT ? +process.env.PORT : 5173,
      proxy: {
        '/api': {
          target: 'https://www.treasurydirect.gov/NP_WS',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    }
  }
})