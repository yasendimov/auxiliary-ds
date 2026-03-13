<script setup>
defineOptions({ inheritAttrs: false })

defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  variant: {
    type: String,
    default: 'current',
    validator: (v) => ['current', 'action', 'dim'].includes(v)
  }
})

const sizeMap = { sm: 16, md: 20, lg: 24 }

const variantClasses = {
  current: '',
  action: 'text-action',
  dim: 'text-content-dim'
}
</script>

<template>
  <svg
    v-bind="$attrs"
    aria-hidden="true"
    :width="sizeMap[size]"
    :height="sizeMap[size]"
    viewBox="0 0 24 24"
    fill="none"
    :class="[variantClasses[variant], 'aux-spinner']"
    style="transform-origin: center"
  >
    <!-- Track -->
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25" />
    <!-- Arc -->
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="3"
      stroke-dasharray="47 16"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
.aux-spinner {
  animation: aux-spin 700ms linear infinite;
}

@keyframes aux-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
