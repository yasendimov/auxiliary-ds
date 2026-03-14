<script setup>
import { ref, computed, onUnmounted } from 'vue'
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow as arrowMiddleware,
  autoUpdate
} from '@floating-ui/vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'top',
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
  delay: {
    type: Number,
    default: 500
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const triggerRef = ref(null)
const floatingRef = ref(null)
const arrowRef = ref(null)
const isOpen = ref(false)

const {
  floatingStyles,
  middlewareData,
  placement: resolvedPlacement
} = useFloating(triggerRef, floatingRef, {
  placement: computed(() => props.placement),
  middleware: computed(() => [
    offset(6),
    flip(),
    shift({ padding: 8 }),
    arrowMiddleware({ element: arrowRef })
  ]),
  whileElementsMounted: autoUpdate,
  transform: false
})

const arrowStyles = computed(() => {
  const data = middlewareData.value?.arrow
  if (!data) return {}

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[resolvedPlacement.value.split('-')[0]]

  return {
    position: 'absolute',
    left: data.x != null ? `${data.x}px` : '',
    top: data.y != null ? `${data.y}px` : '',
    [staticSide]: '-3px'
  }
})

let showTimeout = null

function show() {
  if (props.disabled || !props.content) return
  showTimeout = setTimeout(() => {
    isOpen.value = true
  }, props.delay)
}

function hide() {
  clearTimeout(showTimeout)
  isOpen.value = false
}

onUnmounted(() => {
  clearTimeout(showTimeout)
})
</script>

<template>
  <span
    ref="triggerRef"
    class="inline-flex"
    :aria-describedby="isOpen ? `tooltip-${$.uid}` : undefined"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
  </span>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-instant ease-snap"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-instant ease-snap"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        :id="`tooltip-${$.uid}`"
        ref="floatingRef"
        role="tooltip"
        :style="floatingStyles"
        class="z-tooltip rounded-md px-2.5 py-1.5 type-caption-r bg-base-12 text-base-1 dark:bg-basedark-3 dark:text-basedark-12 shadow-overlay pointer-events-none"
      >
        {{ content }}
        <div
          ref="arrowRef"
          :style="arrowStyles"
          class="size-2 rotate-45 bg-base-12 dark:bg-basedark-3"
        />
      </div>
    </Transition>
  </Teleport>
</template>
