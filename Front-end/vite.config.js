import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target: 'https://back-end-update.onrender.com',
           changeOrigin: true,
           secure: false,      
           ws: true,
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  plugins: [react()],
})
