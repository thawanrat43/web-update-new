import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from "https";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1600,
  },
  plugins: [react()],
})
// "proxy": "https://back-end-update.onrender.com/",