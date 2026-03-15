---
name: aux-scaffold
description: Scaffold a new AUX component with docs page, route, and exports following all project conventions
user_invocable: true
---

# Scaffold AUX Component

Generate a complete component delivery: Vue component, docs page, router entry, and package exports.

## Process

**Prerequisite:** Read `aux-standard` for the component design philosophy before scaffolding.

### Step 1: Gather Info

Ask the user (use AskUserQuestion with options) for:

1. **Component name** — PascalCase (e.g., "Accordion", "StatusBar")
2. **Category** — core / marketing / applications / operations
3. **Features** (multiSelect):
   - Has props (beyond default slot)
   - Has named slots
   - Has emits/events
   - Needs keyboard interaction
   - Uses provide/inject (compound component)

### Step 2: Generate Component File

Create `src/components/{category}/{Name}.vue`:

Generate a Vue SFC with:

- `<script setup>` block containing:
  - Import provide/inject key if compound component
  - `defineProps()` with type, default, required, and validators on constrained props
  - `defineEmits()` if the component has events
  - Computed class composition using arrays, not inline ternaries
- `<template>` block containing:
  - Semantic HTML elements (button, input, etc. — never div with click handlers)
  - AUX token classes only — zero arbitrary values
  - Default slot with fallback content
  - `focus-visible` styles on all interactive elements
  - `transition-colors duration-fast ease-snap` on interactive elements

Rules for the generated component:
- Follow all rules in `aux-standard` — token compliance, accessibility, variant semantics
- If operations category: additionally enforce OpenBridge alert hierarchy and near-zero motion

### Step 3: Generate Docs Page

Create `src/docs/pages/{Name}Page.vue` using the docs layout components:

```vue
<script setup>
import { Name } from '../../components'
import DocsHeader from '../components/DocsHeader.vue'
import DemoSection from '../components/DemoSection.vue'
import DemoCell from '../components/DemoCell.vue'
// import ref/reactive if demos need interactive state
</script>

<template>
  <div>
    <DocsHeader
      title="Name"
      description="Brief description of the component's purpose."
    />

    <DemoSection :number="1" title="Default" :cols="1">
      <DemoCell label="default">
        <!-- Live interactive demo of the component -->
      </DemoCell>
    </DemoSection>

    <DemoSection :number="2" title="Variants" :cols="3">
      <DemoCell label="variant a">
        <!-- Demo variant a -->
      </DemoCell>
      <DemoCell label="variant b">
        <!-- Demo variant b -->
      </DemoCell>
      <DemoCell label="variant c">
        <!-- Demo variant c -->
      </DemoCell>
    </DemoSection>

    <!-- For freeform content (no grid), omit :cols -->
    <DemoSection :number="3" title="Real-World Example" last>
      <!-- Custom layout without DemoCell -->
    </DemoSection>
  </div>
</template>
```

**Layout component usage:**
- `DocsHeader` — always first, provides page title and description
- `DemoSection` — wraps each numbered section. Pass `:cols="N"` for grid layout, omit for freeform. Add `last` to the final section for bottom padding.
- `DemoCell` — grid cells inside DemoSection. Pass `label` for the overline label, `span` for multi-column cells.

Rules for docs pages:
- Import component using relative path from docs/pages/
- Interactive demos must use semantic elements (button, input), not div with cursor-pointer
- Every demo must be keyboard-reachable
- Show component in multiple states (default, hover, active, disabled, error)

### Step 4: Add Nav Entry

Edit `src/docs/nav.js` — add a child entry in the correct numbered section:

- **core** → section 10, under the appropriate sub-category comment (Actions, Forms, Feedback, Overlays, Data Display, Layout)
- **marketing** → section 11
- **applications** → section 12
- **operations** → section 13

```js
{
  name: '{Name}',
  path: '{kebab-name}',
  component: () => import('./pages/{Name}Page.vue')
}
```

Routes are auto-generated from `navConfig` by `buildRoutes()` — no need to edit `router/index.js`.

### Step 5: Add Exports

Edit `src/components/index.js` — add under the correct category comment:
```js
export { default as {Name} } from './{category}/{Name}.vue'
```

Edit `src/components/public.js` — add Aux-prefixed export:
```js
{Name} as Aux{Name},
```

### Step 6: Generate Test File

Create `src/components/core/__tests__/{Name}.test.js` with a starter skeleton:

```js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import {Name} from '../{Name}.vue'
import { expectAccessible } from '../../../test/helpers.js'

describe('{Name}', () => {
  it('renders slot content', () => {
    const wrapper = mount({Name}, { slots: { default: 'Hello' } })
    expect(wrapper.text()).toContain('Hello')
  })

  // TODO: Add prop/variant tests using it.each
  // TODO: Add event emission tests
  // TODO: Add keyboard interaction tests if interactive

  it('passes accessibility audit', async () => {
    const wrapper = mount({Name})
    await expectAccessible(wrapper)
  })
})
```

Rules for the generated test:
- If the component uses provide/inject, import `mountWithProvider` from helpers and use it instead of `mount`
- If the component uses `@floating-ui/vue`, the mock at `src/test/mocks/floating-ui.js` handles it automatically
- If the component has constrained props (variant, size, color), add `it.each` blocks for the matrix
- The accessibility test is always last

### Step 7: Verify

- Run `pnpm test -- --run` to confirm the test skeleton passes
- Run `pnpm build` to confirm no import/syntax errors
- Remind the user to test both light and dark themes visually
- Remind the user to test keyboard navigation

### Step 8: Report

List all files created/modified with their paths.
