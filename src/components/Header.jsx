import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import LangSwitch from './LangSwitch.jsx'
import { navItems } from './navItems.js'
import { useLang } from '../i18n/useLang.js'
// Full-bleed hero — needs a larger, less-compressed render than the global default.
import heroImage from '../assets/hero.jpg?w=2200&quality=82&format=webp'
import heroImage3 from '../assets/hero.jpeg?w=2200&quality=82&format=webp'
import heroImage4 from '../assets/hero1.jpeg?w=2200&quality=82&format=webp'
import heroImage5 from '../assets/hero1.jfif?w=2200&quality=82&format=webp'

const heroImages = [heroImage, heroImage3, heroImage4, heroImage5]

function Header() {
  const { t } = useLang()
  const [activeIndex, setActiveIndex] = useState(0)
  // Only mount <img> tags for slides that have actually started loading, so slow
  // connections aren't forced to fetch all hero images at once — each one loads
  // one at a time, in the background, ahead of when the rotation needs it.
  const [mountedIndices, setMountedIndices] = useState(() => new Set([0]))

  useEffect(() => {
    let cancelled = false
    // Preload the remaining slides sequentially, after the first (visible) one
    // has finished loading, so it never competes for bandwidth with the hero
    // image the visitor sees immediately.
    const firstImg = new Image()
    firstImg.src = heroImages[0]
    const preloadRest = async () => {
      for (let i = 1; i < heroImages.length; i++) {
        if (cancelled) return
        await new Promise((resolve) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = resolve
          img.src = heroImages[i]
        })
        if (cancelled) return
        setMountedIndices((prev) => new Set(prev).add(i))
      }
    }
    if (firstImg.complete) {
      preloadRest()
    } else {
      firstImg.onload = preloadRest
      firstImg.onerror = preloadRest
    }
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => {
        const next = (i + 1) % heroImages.length
        return mountedIndices.has(next) ? next : i
      })
    }, 7000)
    return () => clearInterval(timer)
  }, [mountedIndices])

  return (
    <header className="relative h-[42vh] sm:h-[calc(100vh-var(--nav-h))] w-full overflow-hidden">
      {heroImages.map((img, i) =>
        mountedIndices.has(i) ? (
          <img
            key={img}
            src={img}
            alt={t('Children of the Manaslu region')}
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`hero-breathe absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[3000ms] ease-in-out ${
              i === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null
      )}
      <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-8">
        <Logo />
      </div>
    </header>
  )
}

export function Nav() {
  const { t } = useLang()
  const [hasInteracted, setHasInteracted] = useState(false)
  const navRef = useRef(null)

  // Publish the nav's real height as --nav-h, which the sub-tabs stick to and
  // the hero sizes against. Measured rather than hard-coded because it changes
  // with the breakpoint, once webfonts land, and between languages — Devanagari
  // sits taller than Latin, so EN and NE are not the same height.
  useLayoutEffect(() => {
    const el = navRef.current
    if (!el) return
    // Round up: offsetHeight truncates, and a fractional shortfall lets a sliver
    // of scrolling content bleed through between the nav and the sub-tabs.
    const publish = () =>
      document.documentElement.style.setProperty(
        '--nav-h',
        `${Math.ceil(el.getBoundingClientRect().height)}px`
      )
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <nav
      ref={navRef}
      // transform-gpu promotes the bar to its own compositing layer. Without it
      // Chrome repaints the sticky nav as it flips between static and stuck and
      // can leave it half-drawn while scrolling down — it only looks right again
      // after scrolling back up.
      className="sticky top-0 z-50 flex transform-gpu border-b border-gray-300 bg-white text-[11px] sm:text-base"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setHasInteracted(true)}
          className={({ isActive }) =>
            `flex-1 whitespace-nowrap px-1 py-2 sm:px-3 sm:py-3 text-center tracking-wide border-r border-gray-300 last:border-r-0 transition-all duration-200 ease-out active:scale-95 ${
              isActive && hasInteracted
                ? 'bg-[#404040] text-white font-extrabold'
                : 'bg-white text-gray-700 font-medium hover:bg-gray-100'
            }`
          }
        >
          {t(item.label).toUpperCase()}
        </NavLink>
      ))}
      <LangSwitch />
    </nav>
  )
}

export default Header
