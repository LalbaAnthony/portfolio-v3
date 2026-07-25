import shortcutsData from '~~/server/data/shortcuts.json'
import type { Shortcut } from '#shared/types/shortcut'
import { SHORTCUT_QUERY_TOKEN } from '#shared/types/shortcut'
import { safeDecode } from '#shared/utils/text'

const shortcuts = shortcutsData as Shortcut[]

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

function resolveDynamicAndQuery(path: string): { shortcut: Shortcut, query: string } | undefined {
  for (const shortcut of shortcuts) {
    if (isStatic(shortcut)) continue

    const match = path.match(buildMatcher(shortcut.fromPath))
    if (match) {
      const query = encodeURIComponent(safeDecode(match[1] ?? ''))
      return { shortcut, query }
    }
  }

  return undefined
}

function buildDynamicUrl(shortcut: Shortcut, query: string): string {
  return shortcut.toUrl.replaceAll(SHORTCUT_QUERY_TOKEN, query)
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
export function resolveUrl(path: string): string | undefined {
  const staticMatch = resolveStatic(path)
  if (staticMatch) {
    return staticMatch.toUrl
  }

  const dynamicMatch = resolveDynamicAndQuery(path)
  if (dynamicMatch) {
    const { shortcut, query } = dynamicMatch
    return buildDynamicUrl(shortcut, query)
  }

  return undefined
}
