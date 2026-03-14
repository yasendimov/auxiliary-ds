<script setup>
import { VisuallyHidden } from '../../components'
import { BellIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">VisuallyHidden</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Hides content visually while keeping it accessible to screen readers. Essential for
        icon-only buttons, skip links, and other patterns where visual context is obvious but
        programmatic context is not.
      </p>
    </section>

    <!-- 01 Icon-only buttons -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Icon-only buttons
      </p>
      <p class="type-body-r text-base-dim mb-6 max-w-xl">
        Icon-only buttons need accessible labels. VisuallyHidden provides the label without
        affecting layout.
      </p>
      <div class="flex gap-2">
        <button
          class="flex items-center justify-center size-9 rounded-panel bg-base-ghost text-base-normal transition-colors duration-fast"
        >
          <HeartIcon class="size-5" />
          <VisuallyHidden>Favorite</VisuallyHidden>
        </button>
        <button
          class="flex items-center justify-center size-9 rounded-panel bg-base-ghost text-base-normal transition-colors duration-fast"
        >
          <ShareIcon class="size-5" />
          <VisuallyHidden>Share</VisuallyHidden>
        </button>
        <button
          class="flex items-center justify-center size-9 rounded-panel bg-base-ghost text-base-normal transition-colors duration-fast"
        >
          <BellIcon class="size-5" />
          <VisuallyHidden>Notifications</VisuallyHidden>
        </button>
        <button
          class="flex items-center justify-center size-9 rounded-panel bg-base-ghost text-red-normal transition-colors duration-fast"
        >
          <TrashIcon class="size-5" />
          <VisuallyHidden>Delete</VisuallyHidden>
        </button>
      </div>
    </section>

    <!-- 02 Custom element -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — Custom element
      </p>
      <p class="type-body-r text-base-dim mb-6 max-w-xl">
        The <code class="type-agate-m font-mono text-base-normal">as</code> prop controls the
        rendered element. Defaults to
        <code class="type-agate-m font-mono text-base-normal">span</code>. Use
        <code class="type-agate-m font-mono text-base-normal">h2</code> for headings that structure
        the page for screen readers without appearing visually.
      </p>
      <div class="max-w-md rounded-card bg-base-ui p-6">
        <VisuallyHidden as="h2">Mission parameters</VisuallyHidden>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <span class="type-caption-r text-base-dim">Altitude</span>
            <span class="type-caption-m font-mono text-base-normal">120 m</span>
          </div>
          <div class="flex justify-between">
            <span class="type-caption-r text-base-dim">Speed</span>
            <span class="type-caption-m font-mono text-base-normal">14 m/s</span>
          </div>
          <div class="flex justify-between">
            <span class="type-caption-r text-base-dim">Battery</span>
            <span class="type-caption-m font-mono text-base-normal">72%</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 03 Skip link -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Skip link pattern
      </p>
      <p class="type-body-r text-base-dim mb-6 max-w-xl">
        A common accessibility pattern: a link that's hidden until focused, allowing keyboard users
        to skip navigation. This uses the
        <code class="type-agate-m font-mono text-base-normal">not-sr-only</code> utility on focus to
        reveal the link.
      </p>
      <div class="relative rounded-card bg-base-ui p-6 overflow-hidden">
        <a
          href="#main-content"
          class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-10 type-caption-m text-blue-9 dark:text-bluedark-9 bg-base-app px-3 py-1.5 rounded-badge"
        >
          Skip to main content
        </a>
        <p class="type-caption-r text-base-dim">
          Tab into this box to reveal the skip link (keyboard only).
        </p>
      </div>
    </section>
  </div>
</template>
