<script setup>
import { computed, provide, useId } from 'vue'
import { formFieldKey } from './formFieldKey.js'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: null
  },
  error: {
    type: String,
    default: null
  },
  required: {
    type: Boolean,
    default: false
  }
})

const id = useId()
const fieldId = `field-${id}`
const errorId = `${fieldId}-error`
const hintId = `${fieldId}-hint`

const hasError = computed(() => !!props.error)
const describedBy = computed(() => {
  if (props.error) return errorId
  if (props.hint) return hintId
  return undefined
})

provide(formFieldKey, {
  fieldId,
  errorId,
  hintId,
  hasError,
  describedBy
})
</script>

<template>
  <div>
    <label :for="fieldId" class="type-caption-m text-base-normal mb-1.5 block">
      {{ label }}
      <span v-if="required" class="text-red-dim ml-0.5">*</span>
    </label>

    <slot :id="fieldId" :error="hasError" :described-by="describedBy" />

    <p v-if="error" :id="errorId" class="type-caption-r text-red-dim mt-1.5">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="hintId" class="type-caption-r text-base-dim mt-1.5">
      {{ hint }}
    </p>
  </div>
</template>
