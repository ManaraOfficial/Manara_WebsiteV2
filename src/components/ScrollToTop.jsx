import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On every navigation, glide the page down so the content starts at the top of
 * the screen — the sticky nav parks at the top of the viewport and the hero
 * above it is skipped. The FIRST load is left alone, so arriving at the site
 * still opens on the hero with the nav along the bottom edge.
 *
 * The animation is driven here rather than handed to the browser as
 * `behavior: 'smooth'`. A native smooth scroll is cancelled outright when the
 * incoming route's chunk lands and the layout changes under it, which is what
 * made navigation land short. Driving it frame by frame also lets the target be
 * re-read as the page grows: during the Suspense gap the document is only
 * header + nav + footer, too short to scroll that far, so the browser clamps
 * the request — the settle pass afterwards keeps re-applying it until it holds.
 *
 * Keyed on location.key rather than pathname, so clicking the nav item for the
 * page you are already on also returns you to the top.
 */
const DURATION = 550
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

function ScrollToTop() {
  const location = useLocation()
  const initialKey = useRef(location.key)

  useLayoutEffect(() => {
    // Stop the browser restoring the previous scroll position over ours.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Leave the first load alone: at scroll 0 the header (calc(100vh - 49px))
    // and the nav (49px) fill exactly one screen, showing the hero with the nav
    // resting on the bottom edge. Compared by value rather than a one-shot
    // flag, because StrictMode double-invokes effects in development and a flag
    // would be spent by the first run.
    if (location.key === initialKey.current) return

    // Measure the HEADER, not the nav. The nav is position:sticky, and once it
    // is stuck the browser reports its shifted on-screen position through
    // offsetTop — so half way down a page nav.offsetTop returns roughly the
    // current scroll position, making "scroll to it" a no-op. The header is
    // statically positioned, so its height is the nav's true resting offset.
    const targetTop = () => {
      const header = document.querySelector('header')
      return header ? header.offsetHeight : 0
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const from = window.scrollY
    const startedAt = performance.now()
    let frame

    // Once the glide is done, keep re-applying the target while the page is
    // still growing, until it holds for a few frames. Bounded, or a page that
    // genuinely cannot scroll that far would spin forever.
    const settle = () => {
      const deadline = performance.now() + 1500
      let settled = 0
      const step = () => {
        const top = targetTop()
        if (Math.abs(window.scrollY - top) > 1) {
          window.scrollTo({ top, behavior: 'instant' })
          settled = 0
        } else {
          settled += 1
        }
        if (settled < 3 && performance.now() < deadline) {
          frame = requestAnimationFrame(step)
        }
      }
      frame = requestAnimationFrame(step)
    }

    if (reducedMotion) {
      window.scrollTo({ top: targetTop(), behavior: 'instant' })
      settle()
    } else {
      const glide = (now) => {
        const t = Math.min(1, (now - startedAt) / DURATION)
        // Re-read the target every frame: the page is still growing beneath us.
        const top = from + (targetTop() - from) * easeOutCubic(t)
        window.scrollTo({ top, behavior: 'instant' })
        if (t < 1) frame = requestAnimationFrame(glide)
        else settle()
      }
      frame = requestAnimationFrame(glide)
    }

    return () => cancelAnimationFrame(frame)
  }, [location.key])

  return null
}

export default ScrollToTop
