<script setup>
import { computed, useId } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: {
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
  },
  name: {
    type: String,
    default: null
  },
  value: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const inputId = useId()

const trackClasses = computed(() => {
  const base =
    'absolute inset-0 rounded-full flex items-center p-0.5 transition-colors duration-fast ease-snap'

  if (props.disabled) {
    if (props.modelValue) {
      return [base, 'bg-blue-solid opacity-disabled']
    }
    return [base, 'bg-base-ui ring-1 ring-inset ring-base-6 dark:ring-basedark-6 opacity-disabled']
  }

  if (props.error) {
    if (props.modelValue) {
      return [base, 'bg-red-solid']
    }
    return [base, 'bg-base-ui ring-1 ring-inset ring-red-9 dark:ring-reddark-9']
  }

  if (props.modelValue) {
    return [base, 'bg-blue-solid']
  }

  return [base, 'bg-base-ui ring-1 ring-inset ring-base-6 dark:ring-basedark-6 hover:ring-base-7 hover:dark:ring-basedark-7']
})

const thumbClasses = computed(() => {
  const base = 'block size-4 rounded-full shadow-panel transition-transform duration-fast ease-snap'

  if (props.modelValue) {
    const bg = 'bg-white'
    return [base, 'translate-x-4', bg]
  }

  return [base, 'translate-x-0 bg-base-dim']
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
      <div class="relative mt-0.5 flex-shrink-0 w-9 h-5">
        <input
          :id="inputId"
          type="checkbox"
          role="switch"
          v-bind="$attrs"
          class="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          :checked="modelValue"
          :disabled="disabled"
          :name="name"
          :value="value"
          :aria-checked="modelValue"
          :aria-invalid="error ? true : undefined"
          :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
          @change="onChange"
        />
        <span
          :class="trackClasses"
          class="pointer-events-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring"
          aria-hidden="true"
        >
          <span :class="thumbClasses" />
        </span>
      </div>

      <!-- Label / hint / error -->
      <div v-if="label || hint || error" class="flex flex-col">
        <label
          :for="inputId"
          class="type-body-r text-base-normal"
          :class="disabled ? 'opacity-disabled cursor-not-allowed' : 'cursor-pointer'"
        >
          {{ label }}
        </label>
        <p v-if="error" :id="`${inputId}-error`" class="type-caption-r text-red-dim mt-0.5">
          {{ error }}
        </p>
        <p v-else-if="hint" :id="`${inputId}-hint`" class="type-caption-r text-base-dim mt-0.5">
          {{ hint }}
        </p>
      </div>
    </div>
  </div>
</template>
