/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    open: true,
    port: 3123
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/__tests__/*', 'src/**/__tests__/*', 'src/**/**/__tests__/*'],
    setupFiles: ['src/setup-files/react-router-dom.ts']
  }
})
