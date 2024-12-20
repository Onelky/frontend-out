import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@features': '/src/features',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
    },
  },
  server: {
    port: 3001,
  },
})
