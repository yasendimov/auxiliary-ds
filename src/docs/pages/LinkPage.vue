<script setup>
import { Link } from '../../components'
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Link</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Navigation element for internal routes, external URLs, and inline text links. Two variants,
        automatic external detection, and disabled state.
      </p>
    </section>

    <!-- Variants -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Variants</p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">default</span>
          <div>
            <Link to="/system/core/button">View button component</Link>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">subtle</span>
          <div>
            <Link to="/system/core/button" variant="subtle">View button component</Link>
          </div>
        </div>
      </div>
    </section>

    <!-- Router + External -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — Router &amp; External Links
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">router links</span>
          <div class="flex gap-6">
            <Link to="/system/core/popover">Popover</Link>
            <Link to="/system/core/tooltip">Tooltip</Link>
            <Link to="/system/core/dropdown">Dropdown</Link>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">external (auto new-tab)</span>
          <div class="flex gap-6">
            <Link href="https://auterion.com">Auterion website</Link>
            <Link href="https://github.com/auterion" variant="subtle">GitHub</Link>
          </div>
        </div>
      </div>
    </section>

    <!-- Disabled -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">03</span> — Disabled</p>
      <div class="border border-base-dim rounded-card p-8 flex gap-6">
        <Link to="/system/core/button" disabled>Disabled link</Link>
        <Link to="/system/core/button">Enabled link</Link>
      </div>
    </section>

    <!-- Inline -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Inline Links
      </p>
      <div class="border border-base-dim rounded-card p-8 max-w-lg">
        <p class="type-body-r text-base-normal">
          Configure vehicle parameters in the
          <Link to="/system/core/dialog">dialog component</Link>, then review the
          <Link to="/system/tokens">design tokens</Link> for available spacing and color options.
          For questions, visit the <Link href="https://auterion.com">Auterion website</Link>.
        </p>
      </div>
    </section>
  </div>
</template>
