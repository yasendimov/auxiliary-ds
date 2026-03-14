<script setup>
import { ref } from 'vue'
import { Input, Select, Textarea, Toggle, FormField } from '../../components'

const name = ref('')
const email = ref('')
const role = ref('')
const notes = ref('')
const autoLand = ref(false)
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">FormField</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Composition wrapper that provides consistent label, hint, error, and required indicator
        layout for any form control.
      </p>
    </section>

    <!-- Basic -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Basic</p>
      <div class="border border-base-dim rounded-card p-8 max-w-sm">
        <FormField v-slot="{ id }" label="Pilot name">
          <Input :id="id" v-model="name" placeholder="Enter name" />
        </FormField>
      </div>
    </section>

    <!-- With hint -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — With Hint</p>
      <div class="border border-base-dim rounded-card p-8 max-w-sm">
        <FormField
          v-slot="{ id }"
          label="Email address"
          hint="We'll use this for mission notifications."
        >
          <Input :id="id" v-model="email" type="email" placeholder="pilot@auterion.com" />
        </FormField>
      </div>
    </section>

    <!-- With error -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — With Error
      </p>
      <div class="border border-base-dim rounded-card p-8 max-w-sm">
        <FormField v-slot="{ id }" label="Email address" error="A valid email is required.">
          <Input :id="id" model-value="not-an-email" variant="error" />
        </FormField>
      </div>
    </section>

    <!-- Required -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">04</span> — Required</p>
      <div class="border border-base-dim rounded-card p-8 max-w-sm space-y-6">
        <FormField v-slot="{ id }" label="Mission name" required>
          <Input :id="id" placeholder="Required field" />
        </FormField>
        <FormField v-slot="{ id }" label="Optional notes">
          <Input :id="id" placeholder="Not required" />
        </FormField>
      </div>
    </section>

    <!-- With Select -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — With Select
      </p>
      <div class="border border-base-dim rounded-card p-8 max-w-sm">
        <FormField
          v-slot="{ id }"
          label="Operator role"
          hint="Select the pilot's role for this mission."
        >
          <Select :id="id" v-model="role">
            <option value="" disabled>Select a role</option>
            <option value="pic">Pilot in Command</option>
            <option value="vo">Visual Observer</option>
            <option value="payload">Payload Operator</option>
          </Select>
        </FormField>
      </div>
    </section>

    <!-- With Textarea -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — With Textarea
      </p>
      <div class="border border-base-dim rounded-card p-8 max-w-sm">
        <FormField v-slot="{ id }" label="Mission notes" hint="Optional notes for the flight crew.">
          <Textarea :id="id" v-model="notes" placeholder="Enter notes..." :rows="3" />
        </FormField>
      </div>
    </section>

    <!-- Custom control -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">07</span> — Custom Control
      </p>
      <div class="border border-base-dim rounded-card p-8 max-w-sm">
        <FormField
          label="Auto-land on low battery"
          hint="Vehicle will return to home when battery drops below 20%."
        >
          <div class="mt-1">
            <Toggle v-model="autoLand" />
          </div>
        </FormField>
      </div>
    </section>
  </div>
</template>
