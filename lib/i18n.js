export const DEFAULT_LOCALE = "en"
export const APP_LOCALES = ["en", "id"]
export const LANGUAGE_STORAGE_KEY = "fss:locale:v1"

export function resolveLocale(locale) {
  return APP_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
}

export function formatLocale(locale) {
  return resolveLocale(locale) === "id" ? "id-ID" : "en-US"
}

export function formatDate(value, locale, options) {
  try {
    return new Intl.DateTimeFormat(formatLocale(locale), options).format(new Date(value))
  } catch {
    return ""
  }
}

export const messages = {
  en: {
    header: {
      home: "Home",
      startSimulation: "Start Simulation",
      compareFutures: "Compare Futures",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
    },
    footer: {
      rights: "All rights reserved.",
    },
    theme: {
      label: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    language: {
      label: "Language",
      english: "English",
      indonesian: "Bahasa Indonesia",
      shortEnglish: "EN",
      shortIndonesian: "ID",
    },
    home: {
      badge: "Future Self Simulator",
      badgeMeta: "Cinematic • Interactive • AI-powered",
      title: "Simulate your future through the life choices you make today.",
      description:
        "Choose decisions across key life categories, then explore possible future outcomes through a cinematic visual experience. Great for reflection, scenario exploration, and conversations with friends.",
      primaryCta: "Start Simulation",
      secondaryCta: "Compare Futures",
      statOne: "7 decision categories",
      statTwo: "Multiple outcomes",
      statThree: "Save and compare",
      previewTitle: "Preview Flow",
      previewDescription:
        "This is a UI preview. The AI video flow and decision engine can be connected once the logic is ready.",
      decisionLabel: "Decisions",
      simulationLabel: "Simulation",
      resultLabel: "Result",
      positiveOutcome: "Positive outcome",
      whyTitle: "Why Future Self Simulator?",
      whyDescription:
        "Built for a fast and clear experience: choose decisions, see the outcome, then compare multiple futures.",
      featureCinematicTitle: "Cinematic",
      featureCinematicDescription:
        "AI-generated videos from PixVerse make each future feel more vivid and emotionally engaging.",
      featureCompareTitle: "Compare Futures",
      featureCompareDescription:
        "Save multiple simulation results and compare their metrics side by side.",
      featureSimpleTitle: "Simple Flow",
      featureSimpleDescription:
        "A clear step-by-step structure that fits a polished hackathon experience.",
      sleepLabel: "Sleep",
      careerLabel: "Career",
      financeLabel: "Finance",
      balancedValue: "Balanced",
      workLifeValue: "WLB",
      frugalValue: "Frugal",
    },
    decisions: {
      back: "Back",
      next: "Next",
      runSimulation: "Run Simulation",
      step: "Step",
      sleepQuestion: "What kind of sleep pattern do you want to live with?",
      sleepHelper: "This choice affects your energy, health, and emotional stability.",
      careerQuestion: "Which career direction do you want to focus on?",
      careerHelper: "Career direction influences your finances, purpose, and pace of life.",
      financeQuestion: "Which financial lifestyle fits you best?",
      financeHelper: "Pick the option that best reflects your current habits.",
      balanceQuestion: "How balanced do you want work and life to be?",
      balanceHelper: "This choice affects your health, social life, and happiness.",
      socialQuestion: "How do you want to build your social relationships?",
      socialHelper: "Relationships shape emotional support and overall quality of life.",
      habitsQuestion: "Which daily habit is the most dominant right now?",
      habitsHelper: "Small habits shape big outcomes over time.",
      healthQuestion: "How do you treat your health?",
      healthHelper: "Your health is the foundation for every other goal.",
    },
    simulation: {
      title: "Running simulation",
      description: "Calculating outcomes and preparing your future.",
      processing: "Processing",
      running: "Processing your simulation...",
      done: "Done. Your future is ready to explore.",
      error: "Failed to process the simulation.",
      viewResults: "View Results",
      changeChoices: "Change decisions",
    },
    result: {
      title: "Simulation result",
      compare: "Compare",
      tryAgain: "Try Again",
      video: "Video",
      videoUnavailable: "Video URL is not available yet.",
      outcomeSummary: "Outcome summary",
      scenario: "Scenario",
      score: "Score",
    },
    results: {
      emptyTitle: "No simulations yet",
      emptyDescription: "Start your journey by making life choices and exploring possible futures.",
      startSimulation: "Start Simulation",
      title: "Future Comparison",
      description: "Select up to 3 simulation results to compare side by side.",
      clearSelection: "Clear selection",
      viewDetail: "View Details",
      allResults: "All Simulation Results",
      newSimulation: "New Simulation",
      notFound: "Simulation result not found.",
      backHome: "Back to Home",
      backToSimulation: "Back to Simulation",
      share: "Share",
      compareButton: "Compare",
      futureReflection: "Future Reflection",
      reflectionQuote:
        '"The small choices you make today, from how you sleep to how you manage stress, shape where you end up. This future is just one of many possibilities you can create."',
      lifeStats: "Life Stats",
      tryDifferentChoices: "Try Different Choices",
      uniqueSimulation: "Every new decision creates a different future simulation.",
    },
    comparison: {
      title: "Compare futures",
      description: "Choose up to 3 simulation results to compare side by side.",
      startNew: "Start New Simulation",
      chooseFutures: "Choose futures (max 3)",
      emptyStored: "There are no saved simulation results yet.",
      comparisonMetrics: "Comparison metrics",
      best: "Best",
      worst: "Worst",
      videoUnavailable: "Video URL is not available yet.",
    },
  },
  id: {
    header: {
      home: "Beranda",
      startSimulation: "Mulai Simulasi",
      compareFutures: "Bandingkan Masa Depan",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      language: "Bahasa",
    },
    footer: {
      rights: "Seluruh hak cipta dilindungi.",
    },
    theme: {
      label: "Tema",
      light: "Terang",
      dark: "Gelap",
      system: "Sistem",
    },
    language: {
      label: "Bahasa",
      english: "English",
      indonesian: "Bahasa Indonesia",
      shortEnglish: "EN",
      shortIndonesian: "ID",
    },
    home: {
      badge: "Future Self Simulator",
      badgeMeta: "Sinematik • Interaktif • Bertenaga AI",
      title: "Simulasikan masa depan lewat pilihan hidup yang kamu ambil hari ini.",
      description:
        "Pilih keputusan di berbagai kategori penting, lalu eksplorasi kemungkinan masa depan melalui pengalaman visual sinematik. Cocok untuk refleksi, eksplorasi skenario, dan diskusi bareng teman.",
      primaryCta: "Mulai Simulasi",
      secondaryCta: "Bandingkan Masa Depan",
      statOne: "7 kategori keputusan",
      statTwo: "Banyak outcome",
      statThree: "Simpan & bandingkan",
      previewTitle: "Preview Alur",
      previewDescription:
        "Ini adalah preview UI. Alur video AI dan decision engine bisa dihubungkan setelah logic siap.",
      decisionLabel: "Keputusan",
      simulationLabel: "Simulasi",
      resultLabel: "Hasil",
      positiveOutcome: "Outcome positif",
      whyTitle: "Kenapa Future Self Simulator?",
      whyDescription:
        "Dibuat untuk pengalaman yang cepat dan jelas: pilih keputusan, lihat outcome, lalu bandingkan beberapa masa depan.",
      featureCinematicTitle: "Sinematik",
      featureCinematicDescription:
        "Video AI-generated dari PixVerse membuat setiap masa depan terasa lebih hidup dan emosional.",
      featureCompareTitle: "Bandingkan Masa Depan",
      featureCompareDescription:
        "Simpan beberapa hasil simulasi dan bandingkan metriknya secara berdampingan.",
      featureSimpleTitle: "Alur Sederhana",
      featureSimpleDescription:
        "Struktur langkah yang jelas, cocok untuk pengalaman hackathon yang cepat namun tetap polished.",
      sleepLabel: "Tidur",
      careerLabel: "Karier",
      financeLabel: "Finansial",
      balancedValue: "Seimbang",
      workLifeValue: "Work-life balance",
      frugalValue: "Hemat",
    },
    decisions: {
      back: "Kembali",
      next: "Lanjut",
      runSimulation: "Jalankan Simulasi",
      step: "Langkah",
      sleepQuestion: "Kamu mau menjalani pola tidur seperti apa?",
      sleepHelper: "Pilihan ini memengaruhi energi, kesehatan, dan stabilitas emosi.",
      careerQuestion: "Kamu mau fokus karier ke arah mana?",
      careerHelper: "Arah karier memengaruhi finansial, makna, dan ritme hidup.",
      financeQuestion: "Gaya hidup finansial yang kamu pilih?",
      financeHelper: "Pilih yang paling menggambarkan kebiasaanmu saat ini.",
      balanceQuestion: "Seberapa seimbang kerja dan hidup yang kamu inginkan?",
      balanceHelper: "Pilihan ini memengaruhi kesehatan, sosial, dan kebahagiaan.",
      socialQuestion: "Bagaimana kamu ingin membangun hubungan sosial?",
      socialHelper: "Relasi memengaruhi dukungan emosional dan kualitas hidup.",
      habitsQuestion: "Kebiasaan harian apa yang paling dominan?",
      habitsHelper: "Kebiasaan kecil membentuk hasil besar dalam jangka panjang.",
      healthQuestion: "Bagaimana kamu memperlakukan kesehatanmu?",
      healthHelper: "Kesehatan adalah fondasi untuk semua target lainnya.",
    },
    simulation: {
      title: "Menjalankan simulasi",
      description: "Menghitung outcome dan menyiapkan masa depanmu.",
      processing: "Memproses",
      running: "Sedang memproses simulasi...",
      done: "Selesai. Masa depanmu siap dilihat.",
      error: "Gagal memproses simulasi.",
      viewResults: "Lihat Hasil",
      changeChoices: "Ubah keputusan",
    },
    result: {
      title: "Hasil simulasi",
      compare: "Bandingkan",
      tryAgain: "Coba Lagi",
      video: "Video",
      videoUnavailable: "URL video belum tersedia.",
      outcomeSummary: "Ringkasan outcome",
      scenario: "Skenario",
      score: "Skor",
    },
    results: {
      emptyTitle: "Belum ada simulasi",
      emptyDescription:
        "Mulailah perjalananmu dengan membuat keputusan hidup dan melihat berbagai kemungkinan masa depan.",
      startSimulation: "Mulai Simulasi",
      title: "Perbandingan Masa Depan",
      description: "Pilih hingga 3 hasil simulasi untuk dibandingkan secara berdampingan.",
      clearSelection: "Bersihkan pilihan",
      viewDetail: "Lihat Detail",
      allResults: "Semua Hasil Simulasi",
      newSimulation: "Simulasi Baru",
      notFound: "Hasil simulasi tidak ditemukan.",
      backHome: "Kembali ke Beranda",
      backToSimulation: "Kembali ke Simulasi",
      share: "Bagikan",
      compareButton: "Bandingkan",
      futureReflection: "Refleksi Masa Depan",
      reflectionQuote:
        '"Pilihan kecil yang kamu ambil hari ini, dari cara kamu tidur sampai cara kamu mengelola stres, membentuk tempatmu akan berakhir. Masa depan ini hanyalah salah satu dari banyak kemungkinan yang bisa kamu ciptakan."',
      lifeStats: "Statistik Hidup",
      tryDifferentChoices: "Coba Pilihan Berbeda",
      uniqueSimulation: "Setiap keputusan baru akan menghasilkan simulasi masa depan yang unik.",
    },
    comparison: {
      title: "Bandingkan masa depan",
      description: "Pilih hingga 3 hasil simulasi untuk dibandingkan secara berdampingan.",
      startNew: "Mulai Simulasi Baru",
      chooseFutures: "Pilih futures (maks 3)",
      emptyStored: "Belum ada hasil simulasi yang tersimpan.",
      comparisonMetrics: "Metrik perbandingan",
      best: "Terbaik",
      worst: "Terendah",
      videoUnavailable: "URL video belum tersedia.",
    },
  },
}

export const metricLabels = {
  happiness: { en: "Happiness", id: "Kebahagiaan" },
  finance: { en: "Finance", id: "Finansial" },
  health: { en: "Health", id: "Kesehatan" },
  social: { en: "Social", id: "Sosial" },
  fulfillment: { en: "Fulfillment", id: "Kepuasan Hidup" },
}

export const scenarioCopy = {
  positive: {
    title: { en: "Future A (Positive)", id: "Masa Depan A (Positif)" },
    description: {
      en: "Your choices shape a stable, healthy, and meaningful life.",
      id: "Pilihanmu membentuk hidup yang stabil, sehat, dan bermakna.",
    },
  },
  neutral: {
    title: { en: "Future B (Neutral)", id: "Masa Depan B (Netral)" },
    description: {
      en: "You are doing okay, but some patterns still hold back your growth.",
      id: "Kamu baik-baik saja, tapi beberapa pola masih menghambat pertumbuhan.",
    },
  },
  negative: {
    title: { en: "Future C (Negative)", id: "Masa Depan C (Negatif)" },
    description: {
      en: "Small neglected habits make life feel heavier and out of balance.",
      id: "Pola kecil yang diabaikan membuat hidup terasa berat dan tidak seimbang.",
    },
  },
}

export const categoryPromptCopy = {
  sleep: {
    question: { en: messages.en.decisions.sleepQuestion, id: messages.id.decisions.sleepQuestion },
    helper: { en: messages.en.decisions.sleepHelper, id: messages.id.decisions.sleepHelper },
  },
  career: {
    question: {
      en: messages.en.decisions.careerQuestion,
      id: messages.id.decisions.careerQuestion,
    },
    helper: { en: messages.en.decisions.careerHelper, id: messages.id.decisions.careerHelper },
  },
  finance: {
    question: {
      en: messages.en.decisions.financeQuestion,
      id: messages.id.decisions.financeQuestion,
    },
    helper: { en: messages.en.decisions.financeHelper, id: messages.id.decisions.financeHelper },
  },
  balance: {
    question: {
      en: messages.en.decisions.balanceQuestion,
      id: messages.id.decisions.balanceQuestion,
    },
    helper: { en: messages.en.decisions.balanceHelper, id: messages.id.decisions.balanceHelper },
  },
  social: {
    question: {
      en: messages.en.decisions.socialQuestion,
      id: messages.id.decisions.socialQuestion,
    },
    helper: { en: messages.en.decisions.socialHelper, id: messages.id.decisions.socialHelper },
  },
  habits: {
    question: {
      en: messages.en.decisions.habitsQuestion,
      id: messages.id.decisions.habitsQuestion,
    },
    helper: { en: messages.en.decisions.habitsHelper, id: messages.id.decisions.habitsHelper },
  },
  health: {
    question: {
      en: messages.en.decisions.healthQuestion,
      id: messages.id.decisions.healthQuestion,
    },
    helper: { en: messages.en.decisions.healthHelper, id: messages.id.decisions.healthHelper },
  },
}

export function getLocalizedValue(values, locale) {
  const resolved = resolveLocale(locale)
  if (values && typeof values === "object" && values[resolved]) return values[resolved]
  if (values && typeof values === "object" && values[DEFAULT_LOCALE]) return values[DEFAULT_LOCALE]
  return typeof values === "string" ? values : ""
}

export function getMessage(locale, path) {
  const resolved = resolveLocale(locale)
  const source = messages[resolved] || messages[DEFAULT_LOCALE]
  const value = path.split(".").reduce((acc, key) => acc?.[key], source)
  if (typeof value === "string") return value
  const fallback = path.split(".").reduce((acc, key) => acc?.[key], messages[DEFAULT_LOCALE])
  return typeof fallback === "string" ? fallback : path
}
