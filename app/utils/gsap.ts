/**
 * Wraps every character of an element in its own `<span>` so GSAP can stagger them,
 * preserving nested markup (e.g. a `<span class="font-extrabold">` inside a heading).
 *
 * The original text is moved to `aria-label` and the generated spans are hidden from
 * assistive tech, so splitting never degrades how the heading is announced.
 *
 * @returns the generated character spans, in document order
 */
export function splitChars(el: HTMLElement): HTMLElement[] {
    if (el.dataset.split === 'true') {
        return Array.from(el.querySelectorAll<HTMLElement>('[data-char]'))
    }

    const label = el.textContent?.trim() ?? ''
    const chars: HTMLElement[] = []

    const walk = (node: Node) => {
        // Copy the child list first: we mutate it while iterating.
        for (const child of Array.from(node.childNodes)) {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent ?? ''
                if (!text.trim()) continue

                const fragment = document.createDocumentFragment()
                for (const char of text) {
                    const span = document.createElement('span')
                    span.dataset.char = ''
                    span.style.display = 'inline-block'
                    span.style.willChange = 'transform'
                    // Keep spaces from collapsing once they become inline-block.
                    span.textContent = char === ' ' ? ' ' : char
                    chars.push(span)
                    fragment.appendChild(span)
                }
                node.replaceChild(fragment, child)
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                walk(child)
            }
        }
    }

    walk(el)

    if (label) el.setAttribute('aria-label', label)
    el.dataset.split = 'true'
    for (const child of Array.from(el.children)) child.setAttribute('aria-hidden', 'true')

    return chars
}
