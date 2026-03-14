---
name: aux:health
description: Run a codebase-wide health sweep across all AUX components to find cross-cutting issues — token violations, accessibility gaps, theme problems, missing exports, and structural inconsistencies
user_invocable: true
---

# AUX Codebase Health Sweep

Scan the entire auxiliary-ds codebase for cross-cutting issues that per-component checks miss. Complements `aux:check` (single component) with a system-wide view.

## Process

Run ALL checks below across all `.vue` files in `src/components/` and `src/docs/pages/`. For each violation, record file path, line number, severity, and a fix suggestion.

### Check 1: Undefined Custom Utilities (error)

Grep all component files for class names that reference custom AUX tokens but may not have corresponding `@utility` directives. Specifically:

1. Find all unique class names matching `outline-{name}`, `ring-{name}`, `bg-{name}`, `border-{name}`, `text-{name}` where `{name}` is NOT a standard Tailwind value
2. For each custom name found, verify it exists as either:
   - A `@utility` directive in `src/tokens/` or `src/style.css`
   - A `@theme` variable that Tailwind auto-generates (e.g., `ring-*` from `--color-*`)
3. Flag any class name that references a token without a corresponding utility

### Check 2: Accessibility Consistency (error)

For every component that renders `<input>`, `<select>`, `<textarea>`, or `role="combobox"`:

1. Check that `aria-describedby` is present when the component also renders error/hint message elements with IDs
2. Check that `aria-invalid` is bound to error state
3. Check that `aria-labelledby` or `aria-label` exists for group roles (`role="group"`, `role="radiogroup"`)

For ALL interactive elements:
4. Verify `focus-visible:` is used (not bare `focus:`)
5. Verify semantic HTML is used (`button`, `a`, `input` — not `div` or `span` with click handlers)

### Check 3: Dark Mode Compliance (error)

Search all component files for raw color step classes:
- Pattern: `{bg|text|border|ring|outline}-{scale}-{1-12}` where `{scale}` is a known AUX scale (base, blue, red, orange, amber, green, indigo, etc.)
- For each match, verify a corresponding `dark:{prefix}-{scale}dark-{step}` exists on the same element
- Semantic classes (`bg-base-ui`, `text-base-normal`, etc.) are exempt — they handle dark mode automatically
- `text-white` and `text-black` are exempt

### Check 4: Token Violations (error)

Scan all component files (NOT docs pages) for:
- Arbitrary bracket values: `[13px]`, `[#hex]`, `[rgb(...)]`, `[0.5rem]`
- Tailwind default palette: `bg-gray-*`, `text-slate-*`, `border-zinc-*`, etc.
- Hardcoded durations: `duration-100`, `duration-200`, `duration-300`, `duration-500`, `duration-700`, `duration-1000` (should use motion tokens: `duration-instant`, `duration-fast`, `duration-base`, `duration-slow`)
- Inline color styles: `style="color:..."`, `:style="{ color: ... }"`

Allowed exceptions:
- `text-white` and `text-black` for contrast on solid fills
- Docs pages rendering token previews may use inline styles

### Check 5: Export Completeness (warning)

1. List all `.vue` files in `src/components/core/`, `src/components/marketing/`, `src/components/applications/`, `src/components/operations/`
2. For each, verify it has an export in `src/components/index.js`
3. For each, verify it has an `Aux`-prefixed export in `src/components/public.js`
4. Composables (`use*.js`) should be exported from both files without `Aux` prefix

### Check 6: Docs Coverage (warning)

1. For every exported component in `index.js`, verify a matching entry exists in `src/docs/nav.js` (children with `component: () => import(...)`)
2. For every nav entry, verify the referenced page file exists
3. Flag exported components missing docs pages

### Check 7: Provide/Inject Consistency (warning)

1. Find all `*Key.js` files in `src/components/` that export Symbols
2. For each Symbol, verify there is at least one `provide()` call and one `inject()` call referencing it
3. Flag orphaned keys (defined but never provided or injected)

### Check 8: Import Path Conventions (warning)

1. Check for `@/` path aliases (should use relative imports)
2. Check for `.ts` or `.tsx` file extensions (project is JS-only)
3. Check that component imports in docs pages use `../../components` barrel import, not direct paths

## Report Format

Present results grouped by severity, then by check:

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
## AUX Health Report

All checks passed across N components. Codebase is healthy.
```
