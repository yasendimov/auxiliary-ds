<script setup>
import { computed, useId } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
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
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
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
  },
  trailingIcon: {
    type: [Object, Function],
    default: null
  },
  prefix: {
    type: String,
    default: null
  },
  suffix: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const inputId = useId()

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
      'bg-base-ui border border-base-normal text-base-normal placeholder:text-base-dim focus-visible:border-blue-9 focus-visible:dark:border-bluedark-9 focus-visible:ring-1 focus-visible:ring-focus-ring',
    error:
      'bg-base-ui border border-red-dim text-base-normal placeholder:text-base-dim focus-visible:border-red-8 focus-visible:dark:border-reddark-8 focus-visible:ring-1 focus-visible:ring-focus-ring-alarm',
    success:
      'bg-base-ui border border-green-dim text-base-normal placeholder:text-base-dim focus-visible:border-green-8 focus-visible:dark:border-greendark-8 focus-visible:ring-1 focus-visible:ring-focus-ring-ok'
  }
  return variants[activeVariant.value]
})

const inputClasses = computed(() => [
  'w-full outline-none transition-colors duration-fast ease-snap',
  props.prefix ? '' : 'rounded-l-panel',
  props.suffix ? '' : 'rounded-r-panel',
  sizeClasses.value,
  variantClasses.value,
  props.type === 'number' ? 'tabular-nums' : '',
  props.leadingIcon ? 'pl-10' : '',
  props.trailingIcon ? 'pr-10' : ''
])

const iconSizeOffset = computed(() => {
  const offsets = {
    sm: 'left-2.5',
    md: 'left-3',
    lg: 'left-4'
  }
  return offsets[props.size]
})

const trailingIconOffset = computed(() => {
  const offsets = {
    sm: 'right-2.5',
    md: 'right-3',
    lg: 'right-4'
  }
  return offsets[props.size]
})

function onInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div>
    <label v-if="label" :for="inputId" class="type-caption-m text-base-normal mb-1 block">
      {{ label }}
    </label>

    <div class="flex">
      <span
        v-if="prefix"
        class="inline-flex items-center rounded-l-panel border border-r-0 border-base-dim bg-base-ui px-3 type-caption-r text-base-dim"
      >
        {{ prefix }}
      </span>

      <div class="relative flex-1">
        <div
          v-if="leadingIcon"
          class="pointer-events-none absolute inset-y-0 flex items-center text-base-dim"
          :class="iconSizeOffset"
        >
          <component :is="leadingIcon" class="w-4 h-4" aria-hidden="true" />
        </div>

        <input
          :id="inputId"
          v-bind="$attrs"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :class="inputClasses"
          :aria-invalid="activeVariant === 'error' || undefined"
          :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
          @input="onInput"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
        />

        <div
          v-if="trailingIcon"
          class="pointer-events-none absolute inset-y-0 flex items-center text-base-dim"
          :class="trailingIconOffset"
        >
          <component :is="trailingIcon" class="w-4 h-4" aria-hidden="true" />
        </div>
      </div>

      <span
        v-if="suffix"
        class="inline-flex items-center rounded-r-panel border border-l-0 border-base-dim bg-base-ui px-3 type-caption-r text-base-dim"
      >
        {{ suffix }}
      </span>
    </div>

    <p v-if="error" :id="`${inputId}-error`" class="type-caption-r text-red-dim mt-1.5">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="`${inputId}-hint`" class="type-caption-r text-base-dim mt-1.5">
      {{ hint }}
    </p>
  </div>
</template>
