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
  { label: 'action-text', class: 'bg-action-content' },
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
        <h1 class="text-2xl font-semibold text-content-high">Token Verification</h1>
        <p class="mt-1 text-sm text-content-low">AUX semantic color tokens — dark &amp; light</p>
      </div>
      <button
        class="rounded-md bg-surface-1 px-4 py-2 text-sm font-medium text-content-high border border-line hover:bg-surface-2 transition-colors"
        @click="toggleTheme"
      >
        {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
      </button>
    </div>

    <!-- Semantic Token Swatches -->
    <section>
      <h2 class="mb-4 text-xs font-medium uppercase tracking-wider text-content-dim">Semantic Tokens</h2>
      <div class="grid grid-cols-5 gap-3">
        <div v-for="token in semanticTokens" :key="token.label" class="flex flex-col items-center gap-2">
          <div
            :class="[token.class, 'h-10 w-full rounded-md border border-line']"
          />
          <span class="font-mono text-[11px] text-content-dim">{{ token.label }}</span>
        </div>
      </div>
    </section>

    <!-- Sample Card -->
    <section>
      <h2 class="mb-4 text-xs font-medium uppercase tracking-wider text-content-dim">Sample Card</h2>
      <div class="rounded-lg border border-line bg-surface-1 p-6">
        <h3 class="text-lg font-semibold text-content-high">Card Title</h3>
        <p class="mt-2 text-sm text-content-low">
          This card uses <span class="font-mono text-content-dim">bg-surface-1</span>,
          <span class="font-mono text-content-dim">text-content-high</span>, and
          <span class="font-mono text-content-dim">border-line</span>.
        </p>
        <button
          class="mt-4 rounded-md bg-action px-4 py-2 text-sm font-medium text-white hover:bg-action-hover transition-colors"
        >
          Primary Action
        </button>
      </div>
    </section>

    <!-- OpenBridge Alert States -->
    <section>
      <h2 class="mb-4 text-xs font-medium uppercase tracking-wider text-content-dim">OpenBridge Alerts</h2>
      <div class="flex gap-3">
        <div
          v-for="alert in alerts"
          :key="alert.label"
          :class="[alert.bg, alert.text, 'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium']"
        >
          <span :class="[alert.dot, 'h-2 w-2 rounded-full']" />
          {{ alert.label }}
        </div>
      </div>
    </section>

    <!-- Text Hierarchy -->
    <section>
      <h2 class="mb-4 text-xs font-medium uppercase tracking-wider text-content-dim">Text Hierarchy</h2>
      <div class="space-y-3 rounded-lg border border-line bg-surface-1 p-6">
        <p class="text-base text-content-high">
          <span class="font-mono text-xs text-content-dim mr-3">content-high</span>
          Primary text — high contrast, used for headings and body copy
        </p>
        <p class="text-base text-content-low">
          <span class="font-mono text-xs text-content-dim mr-3">content-low</span>
          Secondary text — lower contrast, used for descriptions and supporting content
        </p>
        <p class="text-base text-content-dim">
          <span class="font-mono text-xs text-content-dim mr-3">content-dim</span>
          Tertiary text — lowest contrast, used for placeholders and metadata
        </p>
      </div>
    </section>
    <!-- Typography Scale -->
    <section>
      <h2 class="mb-4 text-xs font-medium uppercase tracking-wider text-content-dim">Type Scale</h2>
      <div class="space-y-4 rounded-lg border border-line bg-surface-1 p-6 overflow-hidden">
        <div v-for="role in typeRoles" :key="role" class="flex items-baseline gap-4">
          <span class="shrink-0 w-32 font-mono text-[11px] text-content-dim">.{{ role }}</span>
          <span :class="[role, 'text-content-high truncate']">The quick brown fox 0123456789</span>
        </div>
      </div>
    </section>

    <!-- Monospace Data Row -->
    <section>
      <h2 class="mb-4 text-xs font-medium uppercase tracking-wider text-content-dim">Monospace Data</h2>
      <div class="rounded-lg border border-line bg-surface-1 p-6">
        <p class="font-mono text-sm text-content-high">
          47.3769° N — 1,240 m AGL — 01:23:45 — AUT-2847
        </p>
      </div>
    </section>

    <!-- Overline + Section Heading -->
    <section>
      <h2 class="mb-4 text-xs font-medium uppercase tracking-wider text-content-dim">Overline + Heading</h2>
      <div class="rounded-lg border border-line bg-surface-1 p-6">
        <span class="type-overline text-content-dim">Mission Status</span>
        <h3 class="type-section text-content-high mt-1">Fleet Alpha — Active Deployment</h3>
      </div>
    </section>

    <!-- Weight Samples -->
    <section>
      <h2 class="mb-4 text-xs font-medium uppercase tracking-wider text-content-dim">Weight Samples</h2>
      <div class="space-y-3 rounded-lg border border-line bg-surface-1 p-6">
        <p class="text-base text-content-high">
          <span class="font-mono text-[11px] text-content-dim mr-3">600</span>
          <span class="font-semibold">SemiBold — The quick brown fox jumps</span>
        </p>
        <p class="text-base text-content-high">
          <span class="font-mono text-[11px] text-content-dim mr-3">500</span>
          <span class="font-medium">Medium — The quick brown fox jumps</span>
        </p>
        <p class="text-base text-content-high">
          <span class="font-mono text-[11px] text-content-dim mr-3">400</span>
          <span class="font-normal">Regular — The quick brown fox jumps</span>
        </p>
      </div>
    </section>
  </div>
</template>
