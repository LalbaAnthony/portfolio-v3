import { getProfile } from '~~/server/services/profile'

export default defineEventHandler(() => {
  const profile = getProfile()
  if (!profile) throw createError({ statusCode: 404 })

  return { data: profile }
})
