"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Film, GitCompare, Sparkles, Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/30 via-violet-500/20 to-cyan-400/20 blur-3xl"
          animate={{ y: [0, 18, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-56 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-emerald-400/15 via-cyan-400/15 to-indigo-500/20 blur-3xl"
          animate={{ y: [0, -16, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>

      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12"
          >
            <div className="flex flex-col gap-5">
              <motion.div variants={item} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-medium text-neutral-700 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70 dark:text-neutral-200">
                  <Sparkles className="h-4 w-4" />
                  Future Self Simulator
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  Cinematic • Interactive • AI-powered
                </span>
              </motion.div>

              <motion.h1
                variants={item}
                className="text-balance text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl"
              >
                Simulasikan masa depan berdasarkan pilihan hidupmu.
              </motion.h1>

              <motion.p
                variants={item}
                className="max-w-xl text-pretty text-base leading-7 text-neutral-700 dark:text-neutral-300 sm:text-lg"
              >
                Pilih keputusan di berbagai kategori, lalu lihat kemungkinan outcome masa depan
                lewat pengalaman visual sinematik. Cocok untuk refleksi, eksplorasi skenario, dan
                diskusi bareng teman.
              </motion.p>

              <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
                <Button as={Link} href="/decisions" className="rounded-full">
                  Start Simulation
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button as={Link} href="/comparison" variant="outline" className="rounded-full">
                  Compare Futures
                </Button>
              </motion.div>

              <motion.div
                variants={item}
                className="grid grid-cols-3 gap-3 pt-2 text-xs text-neutral-600 dark:text-neutral-400"
              >
                <div className="rounded-lg border border-neutral-200 bg-white/60 px-3 py-2 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/60">
                  7 kategori keputusan
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white/60 px-3 py-2 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/60">
                  Multi-outcome
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white/60 px-3 py-2 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/60">
                  Simpan & bandingkan
                </div>
              </motion.div>
            </div>

            <motion.div variants={item} className="relative">
              <div className="absolute -inset-6 rounded-3xl border border-neutral-200/60 bg-white/40 backdrop-blur dark:border-neutral-800/60 dark:bg-neutral-950/40" />
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Preview Flow
                  </CardTitle>
                  <CardDescription>
                    Ini preview UI. Video AI & decision engine akan dihubungkan setelah logic siap.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="grid gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/40">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">Keputusan</span>
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">
                        Step 1/7
                      </span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <Pill label="Tidur" value="Seimbang" />
                      <Pill label="Karir" value="WLB" />
                      <Pill label="Finansial" value="Hemat" />
                    </div>
                  </div>

                  <div className="grid gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/40">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">Simulasi</span>
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">
                        Generating…
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                      <motion.div
                        className="h-full w-2/3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                        initial={{ x: "-20%" }}
                        animate={{ x: ["-20%", "0%", "-20%"] }}
                        transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/40">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">Result</span>
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">
                        Positive outcome
                      </span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <Metric label="Health" value="82" />
                      <Metric label="Wealth" value="68" />
                      <Metric label="Happiness" value="90" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-neutral-200/60 dark:border-neutral-800/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8"
          >
            <motion.div variants={item} className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                Kenapa Future Self Simulator?
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                Dibangun untuk pengalaman cepat dan jelas: pilih keputusan, lihat outcome, lalu
                bandingkan beberapa masa depan.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={Film}
                title="Sinematik"
                description="Output berupa video AI-generated (PixVerse) untuk memperkuat imajinasi dan emosi."
              />
              <FeatureCard
                icon={GitCompare}
                title="Compare Futures"
                description="Simpan beberapa hasil simulasi dan bandingkan metriknya secara berdampingan."
              />
              <FeatureCard
                icon={Wand2}
                title="Simple Flow"
                description="Struktur langkah yang jelas, cocok untuk pengalaman hackathon yang cepat tapi polished."
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function Pill({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-950">
      <span className="text-neutral-600 dark:text-neutral-400">{label}</span>
      <span className="font-medium text-neutral-900 dark:text-neutral-50">{value}</span>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="text-xs text-neutral-600 dark:text-neutral-400">{label}</div>
      <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{value}</div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div variants={item}>
      <Card className={cn("h-full")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent />
      </Card>
    </motion.div>
  )
}
