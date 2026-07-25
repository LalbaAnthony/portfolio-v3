export type ProfileLanguageProficiency = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface ProfileLanguage {
  label: I18nStrings
  proficiency: ProfileLanguageProficiency
}

export interface ProfileInterest {
  label: I18nStrings
}

export interface ProfileSocial {
  label: string
  slug: string
  url: string
}

export interface Profile {
  firstName: string
  lastName: string
  location?: string | null
  birthday: string
  email: string
  jobTitle?: I18nStrings | null
  languages?: ProfileLanguage[] | null
  interests?: ProfileInterest[] | null
  socials?: ProfileSocial[] | null
}

