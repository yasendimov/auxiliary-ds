<script setup>
import { computed, inject, useId } from 'vue'
import { radioGroupKey } from './radioGroupKey.js'

defineOptions({ inheritAttrs: false })

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
  },
  size: {
    type: String,
    default: null,
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
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

const resolvedSize = computed(() => props.size || (group ? group.size?.value : null) || 'md')

const sizeConfig = computed(() => {
  const map = {
    sm: {
      control: 'size-3.5',
      dot: 'size-1.5',
      gap: 'gap-2',
      mt: 'mt-px',
      label: 'type-caption-r',
      hint: 'type-agate-r'
    },
    md: {
      control: 'size-4',
      dot: 'size-2',
      gap: 'gap-2.5',
      mt: 'mt-0.5',
      label: 'type-body-r',
      hint: 'type-caption-r'
    },
    lg: {
      control: 'size-5',
      dot: 'size-2.5',
      gap: 'gap-3',
      mt: 'mt-0.5',
      label: 'type-intro-r',
      hint: 'type-caption-r'
    }
  }
  return map[resolvedSize.value]
})

const controlClasses = computed(() => {
  const base = `${sizeConfig.value.control} rounded-full border flex items-center justify-center transition-colors duration-fast ease-snap`

  if (isDisabled.value) {
    if (isChecked.value) {
      return [base, 'border-blue-9 dark:border-bluedark-9 bg-base-ui opacity-disabled cursor-not-allowed']
    }
    return [base, 'bg-base-ui border-base-dim opacity-disabled cursor-not-allowed']
  }

  if (activeError.value) {
    if (isChecked.value) {
      return [base, 'border-red-9 dark:border-reddark-9 bg-base-ui']
    }
    return [base, 'bg-base-ui border-red-normal']
  }

  if (isChecked.value) {
    return [base, 'border-blue-9 dark:border-bluedark-9 bg-base-ui']
  }

  return [base, 'bg-base-ui border-base-normal']
})

const dotClasses = computed(() => {
  const dot = sizeConfig.value.dot
  if (activeError.value) return `${dot} rounded-full bg-red-solid`
  return `${dot} rounded-full bg-blue-solid`
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
      class="flex items-start"
      :class="[sizeConfig.gap, isDisabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    >
      <!-- Control wrapper -->
      <div class="relative flex-shrink-0" :class="[sizeConfig.control, sizeConfig.mt]">
        <input
          :id="inputId"
          type="radio"
          v-bind="$attrs"
          class="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          :class="sizeConfig.control"
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
          class="text-base-normal"
          :class="[
            sizeConfig.label,
            isDisabled ? 'opacity-disabled cursor-not-allowed' : 'cursor-pointer'
          ]"
        >
          {{ label }}
        </label>
        <p
          v-if="activeError && !group"
          :id="`${inputId}-error`"
          class="text-red-dim mt-0.5"
          :class="sizeConfig.hint"
        >
          {{ activeError }}
        </p>
        <p
          v-else-if="hint"
          :id="`${inputId}-hint`"
          class="text-base-dim mt-0.5"
          :class="sizeConfig.hint"
        >
          {{ hint }}
        </p>
      </div>
    </div>
  </div>
</template>
