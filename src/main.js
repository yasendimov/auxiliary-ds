import { createApp } from 'vue'
import './style.css'
import './components/core/useTheme.js'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
