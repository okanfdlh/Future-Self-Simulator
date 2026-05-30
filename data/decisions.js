export const METRICS = ["happiness", "finance", "health", "social", "fulfillment"]

export const DECISION_CATEGORIES = [
  { id: "sleep", title: "Pola Tidur" },
  { id: "career", title: "Jalur Karir" },
  { id: "finance", title: "Gaya Hidup Finansial" },
  { id: "balance", title: "Work-Life Balance" },
  { id: "social", title: "Hubungan Sosial" },
  { id: "habits", title: "Kebiasaan Sehari-hari" },
  { id: "health", title: "Kesehatan" },
]

export const DECISION_OPTIONS = {
  sleep: [
    {
      id: "sleep_short",
      label: "Tidur 4–5 jam",
      weights: { happiness: -12, health: -18, finance: +6, social: -8, fulfillment: -6 },
    },
    {
      id: "sleep_regular",
      label: "Tidur 7–8 jam",
      weights: { happiness: +8, health: +14, finance: +2, social: +2, fulfillment: +6 },
    },
    {
      id: "sleep_optimized",
      label: "Tidur terjadwal + recovery",
      weights: { happiness: +10, health: +16, finance: +1, social: +4, fulfillment: +8 },
    },
  ],
  career: [
    {
      id: "career_hustle",
      label: "Ambisi cepat",
      weights: { happiness: -4, health: -6, finance: +14, social: -6, fulfillment: +2 },
    },
    {
      id: "career_craft",
      label: "Bangun mastery",
      weights: { happiness: +6, health: +2, finance: +10, social: +2, fulfillment: +10 },
    },
    {
      id: "career_meaning",
      label: "Kerja yang bermakna",
      weights: { happiness: +10, health: +4, finance: +6, social: +4, fulfillment: +14 },
    },
  ],
  finance: [
    {
      id: "finance_spend",
      label: "Konsumtif",
      weights: { happiness: +2, health: -2, finance: -14, social: +4, fulfillment: -4 },
    },
    {
      id: "finance_balanced",
      label: "Seimbang",
      weights: { happiness: +6, health: +2, finance: +8, social: +2, fulfillment: +6 },
    },
    {
      id: "finance_invest",
      label: "Investasi disiplin",
      weights: { happiness: +4, health: +2, finance: +14, social: 0, fulfillment: +8 },
    },
  ],
  balance: [
    {
      id: "balance_work",
      label: "Kerja dominan",
      weights: { happiness: -10, health: -10, finance: +8, social: -10, fulfillment: -6 },
    },
    {
      id: "balance_ok",
      label: "Cukup seimbang",
      weights: { happiness: +6, health: +6, finance: +4, social: +4, fulfillment: +6 },
    },
    {
      id: "balance_life",
      label: "Hidup dominan",
      weights: { happiness: +10, health: +8, finance: -2, social: +10, fulfillment: +8 },
    },
  ],
  social: [
    {
      id: "social_isolate",
      label: "Minim interaksi",
      weights: { happiness: -8, health: -2, finance: +2, social: -16, fulfillment: -6 },
    },
    {
      id: "social_close",
      label: "Circle kecil",
      weights: { happiness: +6, health: +2, finance: +1, social: +10, fulfillment: +6 },
    },
    {
      id: "social_community",
      label: "Aktif komunitas",
      weights: { happiness: +10, health: +4, finance: +2, social: +14, fulfillment: +8 },
    },
  ],
  habits: [
    {
      id: "habits_scroll",
      label: "Doomscrolling",
      weights: { happiness: -6, health: -4, finance: -2, social: -2, fulfillment: -10 },
    },
    {
      id: "habits_routine",
      label: "Rutinitas sehat",
      weights: { happiness: +8, health: +10, finance: +2, social: +2, fulfillment: +10 },
    },
    {
      id: "habits_learning",
      label: "Belajar terstruktur",
      weights: { happiness: +6, health: +4, finance: +8, social: +2, fulfillment: +12 },
    },
  ],
  health: [
    {
      id: "health_ignore",
      label: "Abaikan tubuh",
      weights: { happiness: -8, health: -16, finance: +2, social: -4, fulfillment: -6 },
    },
    {
      id: "health_basic",
      label: "Jaga dasar",
      weights: { happiness: +6, health: +10, finance: +2, social: +1, fulfillment: +6 },
    },
    {
      id: "health_optimize",
      label: "Optimasi kesehatan",
      weights: { happiness: +8, health: +14, finance: -2, social: +2, fulfillment: +8 },
    },
  ],
}

export function isValidDecisionCategoryId(categoryId) {
  return DECISION_CATEGORIES.some((c) => c.id === categoryId)
}

export function getOptionsForCategory(categoryId) {
  return DECISION_OPTIONS[categoryId] || []
}

export function getOptionById(categoryId, optionId) {
  return getOptionsForCategory(categoryId).find((o) => o.id === optionId) || null
}
