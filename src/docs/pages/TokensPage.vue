<script setup>
import { Header, Section } from '../../components'

const colorTokens = [
  { group: 'Surface', tokens: [
    { utility: 'bg-page', token: '--color-page', ref: 'var(--base-1)' },
    { utility: 'bg-page-subtle', token: '--color-page-subtle', ref: 'var(--base-2)' },
    { utility: 'bg-surface-1', token: '--color-surface-1', ref: 'var(--base-3)' },
    { utility: 'bg-surface-2', token: '--color-surface-2', ref: 'var(--base-4)' },
    { utility: 'bg-surface-3', token: '--color-surface-3', ref: 'var(--base-5)' },
  ]},
  { group: 'Text', tokens: [
    { utility: 'text-content-high', token: '--color-content-high', ref: 'var(--base-12)' },
    { utility: 'text-content-low', token: '--color-content-low', ref: 'var(--base-11)' },
    { utility: 'text-content-dim', token: '--color-content-dim', ref: 'var(--base-9)' },
  ]},
  { group: 'Lines', tokens: [
    { utility: 'border-line', token: '--color-line', ref: 'var(--base-6)' },
    { utility: 'border-line-hover', token: '--color-line-hover', ref: 'var(--base-7)' },
    { utility: 'border-line-focus', token: '--color-line-focus', ref: 'var(--base-8)' },
  ]},
  { group: 'Action', tokens: [
    { utility: 'bg-action', token: '--color-action', ref: 'var(--blue-9)' },
    { utility: 'bg-action-hover', token: '--color-action-hover', ref: 'var(--blue-10)' },
    { utility: 'bg-action-subtle', token: '--color-action-subtle', ref: 'var(--blue-3)' },
    { utility: 'text-action-content', token: '--color-action-content', ref: 'var(--blue-11)' },
    { utility: 'text-action-contrast', token: '--color-action-contrast', ref: 'var(--blue-12)' },
    { utility: 'bg-action-disabled', token: '--color-action-disabled', ref: 'var(--base-6)' },
    { utility: 'text-action-content-disabled', token: '--color-action-content-disabled', ref: 'var(--base-9)' },
  ]},
  { group: 'Focus', tokens: [
    { utility: 'outline-focus-ring', token: '--color-focus-ring', ref: 'var(--blue-8)' },
    { utility: 'outline-focus-ring-alarm', token: '--color-focus-ring-alarm', ref: 'var(--red-8)' },
    { utility: 'outline-focus-ring-ok', token: '--color-focus-ring-ok', ref: 'var(--green-8)' },
  ]},
  { group: 'Info', tokens: [
    { utility: 'bg-info', token: '--color-info', ref: 'var(--indigo-9)' },
    { utility: 'bg-info-subtle', token: '--color-info-subtle', ref: 'var(--indigo-3)' },
    { utility: 'bg-info-hover', token: '--color-info-hover', ref: 'var(--indigo-10)' },
    { utility: 'text-info-content', token: '--color-info-content', ref: 'var(--indigo-11)' },
    { utility: 'text-info-contrast', token: '--color-info-contrast', ref: 'var(--indigo-12)' },
  ]},
  { group: 'Alarm', tokens: [
    { utility: 'bg-alarm', token: '--color-alarm', ref: 'var(--red-9)' },
    { utility: 'bg-alarm-subtle', token: '--color-alarm-subtle', ref: 'var(--red-3)' },
    { utility: 'bg-alarm-hover', token: '--color-alarm-hover', ref: 'var(--red-10)' },
    { utility: 'text-alarm-content', token: '--color-alarm-content', ref: 'var(--red-11)' },
    { utility: 'text-alarm-contrast', token: '--color-alarm-contrast', ref: 'var(--red-12)' },
  ]},
  { group: 'Warning', tokens: [
    { utility: 'bg-warning', token: '--color-warning', ref: 'var(--orange-9)' },
    { utility: 'bg-warning-subtle', token: '--color-warning-subtle', ref: 'var(--orange-3)' },
    { utility: 'bg-warning-hover', token: '--color-warning-hover', ref: 'var(--orange-10)' },
    { utility: 'text-warning-content', token: '--color-warning-content', ref: 'var(--orange-11)' },
    { utility: 'text-warning-contrast', token: '--color-warning-contrast', ref: 'var(--orange-12)' },
  ]},
  { group: 'Caution', tokens: [
    { utility: 'bg-caution', token: '--color-caution', ref: 'var(--amber-9)' },
    { utility: 'bg-caution-subtle', token: '--color-caution-subtle', ref: 'var(--amber-3)' },
    { utility: 'bg-caution-hover', token: '--color-caution-hover', ref: 'var(--amber-10)' },
    { utility: 'text-caution-content', token: '--color-caution-content', ref: 'var(--amber-11)' },
    { utility: 'text-caution-contrast', token: '--color-caution-contrast', ref: 'var(--amber-12)' },
  ]},
  { group: 'OK', tokens: [
    { utility: 'bg-ok', token: '--color-ok', ref: 'var(--green-9)' },
    { utility: 'bg-ok-subtle', token: '--color-ok-subtle', ref: 'var(--green-3)' },
    { utility: 'bg-ok-hover', token: '--color-ok-hover', ref: 'var(--green-10)' },
    { utility: 'text-ok-content', token: '--color-ok-content', ref: 'var(--green-11)' },
    { utility: 'text-ok-contrast', token: '--color-ok-contrast', ref: 'var(--green-12)' },
  ]},
]

const typographyTokens = [
  { utility: 'font-sans', token: '--font-sans', value: "'Inter Variable', system-ui, sans-serif" },
  { utility: 'font-mono', token: '--font-mono', value: "'IBM Plex Mono', ui-monospace" },
  { utility: 'font-normal', token: '--font-weight-normal', value: '400' },
  { utility: 'font-medium', token: '--font-weight-medium', value: '500' },
  { utility: 'font-semibold', token: '--font-weight-semibold', value: '600' },
]

const typeScale = [
  { utility: '.type-broadsheet-*', size: '128px' },
  { utility: '.type-tabloid-*', size: '96px' },
  { utility: '.type-hero-*', size: '80px' },
  { utility: '.type-display-*', size: '60px' },
  { utility: '.type-title-*', size: '48px' },
  { utility: '.type-heading-*', size: '40px' },
  { utility: '.type-subheading-*', size: '30px' },
  { utility: '.type-section-*', size: '24px' },
  { utility: '.type-lead-*', size: '20px' },
  { utility: '.type-intro-*', size: '18px' },
  { utility: '.type-body-*', size: '16px' },
  { utility: '.type-caption-*', size: '14px' },
  { utility: '.type-agate-*', size: '12px' },
  { utility: '.type-overline', size: '11px' },
]

const spacingTokens = [
  { utility: 'px-page-x', token: '--spacing-page-x', value: '24px' },
  { utility: 'py-page-y', token: '--spacing-page-y', value: '24px' },
  { utility: 'gap-section', token: '--spacing-section', value: '48px' },
]

const radiusTokens = [
  { utility: 'rounded-instrument', token: '--radius-instrument', value: '2px' },
  { utility: 'rounded-panel', token: '--radius-panel', value: '4px' },
  { utility: 'rounded-card', token: '--radius-card', value: '6px' },
  { utility: 'rounded-badge', token: '--radius-badge', value: '3px' },
]

const shadowTokens = [
  { utility: 'shadow-panel', token: '--shadow-panel', light: '0 1px 3px 0 rgb(0 0 0 / 0.1)', dark: '0 1px 3px 0 rgb(0 0 0 / 0.4)' },
  { utility: 'shadow-overlay', token: '--shadow-overlay', light: '0 4px 16px 0 rgb(0 0 0 / 0.15)', dark: '0 4px 16px 0 rgb(0 0 0 / 0.6)' },
]

const motionTokens = [
  { utility: 'duration-instant', token: '--duration-instant', value: '80ms' },
  { utility: 'duration-fast', token: '--duration-fast', value: '150ms' },
  { utility: 'duration-base', token: '--duration-base', value: '220ms' },
  { utility: 'duration-slow', token: '--duration-slow', value: '350ms' },
  { utility: 'ease-snap', token: '--ease-snap', value: 'cubic-bezier(0.2, 0, 0, 1)' },
  { utility: 'ease-glide', token: '--ease-glide', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
]

const opacityTokens = [
  { utility: 'opacity-disabled', token: '--opacity-disabled', value: '0.5' },
  { utility: 'opacity-hover', token: '--opacity-hover', value: '0.8' },
]

const zIndexTokens = [
  { utility: 'z-base', token: '--z-base', value: '0' },
  { utility: 'z-sticky', token: '--z-sticky', value: '100' },
  { utility: 'z-dropdown', token: '--z-dropdown', value: '200' },
  { utility: 'z-overlay', token: '--z-overlay', value: '300' },
  { utility: 'z-modal', token: '--z-modal', value: '400' },
  { utility: 'z-toast', token: '--z-toast', value: '500' },
  { utility: 'z-tooltip', token: '--z-tooltip', value: '600' },
]
</script>

<template>
  <div>
    <Header eyebrow="09" headline="Tokens" description="All design tokens used across AUX. Two-layer system: primitives define raw values, semantic aliases give them meaning." />

    <!-- Colors -->
    <Section id="colors" label="01 — Colors">
      <p class="type-caption-m text-content-low mb-8">
        Semantic color aliases defined in <span class="font-mono">@theme</span>. These reference primitive scales from <span class="font-mono">colors.css</span> and resolve automatically when the theme changes.
      </p>
      <div v-for="group in colorTokens" :key="group.group" class="mb-8 last:mb-0">
        <p class="type-caption-sb text-content-high mb-3">{{ group.group }}</p>
        <div class="grid gap-px bg-line rounded-card overflow-hidden">
          <div
            v-for="token in group.tokens"
            :key="token.token"
            class="bg-page flex items-center gap-4 py-2.5 px-4"
          >
            <div
              class="size-5 rounded-panel shrink-0 border border-line"
              :style="{ backgroundColor: `var(${token.token})` }"
            ></div>
            <span class="font-mono type-caption-r text-content-high">{{ token.utility }}</span>
            <span class="font-mono type-agate-r text-content-dim ml-auto">{{ token.token }} <span class="text-line">|</span> {{ token.ref }}</span>
          </div>
        </div>
      </div>
    </Section>

    <div class="border-b border-line"></div>

    <!-- Typography -->
    <Section id="typography" label="02 — Typography">
      <p class="type-caption-m text-content-low mb-8">
        Font families, weights, and the 13-step type scale. Classes use weight suffixes: <span class="font-mono">.type-{name}-sb</span>, <span class="font-mono">-m</span>, <span class="font-mono">-r</span>.
      </p>

      <p class="type-caption-sb text-content-high mb-3">Families & Weights</p>
      <div class="grid gap-px bg-line rounded-card overflow-hidden mb-8">
        <div
          v-for="token in typographyTokens"
          :key="token.token"
          class="bg-page flex items-center justify-between py-2.5 px-4"
        >
          <span class="font-mono type-caption-r text-content-high">{{ token.utility }}</span>
          <span class="font-mono type-agate-r text-content-dim">{{ token.token }} <span class="text-line">|</span> {{ token.value }}</span>
        </div>
      </div>

      <p class="type-caption-sb text-content-high mb-3">Type Scale</p>
      <div class="grid gap-px bg-line rounded-card overflow-hidden">
        <div
          v-for="step in typeScale"
          :key="step.utility"
          class="bg-page flex items-center justify-between py-2.5 px-4"
        >
          <span class="font-mono type-caption-r text-content-high">{{ step.utility }}</span>
          <span class="font-mono type-agate-r text-content-dim">{{ step.size }}</span>
        </div>
      </div>
    </Section>

    <div class="border-b border-line"></div>

    <!-- Spacing -->
    <Section id="spacing" label="03 — Spacing">
      <p class="type-caption-m text-content-low mb-8">
        Page-level constants. All other spacing uses Tailwind's built-in scale directly.
      </p>
      <div class="grid gap-px bg-line rounded-card overflow-hidden">
        <div
          v-for="token in spacingTokens"
          :key="token.token"
          class="bg-page flex items-center justify-between py-2.5 px-4"
        >
          <span class="font-mono type-caption-r text-content-high">{{ token.utility }}</span>
          <span class="font-mono type-agate-r text-content-dim">{{ token.token }} <span class="text-line">|</span> {{ token.value }}</span>
        </div>
      </div>
    </Section>

    <div class="border-b border-line"></div>

    <!-- Border Radius -->
    <Section id="border-radius" label="04 — Border Radius">
      <div class="grid gap-px bg-line rounded-card overflow-hidden">
        <div
          v-for="token in radiusTokens"
          :key="token.token"
          class="bg-page flex items-center gap-4 py-2.5 px-4"
        >
          <div
            class="size-8 bg-surface-2 border border-line shrink-0"
            :style="{ borderRadius: `var(${token.token})` }"
          ></div>
          <span class="font-mono type-caption-r text-content-high">{{ token.utility }}</span>
          <span class="font-mono type-agate-r text-content-dim ml-auto">{{ token.token }} <span class="text-line">|</span> {{ token.value }}</span>
        </div>
      </div>
    </Section>

    <div class="border-b border-line"></div>

    <!-- Shadows -->
    <Section id="shadows" label="05 — Shadows">
      <p class="type-caption-m text-content-low mb-8">
        Theme-aware shadows. Subtle in light mode, pronounced in dark.
      </p>
      <div class="grid gap-px bg-line rounded-card overflow-hidden">
        <div
          v-for="token in shadowTokens"
          :key="token.token"
          class="bg-page flex items-center gap-4 py-4 px-4"
        >
          <div
            class="size-10 bg-surface-1 rounded-card shrink-0"
            :style="{ boxShadow: `var(${token.token})` }"
          ></div>
          <span class="font-mono type-caption-r text-content-high">{{ token.utility }}</span>
          <span class="font-mono type-agate-r text-content-dim ml-auto">{{ token.token }} <span class="text-line">|</span> light: {{ token.light }} <span class="text-line">|</span> dark: {{ token.dark }}</span>
        </div>
      </div>
    </Section>

    <div class="border-b border-line"></div>

    <!-- Motion -->
    <Section id="motion" label="06 — Motion">
      <div class="grid gap-px bg-line rounded-card overflow-hidden">
        <div
          v-for="token in motionTokens"
          :key="token.token"
          class="bg-page flex items-center justify-between py-2.5 px-4"
        >
          <span class="font-mono type-caption-r text-content-high">{{ token.utility }}</span>
          <span class="font-mono type-agate-r text-content-dim">{{ token.token }} <span class="text-line">|</span> {{ token.value }}</span>
        </div>
      </div>
    </Section>

    <div class="border-b border-line"></div>

    <!-- Opacity -->
    <Section id="opacity" label="07 — Opacity">
      <p class="type-caption-m text-content-low mb-8">
        Named opacity values for disabled and hover states. Applied via <span class="font-mono">opacity-*</span> utilities.
      </p>
      <div class="grid gap-px bg-line rounded-card overflow-hidden">
        <div
          v-for="token in opacityTokens"
          :key="token.token"
          class="bg-page flex items-center gap-4 py-2.5 px-4"
        >
          <div
            class="size-8 bg-action rounded-panel shrink-0"
            :style="{ opacity: `var(${token.token})` }"
          ></div>
          <span class="font-mono type-caption-r text-content-high">{{ token.utility }}</span>
          <span class="font-mono type-agate-r text-content-dim ml-auto">{{ token.token }} <span class="text-line">|</span> {{ token.value }}</span>
        </div>
      </div>
    </Section>

    <div class="border-b border-line"></div>

    <!-- Z-Index -->
    <Section id="z-index" label="08 — Z-Index">
      <div class="grid gap-px bg-line rounded-card overflow-hidden">
        <div
          v-for="token in zIndexTokens"
          :key="token.token"
          class="bg-page flex items-center justify-between py-2.5 px-4"
        >
          <span class="font-mono type-caption-r text-content-high">{{ token.utility }}</span>
          <span class="font-mono type-agate-r text-content-dim">{{ token.token }} <span class="text-line">|</span> {{ token.value }}</span>
        </div>
      </div>
    </Section>
  </div>
</template>
