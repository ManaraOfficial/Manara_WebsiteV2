import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import heroImage from '../assets/hero.jpg'
import heroImage3 from '../assets/hero.jpeg'
import heroImage4 from '../assets/hero1.jpeg'
import heroImage5 from '../assets/hero1.jfif'

const heroImages = [heroImage, heroImage3, heroImage4, heroImage5]

export const navItems = [
  { to: '/', label: 'Manara', end: true },
  { to: '/team', label: 'Team' },
  { to: '/projects', label: 'Projects' },
  { to: '/reports', label: 'Reports' },
  { to: '/contact', label: 'Contact' },
]

function Header() {
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
    <header className="relative h-[42vh] sm:h-[calc(100vh-49px)] w-full overflow-hidden">
      {heroImages.map((img, i) =>
        mountedIndices.has(i) ? (
          <img
            key={img}
            src={img}
            alt="Children of the Manaslu region"
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
  const [hasInteracted, setHasInteracted] = useState(false)

  return (
    <nav className="sticky top-0 z-50 flex border-b border-gray-300 bg-white text-[11px] sm:text-base">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setHasInteracted(true)}
          className={({ isActive }) =>
            `flex-1 whitespace-nowrap px-1 py-2 sm:px-3 sm:py-3 text-center font-semibold tracking-wide border-r border-gray-300 last:border-r-0 transition-all duration-200 ease-out active:scale-95 ${
              isActive && hasInteracted
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          {item.label.toUpperCase()}
        </NavLink>
      ))}
    </nav>
  )
}

export default Header
