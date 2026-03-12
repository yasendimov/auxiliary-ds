# Typography Style — Auterion Design System

## Design Philosophy

Auterion's typographic style is **Swiss precision applied to aerospace**. Every rule exists because someone might be reading it during a live mission. The aesthetic is not decorative — it is the result of eliminating ambiguity under pressure.

---

## Core Principles

### One Typeface, Three Weights

Inter Variable does everything. No decorative fonts, no expressive choices. The restriction *is* the style.

- **SemiBold (600)** — Hierarchy. Titles, headings, navigation, data values.
- **Medium (500)** — Structure. Labels, tabs, breadcrumbs, table headers.
- **Regular (400)** — Content. Body text, descriptions, captions, help text.

Adding a fourth weight creates visual noise. Visual noise slows decision-making. In aerospace, that matters.

### Negative Tracking Everywhere

Every size in the scale pulls letters tighter than default. This is the single most distinctive trait of the Auterion type style. It gives text a dense, engineered feel — the difference between "website" and "precision instrument."

The tighter the tracking, the larger the size: -2% at body, -3% at headings, -4% at display. Text feels machined, not typeset.

### Monospace as Semantic Signal

JetBrains Mono is not just for code. It marks anything that is a **value** — coordinates, serial numbers, callsigns, timestamps, telemetry readouts. When you see monospace, you know it's data you might need to read back, compare, or act on.

This creates a visual type system on top of the typographic one: sans-serif is language, monospace is data.

### Numbers Are First-Class Citizens

Tabular figures are mandatory. Leading zeros are mandatory. Zero-padding on headings (`045°`) and mission time (`01:23:45`) is mandatory.

In aerospace, `45` and `045` are different levels of ambiguity. The formatting rules treat numbers with the same rigor as code style — because in this domain, they are operational data.

### Time and Space Are Unambiguous

24-hour time. UTC storage. ISO 8601 in logs. Day-first display. Always-present altitude references (AGL / MSL / FL). Every rule eliminates a class of misreading.

No AM/PM. No bare altitude. No timezone guessing. No proportional figures in columns.

---

## The Aesthetic in One Line

**Technical minimalism with aerospace discipline** — tight, restrained, monospaced where it matters, and hostile to ambiguity.

---

## Influences

- **Swiss International Style** — Grid discipline, sans-serif purity, content over decoration.
- **Aviation instrumentation** — Zero-padded numerals, qualified units, monospace readouts.
- **Engineering documentation** — Precision over personality, consistency over expression.

The result is typography that looks like it belongs on a heads-up display, not a marketing site — even when it is on a marketing site.
