<script setup>
defineProps({
  events: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-base-subtle">
          <th class="type-overline text-base-dim text-left px-4 py-2.5 border-b border-base-dim">
            Event
          </th>
          <th class="type-overline text-base-dim text-left px-4 py-2.5 border-b border-base-dim">
            Payload
          </th>
          <th class="type-overline text-base-dim text-left px-4 py-2.5 border-b border-base-dim">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.name" class="border-b border-base-dim">
          <td class="px-4 py-3 align-top">
            <code class="font-mono type-caption-m text-base-normal">{{ event.name }}</code>
          </td>
          <td class="px-4 py-3 align-top">
            <code class="font-mono type-caption-r text-base-dim">{{ event.payload }}</code>
          </td>
          <td class="px-4 py-3 align-top">
            <span class="type-caption-r text-base-dim">{{ event.description }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
