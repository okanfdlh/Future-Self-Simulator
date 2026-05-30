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

function metricLabel(metric) {
  return metricLabels[metric] || { en: metric, id: metric }
}

function parseIds(value) {
  if (!value) return []
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

function ComparisonPageContent() {
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

  const analysis = useMemo(() => compareRuns(selectedRuns), [selectedRuns])

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
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => toggle(r.id)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-colors",
                      active
                        ? "border-neutral-900 bg-neutral-50 dark:border-neutral-50 dark:bg-neutral-900/40"
                        : "border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900/40"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid gap-1">
                        <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                          {getLocalizedValue(scenarioCopy[r.scenarioId]?.title, locale) ||
                            r.scenarioId}
                        </div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400">
                          {t("result.score")} {Math.round(scoreRun(r))} •{" "}
                          {formatDate(r.createdAt, locale, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "mt-1 h-4 w-4 rounded-full border",
                          active
                            ? "border-neutral-900 bg-neutral-900 dark:border-neutral-50 dark:bg-neutral-50"
                            : "border-neutral-300 bg-transparent dark:border-neutral-700"
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className={cn("mt-8 grid gap-6", gridCols)}>
        {selectedRuns.map((r) => {
          const url = r?.video?.url || ""
          return (
            <Card key={r.id} className="overflow-hidden">
              <CardHeader className="border-b border-neutral-200/70 dark:border-neutral-800/70">
                <CardTitle className="flex items-center justify-between gap-3 text-base">
                  <span className="capitalize">
                    {getLocalizedValue(scenarioCopy[r.scenarioId]?.title, locale) || r.scenarioId}
                  </span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {t("result.score")} {Math.round(scoreRun(r))}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {url ? (
                  <video
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800"
                    src={url}
                    controls
                    playsInline
                  />
                ) : (
                  <div className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300">
                    {t("comparison.videoUnavailable")}
                  </div>
                )}

                <div className="grid gap-3">
                  {METRICS.map((m) => {
                    const value = clamp(Number(r?.metrics?.[m] ?? 0), 0, 100)
                    return (
                      <div key={m} className="grid gap-1">
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="text-neutral-700 dark:text-neutral-300">
                            {getLocalizedValue(metricLabel(m), locale)}
                          </span>
                          <span className="font-semibold text-neutral-900 dark:text-neutral-50">
                            {value}
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
                          <div
                            className="h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-50"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedRuns.length >= 2 ? (
        <Card className="mt-8">
          <CardHeader className="border-b border-neutral-200/70 dark:border-neutral-800/70">
            <CardTitle className="text-base">{t("comparison.comparisonMetrics")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {METRICS.map((m) => {
              const best = analysis?.byMetric?.[m]?.best
              const worst = analysis?.byMetric?.[m]?.worst
              const bestRun = best ? selectedRuns.find((r) => r.id === best.id) : null
              const worstRun = worst ? selectedRuns.find((r) => r.id === worst.id) : null
              return (
                <div
                  key={m}
                  className="grid gap-2 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
                >
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    {getLocalizedValue(metricLabel(m), locale)}
                  </div>
                  <div className="grid gap-1 text-sm text-neutral-700 dark:text-neutral-300">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {t("comparison.best")}
                      </span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-50">
                        {bestRun?.scenarioId || "-"} • {best?.value ?? "-"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {t("comparison.worst")}
                      </span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-50">
                        {worstRun?.scenarioId || "-"} • {worst?.value ?? "-"}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

export default function ComparisonPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-600 dark:text-neutral-400" />
      }
    >
      <ComparisonPageContent />
    </Suspense>
  )
}
