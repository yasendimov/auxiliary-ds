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
  <header>
    <div class="pt-24 pb-16 lg:pt-32 lg:pb-20 px-10 lg:px-20">
      <p class="type-overline text-content-dim mb-5">{{ eyebrow }}</p>
      <h1 class="type-display-m text-content-high">{{ headline }}</h1>
      <p v-if="description" class="type-body-m text-content-low mt-6 max-w-xl">
        {{ description }}
      </p>
    </div>
    <div class="border-b border-line"></div>
  </header>
</template>
