export interface Certification {
    label: I18nStrings
    year: number
    url?: string | null
}

export interface CertificationFilters {
    search?: string | null
}