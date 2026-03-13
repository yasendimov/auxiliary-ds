<script setup>
import Hero from '../../components/marketing/Hero.vue'
import PageHeader from '../../components/marketing/PageHeader.vue'
</script>

<template>
  <div>
    <Hero
      eyebrow="Marketing"
      headline="Page Header"
      description="Interior page header with eyebrow, title, and optional description. Lighter weight than Hero — used for secondary and content pages."
    />

    <!-- Default -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8"><span class="font-mono">01</span> — Default</p>
      <div class="border border-line rounded-card overflow-hidden">
        <PageHeader
          eyebrow="Documentation"
          headline="Getting Started"
          description="Everything you need to integrate Auterion's autonomous flight platform."
        />
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Without Description -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8"><span class="font-mono">02</span> — Without Description</p>
      <div class="border border-line rounded-card overflow-hidden">
        <PageHeader
          eyebrow="Release Notes"
          headline="v4.2.0"
        />
      </div>
    </section>

    <div class="border-b border-line"></div>

    <!-- Comparison -->
    <section class="py-12 lg:py-16 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-8"><span class="font-mono">03</span> — Hero vs PageHeader</p>
      <p class="type-caption-m text-content-low mb-6">
        Hero uses <span class="font-mono">type-display-m</span> for landing pages. PageHeader uses <span class="font-mono">type-title-m</span> for interior pages.
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="border border-line rounded-card overflow-hidden">
          <Hero eyebrow="Hero" headline="Display scale" description="For landing pages." />
        </div>
        <div class="border border-line rounded-card overflow-hidden">
          <PageHeader eyebrow="PageHeader" headline="Title scale" description="For interior pages." />
        </div>
      </div>
    </section>
  </div>
</template>
