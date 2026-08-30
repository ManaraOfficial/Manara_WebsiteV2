import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ne from './ne.js'

const STORAGE_KEY = 'manara-lang'
const LanguageContext = createContext(null)

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

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
