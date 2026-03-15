---
paths:
  - "src/docs/**/*.vue"
---

# Docs Page Conventions

## Layout Components

- **DocsHeader** — always first, provides page title and description
- **DemoSection** — wraps each numbered section. Pass `:cols="N"` for grid layout, omit for freeform. Add `last` to the final section for bottom padding.
- **DemoCell** — grid cells inside DemoSection. Pass `label` for the overline label, `span` for multi-column cells.

## Page Structure

```vue
<script setup>
import { ComponentName } from '../../components'
import DocsHeader from '../components/DocsHeader.vue'
import DemoSection from '../components/DemoSection.vue'
import DemoCell from '../components/DemoCell.vue'
</script>

<template>
  <div>
    <DocsHeader title="ComponentName" description="Brief purpose." />
    <DemoSection :number="1" title="Default" :cols="1">
      <DemoCell label="default">
        <!-- Live demo -->
      </DemoCell>
    </DemoSection>
    <!-- More sections... -->
    <DemoSection :number="N" title="Last Section" last>
      <!-- last prop adds bottom padding -->
    </DemoSection>
  </div>
</template>
```

## Rules

- Import components from `../../components` barrel, not direct paths
- Interactive demos must use semantic HTML elements (`button`, `input`) — never `div` with `cursor-pointer`
- Every demo must be keyboard-reachable
- Show component in multiple states: default, hover, active, disabled, error
- Add `last` prop to the final DemoSection

## Navigation (`src/docs/nav.js`)

Add entries in the correct numbered section:

- **core** → section 10, under the appropriate sub-category comment (Actions, Forms, Feedback, Overlays, Data Display, Layout)
- **marketing** → section 11
- **applications** → section 12
- **operations** → section 13

Entry format:
```js
{
  name: 'ComponentName',
  path: 'component-name',
  component: () => import('./pages/ComponentNamePage.vue')
}
```

Routes are auto-generated from `navConfig` by `buildRoutes()` — no need to edit `router/index.js`.
