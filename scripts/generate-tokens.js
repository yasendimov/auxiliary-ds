import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const radixDir = resolve(__dirname, '../node_modules/@radix-ui/colors')
const outFile = resolve(__dirname, '../src/tokens/colors.css')
const utilitiesOutFile = resolve(__dirname, '../src/tokens/color-utilities.css')

// ── Custom Auterion scales ──────────────────────────────────────────────────

const auterion = {
  base: {
    light: {
      1: '#fcfcfc', 2: '#f9f9f9', 3: '#f0f0f0', 4: '#e8e8e8',
      5: '#e1e1e1', 6: '#d9d9d9', 7: '#cecece', 8: '#bbbbbb',
      9: '#8c8c8c', 10: '#818181', 11: '#636363', 12: '#1f1f1f',
    },
    dark: {
      1: '#000000', 2: '#121212', 3: '#1f1f1f', 4: '#282828',
      5: '#303030', 6: '#3a3a3a', 7: '#474747', 8: '#606060',
      9: '#6d6d6d', 10: '#7a7a7a', 11: '#b3b3b3', 12: '#ffffff',
    },
  },
  blue: {
    light: {
      1: '#fcfdff', 2: '#f5f9ff', 3: '#eaf3ff', 4: '#daebff',
      5: '#c9e1ff', 6: '#b4d4ff', 7: '#9ac2ff', 8: '#74a9fc',
      9: '#1475ff', 10: '#0968ea', 11: '#0265e6', 12: '#0b3068',
    },
    dark: {
      1: '#03060b', 2: '#081120', 3: '#092249', 4: '#062d67',
      5: '#0e397b', 6: '#18468d', 7: '#2154a3', 8: '#2863c1',
      9: '#1475ff', 10: '#0067f0', 11: '#7fb6ff', 12: '#cde3ff',
    },
  },
}

// ── Radix scale lists ───────────────────────────────────────────────────────

const radixGrays = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand']

const radixChromatics = [
  'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet',
  'iris', 'indigo', 'cyan', 'teal', 'jade', 'green', 'grass',
  'brown', 'bronze', 'gold', 'yellow', 'amber', 'orange', 'sky', 'mint',
]

// ── Parse a Radix CSS file → { step: hex } ─────────────────────────────────

function parseRadixCSS(filePath) {
  const css = readFileSync(filePath, 'utf-8')
  const values = {}
  // Match only sRGB hex values from the first block (before @supports)
  const mainBlock = css.split('@supports')[0]
  const re = /--([\w-]+)-(\d+):\s*(#[0-9a-fA-F]{6});/g
  let m
  while ((m = re.exec(mainBlock))) {
    values[parseInt(m[2])] = m[3]
  }
  return values
}

// ── Build CSS variable declarations ─────────────────────────────────────────

function buildVars(name, values) {
  return Object.entries(values)
    .map(([step, hex]) => `  --${name}-${step}: ${hex};`)
    .join('\n')
}

// ── Generate ────────────────────────────────────────────────────────────────

let lightVars = ''
let darkVars = ''

// Auterion custom scales
for (const [name, scale] of Object.entries(auterion)) {
  lightVars += buildVars(name, scale.light) + '\n'
  darkVars += buildVars(name, scale.dark) + '\n'
}

// Radix grays
for (const name of radixGrays) {
  const light = parseRadixCSS(resolve(radixDir, `${name}.css`))
  const dark = parseRadixCSS(resolve(radixDir, `${name}-dark.css`))
  lightVars += buildVars(name, light) + '\n'
  darkVars += buildVars(name, dark) + '\n'
}

// Radix chromatics
for (const name of radixChromatics) {
  const light = parseRadixCSS(resolve(radixDir, `${name}.css`))
  const dark = parseRadixCSS(resolve(radixDir, `${name}-dark.css`))
  lightVars += buildVars(name, light) + '\n'
  darkVars += buildVars(name, dark) + '\n'
}

// ── Write output ────────────────────────────────────────────────────────────

const output = `/* ═══════════════════════════════════════════════════════════════════════════
   AUX Color Tokens — GENERATED FILE, DO NOT EDIT
   Run "pnpm generate-tokens" to regenerate from Radix + Auterion sources
   ═══════════════════════════════════════════════════════════════════════════ */

:root {
${lightVars.trimEnd()}
}

[data-theme="dark"] {
${darkVars.trimEnd()}
}
`

writeFileSync(outFile, output)
console.log('Generated', outFile)

// ── Semantic utility generation ──────────────────────────────────────────────

const allScales = [...Object.keys(auterion), ...radixGrays, ...radixChromatics]

function buildUtilities(name) {
  return `/* ${name} */
@utility bg-${name}-app { background-color: var(--${name}-1); }
@utility bg-${name}-subtle { background-color: var(--${name}-2); }
@utility bg-${name}-ui {
  background-color: var(--${name}-3);
  &:hover { background-color: var(--${name}-4); }
  &:active { background-color: var(--${name}-5); }
}
@utility bg-${name}-ghost {
  background-color: transparent;
  &:hover { background-color: var(--${name}-3); }
  &:active { background-color: var(--${name}-4); }
}
@utility bg-${name}-action {
  background-color: var(--${name}-4);
  &:hover { background-color: var(--${name}-5); }
  &:active { background-color: var(--${name}-6); }
}
@utility bg-${name}-solid {
  background-color: var(--${name}-9);
  &:hover { background-color: var(--${name}-10); }
}
@utility border-${name}-dim { border-color: var(--${name}-6); }
@utility border-${name}-normal {
  border-color: var(--${name}-7);
  &:hover { border-color: var(--${name}-8); }
}
@utility divide-${name}-dim { & > * + * { border-color: var(--${name}-6); } }
@utility divide-${name}-normal {
  & > * + * { border-color: var(--${name}-7); }
  &:hover > * + * { border-color: var(--${name}-8); }
}
@utility text-${name}-dim { color: var(--${name}-11); }
@utility text-${name}-normal { color: var(--${name}-12); }`
}

let utilitiesOutput = `/* ═══════════════════════════════════════════════════════════════════════════
   AUX Color Utilities — GENERATED FILE, DO NOT EDIT
   Run "pnpm generate-tokens" to regenerate from Radix + Auterion sources

   Every scale generates 12 semantic utilities:
     bg-{s}-app        step 1        Page background
     bg-{s}-subtle     step 2        Subtle / striped background
     bg-{s}-ui         steps 3→4→5   Interactive surface (hover + active)
     bg-{s}-ghost      ∅→3→4         Ghost pattern (transparent → hover → active)
     bg-{s}-action     steps 4→5→6   Selected/active surface (hover + active)
     bg-{s}-solid      steps 9→10    Solid fill with hover
     border-{s}-dim    step 6        Subtle border
     border-{s}-normal steps 7→8     UI border with hover
     divide-{s}-dim    step 6        Subtle divider
     divide-{s}-normal steps 7→8     UI divider with hover
     text-{s}-dim      step 11       Secondary text
     text-{s}-normal   step 12       Primary text
   ═══════════════════════════════════════════════════════════════════════════ */

`

for (const name of allScales) {
  utilitiesOutput += buildUtilities(name) + '\n\n'
}

writeFileSync(utilitiesOutFile, utilitiesOutput.trimEnd() + '\n')
console.log('Generated', utilitiesOutFile)
