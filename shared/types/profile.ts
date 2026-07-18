import type { I18nStrings } from './i18n'

export interface ProfileSocial {
  label: string
  slug: string
  url: string
}

export interface Profile {
  firstName: string
  lastName: string
  jobTitle: string
  birthday: string
  presentation: I18nStrings
  email: string
  socials: ProfileSocial[]
}

