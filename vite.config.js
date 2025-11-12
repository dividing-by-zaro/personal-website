import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      'buffer': 'buffer/',
    }
  },
  optimizeDeps: {
    include: ['buffer']
  },
  preview: {
    allowedHosts: ['www.isabelzaro.com', 'isabelzaro.com'],
    strictPort: false,
    host: true
  },
  appType: 'spa'
})
