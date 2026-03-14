import { createRouter, createWebHistory } from 'vue-router'
import DocsLayout from '../docs/DocsLayout.vue'
import HomePage from '../docs/pages/HomePage.vue'
import { navConfig, buildRoutes } from '../docs/nav.js'

const routes = [
  {
    path: '/',
    component: DocsLayout,
    children: [{ path: '', name: 'home', component: HomePage }, ...buildRoutes(navConfig)]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router
