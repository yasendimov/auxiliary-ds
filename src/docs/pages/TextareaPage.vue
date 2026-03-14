<script setup>
import { ref } from 'vue'
import { Textarea } from '../../components'

const defaultValue = ref('')

const stateEmpty = ref('')
const stateWithValue = ref('Drone fleet ready for deployment at sector 7G.')
const stateDisabled = ref('This field is locked.')
const stateError = ref('')

const resizeNone = ref('Fixed height textarea.')
const resizeVertical = ref('Drag the corner to resize.')
const resizeAuto = ref('Start typing and this textarea will grow with your content.')

const hintValue = ref('')
const errorValue = ref('')

const countValue = ref('Initial mission parameters confirmed.')

const missionBrief = ref('')
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Textarea</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Multi-line text input with label, hint, error, character count, and auto-resize support.
      </p>
    </section>

    <!-- 01 Default -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">01</span> — Default
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8">
          <div class="max-w-md">
            <Textarea
              v-model="defaultValue"
              label="Message"
              placeholder="Write something..."
              :rows="4"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 02 States -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — States</p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">default (empty)</span>
          <div class="max-w-sm">
            <Textarea v-model="stateEmpty" label="Notes" placeholder="Enter notes..." />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">with value</span>
          <div class="max-w-sm">
            <Textarea v-model="stateWithValue" label="Notes" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">disabled</span>
          <div class="max-w-sm">
            <Textarea v-model="stateDisabled" label="Notes" disabled />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">error</span>
          <div class="max-w-sm">
            <Textarea
              v-model="stateError"
              label="Notes"
              placeholder="Enter notes..."
              error="Message is required"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 03 Resize Modes -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Resize Modes
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">none</span>
          <div>
            <Textarea v-model="resizeNone" label="Fixed" resize="none" :rows="3" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">vertical (default)</span>
          <div>
            <Textarea v-model="resizeVertical" label="Resizable" resize="vertical" :rows="3" />
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">auto</span>
          <div>
            <Textarea
              v-model="resizeAuto"
              label="Auto-grow"
              resize="auto"
              :rows="3"
              hint="Grows with content, shrinks on delete."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 04 With Hint -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — With Hint
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8">
          <div class="max-w-md">
            <Textarea
              v-model="hintValue"
              label="Description"
              placeholder="Describe the issue..."
              hint="Include steps to reproduce if reporting a bug."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 05 With Error -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — With Error
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8">
          <div class="max-w-md">
            <Textarea
              v-model="errorValue"
              label="Feedback"
              placeholder="Share your feedback..."
              error="Feedback cannot be empty."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 06 Character Count -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — Character Count
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8">
          <div class="max-w-md">
            <Textarea
              v-model="countValue"
              label="Summary"
              placeholder="Brief summary..."
              :maxlength="200"
              :show-count="true"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 07 Real-World: Mission Brief -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">07</span> — Real-World Example
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8">
          <div class="max-w-lg rounded-panel bg-base-ui p-6">
            <h3 class="type-section-sb text-base-normal mb-4">New Mission</h3>
            <Textarea
              v-model="missionBrief"
              label="Mission briefing"
              placeholder="Describe the mission objectives and constraints..."
              hint="Describe the mission objectives and constraints."
              :rows="6"
              :maxlength="500"
              :show-count="true"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
