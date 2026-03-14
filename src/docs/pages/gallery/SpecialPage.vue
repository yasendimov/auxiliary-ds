<script setup>
import { ref, computed } from 'vue'
import {
  Button,
  Badge,
  Input,
  Toggle,
  Spinner,
  Separator,
  Checkbox
} from '../../../components'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const filterQuery = ref('')
const commandText = ref('')
const voiceConfirm = ref(false)

const dataLayers = ref([
  { label: 'Friendly Forces', enabled: true },
  { label: 'Hostile Tracks', enabled: true },
  { label: 'Neutral / Unknown', enabled: false },
  { label: 'SAM Threat Rings', enabled: true },
  { label: 'AO Boundaries', enabled: true },
  { label: 'Drone Corridors', enabled: false },
  { label: 'Weather Overlay', enabled: false }
])

const trackedObjects = [
  { id: 'FRND-001', type: 'MQ-9A', category: 'air', status: 'ok' },
  { id: 'FRND-002', type: 'MQ-1C', category: 'air', status: 'ok' },
  { id: 'FRND-003', type: 'RQ-20', category: 'air', status: 'caution' },
  { id: 'FRND-004', type: 'MQ-9A', category: 'air', status: 'ok' },
  { id: 'FRND-005', type: 'RQ-7B', category: 'air', status: 'ok' },
  { id: 'HSTL-014', type: 'UNK-AIR', category: 'air', status: 'alarm' },
  { id: 'HSTL-015', type: 'SA-22', category: 'ground', status: 'alarm' },
  { id: 'HSTL-016', type: 'UNK-GND', category: 'ground', status: 'warning' },
  { id: 'NTRL-008', type: 'CIV-AIR', category: 'air', status: 'default' },
  { id: 'NTRL-009', type: 'CIV-GND', category: 'ground', status: 'default' }
]

const sensorFeeds = [
  { name: 'EO/IR Pod 1', status: 'success', label: 'OK', data: '30fps 4K' },
  { name: 'SAR Radar', status: 'success', label: 'OK', data: 'GMTI' },
  { name: 'SIGINT RX-4', status: 'warning', label: 'DEGRADED', data: '-8dB SNR' },
  { name: 'EO/IR Pod 2', status: 'danger', label: 'FAULT', data: 'NO LINK' }
]

const selectedTrack = ref('HSTL-014')

const selectedEntity = computed(() => {
  const track = trackedObjects.find((t) => t.id === selectedTrack.value)
  if (!track) return null

  const entities = {
    'HSTL-014': {
      classification: 'HOSTILE',
      badgeVariant: 'danger',
      telemetry: [
        { label: 'LAT', value: '33.3102\u00B0N' },
        { label: 'LON', value: '44.5540\u00B0E' },
        { label: 'ALT', value: 'FL280' },
        { label: 'HDG', value: '247\u00B0' },
        { label: 'SPD', value: '420 kt' },
        { label: 'AGE', value: '00:04:32' }
      ]
    },
    'HSTL-015': {
      classification: 'HOSTILE',
      badgeVariant: 'danger',
      telemetry: [
        { label: 'LAT', value: '33.2877\u00B0N' },
        { label: 'LON', value: '44.4801\u00B0E' },
        { label: 'ALT', value: 'GND' },
        { label: 'HDG', value: '\u2014' },
        { label: 'SPD', value: '0 kt' },
        { label: 'AGE', value: '00:12:44' }
      ]
    },
    'FRND-003': {
      classification: 'FRIENDLY',
      badgeVariant: 'success',
      telemetry: [
        { label: 'LAT', value: '33.2501\u00B0N' },
        { label: 'LON', value: '44.3298\u00B0E' },
        { label: 'ALT', value: 'FL180' },
        { label: 'HDG', value: '091\u00B0' },
        { label: 'SPD', value: '85 kt' },
        { label: 'AGE', value: '00:00:08' }
      ]
    }
  }

  const fallback = {
    classification: track.id.startsWith('FRND')
      ? 'FRIENDLY'
      : track.id.startsWith('HSTL')
        ? 'HOSTILE'
        : 'NEUTRAL',
    badgeVariant: track.id.startsWith('FRND')
      ? 'success'
      : track.id.startsWith('HSTL')
        ? 'danger'
        : 'default',
    telemetry: [
      { label: 'LAT', value: '33.2100\u00B0N' },
      { label: 'LON', value: '44.4000\u00B0E' },
      { label: 'ALT', value: '\u2014' },
      { label: 'HDG', value: '\u2014' },
      { label: 'SPD', value: '\u2014' },
      { label: 'AGE', value: '00:00:00' }
    ]
  }

  const entity = entities[track.id] || fallback
  return { ...track, ...entity }
})

const aiDetections = [
  { model: 'MAVEN-OD v3.2', cls: 'Fixed-Wing Aircraft', confidence: 0.94, time: '14:31:52Z' },
  { model: 'MAVEN-OD v3.2', cls: 'Rotary-Wing', confidence: 0.67, time: '14:31:52Z' },
  { model: 'MAVEN-CLS', cls: 'SA-22 TEL', confidence: 0.89, time: '14:30:44Z' },
  { model: 'MAVEN-ACT', cls: 'Convoy Movement', confidence: 0.72, time: '14:29:11Z' }
]

const alertFeed = [
  {
    time: '14:32:08Z',
    bg: 'bg-red-ui',
    text: 'text-red-dim',
    border: 'border-red-9 dark:border-reddark-9',
    msg: 'HSTL-014 maneuver detected \u2014 heading change to 247\u00B0'
  },
  {
    time: '14:31:45Z',
    bg: 'bg-orange-ui',
    text: 'text-orange-dim',
    border: 'border-orange-9 dark:border-orangedark-9',
    msg: 'FRND-003 datalink degraded \u2014 SNR below threshold'
  },
  {
    time: '14:31:12Z',
    bg: 'bg-amber-ui',
    text: 'text-amber-dim',
    border: 'border-amber-9 dark:border-amberdark-9',
    msg: 'Weather cell approaching AO from NW \u2014 ETI 45 min'
  },
  {
    time: '14:30:44Z',
    bg: 'bg-green-ui',
    text: 'text-green-dim',
    border: 'border-green-9 dark:border-greendark-9',
    msg: 'MAVEN-CLS identified SA-22 TEL at 33.2877N 44.4801E'
  },
  {
    time: '14:29:30Z',
    bg: 'bg-red-ui',
    text: 'text-red-dim',
    border: 'border-red-9 dark:border-reddark-9',
    msg: 'SAM threat ring overlap \u2014 FRND-001 in SA-22 MEZ'
  }
]

const commsChannels = [
  { name: 'TAC-1', freq: '243.0', active: true },
  { name: 'ISR NET', freq: '311.6', active: true },
  { name: 'FIRES', freq: '275.8', active: false },
  { name: 'C2 PRI', freq: '340.2', active: true }
]

const statusDotClass = (status) => {
  const map = {
    ok: 'bg-green-solid',
    caution: 'bg-amber-solid',
    warning: 'bg-orange-solid',
    alarm: 'bg-red-solid',
    default: 'bg-base-ui'
  }
  return map[status] || map.default
}

const confidenceClass = (conf) => {
  if (conf >= 0.8) return 'text-green-dim'
  if (conf >= 0.5) return 'text-amber-dim'
  return 'text-red-dim'
}

const filteredTracks = computed(() => {
  if (!filterQuery.value) return trackedObjects
  const q = filterQuery.value.toLowerCase()
  return trackedObjects.filter(
    (t) => t.id.toLowerCase().includes(q) || t.type.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="bg-base-app h-[100vh] flex flex-col overflow-hidden">
    <!-- Top Status Bar -->
    <header class="flex items-center gap-2 px-3 py-1.5 border-b border-base-dim shrink-0 bg-base-ui">
      <Badge variant="warning" size="sm">SECRET // NOFORN</Badge>
      <Separator orientation="vertical" spacing="sm" />
      <span class="type-caption-m text-base-normal">OP CONVERGENT AEGIS</span>
      <Badge variant="info" size="sm" dot>PHASE 3 — ACTIVE</Badge>
      <div class="flex-1"></div>
      <span class="type-caption-m font-mono text-base-dim hidden sm:inline"
        >13 MAR 2026 14:32:08Z</span
      >
      <Separator orientation="vertical" spacing="sm" class="hidden sm:block" />
      <div class="hidden md:flex items-center gap-1.5">
        <Badge variant="success" size="sm" dot>LINK 16</Badge>
        <Badge variant="success" size="sm" dot>SATCOM</Badge>
      </div>
      <Separator orientation="vertical" spacing="sm" class="hidden md:block" />
      <div class="flex items-center gap-1.5">
        <Spinner size="sm" variant="action" />
        <span class="type-agate-m text-blue-dim">AI PROCESSING</span>
      </div>
    </header>

    <!-- Main three-column layout -->
    <div class="flex-1 flex flex-col md:flex-row min-h-0">
      <!-- Left Panel -->
      <aside
        class="w-full md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-base-dim flex flex-col overflow-y-auto"
      >
        <!-- Filter -->
        <div class="px-2 py-2 border-b border-base-dim">
          <Input
            v-model="filterQuery"
            placeholder="Filter tracks..."
            size="sm"
            :leading-icon="MagnifyingGlassIcon"
          />
        </div>

        <!-- Data Layers -->
        <div class="px-2 py-2 border-b border-base-dim">
          <span class="type-overline text-base-dim block mb-1.5">DATA LAYERS</span>
          <div class="flex flex-col gap-0.5">
            <div
              v-for="layer in dataLayers"
              :key="layer.label"
              class="flex items-center justify-between py-0.5"
            >
              <span class="type-caption-r text-base-dim">{{ layer.label }}</span>
              <Toggle v-model="layer.enabled" />
            </div>
          </div>
        </div>

        <!-- Tracked Objects -->
        <div class="px-2 py-2 border-b border-base-dim">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="type-overline text-base-dim">TRACKED OBJECTS</span>
            <Badge variant="default" size="sm">{{ filteredTracks.length }}</Badge>
          </div>
          <div class="flex flex-col gap-px">
            <div
              v-for="track in filteredTracks"
              :key="track.id"
              class="flex items-center gap-2 px-1.5 py-1 rounded-instrument cursor-default transition-colors duration-instant"
              :class="selectedTrack === track.id ? 'bg-base-ui' : 'hover:bg-base-ui'"
              @click="selectedTrack = track.id"
            >
              <span
                class="size-2 rounded-full shrink-0"
                :class="statusDotClass(track.status)"
              ></span>
              <span class="type-agate-m font-mono text-base-normal">{{ track.id }}</span>
              <span class="type-agate-m text-base-dim truncate">{{ track.type }}</span>
            </div>
          </div>
        </div>

        <!-- Sensor Feeds -->
        <div class="px-2 py-2">
          <span class="type-overline text-base-dim block mb-1.5">SENSOR FEEDS</span>
          <div class="flex flex-col gap-1">
            <div
              v-for="sensor in sensorFeeds"
              :key="sensor.name"
              class="rounded-instrument border border-base-dim p-1.5 flex items-center justify-between"
            >
              <div>
                <span class="type-agate-m text-base-normal block">{{ sensor.name }}</span>
                <span class="type-agate-m font-mono text-base-dim">{{ sensor.data }}</span>
              </div>
              <Badge :variant="sensor.status" size="sm" dot>{{ sensor.label }}</Badge>
            </div>
          </div>
        </div>
      </aside>

      <!-- Center Map -->
      <main class="flex-1 flex flex-col p-2 gap-2 min-w-0">
        <!-- Map Placeholder -->
        <div
          class="flex-1 rounded-instrument border border-base-dim bg-base-ui relative overflow-hidden min-h-48"
          style="
            background-image:
              linear-gradient(var(--color-base-dim) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-base-dim) 1px, transparent 1px);
            background-size: 60px 60px;
            background-position: center center;
          "
        >
          <!-- Center label -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="type-overline text-base-dim">GEOSPATIAL DISPLAY — AO CONVERGENT</span>
          </div>

          <!-- Top-left: zoom & coords -->
          <div class="absolute top-2 left-2">
            <span
              class="type-agate-m font-mono text-base-dim bg-base-app/80 px-1.5 py-0.5 rounded-instrument"
              >Z14 33.25°N 44.42°E</span
            >
          </div>

          <!-- Top-right: scale -->
          <div class="absolute top-2 right-2">
            <span
              class="type-agate-m font-mono text-base-dim bg-base-app/80 px-1.5 py-0.5 rounded-instrument"
              >5 km</span
            >
          </div>

          <!-- Bottom-left: cursor position -->
          <div class="absolute bottom-2 left-2">
            <span
              class="type-agate-m font-mono text-base-dim bg-base-app/80 px-1.5 py-0.5 rounded-instrument"
              >CURSOR 33.2500°N 44.4200°E</span
            >
          </div>

          <!-- Bottom-right: source -->
          <div class="absolute bottom-2 right-2">
            <span
              class="type-agate-m font-mono text-base-dim bg-base-app/80 px-1.5 py-0.5 rounded-instrument"
              >SRC: NGA GEOINT</span
            >
          </div>
        </div>

        <!-- Toolbar -->
        <div class="flex items-center gap-1.5">
          <Button size="sm" variant="ghost">Measure</Button>
          <Button size="sm" variant="ghost">Mark Point</Button>
          <Button size="sm" variant="ghost">Draw AO</Button>
          <Button size="sm" variant="ghost">Screenshot</Button>
          <div class="flex-1"></div>
          <Button size="sm" variant="ghost">Center on AO</Button>
          <Button size="sm" variant="ghost">Reset View</Button>
        </div>
      </main>

      <!-- Right Panel -->
      <aside
        class="w-full md:w-64 shrink-0 border-t md:border-t-0 md:border-l border-base-dim flex flex-col overflow-y-auto"
      >
        <template v-if="selectedEntity">
          <!-- Entity Header -->
          <div class="px-2 py-2 border-b border-base-dim">
            <div class="flex items-center gap-2">
              <span class="type-section-sb font-mono text-base-normal">{{
                selectedEntity.id
              }}</span>
              <Badge :variant="selectedEntity.badgeVariant" size="sm" dot>{{
                selectedEntity.classification
              }}</Badge>
            </div>
            <span class="type-caption-m text-base-dim mt-0.5 block">{{
              selectedEntity.type
            }}</span>
          </div>

          <!-- Track Data -->
          <div class="px-2 py-2 border-b border-base-dim">
            <span class="type-overline text-base-dim block mb-1.5">TRACK DATA</span>
            <div class="grid grid-cols-2 gap-1">
              <div
                v-for="t in selectedEntity.telemetry"
                :key="t.label"
                class="rounded-instrument border border-base-dim p-1.5"
              >
                <span class="type-overline text-base-dim block">{{ t.label }}</span>
                <span class="type-caption-m font-mono text-base-normal block mt-0.5">{{
                  t.value
                }}</span>
              </div>
            </div>
          </div>

          <!-- AI Detections -->
          <div class="px-2 py-2 border-b border-base-dim flex-1">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="type-overline text-base-dim">AI DETECTIONS</span>
              <Spinner size="sm" variant="action" />
            </div>
            <div class="flex flex-col gap-1">
              <div
                v-for="det in aiDetections"
                :key="det.cls + det.time"
                class="rounded-instrument border border-base-dim p-1.5"
              >
                <div class="flex items-center justify-between">
                  <span class="type-agate-m text-base-dim">{{ det.model }}</span>
                  <span class="type-agate-m font-mono" :class="confidenceClass(det.confidence)"
                    >{{ (det.confidence * 100).toFixed(0) }}%</span
                  >
                </div>
                <span class="type-caption-m text-base-normal block mt-0.5">{{ det.cls }}</span>
                <span class="type-agate-m font-mono text-base-dim">{{ det.time }}</span>
              </div>
            </div>
          </div>

          <!-- Engagement Options -->
          <div class="px-2 py-2 flex flex-col gap-1.5">
            <span class="type-overline text-base-dim block mb-0.5">ENGAGEMENT</span>
            <Button size="sm" variant="ghost" block>Request ISR Tasking</Button>
            <Button size="sm" variant="ghost" block>Nominate Target</Button>
            <Button size="sm" variant="destructive" block>Initiate Track Prosecution</Button>
          </div>
        </template>

        <div v-else class="flex-1 flex items-center justify-center p-4">
          <span class="type-caption-m text-base-dim">Select a track</span>
        </div>
      </aside>
    </div>

    <!-- Bottom Bar -->
    <footer class="shrink-0 border-t border-base-dim bg-base-ui flex flex-col md:flex-row">
      <!-- Alert Feed -->
      <div
        class="flex-1 px-3 py-2 border-b md:border-b-0 md:border-r border-base-dim overflow-y-auto max-h-36"
      >
        <span class="type-overline text-base-dim block mb-1">ALERT FEED</span>
        <div class="flex flex-col gap-0.5">
          <div
            v-for="alert in alertFeed"
            :key="alert.time + alert.msg"
            :class="[alert.bg, alert.text, alert.border, 'rounded-instrument px-2 py-1 border-l-2']"
          >
            <span class="type-agate-m font-mono">{{ alert.time }}</span>
            <span class="type-agate-m ml-2">{{ alert.msg }}</span>
          </div>
        </div>
      </div>

      <!-- Comms -->
      <div class="w-full md:w-48 shrink-0 px-3 py-2 border-b md:border-b-0 md:border-r border-base-dim">
        <span class="type-overline text-base-dim block mb-1">COMMS</span>
        <div class="flex flex-col gap-0.5">
          <div
            v-for="ch in commsChannels"
            :key="ch.name"
            class="flex items-center justify-between py-0.5"
          >
            <span class="type-agate-m text-base-normal">{{ ch.name }}</span>
            <div class="flex items-center gap-1.5">
              <span class="type-agate-m font-mono text-base-dim">{{ ch.freq }}</span>
              <Badge :variant="ch.active ? 'success' : 'default'" size="sm" dot>{{
                ch.active ? 'ON' : 'OFF'
              }}</Badge>
            </div>
          </div>
        </div>
      </div>

      <!-- Command -->
      <div class="w-full md:w-72 shrink-0 px-3 py-2">
        <span class="type-overline text-base-dim block mb-1">COMMAND</span>
        <div class="flex items-center gap-1.5">
          <Input
            v-model="commandText"
            placeholder="Query Maven AI..."
            size="sm"
            class="flex-1"
          />
          <Button size="sm">Send</Button>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <Checkbox v-model="voiceConfirm" label="Voice confirm" size="sm" />
        </div>
        <p class="type-agate-m font-mono text-base-dim mt-1 truncate">
          > All friendly tracks nominal. HSTL-014 assessed high threat.
        </p>
      </div>
    </footer>
  </div>
</template>
