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
      <p class="type-overline text-base-dim mb-5">{{ eyebrow }}</p>
      <h1 class="type-display-m text-base-normal">{{ headline }}</h1>
      <p v-if="description" class="type-body-m text-base-dim mt-6 max-w-xl">
        {{ description }}
      </p>
    </div>
    <div class="border-b border-base-dim"></div>
  </header>
</template>
