import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://portfolio-tegar-production-bed1.up.railway.app'),
    'import.meta.env.VITE_ADMIN_URL': JSON.stringify(process.env.VITE_ADMIN_URL || 'https://portfolio-tegar-admin.vercel.app')
  }
})
