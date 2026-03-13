<script setup>
import { computed, inject, useId } from 'vue'
import { radioGroupKey } from './radioGroupKey.js'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  label: {
    type: String,
    default: null
  },
  hint: {
    type: String,
    default: null
  },
  error: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const inputId = useId()

const group = inject(radioGroupKey, null)

const currentValue = computed(() => (group ? group.modelValue.value : props.modelValue))
const currentName = computed(() => (group ? group.name : props.name))
const isDisabled = computed(() => props.disabled || (group ? group.disabled.value : false))
const activeError = computed(() => props.error || (group ? group.error.value : null))
const isChecked = computed(() => currentValue.value === props.value)

const controlClasses = computed(() => {
  const base =
    'size-4 rounded-full border flex items-center justify-center transition-colors duration-fast ease-snap'

  if (isDisabled.value) {
    if (isChecked.value) {
      return [base, 'border-action bg-surface-1 opacity-40 cursor-not-allowed']
    }
    return [base, 'bg-surface-1 border-line opacity-40 cursor-not-allowed']
  }

  if (activeError.value) {
    if (isChecked.value) {
      return [base, 'border-alarm bg-surface-1']
    }
    return [base, 'bg-surface-1 border-alarm hover:border-alarm']
  }

  if (isChecked.value) {
    return [base, 'border-action bg-surface-1']
  }

  return [base, 'bg-surface-1 border-line hover:border-line-hover']
})

const dotClasses = computed(() => {
  if (activeError.value) return 'size-2 rounded-full bg-alarm'
  return 'size-2 rounded-full bg-action'
})

function onChange() {
  if (group) {
    group.updateValue(props.value)
  } else {
    emit('update:modelValue', props.value)
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex items-start gap-2.5"
      :class="isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    >
      <!-- Control wrapper -->
      <div class="relative mt-0.5 flex-shrink-0 size-4">
        <input
          :id="inputId"
          type="radio"
          class="peer absolute inset-0 size-4 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          :checked="isChecked"
          :value="value"
          :name="currentName"
          :disabled="isDisabled"
          :aria-invalid="activeError ? true : undefined"
          :aria-describedby="
            activeError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          "
          @change="onChange"
        />
        <span
          :class="controlClasses"
          class="pointer-events-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring"
          aria-hidden="true"
        >
          <span v-if="isChecked" :class="dotClasses" />
        </span>
      </div>

      <!-- Label / hint / error -->
      <div v-if="label || hint || activeError" class="flex flex-col">
        <label
          :for="inputId"
          class="type-body-r text-content-high"
          :class="isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'"
        >
          {{ label }}
        </label>
        <p
          v-if="activeError && !group"
          :id="`${inputId}-error`"
          class="type-caption-r text-alarm-content mt-0.5"
        >
          {{ activeError }}
        </p>
        <p
          v-else-if="hint"
          :id="`${inputId}-hint`"
          class="type-caption-r text-content-dim mt-0.5"
        >
          {{ hint }}
        </p>
      </div>
    </div>
  </div>
</template>
