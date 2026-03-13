import { createRouter, createWebHistory } from 'vue-router'
import DocsLayout from '../docs/DocsLayout.vue'
import HomePage from '../docs/pages/HomePage.vue'

const stub = () => import('../docs/pages/StubPage.vue')

const routes = [
  {
    path: '/',
    component: DocsLayout,
    children: [
      { path: '', name: 'home', component: HomePage },

      // 01 Identity
      {
        path: 'brand/identity',
        name: 'identity',
        component: stub,
        meta: {
          number: '01',
          title: 'Identity',
          sections: [
            { id: 'mission', name: 'Mission' },
            { id: 'brand-idea', name: 'Brand Idea' },
            { id: 'visual-language', name: 'Visual Language' },
          ],
        },
      },

      // 02 Logo
      {
        path: 'brand/logo',
        name: 'logo',
        component: stub,
        meta: {
          number: '02',
          title: 'Logo',
          sections: [
            { id: 'intro', name: 'Intro' },
            { id: 'construction', name: 'Construction' },
            { id: 'usage', name: 'Usage' },
            { id: 'color', name: 'Color' },
          ],
        },
      },

      // 03 Typography
      {
        path: 'brand/typography',
        name: 'typography',
        component: stub,
        meta: {
          number: '03',
          title: 'Typography',
          sections: [
            { id: 'type-scale', name: 'Type Scale' },
            { id: 'using-type', name: 'Using Type' },
            { id: 'formatting', name: 'Formatting' },
          ],
        },
      },

      // 04 Color
      {
        path: 'brand/color',
        name: 'color',
        component: stub,
        meta: {
          number: '04',
          title: 'Color',
          sections: [
            { id: 'introduction', name: 'Introduction' },
            { id: 'primitives', name: 'Primitives' },
            { id: 'semantic-tokens', name: 'Semantic Tokens' },
            { id: 'themes', name: 'Themes' },
          ],
        },
      },

      // 05 Iconography
      {
        path: 'brand/iconography',
        name: 'iconography',
        component: stub,
        meta: {
          number: '05',
          title: 'Iconography',
          sections: [
            { id: 'overview', name: 'Overview' },
            { id: 'product-symbols', name: 'Product Symbols' },
            { id: 'functional-icons', name: 'Functional Icons' },
          ],
        },
      },

      // 06 Photography
      {
        path: 'brand/photography',
        name: 'photography',
        component: stub,
        meta: {
          number: '06',
          title: 'Photography',
          sections: [
            { id: 'style', name: 'Style' },
            { id: 'product', name: 'Product' },
            { id: 'people', name: 'People' },
            { id: 'places', name: 'Places' },
          ],
        },
      },

      // 07 Language
      {
        path: 'brand/language',
        name: 'language',
        component: stub,
        meta: {
          number: '07',
          title: 'Language',
          sections: [
            { id: 'voice-and-tone', name: 'Voice & Tone' },
            { id: 'writing-style', name: 'Writing Style' },
            { id: 'product-names', name: 'Product Names' },
          ],
        },
      },

      // 08 Gallery
      {
        path: 'brand/gallery',
        name: 'gallery',
        component: stub,
        meta: {
          number: '08',
          title: 'Gallery',
          sections: [
            { id: 'marketing', name: 'Marketing' },
            { id: 'application', name: 'Applications' },
            { id: 'operations', name: 'Operations' },
            { id: 'website', name: 'Website' },
          ],
        },
      },

      // 09 Tokens
      {
        path: 'system/tokens',
        name: 'tokens',
        component: stub,
        meta: {
          number: '09',
          title: 'Tokens',
          sections: [
            { id: 'colors', name: 'Colors' },
            { id: 'typography', name: 'Typography' },
            { id: 'spacing', name: 'Spacing' },
            { id: 'border-radius', name: 'Border Radius' },
            { id: 'shadows', name: 'Shadows' },
            { id: 'motion', name: 'Motion' },
            { id: 'z-index', name: 'Z-Index' },
          ],
        },
      },

      // 10 Core
      { path: 'design-system/core/button', name: 'core-button', component: () => import('../docs/pages/ButtonPage.vue') },
      { path: 'design-system/core/badge', name: 'core-badge', component: () => import('../docs/pages/BadgePage.vue') },
      { path: 'design-system/core/input', name: 'core-input', component: () => import('../docs/pages/InputPage.vue') },

      // 11 Marketing
      { path: 'design-system/marketing', name: 'ds-marketing', component: stub, meta: { number: '11', title: 'Marketing', sections: [] } },

      // 12 Applications
      { path: 'design-system/applications', name: 'ds-applications', component: stub, meta: { number: '12', title: 'Applications', sections: [] } },

      // 13 Operations
      { path: 'design-system/operations', name: 'ds-operations', component: stub, meta: { number: '13', title: 'Operations', sections: [] } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
