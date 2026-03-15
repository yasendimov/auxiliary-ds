import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: 4747,
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/__tests__/**/*.test.js'],
    css: false,
    setupFiles: ['src/test/setup.js'],
    globals: false,
    alias: {
      '@floating-ui/vue': new URL('./src/test/mocks/floating-ui.js', import.meta.url).pathname,
    },
  },
})
