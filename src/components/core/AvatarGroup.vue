<script setup>
import { computed } from 'vue'
import Avatar from './Avatar.vue'

const props = defineProps({
  avatars: {
    type: Array,
    default: () => []
  },
  max: {
    type: Number,
    default: 5
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  spacing: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v)
  }
})

const visibleAvatars = computed(() => props.avatars.slice(0, props.max))
const overflowCount = computed(() => Math.max(0, props.avatars.length - props.max))

const spacingClass = computed(
  () =>
    ({
      sm: '-space-x-3',
      md: '-space-x-2'
    })[props.spacing]
)

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

const overflowFontClass = computed(
  () =>
    ({
      xs: 'type-agate-m',
      sm: 'type-agate-m',
      md: 'type-caption-m',
      lg: 'type-body-m',
      xl: 'type-intro-m'
    })[props.size]
)
</script>

<template>
  <div class="flex items-center" :class="spacingClass">
    <div
      v-for="(avatar, i) in visibleAvatars"
      :key="i"
      class="ring-2 ring-base-app"
      :class="avatar.shape === 'square' ? 'rounded-card' : 'rounded-full'"
    >
      <Avatar v-bind="avatar" :size="size" />
    </div>
    <div
      v-if="overflowCount > 0"
      class="ring-2 ring-base-app rounded-full flex items-center justify-center bg-base-ui text-base-dim select-none"
      :class="[sizeClass, overflowFontClass]"
    >
      +{{ overflowCount }}
    </div>
  </div>
</template>
