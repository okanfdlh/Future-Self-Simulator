export const METRICS = ["happiness", "finance", "health", "social", "fulfillment"]

export const DECISION_CATEGORIES = [
  { id: "sleep", title: "Sleep Pattern", titleId: "Pola Tidur" },
  { id: "career", title: "Career Path", titleId: "Jalur Karir" },
  { id: "finance", title: "Financial Lifestyle", titleId: "Gaya Hidup Finansial" },
  { id: "balance", title: "Work-Life Balance", titleId: "Work-Life Balance" },
  { id: "social", title: "Social Relationships", titleId: "Hubungan Sosial" },
  { id: "habits", title: "Daily Habits", titleId: "Kebiasaan Sehari-hari" },
  { id: "health", title: "Health", titleId: "Kesehatan" },
]

export const DECISION_OPTIONS = {
  sleep: [
    {
      id: "sleep_short",
      label: "Sleep 4-5 hours",
      labelId: "Tidur 4-5 jam",
      weights: { happiness: -12, health: -18, finance: +6, social: -8, fulfillment: -6 },
    },
    {
      id: "sleep_regular",
      label: "Sleep 7-8 hours",
      labelId: "Tidur 7-8 jam",
      weights: { happiness: +8, health: +14, finance: +2, social: +2, fulfillment: +6 },
    },
    {
      id: "sleep_optimized",
      label: "Structured sleep + recovery",
      labelId: "Tidur terjadwal + recovery",
      weights: { happiness: +10, health: +16, finance: +1, social: +4, fulfillment: +8 },
    },
  ],
  career: [
    {
      id: "career_hustle",
      label: "Fast ambition",
      labelId: "Ambisi cepat",
      weights: { happiness: -4, health: -6, finance: +14, social: -6, fulfillment: +2 },
    },
    {
      id: "career_craft",
      label: "Build mastery",
      labelId: "Bangun mastery",
      weights: { happiness: +6, health: +2, finance: +10, social: +2, fulfillment: +10 },
    },
    {
      id: "career_meaning",
      label: "Meaningful work",
      labelId: "Kerja yang bermakna",
      weights: { happiness: +10, health: +4, finance: +6, social: +4, fulfillment: +14 },
    },
  ],
  finance: [
    {
      id: "finance_spend",
      label: "Consumptive",
      labelId: "Konsumtif",
      weights: { happiness: +2, health: -2, finance: -14, social: +4, fulfillment: -4 },
    },
    {
      id: "finance_balanced",
      label: "Balanced",
      labelId: "Seimbang",
      weights: { happiness: +6, health: +2, finance: +8, social: +2, fulfillment: +6 },
    },
    {
      id: "finance_invest",
      label: "Disciplined investing",
      labelId: "Investasi disiplin",
      weights: { happiness: +4, health: +2, finance: +14, social: 0, fulfillment: +8 },
    },
  ],
  balance: [
    {
      id: "balance_work",
      label: "Work-first",
      labelId: "Kerja dominan",
      weights: { happiness: -10, health: -10, finance: +8, social: -10, fulfillment: -6 },
    },
    {
      id: "balance_ok",
      label: "Fairly balanced",
      labelId: "Cukup seimbang",
      weights: { happiness: +6, health: +6, finance: +4, social: +4, fulfillment: +6 },
    },
    {
      id: "balance_life",
      label: "Life-first",
      labelId: "Hidup dominan",
      weights: { happiness: +10, health: +8, finance: -2, social: +10, fulfillment: +8 },
    },
  ],
  social: [
    {
      id: "social_isolate",
      label: "Minimal interaction",
      labelId: "Minim interaksi",
      weights: { happiness: -8, health: -2, finance: +2, social: -16, fulfillment: -6 },
    },
    {
      id: "social_close",
      label: "Small circle",
      labelId: "Circle kecil",
      weights: { happiness: +6, health: +2, finance: +1, social: +10, fulfillment: +6 },
    },
    {
      id: "social_community",
      label: "Community active",
      labelId: "Aktif komunitas",
      weights: { happiness: +10, health: +4, finance: +2, social: +14, fulfillment: +8 },
    },
  ],
  habits: [
    {
      id: "habits_scroll",
      label: "Doomscrolling",
      labelId: "Doomscrolling",
      weights: { happiness: -6, health: -4, finance: -2, social: -2, fulfillment: -10 },
    },
    {
      id: "habits_routine",
      label: "Healthy routine",
      labelId: "Rutinitas sehat",
      weights: { happiness: +8, health: +10, finance: +2, social: +2, fulfillment: +10 },
    },
    {
      id: "habits_learning",
      label: "Structured learning",
      labelId: "Belajar terstruktur",
      weights: { happiness: +6, health: +4, finance: +8, social: +2, fulfillment: +12 },
    },
  ],
  health: [
    {
      id: "health_ignore",
      label: "Ignore your body",
      labelId: "Abaikan tubuh",
      weights: { happiness: -8, health: -16, finance: +2, social: -4, fulfillment: -6 },
    },
    {
      id: "health_basic",
      label: "Protect the basics",
      labelId: "Jaga dasar",
      weights: { happiness: +6, health: +10, finance: +2, social: +1, fulfillment: +6 },
    },
    {
      id: "health_optimize",
      label: "Optimize health",
      labelId: "Optimasi kesehatan",
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
