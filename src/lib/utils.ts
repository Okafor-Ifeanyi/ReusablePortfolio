export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '...'
}

/**
 * Turns a Cloudinary URL into one that downloads rather than opens in a tab.
 * The HTML `download` attribute is ignored cross-origin, so the browser needs
 * Cloudinary to send `Content-Disposition: attachment` — which `fl_attachment`
 * does. Non-Cloudinary URLs (a user-pasted link) are returned untouched.
 */
export function toDownloadUrl(url: string): string {
  if (!url.includes('res.cloudinary.com') || url.includes('/fl_attachment')) return url
  return url.replace('/upload/', '/upload/fl_attachment/')
}

/** Leading list marker the user may have typed themselves: "- ", "• ", "1. ", "2) " */
const LIST_MARKER = /^\s*(?:[-*•·–—]\s*|\d+[.)]\s+)/

/**
 * Splits a free-text field (one point per line) into bullet points,
 * stripping any list markers the user typed so we don't render them twice.
 */
export function toBulletPoints(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(LIST_MARKER, '').trim())
    .filter(Boolean)
}
