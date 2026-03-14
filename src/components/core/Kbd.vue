<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v)
  }
})

const sizeClasses = computed(
  () =>
    ({
      sm: 'type-agate-r px-1 py-px min-w-5',
      md: 'type-caption-r px-1.5 py-0.5 min-w-6'
    })[props.size]
)

const kbdClasses = computed(() => [
  'inline-flex items-center justify-center font-mono',
  'bg-base-subtle border border-base-dim rounded-badge shadow-panel',
  'text-base-dim',
  sizeClasses.value
])
</script>

<template>
  <kbd :class="kbdClasses"><slot /></kbd>
</template>
