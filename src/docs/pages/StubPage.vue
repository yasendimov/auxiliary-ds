<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { AuxSeparator, Header, Section } from '../../components'

const route = useRoute()

const title = computed(() => route.meta.title || 'Untitled')
const number = computed(() => route.meta.number || '')
const sections = computed(() => route.meta.sections || [])
</script>

<template>
  <div>
    <Header :eyebrow="number" :headline="title" />

    <template v-for="section in sections" :key="section.id">
      <Section :label="section.name">
        <p :id="section.id" class="type-body-m text-content-dim">Coming soon</p>
      </Section>
      <AuxSeparator spacing="none" />
    </template>
  </div>
</template>
