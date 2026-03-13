<script setup>
import { AuxButton } from '../../components'
import { PlusIcon, ArrowRightIcon, ArrowDownTrayIcon, TrashIcon } from '@heroicons/vue/24/outline'

const variants = ['primary', 'ghost', 'destructive']
const sizes = ['sm', 'md', 'lg']
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-content-dim">Foundation</p>
      <h1 class="type-display-sb text-content-high mt-4">Button</h1>
      <p class="type-lead-r text-content-low mt-4 max-w-xl">
        Primary interactive element. Three variants, three sizes, loading and disabled states.
      </p>
    </section>

    <!-- Variants × Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">01</span> — Variants &times; Sizes
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
              <AuxButton :variant="variant" :size="size">Label</AuxButton>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Disabled -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">02</span> — Disabled
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <div
          v-for="variant in variants"
          :key="`disabled-${variant}`"
          class="border-b border-r border-line p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-content-dim">{{ variant }}</span>
          <div>
            <AuxButton :variant="variant" disabled>Disabled</AuxButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">03</span> — Loading
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">primary / loading</span>
          <div>
            <AuxButton variant="primary" loading>Submitting</AuxButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Icons -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12"><span class="font-mono">04</span> — Icons</p>
      <div class="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">leading icon</span>
          <div>
            <AuxButton variant="primary" :leading-icon="PlusIcon">Create</AuxButton>
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">trailing icon</span>
          <div>
            <AuxButton variant="primary" :trailing-icon="ArrowRightIcon">Continue</AuxButton>
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">ghost + icon</span>
          <div>
            <AuxButton variant="ghost" :leading-icon="ArrowDownTrayIcon">Download</AuxButton>
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">destructive + icon</span>
          <div>
            <AuxButton variant="destructive" :leading-icon="TrashIcon">Delete</AuxButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
