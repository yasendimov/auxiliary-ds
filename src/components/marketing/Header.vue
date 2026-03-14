<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  }
})
</script>

<template>
  <header class="py-16 lg:py-24 px-10 lg:px-20">
    <p class="type-overline text-base-dim mb-5">{{ eyebrow }}</p>
    <h1 class="type-title-m text-base-normal">{{ headline }}</h1>
    <p v-if="description" class="type-body-m text-base-dim mt-6 max-w-2xl">
      {{ description }}
    </p>
  </header>
</template>
