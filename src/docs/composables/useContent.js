import { parseFrontmatter } from '../utils/frontmatter.js'
import { renderMarkdown } from '../utils/markdown.js'

/**
 * Parses a raw markdown string (imported via ?raw) into
 * frontmatter attributes and rendered HTML.
 *
 * @param {string} rawImport — raw markdown string from Vite ?raw import
 * @returns {{ meta: Object, html: string }}
 */
export function useContent(rawImport) {
  const { attributes, body } = parseFrontmatter(rawImport)
  const html = renderMarkdown(body)
  return { meta: attributes, html }
}
