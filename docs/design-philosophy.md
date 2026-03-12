# Design Philosophy — AUX

> *This is the single source of truth for why AUX looks and behaves the way it does. Every token, component, and pattern in the system traces back to a principle here. When a design decision is unclear, read this first.*

---

## The Core Tension

Auterion builds autonomous systems for aerospace and defense. The same platform powers a mission operator tracking five drones in real time and a procurement executive evaluating the product in a boardroom. A ground station operator needs density, precision, and zero ambiguity. A buyer needs to feel that this product is built by people who understand the domain. A website visitor needs to understand in five seconds what Auterion does and why it matters.

Most design systems serve one of these audiences. AUX serves all three through a single token foundation and three clearly defined contexts — **operational**, **application**, and **marketing** — each expressing the same principles at different densities, for different stakes.

The unifying quality is **functional authority**. AUX looks like it controls things that fly — even when it is selling to someone who has never seen a drone.

---

## Foundations

### Zurich Precision

Auterion is a Zurich-based company. This is not incidental to the design language — it is central to it.

The Swiss International Style (Internationale Typographische Stil) established that constraint produces clarity. Grid discipline. Typographic hierarchy without decoration. Content over form. Mathematical spacing systems. The rejection of ornament in favor of structure.

AUX inherits this tradition directly. The 4px base grid governs all spatial decisions. Typography follows a fixed scale with no interpolation. Spacing is systematic, not arbitrary. Every measurement is a deliberate choice, not an approximation. The grid is not a suggestion — it is the substrate on which everything is built.

Where Swiss design used Helvetica and Univers, AUX uses Inter Variable — a typeface designed for screens with the same commitment to neutrality and legibility. Where Swiss designers used the baseline grid to create vertical rhythm in print, AUX uses it to align telemetry values in a ground control station.

The connection is functional, not aesthetic. Swiss design succeeded because it eliminated ambiguity. In aerospace, eliminating ambiguity saves lives.

### Aerospace Discipline

AUX borrows directly from aviation instrumentation and human factors research — not as visual references, but as operational requirements.

**From Garmin avionics and cockpit annunciator design:**
- Every value is qualified with its reference frame (AGL, MSL, FL)
- Leading zeros eliminate misreading (`045°` not `45°`)
- Fixed-layout instruments do not reflow or resize
- Alert hierarchy uses color to encode severity, never decoration

**From OpenBridge (maritime/industrial operational design):**
- Safety-first interface patterns where operator error carries real consequences
- Standardized UI reduces training costs and cross-system cognitive load
- Components designed for fatigue resistance over extended watch periods
- Regulatory alignment built in, not retrofitted

**From military human factors standards (MIL-STD-1472, referenced):**
- Number formatting, time display, and altitude rules based on decades of research into errors under pressure
- These are not style preferences. They are the documented result of what causes humans to misread data in high-stakes environments

> **Standards roadmap:** Full compliance audit against MIL-STD-1472, NATO STANAG HMI guidelines, and EU EASA human factors requirements is planned. These standards will formalize rules that AUX already follows by convention. Until the audit is complete, the principles in this document govern.

---

## Principles

### 1. Theme-Aware, Not Theme-Prescribed

AUX ships multiple themes: **Light**, **Dark**, **Dark Pro**, and **High Contrast**. No single theme is the default — the system respects the user's OS preference and allows explicit override. The choice persists.

Operators work in low-light environments where dark themes reduce glare. Enterprise buyers review products in bright offices where light themes are more legible. Defense procurement may require high contrast. Dark Pro provides maximum information density with optimized contrast ratios for professional monitoring environments. A design system that prescribes one correct theme has already failed half its users.

What this means in practice: **every component must be validated across all themes.** A design that only looks correct in dark mode is not finished. Token semantics — not primitive values — are what make this possible. Never hardcode a hex value. Always use a semantic token.

### 2. Density Is Contextual

Density is the most important variable in AUX, and it is entirely context-dependent.

**Operational** — density is mandatory. Twelve telemetry values must be scannable in a single glance. Every pixel of whitespace is a pixel that could carry data. Components use the smallest padding tier, fixed sizes, and zero decorative spacing. This is Bloomberg Terminal territory — the interface exists to display maximum information with minimum eye movement.

**Application** — density is balanced. Users spend hours in fleet management, mission planning, and settings interfaces. They need enough structure to navigate without fatigue and enough density to stay productive. This follows the same philosophy as Vercel's Geist system: clarity through consistent hierarchy, efficient input mechanisms, and information density that never overwhelms.

**Marketing** — density is inverted. Generous whitespace signals confidence. A landing page with tight, information-dense layout looks anxious — it tries too hard. Marketing contexts use the largest spacing tier, the most expressive typographic scale, and give content room to breathe. The editorial pacing of a well-designed brand site (the rhythm of image, type, and space) is the reference here.

A component belongs to exactly one context. That decision governs its density tier, motion budget, border treatment, and shadow use. If a component appears to work across all three contexts, it is underspecified.

### 3. Color as Signal

Color in AUX encodes meaning. It is never decorative.

The four alert levels map directly to aviation annunciator conventions:

| Level | Color | Meaning | Action |
|---|---|---|---|
| **Alarm** | Red | Critical failure | Act immediately |
| **Warning** | Orange | Degraded state | Act soon |
| **Caution** | Amber | Requires monitoring | Be aware |
| **OK** | Green | Nominal | No action needed |

These are not brand colors. They are not available for UI affordances, decorative accents, or emphasis. Red does not mean "delete." Green does not mean "generic success." In AUX, these colors carry operational weight. Misusing them trains operators to ignore them — and in aerospace, that is a safety failure.

**Blue is reserved exclusively for interactive elements.** Blue means: you can act on this. It sits outside the alert spectrum so interactive affordances never compete with status indicators. This boundary is what makes dense interfaces legible.

Every other chromatic use — data visualization, category encoding, state differentiation — draws from the non-blue, non-alert palette and must be validated for sufficient contrast across all themes.

### 4. Restraint as Identity

The visual identity of AUX comes from what is removed, not what is added.

Three font weights. One typeface for language. One typeface for data. No gradients. No decorative shadows. No rounded corners on data-bearing elements. No illustrations as decoration. No icons used ornamentally.

For every visual element, the test is: *what does this encode?* If the answer is "hierarchy" or "meaning," it stays. If the answer is "it looks nicer," it does not earn its place.

This is not minimalism as aesthetic preference. It is the result of designing for environments where visual noise has operational cost. A gradient on a button is a decision the operator's eye has to process. A decorative shadow on a telemetry card competes with the data inside it. In application and operational contexts, every visual element must justify its existence.

The corollary: **restraint is contextual.** Marketing interfaces operate under different stakes. They can use the full typographic scale, generous spacing, expressive layout, and considered composition — because marketing is read, not operated. The discipline is in knowing which context you are designing for.

### 5. Accessibility Is Structural

Accessibility in AUX is an engineering requirement, not a post-hoc audit.

**Application interfaces:** WCAG AA minimum for all text and interactive elements.

**Operational interfaces:** WCAG AAA for critical data — altitude, heading, speed, alert status. A pilot reading these values cannot afford a contrast failure. Text on alert backgrounds (`alarm-content` on `alarm-subtle`, etc.) must meet AAA in every theme.

**High Contrast theme:** Not generated by bumping contrast values. It is a deliberately designed theme that eliminates decorative color and maximizes signal-to-noise for users who need it.

**Motion:** Respects `prefers-reduced-motion` unconditionally. Every animation has a zero-motion fallback. Operational interfaces default to near-zero motion even without the preference — a telemetry value that pulses while the operator is deciding is a liability.

**Focus states:** Visible and consistent across all themes via `--color-line-focus`. Never suppressed.

**Keyboard navigation:** Every interactive component is fully operable without a pointer. Tab order follows visual hierarchy. Focus traps are used only in modals and dialogs.

### 6. The Grid Is the Foundation

All spatial decisions in AUX derive from a base grid. This is borrowed directly from the Swiss tradition and the numeric precision of Area 17's design methodology — every measurement is intentional, never arbitrary.

**The base unit is 4px.** All spacing, padding, sizing, and positioning resolve to multiples of 4. This is not a guideline — it is a constraint. An 11px margin is a bug.

**The type scale is fixed.** Thirteen steps from 12px to 128px, mapping 1:1 to Figma. No interpolation. If a size is needed that does not exist in the scale, the correct action is to propose a new step — not to approximate.

**The column grid is context-dependent:**
- Operational: Fixed column layouts tuned to specific hardware resolutions
- Application: 12-column fluid grid with defined breakpoints
- Marketing: 12-column grid with wider gutters and more generous margins

Pixel-level precision matters. A component that is "close enough" to the grid is not on the grid. Snap to pixel is mandatory. Half-pixel values are only acceptable for stroke centering.

---

## Typography

AUX typography is Swiss precision applied to aerospace. Every rule exists because someone might be reading this text during a live mission.

### Two Typefaces, Strict Roles

**Inter Variable** — all language. UI copy, navigation, headings, descriptions, labels, body text. One typeface for everything that is written by humans for humans.

**JetBrains Mono** — all data. Coordinates, telemetry, timestamps, vehicle IDs, serial numbers, callsigns, version strings, token names. When text switches to monospace, it signals: *this value came from a sensor or system, not from a person.* It is data you might need to read back, compare, or act on.

This typographic split is semantic, not decorative. Sans-serif is language. Monospace is truth. A trained operator reads the typeface as metadata about the content.

### Three Weights Only

- **SemiBold (600)** — hierarchy: titles, headings, navigation labels, emphasized data values
- **Medium (500)** — structure: labels, tabs, breadcrumbs, table headers, metadata
- **Regular (400)** — content: body text, descriptions, captions, help text

No Bold. No Light. No Thin. Adding a fourth weight creates visual noise. Visual noise slows decision-making. The restriction is the style.

### Negative Tracking

Every size in the AUX type scale uses tighter letter-spacing than the typeface default. This is the single most distinctive trait of the AUX visual language. It gives text a machined, precision-instrument quality — the difference between "website" and "ground control station."

| Context | Tracking | Sizes |
|---|---|---|
| Display | −4% | Hero, Display |
| Headings | −3% | Page-lg, Page, Heading |
| Section titles | −2.5% | Section, Title |
| Body | −2% | Body, Secondary |
| UI labels | −1% | Label, Caption |
| Overlines | +6% (wide) | Overline, metadata eyebrows |

The inversion at overline size is intentional. Wide tracking on small uppercase text signals metadata — it is structural markup, not content. This is the only place in AUX where tracking is positive.

### Numbers as First-Class Citizens

Tabular figures are mandatory across both typefaces. Proportional figures are never used in data contexts — a column of altitudes that shifts horizontally due to varying digit widths is an error.

Leading zeros are mandatory: `045°`, not `45°`. `007`, not `7`. Zero-padding eliminates a class of misreading that matters when the difference between `45` and `045` is the difference between a heading and a bearing.

OpenType features enabled by default: `tnum` (tabular figures), `ss01`, `cv02`, `cv03`, `cv04` (Inter stylistic alternates for maximum legibility at small sizes).

---

## Data Formatting

These rules are not style preferences. They are operational requirements with the same rigor as code conventions.

### Time
- 24-hour format, always. No AM/PM.
- UTC for storage and APIs.
- ISO 8601 for logs: `2026-03-12T14:30:00Z`
- Day-first for display: `12 Mar 2026`, not `Mar 12, 2026`
- Always include timezone context when displaying to users across regions.
- Mission elapsed time: `01:23:45`, zero-padded.

### Altitude and Position
- Always qualified: `1200m AGL`, `FL350`, `1200m MSL`. Never bare `1200m`.
- Coordinates in decimal degrees with consistent precision: `47.3769° N, 8.5417° E`
- Speed with reference: `45 kn GS`, `12 m/s TAS`

### Units
- Unit abbreviation always follows the value with a space: `120 m`, `45 kn`, `18°C`
- Degree symbol is an exception — no space: `045°`, `18°C`
- Reference frame is part of the value, not optional metadata

A component that displays altitude without a reference frame or time in 12-hour format is incorrect, regardless of how it looks.

---

## Context Model

### Operational

Ground control stations, instrument panels, telemetry displays, map overlays, mission timelines.

**Philosophy:** These are instruments, not interfaces. They display what they display at the size they are, without animation or adaptation. An altitude readout does not have a hover state. It shows the altitude. The reference is Garmin avionics — qualification on every value, fixed layout, zero ornamentation. OpenBridge's safety-first patterns apply here: consistency reduces training time, and predictable layouts reduce errors under fatigue.

| Property | Value |
|---|---|
| Padding | `p-1.5` / `p-2` |
| Gap | `gap-1` / `gap-1.5` |
| Border radius | `rounded-instrument` (2px) or none |
| Motion | `duration-instant` (80ms) only |
| Shadows | None |
| Responsive | No — fixed layout for defined hardware |
| Typography | Fixed sizes, never fluid |
| Corners on data | Never rounded |

### Application

Fleet management, mission planning, settings, dashboards, user management, analytics.

**Philosophy:** These are workday tools. Users spend hours in them. They need clear hierarchy for navigation, moderate density for productivity, and purposeful motion to orient spatial transitions. The reference is Geist — consistent component behavior, accessible color hierarchy, efficient data display without overwhelming the user. Every component has clear states: default, hover, active, focused, disabled.

| Property | Value |
|---|---|
| Padding | `p-3` / `p-4` |
| Gap | `gap-2` / `gap-3` |
| Border radius | `rounded-panel` (4px) / `rounded-card` (6px) |
| Motion | `duration-fast` (150ms) to `duration-base` (220ms), `ease-snap` |
| Shadows | `shadow-panel` for elevated surfaces |
| Responsive | Viewport-adaptive (collapse, reflow, simplify) |
| Typography | Scales with viewport within defined steps |

### Marketing

Product landing pages, documentation, public-facing content, investor materials.

**Philosophy:** These are read, not operated. The editorial quality of layout, the rhythm of type and space, and the confidence of generous margins — this is where AUX earns its premium positioning. The reference is the structured brand storytelling of agencies like Area 17 and the marketing density of DevRev's standard — strong typographic hierarchy, systematic section rhythm, and content that breathes without feeling empty.

| Property | Value |
|---|---|
| Padding | `p-6` / `p-8` / `p-12` |
| Gap | `gap-4` / `gap-8` |
| Border radius | `rounded-card` (6px) ceiling |
| Motion | `duration-base` (220ms) to `duration-slow` (350ms), `ease-glide` |
| Shadows | `shadow-panel` / `shadow-overlay` where structurally needed |
| Responsive | Fully responsive, mobile as first-class target |
| Typography | Fluid within the type scale, large sizes permitted |

---

## Motion

Motion is a cost, not a feature. Every transition consumes operator attention. In operational contexts, attention is the scarcest resource.

**Operational:** State changes are instant. A telemetry value updates — it does not fade in. An alert escalating from caution to alarm switches — it does not animate. The only permitted motion is `duration-instant` (80ms) for binary state changes.

**Application:** UI chrome transitions purposefully. Dropdowns open, panels slide, modals appear. These transitions orient the user spatially. They use `duration-fast` or `duration-base` with `ease-snap`. They never overshoot, bounce, or use spring physics.

**Marketing:** Scroll reveals and page transitions can breathe. They use `duration-slow` with `ease-glide`. The maximum translate for any reveal animation is 14px — subtle by design. These transitions are editorial, not decorative.

**`prefers-reduced-motion` is respected unconditionally.** Every animated element falls back to an instant state change. This is not optional.

---

## Responsive Philosophy

**Operational interfaces are not responsive.** They are built for defined hardware — specific ground station monitors, specific tablet resolutions. Adapting them to arbitrary viewports would compromise layout precision. If a ground control UI needs to work on a phone, it is a different interface, not a responsive version.

**Application interfaces are viewport-adaptive.** Navigation collapses, panels reflow, tables simplify. Density rules still apply — the mobile version is still dense, not generous. The 12-column grid compresses but the information architecture does not fundamentally change.

**Marketing interfaces are fully responsive.** Fluid typography, collapsing grids, progressive disclosure. These are the only AUX interfaces where mobile is a first-class use case.

---

## Layout Patterns

### The Hairline Grid

The canonical AUX structural divider is a 1px gap in a CSS grid, with the parent set to a darker surface. The gap exposes the parent, creating a hairline that reads as structure rather than decoration.

```html
<div class="grid grid-cols-4 gap-y-px bg-surface-3">
  <div class="bg-page p-8">...</div>
  <div class="bg-page p-8">...</div>
</div>
```

This replaces `border-b`, `divide-y`, and `<hr>` for structural layout.

### Numbered Sections

Content sections are indexed in two-digit monospace: `01`, `02`, `03`. This gives interfaces a table-of-contents quality and reinforces the engineering aesthetic. Numbers use `text-content-dim` — structural markers, not content. Em-dash `—` replaces numbers for non-sequential items.

### Metadata Pattern

Version strings, section eyebrows, and meta labels follow one pattern: monospace, `text-xs`, `tracking-[0.2em]`, uppercase, `text-content-dim`. The wide tracking (positive, inverted from the standard negative) signals: this is metadata about the content, not the content itself.

---

## Iconography

Icons in AUX are monochromatic and inherit `currentColor`. They never have hardcoded fills, strokes, or multi-color treatments.

- Optical size: 16px for UI, 20px for navigation, 24px for feature callouts
- Stroke weight: 1.5px, consistent across the set
- Style: outlined, geometric, minimal detail — legible at small sizes in dense layouts
- Never used decoratively — every icon encodes a specific action or object
- Operational icons (alert indicators, vehicle status) must be unambiguous at 16px on all themes

---

## Imagery and Data Visualization

### Photography

AUX uses photography sparingly and only in marketing context. Images show real operations — real drones, real operators, real environments. No stock photography. No staged scenarios. No illustrated metaphors.

When photography is used:
- Full-bleed or contained within the grid — never floating with decorative borders
- Desaturated slightly to maintain harmony with the neutral-dominant palette
- Never overlaid with gradients or color washes

### Data Visualization

Charts, graphs, and maps follow the same color-as-signal principle:
- Alert colors are reserved for their alert meanings — a red line on a chart means alarm-level data
- Series differentiation uses the chromatic palette (non-blue, non-alert hues)
- Axes and labels use `text-content-dim`, values use monospace
- Grid lines use `--color-line` at reduced opacity — never competing with data
- Every chart must be legible in all four themes

---

## Design Decision Framework

When a design choice is unclear, apply these questions in order:

1. **Which context is this?** Operational, application, or marketing? The answer governs density, motion, radius, and shadow.
2. **Does this element encode meaning?** If yes, it stays. If it is purely decorative, remove it.
3. **Does this work across all themes?** Test light, dark, dark pro, and high contrast. If it fails in any theme, it is not finished.
4. **Does this follow the grid?** Every measurement should resolve to the base unit. If it does not, justify why.
5. **Is the color semantic?** Alert colors for alerts only. Blue for interactive only. Everything else from the neutral or chromatic palette.
6. **Would this survive in a cockpit?** For operational components: if an operator under stress could misread this, it is wrong.
7. **Is this the simplest version?** Remove one more thing. If it still works, the removed thing was not needed.

---

## Influences

These are not aesthetic references. They are functional lineages.

**Swiss International Style (Müller-Brockmann, Hofmann, Ruder)** — The philosophical foundation. Grid as organizing principle. Typography as the primary design tool. Constraint as creative method. Auterion is a Zurich company — this tradition is not borrowed, it is inherited.

**Garmin avionics** — The operational reference. Value qualification, zero-padding, fixed-layout precision, and an alert hierarchy that has been proven in thousands of cockpits. AUX does not reinvent these conventions — it adopts them.

**OpenBridge Design System** — The safety reference. Open-source operational interface patterns for maritime and industrial workplaces, designed to reduce human error in high-consequence environments. AUX applies the same principles to aerospace.

**Vercel Geist** — The application reference. Systematic component design, accessible color hierarchy, developer-grade precision in token architecture. The standard for modern SaaS application UI.

**Area 17** — The craft reference. Numeric precision in design methodology, pixel-level attention to rendering, and the discipline of working within mathematical systems. The 5px grid methodology maps directly to AUX's 4px base unit philosophy.

**Bloomberg Terminal** — The density reference. Monospace data, color encoding meaning, interface designed for people who cannot afford to misread it. The proof that density and usability are not opposites.

**MIL-STD-1472 and related standards** — The regulatory reference. Number formatting, time display, and altitude rules based on decades of human factors research. These are not opinions — they are the documented result of what causes errors under pressure. Full compliance audit is on the roadmap.

---

## What AUX Is Not

- AUX is not a generic component library with an aerospace skin
- AUX is not dark-mode-only or dark-mode-first — it is theme-aware
- AUX is not minimalist for aesthetic reasons — it is restrained for operational ones
- AUX is not a single-density system — density varies by context
- AUX is not responsive everywhere — operational interfaces are fixed-layout by design
- AUX does not use color for decoration — ever
- AUX does not prioritize visual trends over functional clarity

AUX earns trust the same way its influences have: by being precise, consistent, and impossible to misread.

---

*Maintained by the AUX design team. Zurich.*
