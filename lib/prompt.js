import { DECISION_CATEGORIES, getOptionById } from "@/data/decisions"
import { getScenarioById } from "@/data/scenarios"

export function buildPrompt({ scenarioId, state }) {
  const scenario = getScenarioById(scenarioId)
  const picks = []
  for (const c of DECISION_CATEGORIES) {
    const optionId = state?.[c.id]
    const opt = optionId ? getOptionById(c.id, optionId) : null
    if (opt) picks.push(`${c.title}: ${opt.label}`)
  }
  const context = picks.length ? `User decisions: ${picks.join(", ")}.` : ""
  const basePrompt = scenario?.prompt || ""
  return `${basePrompt} ${context}`.trim()
}
