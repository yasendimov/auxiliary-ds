# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**auxiliary-ds (AUX)** is the official design system for Auterion — an aerospace company building autonomous drone swarm systems. AUX is an installable Vue 3 component library published as an npm package. It serves four distinct UI contexts: core primitives, marketing/brand, conventional application UI, and aerospace mission-critical operational interfaces.

## Commands

- `pnpm install` — Install dependencies (also configures git hooks via `postinstall`)
- `pnpm dev` — Start library dev server (port 4747, configured in vite.config.js)
- `pnpm build` — Production build
- `pnpm preview` — Preview production build locally
- `pnpm docs:dev` — Start VitePress documentation dev server
- `pnpm docs:build` — Build VitePress documentation for production
- `pnpm docs:preview` — Preview VitePress documentation build locally
- `pnpm format` — Auto-format all source files with Prettier
- `pnpm lint` / `pnpm lint:fix` — Run ESLint / auto-fix

### Pre-commit Hook

A git pre-commit hook in `.githooks/pre-commit` auto-formats and lint-fixes on every commit:

1. Runs `pnpm format` + `pnpm lint:fix`
2. Re-stages modified files
3. Blocks the commit only if lint errors remain after auto-fix

The hook is activated by `git config core.hooksPath .githooks`, which runs automatically via `postinstall` after `pnpm install`. If you cloned without running install, run `git config core.hooksPath .githooks` manually.

## Stack

- **Vue 3** — Composition API only, `<script setup>` syntax, no Options API, no TypeScript, no JSX
- **Vite 7** — bundler and dev server
- **Tailwind CSS v4** — CSS-first config via `@tailwindcss/vite`, no `tailwind.config.js`
- **VitePress** — documentation site with fully custom theme using AUX components and tokens
- **Vue Router** — docs app navigation (legacy, in `src/docs/nav.js` and `src/router/index.js`)
- **pnpm** — package manager, always use pnpm not npm or yarn
- **Fonts** — Inter Variable (UI), IBM Plex Mono (data/code) via Google Fonts
- **Color scales** — 32 scales in `src/tokens/colors/*.css`, CSS-first `@theme` + `@utility`, no JS plugin
- **@heroicons/vue** — Icon library, import directly from size/variant paths (e.g. `@heroicons/vue/20/outline`)

## Folder Structure

```
src/
├── tokens/               ← CSS custom properties (future @aux/tokens)
│   ├── colors/           ← 32 color scale files
│   ├── typography.css
│   ├── spacing.css
│   ├── border-radius.css
│   ├── shadows.css
│   ├── motion.css
│   ├── opacity.css
│   └── z-index.css
├── assets/
│   └── logos/            ← Auterion brand SVGs (symbol + wordmark)
├── components/
│   ├── core/       ← Primitives (future @aux/components)
│   ├── marketing/        ← Brand and website components
│   ├── application/      ← Conventional SaaS UI
│   └── operational/      ← Aerospace mission-critical UI
├── docs/                 ← Legacy docs app (Vue page components reused by VitePress)
│   ├── nav.js            ← Legacy nav config (still used by src/router)
│   ├── pages/
│   │   ├── gallery/      ← Multi-component showcase pages
│   │   └── identity/     ← Brand identity pages
│   └── DocsLayout.vue
├── style.css             ← Tailwind import + token imports
├── App.vue
└── main.js
docs/                      ← VitePress documentation site
├── .vitepress/
│   ├── config.js          ← VitePress config (Tailwind, fonts, aliases)
│   ├── design-decisions.md ← Internal design docs (not routed)
│   └── theme/
│       ├── index.js       ← Custom theme entry (registers AUX components)
│       ├── Layout.vue     ← Custom layout (sidebar, nav, theme toggle)
│       ├── useNav.js      ← Navigation data for sidebar
│       └── demos/         ← Demo wrapper components
├── index.md               ← Home page
├── brand/                 ← Brand section (01-08)
│   ├── identity.md
│   ├── logo.md … language.md
│   └── gallery/
└── system/                ← System section (09-13)
    ├── tokens.md
    ├── core/              ← One .md per component
    ├── marketing/
    ├── applications.md
    └── operations.md
```

## Token Architecture

Colors are defined CSS-first in `src/tokens/colors/`. Each of the 32 scale files uses native Tailwind v4 `@theme` to register raw CSS custom properties (`--color-{scale}-{step}`) and native `@utility` directives to define the 12 semantic classes. No JS plugin is involved.

**How it works:**

1. Each scale file defines 12-step light + dark variables in `@theme`
2. Each scale file defines 12 semantic `@utility` classes that bundle dark mode + interaction states via `@apply`
3. `style.css` resets Tailwind defaults with `--color-*: initial`, then imports all 32 scale files plus non-color tokens

**Rules:**

- Everything must be **on-system** — every color, size, duration, and radius must come from AUX tokens. No arbitrary values (`text-[13px]`, `duration-100`, `tracking-[0.15em]`), no Tailwind defaults, no hardcoded hex. If a token doesn't exist for what you need, flag it — don't work around it.
- Use semantic classes when possible: `bg-red-ui`, `border-base-dim`, `text-base-normal`
- Use raw step classes for edge cases: `border-red-9 dark:border-reddark-9`
- Never use inline styles for colors
- Semantic classes handle dark mode + interaction states automatically — always prefer them over raw steps
- Raw step classes require manual dark mode pairing: `bg-red-9 dark:bg-reddark-9` (note: `{scale}dark` suffix, no hyphen)
- Never use Tailwind's built-in color palette (`bg-gray-500`, `text-slate-400`) — only AUX scale classes
- Never use arbitrary color values (`bg-[#1475ff]`, `text-[rgb(0,0,0)]`)
- `text-white` and `text-black` are the only non-scale color classes allowed (for contrast on solid fills)

### Spacing

Three page-level constants in `src/tokens/spacing.css`, registered in `@theme` so Tailwind generates utilities:

- `--spacing-page-x` (24px) → `px-page-x` — horizontal page padding
- `--spacing-page-y` (24px) → `py-page-y` — vertical page padding
- `--spacing-section` (48px) → `gap-section`, `mb-section` — between major sections

Everything else uses Tailwind's built-in spacing scale directly. Layout density varies by context:

- **Marketing**: `px-6 md:px-8 lg:px-12`, `py-16 md:py-24`
- **Application**: `px-6 py-6`
- **Operational**: `px-2 py-2`, instruments `p-1.5`

### Breakpoints

Tailwind v4 default breakpoints — no custom overrides:

| Prefix | Min-width | Usage |
| ------ | --------- | ----- |
| `sm`   | 640px     | Marketing only |
| `md`   | 768px     | Marketing + Application |
| `lg`   | 1024px    | Marketing + Application |
| `xl`   | 1280px    | Marketing only |
| `2xl`  | 1536px    | Marketing only |

- **Marketing** — full responsive range (`sm` through `2xl`)
- **Application** — `md`+ (assumes tablet-minimum viewport)
- **Operational** — typically fixed-viewport (no breakpoints, instruments sized by container)

## Color System

- **Base scale** — Pure achromatic neutral (custom Auterion, no hue tint)
- **Blue scale** — Primary accent, #1475ff at step 9 (stable across themes)
- **Chromatic scales** — Full set for status and data visualization
- **Step 9 rule** — The accent fill (step 9) is always the same hex in both light and dark mode
- **Scale inversion** — In dark mode, step 1 is darkest, step 12 is lightest (opposite of light mode)

### Color rules

- **Blue is interactive-only** — blue means "you can act on this." Never use blue decoratively or for status
- **Alert colors are signal-only** — red/orange/amber/green carry operational meaning (alarm/warning/caution/OK). Never use them decoratively or for generic success/error outside the alert hierarchy
- **Semantic classes first** — always use `bg-{s}-ui`, `border-{s}-dim`, `text-{s}-normal` etc. over raw steps
- **Raw steps are edge cases** — accent borders (`border-red-9 dark:border-reddark-9`), checked-state fills, focus ring colors. Always pair with `dark:` variant
- **Dark mode naming** — dark variants use `{scale}dark` suffix with no hyphen: `--color-reddark-9`, `bg-reddark-3`
- **No inline color styles** — all colors via Tailwind classes. Only exception: docs pages rendering dynamic token previews
- **Every component must work in both themes** — if you only tested dark, it is not done

### Semantic utility classes

Each scale's `.css` file defines semantic classes via `@utility`. These bundle dark mode and interaction states automatically:

| Class                   | Steps           | Behavior                     |
| ----------------------- | --------------- | ---------------------------- |
| `bg-{color}-app`        | 1               | Page background              |
| `bg-{color}-subtle`     | 2               | Subtle/striped background    |
| `bg-{color}-ui`         | 3→4→5           | UI surface with hover+active |
| `bg-{color}-ghost`      | transparent→3→4 | Ghost button pattern         |
| `bg-{color}-action`     | 4→5→6           | Selected/active surface      |
| `bg-{color}-solid`      | 9→10            | Solid fill with hover        |
| `border-{color}-dim`    | 6               | Subtle border                |
| `border-{color}-normal` | 7→8             | UI border with hover         |
| `divide-{color}-dim`    | 6               | Subtle divider               |
| `divide-{color}-normal` | 7→8             | UI divider with hover        |
| `text-{color}-dim`      | 11              | Secondary text               |
| `text-{color}-normal`   | 12              | Primary text                 |

Available scales: `base` (neutral), `blue` (action/accent), `red`, `orange`, `amber`, `green`, `indigo`, and 20+ additional chromatic and neutral scales.

Usage: `bg-base-app`, `bg-red-ui`, `border-base-dim`, `text-base-normal`, `bg-blue-solid`, etc.

For edge cases (accent borders, checked-state fills), use raw step classes: `border-red-9 dark:border-reddark-9`.

### Alert hierarchy colors (OpenBridge)

Status colors are NEVER used decoratively — only for their designated alert level:

- **Alarm** — `red` scale, immediate action required
- **Warning** — `orange` scale, urgent attention needed
- **Caution** — `amber` scale, awareness required
- **OK** — `green` scale, normal state

## Theming

- Dark mode is primary — always design and test dark first
- Theme controlled via `data-theme` attribute on `<html>` element
- `data-theme="dark"` — default
- `data-theme="light"` — secondary
- Additional themes planned: Light Contrast, Dark Vision
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

## Design Decisions

See `docs/design-decisions.md` for full rationale and decision framework.

Core principle: **functional authority** — looks like it controls things that fly. No decoration. Every element encodes meaning or it's removed.

Quick rules: Inter for language, IBM Plex Mono for data. No shadows or gradients unless justified. 4px grid. Alert colors only for alerts. Blue only for interactive. Test both themes.

## Icons

Heroicons (`@heroicons/vue`). Import directly, size with `size-4`/`size-5`/`size-6`, color via `currentColor`.

- `16/solid` — micro icons (solid only)
- `20/outline` / `20/solid` — default UI
- `24/outline` / `24/solid` — feature/nav

## Motion Budget

Motion tokens are defined in `src/tokens/motion.css`:

- `--duration-instant` (80ms) — micro-interactions (toggles, checkboxes)
- `--duration-fast` (150ms) — UI feedback (hover, focus, state changes)
- `--duration-base` (220ms) — standard transitions (panels, dropdowns)
- `--duration-slow` (350ms) — entrances, overlays, page transitions

Easing: `--ease-snap` (snappy, exit-feel) and `--ease-glide` (smooth, enter-feel).

### Context budgets

- **Operational** — near-zero motion. Only `--duration-instant` for state feedback. No decorative animation — motion in operational UI is a distraction.
- **Application** — subtle, functional transitions. `--duration-fast` to `--duration-base`. No entrance animations.
- **Marketing** — expressive transitions allowed. `--duration-base` to `--duration-slow`. Entrance animations and scroll-triggered motion OK.

## Data Visualization Rules

- Alert colors reserved for alert meanings only. Series use chromatic palette (non-blue, non-alert).
- Axes/labels: `text-base-dim`. Data values: monospace. Grid: `--color-base-6` at reduced opacity.
- Must be legible in both themes.

## VitePress Documentation

The documentation site uses VitePress with a fully custom theme — no default VitePress styles or layout. The custom theme lives in `docs/.vitepress/theme/` and uses AUX components and tokens for all rendering.

### Architecture

- **Custom theme** — `Layout.vue` is a port of the original `DocsLayout.vue` sidebar layout. All styling uses AUX tokens.
- **`@aux` alias** — VitePress config defines `@aux` → `src/` so docs can import library components and existing page components.
- **Component registration** — All AUX library components are registered globally in `theme/index.js` via `enhanceApp`, making them available directly in markdown.
- **`appearance: false`** — VitePress dark mode is disabled. AUX's `data-theme` attribute system manages themes via the `useTheme` composable.

### Content patterns

- **Prose pages** — Pure markdown (`.md`) with optional `<script setup>` for component imports
- **Component demo pages** — Markdown wrapping existing Vue page components: `<ButtonPage />`
- **Heavy interactive pages** — Token reference, gallery, identity pages are kept as Vue components and embedded via `<script setup>` import
- **Stub pages** — Markdown using `<Header>` and `<Section>` components with "Coming soon" content

### Adding new pages

1. Create a `.md` file in the appropriate `docs/` subdirectory
2. Add the entry to `docs/.vitepress/theme/useNav.js` in the correct section
3. For component demos, either write inline Vue in markdown or create a demo wrapper in `docs/.vitepress/theme/demos/`

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
- **Focus convention:** Buttons and standalone controls use the global `focus-visible` outline
  (2px solid, 2px offset). Form inputs use `focus-visible:ring-1` (inset box-shadow) + border
  color change — the inset ring avoids double-border with the input's existing border. Both
  approaches use `focus-visible` (keyboard only), never bare `focus`.
- **Docs page demos:** Interactive demos must use semantic interactive elements (`button`, `input`),
  not pointer-only containers (`div` with `cursor-pointer`). Every demo must be keyboard-reachable.

### Form Composition Patterns

Form components use Vue's `provide`/`inject` for context propagation — no prop drilling:

- **FormField** wraps any input with label, error message, and hint text. It `provide`s via `formFieldKey` (a Symbol): `fieldId`, `errorId`, `hintId`, `hasError`, `describedBy`. Child inputs `inject` this to connect `id`, `aria-describedby`, and error styling automatically.
- **RadioGroup** wraps Radio components. It `provide`s via `radioGroupKey`: shared `name`, `modelValue`, and `update` handler. Individual Radio components inject this to participate in the group.
- **Tabs** wraps Tab components via `tabsKey`: shared active tab state and selection handler.

Pattern: parent component calls `provide(symbolKey, reactiveContext)`, child calls `inject(symbolKey)`. Symbol keys live in `*Key.js` files alongside the parent component.

### Component Delivery Checklist

A component is not done until all of these are complete:

1. Component `.vue` file in the correct category folder (`core/`, `marketing/`, `application/`, `operational/`)
2. Export added to `src/components/index.js` (clean name) and `src/components/public.js` (`Aux`-prefixed)
3. Docs page created in `src/docs/pages/{Name}Page.vue`
4. Entry added to `src/docs/nav.js` in the correct category (route + nav link are generated automatically)
5. Works in both light and dark themes — tested visually
6. Keyboard accessible with `focus-visible` styles and appropriate ARIA
7. Formatted and lint-clean (`pnpm format && pnpm lint`)

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

## Commit Messages

Conventional Commits. Format: `type: short description`

Types: `feat` (new component/feature/page), `fix` (bug fix), `chore` (config/tooling/refactor), `docs` (documentation)

Rules: lowercase after colon, no period, present tense imperative, name the component/file, one concern per commit.

Examples: `feat: add Checkbox component and docs page`, `chore: rename PageHeader to Header`

## Governance

### Versioning

- Semver `0.x.y` while pre-1.0 — no stability guarantees yet
- **Patch** (`0.1.x`) — bug fixes, token corrections, doc typos
- **Minor** (`0.x.0`) — new components, new token scales, new docs pages
- Bump version in `package.json` on main after merge, as a standalone `chore: bump version to 0.x.y` commit

### What We Skip Until First Consumer

- No CHANGELOG, release notes, or release tooling
- No release branches — ship from main
- No library build mode or package exports — `private: true` stays
- These arrive when the first app consumes auxiliary-ds

## Publishing

- Published as npm package `auxiliary-ds`
- `src/` is the published package — build/export config not yet set up (`package.json` is currently `"private": true`)
- `src/docs/` is the documentation app — not published
- License: Apache 2.0
- Structured for future monorepo split into `@aux/tokens`, `@aux/icons`, `@aux/components`

## Gotchas

- Custom `base` and `blue` scales live in `src/tokens/colors/base.css` and `src/tokens/colors/blue.css`. They are custom Auterion scales — do not confuse them with Tailwind's built-in `blue`. The reset `--color-*: initial` in `style.css` wipes Tailwind's defaults before the scale files load.
- `style.css` must reset `--color-*: initial` in a `@theme` block BEFORE importing the color scale files, otherwise the reset wipes the scale variables.
- Dark mode uses `@custom-variant dark` mapped to `[data-theme="dark"]`. All `dark:` classes in the `@utility` definitions resolve via this selector.
- Tailwind v4 `@theme` uses a different scope than `:root` — referencing `var(--foo)` inside `@theme` where `--foo` is also defined in `@theme` creates a circular reference. Use literal values or reference variables from `:root` only.
- Borders and dividers use `border-base-dim` — never arbitrary opacity hacks
- No `@` path alias configured — always use relative imports (e.g. `../components/core/Foo.vue`)
