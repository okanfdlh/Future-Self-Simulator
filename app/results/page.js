"use client"

import { useRunsStore } from "@/hooks/useRunsStore"
import { getScenarioById } from "@/data/scenarios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"
import { BarChart2, Plus, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { METRIC_LABELS } from "@/components/metric-card"

export default function ComparisonPage() {
  const { runs, removeRun } = useRunsStore()
  const [selectedIds, setSelectedIds] = useState([])

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id].slice(-3)
    )
  }

  const selectedRuns = useMemo(() => {
    return runs.filter((r) => selectedIds.includes(r.id))
  }, [runs, selectedIds])

  if (runs.length === 0) {
    return (
      <div className="container max-w-4xl py-24 px-4 mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto">
          <BarChart2 size={40} className="text-zinc-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Belum ada simulasi</h1>
          <p className="text-zinc-500 max-w-md mx-auto">
            Mulailah perjalananmu dengan membuat keputusan hidup dan lihat berbagai kemungkinan masa
            depan.
          </p>
        </div>
        <Link href="/decisions">
          <Button size="lg" className="rounded-full px-8">
            Mulai Simulasi
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl py-12 px-4 mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Perbandingan Masa Depan</h1>
          <p className="text-zinc-500">
            Pilih hingga 3 hasil simulasi untuk dibandingkan secara berdampingan.
          </p>
        </div>
        {selectedIds.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => setSelectedIds([])}
            className="text-zinc-500 hover:text-red-500"
          >
            Bersihkan pilihan ({selectedIds.length})
          </Button>
        )}
      </div>

      {/* Comparison Grid */}
      {selectedRuns.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 border-b border-zinc-100 dark:border-zinc-800">
          {selectedRuns.map((run) => {
            const scenario = getScenarioById(run.scenarioId)
            return (
              <div
                key={run.id}
                className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="relative group">
                  <VideoPlayer
                    videoId={run.pixverse?.videoId}
                    filename={run.videoFilename}
                    className="shadow-xl"
                  />
                  <button
                    onClick={() => toggleSelection(run.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-zinc-900/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{scenario.title}</h3>
                    <p className="text-sm text-zinc-500 line-clamp-2">{scenario.description}</p>
                  </div>

                  <div className="space-y-3 pt-4">
                    {Object.entries(run.metrics || {}).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-zinc-400">
                          <span>{METRIC_LABELS[key]}</span>
                          <span>{Math.round(value)}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-1000"
                            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href={`/results/${run.id}`} className="block">
                    <Button variant="outline" className="w-full rounded-full gap-2 group">
                      <span>Lihat Detail</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List of All Runs */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Semua Hasil Simulasi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {runs.map((run) => {
            const scenario = getScenarioById(run.scenarioId)
            const isSelected = selectedIds.includes(run.id)
            return (
              <Card
                key={run.id}
                className={`group cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? "border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900"
                    : "border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
                }`}
                onClick={() => toggleSelection(run.id)}
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg bg-zinc-100 dark:bg-zinc-800">
                  {/* Small preview or placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BarChart2 className="text-zinc-300" size={32} />
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 bg-zinc-900/20 flex items-center justify-center">
                      <div className="bg-zinc-900 text-white p-2 rounded-full">
                        <Plus className="rotate-45" size={20} />
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader className="p-4 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base truncate">{scenario.title}</CardTitle>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeRun(run.id)
                        setSelectedIds((prev) => prev.filter((i) => i !== run.id))
                      }}
                      className="p-1 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500">
                    {new Date(run.timestamp).toLocaleDateString()}
                  </p>
                </CardHeader>
              </Card>
            )
          })}

          <Link href="/decisions" className="h-full">
            <Card className="h-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors group">
              <CardContent className="flex flex-col items-center justify-center h-full p-8 space-y-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-full group-hover:scale-110 transition-transform">
                  <Plus className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                </div>
                <p className="text-sm font-medium text-zinc-500">Simulasi Baru</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
