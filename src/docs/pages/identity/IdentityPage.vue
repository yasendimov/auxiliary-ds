<script setup>
import { Separator, Hero, Header } from '../../../components'
import ContentRenderer from '../../components/ContentRenderer.vue'
import { useContent } from '../../composables/useContent.js'
import raw from '../../content/identity.md?raw'

const { meta, html } = useContent(raw)
</script>

<template>
  <div>
    <Hero :eyebrow="meta.eyebrow" :headline="meta.title" :description="meta.description" />

    <!-- Prose content from markdown -->
    <ContentRenderer :html="html" />

    <!-- Visual Language — placeholder -->
    <Separator spacing="none" />

    <div id="visual-language">
      <Header
        eyebrow="Visual Language"
        headline="Visual Language"
        description="Motion, density, and the visual principles behind AUX. Coming soon."
      />

      <Separator spacing="none" />
    </div>
  </div>
</template>
