<script setup>
import { computed, inject } from 'vue'
import { tabsKey } from './tabsKey.js'

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const group = inject(tabsKey)

const isActive = computed(() => group.modelValue.value === props.value)
const isDisabled = computed(() => props.disabled || group.disabled.value)

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 pb-1.5 type-caption-m',
    md: 'px-4 pb-2 type-caption-m',
    lg: 'px-5 pb-3 type-body-m'
  }
  return sizes[group.size.value]
})

const tabClasses = computed(() => {
  const base =
    'relative cursor-pointer border-b-2 -mb-px transition-colors duration-fast ease-snap outline-none'

  if (isDisabled.value) {
    return [base, sizeClasses.value, 'text-action-content-disabled border-transparent cursor-not-allowed']
  }

  if (isActive.value) {
    return [
      base,
      sizeClasses.value,
      'text-base-normal border-blue-9 dark:border-bluedark-9',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring'
    ]
  }

  return [
    base,
    sizeClasses.value,
    'text-base-dim border-transparent hover:text-base-normal hover:border-base-dim',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring'
  ]
})

function onClick() {
  if (!isDisabled.value) {
    group.updateValue(props.value)
  }
}

function onKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onClick()
  }
}
</script>

<template>
  <button
    role="tab"
    :aria-selected="isActive"
    :aria-disabled="isDisabled || undefined"
    :tabindex="isDisabled ? -1 : 0"
    :class="tabClasses"
    @click="onClick"
    @keydown="onKeydown"
  >
    <slot />
  </button>
</template>
