<script setup>
import { useId } from 'vue'

defineProps({
  label: {
    type: String,
    default: null
  }
})

const id = useId()
</script>

<template>
  <div role="group" :aria-labelledby="label ? id : undefined">
    <div v-if="label" :id="id" class="px-3 py-1.5 type-overline text-base-dim">
      {{ label }}
    </div>
    <slot />
  </div>
</template>
