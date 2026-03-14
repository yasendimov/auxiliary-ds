<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  span: {
    type: Number,
    default: 1
  }
})

const spanClass = computed(() => {
  if (props.span <= 1) return ''
  return `col-span-${props.span}`
})
</script>

<template>
  <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3" :class="spanClass">
    <span v-if="label" class="type-overline text-base-dim">{{ label }}</span>
    <div>
      <slot />
    </div>
  </div>
</template>
