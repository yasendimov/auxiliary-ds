<script setup>
import {
  Button,
  Badge,
  Input,
  Checkbox,
  Toggle,
  Alert,
  Separator,
  Header,
  Section
} from '../../../components'
import { ref } from 'vue'

// Class names are complete string literals so Tailwind's scanner detects them.
const scales = [
  {
    name: 'Base',
    key: 'base',
    dark: 'basedark',
    role: 'Neutral',
    solidText: 'text-base-app',
    cls: {
      bgApp: 'bg-base-app',
      bgSubtle: 'bg-base-subtle',
      bgUi: 'bg-base-ui',
      bgGhost: 'bg-base-ghost',
      bgAction: 'bg-base-action',
      bgSolid: 'bg-base-solid',
      borderDim: 'border-base-dim',
      borderNormal: 'border-base-normal',
      divideDim: 'divide-base-dim',
      divideNormal: 'divide-base-normal',
      textDim: 'text-base-dim',
      textNormal: 'text-base-normal'
    }
  },
  {
    name: 'Blue',
    key: 'blue',
    dark: 'bluedark',
    role: 'Action',
    solidText: 'text-white',
    cls: {
      bgApp: 'bg-blue-app',
      bgSubtle: 'bg-blue-subtle',
      bgUi: 'bg-blue-ui',
      bgGhost: 'bg-blue-ghost',
      bgAction: 'bg-blue-action',
      bgSolid: 'bg-blue-solid',
      borderDim: 'border-blue-dim',
      borderNormal: 'border-blue-normal',
      divideDim: 'divide-blue-dim',
      divideNormal: 'divide-blue-normal',
      textDim: 'text-blue-dim',
      textNormal: 'text-blue-normal'
    }
  },
  {
    name: 'Red',
    key: 'red',
    dark: 'reddark',
    role: 'Alarm',
    solidText: 'text-white',
    cls: {
      bgApp: 'bg-red-app',
      bgSubtle: 'bg-red-subtle',
      bgUi: 'bg-red-ui',
      bgGhost: 'bg-red-ghost',
      bgAction: 'bg-red-action',
      bgSolid: 'bg-red-solid',
      borderDim: 'border-red-dim',
      borderNormal: 'border-red-normal',
      divideDim: 'divide-red-dim',
      divideNormal: 'divide-red-normal',
      textDim: 'text-red-dim',
      textNormal: 'text-red-normal'
    }
  },
  {
    name: 'Orange',
    key: 'orange',
    dark: 'orangedark',
    role: 'Warning',
    solidText: 'text-white',
    cls: {
      bgApp: 'bg-orange-app',
      bgSubtle: 'bg-orange-subtle',
      bgUi: 'bg-orange-ui',
      bgGhost: 'bg-orange-ghost',
      bgAction: 'bg-orange-action',
      bgSolid: 'bg-orange-solid',
      borderDim: 'border-orange-dim',
      borderNormal: 'border-orange-normal',
      divideDim: 'divide-orange-dim',
      divideNormal: 'divide-orange-normal',
      textDim: 'text-orange-dim',
      textNormal: 'text-orange-normal'
    }
  },
  {
    name: 'Amber',
    key: 'amber',
    dark: 'amberdark',
    role: 'Caution',
    solidText: 'text-white',
    cls: {
      bgApp: 'bg-amber-app',
      bgSubtle: 'bg-amber-subtle',
      bgUi: 'bg-amber-ui',
      bgGhost: 'bg-amber-ghost',
      bgAction: 'bg-amber-action',
      bgSolid: 'bg-amber-solid',
      borderDim: 'border-amber-dim',
      borderNormal: 'border-amber-normal',
      divideDim: 'divide-amber-dim',
      divideNormal: 'divide-amber-normal',
      textDim: 'text-amber-dim',
      textNormal: 'text-amber-normal'
    }
  },
  {
    name: 'Green',
    key: 'green',
    dark: 'greendark',
    role: 'OK',
    solidText: 'text-white',
    cls: {
      bgApp: 'bg-green-app',
      bgSubtle: 'bg-green-subtle',
      bgUi: 'bg-green-ui',
      bgGhost: 'bg-green-ghost',
      bgAction: 'bg-green-action',
      bgSolid: 'bg-green-solid',
      borderDim: 'border-green-dim',
      borderNormal: 'border-green-normal',
      divideDim: 'divide-green-dim',
      divideNormal: 'divide-green-normal',
      textDim: 'text-green-dim',
      textNormal: 'text-green-normal'
    }
  },
  {
    name: 'Indigo',
    key: 'indigo',
    dark: 'indigodark',
    role: 'Info',
    solidText: 'text-white',
    cls: {
      bgApp: 'bg-indigo-app',
      bgSubtle: 'bg-indigo-subtle',
      bgUi: 'bg-indigo-ui',
      bgGhost: 'bg-indigo-ghost',
      bgAction: 'bg-indigo-action',
      bgSolid: 'bg-indigo-solid',
      borderDim: 'border-indigo-dim',
      borderNormal: 'border-indigo-normal',
      divideDim: 'divide-indigo-dim',
      divideNormal: 'divide-indigo-normal',
      textDim: 'text-indigo-dim',
      textNormal: 'text-indigo-normal'
    }
  }
]

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const stepRoles = [
  { steps: '1–2', role: 'Backgrounds', desc: 'app, subtle' },
  { steps: '3–5', role: 'Surfaces', desc: 'normal, hover, active' },
  { steps: '6–8', role: 'Borders', desc: 'dim, normal, focus' },
  { steps: '9–10', role: 'Solids', desc: 'accent, hover' },
  { steps: '11–12', role: 'Text', desc: 'dim, normal' }
]

function stepTextClass(step) {
  return step <= 8 ? 'text-base-normal' : 'text-white'
}

function stepTextStyle(prefix, step) {
  return step <= 8 ? { color: `var(--color-${prefix}-12)` } : { color: `var(--color-${prefix}-1)` }
}

const checkboxChecked = ref(true)
const checkboxUnchecked = ref(false)
const checkboxError = ref(true)
const toggleOn = ref(true)
const toggleOff = ref(false)
const toggleError = ref(true)

const fleetRows = [
  {
    callsign: 'MAV-0042',
    mission: 'Surveying — Zone A',
    metric: '127m',
    dotClass: 'bg-green-9 dark:bg-greendark-9',
    metricClass: 'text-base-dim',
    badgeVariant: 'success',
    badgeLabel: 'OK',
    interactive: true,
    rowClass: 'bg-base-app hover:bg-base-subtle'
  },
  {
    callsign: 'MAV-0088',
    mission: 'Mapping — Zone B',
    metric: '95m',
    dotClass: 'bg-green-9 dark:bg-greendark-9',
    metricClass: 'text-base-dim',
    badgeVariant: 'success',
    badgeLabel: 'OK',
    interactive: true,
    rowClass: 'bg-base-app hover:bg-base-subtle'
  },
  {
    callsign: 'MAV-0113',
    mission: 'RTL — Low Battery',
    metric: '18%',
    dotClass: 'bg-orange-9 dark:bg-orangedark-9',
    metricClass: 'text-orange-normal',
    badgeVariant: 'warning',
    badgeLabel: 'Warn',
    interactive: true,
    rowClass: 'bg-orange-app hover:bg-orange-subtle'
  },
  {
    callsign: 'MAV-0201',
    mission: 'Inspection — Tower 7',
    metric: '42m',
    dotClass: 'bg-green-9 dark:bg-greendark-9',
    metricClass: 'text-base-dim',
    badgeVariant: 'success',
    badgeLabel: 'OK',
    interactive: true,
    rowClass: 'bg-base-app hover:bg-base-subtle'
  },
  {
    callsign: 'MAV-0305',
    mission: 'Patrol — Perimeter',
    metric: '60m',
    dotClass: 'bg-green-9 dark:bg-greendark-9',
    metricClass: 'text-base-dim',
    badgeVariant: 'success',
    badgeLabel: 'OK',
    interactive: true,
    rowClass: 'bg-base-app hover:bg-base-subtle'
  },
  {
    callsign: 'MAV-0410',
    mission: 'Idle — Charging',
    metric: '—',
    dotClass: 'bg-base-8 dark:bg-basedark-8',
    metricClass: 'text-base-dim',
    badgeVariant: null,
    badgeLabel: 'Idle',
    interactive: false,
    rowClass: 'bg-base-app'
  },
  {
    callsign: 'MAV-0411',
    mission: 'Idle — Standby',
    metric: '—',
    dotClass: 'bg-base-8 dark:bg-basedark-8',
    metricClass: 'text-base-dim',
    badgeVariant: null,
    badgeLabel: 'Idle',
    interactive: false,
    rowClass: 'bg-base-app'
  }
]
</script>

<template>
  <div>
    <Header
      eyebrow="Gallery"
      headline="Theme"
      description="Validates the AUX color system. Toggle dark/light to verify scale inversion, step 9 stability, and semantic utility resolution."
    />

    <!-- Section 1: Scale Anatomy -->
    <Section id="scale-anatomy" label="01 — Scale Anatomy">
      <p class="type-caption-m text-base-dim mb-8">
        Each scale has 12 steps with designated roles. In dark mode, step 1 is darkest and step 12
        is lightest (opposite of light mode). Step 9 — the accent fill — is always the same hex in
        both themes.
      </p>

      <!-- Step role legend -->
      <div class="grid gap-px bg-base-dim rounded-card overflow-hidden mb-10">
        <div
          v-for="role in stepRoles"
          :key="role.steps"
          class="bg-base-app flex items-center gap-4 py-2.5 px-4"
        >
          <span class="font-mono type-caption-sb text-base-normal w-12 shrink-0">{{
            role.steps
          }}</span>
          <span class="type-caption-m text-base-normal w-24 shrink-0">{{ role.role }}</span>
          <span class="type-caption-r text-base-dim">{{ role.desc }}</span>
        </div>
      </div>

      <!-- Per-scale strips -->
      <div class="flex flex-col gap-10">
        <div v-for="scale in scales" :key="scale.key">
          <div class="flex items-baseline gap-3 mb-3">
            <span class="type-caption-sb text-base-normal">{{ scale.name }}</span>
            <span class="type-agate-r text-base-dim">{{ scale.role }}</span>
          </div>

          <!-- Light strip -->
          <div class="flex items-center gap-3 mb-2">
            <span class="type-agate-m font-mono text-base-dim w-14 shrink-0">Light</span>
            <div class="flex flex-1 rounded-panel overflow-hidden">
              <div
                v-for="step in steps"
                :key="step"
                class="flex-1 h-10 flex items-end justify-center pb-1"
                :style="{ backgroundColor: `var(--color-${scale.key}-${step})` }"
              >
                <span
                  class="type-agate-m font-mono"
                  :class="stepTextClass(step)"
                  :style="stepTextStyle(scale.key, step)"
                  >{{ step }}</span
                >
              </div>
            </div>
          </div>

          <!-- Dark strip -->
          <div class="flex items-center gap-3">
            <span class="type-agate-m font-mono text-base-dim w-14 shrink-0">Dark</span>
            <div class="flex flex-1 rounded-panel overflow-hidden">
              <div
                v-for="step in steps"
                :key="step"
                class="flex-1 h-10 flex items-end justify-center pb-1"
                :style="{ backgroundColor: `var(--color-${scale.dark}-${step})` }"
              >
                <span
                  class="type-agate-m font-mono"
                  :class="stepTextClass(step)"
                  :style="stepTextStyle(scale.dark, step)"
                  >{{ step }}</span
                >
              </div>
            </div>
          </div>

          <!-- Step 9 stability note -->
          <p class="type-agate-r text-base-dim mt-2 pl-17">
            Step 9 is identical in both themes:
            <span class="font-mono">{{ scale.key }}-9</span> =
            <span class="font-mono">{{ scale.dark }}-9</span>
          </p>
        </div>
      </div>
    </Section>

    <Separator spacing="none" />

    <!-- Section 2: Semantic Utilities in Action -->
    <Section id="semantic-utilities" label="02 — Semantic Utilities in Action">
      <p class="type-caption-m text-base-dim mb-8">
        Each semantic utility class bundles dark mode and interaction states automatically. Validate
        hover, active, and keyboard focus behavior on interactive samples.
      </p>

      <div class="flex flex-col gap-10">
        <div v-for="scale in scales" :key="scale.key">
          <p class="type-caption-sb text-base-normal mb-4">{{ scale.name }}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <!-- bg-app -->
            <div :class="scale.cls.bgApp" class="rounded-card border border-base-dim p-4">
              <span class="type-agate-m font-mono text-base-dim">{{ scale.cls.bgApp }}</span>
            </div>

            <!-- bg-subtle -->
            <div :class="scale.cls.bgSubtle" class="rounded-card border border-base-dim p-4">
              <span class="type-agate-m font-mono text-base-dim">{{ scale.cls.bgSubtle }}</span>
            </div>

            <!-- bg-ui (interactive) -->
            <button type="button" :class="scale.cls.bgUi" class="rounded-card p-4 text-left">
              <span class="type-agate-m font-mono text-base-dim">{{ scale.cls.bgUi }}</span>
              <span class="type-agate-r text-base-dim block mt-1">hover + active</span>
            </button>

            <!-- bg-ghost (interactive) -->
            <button type="button" :class="scale.cls.bgGhost" class="rounded-card p-4 text-left">
              <span class="type-agate-m font-mono text-base-dim">{{ scale.cls.bgGhost }}</span>
              <span class="type-agate-r text-base-dim block mt-1"
                >transparent → hover → active</span
              >
            </button>

            <!-- bg-action (interactive) -->
            <button type="button" :class="scale.cls.bgAction" class="rounded-card p-4 text-left">
              <span class="type-agate-m font-mono text-base-dim">{{ scale.cls.bgAction }}</span>
              <span class="type-agate-r text-base-dim block mt-1">hover + active</span>
            </button>

            <!-- bg-solid (interactive) -->
            <button type="button" :class="scale.cls.bgSolid" class="rounded-card p-4 text-left">
              <span class="type-agate-m font-mono" :class="scale.solidText">{{
                scale.cls.bgSolid
              }}</span>
            </button>

            <!-- border-dim -->
            <div class="rounded-card p-4 border-2" :class="scale.cls.borderDim">
              <span class="type-agate-m font-mono text-base-dim">{{ scale.cls.borderDim }}</span>
            </div>

            <!-- border-normal (interactive) -->
            <button
              type="button"
              class="rounded-card p-4 border-2 text-left"
              :class="scale.cls.borderNormal"
            >
              <span class="type-agate-m font-mono text-base-dim">{{ scale.cls.borderNormal }}</span>
              <span class="type-agate-r text-base-dim block mt-1">hover state</span>
            </button>

            <!-- divide-dim -->
            <div class="rounded-card border border-base-dim overflow-hidden">
              <div class="divide-y" :class="scale.cls.divideDim">
                <div class="px-4 py-2">
                  <span class="type-agate-m font-mono text-base-dim">{{
                    scale.cls.divideDim
                  }}</span>
                </div>
                <div class="px-4 py-2"><span class="type-agate-r text-base-dim">row 2</span></div>
                <div class="px-4 py-2"><span class="type-agate-r text-base-dim">row 3</span></div>
              </div>
            </div>

            <!-- divide-normal (interactive) -->
            <button
              type="button"
              class="rounded-card border border-base-dim overflow-hidden text-left"
            >
              <div class="divide-y" :class="scale.cls.divideNormal">
                <div class="px-4 py-2">
                  <span class="type-agate-m font-mono text-base-dim">{{
                    scale.cls.divideNormal
                  }}</span>
                </div>
                <div class="px-4 py-2"><span class="type-agate-r text-base-dim">row 2</span></div>
                <div class="px-4 py-2"><span class="type-agate-r text-base-dim">row 3</span></div>
              </div>
            </button>

            <!-- text-dim -->
            <div class="rounded-card p-4 bg-base-subtle">
              <span :class="scale.cls.textDim" class="type-body-m">{{ scale.cls.textDim }}</span>
            </div>

            <!-- text-normal -->
            <div class="rounded-card p-4 bg-base-subtle">
              <span :class="scale.cls.textNormal" class="type-body-m">{{
                scale.cls.textNormal
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Separator spacing="none" />

    <!-- Section 3: Composed Patterns -->
    <Section id="composed-patterns" label="03 — Composed Patterns">
      <p class="type-caption-m text-base-dim mb-8">
        Real UI compositions demonstrating the color system in context using AUX components.
      </p>

      <!-- Alert Hierarchy -->
      <div class="mb-10">
        <p class="type-caption-sb text-base-normal mb-4">Alert Hierarchy</p>
        <div class="flex flex-col gap-3">
          <Alert
            variant="alarm"
            title="Alarm"
            description="Immediate action required — critical system failure detected."
          />
          <Alert
            variant="warning"
            title="Warning"
            description="Urgent attention needed — battery level below threshold."
          />
          <Alert
            variant="caution"
            title="Caution"
            description="Awareness required — wind speed approaching operational limits."
          />
          <Alert
            variant="ok"
            title="OK"
            description="Normal state — all systems operating within parameters."
          />
          <Alert
            variant="info"
            title="Info"
            description="Informational — firmware update available for download."
          />
        </div>
      </div>

      <!-- Button Matrix -->
      <div class="mb-10">
        <p class="type-caption-sb text-base-normal mb-4">Button Matrix</p>
        <div class="flex flex-col gap-4">
          <div v-for="size in ['sm', 'md', 'lg']" :key="size" class="flex items-center gap-3">
            <span class="type-agate-m font-mono text-base-dim w-8 shrink-0">{{ size }}</span>
            <Button variant="primary" :size="size">Primary</Button>
            <Button variant="ghost" :size="size">Ghost</Button>
            <Button variant="destructive" :size="size">Destructive</Button>
            <Button variant="primary" :size="size" disabled>Disabled</Button>
            <Button variant="primary" :size="size" loading>Loading</Button>
          </div>
        </div>
      </div>

      <!-- Form Cluster -->
      <div class="mb-10">
        <p class="type-caption-sb text-base-normal mb-4">Form Cluster</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div class="flex flex-col gap-4">
            <Input label="Callsign" placeholder="Enter callsign" />
            <Input label="Altitude (m)" placeholder="120" hint="Range: 0–400m AGL" />
            <Input label="Frequency" placeholder="2.4 GHz" error="Invalid frequency band" />
            <Input label="Serial" placeholder="AUT-00000" disabled />
          </div>
          <div class="flex flex-col gap-5">
            <Checkbox v-model="checkboxChecked" label="Pre-flight check complete" />
            <Checkbox
              v-model="checkboxUnchecked"
              label="Payload armed"
              hint="Requires supervisor approval"
            />
            <Checkbox
              v-model="checkboxError"
              label="Accept mission parameters"
              error="Required before launch"
            />
            <Checkbox :model-value="false" label="Maintenance mode" disabled />
            <Toggle v-model="toggleOn" label="Telemetry streaming" />
            <Toggle v-model="toggleOff" label="Auto-return" hint="Return to home on signal loss" />
            <Toggle
              v-model="toggleError"
              label="Geofence override"
              error="Cannot override active geofence"
            />
            <Toggle :model-value="false" label="Night operations" disabled />
          </div>
        </div>
      </div>

      <!-- Data Card -->
      <div class="mb-10">
        <p class="type-caption-sb text-base-normal mb-4">Data Card</p>
        <div class="bg-base-subtle border border-base-dim rounded-card p-5 max-w-md">
          <div class="flex items-center justify-between mb-4">
            <span class="type-caption-sb text-base-normal">MAV-0042</span>
            <div class="flex items-center gap-2">
              <Badge variant="success" size="sm" dot>Online</Badge>
              <Badge variant="info" size="sm">Surveying</Badge>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <span class="type-agate-r text-base-dim block">Altitude</span>
              <span class="type-body-m font-mono text-base-normal">127.4 m</span>
            </div>
            <div>
              <span class="type-agate-r text-base-dim block">Ground Speed</span>
              <span class="type-body-m font-mono text-base-normal">12.8 m/s</span>
            </div>
            <div>
              <span class="type-agate-r text-base-dim block">Battery</span>
              <span class="type-body-m font-mono text-orange-normal">34%</span>
            </div>
            <div>
              <span class="type-agate-r text-base-dim block">Signal</span>
              <span class="type-body-m font-mono text-green-normal">-62 dBm</span>
            </div>
          </div>
          <div class="border-t border-base-dim mt-4 pt-3">
            <span class="type-agate-r text-base-dim">Position</span>
            <span class="type-caption-r font-mono text-base-normal ml-2"
              >47.3977° N, 8.5456° E</span
            >
          </div>
        </div>
      </div>

      <!-- Status Dashboard Mini -->
      <div>
        <p class="type-caption-sb text-base-normal mb-4">Status Dashboard</p>
        <div class="bg-base-app border border-base-dim rounded-card overflow-hidden max-w-xl">
          <!-- Header bar -->
          <div
            class="bg-base-subtle px-4 py-2.5 border-b border-base-dim flex items-center justify-between"
          >
            <span class="type-caption-sb text-base-normal">Fleet Overview</span>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1.5">
                <span class="size-2 rounded-full bg-green-9 dark:bg-greendark-9"></span>
                <span class="type-agate-m text-base-dim">4 Active</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="size-2 rounded-full bg-orange-9 dark:bg-orangedark-9"></span>
                <span class="type-agate-m text-base-dim">1 Warning</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="size-2 rounded-full bg-base-8 dark:bg-basedark-8"></span>
                <span class="type-agate-m text-base-dim">2 Idle</span>
              </div>
            </div>
          </div>

          <!-- Vehicle rows -->
          <div class="divide-y divide-base-6 dark:divide-basedark-6">
            <template v-for="row in fleetRows" :key="row.callsign">
              <button
                v-if="row.interactive"
                type="button"
                class="w-full px-4 py-2.5 flex items-center gap-4 text-left transition-colors duration-instant focus-visible:ring-1 focus-visible:ring-base-8 dark:focus-visible:ring-basedark-8"
                :class="row.rowClass"
              >
                <span class="size-2 rounded-full shrink-0" :class="row.dotClass"></span>
                <span class="type-caption-m text-base-normal w-20">{{ row.callsign }}</span>
                <span class="type-agate-r text-base-dim flex-1">{{ row.mission }}</span>
                <span class="type-agate-m font-mono" :class="row.metricClass">{{
                  row.metric
                }}</span>
                <Badge :variant="row.badgeVariant" size="sm">{{ row.badgeLabel }}</Badge>
              </button>
              <div v-else class="px-4 py-2.5 flex items-center gap-4" :class="row.rowClass">
                <span class="size-2 rounded-full shrink-0" :class="row.dotClass"></span>
                <span class="type-caption-m text-base-dim w-20">{{ row.callsign }}</span>
                <span class="type-agate-r text-base-dim flex-1">{{ row.mission }}</span>
                <span class="type-agate-m font-mono" :class="row.metricClass">{{
                  row.metric
                }}</span>
                <Badge size="sm">{{ row.badgeLabel }}</Badge>
              </div>
            </template>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>
