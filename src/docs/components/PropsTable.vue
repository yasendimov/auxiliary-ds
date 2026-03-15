<script setup>
defineProps({
  props: {
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
            Prop
          </th>
          <th class="type-overline text-base-dim text-left px-4 py-2.5 border-b border-base-dim">
            Type
          </th>
          <th class="type-overline text-base-dim text-left px-4 py-2.5 border-b border-base-dim">
            Default
          </th>
          <th class="type-overline text-base-dim text-left px-4 py-2.5 border-b border-base-dim">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in props" :key="prop.name" class="border-b border-base-dim">
          <td class="px-4 py-3 align-top">
            <code class="font-mono type-caption-m text-base-normal">{{ prop.name }}</code>
          </td>
          <td class="px-4 py-3 align-top">
            <code class="font-mono type-caption-r text-base-dim">{{ prop.type }}</code>
          </td>
          <td class="px-4 py-3 align-top">
            <code class="font-mono type-caption-r text-base-dim">{{ prop.default }}</code>
          </td>
          <td class="px-4 py-3 align-top">
            <span class="type-caption-r text-base-dim">{{ prop.description }}</span>
            <div v-if="prop.values" class="mt-1.5 flex flex-wrap gap-1">
              <code
                v-for="val in prop.values"
                :key="val"
                class="font-mono type-agate-r text-base-dim bg-base-ui px-1.5 py-0.5 rounded-badge"
              >
                {{ val }}
              </code>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
