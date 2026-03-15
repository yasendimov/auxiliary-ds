---
paths:
  - "src/components/**/*.vue"
---

# AUX Design Philosophy — Actionable Principles

Condensed from `docs/design-philosophy.md`. For full rationale and historical context, read the source doc.

## The One-Liner

**Modern, relaxed IBM/Carbon.** Sharp but not rigid. Systematic but not cold. IBM's discipline with more air to breathe.

## Six Principles

### 1. Theme-Aware, Not Theme-Prescribed

All themes are equal. A component must work across all themes. Test dark first (most common operator context), but never stop there. Token semantics — not primitive values — make this possible. Never hardcode a hex value.

### 2. Density Is Contextual

- **Operations** — maximum density. Every pixel carries data. Smallest padding tier, fixed sizes, zero decorative spacing.
- **Applications** — balanced density. Clear hierarchy for navigation, moderate density for productivity.
- **Marketing** — inverted density. Generous whitespace signals confidence. Largest spacing tier, expressive type scale.

A component belongs to exactly one context. That decision governs its density tier, motion budget, border treatment, and shadow use.

### 3. Color as Signal

Color encodes meaning. It is never decorative.

| Level | Color | Meaning |
|-------|-------|---------|
| Alarm | Red | Critical — act immediately |
| Warning | Orange | Degraded — act soon |
| Caution | Amber | Monitor — be aware |
| OK | Green | Nominal — no action |
| Info | Indigo | Informational — neutral |

**Blue is interactive-only.** Blue means "you can act on this." It sits outside the alert spectrum.

### 4. Restraint as Identity

For every visual element, ask: *what does this encode?* If the answer is "hierarchy" or "meaning," it stays. If the answer is "it looks nicer," it does not earn its place.

Three font weights. One typeface for language. One typeface for data. No gradients. No decorative shadows. No rounded corners on data-bearing elements.

### 5. Accessibility Is Structural

- **Applications:** WCAG AA minimum for all text and interactive elements.
- **Operations:** WCAG AAA for critical data (altitude, heading, speed, alert status).
- **Motion:** Respects `prefers-reduced-motion` unconditionally. Operations interfaces default to near-zero motion.
- **Focus:** Visible and consistent across all themes. Never suppressed.
- **Keyboard:** Every interactive component is fully operable without a pointer.

### 6. The Grid Is the Foundation

**Base unit: 4px.** All spacing, padding, sizing resolve to multiples of 4. An 11px margin is a bug.

The type scale is fixed — 13 steps from 12px to 128px. If a size doesn't exist, propose a new step — don't approximate.

## Design Decision Framework

When a design choice is unclear, apply in order:

1. **Which context?** Operations, applications, or marketing? → governs density, motion, radius, shadow
2. **Does it encode meaning?** If decorative, remove it
3. **Does it work across all themes?** If not, it's not finished
4. **Does it follow the grid?** Every measurement resolves to the base unit
5. **Is the color semantic?** Alert colors for alerts, blue for interactive, everything else from neutral/chromatic
6. **Would this survive in a cockpit?** For operations: if an operator under stress could misread it, it's wrong
7. **Is this the simplest version?** Remove one more thing. If it still works, the removed thing was not needed
