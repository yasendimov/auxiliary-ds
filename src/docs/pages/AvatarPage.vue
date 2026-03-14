<script setup>
import { Avatar, AvatarGroup, Identicon } from '../../components'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

const groupAvatars = [
  { alt: 'Maya Chen' },
  { alt: 'Unit 7' },
  { alt: 'Rafael Storm' },
  { alt: 'Unit 12' },
  { alt: 'Zara Osei' },
  { alt: 'Unit 3' },
  { alt: 'Kira Tanaka' }
]

const crewMembers = [
  { alt: 'Maya Chen', name: 'Maya Chen', role: 'Pilot', status: 'online' },
  { alt: 'Rafael Storm', name: 'Rafael Storm', role: 'Co-pilot', status: 'online' },
  { alt: 'Zara Osei', name: 'Zara Osei', role: 'Mission Commander', status: 'away' },
  { alt: 'Kira Tanaka', name: 'Kira Tanaka', role: 'Ground Operator', status: 'online' }
]

const fleetUnits = [
  { alt: 'Unit 1', status: 'online' },
  { alt: 'Unit 3', status: 'online' },
  { alt: 'Unit 5', status: 'online' },
  { alt: 'Unit 7', status: 'online' },
  { alt: 'Unit 9', status: 'away' },
  { alt: 'Unit 12', status: 'offline' }
]

const identiconSeeds = [
  'Maya Chen',
  'Unit 7',
  'Rafael Storm',
  'Zara Osei',
  'Kira Tanaka',
  'Unit 3',
  'Unit 12',
  'Alpha Squad'
]
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-base-dim">Foundation</p>
      <h1 class="type-display-sb text-base-normal mt-4">Avatar</h1>
      <p class="type-lead-r text-base-dim mt-4 max-w-xl">
        Visual identifier for people and units. Deterministic identicon fallback, five sizes, two
        shapes, four status indicators.
      </p>
    </section>

    <!-- 01 Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">01</span> — Sizes</p>
      <div class="grid grid-cols-5 border-t border-l border-base-dim">
        <div
          v-for="size in sizes"
          :key="size"
          class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3"
        >
          <Avatar alt="Maya Chen" :size="size" />
          <span class="type-overline text-base-dim">{{ size }}</span>
        </div>
      </div>
    </section>

    <!-- 02 Shapes -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12"><span class="font-mono">02</span> — Shapes</p>
      <div class="grid grid-cols-2 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Avatar alt="Maya Chen" shape="circle" size="lg" />
          <span class="type-overline text-base-dim">circle</span>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Avatar alt="Unit 7" shape="square" size="lg" />
          <span class="type-overline text-base-dim">square</span>
        </div>
      </div>
    </section>

    <!-- 03 Fallback states -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">03</span> — Fallback states
      </p>
      <div class="grid grid-cols-3 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Avatar src="/does-not-exist.jpg" alt="Rafael Storm" />
          <span class="type-overline text-base-dim">broken src &rarr; identicon</span>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Avatar alt="Unit 7" />
          <span class="type-overline text-base-dim">no src &rarr; identicon</span>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Avatar />
          <span class="type-overline text-base-dim">no src, no alt &rarr; icon</span>
        </div>
      </div>
    </section>

    <!-- 04 Status indicators -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">04</span> — Status indicators
      </p>
      <div class="grid grid-cols-4 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Avatar alt="Maya Chen" status="online" />
          <span class="type-overline text-base-dim">online</span>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Avatar alt="Unit 7" status="offline" />
          <span class="type-overline text-base-dim">offline</span>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Avatar alt="Rafael Storm" status="busy" />
          <span class="type-overline text-base-dim">busy</span>
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col items-center gap-3">
          <Avatar alt="Zara Osei" status="away" />
          <span class="type-overline text-base-dim">away</span>
        </div>
      </div>
    </section>

    <!-- 05 Avatar group -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">05</span> — Avatar group
      </p>
      <div class="grid grid-cols-1 border-t border-l border-base-dim">
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-4">
          <span class="type-overline text-base-dim">circle — 7 avatars, max 5</span>
          <AvatarGroup :avatars="groupAvatars" :max="5" />
        </div>
        <div class="border-b border-r border-base-dim p-8 flex flex-col gap-4">
          <span class="type-overline text-base-dim">square — drone units</span>
          <AvatarGroup
            :avatars="fleetUnits.map((u) => ({ ...u, shape: 'square' }))"
            :max="6"
            size="sm"
          />
        </div>
      </div>
    </section>

    <!-- 06 Real-world: Mission crew -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">06</span> — Mission crew
      </p>
      <div class="max-w-md rounded-card bg-base-ui p-6">
        <p class="type-caption-m text-base-normal mb-4">Active crew — Mission Falcon 9</p>
        <div class="flex flex-col gap-3">
          <div v-for="member in crewMembers" :key="member.name" class="flex items-center gap-3">
            <Avatar :alt="member.alt" size="sm" :status="member.status" />
            <div class="flex-1 min-w-0">
              <p class="type-body-r text-base-normal">{{ member.name }}</p>
              <p class="type-caption-r text-base-dim">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 07 Real-world: Unit fleet -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">07</span> — Unit fleet
      </p>
      <div class="max-w-md">
        <AvatarGroup :avatars="fleetUnits" :max="6" size="sm" />
        <p class="type-caption-r text-base-dim mt-3">
          6 units assigned — 4 online, 1 away, 1 offline
        </p>
      </div>
    </section>

    <!-- 08 Identicon standalone -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-base-dim mb-12">
        <span class="font-mono">08</span> — Identicon standalone
      </p>
      <p class="type-body-r text-base-dim mb-6 max-w-2xl">
        The Identicon component generates a deterministic 5x5 symmetric pattern from any string
        seed. Same string always produces the same pattern. Colors are drawn from chromatic
        step-9 values that remain stable across light and dark themes.
      </p>
      <div class="flex items-end gap-6">
        <div v-for="seed in identiconSeeds" :key="seed" class="flex flex-col items-center gap-2">
          <Identicon :seed="seed" :size="48" />
          <span class="type-agate-r text-base-dim font-mono">{{ seed }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
