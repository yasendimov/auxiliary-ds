---
name: aux-check
description: Validate an AUX component against project token, theme, accessibility, and structure rules
user_invocable: true
---

# AUX Component Quality Gate

Validate a component against all auxiliary-ds conventions. Accepts a component name or file path as argument.

## Process

### Step 1: Identify Target

If the user provides:
- A component name (e.g., "Button") → resolve to `src/components/core/Button.vue` (search all category folders)
- A file path → use directly
- Nothing → ask which component to check

Read the component file fully before running checks.

### Step 2: Run Checks

Run ALL checks below. For each violation, record:
- **Severity**: `error` (must fix) or `warning` (should fix)
- **File and line number**: `file_path:line`
- **Rule**: which rule was violated
- **Details**: what's wrong and how to fix it

#### Check 1: Token Compliance (error)

Search the component template and script for:
- Arbitrary values: `[13px]`, `[#hex]`, `[rgb(...)]`, `[0.5rem]` — any bracket notation
- Tailwind default colors: `bg-gray-*`, `text-slate-*`, `border-zinc-*`, etc. (any Tailwind built-in palette)
- Inline color styles: `style="color:..."`, `style="background:..."`, `:style="{ color: ... }"`
- Hardcoded durations: `duration-100`, `duration-200`, `duration-300` (should use motion tokens)
- Hardcoded tracking: `tracking-tight`, `tracking-wide` (should use type classes)

Allowed exceptions:
- `text-white` and `text-black` (for contrast on solid fills)
- Docs pages rendering dynamic token previews may use inline styles

#### Check 2: Theme Compliance (error)

Search for raw color step classes without dark mode pairs:
- Pattern: `{bg|text|border|ring}-{scale}-{1-12}` without a corresponding `dark:{bg|text|border|ring}-{scale}dark-{step}` on the same element
- Semantic classes (`bg-base-ui`, `text-base-normal`, etc.) are fine — they handle dark mode automatically
- Check that the component doesn't use bare `bg-white` or `bg-black` without dark mode alternatives

#### Check 3: Accessibility (error)

- Interactive elements must be semantic HTML (`button`, `a`, `input`, `select`) — not `div` or `span` with click handlers
- Must have `focus-visible` styles (not bare `focus`)
- Buttons/controls: should use outline-based focus (2px solid, 2px offset)
- Form inputs: should use `ring-1` focus
- Check for ARIA attributes where needed:
  - Modals/dialogs: `role="dialog"`, `aria-modal`, `aria-labelledby`
  - Toggles: `role="switch"`, `aria-checked`
  - Dropdowns: `aria-expanded`, `aria-haspopup`
  - Form fields: `aria-describedby` for errors/hints

#### Check 4: Structure (warning)

- Uses `<script setup>` (not Options API `export default {}`)
- Props via `defineProps()` (not `props:` option)
- Events via `defineEmits()` (not `emits:` option)
- No TypeScript (no `lang="ts"`)
- No JSX
- No inline styles (except documented exceptions)

#### Check 5: Export Registration (warning)

- Check `src/components/index.js` — is the component exported?
- Check `src/components/public.js` — is the `Aux`-prefixed export present?
- If missing, report which file needs updating

#### Check 6: Docs Page (warning)

- Check `src/docs/pages/{Name}Page.vue` exists
- Check `src/router/index.js` has a route for this component
- If docs page exists, check that demos use semantic interactive elements (not div with cursor-pointer)

### Step 3: Report Results

Present results grouped by severity:

```
## AUX Quality Gate: {ComponentName}

### Errors (must fix)
- `src/components/core/Foo.vue:42` — **Token compliance**: arbitrary value `text-[13px]`, use `type-agate-r` instead
- `src/components/core/Foo.vue:58` — **Theme compliance**: `bg-red-3` without dark pair, add `dark:bg-reddark-3` or use `bg-red-ui`

### Warnings (should fix)
- **Export**: missing from `src/components/public.js`
- **Docs**: no route found in `src/router/index.js`

### Passed
- Token compliance: 0 violations
- Structure: valid `<script setup>` component
- Accessibility: semantic HTML, focus-visible present
```

If all checks pass:
```
## AUX Quality Gate: {ComponentName}

All checks passed. Component follows AUX conventions.
```
