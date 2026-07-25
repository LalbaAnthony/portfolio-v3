import shortcutsData from '../data/shortcuts.json'
import type { Shortcut } from '#shared/types/shortcut'
import { SHORTCUT_QUERY_TOKEN } from '#shared/types/shortcut'

const shortcuts = shortcutsData as Shortcut[]

// Placeholder token used in `fromPath` (dynamic segment) and `toUrl` (injection point).

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Turns a `fromPath` pattern into an anchored regex, `%q` becoming a capture group.
function buildMatcher(fromPath: string): RegExp {
  const pattern = fromPath.split(SHORTCUT_QUERY_TOKEN).map(escapeRegExp).join('(.+)')
  return new RegExp(`^${pattern}$`)
}

function isStatic(shortcut: Shortcut): boolean {
  return !shortcut.fromPath.includes(SHORTCUT_QUERY_TOKEN)
}

function resolveStatic(path: string): Shortcut | undefined {
  return shortcuts.find(s => isStatic(s) && s.fromPath === path)
}

function resolveDynamic(path: string): { shortcut: Shortcut, match: RegExpMatchArray } | undefined {
  for (const shortcut of shortcuts) {
    if (isStatic(shortcut)) continue

    const match = path.match(buildMatcher(shortcut.fromPath))
    if (match) return { shortcut, match }
  }

  return undefined
}

/**
 * Resolves an incoming path (no leading slash, no query string) to a destination URL.
 *
 * - Static shortcuts match `fromPath` exactly: `gh` -> `toUrl`.
 * - Dynamic shortcuts use `%q` in `fromPath` to capture a segment: `ghs/test`
 *   matched against `ghs/%q` captures `test`, which is injected in place of the
 *   `%q` token(s) in `toUrl` (URL-encoded for query usage).
 *
 * Static matches take precedence over dynamic ones.
 */
export function shortcutPathToUrl(path: string): string | undefined {
  const staticMatch = resolveStatic(path)
  if (staticMatch) {
    return staticMatch.toUrl
  }

  const dynamicMatch = resolveDynamic(path)
  if (dynamicMatch) {
    const { shortcut, match } = dynamicMatch
    const query = encodeURIComponent(safeDecode(match[1] ?? ''))
    return shortcut.toUrl.split(SHORTCUT_QUERY_TOKEN).join(query)
  }

  return undefined
}
