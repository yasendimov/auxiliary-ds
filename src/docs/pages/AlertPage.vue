<script setup>
import { ref } from 'vue'
import { Alert, Button } from '../../components'

const showAlarm = ref(true)
const showOk = ref(true)
const showInfo = ref(true)

function resetDismissible() {
  showAlarm.value = true
  showOk.value = true
  showInfo.value = true
}
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Alert</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Contextual feedback messages following the OpenBridge alert hierarchy. Five severity levels
        from informational to immediate action required.
      </p>
    </section>

    <!-- 01 Variants -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Variants</p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-4">
          <div class="max-w-lg flex flex-col gap-3">
            <span class="type-overline text-base-dim">alarm</span>
            <Alert
              variant="alarm"
              title="Engine failure detected"
              description="Unit 3 has lost propulsion. Immediate action required."
            />

            <span class="type-overline text-base-dim mt-4">warning</span>
            <Alert
              variant="warning"
              title="Battery critically low"
              description="Unit 7 battery at 8%. RTL recommended."
            />

            <span class="type-overline text-base-dim mt-4">caution</span>
            <Alert
              variant="caution"
              title="Wind speed elevated"
              description="Sustained winds at 28 kts. Monitor mission parameters."
            />

            <span class="type-overline text-base-dim mt-4">ok</span>
            <Alert
              variant="ok"
              title="Mission complete"
              description="All units have returned and landed successfully."
            />

            <span class="type-overline text-base-dim mt-4">info</span>
            <Alert
              variant="info"
              title="Firmware update available"
              description="Version 4.2.1 is ready to install."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 02 Title Only -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — Title Only
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">alarm</span>
          <Alert variant="alarm" title="Connection lost" />
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">ok</span>
          <Alert variant="ok" title="Calibration complete" />
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">info</span>
          <Alert variant="info" title="System update scheduled" />
        </div>
      </div>
    </section>

    <!-- 03 Description Only -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Description Only
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">warning</span>
          <div class="max-w-sm">
            <Alert
              variant="warning"
              description="GPS signal degraded. Position accuracy may be reduced."
            />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">info</span>
          <div class="max-w-sm">
            <Alert
              variant="info"
              description="Telemetry data is being recorded for post-flight analysis."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 04 Dismissible -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Dismissible
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8">
          <div class="max-w-lg flex flex-col gap-3">
            <Alert
              v-if="showAlarm"
              variant="alarm"
              title="Geofence breach"
              description="Unit 2 has exited the operational boundary."
              dismissible
              @dismiss="showAlarm = false"
            />
            <Alert
              v-if="showOk"
              variant="ok"
              title="Pre-flight check passed"
              description="All systems nominal."
              dismissible
              @dismiss="showOk = false"
            />
            <Alert
              v-if="showInfo"
              variant="info"
              title="New waypoint added"
              description="Waypoint WP-14 has been appended to the active route."
              dismissible
              @dismiss="showInfo = false"
            />
            <div v-if="!showAlarm || !showOk || !showInfo" class="mt-2">
              <Button variant="ghost" size="sm" @click="resetDismissible">Reset</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 With Action -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — With Action
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">button action</span>
          <div class="max-w-sm">
            <Alert
              variant="warning"
              title="Battery threshold reached"
              description="Unit 4 has reached the minimum safe battery level."
            >
              <Button variant="ghost" size="sm">View details</Button>
            </Alert>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">link action</span>
          <div class="max-w-sm">
            <Alert
              variant="info"
              title="Documentation updated"
              description="The flight operations manual has been revised."
            >
              <a
                href="#"
                class="type-caption-m text-indigo-dim hover:text-indigo-solid transition-colors duration-fast"
              >
                Learn more
              </a>
            </Alert>
          </div>
        </div>
      </div>
    </section>

    <!-- 06 OpenBridge Hierarchy -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — OpenBridge Alert Hierarchy
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8">
          <p class="type-body-r text-base-dim max-w-lg">
            AUX follows the OpenBridge aviation alert hierarchy for operational interfaces. Alarm
            (red) demands immediate action — engine failures, geofence breaches, loss of control.
            Warning (orange) signals urgent attention before a situation escalates — critically low
            battery, degraded link quality. Caution (amber) raises awareness of conditions worth
            monitoring — elevated wind, approaching airspace limits. OK (green) confirms normal
            operation or successful completion. Info (indigo) provides neutral, non-critical context
            like firmware updates or telemetry status. These levels are never used decoratively —
            each color carries operational meaning that flight crews learn to trust instinctively.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
