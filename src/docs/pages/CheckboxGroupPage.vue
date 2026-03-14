<script setup>
import { ref } from 'vue'
import { Checkbox, CheckboxGroup } from '../../components'

const defaultFeatures = ref(['telemetry'])

const sizeSmall = ref(['alerts'])
const sizeMedium = ref(['alerts'])
const sizeLarge = ref(['alerts'])

const disabledFeatures = ref(['telemetry', 'alerts'])
const errorFeatures = ref([])

const horizontalFeatures = ref(['logs'])

const hintFeatures = ref(['position'])

const realWorldNotifications = ref(['mission', 'battery'])
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">CheckboxGroup</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Multi-selection control for non-exclusive options. Wraps Checkbox components with shared
        state via provide/inject — same pattern as RadioGroup.
      </p>
    </section>

    <!-- 01 Default -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Default</p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">vertical group</span>
          <div>
            <CheckboxGroup v-model="defaultFeatures" label="Data feeds">
              <Checkbox value="telemetry" label="Telemetry" />
              <Checkbox value="alerts" label="Alerts" />
              <Checkbox value="logs" label="Flight logs" />
            </CheckboxGroup>
          </div>
          <span class="type-agate-r font-mono text-base-dim mt-2">
            v-model: {{ defaultFeatures }}
          </span>
        </div>
      </div>
    </section>

    <!-- 02 Sizes -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — Sizes</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">sm</span>
          <div>
            <CheckboxGroup v-model="sizeSmall" label="Feeds" size="sm">
              <Checkbox value="telemetry" label="Telemetry" />
              <Checkbox value="alerts" label="Alerts" />
              <Checkbox value="logs" label="Logs" />
            </CheckboxGroup>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">md (default)</span>
          <div>
            <CheckboxGroup v-model="sizeMedium" label="Feeds" size="md">
              <Checkbox value="telemetry" label="Telemetry" />
              <Checkbox value="alerts" label="Alerts" />
              <Checkbox value="logs" label="Logs" />
            </CheckboxGroup>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">lg</span>
          <div>
            <CheckboxGroup v-model="sizeLarge" label="Feeds" size="lg">
              <Checkbox value="telemetry" label="Telemetry" />
              <Checkbox value="alerts" label="Alerts" />
              <Checkbox value="logs" label="Logs" />
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 03 States -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">03</span> — States</p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled</span>
          <div>
            <CheckboxGroup v-model="disabledFeatures" label="Locked feeds" disabled>
              <Checkbox value="telemetry" label="Telemetry" />
              <Checkbox value="alerts" label="Alerts" />
              <Checkbox value="logs" label="Flight logs" />
            </CheckboxGroup>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">error</span>
          <div>
            <CheckboxGroup
              v-model="errorFeatures"
              label="Required feeds"
              error="Select at least one data feed."
            >
              <Checkbox value="telemetry" label="Telemetry" />
              <Checkbox value="alerts" label="Alerts" />
              <Checkbox value="logs" label="Flight logs" />
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 Horizontal -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Horizontal
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">orientation horizontal</span>
          <div>
            <CheckboxGroup
              v-model="horizontalFeatures"
              label="Visible layers"
              orientation="horizontal"
            >
              <Checkbox value="telemetry" label="Telemetry" />
              <Checkbox value="alerts" label="Alerts" />
              <Checkbox value="logs" label="Logs" />
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 With Hint -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">05</span> — With Hint</p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">group + option hints</span>
          <div>
            <CheckboxGroup
              v-model="hintFeatures"
              label="Telemetry fields"
              hint="Selected fields appear in the vehicle detail panel."
            >
              <Checkbox value="position" label="Position" hint="GPS coordinates and altitude." />
              <Checkbox value="attitude" label="Attitude" hint="Pitch, roll, and yaw angles." />
              <Checkbox
                value="battery"
                label="Battery"
                hint="Voltage, current, and remaining capacity."
              />
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 06 Real-World Example -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — Real-World Example
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">notification preferences</span>
          <div>
            <CheckboxGroup v-model="realWorldNotifications" label="Notification channels">
              <Checkbox
                value="mission"
                label="Mission events"
                hint="Waypoint reached, mission complete, geofence breach."
              />
              <Checkbox
                value="battery"
                label="Battery alerts"
                hint="Low voltage, critical capacity, cell imbalance."
              />
              <Checkbox
                value="maintenance"
                label="Maintenance reminders"
                hint="Flight hour limits, calibration due, firmware updates."
              />
              <Checkbox
                value="weather"
                label="Weather advisories"
                hint="Wind speed, precipitation, visibility below minimums."
              />
            </CheckboxGroup>
          </div>
          <span class="type-agate-r font-mono text-base-dim mt-2">
            v-model: {{ realWorldNotifications }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>
