"use client"

import { use, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useRunsStore } from "@/hooks/useRunsStore"
import { getScenarioById } from "@/data/scenarios"
import { useLanguage } from "@/components/language-provider"
import { VideoPlayer } from "@/components/video-player"
import { MetricCard } from "@/components/metric-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, BarChart2, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { getLocalizedValue } from "@/lib/i18n"

export default function ResultPage({ params: paramsPromise }) {
  const params = use(paramsPromise)
  const router = useRouter()
  const { runs } = useRunsStore()
  const { locale, t } = useLanguage()

  const run = useMemo(() => runs.find((r) => r.id === params.id), [runs, params.id])
  const scenario = useMemo(() => (run ? getScenarioById(run.scenarioId) : null), [run])

  if (!run || !scenario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-zinc-500">{t("results.notFound")}</p>
        <Link href="/">
          <Button variant="outline">{t("results.backHome")}</Button>
        </Link>
      </div>
    )
  }

  const handleShare = () => {
    const localizedTitle = getLocalizedValue(
      { en: scenario.title, id: scenario.titleId || scenario.title },
      locale
    )
    if (navigator.share) {
      navigator.share({
        title:
          locale === "id"
            ? "Masa Depanku - Future Self Simulator"
            : "My Future - Future Self Simulator",
        text:
          locale === "id"
            ? `Lihat hasil simulasi masa depanku: ${localizedTitle}`
            : `Check out my future simulation result: ${localizedTitle}`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="container max-w-5xl py-12 px-4 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <Link
            href="/simulation"
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-4 inline-flex"
          >
            <ArrowLeft size={16} />
            <span>{t("results.backToSimulation")}</span>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {getLocalizedValue(
              { en: scenario.title, id: scenario.titleId || scenario.title },
              locale
            )}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {getLocalizedValue(
              { en: scenario.description, id: scenario.descriptionId || scenario.description },
              locale
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="lg" className="rounded-full gap-2" onClick={handleShare}>
            <Share2 size={18} />
            <span>{t("results.share")}</span>
          </Button>
          <Link href="/results">
            <Button variant="outline" size="lg" className="rounded-full gap-2">
              <BarChart2 size={18} />
              <span>{t("results.compareButton")}</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Section */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer
            videoId={run.pixverse?.videoId}
            filename={run.videoFilename}
            className="shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800"
          />

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xl font-bold mb-4">{t("results.futureReflection")}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
              {t("results.reflectionQuote")}
            </p>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BarChart2 size={20} />
            <span>{t("results.lifeStats")}</span>
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(run.metrics || {}).map(([key, value]) => (
              <MetricCard key={key} metric={key} value={value} />
            ))}
          </div>

          <div className="pt-8 space-y-4">
            <Link href="/decisions" className="block w-full">
              <Button
                size="lg"
                className="w-full rounded-full gap-2 bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              >
                <RefreshCcw size={18} />
                <span>{t("results.tryDifferentChoices")}</span>
              </Button>
            </Link>
            <p className="text-center text-xs text-zinc-500 px-4">
              {t("results.uniqueSimulation")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
