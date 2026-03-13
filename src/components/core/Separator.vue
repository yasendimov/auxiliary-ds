<script setup>
import { computed } from 'vue'

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (v) => ['horizontal', 'vertical'].includes(v)
  },
  label: {
    type: String,
    default: ''
  },
  spacing: {
    type: String,
    default: 'md',
    validator: (v) => ['none', 'sm', 'md', 'lg'].includes(v)
  }
})

const isVertical = computed(() => props.orientation === 'vertical')
const hasLabel = computed(() => !isVertical.value && props.label)

const spacingClass = computed(() => {
  if (props.spacing === 'none') return ''
  const map = isVertical.value
    ? { sm: 'mx-2', md: 'mx-4', lg: 'mx-8' }
    : { sm: 'my-2', md: 'my-4', lg: 'my-8' }
  return map[props.spacing]
})
</script>

<template>
  <!-- Vertical -->
  <div
    v-if="isVertical"
    role="separator"
    aria-orientation="vertical"
    aria-hidden="true"
    :class="[spacingClass, 'border-l border-line self-stretch min-h-4']"
  />

  <!-- Horizontal with label -->
  <div
    v-else-if="hasLabel"
    role="separator"
    aria-orientation="horizontal"
    :aria-label="label"
    :class="[spacingClass, 'flex items-center gap-3']"
  >
    <div class="flex-1 border-t border-line" />
    <span class="type-caption-r text-content-dim whitespace-nowrap">{{ label }}</span>
    <div class="flex-1 border-t border-line" />
  </div>

  <!-- Horizontal, no label -->
  <div
    v-else
    role="separator"
    aria-orientation="horizontal"
    aria-hidden="true"
    :class="spacingClass"
  >
    <div class="border-t border-line w-full" />
  </div>
</template>
