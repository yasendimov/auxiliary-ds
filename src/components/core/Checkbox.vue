<script setup>
import { computed, useId } from 'vue'
import { CheckIcon, MinusIcon } from '@heroicons/vue/16/solid'

defineOptions({ inheritAttrs: false })

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
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue'])

const inputId = useId()

const isCheckedOrIndeterminate = computed(() => props.indeterminate || props.modelValue)

const sizeConfig = computed(() => {
  const map = {
    sm: { control: 'size-3.5', icon: 'size-2.5', gap: 'gap-2', mt: 'mt-px', label: 'type-caption-r', hint: 'type-agate-r' },
    md: { control: 'size-4', icon: 'size-3', gap: 'gap-2.5', mt: 'mt-0.5', label: 'type-body-r', hint: 'type-caption-r' },
    lg: { control: 'size-5', icon: 'size-3.5', gap: 'gap-3', mt: 'mt-0.5', label: 'type-intro-r', hint: 'type-caption-r' }
  }
  return map[props.size]
})

const controlClasses = computed(() => {
  const base =
    `${sizeConfig.value.control} rounded-instrument border flex items-center justify-center transition-colors duration-fast ease-snap`

  if (props.disabled) {
    if (isCheckedOrIndeterminate.value) {
      return [base, 'bg-action border-action opacity-disabled cursor-not-allowed']
    }
    return [base, 'bg-surface-1 border-line opacity-disabled cursor-not-allowed']
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
      class="flex items-start"
      :class="[sizeConfig.gap, disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    >
      <!-- Control wrapper -->
      <div class="relative flex-shrink-0" :class="[sizeConfig.control, sizeConfig.mt]">
        <input
          :id="inputId"
          type="checkbox"
          v-bind="$attrs"
          class="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          :class="sizeConfig.control"
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
            class="text-white"
            :class="sizeConfig.icon"
          />
          <MinusIcon
            v-else-if="indeterminate"
            class="text-white"
            :class="sizeConfig.icon"
          />
        </span>
      </div>

      <!-- Label / hint / error -->
      <div v-if="label || hint || error" class="flex flex-col">
        <label
          :for="inputId"
          class="text-content-high"
          :class="[sizeConfig.label, disabled ? 'opacity-disabled cursor-not-allowed' : 'cursor-pointer']"
        >
          {{ label }}
        </label>
        <p
          v-if="error"
          :id="`${inputId}-error`"
          class="text-alarm-content mt-0.5"
          :class="sizeConfig.hint"
        >
          {{ error }}
        </p>
        <p
          v-else-if="hint"
          :id="`${inputId}-hint`"
          class="text-content-dim mt-0.5"
          :class="sizeConfig.hint"
        >
          {{ hint }}
        </p>
      </div>
    </div>
  </div>
</template>
