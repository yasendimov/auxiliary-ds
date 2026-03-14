<script setup>
import { ref, computed, watch, useId, onMounted, onUnmounted, nextTick } from 'vue'
import {
  useFloating,
  offset,
  flip,
  shift,
  size as sizeMiddleware,
  autoUpdate
} from '@floating-ui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { CheckIcon } from '@heroicons/vue/20/solid'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    default: null
  },
  options: {
    type: Array,
    default: () => []
  },
  displayValue: {
    type: Function,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'error', 'success'].includes(v)
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
  emptyText: {
    type: String,
    default: 'No results found.'
  },
  leadingIcon: {
    type: [Object, Function],
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const id = useId()
const inputId = `combobox-input-${id}`
const listboxId = `combobox-listbox-${id}`

const triggerRef = ref(null)
const inputRef = ref(null)
const panelRef = ref(null)

const isOpen = ref(false)
const query = ref('')
const activeIndex = ref(-1)

// Normalize options to { value, label, disabled } shape
const normalizedOptions = computed(() =>
  props.options.map((opt) =>
    typeof opt === 'string'
      ? { value: opt, label: opt, disabled: false }
      : { value: opt.value, label: opt.label ?? String(opt.value), disabled: opt.disabled ?? false }
  )
)

// Filtered options based on query
const filteredOptions = computed(() => {
  if (!query.value) return normalizedOptions.value
  const q = query.value.toLowerCase()
  return normalizedOptions.value.filter((opt) => opt.label.toLowerCase().includes(q))
})

// Display text for the selected value
const selectedOption = computed(() =>
  normalizedOptions.value.find((opt) => opt.value === props.modelValue)
)

const displayText = computed(() => {
  if (!selectedOption.value) return ''
  if (props.displayValue) return props.displayValue(selectedOption.value)
  return selectedOption.value.label
})

// Floating UI
const { floatingStyles } = useFloating(triggerRef, panelRef, {
  placement: 'bottom-start',
  middleware: computed(() => [
    offset(4),
    flip(),
    shift({ padding: 8 }),
    sizeMiddleware({
      apply({ rects, elements }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`
        })
      }
    })
  ]),
  whileElementsMounted: autoUpdate,
  transform: false
})

// Variant / size classes (match Input)
const activeVariant = computed(() => {
  if (props.error) return 'error'
  return props.variant
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-7 px-3 type-agate-r',
    md: 'h-9 px-4 type-caption-r',
    lg: 'h-11 px-5 type-body-r'
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  if (props.disabled) {
    return 'bg-action-disabled text-action-content-disabled cursor-not-allowed opacity-disabled border border-base-dim'
  }

  const variants = {
    default:
      'bg-base-ui border border-base-normal text-base-normal placeholder:text-base-dim focus-within:border-blue-9 focus-within:dark:border-bluedark-9 focus-within:ring-1 focus-within:ring-focus-ring',
    error:
      'bg-base-ui border border-red-dim text-base-normal placeholder:text-base-dim focus-within:border-red-8 focus-within:dark:border-reddark-8 focus-within:ring-1 focus-within:ring-focus-ring-alarm',
    success:
      'bg-base-ui border border-green-dim text-base-normal placeholder:text-base-dim focus-within:border-green-8 focus-within:dark:border-greendark-8 focus-within:ring-1 focus-within:ring-focus-ring-ok'
  }
  return variants[activeVariant.value]
})

const wrapperClasses = computed(() => [
  'relative flex items-center rounded-panel transition-colors duration-fast ease-snap',
  sizeClasses.value,
  variantClasses.value,
  props.leadingIcon ? 'pl-10' : ''
])

const iconSizeOffset = computed(() => {
  const offsets = { sm: 'left-2.5', md: 'left-3', lg: 'left-4' }
  return offsets[props.size]
})

// Open / close
function open() {
  if (props.disabled || isOpen.value) return
  isOpen.value = true
  activeIndex.value = -1
  query.value = ''
}

function close() {
  if (!isOpen.value) return
  isOpen.value = false
  query.value = ''
  activeIndex.value = -1
}

function selectOption(opt) {
  if (opt.disabled) return
  emit('update:modelValue', opt.value)
  close()
  nextTick(() => inputRef.value?.focus())
}

// Input handling
function onInput(event) {
  query.value = event.target.value
  if (!isOpen.value) isOpen.value = true
  activeIndex.value = -1
}

function onFocus() {
  open()
}

// Keyboard navigation
function onKeydown(event) {
  const enabledItems = filteredOptions.value
    .map((opt, index) => ({ ...opt, index }))
    .filter((opt) => !opt.disabled)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        open()
        return
      }
      if (enabledItems.length === 0) return
      {
        const currentIdx = enabledItems.findIndex((item) => item.index === activeIndex.value)
        const next =
          currentIdx === -1 || currentIdx === enabledItems.length - 1 ? 0 : currentIdx + 1
        activeIndex.value = enabledItems[next].index
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        open()
        return
      }
      if (enabledItems.length === 0) return
      {
        const currentIdx = enabledItems.findIndex((item) => item.index === activeIndex.value)
        const prev = currentIdx <= 0 ? enabledItems.length - 1 : currentIdx - 1
        activeIndex.value = enabledItems[prev].index
      }
      break
    case 'Home':
      event.preventDefault()
      if (enabledItems.length > 0) activeIndex.value = enabledItems[0].index
      break
    case 'End':
      event.preventDefault()
      if (enabledItems.length > 0) activeIndex.value = enabledItems[enabledItems.length - 1].index
      break
    case 'Enter':
      event.preventDefault()
      if (
        isOpen.value &&
        activeIndex.value >= 0 &&
        activeIndex.value < filteredOptions.value.length
      ) {
        selectOption(filteredOptions.value[activeIndex.value])
      }
      break
    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        event.stopPropagation()
        close()
      }
      break
    case 'Tab':
      close()
      break
  }
}

// Scroll active option into view
watch(activeIndex, async (index) => {
  if (index < 0) return
  await nextTick()
  const el = panelRef.value?.querySelector(`[data-index="${index}"]`)
  el?.scrollIntoView({ block: 'nearest' })
})

// Click outside
function onDocumentClick(event) {
  if (!isOpen.value) return
  const clickedTrigger = triggerRef.value?.contains(event.target)
  const clickedPanel = panelRef.value?.contains(event.target)
  if (!clickedTrigger && !clickedPanel) close()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick, true)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick, true)
})

// Active option id for aria-activedescendant
const activeOptionId = computed(() => {
  if (activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
    return `${listboxId}-option-${activeIndex.value}`
  }
  return undefined
})
</script>

<template>
  <div>
    <label v-if="label" :for="inputId" class="type-caption-m text-base-normal mb-1 block">
      {{ label }}
    </label>

    <div ref="triggerRef" :class="wrapperClasses">
      <div
        v-if="leadingIcon"
        class="pointer-events-none absolute inset-y-0 flex items-center text-base-dim"
        :class="iconSizeOffset"
      >
        <component :is="leadingIcon" class="w-4 h-4" aria-hidden="true" />
      </div>

      <input
        v-bind="$attrs"
        :id="inputId"
        ref="inputRef"
        type="text"
        role="combobox"
        autocomplete="off"
        :value="isOpen ? query : displayText"
        :placeholder="selectedOption ? displayText : placeholder"
        :disabled="disabled"
        :aria-expanded="isOpen"
        :aria-controls="isOpen ? listboxId : undefined"
        :aria-activedescendant="activeOptionId"
        aria-autocomplete="list"
        class="flex-1 min-w-0 bg-transparent outline-none text-base-normal placeholder:text-base-dim"
        :class="disabled ? 'cursor-not-allowed' : ''"
        @input="onInput"
        @focus="onFocus"
        @keydown="onKeydown"
      />

      <button
        type="button"
        tabindex="-1"
        :disabled="disabled"
        class="shrink-0 ml-1 text-base-dim"
        :class="disabled ? 'cursor-not-allowed' : 'hover:text-base-normal'"
        aria-hidden="true"
        @click="isOpen ? close() : open()"
      >
        <ChevronDownIcon
          class="w-4 h-4 transition-transform duration-fast ease-snap"
          :class="isOpen ? 'rotate-180' : ''"
        />
      </button>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-fast ease-snap"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-fast ease-snap"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <ul
          v-if="isOpen"
          :id="listboxId"
          ref="panelRef"
          role="listbox"
          :style="floatingStyles"
          class="z-dropdown rounded-card bg-base-app border border-base-dim shadow-overlay py-1 max-h-60 overflow-auto outline-none"
        >
          <li
            v-for="(opt, index) in filteredOptions"
            :id="`${listboxId}-option-${index}`"
            :key="opt.value"
            :data-index="index"
            role="option"
            :aria-selected="opt.value === modelValue"
            :aria-disabled="opt.disabled || undefined"
            :class="[
              'flex items-center gap-2 px-3 py-2 type-caption-r transition-colors duration-instant ease-snap cursor-pointer outline-none',
              opt.disabled
                ? 'text-action-content-disabled opacity-disabled cursor-not-allowed'
                : index === activeIndex
                  ? 'bg-base-ui text-base-normal'
                  : 'text-base-normal'
            ]"
            @click="selectOption(opt)"
            @mouseenter="!opt.disabled && (activeIndex = index)"
          >
            <CheckIcon
              class="w-4 h-4 shrink-0"
              :class="opt.value === modelValue ? 'text-blue-9 dark:text-bluedark-9' : 'invisible'"
              aria-hidden="true"
            />
            <span class="flex-1 min-w-0 truncate">{{ opt.label }}</span>
          </li>

          <li v-if="filteredOptions.length === 0" class="px-3 py-2 type-caption-r text-base-dim">
            {{ emptyText }}
          </li>
        </ul>
      </Transition>
    </Teleport>

    <p v-if="error" :id="`${inputId}-error`" class="type-caption-r text-red-dim mt-1.5">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="`${inputId}-hint`" class="type-caption-r text-base-dim mt-1.5">
      {{ hint }}
    </p>
  </div>
</template>
