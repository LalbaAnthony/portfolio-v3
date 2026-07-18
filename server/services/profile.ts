import type { Profile, ProfileSocial } from '~~/shared/types/profile'
import projectsData from '~~/server/data/profile.json'

const profile = projectsData as Profile

export function getProfile(): Profile | undefined {
  return profile
}

export function getProfileSocials(): ProfileSocial[] {
  return [...profile.socials]
}
