<script setup>
import { ref } from 'vue'
import { Dialog, Button } from '../../components'

const showBasic = ref(false)
const showSizes = ref({ sm: false, md: false, lg: false })
const showWithFooter = ref(false)
const showNonDismissible = ref(false)
const showSlotOnly = ref(false)
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Dialog</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Modal dialog using native &lt;dialog&gt; with backdrop, focus trap, title/description,
        footer slot, and keyboard dismiss.
      </p>
    </section>

    <!-- Basic -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Basic</p>
      <div class="border border-base-dim rounded-card p-8">
        <Button @click="showBasic = true">Open dialog</Button>
        <Dialog
          v-model:open="showBasic"
          title="Confirm action"
          description="This will update the mission parameters for all selected vehicles."
        >
          <p class="type-body-r text-base-dim">
            Are you sure you want to proceed? This action cannot be undone.
          </p>
          <template #footer>
            <Button variant="ghost" @click="showBasic = false">Cancel</Button>
            <Button @click="showBasic = false">Confirm</Button>
          </template>
        </Dialog>
      </div>
    </section>

    <!-- Sizes -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — Sizes</p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div
          v-for="size in ['sm', 'md', 'lg']"
          :key="size"
          class="border-b border-r border-base-dim p-8 flex flex-col gap-3"
        >
          <span class="type-overline text-base-dim">{{ size }}</span>
          <div>
            <Button size="sm" @click="showSizes[size] = true">Open {{ size }}</Button>
            <Dialog
              v-model:open="showSizes[size]"
              :size="size"
              :title="`${size.toUpperCase()} dialog`"
              :description="`This dialog uses the ${size} size variant.`"
            >
              <p class="type-body-r text-base-dim">Dialog content at {{ size }} width.</p>
              <template #footer>
                <Button variant="ghost" @click="showSizes[size] = false">Close</Button>
              </template>
            </Dialog>
          </div>
        </div>
      </div>
    </section>

    <!-- With footer actions -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Footer Actions
      </p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">with footer</span>
          <div>
            <Button @click="showWithFooter = true">Delete mission</Button>
            <Dialog
              v-model:open="showWithFooter"
              title="Delete mission"
              description="This will permanently remove mission M-042 and all associated telemetry."
            >
              <p class="type-body-r text-base-dim">
                All flight logs, waypoints, and captured data will be lost.
              </p>
              <template #footer>
                <Button variant="ghost" @click="showWithFooter = false">Cancel</Button>
                <Button variant="destructive" @click="showWithFooter = false">Delete</Button>
              </template>
            </Dialog>
          </div>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-3">
          <span class="type-overline text-base-dim">body slot only</span>
          <div>
            <Button @click="showSlotOnly = true">Custom content</Button>
            <Dialog v-model:open="showSlotOnly" title="Mission notes">
              <div class="space-y-3">
                <p class="type-body-r text-base-dim">
                  Custom body content without a footer. Click the X or press Escape to close.
                </p>
                <p class="type-caption-r text-base-dim font-mono">
                  Mission ID: M-042 &middot; Status: Active
                </p>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </section>

    <!-- Non-dismissible -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Non-Dismissible
      </p>
      <div class="border border-base-dim rounded-card p-8">
        <Button @click="showNonDismissible = true">Open locked dialog</Button>
        <Dialog
          v-model:open="showNonDismissible"
          title="Terms of service"
          description="You must accept before continuing."
          :dismissible="false"
        >
          <p class="type-body-r text-base-dim">
            This dialog cannot be closed with Escape or backdrop click. The user must take an
            explicit action.
          </p>
          <template #footer>
            <Button @click="showNonDismissible = false">Accept</Button>
          </template>
        </Dialog>
      </div>
    </section>
  </div>
</template>
