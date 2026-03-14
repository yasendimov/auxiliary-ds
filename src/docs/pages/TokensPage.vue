<script setup>
// ── 01 Colors ──────────────────────────────────────────────────────────────

const semanticUtilities = [
  { utility: 'bg-{color}-app', steps: '1', use: 'Page background', expands: 'bg-red-1 dark:bg-reddark-1', swatch: '--color-blue-1', type: 'fill' },
  { utility: 'bg-{color}-subtle', steps: '2', use: 'Subtle/striped background', expands: 'bg-red-2 dark:bg-reddark-2', swatch: '--color-blue-2', type: 'fill' },
  { utility: 'bg-{color}-ui', steps: '3 → 4 → 5', use: 'Interactive surface (hover + active)', expands: 'bg-red-3 dark:bg-reddark-3\nhover:bg-red-4 dark:hover:bg-reddark-4\nactive:bg-red-5 dark:active:bg-reddark-5', swatch: '--color-blue-3', type: 'fill' },
  { utility: 'bg-{color}-ghost', steps: 'transparent → 3 → 4', use: 'Ghost button pattern', expands: 'bg-transparent dark:bg-transparent\nhover:bg-red-4 dark:hover:bg-reddark-4\nactive:bg-red-5 dark:active:bg-reddark-5', swatch: null, type: 'ghost' },
  { utility: 'bg-{color}-action', steps: '4 → 5 → 6', use: 'Selected/active surface', expands: 'bg-red-4 dark:bg-reddark-4\nhover:bg-red-5 dark:hover:bg-reddark-5\nactive:bg-red-6 dark:active:bg-reddark-6', swatch: '--color-blue-4', type: 'fill' },
  { utility: 'border-{color}-dim', steps: '6', use: 'Subtle border', expands: 'border-red-6 dark:border-reddark-6', swatch: '--color-blue-6', type: 'ring' },
  { utility: 'border-{color}-normal', steps: '7 → 8', use: 'UI border with hover', expands: 'border-red-7 dark:border-reddark-7\nhover:border-red-8 dark:hover:border-reddark-8', swatch: '--color-blue-7', type: 'ring' },
  { utility: 'bg-{color}-solid', steps: '9 → 10', use: 'Solid fill with hover', expands: 'bg-red-9 dark:bg-reddark-9\nhover:bg-red-10 dark:hover:bg-reddark-10', swatch: '--color-blue-9', type: 'fill' },
  { utility: 'text-{color}-dim', steps: '11', use: 'Secondary text', expands: 'text-red-11 dark:text-reddark-11', swatch: '--color-blue-11', type: 'fill' },
  { utility: 'text-{color}-normal', steps: '12', use: 'Primary text', expands: 'text-red-12 dark:text-reddark-12', swatch: '--color-blue-12', type: 'fill' }
]

const scaleGroups = [
  {
    label: 'Brand',
    scales: [
      { key: 'base', name: 'Base', role: 'Neutral', swatch: '--color-base-12' },
      { key: 'blue', name: 'Blue', role: 'Action / interactive', swatch: '--color-blue-9' }
    ]
  },
  {
    label: 'Alert',
    scales: [
      { key: 'red', name: 'Red', role: 'Alarm — immediate action', swatch: '--color-red-9' },
      { key: 'orange', name: 'Orange', role: 'Warning — urgent attention', swatch: '--color-orange-9' },
      { key: 'amber', name: 'Amber', role: 'Caution — awareness', swatch: '--color-amber-9' },
      { key: 'green', name: 'Green', role: 'OK — nominal state', swatch: '--color-green-9' },
      { key: 'indigo', name: 'Indigo', role: 'Info', swatch: '--color-indigo-9' }
    ]
  },
  {
    label: 'Chromatic',
    scales: [
      { key: 'tomato', name: 'Tomato', role: '', swatch: '--color-tomato-9' },
      { key: 'ruby', name: 'Ruby', role: '', swatch: '--color-ruby-9' },
      { key: 'crimson', name: 'Crimson', role: '', swatch: '--color-crimson-9' },
      { key: 'pink', name: 'Pink', role: '', swatch: '--color-pink-9' },
      { key: 'plum', name: 'Plum', role: '', swatch: '--color-plum-9' },
      { key: 'purple', name: 'Purple', role: '', swatch: '--color-purple-9' },
      { key: 'violet', name: 'Violet', role: '', swatch: '--color-violet-9' },
      { key: 'iris', name: 'Iris', role: '', swatch: '--color-iris-9' },
      { key: 'cyan', name: 'Cyan', role: '', swatch: '--color-cyan-9' },
      { key: 'teal', name: 'Teal', role: '', swatch: '--color-teal-9' },
      { key: 'jade', name: 'Jade', role: '', swatch: '--color-jade-9' },
      { key: 'grass', name: 'Grass', role: '', swatch: '--color-grass-9' },
      { key: 'brown', name: 'Brown', role: '', swatch: '--color-brown-9' },
      { key: 'bronze', name: 'Bronze', role: '', swatch: '--color-bronze-9' },
      { key: 'gold', name: 'Gold', role: '', swatch: '--color-gold-9' },
      { key: 'yellow', name: 'Yellow', role: '', swatch: '--color-yellow-9' },
      { key: 'lime', name: 'Lime', role: '', swatch: '--color-lime-9' },
      { key: 'mint', name: 'Mint', role: '', swatch: '--color-mint-9' },
      { key: 'sky', name: 'Sky', role: '', swatch: '--color-sky-9' }
    ]
  },
  {
    label: 'Neutral',
    scales: [
      { key: 'gray', name: 'Gray', role: '', swatch: '--color-gray-9' },
      { key: 'mauve', name: 'Mauve', role: '', swatch: '--color-mauve-9' },
      { key: 'slate', name: 'Slate', role: '', swatch: '--color-slate-9' },
      { key: 'sage', name: 'Sage', role: '', swatch: '--color-sage-9' },
      { key: 'olive', name: 'Olive', role: '', swatch: '--color-olive-9' },
      { key: 'sand', name: 'Sand', role: '', swatch: '--color-sand-9' }
    ]
  }
]

const specialTokens = [
  { token: '--color-focus-ring', value: 'var(--color-blue-8)', use: 'Action focus ring', swatch: '--color-focus-ring' },
  { token: '--color-focus-ring-alarm', value: 'var(--color-red-8)', use: 'Alarm focus ring', swatch: '--color-focus-ring-alarm' },
  { token: '--color-focus-ring-ok', value: 'var(--color-green-8)', use: 'OK focus ring', swatch: '--color-focus-ring-ok' },
  { token: '--color-action-disabled', value: 'var(--color-base-6)', use: 'Disabled background', swatch: '--color-action-disabled' },
  { token: '--color-action-content-disabled', value: 'var(--color-base-9)', use: 'Disabled text', swatch: '--color-action-content-disabled' }
]

// ── 02 Typography ──────────────────────────────────────────────────────────

const typeScale = [
  { name: 'broadsheet', size: '128px / 8rem', weights: 'sb · m · r', lh: '1' },
  { name: 'tabloid', size: '96px / 6rem', weights: 'sb · m · r', lh: '1' },
  { name: 'hero', size: '80px / 5rem', weights: 'sb · m · r', lh: '1' },
  { name: 'display', size: '60px / 3.75rem', weights: 'sb · m · r', lh: '1.1' },
  { name: 'title', size: '48px / 3rem', weights: 'sb · m · r', lh: '1.15' },
  { name: 'heading', size: '40px / 2.5rem', weights: 'sb · m · r', lh: '1.15' },
  { name: 'subheading', size: '30px / 1.875rem', weights: 'sb · m · r', lh: '1.25' },
  { name: 'section', size: '24px / 1.5rem', weights: 'sb · m · r', lh: '1.25' },
  { name: 'lead', size: '20px / 1.25rem', weights: 'sb · m · r', lh: '1.4' },
  { name: 'intro', size: '18px / 1.125rem', weights: 'sb · m · r', lh: '1.4' },
  { name: 'body', size: '16px / 1rem', weights: 'sb · m · r', lh: '1.4' },
  { name: 'caption', size: '14px / 0.875rem', weights: 'sb · m · r', lh: '1.4' },
  { name: 'agate', size: '12px / 0.75rem', weights: 'm · r', lh: '1.4' }
]

const typeFamilies = [
  { utility: 'font-sans', value: "'Inter Variable', system-ui, sans-serif", use: 'All UI text' },
  {
    utility: 'font-mono',
    value: "'IBM Plex Mono', ui-monospace, monospace",
    use: 'Data, code, telemetry'
  }
]

const typeWeights = [
  { utility: 'font-normal', value: '400', use: 'Body, descriptions, captions' },
  { utility: 'font-medium', value: '500', use: 'Labels, tabs, table headers' },
  { utility: 'font-semibold', value: '600', use: 'Titles, headings, navigation' }
]

const trackingTokens = [
  { utility: 'tracking-body', value: '-0.02em', use: 'body through intro' },
  { utility: 'tracking-section', value: '-0.03em', use: 'lead through subheading' },
  { utility: 'tracking-display', value: '-0.04em', use: 'heading through broadsheet (sb/m)' },
  { utility: 'tracking-display-loose', value: '-0.05em', use: 'heading through broadsheet (r)' },
  { utility: 'tracking-overline', value: '0.06em', use: 'overline only — wide spaced' }
]

// ── 03 Spacing ─────────────────────────────────────────────────────────────

const spacingTokens = [
  { utility: 'px-page-x', token: '--spacing-page-x', value: '24px', use: 'Horizontal page padding' },
  { utility: 'py-page-y', token: '--spacing-page-y', value: '24px', use: 'Vertical page padding' },
  {
    utility: 'gap-section / mb-section',
    token: '--spacing-section',
    value: '48px',
    use: 'Gap between major sections'
  }
]

// ── 04 Border Radius ───────────────────────────────────────────────────────

const radiusTokens = [
  { utility: 'rounded-instrument', token: '--radius-instrument', value: '2px', use: 'Operational instruments' },
  { utility: 'rounded-badge', token: '--radius-badge', value: '3px', use: 'Badges and tags' },
  { utility: 'rounded-panel', token: '--radius-panel', value: '4px', use: 'Panels, inputs, buttons' },
  { utility: 'rounded-card', token: '--radius-card', value: '6px', use: 'Cards and containers' },
  { utility: 'rounded-full', token: '--radius-full', value: '9999px', use: 'Circles, pills, avatars' }
]

// ── 05 Shadows ─────────────────────────────────────────────────────────────

const shadowTokens = [
  {
    utility: 'shadow-panel',
    token: '--shadow-panel',
    light: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    dark: '0 1px 3px 0 rgb(0 0 0 / 0.4)',
    use: 'Subtle elevation for panels and dropdowns'
  },
  {
    utility: 'shadow-overlay',
    token: '--shadow-overlay',
    light: '0 4px 16px 0 rgb(0 0 0 / 0.15)',
    dark: '0 4px 16px 0 rgb(0 0 0 / 0.6)',
    use: 'Strong elevation for modals and overlays'
  }
]

// ── 06 Motion ──────────────────────────────────────────────────────────────

const durationTokens = [
  { utility: 'duration-instant', token: '--duration-instant', value: '80ms', use: 'Toggles, checkboxes, micro-interactions' },
  { utility: 'duration-fast', token: '--duration-fast', value: '150ms', use: 'Hover states, button feedback' },
  { utility: 'duration-base', token: '--duration-base', value: '220ms', use: 'Default transitions, panel reveals' },
  { utility: 'duration-slow', token: '--duration-slow', value: '350ms', use: 'Page transitions, scroll reveals' }
]

const easingTokens = [
  { utility: 'ease-snap', token: '--ease-snap', value: 'cubic-bezier(0.2, 0, 0, 1)', use: 'Snappy deceleration — UI controls' },
  { utility: 'ease-glide', token: '--ease-glide', value: 'cubic-bezier(0.4, 0, 0.2, 1)', use: 'Smooth deceleration — content transitions' }
]

// ── 07 Opacity ─────────────────────────────────────────────────────────────

const opacityTokens = [
  { utility: 'opacity-disabled', token: '--opacity-disabled', value: '0.5', use: 'Disabled controls and inactive content' },
  { utility: 'opacity-hover', token: '--opacity-hover', value: '0.8', use: 'Icon-only button hover state' }
]

// ── 08 Z-Index ─────────────────────────────────────────────────────────────

const zIndexTokens = [
  { utility: 'z-base', token: '--z-base', value: '0', use: 'Default document flow' },
  { utility: 'z-sticky', token: '--z-sticky', value: '100', use: 'Sticky headers and toolbars' },
  { utility: 'z-dropdown', token: '--z-dropdown', value: '200', use: 'Dropdown menus and popovers' },
  { utility: 'z-overlay', token: '--z-overlay', value: '300', use: 'Overlay backdrops' },
  { utility: 'z-modal', token: '--z-modal', value: '400', use: 'Modal dialogs' },
  { utility: 'z-toast', token: '--z-toast', value: '500', use: 'Toast notifications' },
  { utility: 'z-tooltip', token: '--z-tooltip', value: '600', use: 'Tooltips' },
  { utility: 'z-alert', token: '--z-alert', value: '700', use: 'Operational alerts — highest layer' }
]
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Design System</p>
      <h1 class="type-display-sb text-base-normal mt-4">Tokens</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-3xl">
        All design tokens used across AUX. Primitives define raw values, semantic aliases give them
        meaning. Every color, size, duration, and radius must come from this system.
      </p>
    </section>


    <!-- ── 01 Colors ──────────────────────────────────────────────────────── -->

    <section id="colors" class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Colors
      </p>

      <!-- Semantic utilities -->
      <p class="type-overline text-base-dim mb-6">Semantic Utilities</p>
      <p class="type-agate-r text-base-dim mb-4">
        Every scale generates these 10 utilities. Replace
        <span class="font-mono text-base-normal">{color}</span> with any scale name. Expansion
        column uses <span class="font-mono text-base-normal">red</span> as example.
      </p>
      <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
        <div class="bg-base-subtle flex items-center py-2 px-4">
          <span class="type-caption-m text-base-dim w-10 shrink-0"></span>
          <span class="type-caption-m text-base-dim w-48 shrink-0">Utility</span>
          <span class="type-caption-m text-base-dim w-40 shrink-0">Steps</span>
          <span class="type-caption-m text-base-dim flex-1">Use case</span>
          <span class="type-caption-m text-base-dim w-80 shrink-0 text-right">Expands to (red)</span>
        </div>
        <div
          v-for="row in semanticUtilities"
          :key="row.utility"
          class="bg-base-app flex items-start gap-3 py-2.5 px-4"
        >
          <!-- Swatch -->
          <div class="w-10 shrink-0 flex items-center pt-0.5">
            <span
              v-if="row.type === 'ghost'"
              class="size-4 rounded-full shrink-0 border border-dashed border-base-normal"
            ></span>
            <span
              v-else-if="row.type === 'ring'"
              class="size-4 rounded-full shrink-0 border-2"
              :style="{ borderColor: `var(${row.swatch})` }"
            ></span>
            <span
              v-else
              class="size-4 rounded-full shrink-0"
              :style="{ backgroundColor: `var(${row.swatch})` }"
            ></span>
          </div>
          <span class="font-mono type-caption-r text-base-normal w-48 shrink-0 pt-0.5">{{
            row.utility
          }}</span>
          <span class="type-agate-r text-base-dim w-40 shrink-0 pt-0.5">{{ row.steps }}</span>
          <span class="type-agate-r text-base-dim flex-1 pt-0.5">{{ row.use }}</span>
          <span
            class="font-mono type-agate-r text-base-dim w-80 shrink-0 whitespace-pre-line leading-relaxed text-right"
            >{{ row.expands }}</span
          >
        </div>
      </div>

      <!-- All scales -->
      <div class="mt-16">
        <p class="type-overline text-base-dim mb-6">All Scales</p>
        <template v-for="group in scaleGroups" :key="group.label">
          <p class="type-overline text-base-dim mt-8 mb-4 first:mt-0">{{ group.label }}</p>
          <div class="grid gap-px bg-base-dim rounded-card overflow-hidden mb-2">
            <div
              v-for="scale in group.scales"
              :key="scale.key"
              class="bg-base-app flex items-center gap-3 py-2.5 px-4"
            >
              <span
                class="size-4 rounded-full shrink-0"
                :style="{ backgroundColor: `var(${scale.swatch})` }"
              ></span>
              <span class="font-mono type-caption-r text-base-normal w-28 shrink-0">{{
                scale.key
              }}</span>
              <span class="type-agate-r text-base-dim flex-1">{{ scale.role || '—' }}</span>
              <span class="font-mono type-agate-r text-base-dim shrink-0 text-right">{{
                scale.key
              }}.css</span>
            </div>
          </div>
        </template>
      </div>

      <!-- Special tokens -->
      <div class="mt-16">
        <p class="type-overline text-base-dim mb-6">Special Tokens</p>
        <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
          <div class="bg-base-subtle flex items-center py-2 px-4">
            <span class="type-caption-m text-base-dim w-10 shrink-0"></span>
            <span class="type-caption-m text-base-dim w-72 shrink-0">Token</span>
            <span class="type-caption-m text-base-dim flex-1">Value</span>
            <span class="type-caption-m text-base-dim w-48 shrink-0 text-right">Use case</span>
          </div>
          <div
            v-for="t in specialTokens"
            :key="t.token"
            class="bg-base-app flex items-center gap-3 py-2.5 px-4"
          >
            <span
              class="size-4 rounded-full shrink-0"
              :style="{ backgroundColor: `var(${t.swatch})` }"
            ></span>
            <span class="font-mono type-caption-r text-base-normal w-72 shrink-0">{{
              t.token
            }}</span>
            <span class="font-mono type-agate-r text-base-dim flex-1">{{ t.value }}</span>
            <span class="type-agate-r text-base-dim w-48 shrink-0 text-right">{{ t.use }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 02 Typography ──────────────────────────────────────────────────── -->

    <section id="typography" class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — Typography
      </p>

      <!-- Type scale -->
      <p class="type-overline text-base-dim mb-6">Type Scale</p>
      <p class="type-agate-r text-base-dim mb-4">
        13 steps from agate (12px) to broadsheet (128px). Classes use weight suffixes:
        <span class="font-mono text-base-normal">.type-{name}-sb</span>,
        <span class="font-mono text-base-normal">-m</span>,
        <span class="font-mono text-base-normal">-r</span>.
        Overline is a special formatting class with no weight suffix.
      </p>
      <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
        <div class="bg-base-subtle flex items-center py-2 px-4">
          <span class="type-caption-m text-base-dim flex-1">Example</span>
          <span class="type-caption-m text-base-dim w-32 shrink-0">Name</span>
          <span class="type-caption-m text-base-dim w-40 shrink-0">Size</span>
          <span class="type-caption-m text-base-dim w-24 shrink-0">Line height</span>
          <span class="type-caption-m text-base-dim w-32 shrink-0 text-right">Weights</span>
        </div>
        <div
          v-for="step in typeScale"
          :key="step.name"
          class="bg-base-app flex items-baseline gap-3 py-2.5 px-4"
        >
          <span
            class="flex-1 text-base-normal whitespace-nowrap"
            :class="`type-${step.name}-m`"
            >Ag</span
          >
          <span class="font-mono type-caption-r text-base-normal w-32 shrink-0">{{
            step.name
          }}</span>
          <span class="type-agate-r text-base-dim w-40 shrink-0">{{ step.size }}</span>
          <span class="type-agate-r text-base-dim w-24 shrink-0">{{ step.lh }}</span>
          <span class="type-agate-r text-base-dim w-32 shrink-0 text-right">{{ step.weights }}</span>
        </div>
        <div class="bg-base-app flex items-baseline gap-3 py-2.5 px-4">
          <span class="flex-1 type-overline text-base-normal">AG</span>
          <span class="font-mono type-caption-r text-base-normal w-32 shrink-0">overline</span>
          <span class="type-agate-r text-base-dim w-40 shrink-0">11px / 0.6875rem</span>
          <span class="type-agate-r text-base-dim w-24 shrink-0">1.4</span>
          <span class="type-agate-r text-base-dim w-32 shrink-0 text-right">m only</span>
        </div>
      </div>

      <!-- Families -->
      <div class="mt-16">
        <p class="type-overline text-base-dim mb-6">Families</p>
        <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
          <div class="bg-base-subtle flex items-center py-2 px-4">
            <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
            <span class="type-caption-m text-base-dim w-28 shrink-0">Utility</span>
            <span class="type-caption-m text-base-dim flex-1">Value</span>
            <span class="type-caption-m text-base-dim w-48 shrink-0 text-right">Use case</span>
          </div>
          <div
            v-for="f in typeFamilies"
            :key="f.utility"
            class="bg-base-app flex items-center gap-3 py-2.5 px-4"
          >
            <div class="w-14 shrink-0 flex items-center">
              <span
                class="type-lead-m text-base-normal leading-none"
                :class="f.utility === 'font-mono' ? 'font-mono' : 'font-sans'"
                >Ag</span
              >
            </div>
            <span class="font-mono type-caption-r text-base-normal w-28 shrink-0">{{
              f.utility
            }}</span>
            <span class="font-mono type-agate-r text-base-dim flex-1">{{ f.value }}</span>
            <span class="type-agate-r text-base-dim w-48 shrink-0 text-right">{{ f.use }}</span>
          </div>
        </div>
      </div>

      <!-- Weights -->
      <div class="mt-16">
        <p class="type-overline text-base-dim mb-6">Weights</p>
        <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
          <div class="bg-base-subtle flex items-center py-2 px-4">
            <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
            <span class="type-caption-m text-base-dim w-36 shrink-0">Utility</span>
            <span class="type-caption-m text-base-dim flex-1">Value</span>
            <span class="type-caption-m text-base-dim w-56 shrink-0 text-right">Use case</span>
          </div>
          <div
            v-for="w in typeWeights"
            :key="w.utility"
            class="bg-base-app flex items-center gap-3 py-2.5 px-4"
          >
            <div class="w-14 shrink-0 flex items-center">
              <span
                class="type-lead-r text-base-normal leading-none"
                :style="{ fontWeight: w.value }"
                >Ag</span
              >
            </div>
            <span class="font-mono type-caption-r text-base-normal w-36 shrink-0">{{
              w.utility
            }}</span>
            <span class="type-agate-r text-base-dim flex-1">{{ w.value }}</span>
            <span class="type-agate-r text-base-dim w-56 shrink-0 text-right">{{ w.use }}</span>
          </div>
        </div>
      </div>

      <!-- Tracking -->
      <div class="mt-16">
        <p class="type-overline text-base-dim mb-6">Tracking</p>
        <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
          <div class="bg-base-subtle flex items-center py-2 px-4">
            <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
            <span class="type-caption-m text-base-dim w-52 shrink-0">Utility</span>
            <span class="type-caption-m text-base-dim flex-1">Value</span>
            <span class="type-caption-m text-base-dim w-64 shrink-0 text-right">Applies to</span>
          </div>
          <div
            v-for="t in trackingTokens"
            :key="t.utility"
            class="bg-base-app flex items-center gap-3 py-2.5 px-4"
          >
            <div class="w-14 shrink-0 flex items-center">
              <span
                class="type-agate-m text-base-normal leading-none"
                :style="{ letterSpacing: t.value }"
                >ABC</span
              >
            </div>
            <span class="font-mono type-caption-r text-base-normal w-52 shrink-0">{{
              t.utility
            }}</span>
            <span class="type-agate-r text-base-dim flex-1">{{ t.value }}</span>
            <span class="type-agate-r text-base-dim w-64 shrink-0 text-right">{{ t.use }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 03 Spacing ─────────────────────────────────────────────────────── -->

    <section id="spacing" class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Spacing
      </p>
      <p class="type-agate-r text-base-dim mb-4">
        Three page-level constants. All other spacing uses Tailwind's built-in scale directly.
      </p>
      <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
        <div class="bg-base-subtle flex items-center py-2 px-4">
          <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
          <span class="type-caption-m text-base-dim w-48 shrink-0">Utility</span>
          <span class="type-caption-m text-base-dim flex-1">Token</span>
          <span class="type-caption-m text-base-dim w-20 shrink-0">Value</span>
          <span class="type-caption-m text-base-dim w-56 shrink-0 text-right">Use case</span>
        </div>
        <div
          v-for="t in spacingTokens"
          :key="t.token"
          class="bg-base-app flex items-center gap-3 py-2.5 px-4"
        >
          <div class="w-14 shrink-0 flex items-center">
            <div
              class="h-3 rounded-full bg-blue-solid"
              :style="{ width: t.value }"
            ></div>
          </div>
          <span class="font-mono type-caption-r text-base-normal w-48 shrink-0">{{
            t.utility
          }}</span>
          <span class="font-mono type-agate-r text-base-dim flex-1">{{ t.token }}</span>
          <span class="type-agate-r text-base-dim w-20 shrink-0">{{ t.value }}</span>
          <span class="type-agate-r text-base-dim w-56 shrink-0 text-right">{{ t.use }}</span>
        </div>
      </div>
    </section>

    <!-- ── 04 Border Radius ───────────────────────────────────────────────── -->

    <section id="border-radius" class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Border Radius
      </p>
      <p class="type-agate-r text-base-dim mb-4">
        Four named radii. Tighter for operational precision, slightly larger for cards and
        containers.
      </p>
      <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
        <div class="bg-base-subtle flex items-center py-2 px-4">
          <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
          <span class="type-caption-m text-base-dim w-44 shrink-0">Utility</span>
          <span class="type-caption-m text-base-dim flex-1">Token</span>
          <span class="type-caption-m text-base-dim w-20 shrink-0">Value</span>
          <span class="type-caption-m text-base-dim w-48 shrink-0 text-right">Use case</span>
        </div>
        <div
          v-for="t in radiusTokens"
          :key="t.token"
          class="bg-base-app flex items-center gap-3 py-2.5 px-4"
        >
          <div class="w-14 shrink-0 flex items-center">
            <div
              class="size-8 bg-base-ui border border-base-dim"
              :style="{ borderRadius: t.value }"
            ></div>
          </div>
          <span class="font-mono type-caption-r text-base-normal w-44 shrink-0">{{
            t.utility
          }}</span>
          <span class="font-mono type-agate-r text-base-dim flex-1">{{ t.token }}</span>
          <span class="type-agate-r text-base-dim w-20 shrink-0">{{ t.value }}</span>
          <span class="type-agate-r text-base-dim w-48 shrink-0 text-right">{{ t.use }}</span>
        </div>
      </div>
    </section>

    <!-- ── 05 Shadows ─────────────────────────────────────────────────────── -->

    <section id="shadows" class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — Shadows
      </p>
      <p class="type-agate-r text-base-dim mb-4">
        Theme-aware shadows. Subtle in light mode, pronounced in dark.
      </p>
      <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
        <div class="bg-base-subtle flex items-center py-2 px-4">
          <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
          <span class="type-caption-m text-base-dim w-40 shrink-0">Utility</span>
          <span class="type-caption-m text-base-dim flex-1">Token</span>
          <span class="type-caption-m text-base-dim w-64 shrink-0 text-right">Use case</span>
        </div>
        <div
          v-for="t in shadowTokens"
          :key="t.token"
          class="bg-base-app flex items-center gap-3 py-3 px-4"
        >
          <div class="w-14 shrink-0 flex items-center">
            <div
              class="size-10 bg-base-ui rounded-card"
              :style="{ boxShadow: `var(${t.token})` }"
            ></div>
          </div>
          <span class="font-mono type-caption-r text-base-normal w-40 shrink-0">{{
            t.utility
          }}</span>
          <span class="font-mono type-agate-r text-base-dim flex-1">{{ t.token }}</span>
          <span class="type-agate-r text-base-dim w-64 shrink-0 text-right">{{ t.use }}</span>
        </div>
      </div>
    </section>

    <!-- ── 06 Motion ──────────────────────────────────────────────────────── -->

    <section id="motion" class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — Motion
      </p>

      <!-- Durations -->
      <p class="type-overline text-base-dim mb-6">Durations</p>
      <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
        <div class="bg-base-subtle flex items-center py-2 px-4">
          <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
          <span class="type-caption-m text-base-dim w-40 shrink-0">Utility</span>
          <span class="type-caption-m text-base-dim flex-1">Token</span>
          <span class="type-caption-m text-base-dim w-20 shrink-0">Value</span>
          <span class="type-caption-m text-base-dim w-64 shrink-0 text-right">Use case</span>
        </div>
        <div
          v-for="t in durationTokens"
          :key="t.token"
          class="bg-base-app flex items-center gap-3 py-2.5 px-4 token-row"
        >
          <!-- Animated circle -->
          <div class="w-14 shrink-0 flex items-center">
            <div class="w-12 h-4 rounded-full bg-base-subtle relative overflow-hidden">
              <span
                class="absolute top-0.5 left-0.5 size-3 rounded-full bg-blue-solid token-slide"
                :style="{ animationDuration: `var(${t.token})` }"
              ></span>
            </div>
          </div>
          <span class="font-mono type-caption-r text-base-normal w-40 shrink-0">{{
            t.utility
          }}</span>
          <span class="font-mono type-agate-r text-base-dim flex-1">{{ t.token }}</span>
          <span class="type-agate-r text-base-dim w-20 shrink-0">{{ t.value }}</span>
          <span class="type-agate-r text-base-dim w-64 shrink-0 text-right">{{ t.use }}</span>
        </div>
      </div>

      <!-- Easings -->
      <div class="mt-16">
        <p class="type-overline text-base-dim mb-6">Easings</p>
        <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
          <div class="bg-base-subtle flex items-center py-2 px-4">
            <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
            <span class="type-caption-m text-base-dim w-28 shrink-0">Utility</span>
            <span class="type-caption-m text-base-dim flex-1">Value</span>
            <span class="type-caption-m text-base-dim w-72 shrink-0 text-right">Use case</span>
          </div>
          <div
            v-for="t in easingTokens"
            :key="t.token"
            class="bg-base-app flex items-center gap-3 py-2.5 px-4 token-row"
          >
            <!-- Animated circle with easing -->
            <div class="w-14 shrink-0 flex items-center">
              <div class="w-12 h-4 rounded-full bg-base-subtle relative overflow-hidden">
                <span
                  class="absolute top-0.5 left-0.5 size-3 rounded-full bg-blue-solid token-slide"
                  :style="{ animationTimingFunction: `var(${t.token})` }"
                ></span>
              </div>
            </div>
            <span class="font-mono type-caption-r text-base-normal w-28 shrink-0">{{
              t.utility
            }}</span>
            <span class="font-mono type-agate-r text-base-dim flex-1">{{ t.value }}</span>
            <span class="type-agate-r text-base-dim w-72 shrink-0 text-right">{{ t.use }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 07 Opacity ─────────────────────────────────────────────────────── -->

    <section id="opacity" class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">07</span> — Opacity
      </p>
      <p class="type-agate-r text-base-dim mb-4">
        Named opacity values for disabled and hover states.
      </p>
      <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
        <div class="bg-base-subtle flex items-center py-2 px-4">
          <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
          <span class="type-caption-m text-base-dim w-44 shrink-0">Utility</span>
          <span class="type-caption-m text-base-dim flex-1">Token</span>
          <span class="type-caption-m text-base-dim w-16 shrink-0">Value</span>
          <span class="type-caption-m text-base-dim w-64 shrink-0 text-right">Use case</span>
        </div>
        <div
          v-for="t in opacityTokens"
          :key="t.token"
          class="bg-base-app flex items-center gap-3 py-2.5 px-4"
        >
          <div class="w-14 shrink-0 flex items-center">
            <span
              class="size-4 rounded-full bg-blue-solid"
              :style="{ opacity: t.value }"
            ></span>
          </div>
          <span class="font-mono type-caption-r text-base-normal w-44 shrink-0">{{
            t.utility
          }}</span>
          <span class="font-mono type-agate-r text-base-dim flex-1">{{ t.token }}</span>
          <span class="type-agate-r text-base-dim w-16 shrink-0">{{ t.value }}</span>
          <span class="type-agate-r text-base-dim w-64 shrink-0 text-right">{{ t.use }}</span>
        </div>
      </div>
    </section>

    <!-- ── 08 Z-Index ─────────────────────────────────────────────────────── -->

    <section id="z-index" class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">08</span> — Z-Index
      </p>
      <p class="type-agate-r text-base-dim mb-4">
        Stacking order for layered UI. Each level reserves a 100-unit gap for intermediate values.
      </p>
      <div class="grid gap-px bg-base-dim rounded-card overflow-hidden">
        <div class="bg-base-subtle flex items-center py-2 px-4">
          <span class="type-caption-m text-base-dim w-14 shrink-0"></span>
          <span class="type-caption-m text-base-dim w-32 shrink-0">Utility</span>
          <span class="type-caption-m text-base-dim flex-1">Token</span>
          <span class="type-caption-m text-base-dim w-16 shrink-0">Value</span>
          <span class="type-caption-m text-base-dim w-56 shrink-0 text-right">Use case</span>
        </div>
        <div
          v-for="(t, i) in zIndexTokens"
          :key="t.token"
          class="bg-base-app flex items-center gap-3 py-2.5 px-4"
        >
          <!-- Stacked circles showing layer depth -->
          <div class="w-14 shrink-0 flex items-center">
            <div class="relative h-5 w-10">
              <span
                v-for="j in (i + 1)"
                :key="j"
                class="absolute rounded-full border border-base-dim"
                :class="j === i + 1 ? 'bg-blue-solid border-transparent' : 'bg-base-ui'"
                :style="{
                  width: '12px',
                  height: '12px',
                  left: `${(j - 1) * 3}px`,
                  top: `${10 - (j - 1) * 1.5}px`
                }"
              ></span>
            </div>
          </div>
          <span class="font-mono type-caption-r text-base-normal w-32 shrink-0">{{
            t.utility
          }}</span>
          <span class="font-mono type-agate-r text-base-dim flex-1">{{ t.token }}</span>
          <span class="type-agate-r text-base-dim w-16 shrink-0">{{ t.value }}</span>
          <span class="type-agate-r text-base-dim w-56 shrink-0 text-right">{{ t.use }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes token-slide {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(24px); }
}
.token-slide {
  animation: token-slide 1.5s infinite;
  animation-timing-function: var(--ease-glide);
  animation-play-state: paused;
}
.token-row:hover .token-slide {
  animation-play-state: running;
}
</style>
