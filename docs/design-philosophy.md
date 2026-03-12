# Design Philosophy — AUX / Auterion Design System

The Auterion visual style is **functional authority** — it needs to look like it controls things that fly.

Every choice traces back to one tension: the product operates in high-stakes, real-time environments (drone operations, fleet management, mission planning), but it also needs to sell to enterprise buyers and defense procurement. The style has to feel simultaneously operational and premium.

**Dark-mode-first.** Not because it's trendy — because operators work in low-light environments (ground stations, field ops, vehicle interiors). Dark backgrounds reduce glare and eye strain during extended missions. Light mode exists for documentation and marketing contexts, but dark is the native state.

**Density over whitespace.** Aerospace interfaces pack information. The tight tracking, compact type scale, and restrained spacing all serve information density without feeling cramped. A dashboard showing 12 telemetry values needs to be scannable in a glance — generous whitespace is a luxury this domain can't afford.

**Color as signal, not decoration.** The semantic color system (alarm/warning/caution/ok) maps directly to aviation severity levels. Red means act now. Orange means act soon. Amber means be aware. Green means nominal. These aren't brand colors — they're borrowed from cockpit annunciators. The blue primary sits outside this severity spectrum so interactive elements never get confused with status indicators.

**Restraint as identity.** Three font weights. One typeface. No gradients. No decorative shadows. No rounded corners on data. The visual identity comes from what's removed, not what's added. This reads as confidence — the product doesn't need to perform visually because it performs operationally.

**Monospace as truth.** When data shifts from sans-serif to monospace, it signals: this is a real value from a real sensor. It's the typographic equivalent of switching from narration to direct quote. Coordinates, telemetry, timestamps, vehicle IDs — all monospace. Everything else — labels, descriptions, navigation — stays in Inter.

**One typeface, three weights.** Inter Variable does everything. No decorative fonts, no expressive choices. The restriction *is* the style. Adding a fourth weight creates visual noise. Visual noise slows decision-making. In aerospace, that matters.

**Negative tracking everywhere.** Every size in the scale pulls letters tighter than default. This is the single most distinctive trait of the AUX type style. It gives text a dense, engineered feel — the difference between "website" and "precision instrument." The tighter the tracking, the larger the size: -2% at body, -3% at headings, -4% at display.

**Numbers are first-class citizens.** Tabular figures are mandatory. Leading zeros are mandatory. Zero-padding on headings (045°) and mission time (01:23:45) is mandatory. In aerospace, 45 and 045 are different levels of ambiguity.

**Time and space are unambiguous.** 24-hour time. UTC storage. ISO 8601 in logs. Day-first display. Always-present altitude references (AGL / MSL / FL). No AM/PM. No bare altitude. No timezone guessing. No proportional figures in columns.

The overall effect is closer to Bloomberg Terminal or Garmin avionics than to a typical SaaS product. It says: this is a tool built by people who understand the domain, for people who work in it.
