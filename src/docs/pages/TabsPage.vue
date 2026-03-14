<script setup>
import { ref } from 'vue'
import { Tabs, Tab } from '../../components'

const activeBasic = ref('overview')
const activeSizes = ref({
  sm: 'first',
  md: 'first',
  lg: 'first'
})
const activeDisabled = ref('active')
const activeMany = ref('missions')
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Tabs</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Tab navigation with active underline indicator, three sizes, and keyboard support. Composed
        from Tabs (container) and Tab (individual item).
      </p>
    </section>

    <!-- Basic -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Basic</p>
      <div class="border border-base-dim rounded-card p-8">
        <Tabs v-model="activeBasic">
          <Tab value="overview">Overview</Tab>
          <Tab value="fleet">Fleet</Tab>
          <Tab value="missions">Missions</Tab>
          <Tab value="analytics">Analytics</Tab>
        </Tabs>
        <div class="mt-6 type-body-r text-base-dim">
          Active tab: <span class="font-mono text-base-normal">{{ activeBasic }}</span>
        </div>
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
            <Tabs v-model="activeSizes[size]" :size="size">
              <Tab value="first">First</Tab>
              <Tab value="second">Second</Tab>
              <Tab value="third">Third</Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </section>

    <!-- Disabled -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">03</span> — Disabled</p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">individual tab disabled</span>
          <div>
            <Tabs v-model="activeDisabled">
              <Tab value="active">Active</Tab>
              <Tab value="disabled" disabled>Disabled</Tab>
              <Tab value="another">Another</Tab>
            </Tabs>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">group disabled</span>
          <div>
            <Tabs model-value="locked" disabled>
              <Tab value="locked">Locked</Tab>
              <Tab value="also">Also Locked</Tab>
              <Tab value="all">All Locked</Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </section>

    <!-- Many tabs -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">04</span> — Many Tabs</p>
      <div class="border border-base-dim rounded-card p-8">
        <Tabs v-model="activeMany">
          <Tab value="missions">Missions</Tab>
          <Tab value="vehicles">Vehicles</Tab>
          <Tab value="payloads">Payloads</Tab>
          <Tab value="operators">Operators</Tab>
          <Tab value="airspace">Airspace</Tab>
          <Tab value="telemetry">Telemetry</Tab>
          <Tab value="logs">Logs</Tab>
        </Tabs>
      </div>
    </section>
  </div>
</template>
