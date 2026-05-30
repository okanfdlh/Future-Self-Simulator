export const SCENARIOS = {
  positive: {
    id: "positive",
    title: "Future A (Positive)",
    titleId: "Masa Depan A (Positif)",
    description: "Your choices shape a stable, healthy, and meaningful life.",
    descriptionId: "Pilihanmu membentuk hidup yang stabil, sehat, dan bermakna.",
    prompt:
      "Cinematic short film, a hopeful future self in a bright modern city, calm confident expression, healthy routine, meaningful work, supportive friends, warm sunrise lighting, high detail, realistic, 16:9",
  },
  neutral: {
    id: "neutral",
    title: "Future B (Neutral)",
    titleId: "Masa Depan B (Netral)",
    description: "You are doing okay, but some patterns still hold back your growth.",
    descriptionId: "Kamu baik-baik saja, tapi beberapa pola masih menghambat pertumbuhan.",
    prompt:
      "Cinematic short film, a future self in a busy city, mixed emotions, stable but tired, balancing work and life, neutral lighting, realistic, 16:9",
  },
  negative: {
    id: "negative",
    title: "Future C (Negative)",
    titleId: "Masa Depan C (Negatif)",
    description: "Small neglected habits make life feel heavier and out of balance.",
    descriptionId: "Pola kecil yang diabaikan membuat hidup terasa berat dan tidak seimbang.",
    prompt:
      "Cinematic short film, a stressed future self at night, neon city rain, exhausted, unhealthy routine consequences, lonely atmosphere, dramatic shadows, realistic, 16:9",
  },
}

export function getScenarioById(scenarioId) {
  return SCENARIOS[scenarioId] || null
}
