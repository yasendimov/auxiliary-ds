<script setup>
import AuxButton from '../../../components/core/AuxButton.vue'
import AuxBadge from '../../../components/core/AuxBadge.vue'
import AuxInput from '../../../components/core/AuxInput.vue'

const telemetry = [
  { label: 'Altitude', value: '120.4m', unit: 'MSL' },
  { label: 'Groundspeed', value: '14.2m/s', unit: 'GS' },
  { label: 'Heading', value: '274°', unit: 'MAG' },
  { label: 'Battery', value: '78%', unit: 'SOC' },
  { label: 'Signal', value: '-62dBm', unit: 'RSSI' },
  { label: 'GPS', value: '18 sat', unit: 'FIX' }
]

const fleet = [
  { id: 'AX-001', status: 'success', statusLabel: 'OK', alt: '120m', batt: '78%', task: 'Survey' },
  { id: 'AX-002', status: 'success', statusLabel: 'OK', alt: '115m', batt: '82%', task: 'Survey' },
  {
    id: 'AX-003',
    status: 'warning',
    statusLabel: 'CAUTION',
    alt: '118m',
    batt: '23%',
    task: 'RTB'
  },
  { id: 'AX-004', status: 'danger', statusLabel: 'ALARM', alt: '0m', batt: '—', task: 'LOST' },
  {
    id: 'AX-005',
    status: 'success',
    statusLabel: 'OK',
    alt: '122m',
    batt: '91%',
    task: 'Perimeter'
  }
]

const alertFeed = [
  {
    time: '14:32:08',
    level: 'Alarm',
    bg: 'bg-alarm-subtle',
    text: 'text-alarm-content',
    border: 'border-alarm',
    msg: 'AX-004 communication lost — last position 47.3812°N 8.5421°E'
  },
  {
    time: '14:31:45',
    level: 'Warning',
    bg: 'bg-warning-subtle',
    text: 'text-warning-content',
    border: 'border-warning',
    msg: 'AX-003 battery critical — initiating RTB'
  },
  {
    time: '14:30:12',
    level: 'Caution',
    bg: 'bg-caution-subtle',
    text: 'text-caution-content',
    border: 'border-caution',
    msg: 'Wind gust 22kt detected — monitoring'
  },
  {
    time: '14:28:00',
    level: 'OK',
    bg: 'bg-ok-subtle',
    text: 'text-ok-content',
    border: 'border-ok',
    msg: 'Swarm formation stable — all waypoints on track'
  }
]
</script>

<template>
  <div class="bg-page min-h-screen flex flex-col">
    <!-- Status Header -->
    <header class="flex flex-wrap items-center gap-3 px-4 py-2 border-b border-line shrink-0">
      <span class="type-caption-m text-content-high">MISSION: ALPINE-SURVEY-07</span>
      <AuxBadge variant="success" size="sm" dot>ACTIVE</AuxBadge>
      <div class="flex-1"></div>
      <div class="flex flex-wrap gap-2">
        <AuxBadge variant="default" size="sm">5 AIRCRAFT</AuxBadge>
        <AuxBadge variant="warning" size="sm" dot>1 CAUTION</AuxBadge>
        <AuxBadge variant="danger" size="sm" dot>1 ALARM</AuxBadge>
      </div>
    </header>

    <div class="flex-1 flex flex-col lg:flex-row">
      <!-- Left panel -->
      <div class="flex-1 flex flex-col p-2 gap-2 min-w-0">
        <!-- Telemetry Grid -->
        <section>
          <p class="type-overline text-content-dim px-1 mb-1">Telemetry — AX-001</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div
              v-for="t in telemetry"
              :key="t.label"
              class="rounded-instrument border border-line p-1.5"
            >
              <span class="type-overline text-content-dim block">{{ t.label }}</span>
              <span class="type-section-sb text-content-high font-mono block mt-0.5">{{
                t.value
              }}</span>
              <span class="type-agate-m text-content-dim font-mono">{{ t.unit }}</span>
            </div>
          </div>
        </section>

        <!-- Map Placeholder -->
        <section class="flex-1 min-h-48">
          <div
            class="rounded-instrument border border-line h-full flex items-center justify-center"
          >
            <span class="type-overline text-content-dim">Map Overlay</span>
          </div>
        </section>
      </div>

      <!-- Right panel -->
      <div
        class="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-line flex flex-col p-2 gap-2"
      >
        <!-- Fleet List -->
        <section>
          <p class="type-overline text-content-dim px-1 mb-1">Fleet Status</p>
          <div class="rounded-instrument border border-line overflow-x-auto">
            <table class="w-full min-w-[320px]">
              <thead>
                <tr>
                  <th class="type-agate-m text-content-dim text-left px-2 py-1">ID</th>
                  <th class="type-agate-m text-content-dim text-left px-2 py-1">Status</th>
                  <th class="type-agate-m text-content-dim text-left px-2 py-1">Alt</th>
                  <th class="type-agate-m text-content-dim text-left px-2 py-1">Batt</th>
                  <th class="type-agate-m text-content-dim text-left px-2 py-1">Task</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="drone in fleet" :key="drone.id" class="border-t border-line">
                  <td class="type-agate-m text-content-high font-mono px-2 py-1">{{ drone.id }}</td>
                  <td class="px-2 py-1">
                    <AuxBadge :variant="drone.status" size="sm" dot>{{
                      drone.statusLabel
                    }}</AuxBadge>
                  </td>
                  <td class="type-agate-m text-content-low font-mono px-2 py-1">{{ drone.alt }}</td>
                  <td class="type-agate-m text-content-low font-mono px-2 py-1">
                    {{ drone.batt }}
                  </td>
                  <td class="type-agate-m text-content-low px-2 py-1">{{ drone.task }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Alert Feed -->
        <section class="flex-1">
          <p class="type-overline text-content-dim px-1 mb-1">Alert Feed</p>
          <div class="flex flex-col gap-1">
            <div
              v-for="alert in alertFeed"
              :key="alert.time"
              :class="[
                alert.bg,
                alert.text,
                alert.border,
                'rounded-instrument px-2 py-1.5 border-l-2'
              ]"
            >
              <div class="flex items-center gap-2">
                <span class="type-agate-m font-mono">{{ alert.time }}</span>
                <span class="type-agate-m font-mono">{{ alert.level }}</span>
              </div>
              <p class="type-agate-m mt-0.5">{{ alert.msg }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Command Bar -->
    <footer
      class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-4 py-2 border-t border-line shrink-0"
    >
      <AuxInput placeholder="Command..." size="sm" class="flex-1" />
      <div class="flex gap-2">
        <AuxButton variant="destructive" size="sm">Abort Mission</AuxButton>
        <AuxButton size="sm">Execute</AuxButton>
      </div>
    </footer>
  </div>
</template>
