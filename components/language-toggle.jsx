"use client"

import { Languages } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      className="inline-flex items-center rounded-full border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-950"
      aria-label={t("language.label")}
    >
      <span className="px-2 text-neutral-500 dark:text-neutral-400" aria-hidden="true">
        <Languages className="h-4 w-4" />
      </span>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 rounded-full px-3",
          locale === "en" && "bg-neutral-100 dark:bg-neutral-900"
        )}
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        {t("language.shortEnglish")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 rounded-full px-3",
          locale === "id" && "bg-neutral-100 dark:bg-neutral-900"
        )}
        onClick={() => setLocale("id")}
        aria-pressed={locale === "id"}
      >
        {t("language.shortIndonesian")}
      </Button>
    </div>
  )
}
