<script setup>
import { Button } from '../../components'
import { PlusIcon, ArrowRightIcon, ArrowDownTrayIcon, TrashIcon } from '@heroicons/vue/24/outline'

const variants = ['primary', 'ghost', 'destructive']
const sizes = ['sm', 'md', 'lg']
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Button</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Primary interactive element. Three variants, three sizes, loading and disabled states.
      </p>
    </section>

    <!-- Variants × Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Variants &times; Sizes
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
              <Button :variant="variant" :size="size">Label</Button>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Disabled -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — Disabled
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div
          v-for="variant in variants"
          :key="`disabled-${variant}`"
          class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-base-dim">{{ variant }}</span>
          <div>
            <Button :variant="variant" disabled>Disabled</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Loading
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">primary / loading</span>
          <div>
            <Button variant="primary" loading>Submitting</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Icons -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">04</span> — Icons</p>
      <div class="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">leading icon</span>
          <div>
            <Button variant="primary" :leading-icon="PlusIcon">Create</Button>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">trailing icon</span>
          <div>
            <Button variant="primary" :trailing-icon="ArrowRightIcon">Continue</Button>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">ghost + icon</span>
          <div>
            <Button variant="ghost" :leading-icon="ArrowDownTrayIcon">Download</Button>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">destructive + icon</span>
          <div>
            <Button variant="destructive" :leading-icon="TrashIcon">Delete</Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
