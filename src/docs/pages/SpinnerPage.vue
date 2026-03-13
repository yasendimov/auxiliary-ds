<script setup>
import { AuxSpinner, AuxButton } from '../../components'

const variants = ['primary', 'ghost', 'destructive']
const sizes = ['sm', 'md', 'lg']
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-content-dim">Foundation</p>
      <h1 class="type-display-sb text-content-high mt-4">Spinner</h1>
      <p class="type-lead-r text-content-low mt-4 max-w-xl">
        SVG loading indicator. Three sizes, three color variants. Used standalone or inside
        Button's loading state.
      </p>
    </section>

    <!-- 01 Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">01</span> — Sizes
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <div
          v-for="size in sizes"
          :key="size"
          class="border-b border-r border-line p-8 flex flex-col items-center gap-3"
        >
          <AuxSpinner :size="size" />
          <span class="type-overline text-content-dim">{{ size }}</span>
        </div>
      </div>
    </section>

    <!-- 02 Variants -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">02</span> — Variants
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3 bg-surface-2 text-content-high">
          <AuxSpinner variant="current" />
          <span class="type-overline text-content-dim">current</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxSpinner variant="action" />
          <span class="type-overline text-content-dim">action</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxSpinner variant="dim" />
          <span class="type-overline text-content-dim">dim</span>
        </div>
      </div>
    </section>

    <!-- 03 On colored backgrounds -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">03</span> — On colored backgrounds
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3 bg-surface-1 text-content-high">
          <AuxSpinner variant="current" />
          <span class="type-overline text-content-dim">bg-surface-1</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3 bg-action text-action-contrast">
          <AuxSpinner variant="current" />
          <span class="type-overline opacity-75">bg-action</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3 bg-alarm-subtle text-alarm-content">
          <AuxSpinner variant="current" />
          <span class="type-overline text-content-dim">bg-alarm-subtle</span>
        </div>
      </div>
    </section>

    <!-- 04 In buttons -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">04</span> — In buttons
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <template v-for="variant in variants" :key="variant">
          <div
            v-for="size in sizes"
            :key="`${variant}-${size}`"
            class="border-b border-r border-line p-8 flex flex-col gap-3"
          >
            <span class="type-overline text-content-dim">{{ variant }} / {{ size }}</span>
            <div>
              <AuxButton :variant="variant" :size="size" loading>Loading</AuxButton>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- 05 Standalone loading state -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">05</span> — Standalone loading state
      </p>
      <div class="max-w-sm rounded-card bg-surface-1 p-6 flex flex-col items-center gap-3">
        <AuxSpinner size="lg" />
        <p class="type-caption-r text-content-dim">Loading mission data&hellip;</p>
      </div>
    </section>

    <!-- 06 Usage note -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">06</span> — Usage
      </p>
      <div class="max-w-2xl">
        <p class="type-body-r text-content-high">
          Spinner is always decorative and renders with aria-hidden. When used inside a Button,
          the button's own aria-busy attribute communicates the loading state to assistive
          technology. When used as a standalone page or section loader, wrap it in a container
          with role="status" and include a visually hidden label describing what is loading, so
          screen readers announce the state without relying on the visual spinner.
        </p>
      </div>
    </section>
  </div>
</template>
