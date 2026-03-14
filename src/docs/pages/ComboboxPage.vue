<script setup>
import { ref } from 'vue'
import { Combobox } from '../../components'
import { GlobeAltIcon, MapPinIcon } from '@heroicons/vue/24/outline'

const vehicle = ref(null)
const timezone = ref('utc')
const region = ref(null)
const pilot = ref(null)
const payload = ref(null)

const vehicles = [
  { value: 'skynode-x', label: 'Skynode X' },
  { value: 'skynode-s', label: 'Skynode S' },
  { value: 'astro', label: 'Free Fly Astro' },
  { value: 'quantum-trinity', label: 'Quantum Trinity F90+' },
  { value: 'alpha-900', label: 'Alpha 900' },
  { value: 'mavic-3', label: 'DJI Mavic 3E', disabled: true },
  { value: 'scout-137', label: 'Scout 137' },
  { value: 'vanguard-lite', label: 'Vanguard Lite' }
]

const timezones = [
  { value: 'utc', label: 'UTC +0' },
  { value: 'cet', label: 'CET +1' },
  { value: 'eet', label: 'EET +2' },
  { value: 'msk', label: 'MSK +3' },
  { value: 'est', label: 'EST −5' },
  { value: 'cst', label: 'CST −6' },
  { value: 'pst', label: 'PST −8' },
  { value: 'jst', label: 'JST +9' }
]

const missionTypes = [
  'Survey',
  'Inspection',
  'Delivery',
  'Mapping',
  'Search & Rescue',
  'Perimeter Patrol',
  'Corridor Scan',
  'Stockpile Measurement'
]

const regions = [
  { value: 'eu-west', label: 'EU West' },
  { value: 'eu-central', label: 'EU Central' },
  { value: 'na-east', label: 'NA East' },
  { value: 'na-west', label: 'NA West' },
  { value: 'apac', label: 'Asia Pacific' },
  { value: 'mena', label: 'Middle East & North Africa' }
]

const pilots = [
  { value: 'muller', label: 'Hans Müller' },
  { value: 'chen', label: 'Wei Chen' },
  { value: 'garcia', label: 'Maria Garcia' },
  { value: 'okafor', label: 'Chidi Okafor' },
  { value: 'tanaka', label: 'Yuki Tanaka', disabled: true },
  { value: 'smith', label: 'James Smith' }
]

const payloads = [
  { value: 'rgb', label: 'RGB Camera' },
  { value: 'thermal', label: 'Thermal Sensor' },
  { value: 'lidar', label: 'LiDAR Scanner' },
  { value: 'multi', label: 'Multispectral' },
  { value: 'gas', label: 'Gas Detector' }
]
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Combobox</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Searchable select with type-to-filter, keyboard navigation, and empty state. Use when the
        option list is long or users need to search by name.
      </p>
    </section>

    <!-- Basic -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Basic</p>
      <div class="border border-base-dim rounded-card p-8 max-w-sm">
        <Combobox
          v-model="vehicle"
          :options="vehicles"
          label="Vehicle"
          placeholder="Search vehicles..."
        />
        <p class="type-agate-r text-base-dim mt-3 font-mono">selected: {{ vehicle ?? 'null' }}</p>
      </div>
    </section>

    <!-- Sizes -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — Sizes</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div
          v-for="size in ['sm', 'md', 'lg']"
          :key="size"
          class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-base-dim">{{ size }}</span>
          <div>
            <Combobox :options="missionTypes" :size="size" placeholder="Mission type..." />
          </div>
        </div>
      </div>
    </section>

    <!-- Leading icon -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Leading Icon
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">with icon</span>
          <div>
            <Combobox
              v-model="timezone"
              :options="timezones"
              :leading-icon="GlobeAltIcon"
              placeholder="Select timezone..."
            />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">icon + label</span>
          <div>
            <Combobox
              v-model="region"
              :options="regions"
              :leading-icon="MapPinIcon"
              label="Deploy region"
              placeholder="Search regions..."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Validation -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Validation
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">error</span>
          <div>
            <Combobox
              :options="vehicles"
              label="Vehicle"
              error="Vehicle assignment is required."
              placeholder="Search vehicles..."
            />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">success + hint</span>
          <div>
            <Combobox
              v-model="timezone"
              :options="timezones"
              label="Timezone"
              variant="success"
              hint="Timezone confirmed."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Disabled items -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — Disabled Items &amp; States
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled items in list</span>
          <div>
            <Combobox
              v-model="pilot"
              :options="pilots"
              label="Pilot"
              placeholder="Assign pilot..."
              hint="Greyed-out pilots are on leave."
            />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">entire combobox disabled</span>
          <div>
            <Combobox model-value="rgb" :options="payloads" label="Payload" disabled />
          </div>
        </div>
      </div>
    </section>

    <!-- Empty state -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — Empty State
      </p>
      <div class="border border-base-dim rounded-card p-8 max-w-sm">
        <p class="type-caption-r text-base-dim mb-3">
          Type something that doesn't match any option to see the empty state.
        </p>
        <Combobox
          v-model="payload"
          :options="payloads"
          label="Payload"
          placeholder="Try typing 'xyz'..."
          empty-text="No matching payloads."
        />
      </div>
    </section>
  </div>
</template>
