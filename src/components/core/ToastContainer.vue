<script setup>
import { useToast } from './useToast.js'
import Toast from './Toast.vue'

const { toasts, dismiss } = useToast()
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-6 right-6 z-toast flex flex-col gap-3 w-96 pointer-events-none"
      aria-label="Notifications"
    >
      <TransitionGroup
        enter-active-class="transition-all duration-base ease-glide"
        leave-active-class="transition-all duration-fast ease-snap"
        enter-from-class="opacity-0 translate-x-4"
        enter-to-class="opacity-100 translate-x-0"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-4"
        move-class="transition-all duration-base ease-glide"
      >
        <Toast
          v-for="toast in toasts"
          :key="toast.id"
          :variant="toast.variant"
          :title="toast.title"
          :description="toast.description"
          :dismissible="toast.dismissible"
          class="pointer-events-auto"
          @dismiss="dismiss(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>
