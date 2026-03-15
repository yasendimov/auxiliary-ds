<script setup>
defineProps({
  html: {
    type: String,
    required: true
  }
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="content-renderer px-8 lg:px-16 py-12" v-html="html" />
</template>

<style scoped>
.content-renderer :deep(h2) {
  font-size: var(--text-4xl);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: var(--text-4xl--line-height);
  color: var(--color-base-12);
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.content-renderer :deep(h2:first-child) {
  margin-top: 0;
}

.content-renderer :deep(h3) {
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: var(--text-2xl--line-height);
  color: var(--color-base-12);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.content-renderer :deep(p) {
  font-size: var(--text-base);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: var(--text-base--line-height);
  color: var(--color-base-11);
  max-width: 42rem;
  margin-bottom: 1rem;
}

.content-renderer :deep(strong) {
  color: var(--color-base-12);
  font-weight: 600;
}

.content-renderer :deep(ul),
.content-renderer :deep(ol) {
  font-size: var(--text-base);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: var(--text-base--line-height);
  color: var(--color-base-11);
  max-width: 42rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.content-renderer :deep(ul) {
  list-style-type: disc;
}

.content-renderer :deep(ol) {
  list-style-type: decimal;
}

.content-renderer :deep(li) {
  margin-bottom: 0.25rem;
}

.content-renderer :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--color-base-3);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
}

.content-renderer :deep(blockquote) {
  border-left: 3px solid var(--color-base-6);
  padding-left: 1rem;
  margin-bottom: 1rem;
  color: var(--color-base-11);
}

.content-renderer :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-base-6);
  margin: 2rem 0;
}
</style>
