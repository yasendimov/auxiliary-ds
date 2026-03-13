<script setup>
import { AuxSeparator } from '../../components'
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-content-dim">Foundation</p>
      <h1 class="type-display-sb text-content-high mt-4">Separator</h1>
      <p class="type-lead-r text-content-low mt-4 max-w-xl">
        Visual divider for separating content sections. Horizontal or vertical,
        with optional label support.
      </p>
    </section>

    <!-- 01 Horizontal -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">01</span> — Horizontal
      </p>
      <div class="max-w-2xl">
        <p class="type-body-r text-content-high">
          Mission telemetry data has been recorded and is available for review.
          All flight parameters were within normal operating range.
        </p>
        <AuxSeparator />
        <p class="type-body-r text-content-high">
          Post-flight diagnostics are scheduled for 0800 local. Ensure all units
          are powered down and secured before departing the operations area.
        </p>
      </div>
    </section>

    <!-- 02 With label -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">02</span> — With label
      </p>
      <div class="max-w-2xl">
        <p class="type-body-r text-content-high">Sign in with your operator credentials.</p>
        <AuxSeparator label="or" />
        <p class="type-body-r text-content-high">Use single sign-on through your organization.</p>
        <AuxSeparator label="Mission sections" />
        <p class="type-body-r text-content-high">Pre-flight checklist items appear below.</p>
        <AuxSeparator label="Classified" />
        <p class="type-body-r text-content-high">Restricted operational parameters follow.</p>
      </div>
    </section>

    <!-- 03 Vertical -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">03</span> — Vertical
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8">
          <div class="flex items-center h-8">
            <span class="type-body-r text-content-high">Altitude: 120m</span>
            <AuxSeparator orientation="vertical" spacing="md" />
            <span class="type-body-r text-content-high">Speed: 14 m/s</span>
            <AuxSeparator orientation="vertical" spacing="md" />
            <span class="type-body-r text-content-high">Battery: 72%</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 Spacing variants -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">04</span> — Spacing variants
      </p>
      <div class="max-w-2xl">
        <div class="grid grid-cols-1 border-t border-l border-line">
          <div class="border-b border-r border-line p-8">
            <span class="type-overline text-content-dim">none</span>
            <AuxSeparator spacing="none" />
            <span class="type-overline text-content-dim">sm</span>
            <AuxSeparator spacing="sm" />
            <span class="type-overline text-content-dim">md (default)</span>
            <AuxSeparator spacing="md" />
            <span class="type-overline text-content-dim">lg</span>
            <AuxSeparator spacing="lg" />
            <span class="type-overline text-content-dim">end</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 Real-world: Nav section divider -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">05</span> — Nav section divider
      </p>
      <div class="w-48 rounded-card bg-surface-1 p-4">
        <span class="block py-1 type-body-r text-content-high">Dashboard</span>
        <span class="block py-1 type-body-r text-content-high">Fleet overview</span>
        <span class="block py-1 type-body-r text-content-high">Mission log</span>
        <AuxSeparator label="Operational" spacing="sm" />
        <span class="block py-1 type-body-r text-content-high">Live telemetry</span>
        <span class="block py-1 type-body-r text-content-high">Swarm control</span>
        <span class="block py-1 type-body-r text-content-high">Geofence editor</span>
        <AuxSeparator label="Settings" spacing="sm" />
        <span class="block py-1 type-body-r text-content-high">Preferences</span>
        <span class="block py-1 type-body-r text-content-high">Account</span>
      </div>
    </section>

    <!-- 06 Real-world: Form section -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">06</span> — Form section divider
      </p>
      <div class="max-w-md rounded-card bg-surface-1 p-6">
        <p class="type-caption-m text-content-high mb-4">Personal details</p>
        <div class="flex flex-col gap-3">
          <div>
            <span class="type-caption-r text-content-dim block mb-1">Name</span>
            <div class="h-9 rounded bg-surface-2 border border-line" />
          </div>
          <div>
            <span class="type-caption-r text-content-dim block mb-1">Callsign</span>
            <div class="h-9 rounded bg-surface-2 border border-line" />
          </div>
        </div>
        <AuxSeparator label="Mission assignment" />
        <div class="flex flex-col gap-3">
          <div>
            <span class="type-caption-r text-content-dim block mb-1">Mission</span>
            <div class="h-9 rounded bg-surface-2 border border-line" />
          </div>
          <div>
            <span class="type-caption-r text-content-dim block mb-1">Role</span>
            <div class="h-9 rounded bg-surface-2 border border-line" />
          </div>
          <div>
            <span class="type-caption-r text-content-dim block mb-1">Assigned unit</span>
            <div class="h-9 rounded bg-surface-2 border border-line" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
