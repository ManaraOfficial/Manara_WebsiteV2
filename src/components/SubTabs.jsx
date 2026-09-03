import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/useLang.js'
import { animateScrollTo } from '../lib/scrollTo.js'

function SubTabs({ tabs, active, onChange }) {
  const { t } = useLang()
  const anchorRef = useRef(null)
  const prevActive = useRef(active)

  useEffect(() => {
    // Only on a real change. Comparing the previous value rather than burning a
    // one-shot flag also makes this safe under StrictMode's double-invoke.
    if (prevActive.current === active) return
    prevActive.current = active
    if (!anchorRef.current) return

    // The tab bar is sticky, so when it is pinned you can switch tabs while
    // scrolled deep into the previous panel and land mid-way through the new
    // one. Glide back so the new panel starts at the top.
    //
    // The anchor is a zero-height static element sitting immediately before the
    // sticky bar: it marks the bar's natural resting position, which the sticky
    // element's own offsetTop cannot give us once it is stuck. It is a sibling
    // rather than a wrapper on purpose — wrapping a sticky element in a
    // box its own height would stop it sticking at all.
    return animateScrollTo(() => {
      const nav = document.querySelector('nav')
      const navHeight = nav ? nav.offsetHeight : 0
      return anchorRef.current.getBoundingClientRect().top + window.scrollY - navHeight
    })
  }, [active])

  return (
    <>
      <div ref={anchorRef} aria-hidden="true" />
      <div className="sticky top-[34px] sm:top-[49px] z-40 flex">
        {tabs.map((tab) => {
          const isActive = tab.key === active
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`flex-1 px-1 py-2 sm:px-4 sm:py-4 text-center text-[11px] sm:text-base tracking-wide text-white truncate ${tab.color} ${
                isActive ? 'font-extrabold' : 'font-medium'
              }`}
            >
              {t(tab.label)}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default SubTabs
