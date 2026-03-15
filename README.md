# AUX — Auxiliary Design System

The official design system for [Auterion](https://auterion.com). A Vue 3 component library serving four UI contexts: core primitives, marketing, applications, and operations interfaces.

Built for products that control things that fly.

## Stack

- **Vue 3** — Composition API, `<script setup>`, no TypeScript
- **Vite 7** — bundler and dev server
- **Tailwind CSS v4** — CSS-first configuration via `@tailwindcss/vite`
- **Heroicons** — icon library (`@heroicons/vue`)
- **Inter Variable** + **IBM Plex Mono** — typefaces
- **Vitest** — unit testing
- **ESLint** + **Prettier** — linting and formatting

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:4747
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start dev server (port 4747) |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm lint` | Lint all files |
| `pnpm lint:fix` | Lint and auto-fix |
| `pnpm format` | Format source files with Prettier |
| `pnpm format:check` | Check formatting without writing |

A pre-commit hook runs `format` and `lint:fix` automatically on every commit.

## Components

36 core components and 3 composables, with a Radix Themes-inspired API adapted for Tailwind CSS.

### API conventions

- **Variants** — `solid`, `soft`, `surface`, `outline`, `ghost` (where applicable)
- **Sizes** — `sm`, `md`, `lg`, `xl` (Tailwind-native naming)
- **Colors** — `blue` (interactive) and `red` (destructive) via `color` prop
- **Icons** — slot-based with `data-slot="icon"`, not icon props
- **Composition** — `provide`/`inject` for form context (FormField, RadioGroup, ButtonGroup)

### Core (36)

Button, IconButton, ButtonGroup, Badge, Input, Select, Combobox, Textarea, Checkbox, CheckboxGroup, Radio, RadioGroup, Toggle, FormField, Alert, Dialog, Toast, ToastContainer, Popover, Tooltip, Dropdown (+ Item, Group, Separator), Tabs, Tab, Avatar, AvatarGroup, Spinner, Separator, Link, Kbd, Skeleton, Identicon, VisuallyHidden

**Composables:** `useToast`, `useTheme`, `useButtonVariants`

### Marketing (3)

Header, Hero, Section

### Applications & Operations

Planned — see the component roadmap for details.

## Color System

32 color scales defined CSS-first in `src/tokens/colors/`. Each scale provides 12-step light + dark variables and semantic utility classes that handle dark mode and interaction states automatically.

Key rules:

- **Blue is interactive-only** — never decorative
- **Alert colors are signal-only** — red (alarm), orange (warning), amber (caution), green (OK)
- Semantic classes first (`bg-blue-solid`, `border-base-dim`, `text-base-normal`)
- Everything on-system — no arbitrary values, no Tailwind defaults, no hardcoded hex

## Design Decisions

Functional authority — looks like it controls things that fly. Two typefaces, three weights, no decoration. Every visual element encodes meaning or it's removed.

See [docs/design-decisions.md](docs/design-decisions.md) for the full rationale.

## License

Apache 2.0
