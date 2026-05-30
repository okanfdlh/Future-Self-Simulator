const base = process.env.NEXT_PUBLIC_PIXVERSE_VIDEO_BASE || ""

const positiveUrl = process.env.NEXT_PUBLIC_PIXVERSE_VIDEO_POSITIVE_URL || ""
const neutralUrl = process.env.NEXT_PUBLIC_PIXVERSE_VIDEO_NEUTRAL_URL || ""
const negativeUrl = process.env.NEXT_PUBLIC_PIXVERSE_VIDEO_NEGATIVE_URL || ""

export const SCENARIO_VIDEOS = {
  positive: {
    scenarioId: "positive",
    title: "Masa Depan A (Positif)",
    url: positiveUrl || base,
  },
  neutral: {
    scenarioId: "neutral",
    title: "Masa Depan B (Netral)",
    url: neutralUrl || base,
  },
  negative: {
    scenarioId: "negative",
    title: "Masa Depan C (Negatif)",
    url: negativeUrl || base,
  },
}

export function getFallbackVideoUrl(scenarioId) {
  return SCENARIO_VIDEOS[scenarioId]?.url || base
}
