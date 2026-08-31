import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Every imported photo is resized and re-encoded to WebP at build time so
    // rural / slow connections download ~100-200 KB instead of 2-4 MB originals.
    // Add ?w=... or ?quality=... to an import to override per-image.
    imagetools({
      include: /\.(heic|heif|avif|jpeg|jpg|jfif|png|tiff|webp|gif)(\?.*)?$/i,
      defaultDirectives: (url) => {
        const p = new URLSearchParams(url.search)
        if (!p.has('format')) p.set('format', 'webp')
        if (!p.has('quality')) p.set('quality', '78')
        if (!p.has('w')) p.set('w', '1400')
        return p
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html}'],
        // Photos are hashed & immutable — serve from cache first once seen, so
        // repeat visits are instant and partly work offline.
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: 'Manara Foundation',
        short_name: 'Manara',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1E5AA8',
        icons: [
          { src: '/favicon-256.png', sizes: '256x256', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/react-icons')) return 'icons'
          if (id.includes('node_modules/react-router')) return 'router'
        },
      },
    },
  },
})
