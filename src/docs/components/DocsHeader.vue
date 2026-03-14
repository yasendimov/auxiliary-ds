<script setup>
defineProps({
  title: {
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
  <section class="px-8 lg:px-16 pt-24 pb-16">
    <p class="type-overline text-base-dim">Foundation</p>
    <h1 class="type-display-sb text-base-normal mt-4">{{ title }}</h1>
    <p v-if="description" class="type-lead-r text-base-dim mt-4 max-w-xl">
      {{ description }}
    </p>
  </section>
</template>
