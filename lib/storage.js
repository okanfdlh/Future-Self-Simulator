const RUNS_KEY = "fss:runs:v1";
const DECISIONS_KEY = "fss:decisions:v1";

const cache = new Map();

export function loadDecisionState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DECISIONS_KEY);
    if (!raw) return null;
    const entry = cache.get(DECISIONS_KEY);
    if (entry && entry.raw === raw) return entry.value;
    const parsed = JSON.parse(raw);
    cache.set(DECISIONS_KEY, { raw, value: parsed });
    return parsed;
  } catch {
    return null;
  }
}

export function saveDecisionState(state) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(state);
  window.localStorage.setItem(DECISIONS_KEY, raw);
  cache.set(DECISIONS_KEY, { raw, value: state });
}

export function clearDecisionState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DECISIONS_KEY);
  cache.delete(DECISIONS_KEY);
}

export function loadRuns() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RUNS_KEY);
    if (!raw) return [];
    const entry = cache.get(RUNS_KEY);
    if (entry && entry.raw === raw) return entry.value;
    const parsed = JSON.parse(raw);
    const value = Array.isArray(parsed) ? parsed : [];
    cache.set(RUNS_KEY, { raw, value });
    return value;
  } catch {
    return [];
  }
}

export function saveRuns(runs) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(runs);
  window.localStorage.setItem(RUNS_KEY, raw);
  cache.set(RUNS_KEY, { raw, value: runs });
}

export function upsertRun(run) {
  const runs = loadRuns();
  const idx = runs.findIndex((r) => r.id === run.id);
  const next = idx >= 0 ? runs.map((r) => (r.id === run.id ? run : r)) : [run, ...runs];
  saveRuns(next);
  return next;
}

export function deleteRun(runId) {
  const runs = loadRuns();
  const next = runs.filter((r) => r.id !== runId);
  saveRuns(next);
  return next;
}

export function clearRuns() {
  saveRuns([]);
  return [];
}
