<script setup>
defineProps({
  as: {
    type: String,
    default: 'span'
  }
})
</script>

<template>
  <component :is="as" class="sr-only"><slot /></component>
</template>
