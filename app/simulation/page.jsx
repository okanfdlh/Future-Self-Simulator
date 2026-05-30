"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDecisionState } from "@/hooks/useDecisionState"
import { useRunsStore } from "@/hooks/useRunsStore"
import { cn } from "@/lib/utils"

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export default function SimulationPage() {
  const router = useRouter()
  const { state, isComplete } = useDecisionState()
  const { setRuns } = useRunsStore()

  const [status, setStatus] = useState("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")
  const [runs, setLocalRuns] = useState([])
  const [showResults, setShowResults] = useState(false)

  const startedRef = useRef(false)
  const tickRef = useRef(null)

  const primaryRun = runs?.[0] || null
  const videoUrl = primaryRun?.video?.url || ""

  const summary = useMemo(() => {
    if (!primaryRun) return null
    const metrics = primaryRun.metrics || {}
    const entries = Object.entries(metrics)
      .filter(([, v]) => typeof v === "number" && Number.isFinite(v))
      .sort((a, b) => b[1] - a[1])
    return { scenarioId: primaryRun.scenarioId, metrics: entries }
  }, [primaryRun])

  useEffect(() => {
    if (!isComplete) {
      router.replace("/decisions")
      return
    }

    if (startedRef.current) return
    startedRef.current = true

    setStatus("running")
    setProgress(8)
    setError("")

    tickRef.current = window.setInterval(() => {
      setProgress((p) => clamp(p + Math.max(1, Math.round((90 - p) / 12)), 0, 90))
    }, 250)

    ;(async () => {
      try {
        const res = await fetch("/api/simulations/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state, mode: "single", generateVideo: false })
        })
        const json = await res.json().catch(() => null)
        if (!res.ok) {
          const msg = typeof json?.error === "string" ? json.error : `HTTP_${res.status}`
          throw new Error(msg)
        }

        const nextRuns = Array.isArray(json?.runs) ? json.runs : []
        setLocalRuns(nextRuns)
        setRuns((prev) => [...nextRuns, ...prev])
        setProgress(100)
        setStatus("done")
      } catch (e) {
        setStatus("error")
        setError(e?.message || "simulation_error")
      } finally {
        if (tickRef.current) window.clearInterval(tickRef.current)
        tickRef.current = null
      }
    })()

    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current)
      tickRef.current = null
    }
  }, [isComplete, router, setRuns, state])

  const canView = status === "done" && runs.length > 0

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Menjalankan simulasi
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Menghitung outcome dan menyiapkan future-mu.
          </p>
        </div>
        <div className="w-40">
          <div className="text-right text-sm text-neutral-600 dark:text-neutral-400">{progress}%</div>
          <div className="mt-1 h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-2 rounded-full bg-neutral-900 transition-[width] duration-300 dark:bg-neutral-50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <Card className="mt-8 overflow-hidden">
        <CardHeader className="border-b border-neutral-200/70 dark:border-neutral-800/70">
          <CardTitle className="flex items-center justify-between gap-3">
            <span className="text-base">Processing</span>
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="h-5 w-5 rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-neutral-50"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-neutral-700 dark:text-neutral-300"
          >
            {status === "running" ? "Sedang memproses..." : null}
            {status === "done" ? "Selesai. Future-mu siap dilihat." : null}
            {status === "error" ? "Gagal memproses simulasi." : null}
          </motion.div>

          {status === "error" ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Button
              className={cn("rounded-full", !canView && "pointer-events-none opacity-50")}
              onClick={() => setShowResults(true)}
            >
              View Results
            </Button>
            <Button as={Link} href="/decisions" variant="outline" className="rounded-full">
              Ubah keputusan
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && canView ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Hasil</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <div>
                <span className="text-neutral-600 dark:text-neutral-400">Scenario: </span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-50">
                  {summary?.scenarioId}
                </span>
              </div>
              <div className="grid gap-1">
                {(summary?.metrics || []).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3">
                    <span className="capitalize">{k}</span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-50">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {videoUrl ? (
              <video
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800"
                src={videoUrl}
                controls
                playsInline
              />
            ) : (
              <div className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300">
                Video URL belum tersedia. Set NEXT_PUBLIC_PIXVERSE_VIDEO_*_URL untuk fallback video per-scenario.
              </div>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

