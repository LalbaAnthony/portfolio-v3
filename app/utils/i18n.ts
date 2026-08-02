import type { I18nStrings, Language } from '#shared/types/i18n'

export function tString(string: I18nStrings | string | null | undefined): string | null {
    const { locale } = useI18n()

    if (!string) return null
    if (typeof string === 'object') return string[locale.value as Language]
    if (typeof string === 'string') return string
    return null
}

export function switchLocale(code: Language) {
    const switchLocalePath = useSwitchLocalePath()
    navigateTo(switchLocalePath(code))
}

export function localesOptions(): { label: string; value: string; icon?: string }[] {
    const { locales } = useI18n()
    return locales.value.map(l => ({
        label: l.name ?? l.code,
        value: l.code,
        icon: LANGUAGE_OBJECTS.find(o => o.value === l.code)?.flag,
    }))
}
