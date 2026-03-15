---
paths:
  - "src/components/core/__tests__/**"
---

# Testing Conventions

Tests live in `src/components/core/__tests__/`. Vitest is configured inline in `vite.config.js` with happy-dom environment.

## Key Decisions

- **`css: false`** — all CSS imports are stubbed. Tests assert class names, not computed styles. Tailwind `@theme`/`@utility` directives never need processing in tests.
- **`@floating-ui/vue` is mocked** (`src/test/mocks/floating-ui.js`) — happy-dom has no layout engine, so positioning math is meaningless. Tests verify behavior (open/close, keyboard nav, selection) not pixel positions.
- **No globals** — every test file imports `describe`, `it`, `expect` from `vitest` explicitly.

## Shared Helpers (`src/test/helpers.js`)

- `mountWithTheme(component, options, theme)` — sets `data-theme` on document before mount
- `mountWithProvider(component, key, value, options)` — wraps mount with provide/inject for group components
- `expectAccessible(wrapper)` — runs axe accessibility audit, asserts zero violations

## Test File Structure

Every component test follows this pattern:

```js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '../Component.vue'
import { expectAccessible } from '../../../test/helpers.js'

describe('Component', () => {
  // Rendering — slot content, conditional elements
  // Props / variants — use it.each for variant/size matrices
  // Events — emitted events on user interaction
  // Keyboard — keyboard interaction tests (where applicable)
  // Accessibility — always last: axe audit via expectAccessible()
})
```

## Writing New Tests

- Every test file must include an axe accessibility audit as the final test
- Use `it.each` for prop matrices (variants x sizes x colors) — never duplicate tests manually
- For components using provide/inject (group components like RadioGroup, ButtonGroup, Tabs), use `mountWithProvider`
- For components using `@floating-ui/vue` (Combobox, Dropdown, Tooltip, Popover), the mock handles positioning automatically — test behavior, not positions

## Component Type → Test Strategy

- **Form inputs** (Input, Select, Textarea, Combobox): test `v-model` binding, validation states (`aria-invalid`), `aria-describedby` connection via FormField, disabled state
- **Group components** (RadioGroup, ButtonGroup, Tabs, CheckboxGroup): test with `mountWithProvider`, verify parent-child state propagation, keyboard navigation between items
- **Floating components** (Dropdown, Tooltip, Popover, Combobox): test open/close triggers, keyboard nav, selection, `aria-expanded`
- **Display components** (Badge, Alert, Toast, Skeleton): test variant/color class application via `it.each`, slot rendering, dismiss behavior
- **Action components** (Button, IconButton, Link): test click emission, disabled state, loading state, `data-slot="icon"` rendering
