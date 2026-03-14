<script setup>
import { ref } from 'vue'
import { Radio, RadioGroup } from '../../components'

const defaultPriority = ref('medium')

const sizeSmall = ref('low')
const sizeMedium = ref('medium')
const sizeLarge = ref('low')

const stateUnselected = ref(null)
const stateSelected = ref('on')
const stateDisabledUnselected = ref(null)
const stateDisabledSelected = ref('on')
const stateError = ref(null)

const horizontalPriority = ref('medium')

const hintFrequency = ref('daily')

const errorSelection = ref(null)

const realWorldFrequency = ref('daily')
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Radio</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Single-selection control for mutually exclusive options. Supports vertical and horizontal
        grouping, hints, and error states.
      </p>
    </section>

    <!-- 01 Default -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Default
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">vertical group</span>
          <div>
            <RadioGroup v-model="defaultPriority" name="default-priority" label="Priority">
              <Radio value="low" label="Low" />
              <Radio value="medium" label="Medium" />
              <Radio value="high" label="High" />
            </RadioGroup>
          </div>
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
            <RadioGroup v-model="sizeSmall" name="size-sm" label="Priority" size="sm">
              <Radio value="low" label="Low" />
              <Radio value="medium" label="Medium" />
              <Radio value="high" label="High" />
            </RadioGroup>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">md (default)</span>
          <div>
            <RadioGroup v-model="sizeMedium" name="size-md" label="Priority" size="md">
              <Radio value="low" label="Low" />
              <Radio value="medium" label="Medium" />
              <Radio value="high" label="High" />
            </RadioGroup>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">lg</span>
          <div>
            <RadioGroup v-model="sizeLarge" name="size-lg" label="Priority" size="lg">
              <Radio value="low" label="Low" />
              <Radio value="medium" label="Medium" />
              <Radio value="high" label="High" />
            </RadioGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 03 States -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">03</span> — States</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">unselected</span>
          <div>
            <Radio
              v-model="stateUnselected"
              value="off"
              name="state-unselected"
              label="Option"
            />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">selected</span>
          <div>
            <Radio v-model="stateSelected" value="on" name="state-selected" label="Option" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">error</span>
          <div>
            <Radio
              v-model="stateError"
              value="pick"
              name="state-error"
              label="Option"
              error="Selection required."
            />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled / unselected</span>
          <div>
            <Radio
              v-model="stateDisabledUnselected"
              value="off"
              name="state-disabled-off"
              disabled
              label="Unavailable"
            />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled / selected</span>
          <div>
            <Radio
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

    <!-- 04 Horizontal Group -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Horizontal Group
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">orientation horizontal</span>
          <div>
            <RadioGroup
              v-model="horizontalPriority"
              name="horizontal-priority"
              label="Priority"
              orientation="horizontal"
            >
              <Radio value="low" label="Low" />
              <Radio value="medium" label="Medium" />
              <Radio value="high" label="High" />
            </RadioGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 With Hint -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — With Hint
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">group + option hints</span>
          <div>
            <RadioGroup
              v-model="hintFrequency"
              name="hint-frequency"
              label="Update frequency"
              hint="Controls how often the system checks for changes."
            >
              <Radio
                value="realtime"
                label="Real-time"
                hint="Immediate updates as they occur."
              />
              <Radio value="daily" label="Daily" hint="Aggregated once per day." />
              <Radio value="weekly" label="Weekly" hint="Summary delivered each Monday." />
            </RadioGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 06 With Error -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — With Error
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">group error propagates</span>
          <div>
            <RadioGroup
              v-model="errorSelection"
              name="error-selection"
              label="Priority level"
              error="Please select an option."
            >
              <Radio value="low" label="Low" />
              <Radio value="medium" label="Medium" />
              <Radio value="high" label="High" />
            </RadioGroup>
          </div>
        </div>
      </div>
    </section>

    <!-- 07 Real-World Example -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">07</span> — Real-World Example
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">notification frequency</span>
          <div>
            <RadioGroup
              v-model="realWorldFrequency"
              name="notif-frequency"
              label="Notification frequency"
            >
              <Radio
                value="realtime"
                label="Real-time"
                hint="Get notified immediately when events occur. Best for active mission monitoring."
              />
              <Radio
                value="daily"
                label="Daily digest"
                hint="Receive a consolidated summary of all events once per day at 08:00 UTC."
              />
              <Radio
                value="weekly"
                label="Weekly summary"
                hint="A comprehensive report delivered every Monday covering the previous seven days."
              />
            </RadioGroup>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
