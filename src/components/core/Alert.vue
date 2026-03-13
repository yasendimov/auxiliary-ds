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
        wrapper: 'bg-alarm-subtle border-alarm',
        icon: 'text-alarm',
        title: 'text-alarm-content'
      },
      warning: {
        wrapper: 'bg-warning-subtle border-warning',
        icon: 'text-warning',
        title: 'text-warning-content'
      },
      caution: {
        wrapper: 'bg-caution-subtle border-caution',
        icon: 'text-caution',
        title: 'text-caution-content'
      },
      ok: {
        wrapper: 'bg-ok-subtle border-ok',
        icon: 'text-ok',
        title: 'text-ok-content'
      },
      info: {
        wrapper: 'bg-info-subtle border-info',
        icon: 'text-info',
        title: 'text-info-content'
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
      <p v-if="description" class="type-body-r text-content-high" :class="title ? 'mt-0.5' : ''">
        {{ description }}
      </p>
      <div v-if="$slots.default" class="mt-2">
        <slot />
      </div>
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="flex-shrink-0 -mt-0.5 -mr-0.5 text-content-dim hover:text-content-high transition-colors duration-fast ease-snap"
      aria-label="Dismiss alert"
      @click="$emit('dismiss')"
    >
      <XMarkIcon class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>
