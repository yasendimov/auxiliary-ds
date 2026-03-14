<script setup>
import { Separator, Hero, Header } from '../../components'
</script>

<template>
  <div>
    <Hero
      eyebrow="Marketing"
      headline="Header"
      description="Interior page header with eyebrow, title, and optional description. Lighter weight than Hero — used for secondary and content pages."
    />

    <!-- Default -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-base-dim mb-8"><span class="font-mono">01</span> — Default</p>
      <div class="border border-base-dim rounded-card overflow-hidden">
        <Header
          eyebrow="Documentation"
          headline="Getting Started"
          description="Everything you need to integrate Auterion's autonomous flight platform."
        />
      </div>
    </section>

    <Separator spacing="none" />

    <!-- Without Description -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-base-dim mb-8">
        <span class="font-mono">02</span> — Without Description
      </p>
      <div class="border border-base-dim rounded-card overflow-hidden">
        <Header eyebrow="Release Notes" headline="v4.2.0" />
      </div>
    </section>

    <Separator spacing="none" />

    <!-- Comparison -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-base-dim mb-8">
        <span class="font-mono">03</span> — Hero vs Header
      </p>
      <p class="type-caption-m text-base-dim mb-6">
        Hero uses <span class="font-mono">type-display-m</span> for landing pages. Header uses
        <span class="font-mono">type-title-m</span> for interior pages.
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="border border-base-dim rounded-card overflow-hidden">
          <Hero eyebrow="Hero" headline="Display scale" description="For landing pages." />
        </div>
        <div class="border border-base-dim rounded-card overflow-hidden">
          <Header eyebrow="Header" headline="Title scale" description="For interior pages." />
        </div>
      </div>
    </section>
  </div>
</template>
