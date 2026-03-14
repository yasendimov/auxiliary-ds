import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const stored = localStorage.getItem('aux-theme')
const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
document.documentElement.dataset.theme = stored || preferred

createApp(App).use(router).mount('#app')
