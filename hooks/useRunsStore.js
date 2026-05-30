"use client";

import { useCallback, useSyncExternalStore } from "react";
import { loadRuns, saveRuns } from "@/lib/storage";

const EVENT = "fss:runs";
const EMPTY_SNAPSHOT = [];

export function useRunsStore() {
  const subscribe = useCallback((onStoreChange) => {
    const handler = () => onStoreChange();
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const getSnapshot = useCallback(() => loadRuns(), []);
  const getServerSnapshot = useCallback(() => EMPTY_SNAPSHOT, []);

  const runs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setRuns = useCallback((next) => {
    const value = typeof next === "function" ? next(loadRuns()) : next;
    saveRuns(value);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { runs, setRuns };
}
