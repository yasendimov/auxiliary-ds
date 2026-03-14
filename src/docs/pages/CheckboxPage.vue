<script setup>
import { ref } from 'vue'
import { Checkbox } from '../../components'

const defaultUnchecked = ref(false)
const defaultChecked = ref(true)

const stateUnchecked = ref(false)
const stateChecked = ref(true)
const stateIndeterminate = ref(false)
const stateDisabledUnchecked = ref(false)
const stateDisabledChecked = ref(true)
const stateError = ref(false)

const hintCheckbox = ref(false)
const errorCheckbox = ref(false)

const notifEmail = ref(true)
const notifSms = ref(false)
const notifPush = ref(true)
const notifSlack = ref(false)

const sizeSm = ref(true)
const sizeMd = ref(true)
const sizeLg = ref(true)
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Checkbox</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Binary and indeterminate selection control with label, hint, and error support. Three sizes:
        sm, md, lg.
      </p>
    </section>

    <!-- 01 Default -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Default</p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">unchecked</span>
          <div>
            <Checkbox v-model="defaultUnchecked" label="Remember me" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">checked</span>
          <div>
            <Checkbox v-model="defaultChecked" label="Remember me" />
          </div>
        </div>
      </div>
    </section>

    <!-- 02 States -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — States</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">unchecked</span>
          <div>
            <Checkbox v-model="stateUnchecked" label="Option" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">checked</span>
          <div>
            <Checkbox v-model="stateChecked" label="Option" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">indeterminate</span>
          <div>
            <Checkbox v-model="stateIndeterminate" :indeterminate="true" label="Select all" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled / unchecked</span>
          <div>
            <Checkbox v-model="stateDisabledUnchecked" disabled label="Unavailable" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled / checked</span>
          <div>
            <Checkbox v-model="stateDisabledChecked" disabled label="Locked" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">error</span>
          <div>
            <Checkbox
              v-model="stateError"
              label="Terms and conditions"
              error="This field is required."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 03 With Hint -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">03</span> — With Hint</p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">label + hint</span>
          <div>
            <Checkbox
              v-model="hintCheckbox"
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
            <Checkbox
              v-model="errorCheckbox"
              label="I accept the license agreement"
              error="You must accept to continue."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 05 Group -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">05</span> — Group</p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">independent controls</span>
          <div class="flex flex-col gap-1">
            <p class="type-overline text-base-dim mb-2">Notification preferences</p>
            <Checkbox v-model="notifEmail" label="Email notifications" />
            <Checkbox v-model="notifSms" label="SMS alerts" />
            <Checkbox v-model="notifPush" label="Push notifications" />
            <Checkbox v-model="notifSlack" label="Slack integration" />
          </div>
        </div>
      </div>
    </section>

    <!-- 06 Sizes -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">06</span> — Sizes</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">sm</span>
          <div>
            <Checkbox v-model="sizeSm" label="Enable telemetry" size="sm" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">md (default)</span>
          <div>
            <Checkbox v-model="sizeMd" label="Enable telemetry" size="md" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">lg</span>
          <div>
            <Checkbox v-model="sizeLg" label="Enable telemetry" size="lg" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
