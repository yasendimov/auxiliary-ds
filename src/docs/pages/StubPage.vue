<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const title = computed(() => route.meta.title || 'Untitled')
const sections = computed(() => route.meta.sections || [])
</script>

<template>
  <div class="-mx-page-x -my-page-y">
    <div class="px-8 pt-16 pb-12">
      <p class="type-overline text-content-dim">
        <span class="font-mono">{{ route.meta.number }}</span>
      </p>
      <h1 class="type-display-sb text-content-high mt-3">{{ title }}</h1>
    </div>

    <div class="border-t border-line">
      <div
        v-for="section in sections"
        :id="section.id"
        :key="section.id"
        class="border-b border-line px-8 py-12"
      >
        <h2 class="type-section-sb text-content-high">{{ section.name }}</h2>
        <p class="type-body-r text-content-dim mt-2">Coming soon</p>
      </div>
    </div>
  </div>
</template>
