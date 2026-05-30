"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { use, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DECISION_CATEGORIES,
  getOptionsForCategory,
  isValidDecisionCategoryId,
} from "@/data/decisions"
import { useDecisionState } from "@/hooks/useDecisionState"
import { categoryPromptCopy, getLocalizedValue } from "@/lib/i18n"
import { cn } from "@/lib/utils"

function progressPercent(currentIndex, total) {
  if (!Number.isFinite(currentIndex) || !Number.isFinite(total) || total <= 0) return 0
  return Math.max(0, Math.min(100, Math.round(((currentIndex + 1) / total) * 100)))
}

export default function DecisionCategoryPage({ params }) {
  const router = useRouter()
  const resolvedParams = typeof params?.then === "function" ? use(params) : params
  const categoryId = resolvedParams?.categoryId
  const { state, setDecision } = useDecisionState()
  const { locale, t } = useLanguage()

  const resolvedCategoryId = useMemo(() => {
    if (typeof categoryId !== "string") return null
    return isValidDecisionCategoryId(categoryId) ? categoryId : null
  }, [categoryId])

  const meta = useMemo(() => {
    if (!resolvedCategoryId) return null
    const index = DECISION_CATEGORIES.findIndex((c) => c.id === resolvedCategoryId)
    const category = DECISION_CATEGORIES[index] || null
    const total = DECISION_CATEGORIES.length
    const prev = index > 0 ? DECISION_CATEGORIES[index - 1]?.id : null
    const next = index >= 0 && index < total - 1 ? DECISION_CATEGORIES[index + 1]?.id : null
    return { index, total, category, prev, next }
  }, [resolvedCategoryId])

  const selected = resolvedCategoryId ? state?.[resolvedCategoryId] || null : null
  const options = useMemo(
    () => (resolvedCategoryId ? getOptionsForCategory(resolvedCategoryId) : []),
    [resolvedCategoryId]
  )

  const copy = resolvedCategoryId ? categoryPromptCopy[resolvedCategoryId] : null

  useEffect(() => {
    if (!resolvedCategoryId) router.replace("/decisions")
  }, [resolvedCategoryId, router])

  if (!resolvedCategoryId) return null

  const canNext = Boolean(selected)
  const percent = progressPercent(meta.index, meta.total)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {t("decisions.step")} {meta.index + 1}/{meta.total}
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {getLocalizedValue(
              { en: meta.category?.title, id: meta.category?.titleId || meta.category?.title },
              locale
            )}
          </h1>
          {copy?.question ? (
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              {getLocalizedValue(copy.question, locale)}
            </p>
          ) : null}
          {copy?.helper ? (
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {getLocalizedValue(copy.helper, locale)}
            </p>
          ) : null}
        </div>
        <div className="w-40">
          <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-2 rounded-full bg-neutral-900 transition-[width] duration-300 dark:bg-neutral-50"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-8 grid gap-3"
      >
        {options.map((opt) => {
          const isActive = selected === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setDecision(resolvedCategoryId, opt.id)}
              className="text-left"
            >
              <Card
                className={cn(
                  "p-5 transition-colors",
                  isActive
                    ? "border-neutral-900 bg-neutral-50 dark:border-neutral-50 dark:bg-neutral-900/40"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                    {getLocalizedValue({ en: opt.label, id: opt.labelId || opt.label }, locale)}
                  </div>
                  <div
                    className={cn(
                      "mt-1 h-4 w-4 rounded-full border",
                      isActive
                        ? "border-neutral-900 bg-neutral-900 dark:border-neutral-50 dark:bg-neutral-50"
                        : "border-neutral-300 bg-transparent dark:border-neutral-700"
                    )}
                    aria-hidden="true"
                  />
                </div>
              </Card>
            </button>
          )
        })}
      </motion.div>

      <div className="mt-10 flex items-center justify-between gap-3">
        <Button
          as={Link}
          href={meta.prev ? `/decisions/${meta.prev}` : "/"}
          variant="outline"
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("decisions.back")}
        </Button>

        {meta.next ? (
          <Button
            as={Link}
            href={canNext ? `/decisions/${meta.next}` : "#"}
            className={cn("rounded-full", !canNext && "pointer-events-none opacity-50")}
          >
            {t("decisions.next")}
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            as={Link}
            href={canNext ? "/simulation" : "#"}
            className={cn("rounded-full", !canNext && "pointer-events-none opacity-50")}
          >
            {t("decisions.runSimulation")}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
