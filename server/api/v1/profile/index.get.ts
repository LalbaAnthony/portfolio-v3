import { profileService } from '~~/server/services/profile'

export default defineEventHandler(() => {
  const profile = profileService.get()
  if (!profile) throw createError({ statusCode: 404 })

  return { data: profile }
})
