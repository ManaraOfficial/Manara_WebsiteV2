const DURATION = 550
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Glide the window to a target scroll position, driven frame by frame.
 *
 * Deliberately not `window.scrollTo({ behavior: 'smooth' })`: a native smooth
 * scroll is cancelled outright when the layout changes under it — which is
 * exactly what happens as a lazy route chunk lands or images arrive.
 *
 * `getTarget` is a function, not a number, and is re-read every frame: the page
 * is often still growing while we animate. Once the glide finishes, a short
 * settle pass keeps re-applying the target until it actually holds, because a
 * document that is still too short to scroll that far will have had the request
 * silently clamped by the browser.
 *
 * Returns a cancel function suitable for returning straight from an effect.
 */
export function animateScrollTo(getTarget, { settleMs = 1500 } = {}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const from = window.scrollY
  const startedAt = performance.now()
  let frame

  const settle = () => {
    const deadline = performance.now() + settleMs
    let settled = 0
    const step = () => {
      const top = getTarget()
      if (Math.abs(window.scrollY - top) > 1) {
        window.scrollTo({ top, behavior: 'instant' })
        settled = 0
      } else {
        settled += 1
      }
      // Bounded, or a page that genuinely cannot scroll that far spins forever.
      if (settled < 3 && performance.now() < deadline) {
        frame = requestAnimationFrame(step)
      }
    }
    frame = requestAnimationFrame(step)
  }

  if (reducedMotion) {
    window.scrollTo({ top: getTarget(), behavior: 'instant' })
    settle()
  } else {
    const glide = (now) => {
      const t = Math.min(1, (now - startedAt) / DURATION)
      const top = from + (getTarget() - from) * easeOutCubic(t)
      window.scrollTo({ top, behavior: 'instant' })
      if (t < 1) frame = requestAnimationFrame(glide)
      else settle()
    }
    frame = requestAnimationFrame(glide)
  }

  return () => cancelAnimationFrame(frame)
}
