import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'BITSbay-[name].js',
      },
    },
  },
})
