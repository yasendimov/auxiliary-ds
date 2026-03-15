import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
})

/**
 * Renders a markdown string to HTML.
 */
export function renderMarkdown(source) {
  return md.render(source)
}
