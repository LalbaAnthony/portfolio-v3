export interface ProfileSocial {
  label: string
  slug: string
  url: string
}

export interface Profile {
  firstName: string
  lastName: string
  jobTitle: string
  location: string
  birthday: string
  email: string
  socials: ProfileSocial[]
}

