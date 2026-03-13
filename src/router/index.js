import { createRouter, createWebHistory } from 'vue-router'
import DocsLayout from '../docs/DocsLayout.vue'
import HomePage from '../docs/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    component: DocsLayout,
    children: [
      { path: '', name: 'home', component: HomePage },
      { path: 'foundation/colors', name: 'foundation-colors', component: () => import('../docs/pages/HomePage.vue') },
      { path: 'foundation/typography', name: 'foundation-typography', component: () => import('../docs/pages/HomePage.vue') },
      { path: 'foundation/spacing', name: 'foundation-spacing', component: () => import('../docs/pages/HomePage.vue') },
      { path: 'components/button', name: 'components-button', component: () => import('../docs/pages/ButtonPage.vue') },
      { path: 'components/input', name: 'components-input', component: () => import('../docs/pages/HomePage.vue') },
      { path: 'components/badge', name: 'components-badge', component: () => import('../docs/pages/HomePage.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
