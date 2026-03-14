<script setup>
import { Input } from '../../components'
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
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Input</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Text input with three variants, three sizes, icons, prefix/suffix, and validation states.
      </p>
    </section>

    <!-- Variants × Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Variants &times; Sizes
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <template v-for="variant in variants" :key="variant">
          <div
            v-for="size in sizes"
            :key="`${variant}-${size}`"
            class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
          >
            <span class="type-overline text-base-dim">{{ variant }} / {{ size }}</span>
            <div>
              <Input :variant="variant" :size="size" placeholder="Placeholder" />
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Label & Hint -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — Label &amp; Hint
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">with label</span>
          <div>
            <Input label="Email address" placeholder="you@example.com" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">with label + hint</span>
          <div>
            <Input
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
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Error Message
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">error via prop</span>
          <div>
            <Input
              label="Altitude"
              model-value="not a number"
              error="Must be a numeric value."
            />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">success variant</span>
          <div>
            <Input
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
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">04</span> — Icons</p>
      <div class="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">leading icon</span>
          <div>
            <Input :leading-icon="MagnifyingGlassIcon" placeholder="Search..." />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">trailing icon</span>
          <div>
            <Input :trailing-icon="EnvelopeIcon" placeholder="Email" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">leading + success</span>
          <div>
            <Input :leading-icon="CheckCircleIcon" variant="success" model-value="Connected" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">trailing + error</span>
          <div>
            <Input
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
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — Prefix &amp; Suffix
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">prefix</span>
          <div>
            <Input prefix="https://" placeholder="example.com" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">suffix</span>
          <div>
            <Input suffix=".auterion.com" placeholder="subdomain" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">prefix + suffix</span>
          <div>
            <Input prefix="https://" suffix=".dev" placeholder="project" />
          </div>
        </div>
      </div>
    </section>

    <!-- Disabled & Readonly -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — Disabled &amp; Readonly
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled</span>
          <div>
            <Input label="Disabled field" model-value="Cannot edit" disabled />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">readonly</span>
          <div>
            <Input label="Readonly field" model-value="Read only value" readonly />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
