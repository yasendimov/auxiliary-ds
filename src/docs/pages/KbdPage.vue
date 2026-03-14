<script setup>
import { Kbd } from '../../components'
import DocsHeader from '../components/DocsHeader.vue'
import DemoSection from '../components/DemoSection.vue'
import DemoCell from '../components/DemoCell.vue'
</script>

<template>
  <div>
    <DocsHeader
      title="Kbd"
      description="Keyboard shortcut display. Renders a semantic kbd element styled as a physical keycap — monospace font, subtle depth, compact sizing."
    />

    <DemoSection :number="1" title="Sizes" :cols="2">
      <DemoCell label="sm">
        <div class="flex items-center gap-2">
          <Kbd size="sm">K</Kbd>
          <Kbd size="sm">Ctrl</Kbd>
          <Kbd size="sm">Enter</Kbd>
        </div>
      </DemoCell>
      <DemoCell label="md (default)">
        <div class="flex items-center gap-2">
          <Kbd>K</Kbd>
          <Kbd>Ctrl</Kbd>
          <Kbd>Enter</Kbd>
        </div>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="2" title="Shortcuts" :cols="2">
      <DemoCell label="search">
        <div class="flex items-center gap-1.5">
          <Kbd>Cmd</Kbd>
          <span class="type-caption-r text-base-dim">+</span>
          <Kbd>K</Kbd>
        </div>
      </DemoCell>
      <DemoCell label="command palette">
        <div class="flex items-center gap-1.5">
          <Kbd>Cmd</Kbd>
          <span class="type-caption-r text-base-dim">+</span>
          <Kbd>Shift</Kbd>
          <span class="type-caption-r text-base-dim">+</span>
          <Kbd>P</Kbd>
        </div>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="3" title="In Context" :cols="1" last>
      <DemoCell label="menu items with shortcuts">
        <div class="w-64 flex flex-col divide-y divide-base-dim">
          <div class="flex items-center justify-between py-2.5">
            <span class="type-caption-r text-base-normal">Search</span>
            <div class="flex items-center gap-1">
              <Kbd size="sm">Cmd</Kbd>
              <Kbd size="sm">K</Kbd>
            </div>
          </div>
          <div class="flex items-center justify-between py-2.5">
            <span class="type-caption-r text-base-normal">New mission</span>
            <div class="flex items-center gap-1">
              <Kbd size="sm">Cmd</Kbd>
              <Kbd size="sm">N</Kbd>
            </div>
          </div>
          <div class="flex items-center justify-between py-2.5">
            <span class="type-caption-r text-base-normal">Toggle theme</span>
            <div class="flex items-center gap-1">
              <Kbd size="sm">Cmd</Kbd>
              <Kbd size="sm">D</Kbd>
            </div>
          </div>
        </div>
      </DemoCell>
    </DemoSection>
  </div>
</template>
