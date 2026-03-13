<script setup>
import { computed } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'ghost', 'destructive'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  leadingIcon: {
    type: [Object, Function],
    default: null,
  },
  trailingIcon: {
    type: [Object, Function],
    default: null,
  },
})

const emit = defineEmits(['click'])

const isDisabled = computed(() => props.disabled || props.loading)

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-7 px-3 text-xs gap-1.5',
    md: 'h-9 px-4 text-sm gap-2',
    lg: 'h-11 px-5 text-base gap-2',
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  if (isDisabled.value) {
    return 'bg-action-disabled text-action-content-disabled opacity-50 cursor-not-allowed pointer-events-none'
  }

  const variants = {
    primary: 'bg-action text-white hover:bg-action-hover',
    ghost: 'border border-line text-content-high bg-transparent hover:border-line-hover hover:bg-surface-1',
    destructive: 'bg-alarm text-white hover:bg-[--color-alarm-hover]',
  }
  return variants[props.variant]
})

const buttonClasses = computed(() => [
  'rounded-panel font-medium inline-flex items-center justify-center transition-colors duration-fast ease-snap',
  sizeClasses.value,
  variantClasses.value,
  props.block ? 'w-full' : '',
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
    <ArrowPathIcon v-if="loading" class="w-4 h-4 animate-spin" aria-hidden="true" />
    <component :is="leadingIcon" v-if="leadingIcon && !loading" class="w-4 h-4" aria-hidden="true" />
    <slot />
    <component :is="trailingIcon" v-if="trailingIcon" class="w-4 h-4" aria-hidden="true" />
  </button>
</template>
