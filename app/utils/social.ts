import type { Social } from "~/types/social"

const SOCIALS: { [key: string]: Social } = {
    facebook: {
        name: 'Facebook',
        icon: 'mdi:facebook',
        regex: /facebook\.com/i
    },
    twitter: {
        name: 'Twitter',
        icon: 'mdi:twitter',
        regex: /twitter\.com/i
    },
    instagram: {
        name: 'Instagram',
        icon: 'mdi:instagram',
        regex: /instagram\.com/i
    },
    youtube: {
        name: 'YouTube',
        icon: 'mdi:youtube',
        regex: /youtube\.com|youtu\.be/i
    },
    linkedin: {
        name: 'LinkedIn',
        icon: 'mdi:linkedin',
        regex: /linkedin\.com/i
    },
    pinterest: {
        name: 'Pinterest',
        icon: 'mdi:pinterest',
        regex: /pinterest\./i
    },
    snapchat: {
        name: 'Snapchat',
        icon: 'mdi:snapchat',
        regex: /snapchat\.com/i
    },
    reddit: {
        name: 'Reddit',
        icon: 'mdi:reddit',
        regex: /reddit\.com/i
    },
    discord: {
        name: 'Discord',
        icon: 'mdi:discord',
        regex: /discord\.(gg|com)/i
    },
    twitch: {
        name: 'Twitch',
        icon: 'mdi:twitch',
        regex: /twitch\.tv/i
    },
    x: {
        name: 'X',
        icon: 'mdi:x',
        regex: /\bx\.com/i
    },
    default: {
        name: 'Default',
        icon: 'ic:round-link',
        default: true
    }
}

export function identifySocial(url: string): Social {
    for (const key in SOCIALS) {
        const social = SOCIALS[key]
        if (social?.regex && social.regex.test(url)) {
            return social
        }
    }

    return SOCIALS.default as Social
}

export function getSocialIcon(url: string): string {
    return identifySocial(url).icon
}