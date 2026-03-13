<script setup>
import { ref } from 'vue'
import { AuxCheckbox } from '../../components'

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
      <p class="type-overline text-content-dim">Foundation</p>
      <h1 class="type-display-sb text-content-high mt-4">Checkbox</h1>
      <p class="type-lead-r text-content-low mt-4 max-w-xl">
        Binary and indeterminate selection control with label, hint, and error support.
        Three sizes: sm, md, lg.
      </p>
    </section>

    <!-- 01 Default -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">01</span> — Default
      </p>
      <div class="grid grid-cols-2 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">unchecked</span>
          <div>
            <AuxCheckbox v-model="defaultUnchecked" label="Remember me" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">checked</span>
          <div>
            <AuxCheckbox v-model="defaultChecked" label="Remember me" />
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
          <span class="type-overline text-content-dim">unchecked</span>
          <div>
            <AuxCheckbox v-model="stateUnchecked" label="Option" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">checked</span>
          <div>
            <AuxCheckbox v-model="stateChecked" label="Option" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">indeterminate</span>
          <div>
            <AuxCheckbox v-model="stateIndeterminate" :indeterminate="true" label="Select all" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">disabled / unchecked</span>
          <div>
            <AuxCheckbox v-model="stateDisabledUnchecked" disabled label="Unavailable" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">disabled / checked</span>
          <div>
            <AuxCheckbox v-model="stateDisabledChecked" disabled label="Locked" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">error</span>
          <div>
            <AuxCheckbox
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
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">03</span> — With Hint
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">label + hint</span>
          <div>
            <AuxCheckbox
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
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">04</span> — With Error
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">error replaces hint</span>
          <div>
            <AuxCheckbox
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
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">05</span> — Group
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">independent controls</span>
          <div class="flex flex-col gap-1">
            <p class="type-overline text-content-dim mb-2">Notification preferences</p>
            <AuxCheckbox v-model="notifEmail" label="Email notifications" />
            <AuxCheckbox v-model="notifSms" label="SMS alerts" />
            <AuxCheckbox v-model="notifPush" label="Push notifications" />
            <AuxCheckbox v-model="notifSlack" label="Slack integration" />
          </div>
        </div>
      </div>
    </section>

    <!-- 06 Sizes -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">06</span> — Sizes
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">sm</span>
          <div>
            <AuxCheckbox v-model="sizeSm" label="Enable telemetry" size="sm" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">md (default)</span>
          <div>
            <AuxCheckbox v-model="sizeMd" label="Enable telemetry" size="md" />
          </div>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-3">
          <span class="type-overline text-content-dim">lg</span>
          <div>
            <AuxCheckbox v-model="sizeLg" label="Enable telemetry" size="lg" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
