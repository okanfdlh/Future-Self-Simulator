"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"

export function SiteFooter() {
  const { t } = useLanguage()
  const [year, setYear] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-neutral-600 dark:text-neutral-400">
        <p>Future Self Simulator</p>
        <p className="text-xs">
          © {year || 2026} - {t("footer.rights")}
        </p>
      </div>
    </footer>
  )
}
