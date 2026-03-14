<script setup>
import { ref } from 'vue'
import { Button, Popover } from '../../components'
import { InformationCircleIcon, Cog6ToothIcon } from '@heroicons/vue/20/solid'

const controlledOpen = ref(false)
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Popover</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        General-purpose floating panel anchored to a trigger element. Supports click and hover
        triggers, 12 placement options, and automatic repositioning.
      </p>
    </section>

    <!-- Basic -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Basic</p>
      <div class="border border-base-dim rounded-card p-8">
        <Popover>
          <template #trigger>
            <Button variant="ghost">
              <InformationCircleIcon class="size-5" aria-hidden="true" />
              Show info
            </Button>
          </template>
          <div class="p-4 max-w-xs">
            <p class="type-caption-sb text-base-normal">Vehicle status</p>
            <p class="type-caption-r text-base-dim mt-1">
              All systems nominal. Battery at 84%, GPS lock confirmed.
            </p>
          </div>
        </Popover>
      </div>
    </section>

    <!-- Placement -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — Placement</p>
      <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto py-12">
        <div
          v-for="placement in [
            'top-start',
            'top',
            'top-end',
            'left-start',
            'left',
            'left-end',
            'right-start',
            'right',
            'right-end',
            'bottom-start',
            'bottom',
            'bottom-end'
          ]"
          :key="placement"
          class="flex justify-center"
        >
          <Popover :placement="placement">
            <template #trigger>
              <Button size="sm" variant="ghost">{{ placement }}</Button>
            </template>
            <div class="px-3 py-2">
              <p class="type-caption-r text-base-dim whitespace-nowrap">{{ placement }}</p>
            </div>
          </Popover>
        </div>
      </div>
    </section>

    <!-- Hover -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">03</span> — Hover</p>
      <div class="border border-base-dim rounded-card p-8">
        <Popover trigger="hover" placement="top">
          <template #trigger>
            <Button variant="ghost">Hover me</Button>
          </template>
          <div class="p-4 max-w-xs">
            <p class="type-caption-sb text-base-normal">Hover popover</p>
            <p class="type-caption-r text-base-dim mt-1">
              This popover opens on hover and closes when the cursor leaves.
            </p>
          </div>
        </Popover>
      </div>
    </section>

    <!-- Rich content -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Rich Content
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Popover placement="bottom-start">
          <template #trigger>
            <Button variant="ghost">
              <Cog6ToothIcon class="size-5" aria-hidden="true" />
              Settings
            </Button>
          </template>
          <div class="p-4 w-72">
            <p class="type-caption-sb text-base-normal mb-3">Quick settings</p>
            <div class="space-y-2">
              <label class="flex items-center gap-2 type-caption-r text-base-normal cursor-pointer">
                <input type="checkbox" checked class="accent-blue-9" />
                Auto-land on low battery
              </label>
              <label class="flex items-center gap-2 type-caption-r text-base-normal cursor-pointer">
                <input type="checkbox" class="accent-blue-9" />
                Enable telemetry recording
              </label>
              <label class="flex items-center gap-2 type-caption-r text-base-normal cursor-pointer">
                <input type="checkbox" checked class="accent-blue-9" />
                Show altitude overlay
              </label>
            </div>
          </div>
        </Popover>
      </div>
    </section>

    <!-- Controlled -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — Controlled
      </p>
      <div class="border border-base-dim rounded-card p-8 flex items-center gap-4">
        <Popover v-model:open="controlledOpen" placement="bottom-start">
          <template #trigger>
            <Button variant="ghost">Popover target</Button>
          </template>
          <div class="p-4 max-w-xs">
            <p class="type-caption-r text-base-dim">
              This popover is controlled externally via v-model:open.
            </p>
          </div>
        </Popover>
        <Button size="sm" @click="controlledOpen = !controlledOpen">
          {{ controlledOpen ? 'Close' : 'Open' }} externally
        </Button>
        <span class="type-caption-r text-base-dim font-mono"> open: {{ controlledOpen }} </span>
      </div>
    </section>
  </div>
</template>
