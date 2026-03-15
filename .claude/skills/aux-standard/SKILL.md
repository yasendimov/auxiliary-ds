---
name: aux-standard
description: Use when building, modifying, or reviewing any AUX component — provides the three-source design philosophy, variant hierarchy, color semantics, and per-category implementation rules
user_invocable: true
---

# AUX Component Standard

**The AUX design language in one line: modern, relaxed IBM/Carbon.** Sharp but not rigid. Systematic but not cold. IBM's discipline with more air to breathe.

The design philosophy and implementation rules for every component in auxiliary-ds.

## Component Principles

Every AUX component follows these rules. They are self-contained — no external reference needed to apply them.

**On-system visuals.** All colors from the 32-scale token system (`bg-blue-solid`, `bg-red-ui`, `border-base-normal`). Typography from the 13-step type scale (`type-caption-sb`, `type-body-r`). Spacing, radius, motion from AUX tokens. Zero arbitrary values. Semantic classes first, raw steps only for edge cases. If a token doesn't exist, flag it — don't work around it.

**Clear API shape.** 5 variant names (`solid`, `soft`, `surface`, `outline`, `ghost`) ordered by visual weight. 4 sizes (`sm`, `md`, `lg`, `xl`, default `md`). Separate `IconButton` component. `color` prop constrained to semantic meanings. Validators on every constrained prop.

**Vue + Tailwind conventions.** `<script setup>` with `defineProps()` + validators. Computed class composition — arrays of strings in `computed()`, never inline ternaries. Slot-based icons with `data-slot="icon"`. `provide`/`inject` with Symbol keys for compound components. Shared composables (`useXxxVariants.js`) for variant × color logic.

### The Three Sources

Each source contributes one clearly separated concern. They do not overlap.

| Concern | Source | What AUX takes |
|---------|--------|----------------|
| **Visual design** | Carbon Design System | The look: sharp corners, tight asymmetric padding, near-instant transitions, Productive/Expressive duality. Carbon is the closest visual relative — Swiss-modernist heritage applied to component UI. The precision standard comes from Area 17's Pixel School methodology: mathematical grid systems, pixel-perfect rendering, vector-based positioning. |
| **API shape** | Radix Themes + Radix Colors | The developer surface: five-variant weight ladder, semantic `color` prop, `size` prop, component separation (Button / IconButton). Radix Colors inspired the 12-step color scale architecture. |
| **Vue patterns** | Tailwind Plus / Catalyst | The implementation: `<script setup>`, computed class composition, slot structure, accessibility attributes. Implementation conventions only — not visual design. |

### Before You Build

When creating, modifying, or reviewing any component:

1. **Read the AUX reference implementation.** Study the closest existing AUX component (see Reference Implementation below) — understand current patterns, token usage, and spacing decisions.
2. **Apply the Radix API shape.** Use the variant/color/size prop vocabulary. Follow the weight ladder for variant semantics.
3. **Build with AUX tokens.** Every color, size, duration, and radius from the token system. Zero arbitrary values. If a token doesn't exist, flag it.
4. **Implement with Tailwind Plus patterns.** Computed class arrays, `<script setup>`, slot-based icons, provide/inject for compound components.
5. **Verify both themes.** A component is not done until it passes both light and dark mode.

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
| `green` | green / greendark | OK / success | Display only |
| `amber` | amber / amberdark | Warning / caution | Display only |
| `indigo` | indigo / indigodark | Informational | Display only |
| `base` | base / basedark | Neutral / passive | All (default for most) |

### The Rule

**Actions tell you what you can do.** Button and IconButton use `blue` (interactive) and `red` (destructive) only. No teal buttons, no amber buttons — the action's color tells you its nature, not its context.

**Display components tell you what's happening.** Badge, Alert, Toast get the full palette. A green Badge saying "Active", an amber Alert for "Caution", an indigo Toast for "Info" — all clear, all semantic.

**Form components stay neutral.** Input, Select, Checkbox, Radio use `base` with `red` for error states. They don't need a color prop.

### Color x Weight

Weight determines emphasis. Color determines meaning. A `solid red` Badge and a `soft red` Badge both mean "alarm" — but at different visual intensities. Choose weight for emphasis, color for semantics.

---

## Per-Category Rules

> The full design philosophy rationale lives in `docs/design-philosophy.md`. The actionable principles are condensed in `.claude/rules/design-philosophy.md` (auto-loaded when editing components).

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

- **Baseline**: `transition-colors duration-fast ease-snap` on most interactive elements. Buttons and icon buttons use `duration-instant` for snappier direct-manipulation feedback (aligned with Carbon's 70ms transitions).
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
  'rounded-instrument inline-flex items-center justify-center',
  'transition-colors duration-instant ease-snap',
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

- `src/components/core/Button.vue` — three-source philosophy in action: Carbon's visual precision (spacing, states), Radix's API shape (variant/color/size props), Tailwind Plus's Vue patterns (computed class composition), AUX token classes throughout
- `src/components/core/useButtonVariants.js` — shared composable pattern: variant x color matrix with disabled state handling
- `src/components/core/ButtonGroup.vue` — compound component pattern: provide/inject with Symbol key, reactive size/disabled propagation
- `src/components/core/IconButton.vue` — sibling component pattern: shares composable with Button, differs only in size classes (square) and slot structure (icon-only)
