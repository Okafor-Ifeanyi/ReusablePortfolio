export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '...'
}

/** Splits a multi-line field into trimmed, non-empty lines. */
export function splitLines(text: string | null | undefined): string[] {
  if (!text) return []
  return text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
}

const MONTHS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
]

/**
 * Pulls a sortable start date out of a free-text duration such as
 * "Mar 2024 - Mar 2026", "March 2024 – Present" or "2024".
 * Returns null when there's nothing parseable to sort on.
 */
export function durationStartTime(duration: string | null | undefined): number | null {
  if (!duration) return null

  // Everything before the range separator is the start
  const start = duration.split(/\s*(?:[–—-]|\bto\b)\s*/i)[0]?.trim()
  if (!start) return null

  const match = start.match(/^(?:([A-Za-z]{3,9})\.?\s+)?(\d{4})$/)
  if (!match) return null

  const [, monthName, year] = match
  const month = monthName ? MONTHS.indexOf(monthName.slice(0, 3).toLowerCase()) : 0
  if (month < 0) return null

  return Date.UTC(Number(year), month, 1)
}

/**
 * Orders projects oldest-first along their timeline. Entries with no parseable
 * duration keep their existing relative order and sit at the end, so a project
 * that simply hasn't been dated yet doesn't jump to the front.
 */
export function sortByTimeline<T extends { duration: string | null }>(items: T[]): T[] {
  return items
    .map((item, index) => ({ item, index, time: durationStartTime(item.duration) }))
    .sort((a, b) => {
      if (a.time === null && b.time === null) return a.index - b.index
      if (a.time === null) return 1
      if (b.time === null) return -1
      return a.time - b.time || a.index - b.index
    })
    .map(({ item }) => item)
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
