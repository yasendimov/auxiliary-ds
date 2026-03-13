# AUX — Auxiliary Design System

The official design system for Auterion. Vue 3 component library serving four UI contexts: foundation primitives, marketing, application, and aerospace mission-critical operational interfaces.

## Stack

- **Vue 3** — Composition API, `<script setup>`
- **Vite 7** — bundler and dev server
- **Tailwind CSS v4** — CSS-first configuration
- **Heroicons** — icon library
- **Inter Variable** + **IBM Plex Mono** — typefaces

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:4747
```

## Commands

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm generate-tokens` | Regenerate color tokens from Radix + Auterion sources |

## Design Philosophy

Functional authority — looks like it controls things that fly. Two typefaces, three weights, no decoration. Every visual element encodes meaning or it's removed.

See [docs/design-philosophy.md](docs/design-philosophy.md) for the full rationale.

