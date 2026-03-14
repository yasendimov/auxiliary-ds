<script setup>
import { computed, ref, watch, nextTick, useId } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
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
  rows: {
    type: Number,
    default: 4
  },
  maxlength: {
    type: Number,
    default: undefined
  },
  showCount: {
    type: Boolean,
    default: false
  },
  resize: {
    type: String,
    default: 'vertical',
    validator: (v) => ['none', 'vertical', 'auto'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue'])

const inputId = useId()
const textareaRef = ref(null)

const variantClasses = computed(() => {
  if (props.disabled) {
    return 'bg-base-ui border border-base-dim text-base-normal opacity-disabled cursor-not-allowed'
  }

  if (props.error) {
    return 'bg-base-ui border border-red-dim text-base-normal placeholder:text-base-dim focus-visible:border-red-8 focus-visible:dark:border-reddark-8 focus-visible:ring-1 focus-visible:ring-focus-ring-alarm'
  }

  return 'bg-base-ui border border-base-normal text-base-normal placeholder:text-base-dim focus-visible:border-blue-9 focus-visible:dark:border-bluedark-9 focus-visible:ring-1 focus-visible:ring-focus-ring'
})

const resizeClass = computed(() => {
  if (props.resize === 'none' || props.resize === 'auto') return 'resize-none'
  return 'resize-y'
})

const textareaClasses = computed(() => [
  'w-full rounded-panel px-3 py-2 type-body-r outline-none transition-colors duration-fast ease-snap',
  variantClasses.value,
  resizeClass.value
])

const showFooter = computed(
  () => props.error || props.hint || (props.showCount && props.maxlength !== undefined)
)

function onInput(event) {
  emit('update:modelValue', event.target.value)
}

function adjustHeight() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

watch(
  () => props.modelValue,
  () => {
    if (props.resize === 'auto') {
      nextTick(adjustHeight)
    }
  }
)
</script>

<template>
  <div>
    <label v-if="label" :for="inputId" class="type-caption-m text-base-normal mb-1 block">
      {{ label }}
    </label>

    <textarea
      :id="inputId"
      ref="textareaRef"
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      :class="textareaClasses"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
      @input="onInput"
    />

    <div v-if="showFooter" class="flex justify-between mt-1.5">
      <p v-if="error" :id="`${inputId}-error`" class="type-caption-r text-red-dim">
        {{ error }}
      </p>
      <p v-else-if="hint" :id="`${inputId}-hint`" class="type-caption-r text-base-dim">
        {{ hint }}
      </p>
      <span v-else />
      <span
        v-if="showCount && maxlength !== undefined"
        class="type-caption-r text-base-dim tabular-nums"
      >
        {{ modelValue.length }} / {{ maxlength }}
      </span>
    </div>
  </div>
</template>
