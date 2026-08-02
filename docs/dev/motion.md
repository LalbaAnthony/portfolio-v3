# Motion

GSAP-driven animation. Three pieces, in order of how often you will touch them.

## 1. `v-reveal` — entrance animations (covers ~90% of cases)

A global directive, registered in [app/plugins/motion.ts](../../app/plugins/motion.ts). Drop it on
any element; it animates in when scrolled into view.

```vue
<div v-reveal>…</div>                          <!-- default: slide up + fade -->
<h2 v-reveal="'left'">…</h2>                   <!-- named preset -->
<div v-reveal="{ preset: 'rise', children: '.project-card', stagger: 0.1 }">…</div>
<h1 v-reveal="{ preset: 'mask', immediate: true }">…</h1>  <!-- on mount, not on scroll -->
```

| Option      | Default   | Meaning                                             |
| ----------- | --------- | --------------------------------------------------- |
| `preset`    | `'up'`    | Named "from" state, see `REVEAL_PRESETS`            |
| `children`  | –         | Animate matching descendants instead of the element |
| `stagger`   | `0.08`    | Seconds between children                            |
| `delay`     | `0`       | Seconds before starting                             |
| `duration`  | `0.65`    | Seconds                                             |
| `start`     | `top 82%` | ScrollTrigger start position                        |
| `immediate` | `false`   | Play on mount instead of waiting for scroll         |

Presets: `up`, `down`, `left`, `right`, `fade`, `zoom`, `pop`, `blur`, `flip`, `mask`, `rise`.
Add one to `REVEAL_PRESETS` in [app/composables/useGsap.ts](../../app/composables/useGsap.ts)
and it is available everywhere.

Every tween ends by clearing the properties it touched (`REVEAL_CLEAR_PROPS`), so CSS
`:hover` transforms keep working afterwards.

## 2. `v-tilt` — pointer-tracked 3D hover

```vue
<div v-tilt>…</div>
<div v-tilt="{ max: 6, lift: 8, scale: 1.03 }">…</div>
```

Only binds on hover-capable, fine-pointer devices. **GSAP owns the element's transform while
tilting** — do not also declare a CSS `:hover { transform }` on the same element, it will be
overwritten. Border/colour hover styles in CSS are fine.

## 3. `useReveal()` — bespoke sequences

For anything the directive cannot express (timelines, scrubbed parallax, counters).
Queue tasks in `setup`; they run once GSAP has loaded, inside a `gsap.context()` that is
reverted on unmount, so tweens and ScrollTriggers clean themselves up.

```ts
const { onGsap } = useReveal()

onGsap((gsap) => {
    gsap.timeline().from(photoRef.value, { scale: 0.6, opacity: 0 })

    // Optionally return a teardown; it runs on unmount.
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
})
```

Pull easings/durations from the `MOTION` token object rather than hardcoding, so the whole
site keeps one personality.

## Guarantees

- **Lazy**: GSAP is dynamically imported, never in the initial bundle, never on the server.
- **Reduced motion**: `useGsap()` resolves to `null` under `prefers-reduced-motion: reduce`;
  the CSS that hides reveal targets is itself wrapped in a `no-preference` query. Content is
  simply static — no animation code runs.
- **Never stuck invisible**: `v-reveal` stamps `data-reveal` during SSR (hidden via CSS) and
  removes it as soon as GSAP has written the inline start state. If the GSAP chunk fails to
  load, every `data-reveal` is stripped. Without JS at all, a `<noscript>` style in
  [nuxt.config.ts](../../nuxt.config.ts) restores full opacity.

## Gotchas

- **Never use `clearProps: 'all'`.** It wipes the element's entire inline `style`
  attribute, including bindings Vue owns — a `:style="{ width }"` is destroyed and the
  element snaps to its default size. Use `REVEAL_CLEAR_PROPS` (or an explicit list).
- Two tweens on the same element **and same property** fight. Compose with different
  properties instead — e.g. the hero photo floats on `y` while its section parallaxes on the
  section wrapper, and the aurora scrubs `yPercent` while the pointer drives `x`/`y` in px.
- After changing page height from JS (filters, infinite scroll), call
  `refreshScrollTriggers()` or trigger positions go stale.
- Splitting text (`splitChars`) rewrites the element's children. It sets `aria-label` and
  hides the generated spans from assistive tech; keep it off content that re-renders often.
