export function findSocial(socials: ProfileSocial[] | null, slug: string): ProfileSocial | null {
    if (!socials) return null
    return socials.find(social => social.slug === slug) || null
}

export function githubUrl(socials: ProfileSocial[] | null): string {
    if (!socials) return '#'
    const github = socials.find(social => social.slug === 'github')
    return github ? github.url : '#'
}