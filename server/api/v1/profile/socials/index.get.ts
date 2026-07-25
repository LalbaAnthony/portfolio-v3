import { profileService } from '~~/server/services/profile'

export default defineEventHandler(() => {
  const socials = profileService.getSocials()
  return { data: socials }
})
