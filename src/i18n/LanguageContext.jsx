import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lasvegas_lang') : null
    return saved === 'en' ? 'en' : 'it'
  })

  const setLang = (nextLang) => {
    // Update storage synchronously to avoid "flip back" if anything remounts
    // before effects run in the next tick.
    if (typeof window !== 'undefined') {
      localStorage.setItem('lasvegas_lang', nextLang)
      // Keep the document language in sync for accessibility/SEO.
      document.documentElement.lang = nextLang === 'en' ? 'en' : 'it'
    }
    setLangState(nextLang)
  }

  useEffect(() => {
    // Safety: keep storage + document lang in sync even if lang changes elsewhere.
    if (typeof window !== 'undefined') {
      localStorage.setItem('lasvegas_lang', lang)
      document.documentElement.lang = lang === 'en' ? 'en' : 'it'
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}

