<script setup>
import { ref } from 'vue'

const isDark = ref(true)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

const semanticTokens = [
  { label: 'page', class: 'bg-page' },
  { label: 'page-subtle', class: 'bg-page-subtle' },
  { label: 'surface-1', class: 'bg-surface-1' },
  { label: 'surface-2', class: 'bg-surface-2' },
  { label: 'surface-3', class: 'bg-surface-3' },
  { label: 'content-high', class: 'bg-content-high' },
  { label: 'content-low', class: 'bg-content-low' },
  { label: 'content-dim', class: 'bg-content-dim' },
  { label: 'line', class: 'bg-line' },
  { label: 'line-hover', class: 'bg-line-hover' },
  { label: 'line-focus', class: 'bg-line-focus' },
  { label: 'action', class: 'bg-action' },
  { label: 'action-hover', class: 'bg-action-hover' },
  { label: 'action-subtle', class: 'bg-action-subtle' },
  { label: 'action-content', class: 'bg-action-content' },
]

const typeRoles = [
  'type-hero', 'type-display', 'type-page-lg', 'type-page',
  'type-heading', 'type-section', 'type-title', 'type-body',
  'type-secondary', 'type-label', 'type-caption', 'type-overline',
]

const alerts = [
  { label: 'Alarm', bg: 'bg-alarm-subtle', text: 'text-alarm-content', dot: 'bg-alarm' },
  { label: 'Warning', bg: 'bg-warning-subtle', text: 'text-warning-content', dot: 'bg-warning' },
  { label: 'Caution', bg: 'bg-caution-subtle', text: 'text-caution-content', dot: 'bg-caution' },
  { label: 'OK', bg: 'bg-ok-subtle', text: 'text-ok-content', dot: 'bg-ok' },
]
</script>

<template>
  <div class="max-w-3xl space-y-10">
    <!-- Header + Theme Toggle -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="type-section text-content-high">Token Verification</h1>
        <p class="type-secondary text-content-low mt-1">AUX semantic color tokens — dark &amp; light</p>
      </div>
      <button
        class="bg-surface-1 px-4 py-2 type-label text-content-high border border-line hover:bg-surface-2 transition-colors"
        @click="toggleTheme"
      >
        {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
      </button>
    </div>

    <!-- Semantic Token Swatches -->
    <section>
      <h2 class="type-overline text-content-dim mb-4">Semantic Tokens</h2>
      <div class="grid grid-cols-5 gap-3">
        <div v-for="token in semanticTokens" :key="token.label" class="flex flex-col items-center gap-2">
          <div
            :class="[token.class, 'h-10 w-full border border-line']"
          />
          <span class="type-caption font-mono text-content-dim">{{ token.label }}</span>
        </div>
      </div>
    </section>

    <!-- Sample Card -->
    <section>
      <h2 class="type-overline text-content-dim mb-4">Sample Card</h2>
      <div class="border border-line bg-surface-1 p-6">
        <h3 class="type-title text-content-high">Card Title</h3>
        <p class="type-secondary text-content-low mt-2">
          This card uses <span class="font-mono text-content-dim">bg-surface-1</span>,
          <span class="font-mono text-content-dim">text-content-high</span>, and
          <span class="font-mono text-content-dim">border-line</span>.
        </p>
        <button
          class="mt-4 bg-action px-4 py-2 type-label text-white hover:bg-action-hover transition-colors"
        >
          Primary Action
        </button>
      </div>
    </section>

    <!-- OpenBridge Alert States -->
    <section>
      <h2 class="type-overline text-content-dim mb-4">OpenBridge Alerts</h2>
      <div class="flex gap-3">
        <div
          v-for="alert in alerts"
          :key="alert.label"
          :class="[alert.bg, alert.text, 'flex items-center gap-2 px-4 py-2 type-label']"
        >
          <span :class="[alert.dot, 'h-2 w-2 rounded-full']" />
          {{ alert.label }}
        </div>
      </div>
    </section>

    <!-- Text Hierarchy -->
    <section>
      <h2 class="type-overline text-content-dim mb-4">Text Hierarchy</h2>
      <div class="space-y-3 border border-line bg-surface-1 p-6">
        <div class="flex items-baseline gap-3">
          <span class="type-caption font-mono text-content-dim shrink-0 w-28">content-high</span>
          <p class="type-body text-content-high">Primary text — high contrast, used for headings and body copy</p>
        </div>
        <div class="flex items-baseline gap-3">
          <span class="type-caption font-mono text-content-dim shrink-0 w-28">content-low</span>
          <p class="type-body text-content-low">Secondary text — lower contrast, used for descriptions</p>
        </div>
        <div class="flex items-baseline gap-3">
          <span class="type-caption font-mono text-content-dim shrink-0 w-28">content-dim</span>
          <p class="type-body text-content-dim">Tertiary text — lowest contrast, used for placeholders</p>
        </div>
      </div>
    </section>

    <!-- Typography Scale -->
    <section>
      <h2 class="type-overline text-content-dim mb-4">Type Scale</h2>
      <div class="space-y-4 border border-line bg-surface-1 p-6 overflow-hidden">
        <div v-for="role in typeRoles" :key="role" class="flex items-baseline gap-4">
          <span class="type-caption font-mono text-content-dim shrink-0 w-32">.{{ role }}</span>
          <span :class="[role, 'text-content-high truncate']">The quick brown fox 0123456789</span>
        </div>
      </div>
    </section>

    <!-- Monospace Data Row -->
    <section>
      <h2 class="type-overline text-content-dim mb-4">Monospace Data</h2>
      <div class="border border-line bg-surface-1 p-6">
        <p class="font-mono type-secondary text-content-low">
          47.3769° N — 1,240 m AGL — 01:23:45 — AUT-2847
        </p>
      </div>
    </section>

    <!-- Overline + Section Heading -->
    <section>
      <h2 class="type-overline text-content-dim mb-4">Overline + Heading</h2>
      <div class="border border-line bg-surface-1 p-6">
        <span class="type-overline text-content-dim">Mission Status</span>
        <h3 class="type-section text-content-high mt-1">Fleet Alpha — Active Deployment</h3>
      </div>
    </section>

    <!-- Weight Samples -->
    <section>
      <h2 class="type-overline text-content-dim mb-4">Weight Samples</h2>
      <div class="space-y-3 border border-line bg-surface-1 p-6">
        <div class="flex items-baseline gap-3">
          <span class="type-caption font-mono text-content-dim shrink-0 w-10">600</span>
          <span class="type-body font-semibold text-content-high">SemiBold — The quick brown fox jumps</span>
        </div>
        <div class="flex items-baseline gap-3">
          <span class="type-caption font-mono text-content-dim shrink-0 w-10">500</span>
          <span class="type-body font-medium text-content-high">Medium — The quick brown fox jumps</span>
        </div>
        <div class="flex items-baseline gap-3">
          <span class="type-caption font-mono text-content-dim shrink-0 w-10">400</span>
          <span class="type-body font-normal text-content-high">Regular — The quick brown fox jumps</span>
        </div>
      </div>
    </section>
  </div>
</template>
