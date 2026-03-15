<script setup>
import { Separator } from '../../components'
import DocsHeader from '../components/DocsHeader.vue'
import DemoSection from '../components/DemoSection.vue'
import DemoCell from '../components/DemoCell.vue'
</script>

<template>
  <div>
    <DocsHeader
      title="Separator"
      description="Visual divider for separating content sections. Horizontal or vertical, with optional label support."
    />

    <DemoSection :number="1" title="Horizontal">
      <div class="max-w-2xl">
        <p class="type-body-r text-base-normal">
          Mission telemetry data has been recorded and is available for review. All flight
          parameters were within normal operating range.
        </p>
        <Separator />
        <p class="type-body-r text-base-normal">
          Post-flight diagnostics are scheduled for 0800 local. Ensure all units are powered down
          and secured before departing the operations area.
        </p>
      </div>
    </DemoSection>

    <DemoSection :number="2" title="With label">
      <div class="max-w-2xl">
        <p class="type-body-r text-base-normal">Sign in with your operator credentials.</p>
        <Separator label="or" />
        <p class="type-body-r text-base-normal">Use single sign-on through your organization.</p>
        <Separator label="Mission sections" />
        <p class="type-body-r text-base-normal">Pre-flight checklist items appear below.</p>
        <Separator label="Classified" />
        <p class="type-body-r text-base-normal">Restricted operational parameters follow.</p>
      </div>
    </DemoSection>

    <DemoSection :number="3" title="Vertical" :cols="1">
      <DemoCell>
        <div class="flex items-center h-8">
          <span class="type-body-r text-base-normal">Altitude: 120m</span>
          <Separator orientation="vertical" spacing="md" />
          <span class="type-body-r text-base-normal">Speed: 14 m/s</span>
          <Separator orientation="vertical" spacing="md" />
          <span class="type-body-r text-base-normal">Battery: 72%</span>
        </div>
      </DemoCell>
    </DemoSection>

    <DemoSection :number="4" title="Spacing variants">
      <div class="max-w-2xl">
        <div class="grid grid-cols-1 border-t border-l border-base-dim">
          <div class="border-b border-r border-base-dim p-8">
            <span class="type-overline text-base-dim">none</span>
            <Separator spacing="none" />
            <span class="type-overline text-base-dim">sm</span>
            <Separator spacing="sm" />
            <span class="type-overline text-base-dim">md (default)</span>
            <Separator spacing="md" />
            <span class="type-overline text-base-dim">lg</span>
            <Separator spacing="lg" />
            <span class="type-overline text-base-dim">end</span>
          </div>
        </div>
      </div>
    </DemoSection>

    <DemoSection :number="5" title="Nav section divider">
      <div class="w-48 rounded-card bg-base-ui p-4">
        <span class="block py-1 type-body-r text-base-normal">Dashboard</span>
        <span class="block py-1 type-body-r text-base-normal">Fleet overview</span>
        <span class="block py-1 type-body-r text-base-normal">Mission log</span>
        <Separator label="Operations" spacing="sm" />
        <span class="block py-1 type-body-r text-base-normal">Live telemetry</span>
        <span class="block py-1 type-body-r text-base-normal">Swarm control</span>
        <span class="block py-1 type-body-r text-base-normal">Geofence editor</span>
        <Separator label="Settings" spacing="sm" />
        <span class="block py-1 type-body-r text-base-normal">Preferences</span>
        <span class="block py-1 type-body-r text-base-normal">Account</span>
      </div>
    </DemoSection>

    <DemoSection :number="6" title="Form section divider" last>
      <div class="max-w-md rounded-card bg-base-ui p-6">
        <p class="type-caption-m text-base-normal mb-4">Personal details</p>
        <div class="flex flex-col gap-3">
          <div>
            <span class="type-caption-r text-base-dim block mb-1">Name</span>
            <div class="h-9 rounded bg-base-ui border border-base-dim" />
          </div>
          <div>
            <span class="type-caption-r text-base-dim block mb-1">Callsign</span>
            <div class="h-9 rounded bg-base-ui border border-base-dim" />
          </div>
        </div>
        <Separator label="Mission assignment" />
        <div class="flex flex-col gap-3">
          <div>
            <span class="type-caption-r text-base-dim block mb-1">Mission</span>
            <div class="h-9 rounded bg-base-ui border border-base-dim" />
          </div>
          <div>
            <span class="type-caption-r text-base-dim block mb-1">Role</span>
            <div class="h-9 rounded bg-base-ui border border-base-dim" />
          </div>
          <div>
            <span class="type-caption-r text-base-dim block mb-1">Assigned unit</span>
            <div class="h-9 rounded bg-base-ui border border-base-dim" />
          </div>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
