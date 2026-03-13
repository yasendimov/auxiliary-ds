<script setup>
import { AuxButton, AuxBadge, AuxInput } from '../../../components'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const statCards = [
  { label: 'Active Drones', value: '47', badge: 'success', badgeLabel: 'Online' },
  { label: 'Missions Today', value: '12', badge: 'info', badgeLabel: 'Running' },
  { label: 'Alerts', value: '3', badge: 'warning', badgeLabel: 'Review' },
  { label: 'Uptime', value: '99.8%', badge: 'success', badgeLabel: 'Healthy' }
]

const tableHeaders = ['Name', 'Status', 'Fleet', 'Duration', 'Progress']
const tableRows = [
  { name: 'Survey Alpha', status: 'success', fleet: '8', duration: '02:34:11', progress: '78%' },
  { name: 'Perimeter Scan', status: 'warning', fleet: '4', duration: '01:12:45', progress: '45%' },
  {
    name: 'Delivery Route 7',
    status: 'success',
    fleet: '12',
    duration: '00:48:22',
    progress: '92%'
  },
  {
    name: 'Inspection Grid B',
    status: 'danger',
    fleet: '3',
    duration: '03:01:08',
    progress: '15%'
  },
  { name: 'Mapping West', status: 'default', fleet: '6', duration: '—', progress: '0%' }
]

const alertExamples = [
  {
    level: 'Alarm',
    bgClass: 'bg-alarm-subtle',
    textClass: 'text-alarm-content',
    borderClass: 'border-alarm',
    msg: 'Drone #14 — communication lost'
  },
  {
    level: 'Warning',
    bgClass: 'bg-warning-subtle',
    textClass: 'text-warning-content',
    borderClass: 'border-warning',
    msg: 'Battery below 20% on fleet Alpha'
  },
  {
    level: 'Caution',
    bgClass: 'bg-caution-subtle',
    textClass: 'text-caution-content',
    borderClass: 'border-caution',
    msg: 'Wind speed approaching threshold'
  },
  {
    level: 'OK',
    bgClass: 'bg-ok-subtle',
    textClass: 'text-ok-content',
    borderClass: 'border-ok',
    msg: 'All systems nominal'
  }
]

const sidebarItems = ['Dashboard', 'Missions', 'Fleet', 'Analytics', 'Settings']
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Sidebar (hidden on mobile, shown on lg) -->
    <aside class="hidden lg:flex w-52 shrink-0 border-r border-line flex-col">
      <div class="p-4 border-b border-line">
        <div class="bg-surface-2 rounded-panel h-5 w-24 animate-pulse"></div>
      </div>
      <nav class="flex-1 p-2 flex flex-col gap-0.5">
        <div
          v-for="(item, i) in sidebarItems"
          :key="item"
          :class="[
            'px-3 py-2 rounded-panel type-caption-m transition-colors duration-instant cursor-default',
            i === 0
              ? 'bg-surface-2 text-content-high'
              : 'text-content-low hover:text-content-high hover:bg-surface-2'
          ]"
        >
          {{ item }}
        </div>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top bar -->
      <header class="h-14 flex items-center gap-4 px-6 border-b border-line shrink-0">
        <AuxInput placeholder="Search..." size="sm" class="w-full sm:w-64">
          <template #prefix>
            <MagnifyingGlassIcon class="size-4 text-content-dim" />
          </template>
        </AuxInput>
        <div class="flex-1"></div>
        <AuxButton variant="ghost" size="sm">Export</AuxButton>
        <AuxButton size="sm">New Mission</AuxButton>
      </header>

      <div class="flex-1 p-6 overflow-auto">
        <!-- Stats Row -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-section">
          <div
            v-for="card in statCards"
            :key="card.label"
            class="rounded-card p-4 border border-line"
          >
            <div class="flex items-center justify-between">
              <span class="type-caption-m text-content-dim">{{ card.label }}</span>
              <AuxBadge :variant="card.badge" size="sm" dot>{{ card.badgeLabel }}</AuxBadge>
            </div>
            <span class="type-heading-sb text-content-high font-mono mt-2 block">{{
              card.value
            }}</span>
          </div>
        </section>

        <!-- Table -->
        <section class="mb-section">
          <p class="type-overline text-content-dim mb-4">
            <span class="font-mono">01</span> — Active Missions
          </p>
          <div class="border border-line rounded-card overflow-x-auto">
            <table class="w-full min-w-[480px]">
              <thead>
                <tr>
                  <th
                    v-for="h in tableHeaders"
                    :key="h"
                    class="type-caption-m text-content-dim text-left px-4 py-3 border-b border-line"
                  >
                    {{ h }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in tableRows"
                  :key="row.name"
                  class="border-b border-line last:border-b-0"
                >
                  <td class="type-caption-m text-content-high px-4 py-3">{{ row.name }}</td>
                  <td class="px-4 py-3">
                    <AuxBadge :variant="row.status" size="sm" dot>{{ row.status }}</AuxBadge>
                  </td>
                  <td class="type-caption-m text-content-low font-mono px-4 py-3">
                    {{ row.fleet }}
                  </td>
                  <td class="type-caption-m text-content-low font-mono px-4 py-3">
                    {{ row.duration }}
                  </td>
                  <td class="type-caption-m text-content-low font-mono px-4 py-3">
                    {{ row.progress }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Alert Banner Examples -->
        <section>
          <p class="type-overline text-content-dim mb-4">
            <span class="font-mono">02</span> — Alert Banners
          </p>
          <div class="flex flex-col gap-3">
            <div
              v-for="alert in alertExamples"
              :key="alert.level"
              :class="[
                alert.bgClass,
                alert.textClass,
                'rounded-card px-4 py-3 border-l-4',
                alert.borderClass
              ]"
            >
              <span class="type-caption-m">{{ alert.level }}:</span>
              <span class="type-caption-m ml-2">{{ alert.msg }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
