"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { DECISION_CATEGORIES } from "@/data/decisions";
import { clearDecisionState, loadDecisionState, saveDecisionState } from "@/lib/storage";

const EVENT = "fss:decisions";
const DECISIONS_KEY = "fss:decisions:v1";
const EMPTY_SNAPSHOT = {};

export function useDecisionState() {
    const subscribe = useCallback((onStoreChange) => {
        const handler = (e) => {
            if (e?.type === "storage" && e.key && e.key !== DECISIONS_KEY) return;
            onStoreChange();
        };
        window.addEventListener(EVENT, handler);
        window.addEventListener("storage", handler);
        return () => {
            window.removeEventListener(EVENT, handler);
            window.removeEventListener("storage", handler);
        };
    }, []);

    const getSnapshot = useCallback(() => loadDecisionState() || EMPTY_SNAPSHOT, []);
    const getServerSnapshot = useCallback(() => loadDecisionState() || EMPTY_SNAPSHOT, []);
    const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const setDecision = useCallback((categoryId, optionId) => {
        const next = { ...(loadDecisionState() || EMPTY_SNAPSHOT), [categoryId]: optionId };
        saveDecisionState(next);
        window.dispatchEvent(new Event(EVENT));
    }, []);

    const reset = useCallback(() => {
        clearDecisionState();
        window.dispatchEvent(new Event(EVENT));
    }, []);

    const isComplete = useMemo(() => {
        return DECISION_CATEGORIES.every((c) => Boolean(state[c.id]));
    }, [state]);

    return { state, setDecision, reset, isComplete };
}

