<script setup>
import Hero from '../../components/marketing/Hero.vue'
import AuxButton from '../../components/core/AuxButton.vue'
</script>

<template>
  <div>
    <Hero
      eyebrow="Marketing"
      headline="Hero"
      description="Full-width landing header with eyebrow, headline, and optional description. Used as the primary entry point on marketing pages."
    />

    <!-- Default -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8"><span class="font-mono">01</span> — Default</p>
      <div class="border border-line rounded-card overflow-hidden">
        <Hero
          eyebrow="Autonomous Systems"
          headline="The future of autonomous flight"
          description="Enterprise-grade drone swarm orchestration for defense, inspection, and logistics."
        />
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Without Description -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8">
        <span class="font-mono">02</span> — Without Description
      </p>
      <div class="border border-line rounded-card overflow-hidden">
        <Hero eyebrow="Product Update" headline="Skynode 3 is here" />
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- With Slot Content -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8">
        <span class="font-mono">03</span> — Composition
      </p>
      <p class="type-caption-m text-content-low mb-6">
        Hero provides the header structure. Pair with buttons and other elements below it for a
        complete landing section.
      </p>
      <div class="border border-line rounded-card overflow-hidden">
        <Hero
          eyebrow="Open Source"
          headline="Build with Auterion"
          description="Start building autonomous applications with our open platform."
        />
        <div class="px-10 lg:px-20 pb-16 flex items-center gap-3">
          <AuxButton size="lg">Get Started</AuxButton>
          <AuxButton variant="ghost" size="lg">Documentation</AuxButton>
        </div>
      </div>
    </section>
  </div>
</template>
