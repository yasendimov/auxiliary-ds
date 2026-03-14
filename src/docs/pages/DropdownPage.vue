<script setup>
import { Button, Dropdown, DropdownItem, DropdownGroup, DropdownSeparator } from '../../components'
import {
  PencilSquareIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  EyeIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Dropdown</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Action menu triggered by a button. Supports keyboard navigation, item groups, icons,
        descriptions, and destructive actions.
      </p>
    </section>

    <!-- Basic -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Basic</p>
      <div class="border border-base-dim rounded-card p-8">
        <Dropdown>
          <template #trigger>
            <Button variant="ghost">Actions</Button>
          </template>
          <DropdownItem @select="() => {}">Edit</DropdownItem>
          <DropdownItem @select="() => {}">Duplicate</DropdownItem>
          <DropdownItem @select="() => {}">Archive</DropdownItem>
        </Dropdown>
      </div>
    </section>

    <!-- With icons -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">02</span> — With Icons
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Dropdown>
          <template #trigger>
            <Button variant="ghost">Actions</Button>
          </template>
          <DropdownItem :icon="PencilSquareIcon" @select="() => {}">Edit mission</DropdownItem>
          <DropdownItem :icon="DocumentDuplicateIcon" @select="() => {}">Duplicate</DropdownItem>
          <DropdownItem :icon="ArchiveBoxIcon" @select="() => {}">Archive</DropdownItem>
        </Dropdown>
      </div>
    </section>

    <!-- With descriptions -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — With Descriptions
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Dropdown>
          <template #trigger>
            <Button variant="ghost">Export</Button>
          </template>
          <DropdownItem
            :icon="ArrowDownTrayIcon"
            description="Download flight logs as CSV"
            @select="() => {}"
          >
            Export logs
          </DropdownItem>
          <DropdownItem
            :icon="ShareIcon"
            description="Share a link with your team"
            @select="() => {}"
          >
            Share report
          </DropdownItem>
          <DropdownItem
            :icon="EyeIcon"
            description="Open a preview in a new tab"
            @select="() => {}"
          >
            Preview
          </DropdownItem>
        </Dropdown>
      </div>
    </section>

    <!-- Groups and separators -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Groups &amp; Separators
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Dropdown>
          <template #trigger>
            <Button variant="ghost">Mission options</Button>
          </template>
          <DropdownGroup label="Actions">
            <DropdownItem :icon="PencilSquareIcon" @select="() => {}">Edit</DropdownItem>
            <DropdownItem :icon="DocumentDuplicateIcon" @select="() => {}">Duplicate</DropdownItem>
          </DropdownGroup>
          <DropdownSeparator />
          <DropdownGroup label="Manage">
            <DropdownItem :icon="ArchiveBoxIcon" @select="() => {}">Archive</DropdownItem>
            <DropdownItem :icon="StarIcon" @select="() => {}">Add to favorites</DropdownItem>
          </DropdownGroup>
          <DropdownSeparator />
          <DropdownItem :icon="TrashIcon" destructive @select="() => {}"
            >Delete mission</DropdownItem
          >
        </Dropdown>
      </div>
    </section>

    <!-- Destructive items -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — Destructive Items
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Dropdown>
          <template #trigger>
            <Button variant="ghost">Danger zone</Button>
          </template>
          <DropdownItem @select="() => {}">Reset parameters</DropdownItem>
          <DropdownSeparator />
          <DropdownItem :icon="TrashIcon" destructive @select="() => {}"
            >Delete all logs</DropdownItem
          >
          <DropdownItem :icon="TrashIcon" destructive @select="() => {}"
            >Remove vehicle</DropdownItem
          >
        </Dropdown>
      </div>
    </section>

    <!-- Disabled items -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — Disabled Items
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Dropdown>
          <template #trigger>
            <Button variant="ghost">Options</Button>
          </template>
          <DropdownItem :icon="PencilSquareIcon" @select="() => {}">Edit</DropdownItem>
          <DropdownItem :icon="DocumentDuplicateIcon" disabled
            >Duplicate (unavailable)</DropdownItem
          >
          <DropdownItem :icon="ArchiveBoxIcon" disabled>Archive (unavailable)</DropdownItem>
          <DropdownSeparator />
          <DropdownItem :icon="TrashIcon" destructive @select="() => {}">Delete</DropdownItem>
        </Dropdown>
      </div>
    </section>

    <!-- Placement -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">07</span> — Placement</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div
          v-for="placement in [
            'bottom-start',
            'bottom',
            'bottom-end',
            'top-start',
            'top',
            'top-end'
          ]"
          :key="placement"
          class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-base-dim">{{ placement }}</span>
          <div>
            <Dropdown :placement="placement">
              <template #trigger>
                <Button size="sm" variant="ghost">Open</Button>
              </template>
              <DropdownItem @select="() => {}">Item one</DropdownItem>
              <DropdownItem @select="() => {}">Item two</DropdownItem>
              <DropdownItem @select="() => {}">Item three</DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
