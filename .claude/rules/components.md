---
paths:
  - "src/components/**/*.vue"
---

# Component Rules

For the full design philosophy and visual hierarchy, invoke the `aux-standard` skill.

## Structure

- Every component uses `<script setup>` and Composition API
- Props defined with `defineProps()`, events with `defineEmits()`
- No inline styles — Tailwind classes only
- No hardcoded colors, spacing, or font values — always use tokens
- Components in `core/` are the only ones allowed to use raw Tailwind utilities
- Components in `marketing/`, `applications/`, `operations/` must compose from `core/` primitives
- Every component must work in both light and dark themes
- Operations components must strictly follow OpenBridge conventions

## Accessibility

- Keyboard interaction support, focus-visible styles, appropriate ARIA attributes, sufficient color contrast in both themes. Accessibility is structural — not a post-build checklist.
- **Focus convention (buttons/controls):** global `focus-visible` outline (2px solid, 2px offset)
- **Focus convention (form inputs):** `focus-visible:ring-1` (inset box-shadow) + border color change — avoids double-border with existing border
- Both approaches use `focus-visible` (keyboard only), never bare `focus`
- Interactive demos in docs must use semantic elements (`button`, `input`), not `div` with `cursor-pointer`

## Form Composition Patterns

Form components use Vue's `provide`/`inject` for context propagation — no prop drilling:

- **FormField** wraps any input. Provides via `formFieldKey` (Symbol): `fieldId`, `errorId`, `hintId`, `hasError`, `describedBy`. Child inputs `inject` this for `id`, `aria-describedby`, and error styling.
- **RadioGroup** wraps Radio components. Provides via `radioGroupKey`: shared `name`, `modelValue`, `update` handler.
- **Tabs** wraps Tab components via `tabsKey`: shared active tab state and selection handler.

Pattern: parent calls `provide(symbolKey, reactiveContext)`, child calls `inject(symbolKey)`. Symbol keys live in `*Key.js` files alongside the parent component.

## Component Delivery Checklist

A component is not done until all of these are complete:

1. Component `.vue` file in the correct category folder
2. Export added to `src/components/index.js` (clean name) and `src/components/public.js` (`Aux`-prefixed)
3. Docs page created in `src/docs/pages/{Name}Page.vue`
4. Entry added to `src/docs/nav.js` in the correct category
5. Test file in `src/components/core/__tests__/{Name}.test.js` with accessibility audit
6. Works in both light and dark themes — tested visually
7. Keyboard accessible with `focus-visible` styles and appropriate ARIA
8. Formatted and lint-clean (`pnpm format && pnpm lint`)

## Component Categories

- **Core** — Primitives shared across all categories. Button, Input, Badge, Typography, Icon, etc.
- **Marketing** — Public-facing brand components. Hero, FeatureCard, Nav, Footer, CTA. Full responsive range (`sm`–`2xl`). Liberal spacing (`px-6 md:px-8 lg:px-12`). Full motion budget (`duration-base` to `duration-slow`). Entrance animations OK.
- **Applications** — Conventional SaaS UI. Tables, Forms, Modals, Dashboards. `md`+ breakpoints. Moderate spacing (`px-6 py-6`). Subtle motion (`duration-fast` to `duration-base`). No entrance animations.
- **Operations** — Aerospace mission-critical UI. Telemetry, Status bars, Alert panels, Mission timeline. Fixed-viewport (no breakpoints). Maximum density (`px-2 py-2`, instruments `p-1.5`). Near-zero motion (`duration-instant` only). Must follow OpenBridge alert hierarchy.
