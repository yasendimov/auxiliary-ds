# Heroicons Direct Imports Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dynamic-import AuxIcon wrapper with direct Heroicon imports (Tailwind Plus pattern), enabling tree-shaking, build-time validation, and IDE autocomplete.

**Architecture:** Delete the AuxIcon wrapper component. Replace all usages with direct named imports from `@heroicons/vue/{size}/{variant}`. Size via Tailwind `size-*` classes. Update CLAUDE.md iconography rules to reflect the new pattern.

**Tech Stack:** Vue 3, @heroicons/vue, Tailwind CSS v4

---

## Chunk 1: Migration

### Task 1: Update DocsLayout.vue to use direct Heroicon imports

**Files:**
- Modify: `src/docs/DocsLayout.vue`

- [ ] **Step 1: Replace AuxIcon import with direct Heroicon imports**

Replace line 3 in `src/docs/DocsLayout.vue`:

```vue
<!-- Before -->
import AuxIcon from '../components/foundation/AuxIcon.vue'

<!-- After -->
import { MoonIcon } from '@heroicons/vue/16/solid'
import { SunIcon } from '@heroicons/vue/16/solid'
```

Note: `size="sm"` mapped to `16/solid` in the old AuxIcon. 16px icons are always solid per Heroicons spec.

- [ ] **Step 2: Replace AuxIcon usage in template**

Replace line 50 in `src/docs/DocsLayout.vue`:

```vue
<!-- Before -->
<AuxIcon :name="theme === 'dark' ? 'moon' : 'sun'" size="sm" />

<!-- After -->
<MoonIcon v-if="theme === 'dark'" class="size-4" />
<SunIcon v-else class="size-4" />
```

`size-4` = 16px (Tailwind's `size-4` = 1rem = 16px). The icon inherits `currentColor` from the parent button's text color classes.

- [ ] **Step 3: Verify dev server runs clean**

Run: `pnpm dev`
Expected: No Vite warnings about dynamic imports. Theme toggle button shows moon/sun icon correctly in both themes.

- [ ] **Step 4: Commit**

```bash
git add src/docs/DocsLayout.vue
git commit -m "refactor: replace AuxIcon with direct Heroicon imports (Tailwind Plus pattern)"
```

### Task 2: Delete AuxIcon component

**Files:**
- Delete: `src/components/foundation/AuxIcon.vue`

- [ ] **Step 1: Delete AuxIcon.vue**

```bash
rm src/components/foundation/AuxIcon.vue
```

- [ ] **Step 2: Verify no remaining references**

```bash
grep -r "AuxIcon" src/
```

Expected: No matches.

- [ ] **Step 3: Verify dev server still runs clean**

Run: `pnpm dev`
Expected: No errors, no warnings.

- [ ] **Step 4: Commit**

```bash
git add -u src/components/foundation/AuxIcon.vue
git commit -m "chore: remove AuxIcon wrapper component"
```

### Task 3: Update CLAUDE.md iconography rules

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Replace the Iconography Rules section**

Replace the `## Iconography Rules` section in `CLAUDE.md` with:

```markdown
## Iconography Rules

- **Library:** Heroicons (`@heroicons/vue`) — outlined, geometric, 1.5px stroke
- **Usage:** Import icons directly from `@heroicons/vue` — no wrapper component
  ```vue
  import { ArrowLeftIcon } from '@heroicons/vue/20/outline'
  import { CheckIcon } from '@heroicons/vue/16/solid'
  ```
- **Directories:**
  - `16/solid` — 16px micro icons (solid only, no outline variant exists)
  - `20/outline` — 20px default UI icons
  - `20/solid` — 20px filled variant
  - `24/outline` — 24px feature/nav icons
  - `24/solid` — 24px filled variant
- **Sizing:** Use Tailwind `size-*` classes: `size-4` (16px), `size-5` (20px), `size-6` (24px)
- **Color:** Always `currentColor` via parent text color — never hardcoded fills
- **Accessibility:** Add `aria-label` and `role="img"` for meaningful icons. Decorative icons get `aria-hidden="true"`.
- Never decorative. Must be legible at 16px on both themes.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update iconography rules for direct Heroicon imports"
```
