export const SCENARIOS = {
  positive: {
    id: "positive",
    title: "Masa Depan A (Positif)",
    description: "Pilihanmu membentuk hidup yang stabil, sehat, dan bermakna.",
    prompt:
      "Cinematic short film, a hopeful future self in a bright modern city, calm confident expression, healthy routine, meaningful work, supportive friends, warm sunrise lighting, high detail, realistic, 16:9"
  },
  neutral: {
    id: "neutral",
    title: "Masa Depan B (Netral)",
    description: "Kamu baik-baik saja, tapi beberapa pola masih menghambat pertumbuhan.",
    prompt:
      "Cinematic short film, a future self in a busy city, mixed emotions, stable but tired, balancing work and life, neutral lighting, realistic, 16:9"
  },
  negative: {
    id: "negative",
    title: "Masa Depan C (Negatif)",
    description: "Pola kecil yang diabaikan membuat hidup terasa berat dan tidak seimbang.",
    prompt:
      "Cinematic short film, a stressed future self at night, neon city rain, exhausted, unhealthy routine consequences, lonely atmosphere, dramatic shadows, realistic, 16:9"
  }
};

export function getScenarioById(scenarioId) {
  return SCENARIOS[scenarioId] || null;
}

