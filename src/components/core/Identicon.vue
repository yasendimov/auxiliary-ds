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
  },
  variant: {
    type: String,
    default: '',
    validator: (v) => v === '' || ['shield', 'circle', 'diamond', 'pentagon', 'chevron'].includes(v)
  }
})

const colorScales = [
  { name: 'cyan', step9: 'var(--color-cyan-9)', step3: 'var(--color-cyan-3)' },
  { name: 'teal', step9: 'var(--color-teal-9)', step3: 'var(--color-teal-3)' },
  { name: 'indigo', step9: 'var(--color-indigo-9)', step3: 'var(--color-indigo-3)' },
  { name: 'violet', step9: 'var(--color-violet-9)', step3: 'var(--color-violet-3)' },
  { name: 'iris', step9: 'var(--color-iris-9)', step3: 'var(--color-iris-3)' },
  { name: 'purple', step9: 'var(--color-purple-9)', step3: 'var(--color-purple-3)' },
  { name: 'crimson', step9: 'var(--color-crimson-9)', step3: 'var(--color-crimson-3)' },
  { name: 'plum', step9: 'var(--color-plum-9)', step3: 'var(--color-plum-3)' },
  { name: 'jade', step9: 'var(--color-jade-9)', step3: 'var(--color-jade-3)' },
  { name: 'blue', step9: 'var(--color-blue-9)', step3: 'var(--color-blue-3)' }
]

const frameNames = ['shield', 'circle', 'diamond', 'pentagon', 'chevron']

const framePaths = {
  shield: 'M 8,6 L 56,6 L 56,32 Q 56,52 32,60 Q 8,52 8,32 Z',
  diamond: 'M 32,4 L 60,32 L 32,60 L 4,32 Z',
  pentagon: 'M 13,10 L 51,10 L 60,36 L 32,58 L 4,36 Z',
  chevron: 'M 6,8 L 32,4 L 58,8 L 54,40 L 32,58 L 10,40 Z'
}

function djb2(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0
  }
  return hash
}

function starPath(cx, cy, outerR, innerR, points) {
  const pts = []
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI / points) * i - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return `M ${pts.join(' L ')} Z`
}

const identicon = computed(() => {
  const h1 = djb2(props.seed)
  const h2 = djb2(props.seed + props.seed)
  const h3 = djb2(props.seed + '!')
  const h4 = djb2(props.seed + '#')

  // Frame
  let frameIndex
  if (props.variant && frameNames.includes(props.variant)) {
    frameIndex = frameNames.indexOf(props.variant)
  } else {
    frameIndex = (h1 & 0x7) % 5
  }
  const frameName = frameNames[frameIndex]
  const isCircle = frameName === 'circle'
  const framePathD = isCircle ? null : framePaths[frameName]

  // Color
  const colorIndex = ((h1 >>> 3) & 0xf) % colorScales.length
  const color = colorScales[colorIndex]

  // Central device (0-6)
  const deviceIndex = (h2 & 0x7) % 7

  // Decorative elements
  const decoIndex1 = (h3 & 0x7) % 6
  const decoIndex2 = (h3 >>> 3) & 0x3

  // Stars, fill, border
  const starCount = (h4 & 0x3) + 1
  const starArc = ((h4 >>> 2) & 0x1) === 1
  const hasFill = ((h4 >>> 3) & 0x1) === 1
  const hasDoubleBorder = ((h4 >>> 4) & 0x1) === 1

  // Scale down devices inside diamond frames
  const deviceScale = frameName === 'diamond' ? 0.85 : 1.0

  // Build device elements
  const device = buildDevice(deviceIndex)

  // Build decorations
  const decorations = buildDecorations(decoIndex1, decoIndex2, starCount, starArc)

  // ClipPath ID unique per component instance
  const clipId = `clip-${djb2(props.seed + 'clip') & 0xffff}`

  return {
    framePathD,
    isCircle,
    frameName,
    color,
    device,
    decorations,
    hasFill,
    hasDoubleBorder,
    deviceScale,
    clipId
  }
})

function buildDevice(index) {
  const devices = [
    // 0: Signal/Radio waves
    [
      { type: 'circle', cx: 32, cy: 38, r: 2, filled: true },
      { type: 'path', d: 'M 26,34 A 8,8 0 0,1 38,34', filled: false, sw: 1.5 },
      { type: 'path', d: 'M 22,30 A 14,14 0 0,1 42,30', filled: false, sw: 1.5 },
      { type: 'path', d: 'M 18,26 A 20,20 0 0,1 46,26', filled: false, sw: 1.5 }
    ],
    // 1: Crosshairs
    [
      { type: 'circle', cx: 32, cy: 32, r: 8, filled: false, sw: 1.5 },
      { type: 'line', x1: 32, y1: 18, x2: 32, y2: 24 },
      { type: 'line', x1: 32, y1: 40, x2: 32, y2: 46 },
      { type: 'line', x1: 18, y1: 32, x2: 24, y2: 32 },
      { type: 'line', x1: 40, y1: 32, x2: 46, y2: 32 }
    ],
    // 2: Arrow/Spearhead
    [
      { type: 'path', d: 'M 32,18 L 42,34 L 36,32 L 36,46 L 28,46 L 28,32 L 22,34 Z', filled: true }
    ],
    // 3: Wings
    [
      { type: 'path', d: 'M 32,32 Q 22,24 14,28 Q 18,20 32,22', filled: true },
      { type: 'path', d: 'M 32,32 Q 42,24 50,28 Q 46,20 32,22', filled: true },
      { type: 'circle', cx: 32, cy: 32, r: 2.5, filled: true }
    ],
    // 4: Star (5-pointed)
    [{ type: 'path', d: starPath(32, 32, 12, 5, 5), filled: true }],
    // 5: Anchor
    [
      { type: 'line', x1: 32, y1: 20, x2: 32, y2: 44, sw: 2 },
      { type: 'path', d: 'M 22,42 Q 22,48 32,46 Q 42,48 42,42', filled: false, sw: 2 },
      { type: 'circle', cx: 32, cy: 18, r: 3, filled: false, sw: 1.5 },
      { type: 'line', x1: 26, y1: 24, x2: 38, y2: 24, sw: 2 }
    ],
    // 6: Lightning bolt
    [{ type: 'path', d: 'M 34,16 L 26,34 L 32,34 L 28,48 L 40,30 L 34,30 Z', filled: true }]
  ]
  return devices[index]
}

function buildDecorations(decoIndex1, decoIndex2, starCount, starArc) {
  const elements = []

  // Primary decoration
  if (decoIndex1 === 0 || decoIndex1 === 1) {
    // Horizontal bars
    elements.push(
      { type: 'line', x1: 14, y1: 14, x2: 50, y2: 14, sw: 1, opacity: 0.4 },
      { type: 'line', x1: 14, y1: 50, x2: 50, y2: 50, sw: 1, opacity: 0.4 }
    )
  } else if (decoIndex1 === 2 || decoIndex1 === 3) {
    // Laurel branches
    elements.push(
      { type: 'path', d: 'M 16,46 Q 12,32 18,20', filled: false, sw: 1.2, opacity: 0.5 },
      { type: 'path', d: 'M 48,46 Q 52,32 46,20', filled: false, sw: 1.2, opacity: 0.5 },
      // Leaf ticks left
      { type: 'line', x1: 15, y1: 38, x2: 18, y2: 36, sw: 1, opacity: 0.4 },
      { type: 'line', x1: 14, y1: 32, x2: 17, y2: 30, sw: 1, opacity: 0.4 },
      { type: 'line', x1: 15, y1: 26, x2: 18, y2: 24, sw: 1, opacity: 0.4 },
      // Leaf ticks right
      { type: 'line', x1: 49, y1: 38, x2: 46, y2: 36, sw: 1, opacity: 0.4 },
      { type: 'line', x1: 50, y1: 32, x2: 47, y2: 30, sw: 1, opacity: 0.4 },
      { type: 'line', x1: 49, y1: 26, x2: 46, y2: 24, sw: 1, opacity: 0.4 }
    )
  } else if (decoIndex1 === 4 || decoIndex1 === 5) {
    // Chevron stripes at bottom
    elements.push(
      { type: 'path', d: 'M 18,50 L 32,56 L 46,50', filled: false, sw: 1.5, opacity: 0.6 },
      { type: 'path', d: 'M 18,46 L 32,52 L 46,46', filled: false, sw: 1.5, opacity: 0.6 }
    )
  }

  // Secondary decoration: small stars
  if (decoIndex2 === 0 || decoIndex2 === 1) {
    const positions = getStarPositions(starCount, starArc)
    for (const pos of positions) {
      elements.push({
        type: 'path',
        d: starPath(pos.cx, pos.cy, 2.5, 1, 5),
        filled: true,
        opacity: 0.7
      })
    }
  }

  return elements
}

function getStarPositions(count, arc) {
  const positions = []
  if (arc) {
    // Arc arrangement above center
    const startX = 32 - (count - 1) * 5
    for (let i = 0; i < count; i++) {
      const x = startX + i * 10
      const yOffset = Math.abs(i - (count - 1) / 2) * 1.5
      positions.push({ cx: x, cy: 14 + yOffset })
    }
  } else {
    // Horizontal row below device
    const startX = 32 - (count - 1) * 5
    for (let i = 0; i < count; i++) {
      positions.push({ cx: startX + i * 10, cy: 50 })
    }
  }
  return positions
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <clipPath :id="identicon.clipId">
        <path v-if="!identicon.isCircle" :d="identicon.framePathD" />
        <circle v-else cx="32" cy="32" r="28" />
      </clipPath>
    </defs>

    <!-- Subtle fill -->
    <path
      v-if="identicon.hasFill && !identicon.isCircle"
      :d="identicon.framePathD"
      :fill="identicon.color.step3"
      fill-opacity="0.15"
      stroke="none"
    />
    <circle
      v-if="identicon.hasFill && identicon.isCircle"
      cx="32"
      cy="32"
      r="28"
      :fill="identicon.color.step3"
      fill-opacity="0.15"
      stroke="none"
    />

    <!-- Frame stroke -->
    <path
      v-if="!identicon.isCircle"
      :d="identicon.framePathD"
      fill="none"
      :stroke="identicon.color.step9"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <circle
      v-else
      cx="32"
      cy="32"
      r="28"
      fill="none"
      :stroke="identicon.color.step9"
      stroke-width="1.5"
    />

    <!-- Double border (inset) -->
    <g v-if="identicon.hasDoubleBorder" transform="translate(32,32) scale(0.88) translate(-32,-32)">
      <path
        v-if="!identicon.isCircle"
        :d="identicon.framePathD"
        fill="none"
        :stroke="identicon.color.step9"
        stroke-width="0.75"
        stroke-linejoin="round"
        opacity="0.5"
      />
      <circle
        v-else
        cx="32"
        cy="32"
        r="28"
        fill="none"
        :stroke="identicon.color.step9"
        stroke-width="0.75"
        opacity="0.5"
      />
    </g>

    <!-- Clipped interior content -->
    <g :clip-path="`url(#${identicon.clipId})`">
      <!-- Decorations -->
      <template v-for="(el, i) in identicon.decorations" :key="'d' + i">
        <line
          v-if="el.type === 'line'"
          :x1="el.x1"
          :y1="el.y1"
          :x2="el.x2"
          :y2="el.y2"
          :stroke="identicon.color.step9"
          :stroke-width="el.sw || 1.5"
          stroke-linecap="round"
          :opacity="el.opacity || 1"
        />
        <path
          v-else-if="el.type === 'path'"
          :d="el.d"
          :fill="el.filled ? identicon.color.step9 : 'none'"
          :stroke="el.filled ? 'none' : identicon.color.step9"
          :stroke-width="el.sw || 1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          :opacity="el.opacity || 1"
        />
      </template>

      <!-- Central device -->
      <g
        :transform="
          identicon.deviceScale !== 1
            ? `translate(32,32) scale(${identicon.deviceScale}) translate(-32,-32)`
            : undefined
        "
      >
        <template v-for="(el, i) in identicon.device" :key="'e' + i">
          <line
            v-if="el.type === 'line'"
            :x1="el.x1"
            :y1="el.y1"
            :x2="el.x2"
            :y2="el.y2"
            :stroke="identicon.color.step9"
            :stroke-width="el.sw || 1.5"
            stroke-linecap="round"
          />
          <circle
            v-else-if="el.type === 'circle'"
            :cx="el.cx"
            :cy="el.cy"
            :r="el.r"
            :fill="el.filled ? identicon.color.step9 : 'none'"
            :stroke="el.filled ? 'none' : identicon.color.step9"
            :stroke-width="el.sw || 1.5"
          />
          <path
            v-else-if="el.type === 'path'"
            :d="el.d"
            :fill="el.filled ? identicon.color.step9 : 'none'"
            :stroke="el.filled ? 'none' : identicon.color.step9"
            :stroke-width="el.sw || 1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </template>
      </g>
    </g>
  </svg>
</template>
