import { resolveShortcut } from '~~/server/services/shortcut'

export default defineEventHandler((event) => {
  const key = event.path.replace(/^\//, '').split('?')[0]
  const url = key ? (resolveShortcut(key)?.url ?? undefined) : undefined

  if (url) return sendRedirect(event, url, 301)
})
