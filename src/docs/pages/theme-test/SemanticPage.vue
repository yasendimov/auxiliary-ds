<script setup>
const textLevels = [
  { name: 'text-content-high', class: 'text-content-high' },
  { name: 'text-content-low', class: 'text-content-low' },
  { name: 'text-content-dim', class: 'text-content-dim' }
]

const lines = [
  { name: 'border-line', class: 'border-line' },
  { name: 'border-line-hover', class: 'border-line-hover' },
  { name: 'border-line-focus', class: 'border-line-focus' }
]

const actionTokens = [
  { name: 'bg-action', class: 'bg-action text-action-contrast' },
  { name: 'bg-action-hover', class: 'bg-action-hover text-action-contrast' },
  { name: 'bg-action-subtle', class: 'bg-action-subtle text-action-content' },
  { name: 'text-action-content', class: 'bg-page text-action-content border border-line' },
  { name: 'text-action-contrast', class: 'bg-page text-action-contrast border border-line' }
]

const alerts = [
  {
    name: 'Alarm',
    tokens: [
      { name: 'bg-alarm', class: 'bg-alarm' },
      { name: 'bg-alarm-subtle', class: 'bg-alarm-subtle text-alarm-content' },
      { name: 'text-alarm-content', class: 'bg-page text-alarm-content border border-line' },
      { name: 'text-alarm-contrast', class: 'bg-page text-alarm-contrast border border-line' }
    ]
  },
  {
    name: 'Warning',
    tokens: [
      { name: 'bg-warning', class: 'bg-warning' },
      { name: 'bg-warning-subtle', class: 'bg-warning-subtle text-warning-content' },
      { name: 'text-warning-content', class: 'bg-page text-warning-content border border-line' }
    ]
  },
  {
    name: 'Caution',
    tokens: [
      { name: 'bg-caution', class: 'bg-caution' },
      { name: 'bg-caution-subtle', class: 'bg-caution-subtle text-caution-content' },
      { name: 'text-caution-content', class: 'bg-page text-caution-content border border-line' }
    ]
  },
  {
    name: 'OK',
    tokens: [
      { name: 'bg-ok', class: 'bg-ok' },
      { name: 'bg-ok-subtle', class: 'bg-ok-subtle text-ok-content' },
      { name: 'text-ok-content', class: 'bg-page text-ok-content border border-line' }
    ]
  }
]

const typeScale = [
  { name: 'broadsheet', size: '128px', class: 'type-broadsheet-sb' },
  { name: 'tabloid', size: '96px', class: 'type-tabloid-sb' },
  { name: 'hero', size: '80px', class: 'type-hero-sb' },
  { name: 'display', size: '60px', class: 'type-display-sb' },
  { name: 'title', size: '48px', class: 'type-title-sb' },
  { name: 'heading', size: '40px', class: 'type-heading-sb' },
  { name: 'subheading', size: '30px', class: 'type-subheading-sb' },
  { name: 'section', size: '24px', class: 'type-section-sb' },
  { name: 'lead', size: '20px', class: 'type-lead-sb' },
  { name: 'intro', size: '18px', class: 'type-intro-sb' },
  { name: 'body', size: '16px', class: 'type-body-sb' },
  { name: 'caption', size: '14px', class: 'type-caption-sb' },
  { name: 'agate', size: '12px', class: 'type-agate-m' },
  { name: 'overline', size: '11px', class: 'type-overline' }
]

const radii = [
  { name: 'rounded-instrument', class: 'rounded-instrument' },
  { name: 'rounded-panel', class: 'rounded-panel' },
  { name: 'rounded-card', class: 'rounded-card' },
  { name: 'rounded-badge', class: 'rounded-badge' }
]

const durations = [
  { name: 'instant', value: '80ms', class: 'duration-instant' },
  { name: 'fast', value: '150ms', class: 'duration-fast' },
  { name: 'base', value: '220ms', class: 'duration-base' },
  { name: 'slow', value: '350ms', class: 'duration-slow' }
]
</script>

<template>
  <div>
    <!-- Header -->
    <header class="pt-24 pb-16 lg:pt-32 lg:pb-20 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-5">Theme Test</p>
      <h1 class="type-title-m text-content-high">Semantic Tokens</h1>
      <p class="type-body-m text-content-low mt-6 max-w-xl">
        Every token layer rendered on a single page. Toggle dark/light to verify resolution.
      </p>
    </header>

    <div class="border-b border-line"></div>

    <!-- Surfaces -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8">
        <span class="font-mono">01</span> — Surfaces
      </p>
      <div class="bg-page border border-line rounded-card p-4">
        <span class="type-agate-m font-mono text-content-dim">bg-page</span>
        <div class="bg-page-subtle rounded-card p-4 mt-3">
          <span class="type-agate-m font-mono text-content-dim">bg-page-subtle</span>
          <div class="bg-surface-1 rounded-card p-4 mt-3">
            <span class="type-agate-m font-mono text-content-dim">bg-surface-1</span>
            <div class="bg-surface-2 rounded-card p-4 mt-3">
              <span class="type-agate-m font-mono text-content-dim">bg-surface-2</span>
              <div class="bg-surface-3 rounded-card p-4 mt-3">
                <span class="type-agate-m font-mono text-content-dim">bg-surface-3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Text -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8"><span class="font-mono">02</span> — Text</p>
      <div class="flex flex-col gap-3">
        <div
          v-for="t in textLevels"
          :key="t.name"
          class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
        >
          <span class="type-agate-m font-mono text-content-dim w-40 shrink-0">{{ t.name }}</span>
          <span :class="[t.class, 'type-lead-m']">The quick brown fox jumps over the lazy dog</span>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Lines -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8"><span class="font-mono">03</span> — Lines</p>
      <div class="flex flex-col gap-4">
        <div
          v-for="l in lines"
          :key="l.name"
          class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
        >
          <span class="type-agate-m font-mono text-content-dim w-40 shrink-0">{{ l.name }}</span>
          <div :class="['flex-1 h-0 border-t-2', l.class]"></div>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Action Palette -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8">
        <span class="font-mono">04</span> — Action Palette
      </p>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="a in actionTokens"
          :key="a.name"
          :class="[a.class, 'rounded-card px-5 py-4 type-caption-m']"
        >
          <span class="font-mono">{{ a.name }}</span>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Alert Hierarchy -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8">
        <span class="font-mono">05</span> — Alert Hierarchy
      </p>
      <div class="flex flex-col gap-6">
        <div v-for="alert in alerts" :key="alert.name">
          <span class="type-caption-m text-content-low mb-2 block">{{ alert.name }}</span>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="token in alert.tokens"
              :key="token.name"
              :class="[token.class, 'rounded-card px-5 py-4 type-caption-m']"
            >
              <span class="font-mono">{{ token.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Typography Scale -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8">
        <span class="font-mono">06</span> — Typography Scale
      </p>
      <div class="flex flex-col gap-4 overflow-x-hidden">
        <div
          v-for="t in typeScale"
          :key="t.name"
          class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
        >
          <span class="type-agate-m font-mono text-content-dim w-32 shrink-0"
            >{{ t.size }} {{ t.name }}</span
          >
          <span :class="[t.class, 'text-content-high truncate']">Auterion</span>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Spacing -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8"><span class="font-mono">07</span> — Spacing</p>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <span class="type-agate-m font-mono text-content-dim w-32 shrink-0">page-x (24px)</span>
          <div class="bg-action/20 h-6 w-page-x rounded-panel"></div>
        </div>
        <div class="flex items-center gap-4">
          <span class="type-agate-m font-mono text-content-dim w-32 shrink-0">page-y (24px)</span>
          <div class="bg-action/20 h-6 w-page-y rounded-panel"></div>
        </div>
        <div class="flex items-center gap-4">
          <span class="type-agate-m font-mono text-content-dim w-32 shrink-0">section (48px)</span>
          <div class="bg-action/20 h-6 w-section rounded-panel"></div>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Radius -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8">
        <span class="font-mono">08</span> — Border Radius
      </p>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="r in radii"
          :key="r.name"
          :class="[
            r.class,
            'bg-surface-2 border border-line size-24 flex items-center justify-center'
          ]"
        >
          <span class="type-agate-m font-mono text-content-dim text-center">{{
            r.name.replace('rounded-', '')
          }}</span>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Shadows -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8"><span class="font-mono">09</span> — Shadows</p>
      <div class="flex flex-wrap gap-6">
        <div class="bg-page rounded-card p-6 shadow-panel border border-line">
          <span class="type-agate-m font-mono text-content-dim">shadow-panel</span>
        </div>
        <div class="bg-page rounded-card p-6 shadow-overlay border border-line">
          <span class="type-agate-m font-mono text-content-dim">shadow-overlay</span>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Motion -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8">
        <span class="font-mono">10</span> — Motion Durations
      </p>
      <div class="flex flex-col gap-3">
        <div v-for="d in durations" :key="d.name" class="flex items-center gap-4">
          <span class="type-agate-m font-mono text-content-dim w-32 shrink-0"
            >{{ d.name }} ({{ d.value }})</span
          >
          <div
            :class="['h-6 w-12 bg-action rounded-panel transition-all hover:w-48', d.class]"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>
