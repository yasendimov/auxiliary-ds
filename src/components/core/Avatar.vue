<script setup>
import { computed, ref } from 'vue'
import { UserIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  shape: {
    type: String,
    default: 'circle',
    validator: (v) => ['circle', 'square'].includes(v)
  },
  status: {
    type: String,
    default: '',
    validator: (v) => ['', 'online', 'offline', 'busy', 'away'].includes(v)
  }
})

const imgError = ref(false)

const sizeClass = computed(() => ({
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-16'
}[props.size]))

const shapeClass = computed(() => props.shape === 'circle' ? 'rounded-full' : 'rounded')

const initialsFontClass = computed(() => ({
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}[props.size]))

const iconSizeClass = computed(() => ({
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-8'
}[props.size]))

const initials = computed(() => {
  if (!props.alt) return ''
  return props.alt
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const showImage = computed(() => props.src && !imgError.value)
const showInitials = computed(() => !showImage.value && initials.value)

const statusColorClass = computed(() => ({
  online: 'bg-ok',
  offline: 'bg-surface-3 border border-line',
  busy: 'bg-alarm',
  away: 'bg-caution'
}[props.status]))

const statusSizeClass = computed(() => {
  return ['lg', 'xl'].includes(props.size) ? 'size-3' : 'size-2.5'
})

const statusLabel = computed(() => props.status ? `Status: ${props.status}` : '')
</script>

<template>
  <div
    class="relative inline-flex shrink-0"
    :class="sizeClass"
    :role="showImage ? undefined : 'img'"
    :aria-label="showImage ? undefined : (alt || 'Avatar')"
  >
    <!-- Image -->
    <img
      v-if="showImage"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
      :class="shapeClass"
      @error="imgError = true"
    />
    <!-- Initials -->
    <span
      v-else-if="showInitials"
      class="w-full h-full flex items-center justify-center bg-surface-2 text-content-high font-medium select-none"
      :class="[shapeClass, initialsFontClass]"
    >
      {{ initials }}
    </span>
    <!-- Fallback icon -->
    <span
      v-else
      class="w-full h-full flex items-center justify-center bg-surface-2"
      :class="shapeClass"
    >
      <UserIcon class="text-content-dim" :class="iconSizeClass" />
    </span>
    <!-- Status dot -->
    <span
      v-if="status"
      class="absolute bottom-0 right-0 translate-x-0.5 translate-y-0.5 rounded-full ring-2 ring-page"
      :class="[statusSizeClass, statusColorClass]"
      :aria-label="statusLabel"
    />
  </div>
</template>
