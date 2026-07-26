import { useI18n } from 'vue-i18n'
import type { DateFormat } from '~~/shared/types/date'

export function formatDate(date: Date | string | null, format: DateFormat): string {
    console.log('formatDate', date, format)
    const { locale } = useI18n()

    if (!date) return ''


    const options: Record<DateFormat | 'default', Intl.DateTimeFormatOptions> = {
        default: { day: 'numeric', month: 'long', year: 'numeric' },
        'month-year': { year: 'numeric', month: 'short' },
    }

    return new Date(date).toLocaleDateString(locale.value, options[format] || options.default)
}
