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
    type: [String, Number],
    default: null,
    validator: (v) => v === null || [1, 2, 3, 4, '1', '2', '3', '4'].includes(v)
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
const resolvedSize = computed(() => String(props.size || group?.size?.value || '2'))
const isDisabled = computed(
  () => props.disabled || props.loading || group?.disabled?.value || false
)

const { variantClasses } = useButtonVariants(props, { isDisabled })

const sizeClasses = computed(
  () =>
    ({
      1: 'size-7',
      2: 'size-8',
      3: 'size-9',
      4: 'size-11'
    })[resolvedSize.value]
)

const buttonClasses = computed(() => [
  'rounded-panel inline-flex items-center justify-center transition-colors duration-fast ease-snap',
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
