---
name: aux:standard
description: Use when building, modifying, or reviewing any AUX component — provides the three-source design philosophy, variant hierarchy, color semantics, and per-category implementation rules
user_invocable: true
---

# AUX Component Standard

The design philosophy and implementation rules for every component in auxiliary-ds.

## Component Principles

Every AUX component follows these rules. They are self-contained — no external reference needed to apply them.

**On-system visuals.** All colors from the 32-scale token system (`bg-blue-solid`, `bg-red-ui`, `border-base-normal`). Typography from the 13-step type scale (`type-caption-sb`, `type-body-r`). Spacing, radius, motion from AUX tokens. Zero arbitrary values. Semantic classes first, raw steps only for edge cases. If a token doesn't exist, flag it — don't work around it.

**Clear API shape.** 5 variant names (`solid`, `soft`, `surface`, `outline`, `ghost`) ordered by visual weight. 4 sizes (`sm`, `md`, `lg`, `xl`, default `md`). Separate `IconButton` component. `color` prop constrained to semantic meanings. Validators on every constrained prop.

**Vue + Tailwind conventions.** `<script setup>` with `defineProps()` + validators. Computed class composition — arrays of strings in `computed()`, never inline ternaries. Slot-based icons with `data-slot="icon"`. `provide`/`inject` with Symbol keys for compound components. Shared composables (`useXxxVariants.js`) for variant × color logic.

> *These principles were informed by Radix Themes (API vocabulary), Carbon Design System (visual precision), and Tailwind Plus / Catalyst (Vue implementation patterns). The standard itself is self-contained — you don't need to consult those systems to follow it.*

---

## Visual Hierarchy: The Weight Ladder

Five levels of visual emphasis. Universal across component types. Not every component uses all five, but those it uses follow the same weight semantics.

| Weight | Variant | Visual Signal | Use When |
|---------|---------|-------------------------------|------------------------------------------|
| Highest | `solid` | Full color fill, white text | Primary action, urgent status, blocking alert |
| High | `soft` | Tinted background, colored text | Secondary action, active status, informational |
| Medium | `surface` | Subtle bg + border, colored text | Tertiary action, metadata badge, container |
| Low | `outline` | Border only, no fill | Neutral action, filter tag, form input |
| Lowest | `ghost` | No chrome until hover | Minimal action, toolbar icon, inline control |

### Which Components Use Which Variants

- **Button / IconButton**: all 5
- **Badge**: solid, soft, surface, outline
- **Alert / Toast**: solid, soft, surface
- **Card / Panel**: surface (default), subtle (nested)
- **Input**: outline-like default with surface on focus

### Composition Rules

- One `solid` action per section maximum — it is the primary CTA
- `soft` and `surface` coexist freely as supporting elements
- `ghost` pairs next to heavier variants (solid primary + ghost cancel)
- Never place two `solid` buttons side by side — competing primaries confuse hierarchy

---

## Color Semantics

### Component Color Palette

| Color | CSS Scale | Semantic | Available On |
|---------|-----------------|---------------------|------------------------|
| `blue` | blue / bluedark | Interactive / action | Actions + Display |
| `red` | red / reddark | Destructive / alarm | Actions + Display |
| `teal` | teal / tealdark | OK / success | Display only |
| `amber` | amber / amberdark | Warning / caution | Display only |
| `indigo` | indigo / indigodark | Informational | Display only |
| `base` | base / basedark | Neutral / passive | All (default for most) |

### The Rule

**Actions tell you what you can do.** Button and IconButton use `blue` (interactive) and `red` (destructive) only. No teal buttons, no amber buttons — the action's color tells you its nature, not its context.

**Display components tell you what's happening.** Badge, Alert, Toast get the full palette. A teal Badge saying "Active", an amber Alert for "Caution", an indigo Toast for "Info" — all clear, all semantic.

**Form components stay neutral.** Input, Select, Checkbox, Radio use `base` with `red` for error states. They don't need a color prop.

### Color x Weight

Weight determines emphasis. Color determines meaning. A `solid red` Badge and a `soft red` Badge both mean "alarm" — but at different visual intensities. Choose weight for emphasis, color for semantics.

---

## Per-Category Rules

> For the full context model rationale, see `docs/design-decisions.md`.

### Applications and Operations

- Radix-caliber spacing precision: tight padding ratios, optical icon alignment, strict 4px grid
- Type from AUX scale, spacing from Tailwind scale — everything on-system
- State transitions: `transition-colors duration-fast ease-snap` as baseline for all interactive elements
- **Operations additions**: near-zero motion (`duration-instant` only for state feedback), maximum density, `radius-instrument` for data-bearing elements, OpenBridge alert hierarchy strictly enforced

### Marketing

- Own spacing and type expression — generous whitespace, expressive layout
- Same token system but different density philosophy
- Full motion budget (`duration-base` to `duration-slow`), entrance animations and scroll-triggered motion allowed
- Not bound by application-level spacing precision — marketing has its own rhythm

---

## State Transitions

The Button is the benchmark. Every interactive component follows the same quality bar.

- **Baseline**: `transition-colors duration-fast ease-snap` on all interactive elements
- **Hover / active**: semantic classes handle these automatically (`bg-blue-ui` includes hover step 4, active step 5). Always prefer semantic classes over manual hover utilities
- **Disabled**: `opacity-disabled cursor-not-allowed pointer-events-none` + `bg-action-disabled text-action-content-disabled`. Consistent across all components.
- **Loading**: spinner replaces content, `aria-busy="true"`, interaction blocked via disabled logic
- **Focus**: buttons and controls use global outline (2px solid, 2px offset). Form inputs use `focus-visible:ring-1` + border color change (inset ring avoids double-border). Always `focus-visible`, never bare `focus`.

---

## Implementation Patterns

### Class Composition

Build classes as arrays in `computed()`. Never use inline ternary chains in templates.

```js
const buttonClasses = computed(() => [
  'rounded-panel inline-flex items-center justify-center',
  'transition-colors duration-fast ease-snap',
  sizeClasses.value,
  variantClasses.value,
  props.block ? 'w-full' : ''
])
```

### Shared Composables

Extract variant x color resolution into composables when two or more components share the same logic. Pattern: `useXxxVariants(props, { isDisabled })` returns `{ variantClasses }`.

### Compound Components

Use `provide`/`inject` with Symbol keys from `*Key.js` files. Parent provides reactive refs via `toRef(props, 'name')`. Children inject with null fallback: `inject(key, null)`. Resolve size/disabled from group context with OR logic.

### Icons

Mark icons with `data-slot="icon"`. Size via child selector: `[&>[data-slot=icon]]:size-4`. Shrink: `[&>[data-slot=icon]]:shrink-0`.

### Accessibility

Semantic HTML elements always (`button`, `a`, `input` — never `div` with click handlers). ARIA attributes for state: `aria-disabled`, `aria-busy`, `aria-expanded`, `aria-describedby`. Form fields connect to error/hint via `aria-describedby` through the FormField provide/inject context.

---

## Reference Implementation

The Button family is the gold standard. Study these files before building any new component:

- `src/components/core/Button.vue` — three-source philosophy in action: Radix variant/color/size props, Tailwind Plus computed class composition, AUX token classes throughout
- `src/components/core/useButtonVariants.js` — shared composable pattern: variant x color matrix with disabled state handling
- `src/components/core/ButtonGroup.vue` — compound component pattern: provide/inject with Symbol key, reactive size/disabled propagation
- `src/components/core/IconButton.vue` — sibling component pattern: shares composable with Button, differs only in size classes (square) and slot structure (icon-only)
