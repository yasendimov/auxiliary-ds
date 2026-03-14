import { ref, readonly } from 'vue'

const MAX_TOASTS = 5
const DEFAULT_DURATION = 5000

const toasts = ref([])
let counter = 0

function dismiss(id) {
  const index = toasts.value.findIndex((t) => t.id === id)
  if (index === -1) return
  clearTimeout(toasts.value[index]._timer)
  toasts.value.splice(index, 1)
}

function add(options = {}) {
  const id = counter++
  const toast = {
    id,
    variant: options.variant || 'info',
    title: options.title || '',
    description: options.description || '',
    duration: options.duration ?? DEFAULT_DURATION,
    dismissible: options.dismissible ?? true,
    _timer: null
  }

  if (toasts.value.length >= MAX_TOASTS) {
    dismiss(toasts.value[0].id)
  }

  if (toast.duration > 0) {
    toast._timer = setTimeout(() => dismiss(id), toast.duration)
  }

  toasts.value.push(toast)
  return id
}

function clear() {
  toasts.value.forEach((t) => clearTimeout(t._timer))
  toasts.value = []
}

export function useToast() {
  return { toasts: readonly(toasts), add, dismiss, clear }
}
