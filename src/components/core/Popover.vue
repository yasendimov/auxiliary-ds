<script setup>
import { ref, computed, watch, useId, onMounted, onUnmounted } from 'vue'
import { useFloating, offset as offsetMiddleware, flip, shift, autoUpdate } from '@floating-ui/vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    default: 'bottom',
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
  trigger: {
    type: String,
    default: 'click',
    validator: (v) => ['click', 'hover'].includes(v)
  },
  offset: {
    type: Number,
    default: 8
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:open'])

const id = useId()
const panelId = `popover-panel-${id}`

const triggerRef = ref(null)
const panelRef = ref(null)
const isOpen = ref(props.open)

const { floatingStyles } = useFloating(triggerRef, panelRef, {
  placement: computed(() => props.placement),
  middleware: computed(() => [offsetMiddleware(props.offset), flip(), shift({ padding: 8 })]),
  whileElementsMounted: autoUpdate,
  transform: false
})

// Sync prop to internal state
watch(
  () => props.open,
  (value) => {
    isOpen.value = value
  }
)

// Sync internal state to prop
function setOpen(value) {
  isOpen.value = value
  emit('update:open', value)
}

function toggle() {
  setOpen(!isOpen.value)
}

// Click trigger handlers
function onTriggerClick() {
  if (props.trigger === 'click') {
    toggle()
  }
}

// Hover trigger handlers
let hoverTimeout = null

function onMouseEnter() {
  if (props.trigger !== 'hover') return
  clearTimeout(hoverTimeout)
  setOpen(true)
}

function onMouseLeave() {
  if (props.trigger !== 'hover') return
  hoverTimeout = setTimeout(() => {
    setOpen(false)
  }, 100)
}

// Dismiss handlers
function onDocumentClick(event) {
  if (!isOpen.value) return
  if (!props.dismissible) return

  const clickedTrigger = triggerRef.value?.contains(event.target)
  const clickedPanel = panelRef.value?.contains(event.target)

  if (!clickedTrigger && !clickedPanel) {
    setOpen(false)
  }
}

function onDocumentKeydown(event) {
  if (!isOpen.value) return
  if (!props.dismissible) return

  if (event.key === 'Escape') {
    event.stopPropagation()
    setOpen(false)
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick, true)
  document.addEventListener('keydown', onDocumentKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick, true)
  document.removeEventListener('keydown', onDocumentKeydown)
  clearTimeout(hoverTimeout)
})
</script>

<template>
  <span
    ref="triggerRef"
    class="inline-flex"
    :aria-expanded="isOpen"
    :aria-controls="isOpen ? panelId : undefined"
    @click="onTriggerClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot name="trigger" :open="isOpen" />
  </span>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-fast ease-snap"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-fast ease-snap"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :id="panelId"
        ref="panelRef"
        :style="floatingStyles"
        class="z-dropdown rounded-card bg-base-app border border-base-dim shadow-overlay"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
