export type ProfileLanguageProficiency = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface ProfileLanguage {
  label: I18nStrings
  proficiency: ProfileLanguageProficiency
}

export interface ProfileCertification {
  label: I18nStrings
  url?: string | null
}

export interface ProfileInterest {
  label: I18nStrings
}

export interface ProfileSocial {
  label: string
  slug: string
  url: string
}

export interface ProfileWorkExperience {
  company: string
  position: string
  startDate: string
  endDate?: string | null
  description?: I18nStrings | null
}

export interface ProfileDiploma {
  label: I18nStrings
  place: string
  startYear: number
  endYear?: number | null
  url?: string | null
}

export interface Profile {
  firstName: string
  lastName: string
  location?: string | null
  birthday: string
  email: string
  jobTitle?: I18nStrings | null
  socials?: ProfileSocial[] | null
  certifications?: ProfileCertification[] | null
  languages?: ProfileLanguage[] | null
  interests?: ProfileInterest[] | null
  workExperiences?: ProfileWorkExperience[] | null
  diplomas?: ProfileDiploma[] | null
}

