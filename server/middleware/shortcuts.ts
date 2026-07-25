import { shortcutService } from '~~/server/services/shortcut'

export default defineEventHandler((event) => {
  const path = event.path.replace(/^\//, '').split('?')[0]
  const url = path ? shortcutService.resolveUrl(path) : undefined

  if (url) return sendRedirect(event, url, 301)
})
