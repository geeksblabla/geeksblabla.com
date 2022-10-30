const { marked } = require("marked")
const { escape, unescape } = require("lodash")

const block = (text) => text + "\n"
const escapeBlock = (text) => escape(text) + "\n\n"
const line = (text) => text + "\n"
const inline = (text) => text
const newline = () => "\n"
const empty = () => ""

const link = (_0, _1, text) => `${text}: ${_0}`
const heading = (text) => `\n\n\n${text}\n-------------------------------- \n\n`

const TxtRenderer = {
  // Block elements
  heading: heading,
  code: escapeBlock,
  blockquote: block,
  html: empty,
  hr: newline,
  list: (text) => block(text.trim()),
  listitem: line,
  checkbox: empty,
  paragraph: block,
  table: (header, body) => line(header + body),
  tablerow: (text) => line(text.trim()),
  tablecell: (text) => text + " ",
  // Inline elements
  strong: inline,
  em: inline,
  codespan: inline,
  br: newline,
  del: inline,
  link: link,
  image: (_0, _1, text) => text,
  text: inline,
  // etc.
  options: {},
}

/**
 * return text content from markdown to make it ready for youtube description
 *
 *
 * @param {string} markdown markdown text
 */

const markdownToYTDescription = (markdown) => {
  const unmarked = marked(markdown, { renderer: TxtRenderer })
  const unescaped = unescape(unmarked)
  const trimmed = unescaped.trim()
  return trimmed
}

module.exports = markdownToYTDescription
