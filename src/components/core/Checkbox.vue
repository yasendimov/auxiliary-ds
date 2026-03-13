<script setup>
import { computed, useId } from 'vue'
import { CheckIcon, MinusIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
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
  }
})

const emit = defineEmits(['update:modelValue'])

const inputId = useId()

const isCheckedOrIndeterminate = computed(() => props.indeterminate || props.modelValue)

const controlClasses = computed(() => {
  const base =
    'size-4 rounded-instrument border flex items-center justify-center transition-colors duration-fast ease-snap'

  if (props.disabled) {
    if (isCheckedOrIndeterminate.value) {
      return [base, 'bg-action border-action opacity-40 cursor-not-allowed']
    }
    return [base, 'bg-surface-1 border-line opacity-40 cursor-not-allowed']
  }

  if (props.error) {
    if (isCheckedOrIndeterminate.value) {
      return [base, 'bg-alarm border-alarm']
    }
    return [base, 'bg-surface-1 border-alarm hover:border-alarm']
  }

  if (isCheckedOrIndeterminate.value) {
    return [base, 'bg-action border-action']
  }

  return [base, 'bg-surface-1 border-line hover:border-line-hover']
})

function onChange(event) {
  emit('update:modelValue', event.target.checked)
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex items-start gap-2.5"
      :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    >
      <!-- Control wrapper -->
      <div class="relative mt-0.5 flex-shrink-0 size-4">
        <input
          :id="inputId"
          type="checkbox"
          class="peer absolute inset-0 size-4 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          :checked="modelValue"
          :indeterminate="indeterminate"
          :disabled="disabled"
          :aria-checked="indeterminate ? 'mixed' : undefined"
          :aria-invalid="error ? true : undefined"
          :aria-describedby="
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          "
          @change="onChange"
        />
        <span
          :class="controlClasses"
          class="pointer-events-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring"
          aria-hidden="true"
        >
          <CheckIcon
            v-if="!indeterminate && modelValue"
            class="size-3 text-white"
          />
          <MinusIcon
            v-else-if="indeterminate"
            class="size-3 text-white"
          />
        </span>
      </div>

      <!-- Label / hint / error -->
      <div v-if="label || hint || error" class="flex flex-col">
        <label
          :for="inputId"
          class="type-body-r text-content-high"
          :class="disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'"
        >
          {{ label }}
        </label>
        <p
          v-if="error"
          :id="`${inputId}-error`"
          class="type-caption-r text-alarm-content mt-0.5"
        >
          {{ error }}
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
