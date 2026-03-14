<script setup>
import { Button } from '../../components'
import { useToast } from '../../components/core/useToast.js'

const { add, clear } = useToast()

const variantDemos = [
  {
    variant: 'info',
    title: 'Firmware update available',
    description: 'Version 4.2.1 ready to install on 3 vehicles.'
  },
  {
    variant: 'ok',
    title: 'Engine restart successful',
    description: 'All motors nominal, ready for preflight.'
  },
  {
    variant: 'caution',
    title: 'Battery below 30%',
    description: 'Consider initiating return-to-home.'
  },
  {
    variant: 'warning',
    title: 'Telemetry link degraded',
    description: 'Signal strength below threshold on vehicle V-07.'
  },
  {
    variant: 'alarm',
    title: 'GPS signal lost',
    description: 'Vehicle V-03 position unreliable. Manual override recommended.'
  }
]

function addStackDemo() {
  const messages = [
    { variant: 'info', title: 'Preflight check started' },
    { variant: 'ok', title: 'IMU calibration passed' },
    { variant: 'ok', title: 'Compass check passed' },
    { variant: 'caution', title: 'Wind speed 12 kts' },
    { variant: 'ok', title: 'GPS lock acquired' },
    { variant: 'warning', title: 'Barometer drift detected' }
  ]
  messages.forEach((msg, i) => {
    setTimeout(() => add({ ...msg, duration: 8000 }), i * 200)
  })
}
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Toast</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Transient notifications that appear and auto-dismiss. Five severity levels matching the
        Alert hierarchy. Programmatic API via useToast() composable.
      </p>
    </section>

    <!-- Variants -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Variants</p>
      <div class="grid grid-cols-5 border-t border-l border-base-dim">
        <div
          v-for="demo in variantDemos"
          :key="demo.variant"
          class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-base-dim">{{ demo.variant }}</span>
          <div>
            <Button
              size="sm"
              @click="
                add({ variant: demo.variant, title: demo.title, description: demo.description })
              "
            >
              Show {{ demo.variant }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Auto-dismiss duration -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — Auto-Dismiss Duration
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div
          v-for="ms in [2000, 5000, 10000]"
          :key="ms"
          class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-base-dim">{{ ms / 1000 }}s</span>
          <div>
            <Button size="sm" @click="add({ title: `Dismisses in ${ms / 1000}s`, duration: ms })">
              {{ ms / 1000 }} seconds
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Persistent -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Persistent
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Button
          @click="
            add({
              variant: 'warning',
              title: 'Connection lost',
              description: 'Attempting reconnect. Dismiss manually when resolved.',
              duration: 0
            })
          "
        >
          Show persistent toast
        </Button>
      </div>
    </section>

    <!-- Non-dismissible -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Non-Dismissible
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Button
          @click="
            add({
              title: 'Syncing flight data...',
              description: 'Please wait.',
              dismissible: false,
              duration: 3000
            })
          "
        >
          Show non-dismissible (3s)
        </Button>
      </div>
    </section>

    <!-- Stacking -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — Stacking (Max 5)
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Button @click="addStackDemo">Add 6 toasts rapidly</Button>
      </div>
    </section>

    <!-- Clear all -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">06</span> — Clear All</p>
      <div class="border border-base-dim rounded-card p-8">
        <Button variant="ghost" @click="clear">Clear all toasts</Button>
      </div>
    </section>
  </div>
</template>
