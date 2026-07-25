import type { Profile, ProfileSocial } from '~~/shared/types/profile'
import projectsData from '~~/server/data/profile.json'

const profile = projectsData as Profile

export class ProfileService {
  public get(): Profile | undefined {
    return profile
  }

  public getSocials(): ProfileSocial[] {
    return [...profile.socials]
  }
}

export const profileService = new ProfileService()
