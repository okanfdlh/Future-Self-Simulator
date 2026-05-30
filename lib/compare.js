import { METRICS } from "@/data/decisions"

export function scoreRun(run) {
  const metrics = run?.metrics || {}
  const total = METRICS.reduce((sum, m) => sum + Number(metrics[m] ?? 0), 0)
  return total / METRICS.length
}

export function rankRuns(runs) {
  return [...(runs || [])].sort((a, b) => scoreRun(b) - scoreRun(a))
}

export function compareRuns(runs) {
  const list = runs || []
  const byMetric = {}

  for (const metric of METRICS) {
    const values = list.map((r) => ({ id: r.id, value: Number(r?.metrics?.[metric] ?? 0) }))
    values.sort((a, b) => b.value - a.value)
    byMetric[metric] = {
      best: values[0] || null,
      worst: values[values.length - 1] || null,
      values,
    }
  }

  return {
    count: list.length,
    ranking: rankRuns(list).map((r) => ({
      id: r.id,
      scenarioId: r.scenarioId,
      score: scoreRun(r),
    })),
    byMetric,
  }
}
