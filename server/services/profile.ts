import type { Profile, ProfileSocial } from '~~/shared/types/profile'
import profileData from '~~/server/data/profile'

export class ProfileService {
  public get(): Profile | undefined {
    return profileData
  }

  public getSocials(): ProfileSocial[] {
    return [...(profileData.socials ?? [])]
  }
}

export const profileService = new ProfileService()
