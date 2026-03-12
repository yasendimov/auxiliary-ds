<script setup>
const specs = [
  { label: 'Typeface', value: 'Inter Variable' },
  { label: 'Weights', value: '600 \u00b7 500 \u00b7 400' },
  { label: 'Type Steps', value: '13' },
  { label: 'Color Scales', value: '30+' },
  { label: 'Contexts', value: '3' },
  { label: 'Themes', value: '2' },
]

const foundation = [
  {
    title: 'Design Philosophy',
    desc: 'The principles, tensions, and decisions that govern every token and component in the system.',
  },
  {
    title: 'Token Architecture',
    desc: 'Two-layer color system, typography scale, spacing constants, and how primitives become semantics.',
  },
]

const visualLanguage = [
  {
    title: 'Color',
    desc: 'Signal not decoration. Alarm, warning, caution, ok. Blue for interactive only.',
  },
  {
    title: 'Typography',
    desc: 'Swiss precision. Negative tracking. Monospace as truth. Three weights. One typeface.',
  },
  {
    title: 'Spacing',
    desc: '4px base grid. Context-driven density. Three layout contexts.',
  },
  {
    title: 'Motion',
    desc: 'Cost not feature. Instant in operational. Purposeful in application. Editorial in marketing.',
  },
]

const contexts = [
  {
    title: 'Operational',
    desc: 'Ground control stations, instrument panels, real-time telemetry. Fixed layout. Maximum density. No decoration.',
  },
  {
    title: 'Application',
    desc: 'Fleet management, mission planning, dashboards. Balanced density. Purposeful motion. Workday tools.',
  },
  {
    title: 'Marketing',
    desc: 'Landing pages, documentation, public content. Editorial rhythm. Generous space. Read, not operated.',
  },
]

const colophon = [
  { label: 'Primary Typeface', value: 'Inter Variable' },
  { label: 'Primary Accent', value: '#1475FF', mono: true },
  { label: 'Neutral Hue', value: 'Base (achromatic)' },
  { label: 'Base Unit', value: '4px' },
]
</script>

<template>
  <div class="-mx-page-x -my-page-y">
    <!-- Hero -->
    <section class="px-8 lg:px-16 pt-24 pb-16 max-w-2xl">
      <p class="font-mono text-xs tracking-[0.2em] uppercase text-content-dim">
        AUX Design System — v0.1.0
      </p>
      <h1 class="type-display font-semibold text-content-high mt-4">
        Auxiliary
      </h1>
      <p class="type-page font-normal text-content-low mt-4">
        The official design system for Auterion products. Built for operators, designed in Zurich.
      </p>
    </section>

    <!-- Specs Strip -->
    <section class="px-8 lg:px-16">
      <div class="grid grid-cols-3 lg:grid-cols-6 gap-y-px gap-x-px bg-surface-3">
        <div
          v-for="spec in specs"
          :key="spec.label"
          class="bg-page p-8"
        >
          <span class="font-mono text-xs text-content-dim uppercase tracking-[0.06em]">{{ spec.label }}</span>
          <p class="type-body font-medium text-content-high mt-1">{{ spec.value }}</p>
        </div>
      </div>
    </section>

    <!-- Foundation -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="font-mono text-xs text-content-dim uppercase tracking-[0.06em] mb-12">Foundation</p>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-px gap-x-px bg-surface-3">
        <div
          v-for="card in foundation"
          :key="card.title"
          class="bg-page p-8"
        >
          <h3 class="type-heading font-semibold text-content-high">{{ card.title }}</h3>
          <p class="type-body text-content-low mt-2 max-w-md">{{ card.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Visual Language -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="font-mono text-xs text-content-dim uppercase tracking-[0.06em] mb-12">Visual Language</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-px gap-x-px bg-surface-3">
        <div
          v-for="card in visualLanguage"
          :key="card.title"
          class="bg-page p-8 flex flex-col justify-between min-h-56"
        >
          <h3 class="type-heading font-semibold text-content-high">{{ card.title }}</h3>
          <p class="type-body text-content-low max-w-xs">{{ card.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Contexts -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="font-mono text-xs text-content-dim uppercase tracking-[0.06em] mb-12">Contexts</p>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-px gap-x-px bg-surface-3">
        <div
          v-for="card in contexts"
          :key="card.title"
          class="bg-page p-8 flex flex-col justify-between min-h-52"
        >
          <h3 class="type-heading font-semibold text-content-high">{{ card.title }}</h3>
          <p class="type-body text-content-low">{{ card.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Colophon -->
    <section class="px-8 lg:px-16 py-16 mt-24">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="item in colophon"
          :key="item.label"
        >
          <span class="font-mono text-xs text-content-dim uppercase tracking-[0.06em]">{{ item.label }}</span>
          <p :class="[item.mono ? 'font-mono' : '', 'type-body font-medium text-content-high mt-1']">{{ item.value }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
