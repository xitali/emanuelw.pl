import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lucide-react') || id.includes('node_modules/react-hot-toast')) {
            return 'ui-vendor';
          }
          if (id.includes('node_modules/@libsql') || id.includes('node_modules/bcryptjs') || id.includes('node_modules/date-fns')) {
            return 'data-vendor';
          }
          if (id.includes('node_modules/zustand') || id.includes('node_modules/react-hook-form')) {
            return 'state-vendor';
          }
        },
      },
    },
  }
})
