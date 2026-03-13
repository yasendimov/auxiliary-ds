<script setup>
import AuxButton from '../../../components/core/AuxButton.vue'
import AuxInput from '../../../components/core/AuxInput.vue'

const features = [
  {
    label: 'Autonomous Navigation',
    desc: 'AI-powered flight path optimization for complex environments.'
  },
  { label: 'Fleet Management', desc: 'Real-time coordination of drone swarms across missions.' },
  { label: 'Mission Planning', desc: 'Advanced mission configuration and waypoint tools.' }
]

const stats = [
  { value: '10K+', label: 'Flights completed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Enterprise clients' },
  { value: '<2ms', label: 'Latency' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <header>
      <div class="pt-24 pb-16 lg:pt-32 lg:pb-20 px-10 lg:px-20 text-center">
        <p class="type-overline text-action-content mb-5">Autonomous Drone Systems</p>
        <h1 class="type-display-m text-content-high max-w-3xl mx-auto">
          The future of autonomous flight
        </h1>
        <p class="type-body-m text-content-low mt-6 max-w-xl mx-auto">
          Enterprise-grade drone swarm orchestration for defense, inspection, and logistics.
        </p>
        <div class="flex items-center justify-center gap-3 mt-10">
          <AuxButton size="lg">Get Started</AuxButton>
          <AuxButton variant="ghost" size="lg">Learn More</AuxButton>
        </div>
      </div>
      <div class="border-b border-line"></div>
    </header>

    <!-- Features Grid -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8">
        <span class="font-mono">01</span> — Features
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.label"
          class="border border-line rounded-card p-6"
        >
          <h3 class="type-body-sb text-content-high">{{ feature.label }}</h3>
          <div class="bg-surface-2 rounded-panel h-32 mt-4 animate-pulse"></div>
          <p class="type-caption-m text-content-low mt-4">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Stats Bar -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="border border-line rounded-card p-6 text-center"
        >
          <span class="type-heading-sb text-content-high font-mono">{{ stat.value }}</span>
          <p class="type-caption-m text-content-dim mt-2">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Testimonial -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <div class="max-w-2xl mx-auto border border-line rounded-card p-8">
        <div class="bg-surface-2 rounded-panel h-4 w-3/4 animate-pulse"></div>
        <div class="bg-surface-2 rounded-panel h-4 w-full mt-3 animate-pulse"></div>
        <div class="bg-surface-2 rounded-panel h-4 w-2/3 mt-3 animate-pulse"></div>
        <div class="flex items-center gap-3 mt-6">
          <div class="bg-surface-3 rounded-full size-10 animate-pulse"></div>
          <div>
            <div class="bg-surface-2 rounded-panel h-3 w-24 animate-pulse"></div>
            <div class="bg-surface-2 rounded-panel h-3 w-16 mt-1.5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- CTA Footer -->
    <section class="py-16 lg:py-24 px-10 lg:px-20 text-center">
      <h2 class="type-subheading-sb text-content-high">Stay in the loop</h2>
      <p class="type-body-m text-content-low mt-3">Get updates on autonomous flight technology.</p>
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 max-w-md mx-auto"
      >
        <AuxInput placeholder="you@company.com" class="w-full sm:flex-1" />
        <AuxButton>Subscribe</AuxButton>
      </div>
    </section>
  </div>
</template>
