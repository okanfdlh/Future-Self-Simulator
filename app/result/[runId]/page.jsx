"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { use, useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { METRICS } from "@/data/decisions"
import { useRunsStore } from "@/hooks/useRunsStore"
import { scoreRun } from "@/lib/compare"
import { cn } from "@/lib/utils"

function metricLabel(metric) {
  if (metric === "happiness") return "Happiness"
  if (metric === "finance") return "Finance"
  if (metric === "health") return "Health"
  if (metric === "social") return "Social"
  if (metric === "fulfillment") return "Fulfillment"
  return metric
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function normalizePixverseStatus(value) {
  if (!value) return ""
  return String(value).toLowerCase()
}

export default function ResultPage({ params }) {
  const router = useRouter()
  const resolvedParams = typeof params?.then === "function" ? use(params) : params
  const runId = resolvedParams?.runId
  const { runs } = useRunsStore()

  const run = useMemo(() => runs.find((r) => r?.id === runId) || null, [runId, runs])
  const score = useMemo(() => (run ? scoreRun(run) : 0), [run])

  const pixverseId = run?.pixverse?.videoId ? String(run.pixverse.videoId) : ""
  const fallbackUrl = run?.video?.url || ""
  const [pixverseUrl, setPixverseUrl] = useState("")
  const [videoStatus, setVideoStatus] = useState("")
  const [videoError, setVideoError] = useState("")

  const videoUrl = pixverseUrl || fallbackUrl

  const pollRef = useRef({ timeoutId: null, intervalId: null })

  useEffect(() => {
    if (!runId) return
    if (!run) {
      router.replace("/decisions")
      return
    }
  }, [router, run, runId])

  useEffect(() => {
    if (!pixverseId) return
    if (!run) return

    const poll = async () => {
      try {
        setVideoError("")
        setVideoStatus((s) => s || "loading")
        const res = await fetch(`/api/pixverse/result/${encodeURIComponent(pixverseId)}`, {
          cache: "no-store"
        })
        const json = await res.json().catch(() => null)
        if (!res.ok) throw new Error(json?.error || `HTTP_${res.status}`)
        const status = normalizePixverseStatus(json?.status)
        setVideoStatus(status || "processing")
        if (typeof json?.url === "string" && json.url.trim().length > 0) {
          setPixverseUrl(json.url)
          return true
        }
        if (status === "failed" || status === "error") {
          throw new Error("pixverse_failed")
        }
        return false
      } catch (e) {
        setVideoError(e?.message || "pixverse_error")
        setVideoStatus("error")
        return true
      }
    }

    const timeoutId = window.setTimeout(() => {
      poll()
    }, 0)

    const intervalId = window.setInterval(async () => {
      const done = await poll()
      if (done) {
        if (pollRef.current?.timeoutId) window.clearTimeout(pollRef.current.timeoutId)
        if (pollRef.current?.intervalId) window.clearInterval(pollRef.current.intervalId)
        pollRef.current = { timeoutId: null, intervalId: null }
      }
    }, 1500)

    pollRef.current = { timeoutId, intervalId }

    return () => {
      if (pollRef.current?.timeoutId) window.clearTimeout(pollRef.current.timeoutId)
      if (pollRef.current?.intervalId) window.clearInterval(pollRef.current.intervalId)
      pollRef.current = { timeoutId: null, intervalId: null }
    }
  }, [pixverseId, run])

  if (!run) return null

  const metrics = run.metrics || {}

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Hasil simulasi
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Scenario{" "}
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">
              {run.scenarioId}
            </span>{" "}
            • Score{" "}
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">
              {Math.round(score)}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button as={Link} href={`/comparison?ids=${encodeURIComponent(run.id)}`} className="rounded-full">
            Compare
          </Button>
          <Button as={Link} href="/decisions" variant="outline" className="rounded-full">
            Try Again
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-neutral-200/70 dark:border-neutral-800/70">
            <CardTitle className="flex items-center justify-between gap-3">
              <span className="text-base">Video</span>
              {pixverseId ? (
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className={cn(
                      "h-4 w-4 rounded-full border-2",
                      videoStatus === "error"
                        ? "border-red-300 border-t-red-700 dark:border-red-900/50 dark:border-t-red-300"
                        : "border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-neutral-50"
                    )}
                  />
                  <span className="capitalize">{videoStatus || "processing"}</span>
                </div>
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {videoError ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
                {videoError}
              </div>
            ) : null}

            {videoUrl ? (
              <video
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800"
                src={videoUrl}
                controls
                playsInline
              />
            ) : (
              <div className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300">
                Video URL belum tersedia.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-neutral-200/70 dark:border-neutral-800/70">
            <CardTitle className="text-base">Outcome summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {METRICS.map((m) => {
              const value = clamp(Number(metrics?.[m] ?? 0), 0, 100)
              return (
                <div key={m} className="grid gap-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-neutral-700 dark:text-neutral-300">{metricLabel(m)}</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-50">{value}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
                    <div
                      className="h-2 rounded-full bg-neutral-900 dark:bg-neutral-50"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
