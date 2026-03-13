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

const framePaths = [
  'M5,3 L27,3 L29,5 L29,27 L27,29 L5,29 L3,27 L3,5 Z',
  'M16,3 L29,16 L16,29 L3,16 Z',
  'M10,3 L22,3 L29,10 L29,22 L22,29 L10,29 L3,22 L3,10 Z',
  null
]

function djb2(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0
  }
  return hash
}

const symbol = computed(() => {
  const h1 = djb2(props.seed)
  const h2 = djb2(props.seed + props.seed)

  const frameIndex = h1 & 3
  const colorIndex = (h1 >>> 2) % colors.length
  const fg = colors[colorIndex]
  const framePath = framePaths[frameIndex]
  const isCircle = frameIndex === 3

  const elements = []
  const sw = 1.5

  const bit = (n) => ((h2 >>> n) & 1) === 1

  if (bit(0)) {
    elements.push({ type: 'line', x1: 8, y1: 16, x2: 24, y2: 16 })
  }

  if (bit(1)) {
    elements.push(
      { type: 'line', x1: 9, y1: 12, x2: 23, y2: 12 },
      { type: 'line', x1: 9, y1: 20, x2: 23, y2: 20 }
    )
  }

  if (bit(2)) {
    elements.push(
      { type: 'line', x1: 10, y1: 20, x2: 16, y2: 12 },
      { type: 'line', x1: 16, y1: 12, x2: 22, y2: 20 }
    )
  }

  if (bit(3)) {
    elements.push(
      { type: 'line', x1: 10, y1: 12, x2: 16, y2: 20 },
      { type: 'line', x1: 16, y1: 20, x2: 22, y2: 12 }
    )
  }

  if (bit(4)) {
    elements.push({ type: 'circle', cx: 16, cy: 16, r: 2.5 })
  }

  if (bit(5)) {
    elements.push(
      { type: 'line', x1: 16, y1: 8, x2: 16, y2: 24 },
      { type: 'line', x1: 8, y1: 16, x2: 24, y2: 16 }
    )
  }

  if (elements.length === 0) {
    elements.push({ type: 'circle', cx: 16, cy: 16, r: 2.5 })
  }

  return { fg, framePath, isCircle, elements, sw }
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <!-- Frame -->
    <path
      v-if="!symbol.isCircle"
      :d="symbol.framePath"
      fill="none"
      :stroke="symbol.fg"
      :stroke-width="symbol.sw"
      stroke-linejoin="round"
    />
    <circle
      v-else
      cx="16"
      cy="16"
      r="13"
      fill="none"
      :stroke="symbol.fg"
      :stroke-width="symbol.sw"
    />

    <!-- Interior elements -->
    <template v-for="(el, i) in symbol.elements" :key="i">
      <line
        v-if="el.type === 'line'"
        :x1="el.x1"
        :y1="el.y1"
        :x2="el.x2"
        :y2="el.y2"
        :stroke="symbol.fg"
        :stroke-width="symbol.sw"
        stroke-linecap="round"
      />
      <circle
        v-else-if="el.type === 'circle'"
        :cx="el.cx"
        :cy="el.cy"
        :r="el.r"
        :fill="symbol.fg"
      />
    </template>
  </svg>
</template>
