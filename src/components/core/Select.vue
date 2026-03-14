<script setup>
import { computed, useId } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'error', 'success'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  placeholder: {
    type: String,
    default: null
  },
  disabled: {
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
  leadingIcon: {
    type: [Object, Function],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const selectId = useId()

const activeVariant = computed(() => {
  if (props.error) return 'error'
  return props.variant
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-7 px-3 type-agate-r',
    md: 'h-9 px-4 type-caption-r',
    lg: 'h-11 px-5 type-body-r'
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  if (props.disabled) {
    return 'bg-action-disabled text-action-content-disabled cursor-not-allowed opacity-disabled border border-base-dim'
  }

  const variants = {
    default:
      'bg-base-ui border border-base-normal text-base-normal focus-visible:border-blue-9 focus-visible:dark:border-bluedark-9 focus-visible:ring-1 focus-visible:ring-focus-ring',
    error:
      'bg-base-ui border border-red-dim text-base-normal focus-visible:border-red-8 focus-visible:dark:border-reddark-8 focus-visible:ring-1 focus-visible:ring-focus-ring-alarm',
    success:
      'bg-base-ui border border-green-dim text-base-normal focus-visible:border-green-8 focus-visible:dark:border-greendark-8 focus-visible:ring-1 focus-visible:ring-focus-ring-ok'
  }
  return variants[activeVariant.value]
})

const selectClasses = computed(() => [
  'w-full appearance-none outline-none transition-colors duration-fast ease-snap rounded-panel pr-10 cursor-pointer',
  sizeClasses.value,
  variantClasses.value,
  props.leadingIcon ? 'pl-10' : ''
])

const iconSizeOffset = computed(() => {
  const offsets = {
    sm: 'left-2.5',
    md: 'left-3',
    lg: 'left-4'
  }
  return offsets[props.size]
})

const chevronOffset = computed(() => {
  const offsets = {
    sm: 'right-2.5',
    md: 'right-3',
    lg: 'right-4'
  }
  return offsets[props.size]
})

function onChange(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div>
    <label v-if="label" :for="selectId" class="type-caption-m text-base-normal mb-1 block">
      {{ label }}
    </label>

    <div class="relative">
      <div
        v-if="leadingIcon"
        class="pointer-events-none absolute inset-y-0 flex items-center text-base-dim"
        :class="iconSizeOffset"
      >
        <component :is="leadingIcon" class="w-4 h-4" aria-hidden="true" />
      </div>

      <select
        :id="selectId"
        v-bind="$attrs"
        :value="modelValue"
        :disabled="disabled"
        :class="selectClasses"
        :aria-invalid="activeVariant === 'error' || undefined"
        :aria-describedby="error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined"
        @change="onChange"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <slot />
      </select>

      <div
        class="pointer-events-none absolute inset-y-0 flex items-center text-base-dim"
        :class="chevronOffset"
      >
        <ChevronDownIcon class="w-4 h-4" aria-hidden="true" />
      </div>
    </div>

    <p v-if="error" :id="`${selectId}-error`" class="type-caption-r text-red-dim mt-1.5">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="`${selectId}-hint`" class="type-caption-r text-base-dim mt-1.5">
      {{ hint }}
    </p>
  </div>
</template>
