import { calculateMetrics, pickScenario, buildMultipleRuns, buildRun } from "@/lib/decisionEngine"
import { buildPrompt } from "@/lib/prompt"
import { validateDecisionState } from "@/lib/validation"

describe("decisionEngine", () => {
  it("calculates metrics and scenario for a positive state", () => {
    const state = {
      sleep: "sleep_optimized",
      career: "career_meaning",
      finance: "finance_invest",
      balance: "balance_ok",
      social: "social_community",
      habits: "habits_routine",
      health: "health_optimize",
    }
    const metrics = calculateMetrics(state)
    expect(metrics.health).toBeGreaterThan(50)
    expect(pickScenario(metrics)).toBe("positive")
  })

  it("calculates metrics and scenario for a negative state", () => {
    const state = {
      sleep: "sleep_short",
      career: "career_hustle",
      finance: "finance_spend",
      balance: "balance_work",
      social: "social_isolate",
      habits: "habits_scroll",
      health: "health_ignore",
    }
    const metrics = calculateMetrics(state)
    expect(metrics.health).toBeLessThan(50)
    expect(pickScenario(metrics)).toBe("negative")
  })

  it("buildMultipleRuns dedupes by scenario", () => {
    const state = {
      sleep: "sleep_regular",
      career: "career_craft",
      finance: "finance_balanced",
      balance: "balance_ok",
      social: "social_close",
      habits: "habits_learning",
      health: "health_basic",
    }
    const runs = buildMultipleRuns({ state, count: 3 })
    const scenarios = new Set(runs.map((r) => r.scenarioId))
    expect(runs.length).toBe(scenarios.size)
    expect(runs.length).toBeGreaterThan(0)
  })

  it("buildPrompt includes scenario prompt and decision context", () => {
    const state = {
      sleep: "sleep_regular",
      career: "career_craft",
      finance: "finance_balanced",
      balance: "balance_ok",
      social: "social_close",
      habits: "habits_learning",
      health: "health_basic",
    }
    const run = buildRun({ state })
    const prompt = buildPrompt({ scenarioId: run.scenarioId, state })
    expect(prompt).toContain("User decisions:")
    expect(prompt).toContain("Sleep Pattern:")
  })

  it("validates state option ids", () => {
    const state = {
      sleep: "sleep_regular",
      career: "career_craft",
      finance: "finance_balanced",
      balance: "balance_ok",
      social: "social_close",
      habits: "habits_learning",
      health: "not_a_real_option",
    }
    const v = validateDecisionState(state)
    expect(v.ok).toBe(false)
    expect(v.errors.length).toBeGreaterThan(0)
  })
})
