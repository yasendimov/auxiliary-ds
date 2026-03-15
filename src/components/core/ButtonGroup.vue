<script setup>
import { computed, provide, toRef } from 'vue'
import { buttonGroupKey } from './buttonGroupKey.js'

const props = defineProps({
  size: {
    type: String,
    default: null,
    validator: (v) => v === null || ['sm', 'md', 'lg', 'xl'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: null
  }
})

provide(buttonGroupKey, {
  size: toRef(props, 'size'),
  disabled: toRef(props, 'disabled')
})

const groupClasses = computed(() => [
  'inline-flex',
  '[&>*:first-child]:rounded-r-none',
  '[&>*:last-child]:rounded-l-none',
  '[&>*:not(:first-child):not(:last-child)]:rounded-none',
  '[&>*:not(:first-child)]:-ml-px',
  '[&>*:hover]:z-10 [&>*:focus-visible]:z-10'
])
</script>

<template>
  <div role="group" :aria-label="label" :class="groupClasses">
    <slot />
  </div>
</template>
