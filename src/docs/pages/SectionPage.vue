<script setup>
import { Separator, Hero, Section } from '../../components'
</script>

<template>
  <div>
    <Hero
      eyebrow="Marketing"
      headline="Section"
      description="Content section wrapper with optional label and title. Provides consistent vertical rhythm and horizontal padding across marketing pages."
    />

    <!-- Default -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-base-dim mb-8">
        <span class="font-mono">01</span> — With Label &amp; Title
      </p>
      <div class="border border-base-dim rounded-card overflow-hidden">
        <Section label="01 — Features" title="Built for mission-critical autonomy">
          <div class="grid grid-cols-3 gap-4">
            <div class="border border-base-dim rounded-card p-4">
              <div class="bg-base-ui rounded-panel h-20 animate-pulse"></div>
            </div>
            <div class="border border-base-dim rounded-card p-4">
              <div class="bg-base-ui rounded-panel h-20 animate-pulse"></div>
            </div>
            <div class="border border-base-dim rounded-card p-4">
              <div class="bg-base-ui rounded-panel h-20 animate-pulse"></div>
            </div>
          </div>
        </Section>
      </div>
    </section>

    <Separator spacing="none" />

    <!-- Label Only -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-base-dim mb-8"><span class="font-mono">02</span> — Label Only</p>
      <div class="border border-base-dim rounded-card overflow-hidden">
        <Section label="02 — Specifications">
          <div class="bg-base-ui rounded-panel h-24 animate-pulse"></div>
        </Section>
      </div>
    </section>

    <Separator spacing="none" />

    <!-- Slot Only -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-base-dim mb-8"><span class="font-mono">03</span> — Slot Only</p>
      <p class="type-caption-m text-base-dim mb-6">
        Both label and title are optional. Section can wrap any content with consistent spacing.
      </p>
      <div class="border border-base-dim rounded-card overflow-hidden">
        <Section>
          <p class="type-body-m text-base-dim">
            Any content can go inside a Section. It provides the standard
            <span class="font-mono">py-12 lg:py-16 px-10 lg:px-20</span> padding.
          </p>
        </Section>
      </div>
    </section>
  </div>
</template>
