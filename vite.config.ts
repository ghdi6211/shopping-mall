import { reactRouterPlugin } from 'vite-plugin-next-react-router';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),reactRouterPlugin()],
})
