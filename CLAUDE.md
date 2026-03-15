# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**auxiliary-ds (AUX)** is the official design system for Auterion — an aerospace company building autonomous drone swarm systems. AUX is an installable Vue 3 component library published as an npm package. It serves four distinct UI contexts: core primitives, marketing/brand, conventional applications UI, and aerospace mission-critical operations interfaces.

**The design language in one line: modern, relaxed IBM/Carbon.** Sharp but not rigid. Systematic but not cold. IBM's discipline with more air to breathe.

## Commands

- `pnpm install` — Install dependencies (also configures git hooks via `postinstall`)
- `pnpm dev` — Start dev server (port 4747)
- `pnpm build` — Production build
- `pnpm preview` — Preview production build locally
- `pnpm test` — Run all tests once (Vitest)
- `pnpm test:watch` — Run tests in watch mode
- `pnpm format` — Auto-format all source files with Prettier
- `pnpm lint` / `pnpm lint:fix` — Run ESLint / auto-fix

### Pre-commit Hook

A git pre-commit hook in `.githooks/pre-commit` auto-formats and lint-fixes on every commit. It blocks the commit only if lint errors remain after auto-fix. Activated by `git config core.hooksPath .githooks` (runs automatically via `postinstall`).

## Stack

- **Vue 3** — Composition API only, `<script setup>` syntax, no Options API, no TypeScript, no JSX
- **Vite 7** — bundler and dev server
- **Tailwind CSS v4** — CSS-first config via `@tailwindcss/vite`, no `tailwind.config.js`
- **Vue Router** — docs app navigation (`src/docs/nav.js` + `src/router/index.js`)
- **pnpm** — package manager, always use pnpm not npm or yarn
- **@heroicons/vue** — Icon library, import directly (e.g. `@heroicons/vue/20/outline`)
- **Vitest + @vue/test-utils + vitest-axe** — testing with accessibility assertions

## Folder Structure

```
src/
├── tokens/               ← CSS custom properties (32 color scales + 7 non-color files)
├── assets/logos/          ← Auterion brand SVGs
├── test/                  ← Test infrastructure (setup.js, helpers.js, mocks/)
├── components/
│   ├── core/             ← Primitives (35 components, shared across all contexts)
│   │   └── __tests__/    ← Component tests
│   ├── marketing/        ← Brand/website components (3 components)
│   ├── applications/     ← Conventional SaaS UI (planned)
│   └── operations/       ← Aerospace mission-critical UI (planned)
├── docs/                 ← Documentation app (not published)
│   ├── nav.js            ← Single source of truth for nav + routes
│   └── pages/            ← Component docs pages
├── style.css             ← Tailwind import + token imports
└── main.js
docs/                      ← Design docs (design-philosophy.md, references.md)
```

## Design Philosophy

See `docs/design-philosophy.md` for full rationale and decision framework. Core principle: **functional authority** — looks like it controls things that fly. No decoration. Every element encodes meaning or it's removed.

## Icons

Heroicons (`@heroicons/vue`). Size with `size-4`/`size-5`/`size-6`, color via `currentColor`.

- `16/solid` — micro icons (solid only)
- `20/outline` / `20/solid` — default UI
- `24/outline` / `24/solid` — feature/nav

## Branch Naming

Format: `prefix/weird-name` — Prefixes: `feature/`, `fix/`, `chore/`, `docs/`, `release/`

## Commit Messages

Conventional Commits: `type: short description`

Types: `feat`, `fix`, `chore`, `docs`. Lowercase after colon, no period, present tense imperative, name the component/file, one concern per commit.

## Governance

- Semver `0.x.y` while pre-1.0 — patch for fixes, minor for new components/features
- No CHANGELOG or release tooling until first consumer
- Published as npm package `auxiliary-ds` (currently `private: true`)
- License: Apache 2.0
- Future monorepo split: `@aux/tokens`, `@aux/icons`, `@aux/components`

## Gotchas

- Custom `base` and `blue` scales in `src/tokens/colors/` are custom Auterion scales — not Tailwind's built-in `blue`. The reset `--color-*: initial` in `style.css` wipes Tailwind defaults before loading.
- `style.css` must reset `--color-*: initial` in `@theme` BEFORE importing color scale files.
- Dark mode uses `@custom-variant dark` mapped to `[data-theme="dark"]`.
- Tailwind v4 `@theme` scoping: referencing `var(--foo)` inside `@theme` where `--foo` is also in `@theme` creates a circular reference. Use literal values or reference `:root` variables.
- Borders and dividers use `border-base-dim` — never arbitrary opacity hacks.
- No `@` path alias — always use relative imports (e.g. `../components/core/Foo.vue`).

## See Also

Detailed rules auto-load when you touch relevant files:

- `.claude/rules/components.md` — component rules, delivery checklist, form patterns, categories
- `.claude/rules/tokens.md` — token architecture, color system, typography, spacing, motion
- `.claude/rules/tests.md` — test conventions, helpers, test file structure
- `.claude/rules/docs-pages.md` — docs page layout, nav.js structure
- `.claude/rules/design-philosophy.md` — actionable design principles and decision framework
- `.claude/skills/aux-standard/SKILL.md` — full component design philosophy and visual hierarchy
