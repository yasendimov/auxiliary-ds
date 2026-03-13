<script setup>
import AuxInput from '../../components/core/AuxInput.vue'
import {
  MagnifyingGlassIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

const variants = ['default', 'error', 'success']
const sizes = ['sm', 'md', 'lg']
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-content-dim">Foundation</p>
      <h1 class="type-display-sb text-content-high mt-4">Input</h1>
      <p class="type-lead-r text-content-low mt-4 max-w-xl">
        Text input with three variants, three sizes, icons, prefix/suffix, and validation states.
      </p>
    </section>

    <!-- Variants × Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">01</span> — Variants &times; Sizes
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <template v-for="variant in variants" :key="variant">
          <div
            v-for="size in sizes"
            :key="`${variant}-${size}`"
            class="border-b border-r border-line p-8 flex flex-col gap-3"
          >
            <span class="type-overline text-content-dim">{{ variant }} / {{ size }}</span>
            <div>
              <AuxInput :variant="variant" :size="size" placeholder="Placeholder" />
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Label & Hint -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">02</span> — Label &amp; Hint
      </p>
      <div class="grid grid-cols-2 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">with label</span>
          <div>
            <AuxInput label="Email address" placeholder="you@example.com" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">with label + hint</span>
          <div>
            <AuxInput
              label="Callsign"
              placeholder="ALPHA-01"
              hint="Unique identifier for fleet operations."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Error Message -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">03</span> — Error Message
      </p>
      <div class="grid grid-cols-2 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">error via prop</span>
          <div>
            <AuxInput
              label="Altitude"
              model-value="not a number"
              error="Must be a numeric value."
            />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">success variant</span>
          <div>
            <AuxInput
              label="Waypoint"
              model-value="WP-042"
              variant="success"
              hint="Waypoint validated."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Icons -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12"><span class="font-mono">04</span> — Icons</p>
      <div class="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">leading icon</span>
          <div>
            <AuxInput :leading-icon="MagnifyingGlassIcon" placeholder="Search..." />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">trailing icon</span>
          <div>
            <AuxInput :trailing-icon="EnvelopeIcon" placeholder="Email" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">leading + success</span>
          <div>
            <AuxInput :leading-icon="CheckCircleIcon" variant="success" model-value="Connected" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">trailing + error</span>
          <div>
            <AuxInput
              :trailing-icon="ExclamationCircleIcon"
              error="Invalid coordinate."
              model-value="99.999"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Prefix & Suffix -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">05</span> — Prefix &amp; Suffix
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">prefix</span>
          <div>
            <AuxInput prefix="https://" placeholder="example.com" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">suffix</span>
          <div>
            <AuxInput suffix=".auterion.com" placeholder="subdomain" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">prefix + suffix</span>
          <div>
            <AuxInput prefix="https://" suffix=".dev" placeholder="project" />
          </div>
        </div>
      </div>
    </section>

    <!-- Disabled & Readonly -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">06</span> — Disabled &amp; Readonly
      </p>
      <div class="grid grid-cols-2 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">disabled</span>
          <div>
            <AuxInput label="Disabled field" model-value="Cannot edit" disabled />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">readonly</span>
          <div>
            <AuxInput label="Readonly field" model-value="Read only value" readonly />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
