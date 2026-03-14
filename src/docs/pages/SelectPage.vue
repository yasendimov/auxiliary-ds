<script setup>
import { Select } from '../../components'
import { GlobeAltIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Select</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Native select with three variants, three sizes, leading icon, placeholder, and validation
        states.
      </p>
    </section>

    <!-- Variants × Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Variants &times; Sizes
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <template v-for="variant in ['default', 'error', 'success']" :key="variant">
          <div
            v-for="size in ['sm', 'md', 'lg']"
            :key="`${variant}-${size}`"
            class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
          >
            <span class="type-overline text-base-dim">{{ variant }} / {{ size }}</span>
            <div>
              <Select :variant="variant" :size="size" model-value="option-1">
                <option value="option-1">Option one</option>
                <option value="option-2">Option two</option>
                <option value="option-3">Option three</option>
              </Select>
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
            <Select label="Vehicle type" model-value="multirotor">
              <option value="multirotor">Multirotor</option>
              <option value="fixed-wing">Fixed Wing</option>
              <option value="vtol">VTOL</option>
            </Select>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">with label + hint</span>
          <div>
            <Select label="Mission type" hint="Determines flight parameters and constraints.">
              <option value="survey">Survey</option>
              <option value="delivery">Delivery</option>
              <option value="inspection">Inspection</option>
            </Select>
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
            <Select label="Region" error="Region is required for this mission type.">
              <option value="eu">Europe</option>
              <option value="na">North America</option>
              <option value="apac">Asia Pacific</option>
            </Select>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">success variant</span>
          <div>
            <Select
              label="Airspace class"
              model-value="g"
              variant="success"
              hint="Airspace confirmed."
            >
              <option value="g">Class G — Uncontrolled</option>
              <option value="e">Class E — Controlled</option>
              <option value="d">Class D — Controlled</option>
            </Select>
          </div>
        </div>
      </div>
    </section>

    <!-- Leading Icon -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Leading Icon
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">with icon</span>
          <div>
            <Select :leading-icon="GlobeAltIcon" model-value="utc">
              <option value="utc">UTC +0</option>
              <option value="cet">CET +1</option>
              <option value="est">EST −5</option>
            </Select>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">icon + label</span>
          <div>
            <Select :leading-icon="GlobeAltIcon" label="Timezone" model-value="cet">
              <option value="utc">UTC +0</option>
              <option value="cet">CET +1</option>
              <option value="est">EST −5</option>
            </Select>
          </div>
        </div>
      </div>
    </section>

    <!-- Placeholder -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — Placeholder
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">with placeholder</span>
          <div>
            <Select label="Payload" placeholder="Select a payload...">
              <option value="camera">Camera</option>
              <option value="lidar">LiDAR</option>
              <option value="thermal">Thermal</option>
            </Select>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">without placeholder</span>
          <div>
            <Select label="Priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>
        </div>
      </div>
    </section>

    <!-- Disabled -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — Disabled
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled</span>
          <div>
            <Select label="Locked field" model-value="locked" disabled>
              <option value="locked">Cannot change</option>
            </Select>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled + icon</span>
          <div>
            <Select :leading-icon="GlobeAltIcon" label="Timezone" model-value="utc" disabled>
              <option value="utc">UTC +0</option>
            </Select>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
