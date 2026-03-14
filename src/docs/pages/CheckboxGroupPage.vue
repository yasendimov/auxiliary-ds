<script setup>
import { ref } from 'vue'
import { Checkbox, CheckboxGroup } from '../../components'
import DocsHeader from '../components/DocsHeader.vue'
import DemoSection from '../components/DemoSection.vue'
import DemoCell from '../components/DemoCell.vue'

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
    <DocsHeader
      title="CheckboxGroup"
      description="Multi-selection control for non-exclusive options. Wraps Checkbox components with shared state via provide/inject — same pattern as RadioGroup."
    />

    <DemoSection :number="1" title="Default" :cols="1">
      <DemoCell label="vertical group">
        <CheckboxGroup v-model="defaultFeatures" label="Data feeds">
          <Checkbox value="telemetry" label="Telemetry" />
          <Checkbox value="alerts" label="Alerts" />
          <Checkbox value="logs" label="Flight logs" />
        </CheckboxGroup>
        <span class="type-agate-r font-mono text-base-dim mt-3 block">
          v-model: {{ defaultFeatures }}
        </span>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="2" title="Sizes" :cols="3">
      <DemoCell label="sm">
        <CheckboxGroup v-model="sizeSmall" label="Feeds" size="sm">
          <Checkbox value="telemetry" label="Telemetry" />
          <Checkbox value="alerts" label="Alerts" />
          <Checkbox value="logs" label="Logs" />
        </CheckboxGroup>
      </DemoCell>
      <DemoCell label="md (default)">
        <CheckboxGroup v-model="sizeMedium" label="Feeds" size="md">
          <Checkbox value="telemetry" label="Telemetry" />
          <Checkbox value="alerts" label="Alerts" />
          <Checkbox value="logs" label="Logs" />
        </CheckboxGroup>
      </DemoCell>
      <DemoCell label="lg">
        <CheckboxGroup v-model="sizeLarge" label="Feeds" size="lg">
          <Checkbox value="telemetry" label="Telemetry" />
          <Checkbox value="alerts" label="Alerts" />
          <Checkbox value="logs" label="Logs" />
        </CheckboxGroup>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="3" title="States" :cols="2">
      <DemoCell label="disabled">
        <CheckboxGroup v-model="disabledFeatures" label="Locked feeds" disabled>
          <Checkbox value="telemetry" label="Telemetry" />
          <Checkbox value="alerts" label="Alerts" />
          <Checkbox value="logs" label="Flight logs" />
        </CheckboxGroup>
      </DemoCell>
      <DemoCell label="error">
        <CheckboxGroup
          v-model="errorFeatures"
          label="Required feeds"
          error="Select at least one data feed."
        >
          <Checkbox value="telemetry" label="Telemetry" />
          <Checkbox value="alerts" label="Alerts" />
          <Checkbox value="logs" label="Flight logs" />
        </CheckboxGroup>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="4" title="Horizontal" :cols="1">
      <DemoCell label="orientation horizontal">
        <CheckboxGroup v-model="horizontalFeatures" label="Visible layers" orientation="horizontal">
          <Checkbox value="telemetry" label="Telemetry" />
          <Checkbox value="alerts" label="Alerts" />
          <Checkbox value="logs" label="Logs" />
        </CheckboxGroup>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="5" title="With Hint" :cols="1">
      <DemoCell label="group + option hints">
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
      </DemoCell>
    </DemoSection>

    <DemoSection :number="6" title="Real-World Example" :cols="1" last>
      <DemoCell label="notification preferences">
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
        <span class="type-agate-r font-mono text-base-dim mt-3 block">
          v-model: {{ realWorldNotifications }}
        </span>
      </DemoCell>
    </DemoSection>
  </div>
</template>
