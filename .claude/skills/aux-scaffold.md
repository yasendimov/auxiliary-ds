---
name: aux:scaffold
description: Scaffold a new AUX component with docs page, route, and exports following all project conventions
user_invocable: true
---

# Scaffold AUX Component

Generate a complete component delivery: Vue component, docs page, router entry, and package exports.

## Process

### Step 1: Gather Info

Ask the user (use AskUserQuestion with options) for:

1. **Component name** — PascalCase (e.g., "Accordion", "StatusBar")
2. **Category** — core / marketing / application / operational
3. **Features** (multiSelect):
   - Has props (beyond default slot)
   - Has named slots
   - Has emits/events
   - Needs keyboard interaction
   - Uses provide/inject (compound component)

### Step 2: Generate Component File

Create `src/components/{category}/{Name}.vue`:

```vue
<script setup>
{# import provide/inject key if compound component #}
{# defineProps with type/default/required #}
{# defineEmits if has events #}
{# computed classes using object/array pattern, not inline ternaries #}
</script>

<template>
  {# semantic HTML elements #}
  {# AUX token classes only — no arbitrary values #}
  {# Slot with fallback content #}
  {# focus-visible styles on interactive elements #}
</template>
```

Rules for the generated component:
- `<script setup>` only, Composition API, no TypeScript
- All colors via AUX semantic classes (`bg-base-ui`, `border-base-dim`, `text-base-normal`)
- All spacing via Tailwind scale (no arbitrary values)
- Buttons/controls: global `focus-visible` outline (2px solid, 2px offset)
- Form inputs: `focus-visible:ring-1` + border color change
- Use `focus-visible`, never bare `focus`
- If operational category: follow OpenBridge alert hierarchy, near-zero motion
- Reference Tailwind Plus Vue components for implementation patterns (not design)

### Step 3: Generate Docs Page

Create `src/docs/pages/{Name}Page.vue`:

```vue
<script setup>
import {Name} from '../components/{category}/{Name}.vue'
{# import ref/reactive if demos need state #}
</script>

<template>
  <div class="space-y-section">
    <!-- Header -->
    <div>
      <h1 class="type-heading-sb text-base-normal">{Name}</h1>
      <p class="type-body-r text-base-dim mt-2">
        {Brief description of the component's purpose.}
      </p>
    </div>

    <!-- Demo sections -->
    <section>
      <h2 class="type-section-m text-base-normal mb-4">Default</h2>
      <div class="rounded-lg border border-base-dim bg-base-subtle p-6">
        {# Live interactive demo with semantic HTML controls #}
      </div>
    </section>

    {# Additional demo sections for variants, states, sizes #}
  </div>
</template>
```

Rules for docs pages:
- Import component using relative path from docs/pages/
- Interactive demos must use semantic elements (button, input), not div with cursor-pointer
- Every demo must be keyboard-reachable
- Show component in multiple states (default, hover, active, disabled, error)

### Step 4: Add Router Entry

Edit `src/router/index.js` — add route in the correct numbered section:

- **core** → section 10, path `system/core/{kebab-name}`, name `core-{kebab-name}`
- **marketing** → section 11, path `system/marketing/{kebab-name}`, name `marketing-{kebab-name}`
- **application** → section 12, path `system/applications/{kebab-name}`, name `applications-{kebab-name}`
- **operational** → section 13, path `system/operations/{kebab-name}`, name `operations-{kebab-name}`

Use lazy import: `component: () => import('../docs/pages/{Name}Page.vue')`

### Step 5: Add Exports

Edit `src/components/index.js` — add under the correct category comment:
```js
export { default as {Name} } from './{category}/{Name}.vue'
```

Edit `src/components/public.js` — add Aux-prefixed export:
```js
{Name} as Aux{Name},
```

### Step 6: Verify

- Run `pnpm build` to confirm no import/syntax errors
- Remind the user to test both light and dark themes visually
- Remind the user to test keyboard navigation

### Step 7: Report

List all files created/modified with their paths.
