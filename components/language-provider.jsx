"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { DEFAULT_LOCALE, getMessage, LANGUAGE_STORAGE_KEY, resolveLocale } from "@/lib/i18n"

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LOCALE
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
      return stored ? resolveLocale(stored) : DEFAULT_LOCALE
    } catch {
      return DEFAULT_LOCALE
    }
  })

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (nextLocale) => {
    const resolved = resolveLocale(nextLocale)
    setLocaleState(resolved)
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, resolved)
    } catch {}
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (path) => getMessage(locale, path),
    }),
    [locale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
