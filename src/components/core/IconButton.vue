<script setup>
import { computed, inject } from 'vue'
import Spinner from './Spinner.vue'
import { buttonGroupKey } from './buttonGroupKey.js'
import { useButtonVariants } from './useButtonVariants.js'

const props = defineProps({
  variant: {
    type: String,
    default: 'solid',
    validator: (v) => ['solid', 'soft', 'surface', 'outline', 'ghost'].includes(v)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (v) => ['blue', 'red'].includes(v)
  },
  size: {
    type: String,
    default: null,
    validator: (v) => v === null || ['sm', 'md', 'lg', 'xl'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const group = inject(buttonGroupKey, null)
const resolvedSize = computed(() => props.size || group?.size?.value || 'md')
const isDisabled = computed(
  () => props.disabled || props.loading || group?.disabled?.value || false
)

const { variantClasses } = useButtonVariants(props, { isDisabled })

const sizeClasses = computed(
  () =>
    ({
      sm: 'size-8',
      md: 'size-9',
      lg: 'size-10',
      xl: 'size-12'
    })[resolvedSize.value]
)

const buttonClasses = computed(() => [
  'rounded-instrument inline-flex items-center justify-center transition-colors duration-instant ease-snap',
  '[&>[data-slot=icon]]:size-4 [&>[data-slot=icon]]:shrink-0',
  sizeClasses.value,
  variantClasses.value
])

function onClick(event) {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    :class="buttonClasses"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    :disabled="isDisabled"
    @click="onClick"
  >
    <Spinner v-if="loading" size="sm" variant="current" />
    <slot v-else />
  </button>
</template>
