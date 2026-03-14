<script setup>
import { Button, ButtonGroup, IconButton } from '../../components'
import DocsHeader from '../components/DocsHeader.vue'
import DemoSection from '../components/DemoSection.vue'
import DemoCell from '../components/DemoCell.vue'
import { ListBulletIcon, Squares2X2Icon, TableCellsIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div>
    <DocsHeader
      title="ButtonGroup"
      description="Visually connected group of buttons sharing a common border. Propagates size and disabled state to children via provide/inject."
    />

    <DemoSection :number="1" title="Basic" :cols="1">
      <DemoCell label="outline buttons">
        <ButtonGroup label="Time range">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="2" title="Sizes" :cols="4">
      <DemoCell label="1">
        <ButtonGroup label="View" :size="1">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </DemoCell>
      <DemoCell label="2">
        <ButtonGroup label="View" :size="2">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </DemoCell>
      <DemoCell label="3">
        <ButtonGroup label="View" :size="3">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </DemoCell>
      <DemoCell label="4">
        <ButtonGroup label="View" :size="4">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="3" title="With IconButtons" :cols="1">
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

    <DemoSection :number="4" title="Disabled" :cols="1" last>
      <DemoCell label="group disabled">
        <ButtonGroup label="Actions" disabled>
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </DemoCell>
    </DemoSection>
  </div>
</template>
