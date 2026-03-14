<script setup>
import { Button } from '../../components'
import DocsHeader from '../components/DocsHeader.vue'
import DemoSection from '../components/DemoSection.vue'
import DemoCell from '../components/DemoCell.vue'
import { PlusIcon, ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/vue/20/solid'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost']
</script>

<template>
  <div>
    <DocsHeader
      title="Button"
      description="Primary interactive element. Five variants, two color scales, four sizes, slot-based icons, and loading/disabled states."
    />

    <DemoSection :number="1" title="Variants" :cols="5">
      <DemoCell v-for="v in variants" :key="v" :label="v">
        <Button :variant="v">Label</Button>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="2" title="Destructive" :cols="5">
      <DemoCell v-for="v in variants" :key="v" :label="v">
        <Button :variant="v" color="red">Label</Button>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="3" title="Sizes" :cols="4">
      <DemoCell label="1">
        <Button :size="1">Label</Button>
      </DemoCell>
      <DemoCell label="2 (default)">
        <Button :size="2">Label</Button>
      </DemoCell>
      <DemoCell label="3">
        <Button :size="3">Label</Button>
      </DemoCell>
      <DemoCell label="4">
        <Button :size="4">Label</Button>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="4" title="With Icons" :cols="3">
      <DemoCell label="leading icon">
        <Button><PlusIcon data-slot="icon" /> Create</Button>
      </DemoCell>
      <DemoCell label="trailing icon">
        <Button><span>Continue</span><ArrowRightIcon data-slot="icon" /></Button>
      </DemoCell>
      <DemoCell label="ghost + icon">
        <Button variant="ghost"><ArrowDownTrayIcon data-slot="icon" /> Download</Button>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="5" title="States" :cols="2">
      <DemoCell label="disabled">
        <div class="flex gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled</Button>
        </div>
      </DemoCell>
      <DemoCell label="loading">
        <Button loading>Submitting</Button>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="6" title="Block" :cols="1" last>
      <DemoCell label="full width">
        <Button block>Full Width Action</Button>
      </DemoCell>
    </DemoSection>
  </div>
</template>
