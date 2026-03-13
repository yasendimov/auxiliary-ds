<script setup>
import { AuxAvatar, AuxAvatarGroup } from '../../components'

const robo = (seed) => `https://robohash.org/${seed}?set=set1&size=200x200`

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

const groupAvatars = [
  { src: robo('maya-chen'), alt: 'Maya Chen' },
  { src: robo('unit-7'), alt: 'Unit 7' },
  { src: robo('rafael-storm'), alt: 'Rafael Storm' },
  { src: robo('unit-12'), alt: 'Unit 12' },
  { src: robo('zara-osei'), alt: 'Zara Osei' },
  { src: robo('unit-3'), alt: 'Unit 3' },
  { src: robo('kira-tanaka'), alt: 'Kira Tanaka' }
]

const crewMembers = [
  { src: robo('maya-chen'), alt: 'Maya Chen', name: 'Maya Chen', role: 'Pilot', status: 'online' },
  { src: robo('rafael-storm'), alt: 'Rafael Storm', name: 'Rafael Storm', role: 'Co-pilot', status: 'online' },
  { src: robo('zara-osei'), alt: 'Zara Osei', name: 'Zara Osei', role: 'Mission Commander', status: 'away' },
  { src: robo('kira-tanaka'), alt: 'Kira Tanaka', name: 'Kira Tanaka', role: 'Ground Operator', status: 'online' }
]

const fleetUnits = [
  { src: robo('unit-1'), alt: 'Unit 1', status: 'online' },
  { src: robo('unit-3'), alt: 'Unit 3', status: 'online' },
  { src: robo('unit-5'), alt: 'Unit 5', status: 'online' },
  { src: robo('unit-7'), alt: 'Unit 7', status: 'online' },
  { src: robo('unit-9'), alt: 'Unit 9', status: 'away' },
  { src: robo('unit-12'), alt: 'Unit 12', status: 'offline' }
]
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-8 lg:px-16 pt-24 pb-16">
      <p class="type-overline text-content-dim">Foundation</p>
      <h1 class="type-display-sb text-content-high mt-4">Avatar</h1>
      <p class="type-lead-r text-content-low mt-4 max-w-xl">
        Visual identifier for people and units. Image, initials, or icon fallback.
        Five sizes, two shapes, four status indicators.
      </p>
    </section>

    <!-- 01 Sizes -->
    <section class="px-8 lg:px-16">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">01</span> — Sizes
      </p>
      <div class="grid grid-cols-5 border-t border-l border-line">
        <div
          v-for="size in sizes"
          :key="size"
          class="border-b border-r border-line p-8 flex flex-col items-center gap-3"
        >
          <AuxAvatar
            :src="robo('maya-chen')"
            alt="Maya Chen"
            :size="size"
          />
          <span class="type-overline text-content-dim">{{ size }}</span>
        </div>
      </div>
    </section>

    <!-- 02 Shapes -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">02</span> — Shapes
      </p>
      <div class="grid grid-cols-2 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxAvatar :src="robo('maya-chen')" alt="Maya Chen" shape="circle" />
          <span class="type-overline text-content-dim">circle</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxAvatar :src="robo('unit-7')" alt="Unit 7" shape="square" />
          <span class="type-overline text-content-dim">square</span>
        </div>
      </div>
    </section>

    <!-- 03 Fallback states -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">03</span> — Fallback states
      </p>
      <div class="grid grid-cols-3 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxAvatar src="/does-not-exist.jpg" alt="Rafael Storm" />
          <span class="type-overline text-content-dim">broken src &rarr; initials</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxAvatar alt="Unit 7" />
          <span class="type-overline text-content-dim">no src &rarr; initials</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxAvatar />
          <span class="type-overline text-content-dim">no src, no alt &rarr; icon</span>
        </div>
      </div>
    </section>

    <!-- 04 Status indicators -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">04</span> — Status indicators
      </p>
      <div class="grid grid-cols-4 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxAvatar :src="robo('maya-chen')" alt="Maya Chen" status="online" />
          <span class="type-overline text-content-dim">online</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxAvatar :src="robo('unit-7')" alt="Unit 7" status="offline" />
          <span class="type-overline text-content-dim">offline</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxAvatar :src="robo('rafael-storm')" alt="Rafael Storm" status="busy" />
          <span class="type-overline text-content-dim">busy</span>
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col items-center gap-3">
          <AuxAvatar :src="robo('zara-osei')" alt="Zara Osei" status="away" />
          <span class="type-overline text-content-dim">away</span>
        </div>
      </div>
    </section>

    <!-- 05 Avatar group -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">05</span> — Avatar group
      </p>
      <div class="grid grid-cols-1 border-t border-l border-line">
        <div class="border-b border-r border-line p-8 flex flex-col gap-4">
          <span class="type-overline text-content-dim">circle — 7 avatars, max 5</span>
          <AuxAvatarGroup :avatars="groupAvatars" :max="5" />
        </div>
        <div class="border-b border-r border-line p-8 flex flex-col gap-4">
          <span class="type-overline text-content-dim">square — drone units</span>
          <AuxAvatarGroup
            :avatars="fleetUnits.map(u => ({ ...u, shape: 'square' }))"
            :max="6"
            size="sm"
          />
        </div>
      </div>
    </section>

    <!-- 06 Real-world: Mission crew -->
    <section class="px-8 lg:px-16 mt-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">06</span> — Mission crew
      </p>
      <div class="max-w-md rounded-card bg-surface-1 p-6">
        <p class="type-caption-m text-content-high mb-4">Active crew — Mission Falcon 9</p>
        <div class="flex flex-col gap-3">
          <div
            v-for="member in crewMembers"
            :key="member.name"
            class="flex items-center gap-3"
          >
            <AuxAvatar :src="member.src" :alt="member.alt" size="sm" :status="member.status" />
            <div class="flex-1 min-w-0">
              <p class="type-body-r text-content-high">{{ member.name }}</p>
              <p class="type-caption-r text-content-dim">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 07 Real-world: Unit fleet -->
    <section class="px-8 lg:px-16 mt-24 pb-24">
      <p class="type-overline text-content-dim mb-12">
        <span class="font-mono">07</span> — Unit fleet
      </p>
      <div class="max-w-md">
        <AuxAvatarGroup :avatars="fleetUnits" :max="6" size="sm" />
        <p class="type-caption-r text-content-dim mt-3">
          6 units assigned — 4 online, 1 away, 1 offline
        </p>
      </div>
    </section>
  </div>
</template>
