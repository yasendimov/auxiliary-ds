<script setup>
import { computed } from 'vue'

const props = defineProps({
  number: {
    type: [Number, String],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cols: {
    type: Number,
    default: 0
  },
  last: {
    type: Boolean,
    default: false
  }
})

const formattedNumber = computed(() => String(props.number).padStart(2, '0'))

const gridCols = computed(() => {
  const map = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5'
  }
  return map[props.cols] || 'grid-cols-1'
})
</script>

<template>
  <section class="px-8 lg:px-16 mt-24" :class="last ? 'pb-24' : ''">
    <p class="type-overline text-base-dim mb-12">
      <span class="font-mono">{{ formattedNumber }}</span> — {{ title }}
    </p>
    <div v-if="cols > 0" class="grid border-t border-l border-base-dim" :class="gridCols">
      <slot />
    </div>
    <slot v-else />
  </section>
</template>
