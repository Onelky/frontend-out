import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@tests': path.resolve(__dirname, './src/tests/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@testUtils': path.resolve(__dirname, './src/testUtils')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: [path.resolve(__dirname, './vitest.setup.ts')],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      extension: ['tsx', 'ts'],
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/features/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}'
      ],
      exclude: ['node_modules/', 'dist/', 'index.ts'] // Exclude unnecessary folders
    }
  }
})
