<script setup>
import { ref, watch, onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:open', 'close'])

const dialogRef = ref(null)

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl'
}

function show() {
  dialogRef.value?.showModal()
}

function hide() {
  dialogRef.value?.close()
}

function close() {
  emit('update:open', false)
  emit('close')
}

function onCancel(event) {
  if (!props.dismissible) {
    event.preventDefault()
    return
  }
  close()
}

function onBackdropClick(event) {
  if (!props.dismissible) return
  if (event.target === dialogRef.value) {
    close()
  }
}

watch(
  () => props.open,
  (value) => {
    if (value) {
      show()
    } else {
      hide()
    }
  }
)

onMounted(() => {
  if (props.open) {
    show()
  }
})
</script>

<template>
  <dialog
    ref="dialogRef"
    class="m-auto w-full rounded-card bg-base-app text-base-normal shadow-overlay backdrop:bg-black/50 backdrop:backdrop-blur-sm p-0 open:flex open:flex-col"
    :class="sizeClasses[size]"
    @cancel="onCancel"
    @click="onBackdropClick"
  >
    <div class="p-6" @click.stop>
      <!-- Header -->
      <div v-if="title || dismissible" class="flex items-start gap-4 mb-4">
        <div v-if="title" class="flex-1 min-w-0">
          <h2 class="type-section-sb text-base-normal">{{ title }}</h2>
          <p v-if="description" class="type-caption-r text-base-dim mt-1">
            {{ description }}
          </p>
        </div>
        <button
          v-if="dismissible"
          class="shrink-0 rounded-panel p-1 text-base-dim hover:text-base-normal hover:bg-base-ui transition-colors duration-fast ease-snap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          aria-label="Close dialog"
          @click="close"
        >
          <XMarkIcon class="size-5" aria-hidden="true" />
        </button>
      </div>

      <!-- Body -->
      <slot />

      <!-- Footer -->
      <div v-if="$slots.footer" class="mt-6 flex items-center justify-end gap-3">
        <slot name="footer" />
      </div>
    </div>
  </dialog>
</template>
