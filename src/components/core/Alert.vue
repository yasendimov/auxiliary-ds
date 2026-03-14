<script setup>
import { computed } from 'vue'
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/20/solid'
import { XMarkIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (v) => ['info', 'ok', 'caution', 'warning', 'alarm'].includes(v)
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: false
  }
})

defineEmits(['dismiss'])

const variantConfig = computed(
  () =>
    ({
      alarm: {
        wrapper: 'bg-red-ui border-red-9 dark:border-reddark-9',
        icon: 'text-red-9 dark:text-reddark-9',
        title: 'text-red-dim'
      },
      warning: {
        wrapper: 'bg-orange-ui border-orange-9 dark:border-orangedark-9',
        icon: 'text-orange-9 dark:text-orangedark-9',
        title: 'text-orange-dim'
      },
      caution: {
        wrapper: 'bg-amber-ui border-amber-9 dark:border-amberdark-9',
        icon: 'text-amber-9 dark:text-amberdark-9',
        title: 'text-amber-dim'
      },
      ok: {
        wrapper: 'bg-green-ui border-green-9 dark:border-greendark-9',
        icon: 'text-green-9 dark:text-greendark-9',
        title: 'text-green-dim'
      },
      info: {
        wrapper: 'bg-indigo-ui border-indigo-9 dark:border-indigodark-9',
        icon: 'text-indigo-9 dark:text-indigodark-9',
        title: 'text-indigo-dim'
      }
    })[props.variant]
)

const iconComponent = computed(
  () =>
    ({
      alarm: ExclamationCircleIcon,
      warning: ExclamationTriangleIcon,
      caution: ExclamationTriangleIcon,
      ok: CheckCircleIcon,
      info: InformationCircleIcon
    })[props.variant]
)

const liveRole = computed(() => {
  if (props.variant === 'alarm' || props.variant === 'warning') return 'alert'
  return 'status'
})

const liveMode = computed(() => {
  if (props.variant === 'alarm' || props.variant === 'warning') return 'assertive'
  return 'polite'
})
</script>

<template>
  <div
    v-if="title || description || $slots.default"
    :role="liveRole"
    :aria-live="liveMode"
    class="flex items-start gap-3 rounded-panel border-l-4 px-4 py-3"
    :class="variantConfig.wrapper"
  >
    <component
      :is="iconComponent"
      class="size-5 flex-shrink-0 mt-0.5"
      :class="variantConfig.icon"
      aria-hidden="true"
    />

    <div class="flex-1 min-w-0">
      <p v-if="title" class="type-body-m" :class="variantConfig.title">
        {{ title }}
      </p>
      <p v-if="description" class="type-body-r text-base-normal" :class="title ? 'mt-0.5' : ''">
        {{ description }}
      </p>
      <div v-if="$slots.default" class="mt-2">
        <slot />
      </div>
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="flex-shrink-0 -mt-0.5 -mr-0.5 text-base-dim hover:text-base-normal transition-colors duration-fast ease-snap"
      aria-label="Dismiss alert"
      @click="$emit('dismiss')"
    >
      <XMarkIcon class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>
