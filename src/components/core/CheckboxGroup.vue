<script setup>
import { computed, provide, toRef, useId } from 'vue'
import { checkboxGroupKey } from './checkboxGroupKey.js'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: null
  },
  hint: {
    type: String,
    default: null
  },
  error: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  orientation: {
    type: String,
    default: 'vertical',
    validator: (v) => ['vertical', 'horizontal'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue'])

const labelId = useId()

const groupDescribedBy = computed(() => {
  if (props.error) return `${labelId}-error`
  if (props.hint) return `${labelId}-hint`
  return undefined
})

provide(checkboxGroupKey, {
  groupModelValue: computed(() => props.modelValue),
  toggleValue(val) {
    if (props.modelValue.includes(val)) {
      emit(
        'update:modelValue',
        props.modelValue.filter((v) => v !== val)
      )
    } else {
      emit('update:modelValue', [...props.modelValue, val])
    }
  },
  error: toRef(props, 'error'),
  disabled: toRef(props, 'disabled'),
  size: toRef(props, 'size')
})
</script>

<template>
  <div
    role="group"
    :aria-labelledby="label ? labelId : undefined"
    :aria-describedby="groupDescribedBy"
  >
    <p v-if="label" :id="labelId" class="type-overline text-base-dim mb-3">
      {{ label }}
    </p>
    <div :class="orientation === 'horizontal' ? 'flex gap-6' : 'flex flex-col gap-2'">
      <slot />
    </div>
    <p v-if="error" :id="`${labelId}-error`" class="type-caption-r text-red-dim mt-2">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="`${labelId}-hint`" class="type-caption-r text-base-dim mt-2">
      {{ hint }}
    </p>
  </div>
</template>
