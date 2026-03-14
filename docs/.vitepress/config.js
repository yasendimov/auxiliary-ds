import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  title: 'AUX Design System',
  description: 'The official design system for Auterion products.',

  // AUX manages its own data-theme attribute — disable VitePress dark mode
  appearance: false,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=Inter:opsz,wght@14..32,100..900&display=swap',
        rel: 'stylesheet'
      }
    ]
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@aux': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  }
})
