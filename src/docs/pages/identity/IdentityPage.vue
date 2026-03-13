<script setup>
import Hero from '../../../components/marketing/Hero.vue'
import PageHeader from '../../../components/marketing/PageHeader.vue'
import Section from '../../../components/marketing/Section.vue'
</script>

<template>
  <div>
    <Hero
      eyebrow="Identity · 01"
      headline="Identity"
      description="What Auterion builds, why it exists, and who it's for."
    />

    <!-- #mission -->
    <div id="mission">
      <PageHeader
        eyebrow="Mission"
        headline="Mission"
        description="The mission, vision, and positioning that define Auterion."
      />

      <Section title="Mission Statement">
        <p class="type-subheading-sb text-content-high mb-6 max-w-3xl">Build swarms, not drones.</p>
        <p class="type-body-m text-content-low max-w-2xl">
          We transform individual drones into AI-enabled nodes of a larger network —
          creating resilient, coordinated swarms across air, land, and sea. Our open architecture
          gives democracies scalable, interoperable autonomy that resists jamming and wins at mass scale.
        </p>
      </Section>

      <Section title="Vision">
        <p class="type-subheading-sb text-content-high mb-6 max-w-3xl">The leading platform for autonomous systems.</p>
        <p class="type-body-m text-content-low max-w-2xl">
          We envision millions of unmanned vehicles connected by one common operating system —
          swarming as a decisive force across defense, industrial, and civil domains, uniting allies
          and manufacturers into a shared ecosystem for autonomy.
        </p>
      </Section>

      <Section title="Positioning">
        <p class="type-body-m text-content-low max-w-2xl mb-10">
          Auterion occupies a unique position at the intersection of interoperable architecture,
          AI-driven autonomy, and defense-grade reliability. Unlike proprietary systems that lock
          customers into single-vendor drones, Auterion provides the operating system that knits
          fleets together.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="type-body-sb text-content-high mb-2">Open Architecture</h3>
            <p class="type-caption-m text-content-low">
              Fosters interoperability and allows customers to integrate multiple manufacturers
              and payloads — enabling one operator to control many drones.
            </p>
          </div>
          <div>
            <h3 class="type-body-sb text-content-high mb-2">Battle-Proven</h3>
            <p class="type-caption-m text-content-low">
              Products like Skynode S are resilient against jamming and turn inexpensive FPV
              drones into networked weapons at unprecedented scale.
            </p>
          </div>
          <div>
            <h3 class="type-body-sb text-content-high mb-2">Swarms, Not Drones</h3>
            <p class="type-caption-m text-content-low">
              Differentiates by making large-scale autonomy accessible while maintaining ethical,
              democratically aligned partnerships.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Elevator Pitch">
        <p class="type-body-m text-content-low max-w-3xl">
          Auterion delivers the operating system for swarms. AuterionOS provides an open
          architecture that integrates fleets from multiple manufacturers into a single, interoperable
          fabric. Skynode avionics add AI-enabled autonomy, secure communications and edge computing
          so that one operator can control many drones. Our battle-proven technology lets vehicles
          lock onto targets and complete missions even when GPS and video links are jammed. We give
          democracies an affordable platform for autonomous mass while ensuring that humans remain
          in control.
        </p>
      </Section>

      <div class="border-b border-line"></div>
    </div>

    <!-- #brand-idea -->
    <div id="brand-idea">
      <PageHeader
        eyebrow="Brand Idea"
        headline="Brand Idea"
        description="The platform for autonomous mass — transforming individual drones into coordinated swarms across air, land, and sea."
      />

      <Section title="Brand Positioning">
        <p class="type-body-m text-content-low max-w-3xl">
          Auterion occupies a unique position at the intersection of interoperable architecture,
          AI-driven autonomy, and defense-grade reliability. Unlike proprietary systems that lock
          customers into single-vendor drones, Auterion provides the operating system that knits
          fleets together.
        </p>
      </Section>

      <Section title="Taglines">
        <div class="divide-y divide-line">
          <div class="py-6">
            <p class="type-intro-sb text-content-high">Build Swarms, Not Drones.</p>
            <p class="type-caption-m text-content-low mt-1">
              Directly conveys the shift from individual vehicles to coordinated swarms.
            </p>
          </div>
          <div class="py-6">
            <p class="type-intro-sb text-content-high">Platform for Autonomous Mass.</p>
            <p class="type-caption-m text-content-low mt-1">
              Highlights the focus on large-scale, interoperable autonomy.
            </p>
          </div>
          <div class="py-6">
            <p class="type-intro-sb text-content-high">Open Architecture. Swarm Power.</p>
            <p class="type-caption-m text-content-low mt-1">
              Combines open systems with swarm capability and democracy.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Core Values">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          <div>
            <h3 class="type-body-sb text-content-high mb-2">Autonomy, AI & Swarm Scale</h3>
            <p class="type-caption-m text-content-low">
              Edge computing and AI-driven autonomy at the core. Products like Skynode S allow drones
              to track moving targets autonomously and complete missions when communications are jammed —
              scaling from a handful to hundreds.
            </p>
          </div>
          <div>
            <h3 class="type-body-sb text-content-high mb-2">Interoperability & Open Architecture</h3>
            <p class="type-caption-m text-content-low">
              AuterionOS allows customers to combine different drones and manufacturers into a single
              architecture, enabling swarming where a single operator controls many drones.
            </p>
          </div>
          <div>
            <h3 class="type-body-sb text-content-high mb-2">Democratic Responsibility</h3>
            <p class="type-caption-m text-content-low">
              A moral obligation to support liberal democracies. Auterion does not sell to authoritarian
              regimes. Human operators always remain in control.
            </p>
          </div>
          <div>
            <h3 class="type-body-sb text-content-high mb-2">Open-Source Heritage</h3>
            <p class="type-caption-m text-content-low">
              Roots in open-source development. Making PX4 freely available created the world's largest
              developer community for autonomous robots.
            </p>
          </div>
          <div>
            <h3 class="type-body-sb text-content-high mb-2">Commercial Affordability & Scale</h3>
            <p class="type-caption-m text-content-low">
              Advanced capabilities should be accessible. Skynode S costs roughly the price of an Android
              phone. Autonomous mass, produced at scale.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Audience Messaging">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 class="type-body-sb text-content-high mb-3">Defense</h3>
            <p class="type-caption-m text-content-low">
              Swarm scalability, resilience, compliance, and trusted supply.
            </p>
          </div>
          <div>
            <h3 class="type-body-sb text-content-high mb-3">Commercial</h3>
            <p class="type-caption-m text-content-low">
              Productivity, flexibility, and a competitive alternative.
            </p>
          </div>
          <div>
            <h3 class="type-body-sb text-content-high mb-3">Developers</h3>
            <p class="type-caption-m text-content-low">
              Open APIs, edge computing, and interoperability.
            </p>
          </div>
          <div>
            <h3 class="type-body-sb text-content-high mb-3">Government</h3>
            <p class="type-caption-m text-content-low">
              Sovereignty, ethical AI, and economic development.
            </p>
          </div>
        </div>
      </Section>

      <div class="border-b border-line"></div>
    </div>

    <!-- #visual-language -->
    <div id="visual-language">
      <PageHeader
        eyebrow="Visual Language"
        headline="Visual Language"
        description="Motion, density, and the visual principles behind AUX. Coming soon."
      />

      <div class="border-b border-line"></div>
    </div>
  </div>
</template>
