<script setup>
import { Badge } from '../../components'

const variants = ['default', 'info', 'success', 'warning', 'danger']
const sizes = ['sm', 'md']
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Badge</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Status labels, categories, and dismissible tags. Five semantic variants mapped to the alert
        hierarchy.
      </p>
    </section>

    <!-- Variants × Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Variants &times; Sizes
      </p>
      <div class="grid grid-cols-5 border-t border-l border-base-dim">
        <template v-for="variant in variants" :key="variant">
          <div
            v-for="size in sizes"
            :key="`${variant}-${size}`"
            class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
          >
            <span class="type-overline text-base-dim">{{ variant }} / {{ size }}</span>
            <div>
              <Badge :variant="variant" :size="size">Label</Badge>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Dot -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — Dot</p>
      <div class="grid grid-cols-5 border-t border-l border-base-dim">
        <div
          v-for="variant in variants"
          :key="`dot-${variant}`"
          class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-base-dim">{{ variant }}</span>
          <div>
            <Badge :variant="variant" dot>Label</Badge>
          </div>
        </div>
      </div>
    </section>

    <!-- Dismissible -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Dismissible
      </p>
      <div class="grid grid-cols-5 border-t border-l border-base-dim">
        <div
          v-for="variant in variants"
          :key="`dismissible-${variant}`"
          class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-base-dim">{{ variant }}</span>
          <div>
            <Badge :variant="variant" dismissible @dismiss="() => console.log('dismissed')"
              >Label</Badge
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
