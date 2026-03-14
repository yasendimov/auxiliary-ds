<script setup>
import { computed, inject, onMounted, onUnmounted, useId, ref } from 'vue'
import { dropdownKey } from './dropdownKey.js'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  description: {
    type: String,
    default: null
  },
  destructive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const group = inject(dropdownKey)
const id = useId()
const itemRef = ref(null)
const label = ref('')

const itemIndex = computed(() => group.items.value.findIndex((item) => item.id === id))
const isActive = computed(() => group.activeIndex.value === itemIndex.value)

const itemClasses = computed(() => {
  const base =
    'flex items-start gap-3 w-full px-3 py-2 type-caption-r transition-colors duration-instant ease-snap cursor-pointer outline-none'

  if (props.disabled) {
    return [base, 'text-action-content-disabled opacity-disabled cursor-not-allowed']
  }

  if (props.destructive) {
    return [base, isActive.value ? 'bg-base-ui text-red-normal' : 'text-red-dim']
  }

  return [base, isActive.value ? 'bg-base-ui text-base-normal' : 'text-base-normal']
})

function onClick() {
  if (props.disabled) return
  emit('select')
  group.selectItem(id)
}

function onMouseEnter() {
  if (props.disabled) return
  const index = group.items.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    group.activeIndex.value = index
  }
}

onMounted(() => {
  // Extract label text for typeahead
  label.value = itemRef.value?.textContent?.trim() || ''
  group.registerItem({
    id,
    disabled: props.disabled,
    label: label.value,
    onSelect: () => emit('select')
  })
})

onUnmounted(() => {
  group.unregisterItem(id)
})
</script>

<template>
  <div
    :id="id"
    ref="itemRef"
    role="menuitem"
    :tabindex="-1"
    :aria-disabled="disabled || undefined"
    :class="itemClasses"
    @click="onClick"
    @mouseenter="onMouseEnter"
  >
    <component
      :is="icon"
      v-if="icon"
      class="size-4 shrink-0 mt-0.5"
      :class="
        disabled ? 'text-action-content-disabled' : destructive ? 'text-red-dim' : 'text-base-dim'
      "
      aria-hidden="true"
    />
    <div class="flex-1 min-w-0">
      <div><slot /></div>
      <p
        v-if="description"
        class="type-agate-r mt-0.5"
        :class="disabled ? 'text-action-content-disabled' : 'text-base-dim'"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
