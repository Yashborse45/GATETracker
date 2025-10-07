
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows access from mobile devices on your network
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
