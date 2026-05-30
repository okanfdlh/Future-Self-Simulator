"use client"

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import { loadRuns, saveRuns } from "@/lib/storage"

const EVENT = "fss:runs"
const RUNS_KEY = "fss:runs:v1"
const EMPTY_RUNS = []

export function useRunsStore() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  const subscribe = useCallback((onStoreChange) => {
    const handler = (e) => {
      if (e?.type === "storage" && e.key && e.key !== RUNS_KEY) return
      onStoreChange()
    }
    window.addEventListener(EVENT, handler)
    window.addEventListener("storage", handler)
    return () => {
      window.removeEventListener(EVENT, handler)
      window.removeEventListener("storage", handler)
    }
  }, [])

  const getSnapshot = useCallback(() => loadRuns(), [])
  const getServerSnapshot = useCallback(() => EMPTY_RUNS, [])

  const rawRuns = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const runs = isMounted ? rawRuns : EMPTY_RUNS

  const setRuns = useCallback((next) => {
    const value = typeof next === "function" ? next(loadRuns()) : next
    saveRuns(value)
    window.dispatchEvent(new Event(EVENT))
  }, [])

  return { runs, setRuns }
}
