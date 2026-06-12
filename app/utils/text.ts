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

export function isCommaSeparatedList(val: string | null | undefined): boolean {
    if (!val) return false

    const items = val.split(',').map(item => item.trim())
    return items.every(item => item.length > 0)
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

export function hello(): string {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 14) {
        return "Bonjour";
    } else if (hour >= 14 && hour < 18) {
        return "Bon après-midi";
    } else if (hour >= 18 && hour < 21) {
        return "Bonsoir";
    } else {
        return "Bonne nuit";
    }
}