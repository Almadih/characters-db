import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
const pwaOptions = {
  mode: 'development',
  base: '/characters-db/',
  includeAssets: ['favicon.ico'],
  manifest: {
    name: 'Characters Database',
    short_name: 'Characters DB',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'android-chrome-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'android-chrome-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  base:'/characters-db',
  plugins: [react(),VitePWA(pwaOptions)]
})
