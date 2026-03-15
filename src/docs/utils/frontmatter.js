/**
 * Parses YAML frontmatter from a raw markdown string.
 * Splits on `---` delimiters and extracts key: value pairs.
 * Returns { attributes: Object, body: String }.
 */
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { attributes: {}, body: raw }

  const attributes = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    attributes[key] = value
  }

  return { attributes, body: match[2] }
}
