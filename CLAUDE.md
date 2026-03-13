# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**auxiliary-ds (AUX)** is the official design system for Auterion — an aerospace company building autonomous drone swarm systems. AUX is an installable Vue 3 component library published as an npm package. It serves four distinct UI contexts: core primitives, marketing/brand, conventional application UI, and aerospace mission-critical operational interfaces.

## Commands

- `pnpm install` — Install dependencies
- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm preview` — Preview production build locally
- `pnpm generate-tokens` — Regenerate `src/tokens/colors.css` from Radix + Auterion sources
- Dev server runs on **port 4747** (configured in vite.config.js)

## Stack

- **Vue 3** — Composition API only, `<script setup>` syntax, no Options API, no TypeScript, no JSX
- **Vite 7** — bundler and dev server
- **Tailwind CSS v4** — CSS-first config via `@tailwindcss/vite`, no `tailwind.config.js`
- **Vue Router** — docs app navigation, `src/router/index.js`
- **pnpm** — package manager, always use pnpm not npm or yarn
- **Fonts** — Inter Variable (UI), IBM Plex Mono (data/code) via Google Fonts
- **@radix-ui/colors** — Radix color scales, consumed by `scripts/generate-tokens.js`
- **@heroicons/vue** — Icon library, import directly from size/variant paths (e.g. `@heroicons/vue/20/outline`)

## Folder Structure
```
src/
├── tokens/               ← CSS custom properties (future @aux/tokens)
│   ├── colors.css        ← GENERATED — run `pnpm generate-tokens`
│   ├── typography.css
│   ├── spacing.css
│   ├── border-radius.css
│   ├── shadows.css
│   ├── motion.css
│   └── z-index.css
├── assets/
│   └── logos/            ← Auterion brand SVGs (symbol + wordmark)
├── components/
│   ├── core/       ← Primitives (future @aux/components)
│   ├── marketing/        ← Brand and website components
│   ├── application/      ← Conventional SaaS UI
│   └── operational/      ← Aerospace mission-critical UI
├── docs/                 ← Documentation app (not published)
│   ├── pages/
│   └── DocsLayout.vue
├── style.css             ← Tailwind import + token imports
├── App.vue
└── main.js
docs/                      ← Design docs (not published)
└── design-philosophy.md
```

## Token Architecture

Colors follow a strict two-layer system:

**Layer 1 — Primitives** (in `src/tokens/colors.css`)
Raw 12-step scales defined as CSS custom properties on `:root` (light) and `[data-theme="dark"]` (dark). These are never used directly in components.
```css
:root               { --blue-9: #1475ff; }
[data-theme="dark"] { --blue-9: #1475ff; }
```

**Layer 2 — Semantic Aliases** (in Tailwind `@theme`)
Intent-based names that reference primitives via `var()`. Defined once, resolve automatically when theme changes.
```css
@theme {
  --color-action: var(--blue-9);
}
```

**Rules:**
- Everything must be **on-system** — every color, size, duration, and radius must come from AUX tokens. No arbitrary values (`text-[13px]`, `duration-100`, `tracking-[0.15em]`), no Tailwind defaults (`blue-500`, `gray-900`), no hardcoded hex. If a token doesn't exist for what you need, flag it — don't work around it.
- Tailwind utilities are generated from `@theme` — use `bg-action`, `text-content-high`, `border-line` etc.
- Never use inline styles for colors

### Spacing

Three page-level constants in `src/tokens/spacing.css`, registered in `@theme` so Tailwind generates utilities:
- `--spacing-page-x` (24px) → `px-page-x` — horizontal page padding
- `--spacing-page-y` (24px) → `py-page-y` — vertical page padding
- `--spacing-section` (48px) → `gap-section`, `mb-section` — between major sections

Everything else uses Tailwind's built-in spacing scale directly. Layout density varies by context:
- **Marketing**: `px-6 md:px-8 lg:px-12`, `py-16 md:py-24`
- **Application**: `px-6 py-6`
- **Operational**: `px-2 py-2`, instruments `p-1.5`

## Color System

- **Base scale** — Pure achromatic neutral (custom Auterion, no hue tint)
- **Blue scale** — Primary accent, #1475ff at step 9 (stable across themes)
- **Radix chromatic scales** — Full set for status and data visualization
- **Step 9 rule** — The accent fill (step 9) is always the same hex in both light and dark mode
- **Scale inversion** — In dark mode, step 1 is darkest, step 12 is lightest (opposite of light mode)

## Alert Hierarchy (OpenBridge Standard)

Operational components MUST follow the OpenBridge aviation alert hierarchy strictly:

- **Alarm** — red, immediate action required
- **Warning** — orange, urgent attention needed
- **Caution** — amber, awareness required
- **OK** — green, normal state

Every alert level currently has 3 token variants: `base`, `subtle`, `content`. Planned expansion to 7: adding `hover`, `muted`, `border`, `fill`.
Status colors are NEVER used decoratively — only for their designated alert level.

## Theming

- Dark mode is primary — always design and test dark first
- Theme controlled via `data-theme` attribute on `<html>` element
- `data-theme="dark"` — default
- `data-theme="light"` — secondary
- Additional themes planned: OpenBridge, high-contrast
- Theme switching swaps Layer 1 primitives only — semantic aliases resolve automatically

## Typography

- **Inter Variable** — all UI text
- **IBM Plex Mono** — telemetry values, coordinates, data readouts, code, token names
- 13-step type scale from 12px (agate) to 128px (broadsheet)
- Three weights only: Regular (400), Medium (500), SemiBold (600)
- Type classes use weight suffixes: `.type-{name}-sb`, `.type-{name}-m`, `.type-{name}-r`
- Scale names: broadsheet (128) · tabloid (96) · hero (80) · display (60) · title (48) · heading (40) · subheading (30) · section (24) · lead (20) · intro (18) · body (16) · caption (14) · agate (12)
- `agate` has no `-sb` variant (SemiBold at 12px is too heavy)
- `.type-overline` (11px) is a special formatting class — no weight suffix, includes `text-transform: uppercase`
- No bare class names — always use the weight suffix (e.g., `type-body-r` not `type-body`)
- OpenType features enabled by default: tabular figures, contextual alternates
- Tracking tightens as size increases: -2% body, -3% heading, -4% display
- Regular weight gets looser tracking than SemiBold/Medium at large display sizes (optical correction)
- Never use italic in operational interfaces
- Uppercase only for labels and overlines — never body text

## Design Philosophy

See `docs/design-philosophy.md` for full rationale and decision framework.

Core principle: **functional authority** — looks like it controls things that fly. No decoration. Every element encodes meaning or it's removed.

Quick rules: Inter for language, IBM Plex Mono for data. No shadows or gradients unless justified. 4px grid. Alert colors only for alerts. Blue only for interactive. Test both themes.

## Icons

Heroicons (`@heroicons/vue`). Import directly, size with `size-4`/`size-5`/`size-6`, color via `currentColor`.

- `16/solid` — micro icons (solid only)
- `20/outline` / `20/solid` — default UI
- `24/outline` / `24/solid` — feature/nav

## Data Visualization Rules

- Alert colors reserved for alert meanings only. Series use chromatic palette (non-blue, non-alert).
- Axes/labels: `text-content-dim`. Data values: monospace. Grid: `--color-line` at reduced opacity.
- Must be legible in both themes.

## Component Implementation Standard

When building any new component, reference Tailwind Plus Vue components
for implementation patterns — not design. Specifically follow their
conventions for:

- Computed class composition (avoid long inline ternary chains)
- Props and emits definitions
- Slot structure and naming
- Accessibility attributes and ARIA patterns
- State handling (disabled, loading, active, focus)

Do not copy their visual design, spacing, colors, or radius decisions.
AUX tokens and design philosophy govern all visual decisions.

## Component Rules

- Every component uses `<script setup>` and Composition API
- Props defined with `defineProps()`, events with `defineEmits()`
- No inline styles — Tailwind classes only
- No hardcoded colors, spacing, or font values — always use tokens
- Components in `core/` are the only ones allowed to use raw Tailwind utilities
- Components in `marketing/`, `application/`, `operational/` must compose from `core/` primitives
- Every component must work in both light and dark mode
- Operational components must strictly follow OpenBridge conventions
- Every component must include: keyboard interaction support, focus-visible styles,
  appropriate ARIA attributes, and sufficient color contrast in both themes.
  Accessibility is structural — not a post-build checklist.

## Component Categories

- **Core** — Primitives shared across all categories. Button, Input, Badge, Typography, Icon, etc.
- **Marketing** — Public-facing brand components. Hero, FeatureCard, Nav, Footer, CTA, etc.
- **Application** — Conventional SaaS UI. Tables, Forms, Modals, Dashboards, Navigation, etc.
- **Operational** — Aerospace mission-critical UI. Telemetry cards, Status bars, Alert panels, Mission timeline, Fleet lists, Map overlays. Must follow OpenBridge alert hierarchy.

## Branch Naming

Format: `prefix/weird-name`

Prefixes:
- `feature/` — new components or features
- `fix/` — bug fixes
- `chore/` — maintenance, config, tooling
- `docs/` — documentation updates
- `release/` — release branches

Example: `feature/grumpy-tooltip`, `fix/lost-token`

## Publishing

- Published as npm package `auxiliary-ds`
- `src/` is the published package — build/export config not yet set up (`package.json` is currently `"private": true`)
- `src/docs/` is the documentation app — not published
- License: Apache 2.0
- Structured for future monorepo split into `@aux/tokens`, `@aux/icons`, `@aux/components`

## Gotchas

- `scripts/generate-tokens.js` — Auterion defines custom `base` and `blue` scales. If you add `'blue'` back to the `radixChromatics` array, Radix's blue will overwrite Auterion's `#1475ff`. The custom scales must not appear in the Radix import lists.
- `colors.css` is GENERATED — never edit directly, always modify the generator script
- Tailwind v4 `@theme` uses a different scope than `:root` — referencing `var(--foo)` inside `@theme` where `--foo` is also defined in `@theme` creates a circular reference. Use literal values or reference variables from `:root` only.
- Borders and dividers use `--color-line` — never arbitrary opacity hacks
- No `@` path alias configured — always use relative imports (e.g. `../components/core/Foo.vue`)
