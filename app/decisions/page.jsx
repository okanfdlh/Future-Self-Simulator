"use client"

import { useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { DECISION_CATEGORIES } from "@/data/decisions"
import { useDecisionState } from "@/hooks/useDecisionState"

export default function DecisionsEntryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, reset } = useDecisionState()

  const isResume = searchParams?.get("resume") === "1"

  const nextHref = useMemo(() => {
    const firstIncomplete = DECISION_CATEGORIES.find((c) => !state?.[c.id])
    const target = firstIncomplete?.id || DECISION_CATEGORIES[0]?.id
    return target ? `/decisions/${target}` : "/"
  }, [state])

  useEffect(() => {
    if (!isResume) {
      reset()
      const first = DECISION_CATEGORIES[0]?.id || "sleep"
      router.replace(`/decisions/${first}`)
      return
    }

    router.replace(nextHref)
  }, [isResume, nextHref, reset, router])

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <div className="h-10 w-56 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-24 w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-10 w-40 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
    </div>
  )
}
