<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <header class="py-16 lg:py-24 px-10 lg:px-20">
    <p class="type-overline text-content-dim mb-5">{{ eyebrow }}</p>
    <h1 class="type-title-m text-content-high">{{ headline }}</h1>
    <p v-if="description" class="type-body-m text-content-low mt-6 max-w-2xl">
      {{ description }}
    </p>
  </header>
</template>
