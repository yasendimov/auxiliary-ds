<script setup>
import { AuxInsignia, AuxIdenticon } from '../../components'

const gallerySeeds = [
  'Alpha Squadron', 'Bravo Team', 'Charlie Unit', 'Delta Force',
  'Echo Base', 'Foxtrot', 'Golf Company', 'Hotel Platoon',
  'India Wing', 'Juliet Division', 'Kilo Battery', 'Lima Recon',
  'Mike Patrol', 'November Guard', 'Oscar Fleet', 'Papa Strike'
]

const frameVariants = ['shield', 'circle', 'diamond', 'pentagon', 'chevron']

const sizes = [32, 48, 64, 80, 96, 128]

const taskForces = [
  { seed: 'Raptor Wing', name: 'Raptor Wing', members: 12, status: 'Deployed' },
  { seed: 'Ghost Recon', name: 'Ghost Recon', members: 8, status: 'Standby' },
  { seed: 'Viper Squadron', name: 'Viper Squadron', members: 16, status: 'Deployed' },
  { seed: 'Hawk Eye', name: 'Hawk Eye', members: 4, status: 'RTB' }
]

const comparisonSeeds = ['Alpha Squadron', 'Bravo Team', 'Charlie Unit', 'Delta Force', 'Echo Base']
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-content-dim">Foundation</p>
      <h1 class="type-display-sb text-content-high mt-4">Insignia</h1>
      <p class="type-lead-r text-content-low mt-4 max-w-xl">
        Procedural military-style badge generator. Deterministic visual from any
        string seed. Five frame shapes, seven devices, decorative elements.
      </p>
    </section>

    <!-- 01 Gallery -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">01</span> — Gallery
      </p>
      <div class="grid grid-cols-4 md:grid-cols-8 border-t border-l border-line">
        <div
          v-for="seed in gallerySeeds"
          :key="seed"
          class="border-b border-r border-line p-6 flex flex-col items-center gap-3"
        >
          <AuxInsignia :seed="seed" :size="48" />
          <span class="type-agate-r text-content-dim font-mono text-center leading-tight">{{ seed }}</span>
        </div>
      </div>
    </section>

    <!-- 02 Frame variants -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">02</span> — Frame variants
      </p>
      <div class="grid grid-cols-5 border-t border-l border-line">
        <div
          v-for="variant in frameVariants"
          :key="variant"
          class="border-b border-r border-line p-8 flex flex-col items-center gap-3"
        >
          <AuxInsignia seed="Alpha Squadron" :variant="variant" :size="64" />
          <span class="type-overline text-content-dim">{{ variant }}</span>
        </div>
      </div>
    </section>

    <!-- 03 Sizes -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">03</span> — Sizes
      </p>
      <div class="flex items-end gap-8">
        <div
          v-for="s in sizes"
          :key="s"
          class="flex flex-col items-center gap-3"
        >
          <AuxInsignia seed="Bravo Team" :size="s" />
          <span class="type-overline text-content-dim font-mono">{{ s }}px</span>
        </div>
      </div>
    </section>

    <!-- 04 Determinism -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">04</span> — Determinism
      </p>
      <p class="type-body-r text-content-low mb-6 max-w-2xl">
        Same seed always produces the same insignia. Three identical renders below.
      </p>
      <div class="flex items-center gap-6">
        <AuxInsignia seed="Echo Base" :size="80" />
        <AuxInsignia seed="Echo Base" :size="80" />
        <AuxInsignia seed="Echo Base" :size="80" />
      </div>
    </section>

    <!-- 05 Task force cards -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">05</span> — Task force cards
      </p>
      <div class="grid grid-cols-2 gap-4 max-w-2xl">
        <div
          v-for="tf in taskForces"
          :key="tf.seed"
          class="rounded-card bg-surface-1 p-5 flex items-center gap-4"
        >
          <AuxInsignia :seed="tf.seed" :size="48" />
          <div class="flex-1 min-w-0">
            <p class="type-body-m text-content-high">{{ tf.name }}</p>
            <p class="type-caption-r text-content-dim">
              {{ tf.members }} units · {{ tf.status }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 06 Comparison with Identicon -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">06</span> — Identicon vs Insignia
      </p>
      <p class="type-body-r text-content-low mb-6 max-w-2xl">
        Same seeds rendered as Identicon (top) and Insignia (bottom).
      </p>
      <div class="flex items-start gap-8">
        <div
          v-for="seed in comparisonSeeds"
          :key="seed"
          class="flex flex-col items-center gap-3"
        >
          <AuxIdenticon :seed="seed" :size="48" />
          <AuxInsignia :seed="seed" :size="48" />
          <span class="type-agate-r text-content-dim font-mono">{{ seed }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
