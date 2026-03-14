<script setup>
import { ref, computed, provide, watch, nextTick } from 'vue'
import Popover from './Popover.vue'
import { dropdownKey } from './dropdownKey.js'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    default: 'bottom-start',
    validator: (v) =>
      [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end'
      ].includes(v)
  },
  offset: {
    type: Number,
    default: 4
  },
  width: {
    type: String,
    default: 'auto',
    validator: (v) => ['auto', 'trigger'].includes(v)
  }
})

const emit = defineEmits(['update:open'])

const isOpen = ref(props.open)
const menuRef = ref(null)
const items = ref([])
const activeIndex = ref(-1)

// Typeahead state
let typeaheadBuffer = ''
let typeaheadTimer = null

watch(
  () => props.open,
  (value) => {
    isOpen.value = value
  }
)

function setOpen(value) {
  isOpen.value = value
  emit('update:open', value)
  if (!value) {
    activeIndex.value = -1
  }
}

function onPopoverUpdate(value) {
  setOpen(value)
}

// Focus first item when menu opens
watch(isOpen, async (value) => {
  if (value) {
    await nextTick()
    const firstEnabled = items.value.findIndex((item) => !item.disabled)
    if (firstEnabled !== -1) {
      activeIndex.value = firstEnabled
    }
    menuRef.value?.focus()
  }
})

function registerItem(item) {
  items.value.push(item)
}

function unregisterItem(id) {
  const index = items.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    items.value.splice(index, 1)
  }
}

function selectItem(id) {
  const item = items.value.find((i) => i.id === id)
  if (item && !item.disabled) {
    item.onSelect()
    setOpen(false)
  }
}

function close() {
  setOpen(false)
}

function navigateItems(direction) {
  const enabledItems = items.value
    .map((item, index) => ({ ...item, index }))
    .filter((item) => !item.disabled)
  if (enabledItems.length === 0) return

  const currentEnabledIndex = enabledItems.findIndex((item) => item.index === activeIndex.value)

  let nextIndex
  if (direction === 'next') {
    nextIndex =
      currentEnabledIndex === -1 || currentEnabledIndex === enabledItems.length - 1
        ? 0
        : currentEnabledIndex + 1
  } else {
    nextIndex = currentEnabledIndex <= 0 ? enabledItems.length - 1 : currentEnabledIndex - 1
  }

  activeIndex.value = enabledItems[nextIndex].index
}

function onKeydown(event) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      navigateItems('next')
      break
    case 'ArrowUp':
      event.preventDefault()
      navigateItems('prev')
      break
    case 'Home':
      event.preventDefault()
      {
        const first = items.value.findIndex((item) => !item.disabled)
        if (first !== -1) activeIndex.value = first
      }
      break
    case 'End':
      event.preventDefault()
      {
        const last = items.value.findLastIndex((item) => !item.disabled)
        if (last !== -1) activeIndex.value = last
      }
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (activeIndex.value >= 0 && activeIndex.value < items.value.length) {
        selectItem(items.value[activeIndex.value].id)
      }
      break
    default:
      // Typeahead
      if (event.key.length === 1) {
        clearTimeout(typeaheadTimer)
        typeaheadBuffer += event.key.toLowerCase()
        typeaheadTimer = setTimeout(() => {
          typeaheadBuffer = ''
        }, 500)

        const match = items.value.findIndex(
          (item) => !item.disabled && item.label?.toLowerCase().startsWith(typeaheadBuffer)
        )
        if (match !== -1) {
          activeIndex.value = match
        }
      }
  }
}

const activeItemId = computed(() => {
  if (activeIndex.value >= 0 && activeIndex.value < items.value.length) {
    return items.value[activeIndex.value].id
  }
  return undefined
})

provide(dropdownKey, {
  activeIndex: computed(() => activeIndex.value),
  items,
  registerItem,
  unregisterItem,
  selectItem,
  close
})
</script>

<template>
  <Popover
    :open="isOpen"
    :placement="placement"
    :offset="offset"
    trigger="click"
    @update:open="onPopoverUpdate"
  >
    <template #trigger="{ open: popoverOpen }">
      <slot name="trigger" :open="popoverOpen" />
    </template>

    <div
      ref="menuRef"
      role="menu"
      aria-orientation="vertical"
      :aria-activedescendant="activeItemId"
      tabindex="-1"
      class="py-1 min-w-48 outline-none"
      @keydown="onKeydown"
    >
      <slot />
    </div>
  </Popover>
</template>
