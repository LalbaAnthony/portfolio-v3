import type { PostAttributesFrontend } from "@brz/shared"

export function isOpenNow(post: PostAttributesFrontend): boolean {
    if (!post.schedules || post.schedules.length === 0) return false

    const date = new Date()
    return isInIntervals(post.schedules, date)
}