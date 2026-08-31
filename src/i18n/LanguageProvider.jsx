import { useCallback, useEffect, useMemo, useState } from 'react'
import ne from './ne.js'
import { LanguageContext } from './context.js'

const STORAGE_KEY = 'manara-lang'

const dictionaries = { en: null, ne }

function readInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ne') return stored
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang)

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'ne' : 'en'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback(
    (value) => {
      if (typeof value !== 'string') return value
      const dict = dictionaries[lang]
      if (!dict) return value
      return dict[value] ?? value
    },
    [lang]
  )

  const contextValue = useMemo(() => ({ lang, setLang, toggle, t }), [lang, setLang, toggle, t])

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}
