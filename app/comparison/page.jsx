"use client"

import Link from "next/link"
import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { METRICS } from "@/data/decisions"
import { useRunsStore } from "@/hooks/useRunsStore"
import { formatDate, getLocalizedValue, metricLabels, scenarioCopy } from "@/lib/i18n"
import { compareRuns, scoreRun } from "@/lib/compare"
import { cn } from "@/lib/utils"

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function parseIds(value) {
  if (!value) return []
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

function ComparisonContent() {
  const searchParams = useSearchParams()
  const { runs } = useRunsStore()
  const { locale, t } = useLanguage()

  const defaultSelected = useMemo(() => {
    const ids = parseIds(searchParams?.get("ids"))
    if (ids.length > 0) return ids.slice(0, 3)
    return runs.slice(0, 3).map((r) => r.id)
  }, [runs, searchParams])

  const [selectedIds, setSelectedIds] = useState(defaultSelected)

  const selectedRuns = useMemo(() => {
    const set = new Set(selectedIds)
    return runs.filter((r) => set.has(r.id)).slice(0, 3)
  }, [runs, selectedIds])

  const toggle = (id) => {
    setSelectedIds((prev) => {
      const has = prev.includes(id)
      if (has) return prev.filter((x) => x !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  const gridCols =
    selectedRuns.length >= 3
      ? "lg:grid-cols-3"
      : selectedRuns.length === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-1"

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {t("comparison.title")}
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {t("comparison.description")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button as={Link} href="/decisions" className="rounded-full">
            {t("comparison.startNew")}
          </Button>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader className="border-b border-neutral-200/70 dark:border-neutral-800/70">
          <CardTitle className="text-base">{t("comparison.chooseFutures")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {runs.length === 0 ? (
            <div className="text-sm text-neutral-700 dark:text-neutral-300">
              {t("comparison.emptyStored")}
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {runs.map((r) => {
                const active = selectedIds.includes(r.id)
                const copy = scenarioCopy[r.scenarioId]
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => toggle(r.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                      active
                        ? "border-neutral-900 bg-neutral-50 dark:border-neutral-100 dark:bg-neutral-900"
                        : "border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                    )}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700">
                      {active && (
                        <div className="h-2.5 w-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        {getLocalizedValue(copy?.title, locale)}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {formatDate(r.timestamp, locale)}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedRuns.length > 0 && (
        <div className={cn("mt-12 grid gap-8", gridCols)}>
          {selectedRuns.map((r) => {
            const copy = scenarioCopy[r.scenarioId]
            return (
              <Card key={r.id} className="overflow-hidden">
                <CardHeader className="border-b border-neutral-200/70 dark:border-neutral-800/70">
                  <CardTitle className="text-lg">
                    {getLocalizedValue(copy?.title, locale)}
                  </CardTitle>
                  <div className="mt-1 text-2xl font-bold">{Math.round(scoreRun(r))}%</div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {METRICS.map((m) => {
                    const val = r.metrics[m]
                    return (
                      <div key={m} className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-neutral-500">
                          <span>{getLocalizedValue(metricLabels[m], locale)}</span>
                          <span>{Math.round(val)}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                          <div
                            className="h-full bg-neutral-900 transition-all dark:bg-neutral-100"
                            style={{ width: `${clamp(val, 0, 100)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ComparisonPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 animate-pulse">
          <div className="h-10 w-48 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-4 h-6 w-96 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      }
    >
      <ComparisonContent />
    </Suspense>
  )
}
