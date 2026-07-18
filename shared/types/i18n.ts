export const LANGUAGE_KEYS = ['en', 'fr'] as const
export type Language = typeof LANGUAGE_KEYS[number]

export type I18nStrings = Record<Language, string | null>
