<script setup>
import { computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'info', 'success', 'warning', 'danger'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v)
  },
  dot: {
    type: Boolean,
    default: false
  },
  dismissible: {
    type: Boolean,
    default: false
  }
})

defineEmits(['dismiss'])

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-base-ui text-base-dim',
    info: 'bg-indigo-ui text-indigo-dim',
    success: 'bg-green-ui text-green-dim',
    warning: 'bg-amber-ui text-amber-dim',
    danger: 'bg-red-ui text-red-dim'
  }
  return variants[props.variant]
})

const dotClasses = computed(() => {
  const dots = {
    default: 'bg-base-dim',
    info: 'bg-indigo-solid',
    success: 'bg-green-solid',
    warning: 'bg-amber-solid',
    danger: 'bg-red-solid'
  }
  return dots[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'type-agate-m px-1.5 py-0.5',
    md: 'type-agate-m px-2 py-1'
  }
  return sizes[props.size]
})

const badgeClasses = computed(() => [
  'rounded-badge inline-flex items-center gap-1.5',
  sizeClasses.value,
  variantClasses.value
])
</script>

<template>
  <span v-bind="$attrs" :class="badgeClasses">
    <span v-if="dot" class="size-1.5 rounded-full" :class="dotClasses" />
    <slot />
    <button
      v-if="dismissible"
      type="button"
      class="hover:opacity-hover transition-opacity duration-fast ease-snap"
      aria-label="Dismiss"
      @click="$emit('dismiss')"
    >
      <XMarkIcon class="size-3" aria-hidden="true" />
    </button>
  </span>
</template>
