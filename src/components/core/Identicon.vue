<script setup>
import { computed } from 'vue'

const props = defineProps({
  seed: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 40
  }
})

const colors = [
  'var(--cyan-9)',
  'var(--teal-9)',
  'var(--indigo-9)',
  'var(--violet-9)',
  'var(--crimson-9)',
  'var(--orange-9)',
  'var(--jade-9)',
  'var(--plum-9)'
]

function djb2(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0
  }
  return hash
}

const pattern = computed(() => {
  const hash = djb2(props.seed)
  const hash2 = djb2(props.seed + props.seed)
  const fg = colors[hash % colors.length]
  const cellSize = props.size / 5
  const rects = []

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      const bit = (row * 3 + col)
      const on = ((hash2 >>> bit) & 1) === 1
      if (on) {
        rects.push({ x: col * cellSize, y: row * cellSize, w: cellSize, h: cellSize })
        if (col < 2) {
          rects.push({ x: (4 - col) * cellSize, y: row * cellSize, w: cellSize, h: cellSize })
        }
      }
    }
  }

  return { fg, rects }
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      v-for="(rect, i) in pattern.rects"
      :key="i"
      :x="rect.x"
      :y="rect.y"
      :width="rect.w"
      :height="rect.h"
      :fill="pattern.fg"
    />
  </svg>
</template>
