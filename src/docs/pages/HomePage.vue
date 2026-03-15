<script setup>
const specs = [
  { label: 'Typeface', value: 'Inter Variable' },
  { label: 'Weights', value: '600 \u00b7 500 \u00b7 400' },
  { label: 'Type Steps', value: '13' },
  { label: 'Color Scales', value: '30+' },
  { label: 'Contexts', value: '3' },
  { label: 'Themes', value: '2' }
]

const foundation = [
  {
    title: 'Design Philosophy',
    desc: 'The principles, tensions, and decisions that govern every token and component in the system.'
  },
  {
    title: 'Token Architecture',
    desc: 'Two-layer color system, typography scale, spacing constants, and how primitives become semantics.'
  }
]

const visualLanguage = [
  {
    title: 'Color',
    desc: 'Signal not decoration. Alarm, warning, caution, ok. Blue for interactive only.'
  },
  {
    title: 'Typography',
    desc: 'Swiss precision. Inter Dynamic Metrics tracking. Monospace as truth. Three weights. One typeface.'
  },
  {
    title: 'Spacing',
    desc: '4px base grid. Context-driven density. Three layout contexts.'
  },
  {
    title: 'Motion',
    desc: 'Cost not feature. Instant in operations. Purposeful in applications. Editorial in marketing.'
  }
]

const contexts = [
  {
    title: 'Operations',
    desc: 'Ground control stations, instrument panels, real-time telemetry. Fixed layout. Maximum density. No decoration.'
  },
  {
    title: 'Applications',
    desc: 'Fleet management, mission planning, dashboards. Balanced density. Purposeful motion. Workday tools.'
  },
  {
    title: 'Marketing',
    desc: 'Landing pages, documentation, public content. Editorial rhythm. Generous space. Read, not operated.'
  }
]

const colophon = [
  { label: 'Primary Typeface', value: 'Inter Variable' },
  { label: 'Primary Accent', value: '#1475FF', mono: true },
  { label: 'Neutral Hue', value: 'Base (achromatic)' },
  { label: 'Base Unit', value: '4px' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">AUX Design System — v0.2.0</p>
      <h1 class="type-hero-sb md:type-broadsheet-sb text-base-normal mt-4">Auxiliary</h1>
      <p class="type-lead-r md:type-subheading-r text-base-dim mt-4 max-w-2xl leading-relaxed">
        The official design system for Auterion products. Built for operators, designed in Zurich.
      </p>
    </section>

    <!-- Specs Strip -->
    <section class="px-8 lg:px-16">
      <div class="grid grid-cols-3 lg:grid-cols-6 border-t border-l border-base-dim">
        <div v-for="spec in specs" :key="spec.label" class="border-b border-r border-base-dim p-8">
          <span class="type-overline text-base-dim">{{ spec.label }}</span>
          <p class="type-intro-m text-base-normal mt-2">{{ spec.value }}</p>
        </div>
      </div>
    </section>

    <!-- Foundation -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Foundation
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-base-dim">
        <div
          v-for="card in foundation"
          :key="card.title"
          class="border-b border-r border-base-dim p-8"
        >
          <h3 class="type-section-sb text-base-normal">{{ card.title }}</h3>
          <p class="type-intro-r text-base-dim mt-3 max-w-md leading-relaxed">{{ card.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Visual Language -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — Visual Language
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-base-dim">
        <div
          v-for="card in visualLanguage"
          :key="card.title"
          class="border-b border-r border-base-dim p-8 flex flex-col justify-between min-h-56"
        >
          <h3 class="type-lead-sb text-base-normal">{{ card.title }}</h3>
          <p class="type-caption-r text-base-dim max-w-xs leading-relaxed">{{ card.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Contexts -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">03</span> — Contexts</p>
      <div class="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-base-dim">
        <div
          v-for="card in contexts"
          :key="card.title"
          class="border-b border-r border-base-dim p-8 flex flex-col justify-between min-h-52"
        >
          <h3 class="type-section-m text-base-normal">{{ card.title }}</h3>
          <p class="type-caption-r text-base-dim leading-relaxed">{{ card.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Colophon -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <div class="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-base-dim">
        <div
          v-for="item in colophon"
          :key="item.label"
          class="border-b border-r border-base-dim p-8"
        >
          <span class="type-overline text-base-dim">{{ item.label }}</span>
          <p :class="[item.mono ? 'font-mono' : '', 'type-intro-m text-base-normal mt-2']">
            {{ item.value }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
