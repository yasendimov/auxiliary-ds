<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: null
  },
  to: {
    type: [String, Object],
    default: null
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'subtle'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  external: {
    type: Boolean,
    default: false
  }
})

const isExternal = computed(() => {
  if (props.external) return true
  if (props.href && /^https?:\/\//.test(props.href)) return true
  return false
})

const componentTag = computed(() => {
  if (props.disabled) return 'span'
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'span'
})

const linkProps = computed(() => {
  if (props.disabled) return {}
  if (props.to) return { to: props.to }
  if (props.href) {
    const attrs = { href: props.href }
    if (isExternal.value) {
      attrs.target = '_blank'
      attrs.rel = 'noopener noreferrer'
    }
    return attrs
  }
  return {}
})

const linkClasses = computed(() => {
  const base =
    'inline-flex items-center gap-1 transition-colors duration-fast ease-snap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded-sm'

  if (props.disabled) {
    return [
      base,
      'opacity-disabled cursor-not-allowed pointer-events-none text-action-content-disabled'
    ]
  }

  const variants = {
    default: 'text-blue-9 dark:text-bluedark-9 hover:underline',
    subtle: 'text-base-dim hover:text-base-normal hover:underline'
  }

  return [base, variants[props.variant]]
})
</script>

<template>
  <component :is="componentTag" v-bind="linkProps" :class="linkClasses">
    <slot />
    <span v-if="isExternal && !disabled" class="sr-only">(opens in new tab)</span>
  </component>
</template>
