<script setup>
import { computed, provide, toRef } from 'vue'
import { tabsKey } from './tabsKey.js'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

provide(tabsKey, {
  modelValue: computed(() => props.modelValue),
  size: toRef(props, 'size'),
  disabled: toRef(props, 'disabled'),
  updateValue(val) {
    emit('update:modelValue', val)
  }
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'gap-0.5',
    md: 'gap-1',
    lg: 'gap-1.5'
  }
  return sizes[props.size]
})
</script>

<template>
  <div role="tablist" class="flex border-b border-base-dim" :class="sizeClasses">
    <slot />
  </div>
</template>
