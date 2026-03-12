<script setup>
import { ref } from 'vue'

const theme = ref(document.documentElement.dataset.theme || 'dark')

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('aux-theme', theme.value)
}

const navSections = [
  {
    title: 'Getting Started',
    links: [
      { name: 'Home', path: '/' },
    ],
  },
  {
    title: 'Foundation',
    links: [
      { name: 'Colors', path: '/foundation/colors' },
      { name: 'Typography', path: '/foundation/typography' },
      { name: 'Spacing', path: '/foundation/spacing' },
    ],
  },
  {
    title: 'Components',
    links: [
      { name: 'Button', path: '/components/button' },
      { name: 'Input', path: '/components/input' },
      { name: 'Badge', path: '/components/badge' },
    ],
  },
]
</script>

<template>
  <div class="flex min-h-screen bg-page text-content-high">
    <aside class="flex w-64 shrink-0 flex-col border-r border-line bg-page px-5 py-6">
      <div class="mb-8 px-3">
        <h1 class="type-lead-sb text-content-high">AUX</h1>
        <p class="type-agate-r text-content-dim">Auxiliary Design System</p>
      </div>

      <nav class="space-y-5">
        <div v-for="section in navSections" :key="section.title">
          <h2 class="type-overline text-content-dim mb-2 px-3">
            {{ section.title }}
          </h2>
          <ul class="space-y-0.5">
            <li v-for="link in section.links" :key="link.path">
              <router-link
                :to="link.path"
                class="block border-l-2 border-transparent px-3 py-1.5 type-caption-r text-content-low transition-colors duration-fast hover:text-content-high"
                active-class="border-action text-content-high"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <div class="mt-auto border-t border-line pt-4 px-3">
        <button
          class="font-mono text-xs text-content-dim transition-colors duration-fast hover:text-content-high"
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? 'Dark' : 'Light' }}
        </button>
      </div>
    </aside>

    <main class="flex-1 bg-page px-page-x py-page-y">
      <router-view />
    </main>
  </div>
</template>
