<script setup>
import { IconButton, ButtonGroup } from '../../components'
import DocsHeader from '../components/DocsHeader.vue'
import DemoSection from '../components/DemoSection.vue'
import DemoCell from '../components/DemoCell.vue'
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ListBulletIcon,
  Squares2X2Icon,
  TableCellsIcon
} from '@heroicons/vue/20/solid'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost']
</script>

<template>
  <div>
    <DocsHeader
      title="IconButton"
      description="Square button optimized for a single icon. Same variants and colors as Button, with equal width and height sizing."
    />

    <DemoSection :number="1" title="Variants" :cols="5">
      <DemoCell v-for="v in variants" :key="v" :label="v">
        <IconButton :variant="v"><PencilIcon data-slot="icon" /></IconButton>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="2" title="Destructive" :cols="5">
      <DemoCell v-for="v in variants" :key="v" :label="v">
        <IconButton :variant="v" color="red"><TrashIcon data-slot="icon" /></IconButton>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="3" title="Sizes" :cols="4">
      <DemoCell label="sm">
        <IconButton size="sm"><PlusIcon data-slot="icon" /></IconButton>
      </DemoCell>
      <DemoCell label="md (default)">
        <IconButton size="md"><PlusIcon data-slot="icon" /></IconButton>
      </DemoCell>
      <DemoCell label="lg">
        <IconButton size="lg"><PlusIcon data-slot="icon" /></IconButton>
      </DemoCell>
      <DemoCell label="xl">
        <IconButton size="xl"><PlusIcon data-slot="icon" /></IconButton>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="4" title="In ButtonGroup" :cols="1">
      <DemoCell label="view toggle">
        <ButtonGroup label="View mode">
          <IconButton variant="outline">
            <ListBulletIcon data-slot="icon" />
          </IconButton>
          <IconButton variant="outline">
            <Squares2X2Icon data-slot="icon" />
          </IconButton>
          <IconButton variant="outline">
            <TableCellsIcon data-slot="icon" />
          </IconButton>
        </ButtonGroup>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="5" title="States" :cols="2" last>
      <DemoCell label="disabled">
        <IconButton disabled><PencilIcon data-slot="icon" /></IconButton>
      </DemoCell>
      <DemoCell label="loading">
        <IconButton loading><PencilIcon data-slot="icon" /></IconButton>
      </DemoCell>
    </DemoSection>
  </div>
</template>
