import { DECISION_CATEGORIES, METRICS, getOptionById } from "@/data/decisions";
import { getScenarioById } from "@/data/scenarios";
import { SCENARIO_VIDEOS } from "@/data/videos";

export function createEmptyDecisionState() {
  return Object.fromEntries(DECISION_CATEGORIES.map((c) => [c.id, null]));
}

export function isCompleteDecisionState(state) {
  if (!state) return false;
  return DECISION_CATEGORIES.every((c) => Boolean(state[c.id]));
}

export function calculateMetrics(state) {
  const base = Object.fromEntries(METRICS.map((m) => [m, 50]));
  for (const category of DECISION_CATEGORIES) {
    const optionId = state?.[category.id];
    if (!optionId) continue;
    const opt = getOptionById(category.id, optionId);
    if (!opt?.weights) continue;
    for (const metric of METRICS) {
      base[metric] += Number(opt.weights[metric] ?? 0);
    }
  }
  for (const metric of METRICS) base[metric] = clamp(base[metric], 0, 100);
  return base;
}

export function pickScenario(metrics) {
  const total = METRICS.reduce((sum, m) => sum + (metrics?.[m] ?? 0), 0);
  const avg = total / METRICS.length;
  if (avg >= 66) return "positive";
  if (avg >= 45) return "neutral";
  return "negative";
}

export function buildRun({ state, seed }) {
  const metrics = calculateMetrics(state);
  const scenarioId = pickScenario(metrics);
  const scenario = getScenarioById(scenarioId);
  const video = SCENARIO_VIDEOS[scenarioId] || SCENARIO_VIDEOS.neutral;
  return {
    id: randomId(),
    createdAt: new Date().toISOString(),
    state,
    metrics,
    scenarioId,
    scenario,
    video,
    seed: seed ?? null
  };
}

export function buildMultipleRuns({ state, count = 3 }) {
  const runs = [];
  for (let i = 0; i < count; i += 1) {
    const jitter = pseudoRandom(i + 1);
    const metrics = calculateMetrics(state);
    const tweaked = tweakMetrics(metrics, jitter);
    const scenarioId = pickScenario(tweaked);
    const scenario = getScenarioById(scenarioId);
    const video = SCENARIO_VIDEOS[scenarioId] || SCENARIO_VIDEOS.neutral;
    runs.push({
      id: randomId(),
      createdAt: new Date().toISOString(),
      state,
      metrics: tweaked,
      scenarioId,
      scenario,
      video,
      seed: i + 1
    });
  }
  return dedupeByScenario(runs);
}

function tweakMetrics(metrics, jitter) {
  const out = { ...metrics };
  const spread = Math.round((jitter - 0.5) * 10);
  for (const metric of METRICS) out[metric] = clamp(out[metric] + spread, 0, 100);
  return out;
}

function dedupeByScenario(runs) {
  const seen = new Set();
  const out = [];
  for (const r of runs) {
    if (seen.has(r.scenarioId)) continue;
    seen.add(r.scenarioId);
    out.push(r);
  }
  return out;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function randomId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

