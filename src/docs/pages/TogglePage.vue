<script setup>
import { ref } from 'vue'
import { Toggle } from '../../components'

const defaultOff = ref(false)
const defaultOn = ref(true)

const stateOff = ref(false)
const stateOn = ref(true)
const stateDisabledOff = ref(false)
const stateDisabledOn = ref(true)
const stateErrorOff = ref(false)
const stateErrorOn = ref(true)

const hintToggle = ref(false)
const errorToggle = ref(false)
const noLabel = ref(true)

const settingWifi = ref(true)
const settingBluetooth = ref(false)
const settingTelemetry = ref(true)
const settingNotifications = ref(false)
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Toggle</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Sliding switch control for binary on/off settings. Built on a native checkbox with
        role="switch". Includes label, hint, and error support.
      </p>
    </section>

    <!-- 01 Default -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Default
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">off</span>
          <div>
            <Toggle v-model="defaultOff" label="Enable notifications" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">on</span>
          <div>
            <Toggle v-model="defaultOn" label="Enable notifications" />
          </div>
        </div>
      </div>
    </section>

    <!-- 02 States -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — States</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">off</span>
          <div>
            <Toggle v-model="stateOff" label="Option" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">on</span>
          <div>
            <Toggle v-model="stateOn" label="Option" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled / off</span>
          <div>
            <Toggle v-model="stateDisabledOff" disabled label="Unavailable" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled / on</span>
          <div>
            <Toggle v-model="stateDisabledOn" disabled label="Locked" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">error / off</span>
          <div>
            <Toggle v-model="stateErrorOff" label="Required setting" error="Required" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">error / on</span>
          <div>
            <Toggle v-model="stateErrorOn" label="Required setting" error="Required" />
          </div>
        </div>
      </div>
    </section>

    <!-- 03 With Hint -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — With Hint
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">label + hint</span>
          <div>
            <Toggle
              v-model="hintToggle"
              label="Enable telemetry"
              hint="Anonymous usage data helps improve the platform."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 04 With Error -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — With Error
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">error replaces hint</span>
          <div>
            <Toggle
              v-model="errorToggle"
              label="Accept data processing terms"
              error="You must accept to continue."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 05 No Label -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — No Label
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">standalone control</span>
          <div>
            <!-- When no label is provided, always pass aria-label for accessibility -->
            <Toggle v-model="noLabel" v-bind="{ 'aria-label': 'Enable feature' }" />
          </div>
          <p class="type-caption-r text-base-dim max-w-md">
            For inline usage in table rows or settings rows. Always provide an
            <span class="font-mono">aria-label</span> when no visible label is present.
          </p>
        </div>
      </div>
    </section>

    <!-- 06 Settings List -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — Settings List
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8">
          <div class="max-w-lg divide-y divide-base-dim">
            <div class="flex justify-between items-center py-3">
              <Toggle v-model="settingWifi" label="Wi-Fi" hint="Connect to nearby networks" />
            </div>
            <div class="flex justify-between items-center py-3">
              <Toggle
                v-model="settingBluetooth"
                label="Bluetooth"
                hint="Discover and connect to devices"
              />
            </div>
            <div class="flex justify-between items-center py-3">
              <Toggle
                v-model="settingTelemetry"
                label="Telemetry logging"
                hint="Record flight data for post-mission analysis"
              />
            </div>
            <div class="flex justify-between items-center py-3">
              <Toggle
                v-model="settingNotifications"
                label="Push notifications"
                hint="Receive alerts for mission status changes"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
