---
name: aux-health
description: Validate AUX components against project token, theme, accessibility, and structure rules — run on a single component or sweep the entire codebase
user_invocable: true
---

# AUX Component Health Check

Validate components against all auxiliary-ds conventions. Works in two modes:

- **Single component**: `/aux-health Button` → check one component in depth
- **Full sweep**: `/aux-health` → scan the entire codebase for cross-cutting issues

## Process

### Step 1: Determine Mode

If the user provides:
- A component name (e.g., "Button") → **single-component mode**. Resolve to `src/components/core/{Name}.vue` (search all category folders if not found in core).
- A file path → **single-component mode**. Use directly.
- Nothing → **full-sweep mode**. Run all checks across all `.vue` files in `src/components/` and `src/docs/pages/`.

Read the target file(s) fully before running checks.

### Step 2: Run Checks

Run ALL applicable checks below. For each violation, record:
- **Severity**: `error` (must fix) or `warning` (should fix)
- **File and line number**: `file_path:line`
- **Rule**: which rule was violated
- **Details**: what's wrong and how to fix it

---

#### Check 1: Token Compliance (error)

Search component template and script for:
- Arbitrary values: `[13px]`, `[#hex]`, `[rgb(...)]`, `[0.5rem]` — any bracket notation
- Tailwind default colors: `bg-gray-*`, `text-slate-*`, `border-zinc-*`, etc. (any Tailwind built-in palette)
- Inline color styles: `style="color:..."`, `style="background:..."`, `:style="{ color: ... }"`
- Hardcoded durations: `duration-100`, `duration-200`, `duration-300`, `duration-500`, `duration-700`, `duration-1000` (should use motion tokens: `duration-instant`, `duration-fast`, `duration-base`, `duration-slow`)
- Hardcoded tracking: `tracking-tight`, `tracking-wide` (should use type classes)

Allowed exceptions:
- `text-white` and `text-black` (for contrast on solid fills)
- Docs pages rendering dynamic token previews may use inline styles

#### Check 2: Dark Mode Compliance (error)

Search for raw color step classes without dark mode pairs:
- Pattern: `{bg|text|border|ring|outline}-{scale}-{1-12}` where `{scale}` is a known AUX scale (base, blue, red, orange, amber, green, indigo, etc.)
- For each match, verify a corresponding `dark:{prefix}-{scale}dark-{step}` exists on the same element
- Semantic classes (`bg-base-ui`, `text-base-normal`, etc.) are exempt — they handle dark mode automatically
- `text-white` and `text-black` are exempt
- Check that the component doesn't use bare `bg-white` or `bg-black` without dark mode alternatives

#### Check 3: Accessibility (error)

For every component that renders `<input>`, `<select>`, `<textarea>`, or `role="combobox"`:
1. Check that `aria-describedby` is present when the component also renders error/hint message elements with IDs
2. Check that `aria-invalid` is bound to error state
3. Check that `aria-labelledby` or `aria-label` exists for group roles (`role="group"`, `role="radiogroup"`)

For ALL interactive elements:
4. Interactive elements must be semantic HTML (`button`, `a`, `input`, `select`) — not `div` or `span` with click handlers
5. Must have `focus-visible` styles (not bare `focus`)
6. Buttons/controls: should use outline-based focus (2px solid, 2px offset)
7. Form inputs: should use `ring-1` focus
8. Check for ARIA attributes where needed:
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

1. Check `src/components/index.js` — is the component exported?
2. Check `src/components/public.js` — is the `Aux`-prefixed export present?
3. Composables (`use*.js`) should be exported from both files without `Aux` prefix
4. If missing, report which file needs updating

#### Check 6: Docs Coverage (warning)

1. Check `src/docs/pages/{Name}Page.vue` exists
2. Check `src/docs/nav.js` has an entry for this component
3. If docs page exists, check that demos use semantic interactive elements (not div with cursor-pointer)
4. Flag exported components missing docs pages

---

### Full-Sweep-Only Checks

These checks only run in full-sweep mode (no component argument). They detect cross-cutting issues that per-component checks miss.

#### Check 7: Undefined Custom Utilities (error)

Grep all component files for class names that reference custom AUX tokens but may not have corresponding `@utility` directives. Specifically:

1. Find all unique class names matching `outline-{name}`, `ring-{name}`, `bg-{name}`, `border-{name}`, `text-{name}` where `{name}` is NOT a standard Tailwind value
2. For each custom name found, verify it exists as either:
   - A `@utility` directive in `src/tokens/` or `src/style.css`
   - A `@theme` variable that Tailwind auto-generates (e.g., `ring-*` from `--color-*`)
3. Flag any class name that references a token without a corresponding utility

#### Check 8: Provide/Inject Consistency (warning)

1. Find all `*Key.js` files in `src/components/` that export Symbols
2. For each Symbol, verify there is at least one `provide()` call and one `inject()` call referencing it
3. Flag orphaned keys (defined but never provided or injected)

#### Check 9: Import Path Conventions (warning)

1. Check for `@/` path aliases (should use relative imports)
2. Check for `.ts` or `.tsx` file extensions (project is JS-only)
3. Check that component imports in docs pages use `../../components` barrel import, not direct paths

#### Check 10: Test Coverage (warning)

For each component checked:
1. Derive the expected test file path: `src/components/core/__tests__/{Name}.test.js`
2. Check if the test file exists
3. If it exists, check that it contains an `expectAccessible` call (every test must include an accessibility audit)
4. Flag components without test files

In full-sweep mode, include a summary: "X of Y components have test files (Z% coverage)"

---

### Step 3: Report Results

Present results grouped by severity:

**Single-component report:**
```
## AUX Health Check: {ComponentName}

### Errors (must fix)
- `src/components/core/Foo.vue:42` — **Token compliance**: arbitrary value `text-[13px]`, use `type-agate-r` instead
- `src/components/core/Foo.vue:58` — **Dark mode**: `bg-red-3` without dark pair, add `dark:bg-reddark-3` or use `bg-red-ui`

### Warnings (should fix)
- **Export**: missing from `src/components/public.js`
- **Docs**: no entry found in `src/docs/nav.js`

### Passed
- Token compliance: 0 violations
- Structure: valid `<script setup>` component
- Accessibility: semantic HTML, focus-visible present
```

**Full-sweep report:**
```
## AUX Health Report

### Errors
- `src/components/core/Foo.vue:42` — **Undefined utility**: `outline-custom` has no `@utility` definition
- `src/components/core/Bar.vue:88` — **Accessibility**: input renders error message but missing `aria-describedby`
- `src/components/core/Baz.vue:31` — **Dark mode**: `bg-red-3` without `dark:bg-reddark-3` pair

### Warnings
- **Export**: `DropdownSeparator` missing from `public.js`
- **Docs**: `FormField` has no docs page in `nav.js`

### Summary
- X errors across Y files
- Z warnings
- N components checked
```

If all checks pass:
```
## AUX Health Check: {ComponentName}

All checks passed. Component follows AUX conventions.
```

or

```
## AUX Health Report

All checks passed across N components. Codebase is healthy.
```
