import { shortcutPathToUrl } from '~~/server/services/shortcut'

export default defineEventHandler((event) => {
  const path = event.path.replace(/^\//, '').split('?')[0]
  const url = path ? shortcutPathToUrl(path) : undefined

  if (url) return sendRedirect(event, url, 301)
})
