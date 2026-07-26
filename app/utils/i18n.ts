import type { I18nStrings, Language } from '#shared/types/i18n'

export function tString(string: I18nStrings | string | null | undefined): string | null {
    const { locale } = useI18n()
    
    if (!string) return null
    if (typeof string === 'object') return string[locale.value as Language]
    if (typeof string === 'string') return string
    return null
}