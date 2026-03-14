<script setup>
import { computed, ref } from 'vue'
import { UserIcon } from '@heroicons/vue/20/solid'
import Identicon from './Identicon.vue'

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

const sizeClass = computed(
  () =>
    ({
      xs: 'size-6',
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-12',
      xl: 'size-16'
    })[props.size]
)

const sizePx = computed(
  () =>
    ({
      xs: 24,
      sm: 32,
      md: 40,
      lg: 48,
      xl: 64
    })[props.size]
)

const shapeClass = computed(() => (props.shape === 'circle' ? 'rounded-full' : 'rounded-card'))

const iconSizeClass = computed(
  () =>
    ({
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8'
    })[props.size]
)

const showImage = computed(() => props.src && !imgError.value)
const showIdenticon = computed(() => !showImage.value && props.alt)

const statusColorClass = computed(
  () =>
    ({
      online: 'bg-green-solid',
      offline: 'bg-base-ui border border-base-dim',
      busy: 'bg-red-solid',
      away: 'bg-amber-solid'
    })[props.status]
)

const statusSizeClass = computed(() => {
  return ['lg', 'xl'].includes(props.size) ? 'size-3' : 'size-2.5'
})

const statusLabel = computed(() => (props.status ? `Status: ${props.status}` : ''))
</script>

<template>
  <div
    class="relative inline-flex shrink-0"
    :class="sizeClass"
    :role="showImage ? undefined : 'img'"
    :aria-label="showImage ? undefined : alt || 'Avatar'"
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
    <!-- Identicon -->
    <span
      v-else-if="showIdenticon"
      class="w-full h-full flex items-center justify-center bg-base-ui overflow-hidden"
      :class="shapeClass"
    >
      <Identicon :seed="alt" :size="sizePx" />
    </span>
    <!-- Fallback icon -->
    <span
      v-else
      class="w-full h-full flex items-center justify-center bg-base-ui"
      :class="shapeClass"
    >
      <UserIcon class="text-base-dim" :class="iconSizeClass" />
    </span>
    <!-- Status dot -->
    <span
      v-if="status"
      class="absolute bottom-0 right-0 translate-x-0.5 translate-y-0.5 rounded-full ring-2 ring-base-app"
      :class="[statusSizeClass, statusColorClass]"
      :aria-label="statusLabel"
    />
  </div>
</template>
