import { getProfileSocials } from '~~/server/services/profile'

export default defineEventHandler(() => {
  const socials = getProfileSocials()
  return { data: socials }
})
