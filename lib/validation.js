import { DECISION_CATEGORIES, getOptionById } from "@/data/decisions"

export function normalizeDecisionState(input) {
  const out = {}
  for (const c of DECISION_CATEGORIES) {
    const optionId = input?.[c.id] || null
    out[c.id] = optionId
  }
  return out
}

export function validateDecisionState(state) {
  const errors = []
  for (const c of DECISION_CATEGORIES) {
    const optionId = state?.[c.id]
    if (!optionId) continue
    const opt = getOptionById(c.id, optionId)
    if (!opt) errors.push({ categoryId: c.id, optionId, error: "invalid_option" })
  }
  return { ok: errors.length === 0, errors }
}
