import { MEDIA_PREVIEW_URL, MEDIA_UPLOAD_URL, type MediaAttributes } from "@brz/shared"
import type { MediaContext } from "~/types/media"

export const MEDIA_URL_DEFAULT_HERO_DEFAULT = '/photos/borreze-depuis-coline.webp'
export const MEDIA_URL_DEFAULT_HERO_HOME = '/photos/borreze-place.webp'
export const MEDIA_URL_DEFAULT_CARD = '/utils/placeholder-2-2.webp'
export const MEDIA_URL_DEFAULT_OTHER = '/utils/placeholder-2-1.webp'

export const mediaValid = (media: MediaAttributes | null | undefined): boolean => {
    return !!(media && media.file_name)
}

export const mediaDefaulting = (context: MediaContext = 'other'): string => {
    switch (context) {
        case 'hero-home':
            return MEDIA_URL_DEFAULT_HERO_HOME
        case 'hero-default':
            return MEDIA_URL_DEFAULT_HERO_DEFAULT
        case 'card':
            return MEDIA_URL_DEFAULT_CARD
        case 'other':
            return MEDIA_URL_DEFAULT_OTHER
    }
}

export const mediaBuildUrl = (media: MediaAttributes, preview: boolean = false): string => {
    const config = useRuntimeConfig()

    const base = config.public.apiBaseUrl || ''
    const url = preview ? MEDIA_PREVIEW_URL : MEDIA_UPLOAD_URL

    return `${base}/${url}/${media.file_name}`
}

export const mediaUrl = (media: MediaAttributes | null | undefined, options: { preview?: boolean, defaulting?: boolean, context?: MediaContext } = {}): string => {
    const {
        preview = false,
        defaulting = true,
        context = 'other'
    } = options

    if (media && mediaValid(media)) {
        return mediaBuildUrl(media, preview)
    } else if (defaulting) {
        return mediaDefaulting(context)
    } else {
        return ''
    }
}