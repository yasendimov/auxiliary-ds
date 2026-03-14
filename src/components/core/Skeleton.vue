<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: (v) => ['text', 'heading', 'circle', 'rect'].includes(v)
  },
  width: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  },
  rounded: {
    type: String,
    default: null
  }
})

const variantDefaults = computed(
  () =>
    ({
      text: { w: 'w-full', h: 'h-4', r: 'rounded-badge' },
      heading: { w: 'w-3/4', h: 'h-6', r: 'rounded-badge' },
      circle: { w: 'size-10', h: '', r: 'rounded-full' },
      rect: { w: 'w-full', h: 'h-24', r: 'rounded-panel' }
    })[props.variant]
)

const skeletonClasses = computed(() => [
  'animate-pulse bg-base-subtle',
  props.width || variantDefaults.value.w,
  props.height || variantDefaults.value.h,
  props.rounded || variantDefaults.value.r
])
</script>

<template>
  <div :class="skeletonClasses" aria-hidden="true" />
</template>
