<script setup>
import { computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'info', 'success', 'warning', 'danger'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v),
  },
  dot: {
    type: Boolean,
    default: false,
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['dismiss'])

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-surface-2 text-content-low',
    info: 'bg-action-subtle text-action-content',
    success: 'bg-ok-subtle text-ok-content',
    warning: 'bg-caution-subtle text-caution-content',
    danger: 'bg-alarm-subtle text-alarm-content',
  }
  return variants[props.variant]
})

const dotClasses = computed(() => {
  const dots = {
    default: 'bg-content-dim',
    info: 'bg-action',
    success: 'bg-ok',
    warning: 'bg-caution',
    danger: 'bg-alarm',
  }
  return dots[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
  }
  return sizes[props.size]
})

const badgeClasses = computed(() => [
  'rounded-badge font-medium inline-flex items-center gap-1.5',
  sizeClasses.value,
  variantClasses.value,
])
</script>

<template>
  <span
    v-bind="$attrs"
    :class="badgeClasses"
  >
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full" :class="dotClasses" />
    <slot />
    <button
      v-if="dismissible"
      type="button"
      class="hover:opacity-80 transition-opacity duration-fast ease-snap"
      aria-label="Dismiss"
      @click="$emit('dismiss')"
    >
      <XMarkIcon class="w-3 h-3" aria-hidden="true" />
    </button>
  </span>
</template>
