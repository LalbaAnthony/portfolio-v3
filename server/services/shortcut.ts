import shortcutsData from '../data/shortcuts.json'
import type { Shortcut } from '#shared/types/shortcut'

const shortcuts = shortcutsData as Shortcut[]

export function resolveShortcut(key: string): Shortcut | undefined {
  return shortcuts.find(s => s.key === key)
}
