export function loremIpsum(wordCount: number = 100): string {
    const words = "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ')
    let result = ''

    for (let i = 0; i < wordCount; i++) {
        result += words[Math.floor(Math.random() * words.length)] + ' '
    }

    return ucfirst(result.trim())
}

export function ucfirst(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function limitString(text: string, max: number = 100, suffix: string = " ..."): string {
    if (!text) return "";
    if (text.length <= max) return text;
    return text.slice(0, max).trim() + suffix;
}

export function isMultiline(val: string | null | undefined): boolean {
    if (!val) return false

    return val.includes('\n') || val.includes('\r')
}

export const normalize = (text: string | null | undefined): string => {
    if (!text) return ''

    const result = text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/['’]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')

    return result
}

export const isNormalized = (text: string | null | undefined): boolean => {
    if (!text) return true
    return normalize(text) === text
}

export function isEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255 && email.length >= 5 && !email.includes("&") && !email.includes(" ");
}

export function isPhone(phone: string): boolean {
    return /^\+?[0-9\s\-()]+$/.test(phone) && phone.length <= 25 && phone.length >= 4;
}

export function isURLRelative(url: string | null | undefined): boolean {
    if (!url) return false

    return url.startsWith("/") &&
        !url.includes("://") &&
        !url.startsWith("http") &&
        !/\s/.test(url) &&
        !url.includes("..") &&
        !/[<>"'`|\\^{}[\]();:@&=+$,?[\]~]/.test(url);
}

export function isURL(url: string | null | undefined): boolean {
    if (!url) return false

    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function isURLAny(url: string | null | undefined): boolean {
    return isURL(url) || isURLRelative(url)
}

export function isURLExternal(url: string | null | undefined): boolean {
    if (!url) return false

    if (isURLRelative(url)) return false

    if (isURL(url) || url.startsWith("http") || url.startsWith("//")) return true

    return false
}