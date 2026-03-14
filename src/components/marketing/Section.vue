<script setup>
defineProps({
  label: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: null
  }
})
</script>

<template>
  <section>
    <div class="py-12 lg:py-16 px-10 lg:px-20">
      <p v-if="label" class="type-overline text-base-dim mb-8">{{ label }}</p>
      <h2 v-if="title" class="type-lead-sb text-base-normal mb-4">{{ title }}</h2>
      <slot />
    </div>
  </section>
</template>
