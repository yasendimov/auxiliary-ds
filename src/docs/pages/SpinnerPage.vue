<script setup>
import { Spinner, Button } from '../../components'

const variants = ['primary', 'ghost', 'destructive']
const sizes = ['sm', 'md', 'lg']
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Spinner</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        SVG loading indicator. Three sizes, three color variants. Used standalone or inside Button's
        loading state.
      </p>
    </section>

    <!-- 01 Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Sizes</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div
          v-for="size in sizes"
          :key="size"
          class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3"
        >
          <Spinner :size="size" />
          <span class="type-overline text-base-dim">{{ size }}</span>
        </div>
      </div>
    </section>

    <!-- 02 Variants -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — Variants
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div
          class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3 bg-base-ui text-base-normal"
        >
          <Spinner variant="current" />
          <span class="type-overline text-base-dim">current</span>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Spinner variant="action" />
          <span class="type-overline text-base-dim">action</span>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Spinner variant="dim" />
          <span class="type-overline text-base-dim">dim</span>
        </div>
      </div>
    </section>

    <!-- 03 On colored backgrounds -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — On colored backgrounds
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div
          class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3 bg-base-ui text-base-normal"
        >
          <Spinner variant="current" />
          <span class="type-overline text-base-dim">bg-base-ui</span>
        </div>
        <div
          class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3 bg-blue-solid text-blue-normal"
        >
          <Spinner variant="current" />
          <span class="type-overline opacity-75">bg-blue-solid</span>
        </div>
        <div
          class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3 bg-red-ui text-red-dim"
        >
          <Spinner variant="current" />
          <span class="type-overline text-base-dim">bg-red-ui</span>
        </div>
      </div>
    </section>

    <!-- 04 In buttons -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — In buttons
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <template v-for="variant in variants" :key="variant">
          <div
            v-for="size in sizes"
            :key="`${variant}-${size}`"
            class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
          >
            <span class="type-overline text-base-dim">{{ variant }} / {{ size }}</span>
            <div>
              <Button :variant="variant" :size="size" loading>Loading</Button>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- 05 Standalone loading state -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — Standalone loading state
      </p>
      <div class="max-w-sm rounded-card bg-base-ui p-6 flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p class="type-caption-r text-base-dim">Loading mission data&hellip;</p>
      </div>
    </section>

    <!-- 06 Usage note -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">06</span> — Usage</p>
      <div class="max-w-2xl">
        <p class="type-body-r text-base-normal">
          Spinner is always decorative and renders with aria-hidden. When used inside a Button, the
          button's own aria-busy attribute communicates the loading state to assistive technology.
          When used as a standalone page or section loader, wrap it in a container with
          role="status" and include a visually hidden label describing what is loading, so screen
          readers announce the state without relying on the visual spinner.
        </p>
      </div>
    </section>
  </div>
</template>
