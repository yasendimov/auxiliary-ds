<script setup>
import { ref } from 'vue'
import { AuxRadio, AuxRadioGroup } from '../../components'

const defaultSize = ref('medium')

const stateUnselected = ref(null)
const stateSelected = ref('on')
const stateDisabledUnselected = ref(null)
const stateDisabledSelected = ref('on')
const stateError = ref(null)

const horizontalSize = ref('medium')

const hintFrequency = ref('daily')

const errorSelection = ref(null)

const realWorldFrequency = ref('daily')
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-content-dim">Foundation</p>
      <h1 class="type-display-sb text-content-high mt-4">Radio</h1>
      <p class="type-lead-r text-content-low mt-4 max-w-xl">
        Single-selection control for mutually exclusive options. Supports vertical and horizontal
        grouping, hints, and error states.
      </p>
    </section>

    <!-- 01 Default -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">01</span> — Default
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">vertical group</span>
          <div>
            <AuxRadioGroup v-model="defaultSize" name="default-size" label="Size">
              <AuxRadio value="small" label="Small" />
              <AuxRadio value="medium" label="Medium" />
              <AuxRadio value="large" label="Large" />
            </AuxRadioGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 States -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">02</span> — States
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">unselected</span>
          <div>
            <AuxRadio v-model="stateUnselected" value="off" name="state-unselected" label="Option" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">selected</span>
          <div>
            <AuxRadio v-model="stateSelected" value="on" name="state-selected" label="Option" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">error</span>
          <div>
            <AuxRadio
              v-model="stateError"
              value="pick"
              name="state-error"
              label="Option"
              error="Selection required."
            />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">disabled / unselected</span>
          <div>
            <AuxRadio
              v-model="stateDisabledUnselected"
              value="off"
              name="state-disabled-off"
              disabled
              label="Unavailable"
            />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">disabled / selected</span>
          <div>
            <AuxRadio
              v-model="stateDisabledSelected"
              value="on"
              name="state-disabled-on"
              disabled
              label="Locked"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 03 Horizontal Group -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">03</span> — Horizontal Group
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">orientation horizontal</span>
          <div>
            <AuxRadioGroup
              v-model="horizontalSize"
              name="horizontal-size"
              label="Size"
              orientation="horizontal"
            >
              <AuxRadio value="small" label="Small" />
              <AuxRadio value="medium" label="Medium" />
              <AuxRadio value="large" label="Large" />
            </AuxRadioGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 With Hint -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">04</span> — With Hint
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">group + option hints</span>
          <div>
            <AuxRadioGroup
              v-model="hintFrequency"
              name="hint-frequency"
              label="Update frequency"
              hint="Controls how often the system checks for changes."
            >
              <AuxRadio value="realtime" label="Real-time" hint="Immediate updates as they occur." />
              <AuxRadio value="daily" label="Daily" hint="Aggregated once per day." />
              <AuxRadio value="weekly" label="Weekly" hint="Summary delivered each Monday." />
            </AuxRadioGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 With Error -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">05</span> — With Error
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">group error propagates</span>
          <div>
            <AuxRadioGroup
              v-model="errorSelection"
              name="error-selection"
              label="Priority level"
              error="Please select an option."
            >
              <AuxRadio value="low" label="Low" />
              <AuxRadio value="medium" label="Medium" />
              <AuxRadio value="high" label="High" />
            </AuxRadioGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 06 Real-World Example -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">06</span> — Real-World Example
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">notification frequency</span>
          <div>
            <AuxRadioGroup
              v-model="realWorldFrequency"
              name="notif-frequency"
              label="Notification frequency"
            >
              <AuxRadio
                value="realtime"
                label="Real-time"
                hint="Get notified immediately when events occur. Best for active mission monitoring."
              />
              <AuxRadio
                value="daily"
                label="Daily digest"
                hint="Receive a consolidated summary of all events once per day at 08:00 UTC."
              />
              <AuxRadio
                value="weekly"
                label="Weekly summary"
                hint="A comprehensive report delivered every Monday covering the previous seven days."
              />
            </AuxRadioGroup>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
