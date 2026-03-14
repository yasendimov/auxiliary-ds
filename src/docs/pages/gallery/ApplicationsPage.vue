<script setup>
import { Button, Badge, Input } from '../../../components'
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
    bgClass: 'bg-red-ui',
    textClass: 'text-red-dim',
    borderClass: 'border-red-9 dark:border-reddark-9',
    msg: 'Drone #14 — communication lost'
  },
  {
    level: 'Warning',
    bgClass: 'bg-orange-ui',
    textClass: 'text-orange-dim',
    borderClass: 'border-orange-9 dark:border-orangedark-9',
    msg: 'Battery below 20% on fleet Alpha'
  },
  {
    level: 'Caution',
    bgClass: 'bg-amber-ui',
    textClass: 'text-amber-dim',
    borderClass: 'border-amber-9 dark:border-amberdark-9',
    msg: 'Wind speed approaching threshold'
  },
  {
    level: 'OK',
    bgClass: 'bg-green-ui',
    textClass: 'text-green-dim',
    borderClass: 'border-green-9 dark:border-greendark-9',
    msg: 'All systems nominal'
  }
]

const sidebarItems = ['Dashboard', 'Missions', 'Fleet', 'Analytics', 'Settings']
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Sidebar (hidden on mobile, shown on lg) -->
    <aside class="hidden lg:flex w-52 shrink-0 border-r border-base-dim flex-col">
      <div class="p-4 border-b border-base-dim">
        <div class="bg-base-ui rounded-panel h-5 w-24 animate-pulse"></div>
      </div>
      <nav class="flex-1 p-2 flex flex-col gap-0.5">
        <div
          v-for="(item, i) in sidebarItems"
          :key="item"
          :class="[
            'px-3 py-2 rounded-panel type-caption-m transition-colors duration-instant cursor-default',
            i === 0
              ? 'bg-base-ui text-base-normal'
              : 'text-base-dim hover:text-base-normal'
          ]"
        >
          {{ item }}
        </div>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top bar -->
      <header class="h-14 flex items-center gap-4 px-6 border-b border-base-dim shrink-0">
        <Input placeholder="Search..." size="sm" class="w-full sm:w-64">
          <template #prefix>
            <MagnifyingGlassIcon class="size-4 text-base-dim" />
          </template>
        </Input>
        <div class="flex-1"></div>
        <Button variant="ghost" size="sm">Export</Button>
        <Button size="sm">New Mission</Button>
      </header>

      <div class="flex-1 p-6 overflow-auto">
        <!-- Stats Row -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-section">
          <div
            v-for="card in statCards"
            :key="card.label"
            class="rounded-card p-4 border border-base-dim"
          >
            <div class="flex items-center justify-between">
              <span class="type-caption-m text-base-dim">{{ card.label }}</span>
              <Badge :variant="card.badge" size="sm" dot>{{ card.badgeLabel }}</Badge>
            </div>
            <span class="type-heading-sb text-base-normal font-mono mt-2 block">{{
              card.value
            }}</span>
          </div>
        </section>

        <!-- Table -->
        <section class="mb-section">
          <p class="type-overline text-base-dim mb-4">
            <span class="font-mono">01</span> — Active Missions
          </p>
          <div class="border border-base-dim rounded-card overflow-x-auto">
            <table class="w-full min-w-[480px]">
              <thead>
                <tr>
                  <th
                    v-for="h in tableHeaders"
                    :key="h"
                    class="type-caption-m text-base-dim text-left px-4 py-3 border-b border-base-dim"
                  >
                    {{ h }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in tableRows"
                  :key="row.name"
                  class="border-b border-base-dim last:border-b-0"
                >
                  <td class="type-caption-m text-base-normal px-4 py-3">{{ row.name }}</td>
                  <td class="px-4 py-3">
                    <Badge :variant="row.status" size="sm" dot>{{ row.status }}</Badge>
                  </td>
                  <td class="type-caption-m text-base-dim font-mono px-4 py-3">
                    {{ row.fleet }}
                  </td>
                  <td class="type-caption-m text-base-dim font-mono px-4 py-3">
                    {{ row.duration }}
                  </td>
                  <td class="type-caption-m text-base-dim font-mono px-4 py-3">
                    {{ row.progress }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Alert Banner Examples -->
        <section>
          <p class="type-overline text-base-dim mb-4">
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
