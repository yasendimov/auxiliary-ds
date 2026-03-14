# AUX — Auxiliary Design System

The official design system for Auterion. Vue 3 component library serving four UI contexts: core primitives, marketing, application, and aerospace mission-critical operational interfaces.

## Stack

- **Vue 3** — Composition API, `<script setup>`
- **Vite 7** — bundler and dev server
- **Tailwind CSS v4** — CSS-first configuration
- **Heroicons** — icon library
- **Inter Variable** + **IBM Plex Mono** — typefaces
- **ESLint** + **Prettier** — linting and formatting

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:4747
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm generate-tokens` | Regenerate color tokens from source scales |
| `pnpm lint` | Lint all `.vue` and `.js` files |
| `pnpm lint:fix` | Lint and auto-fix |
| `pnpm format` | Format source files with Prettier |
| `pnpm format:check` | Check formatting without writing |

## Design Decisions

Functional authority — looks like it controls things that fly. Two typefaces, three weights, no decoration. Every visual element encodes meaning or it's removed.

See [docs/design-decisions.md](docs/design-decisions.md) for the full rationale.
