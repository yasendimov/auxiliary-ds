<script setup>
import { Button, Tooltip } from '../../components'
import { TrashIcon, PencilSquareIcon, ArrowDownTrayIcon, ShareIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Tooltip</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Text label that appears on hover or focus to describe an element. Uses a show delay and an
        arrow pointing to the trigger.
      </p>
    </section>

    <!-- Basic -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Basic</p>
      <div class="border border-base-dim rounded-card p-8 flex gap-6">
        <Tooltip content="Confirm this action">
          <Button>Hover me</Button>
        </Tooltip>
        <Tooltip content="Secondary action">
          <Button variant="ghost">Ghost button</Button>
        </Tooltip>
      </div>
    </section>

    <!-- Placement -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — Placement</p>
      <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto py-12">
        <div
          v-for="placement in [
            'top-start',
            'top',
            'top-end',
            'left-start',
            'left',
            'left-end',
            'right-start',
            'right',
            'right-end',
            'bottom-start',
            'bottom',
            'bottom-end'
          ]"
          :key="placement"
          class="flex justify-center"
        >
          <Tooltip :content="placement" :placement="placement">
            <Button size="sm" variant="ghost">{{ placement }}</Button>
          </Tooltip>
        </div>
      </div>
    </section>

    <!-- Delay -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">03</span> — Delay</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div
          v-for="delay in [0, 500, 1000]"
          :key="delay"
          class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-base-dim">{{ delay }}ms</span>
          <div>
            <Tooltip :content="`Delay: ${delay}ms`" :delay="delay">
              <Button size="sm" variant="ghost">Hover me</Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>

    <!-- On icon-only buttons -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Icon Buttons
      </p>
      <div class="border border-base-dim rounded-card p-8 flex gap-2">
        <Tooltip content="Edit mission">
          <Button variant="ghost" size="sm" aria-label="Edit mission">
            <PencilSquareIcon class="size-5" aria-hidden="true" />
          </Button>
        </Tooltip>
        <Tooltip content="Download logs">
          <Button variant="ghost" size="sm" aria-label="Download logs">
            <ArrowDownTrayIcon class="size-5" aria-hidden="true" />
          </Button>
        </Tooltip>
        <Tooltip content="Share report">
          <Button variant="ghost" size="sm" aria-label="Share report">
            <ShareIcon class="size-5" aria-hidden="true" />
          </Button>
        </Tooltip>
        <Tooltip content="Delete mission">
          <Button variant="ghost" size="sm" aria-label="Delete mission">
            <TrashIcon class="size-5" aria-hidden="true" />
          </Button>
        </Tooltip>
      </div>
    </section>

    <!-- Disabled -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">05</span> — Disabled</p>
      <div class="border border-base-dim rounded-card p-8 flex gap-6">
        <Tooltip content="This tooltip is disabled" disabled>
          <Button variant="ghost">Disabled tooltip</Button>
        </Tooltip>
        <Tooltip content="This tooltip works">
          <Button variant="ghost">Enabled tooltip</Button>
        </Tooltip>
      </div>
    </section>
  </div>
</template>
