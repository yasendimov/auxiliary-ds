<script setup>
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
  <div class="flex min-h-screen bg-page text-content-high font-sans">
    <aside class="w-64 shrink-0 border-r border-line bg-page-subtle p-6">
      <div class="mb-8">
        <h1 class="text-lg font-semibold tracking-tight text-content-high">AUX</h1>
        <p class="text-xs text-content-dim">Auxiliary Design System</p>
      </div>

      <nav class="space-y-6">
        <div v-for="section in navSections" :key="section.title">
          <h2 class="mb-2 text-xs font-medium uppercase tracking-wider text-content-dim">
            {{ section.title }}
          </h2>
          <ul class="space-y-1">
            <li v-for="link in section.links" :key="link.path">
              <router-link
                :to="link.path"
                class="block rounded-md px-3 py-1.5 text-sm text-content-low transition-colors hover:bg-surface-1 hover:text-content-high"
                active-class="bg-surface-1 text-content-high"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <main class="flex-1 p-10">
      <router-view />
    </main>
  </div>
</template>
