<script setup>
import { Skeleton } from '../../components'
import DocsHeader from '../components/DocsHeader.vue'
import DemoSection from '../components/DemoSection.vue'
import DemoCell from '../components/DemoCell.vue'
</script>

<template>
  <div>
    <DocsHeader
      title="Skeleton"
      description="Loading placeholders that mimic content shape. Four variants for common content patterns — text lines, headings, circular avatars, and rectangular blocks."
    />

    <DemoSection :number="1" title="Variants" :cols="4">
      <DemoCell label="text (default)">
        <Skeleton />
      </DemoCell>
      <DemoCell label="heading">
        <Skeleton variant="heading" />
      </DemoCell>
      <DemoCell label="circle">
        <Skeleton variant="circle" />
      </DemoCell>
      <DemoCell label="rect">
        <Skeleton variant="rect" />
      </DemoCell>
    </DemoSection>

    <DemoSection :number="2" title="Custom Sizes" :cols="3">
      <DemoCell label="narrow text">
        <Skeleton width="w-32" />
      </DemoCell>
      <DemoCell label="tall rect">
        <Skeleton variant="rect" height="h-40" />
      </DemoCell>
      <DemoCell label="large circle">
        <Skeleton variant="circle" width="size-16" />
      </DemoCell>
    </DemoSection>

    <DemoSection :number="3" title="Content Placeholder" :cols="1" last>
      <DemoCell label="loading card">
        <div class="w-80 flex flex-col gap-4 p-5 border border-base-dim rounded-card">
          <div class="flex items-center gap-3">
            <Skeleton variant="circle" width="size-10" />
            <div class="flex-1 flex flex-col gap-2">
              <Skeleton variant="heading" width="w-32" height="h-4" />
              <Skeleton width="w-20" height="h-3" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <Skeleton />
            <Skeleton />
            <Skeleton width="w-4/5" />
          </div>
          <Skeleton variant="rect" height="h-32" />
        </div>
      </DemoCell>
    </DemoSection>
  </div>
</template>
