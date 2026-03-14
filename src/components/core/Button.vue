<script setup>
import { computed } from 'vue'
import Spinner from './Spinner.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'ghost', 'destructive'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  leadingIcon: {
    type: [Object, Function],
    default: null
  },
  trailingIcon: {
    type: [Object, Function],
    default: null
  }
})

const emit = defineEmits(['click'])

const isDisabled = computed(() => props.disabled || props.loading)

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-7 px-3 type-agate-m gap-1.5',
    md: 'h-9 px-4 type-caption-sb gap-2',
    lg: 'h-11 px-5 type-body-sb gap-2'
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  if (isDisabled.value) {
    return 'bg-action-disabled text-action-content-disabled opacity-disabled cursor-not-allowed pointer-events-none'
  }

  const variants = {
    primary: 'bg-blue-solid text-white',
    ghost:
      'border border-base-normal text-base-normal bg-transparent hover:bg-base-ui',
    destructive: 'bg-red-solid text-white'
  }
  return variants[props.variant]
})

const buttonClasses = computed(() => [
  'rounded-panel inline-flex items-center justify-center transition-colors duration-fast ease-snap',
  sizeClasses.value,
  variantClasses.value,
  props.block ? 'w-full' : ''
])

function onClick(event) {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    :class="buttonClasses"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    :disabled="isDisabled"
    @click="onClick"
  >
    <Spinner v-if="loading" size="sm" variant="current" />
    <component :is="leadingIcon" v-if="leadingIcon && !loading" class="size-4" aria-hidden="true" />
    <slot />
    <component :is="trailingIcon" v-if="trailingIcon" class="size-4" aria-hidden="true" />
  </button>
</template>
