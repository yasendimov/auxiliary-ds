<script setup>
import { computed } from 'vue'
import PropsTable from './PropsTable.vue'
import EventsTable from './EventsTable.vue'
import SlotsTable from './SlotsTable.vue'

const props = defineProps({
  docs: {
    type: Object,
    required: true
  },
  number: {
    type: [Number, String],
    required: true
  }
})

const formattedNumber = computed(() => String(props.number).padStart(2, '0'))
</script>

<template>
  <section class="px-8 lg:px-16 mt-24 pb-24">
    <p class="type-overline text-base-dim mb-12">
      <span class="font-mono">{{ formattedNumber }}</span> — API Reference
    </p>

    <div class="space-y-10">
      <div v-if="docs.props?.length">
        <h3 class="type-caption-sb text-base-normal mb-3">Props</h3>
        <PropsTable :props="docs.props" />
      </div>

      <div v-if="docs.events?.length">
        <h3 class="type-caption-sb text-base-normal mb-3">Events</h3>
        <EventsTable :events="docs.events" />
      </div>

      <div v-if="docs.slots?.length">
        <h3 class="type-caption-sb text-base-normal mb-3">Slots</h3>
        <SlotsTable :slots="docs.slots" />
      </div>
    </div>
  </section>
</template>
