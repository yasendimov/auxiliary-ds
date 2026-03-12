# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**auxiliary-ds (AUX)** is the official design system for Auterion — an aerospace company building autonomous drone swarm systems. AUX is an installable Vue 3 component library published as an npm package. It serves four distinct UI contexts: foundation primitives, marketing/brand, conventional application UI, and aerospace mission-critical operational interfaces.

## Commands

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
- **Fonts** — Inter Variable (UI), JetBrains Mono (data/code) via Google Fonts
- **@radix-ui/colors** — Radix color scales, consumed by `scripts/generate-tokens.js`

## Folder Structure
```
src/
├── tokens/               ← CSS custom properties (future @aux/tokens)
│   ├── colors.css        ← GENERATED — run `pnpm generate-tokens`
│   ├── typography.css
│   ├── spacing.css
│   └── index.css
├── components/
│   ├── foundation/       ← Primitives (future @aux/components)
│   ├── marketing/        ← Brand and website components
│   ├── application/      ← Conventional SaaS UI
│   └── operational/      ← Aerospace mission-critical UI
├── docs/                 ← Documentation app (not published)
│   ├── pages/
│   └── DocsLayout.vue
├── style.css             ← Tailwind import + token imports
├── App.vue
└── main.js
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
- Components ALWAYS use semantic tokens (`--color-action`), NEVER raw scale values (`--blue-9`) or hardcoded hex values
- Tailwind utilities are generated from `@theme` — use `bg-action`, `text-content-high`, `border-line` etc.
- Never use inline styles for colors
- Never use Tailwind's default color palette (blue-500, gray-900 etc.) — always use AUX semantic tokens

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

Every alert level has 7 token variants: `base`, `hover`, `subtle`, `muted`, `border`, `fill`, `text`.
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
- **JetBrains Mono** — telemetry values, coordinates, data readouts, code, token names
- 13-step type scale from 12px to 128px
- Three weights only: Regular (400), Medium (500), SemiBold (600)
- OpenType features enabled by default: tabular figures, contextual alternates
- Tracking tightens as size increases: -2% body, -3% heading, -4% display
- Never use italic in operational interfaces
- Uppercase only for labels and overlines — never body text

## Design Philosophy

See docs/design-philosophy.md for the full rationale.

The AUX visual style is **functional authority** — it needs to look like it controls things that fly. Every visual decision must serve one of these principles:

**When writing any component, ask:**
- Is this language or data? Language gets Inter. Data gets JetBrains Mono.
- Is this a heading or body? Headings get SemiBold with tight negative tracking. Body gets Regular.
- Is this decorative or functional? If decorative, remove it.
- Is this an operational interface? If yes, fixed sizes only — never fluid or responsive type.
- Does this color carry signal? alarm/warning/caution/ok colors must mean that alert level — never use them decoratively.
- Does this need a shadow or gradient? Almost certainly not. Remove it.
- Does this need rounded corners? Only on interactive elements — never on data displays.

**The rules:**
- Dark mode is the native state — always design and test dark first
- Density over whitespace — pack information, make it scannable
- Three weights only — Regular, Medium, SemiBold. Never a fourth.
- One typeface — Inter Variable for everything except data
- No gradients, no decorative shadows, no rounded corners on data
- Blue is interactive only — never use it as a status or alert color
- Monospace is data only — never use it decoratively

## Component Rules

- Every component uses `<script setup>` and Composition API
- Props defined with `defineProps()`, events with `defineEmits()`
- No inline styles — Tailwind classes only
- No hardcoded colors, spacing, or font values — always use tokens
- Components in `foundation/` are the only ones allowed to use raw Tailwind utilities
- Components in `marketing/`, `application/`, `operational/` must compose from `foundation/` primitives
- Every component must work in both light and dark mode
- Operational components must strictly follow OpenBridge conventions

## Component Categories

- **Foundation** — Primitives shared across all categories. Button, Input, Badge, Typography, Icon, etc.
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
- `src/` is the published package (build/export config not yet set up)
- `src/docs/` is the documentation app — not published
- License: Apache 2.0
- Structured for future monorepo split into `@aux/tokens`, `@aux/icons`, `@aux/components`

## Visual Language

- Swiss precision — structured layouts, consistent spacing, intentional hierarchy
- Every visual decision must be justified by function, not decoration
- Density over whitespace in operational interfaces, breathing room in marketing
- No gradients, no shadows for decoration — only for functional depth (elevation, overlay)
- Icons are monochromatic, inherit `currentColor`, never hardcoded fills
- Borders and dividers use `--color-line` — never arbitrary opacity hacks