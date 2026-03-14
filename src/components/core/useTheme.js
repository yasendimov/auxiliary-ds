import { ref, computed, readonly } from 'vue'

const theme = ref('dark')

if (typeof document !== 'undefined') {
  const stored = localStorage.getItem('aux-theme')
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  theme.value = stored || preferred
  document.documentElement.dataset.theme = theme.value
}

const isDark = computed(() => theme.value === 'dark')

function setTheme(value) {
  theme.value = value
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = value
    localStorage.setItem('aux-theme', value)
  }
}

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

export function useTheme() {
  return { theme: readonly(theme), isDark, toggleTheme, setTheme }
}
