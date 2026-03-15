---
paths:
  - "src/tokens/**/*.css"
---

# Token Architecture

Colors are defined CSS-first in `src/tokens/colors/`. Each of the 32 scale files uses native Tailwind v4 `@theme` to register raw CSS custom properties (`--color-{scale}-{step}`) and native `@utility` directives to define the 12 semantic classes. No JS plugin is involved.

**How it works:**

1. Each scale file defines 12-step light + dark variables in `@theme`
2. Each scale file defines 12 semantic `@utility` classes that bundle dark mode + interaction states via `@apply`
3. `style.css` resets Tailwind defaults with `--color-*: initial`, then imports all 32 scale files plus non-color tokens

**Rules:**

- Everything must be **on-system** — every color, size, duration, and radius must come from AUX tokens. No arbitrary values (`text-[13px]`, `duration-100`, `tracking-[0.15em]`), no Tailwind defaults, no hardcoded hex. If a token doesn't exist, flag it.

## Color System

- **Base scale** — Pure achromatic neutral (custom Auterion, no hue tint)
- **Blue scale** — Primary accent, #1475ff at step 9 (stable across themes)
- **Chromatic scales** — Full set for status and data visualization
- **Step 9 rule** — The accent fill (step 9) is always the same hex in both light and dark mode
- **Scale inversion** — In dark mode, step 1 is darkest, step 12 is lightest (opposite of light mode)

### Color rules

- **Blue is interactive-only** — blue means "you can act on this." Never use blue decoratively or for status
- **Alert colors are signal-only** — red/orange/amber/green carry operational meaning. Never use them decoratively
- **Semantic classes first** — always use `bg-{s}-ui`, `border-{s}-dim`, `text-{s}-normal` etc. over raw steps
- **Raw steps are edge cases** — accent borders, checked-state fills, focus ring colors. Always pair with `dark:` variant
- **Dark mode naming** — dark variants use `{scale}dark` suffix with no hyphen: `--color-reddark-9`, `bg-reddark-3`
- **No inline color styles** — all colors via Tailwind classes. Only exception: docs pages rendering dynamic token previews
- **Every component must work in both themes** — if you only tested one theme, it is not done

### Semantic utility classes

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

### Alert hierarchy (OpenBridge)

- **Alarm** — `red` scale, immediate action required
- **Warning** — `orange` scale, urgent attention needed
- **Caution** — `amber` scale, awareness required
- **OK** — `green` scale, normal state
- **Informational** — `indigo` scale, neutral information

## Theming

- All themes are equal — test dark first (most common operator context), but a component isn't done until it passes all themes
- Theme controlled via `data-theme` attribute on `<html>` element
- `data-theme="dark"` and `data-theme="light"` — currently supported
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
- `.type-overline` (11px) — special formatting class, no weight suffix, includes `text-transform: uppercase`
- No bare class names — always use the weight suffix (e.g., `type-body-r` not `type-body`)
- Tracking tightens as size increases: -2% body, -3% heading, -4% display
- Never use italic in operations interfaces
- Uppercase only for labels and overlines — never body text

## Spacing

Three page-level constants in `src/tokens/spacing.css`:

- `--spacing-page-x` (24px) → `px-page-x`
- `--spacing-page-y` (24px) → `py-page-y`
- `--spacing-section` (48px) → `gap-section`, `mb-section`

Everything else uses Tailwind's built-in spacing scale.

## Motion Budget

Tokens in `src/tokens/motion.css`:

- `--duration-instant` (80ms) — micro-interactions (toggles, checkboxes)
- `--duration-fast` (150ms) — UI feedback (hover, focus, state changes)
- `--duration-base` (220ms) — standard transitions (panels, dropdowns)
- `--duration-slow` (350ms) — entrances, overlays, page transitions

Easing: `--ease-snap` (snappy, exit-feel) and `--ease-glide` (smooth, enter-feel).

### Context budgets

- **Operations** — near-zero motion. Only `duration-instant` for state feedback.
- **Applications** — subtle, functional transitions. `duration-fast` to `duration-base`. No entrance animations.
- **Marketing** — expressive transitions allowed. `duration-base` to `duration-slow`. Entrance animations OK.

## Data Visualization

- Alert colors reserved for alert meanings only. Series use chromatic palette (non-blue, non-alert).
- Axes/labels: `text-base-dim`. Data values: monospace. Grid: `--color-base-6` at reduced opacity.
- Must be legible in both themes.
