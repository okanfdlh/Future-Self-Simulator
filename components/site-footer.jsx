"use client"

import { useLanguage } from "@/components/language-provider"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-neutral-600 dark:text-neutral-400">
        <p>Future Self Simulator</p>
        <p className="text-xs">
          © {new Date().getFullYear()} - {t("footer.rights")}
        </p>
      </div>
    </footer>
  )
}
