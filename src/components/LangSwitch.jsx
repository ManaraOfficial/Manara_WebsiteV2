import { useEffect, useRef, useState } from 'react'
import { FaCheck, FaChevronDown } from 'react-icons/fa'
import { FlagGB, FlagNP } from './Flags.jsx'
import { useLang } from '../i18n/useLang.js'

const options = [
  { code: 'en', label: 'English', short: 'EN', Flag: FlagGB },
  { code: 'ne', label: 'नेपाली', short: 'नेपाली', Flag: FlagNP },
]

/**
 * Language selector for the sticky nav: a globe button that opens a short menu.
 * Living in the nav means it stays reachable anywhere on the page, unlike a
 * control on the hero which scrolls away.
 */
function LangSwitch() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const current = options.find((o) => o.code === lang) || options[0]

  // A menu that can only be dismissed by picking something is a trap — close on
  // outside click and on Escape.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language / भाषा"
        className={`flex h-full items-center gap-1.5 whitespace-nowrap px-3 py-2 font-semibold tracking-wide transition-colors duration-200 sm:px-4 sm:py-3 ${
          open ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="flag-wave">
          <current.Flag wave />
        </span>
        {current.short}
        <FaChevronDown
          size={9}
          aria-hidden="true"
          className={`shrink-0 opacity-60 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 w-36 overflow-hidden rounded-b-lg border border-gray-200 bg-white shadow-lg"
        >
          {options.map((o) => {
            const active = lang === o.code
            return (
              <button
                key={o.code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setLang(o.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-xs transition-colors ${
                  active
                    ? 'bg-gray-50 font-bold text-gray-900'
                    : 'font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <o.Flag />
                <span className="flex-1">{o.label}</span>
                {active && <FaCheck size={10} className="shrink-0 text-[#EC8134]" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LangSwitch
