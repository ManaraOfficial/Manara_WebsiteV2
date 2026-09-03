import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { animateScrollTo } from '../lib/scrollTo.js'

/**
 * On every navigation, glide the page down so the content starts at the top of
 * the screen — the sticky nav parks at the top of the viewport and the hero
 * above it is skipped. The FIRST load is left alone, so arriving at the site
 * still opens on the hero with the nav along the bottom edge.
 *
 * Keyed on location.key rather than pathname, so clicking the nav item for the
 * page you are already on also returns you to the top.
 */
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
    return animateScrollTo(() => {
      const header = document.querySelector('header')
      return header ? header.offsetHeight : 0
    })
  }, [location.key])

  return null
}

export default ScrollToTop
