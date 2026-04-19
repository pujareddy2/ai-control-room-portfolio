"use client";

import { motion } from "framer-motion";

const CERTIFICATIONS = [
  {
    title: "Oracle Cloud Infrastructure – AI Foundations Associate",
    issuer: "Oracle",
    year: "2025",
  },
  {
    title: "Crash Course on Python",
    issuer: "Google / Coursera",
    year: "2024",
  },
  {
    title: "Machine Learning with Python",
    issuer: "IBM",
    year: "2024",
  },
  {
    title: "Customer Clustering with KMeans",
    issuer: "IBM",
    year: "2024",
  },
  {
    title: "Data Analytics Simulation",
    issuer: "Deloitte / Forage",
    year: "2025",
  },
  {
    title: "IoT Bootcamp",
    issuer: "NIELIT / FutureSkills PRIME",
    year: "2024",
  },
  {
    title: "AI Internship",
    issuer: "Microsoft / Edunet / AICTE",
    year: "2025",
  },
];

const ACHIEVEMENTS = [
  { title: "Runner-Up", event: "AIHack Days 2025 (Viswam.AI)" },
  { title: "3rd Place", event: "Infinity 2K25 Hackathon" },
  { title: "Top Performer", event: "Flipkart GRiD Challenge" },
  { title: "State 1st Rank", event: "Intermediate (2022)" },
  { title: "Winner", event: "3 State-Level Literary Competitions" },
];

export default function Certifications() {
  return (
    <section className="bg-gradient-to-b from-black via-slate-950/50 to-black px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-2 font-heading text-3xl font-bold tracking-tight text-orange-100 md:text-4xl">
              Achievements
            </h2>
            <div className="mb-8 h-1 w-24 bg-gradient-to-r from-orange-200/70 to-rose-200/70" />

            <div className="space-y-4">
              {ACHIEVEMENTS.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/15 bg-gradient-to-r from-orange-950/35 to-rose-950/28 p-5 transition hover:border-orange-200/35"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-orange-400">🏆</span>
                    <div>
                      <h4 className="text-base font-semibold text-white">{achievement.title}</h4>
                      <p className="mt-1 text-sm font-mono text-orange-200/80">{achievement.event}</p>
                      <p className="mt-2 text-sm leading-relaxed text-orange-100/65">Recognized for delivering high-quality technical execution and measurable project impact.</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-2 font-heading text-3xl font-bold tracking-tight text-amber-100 md:text-4xl">
              Certifications
            </h2>
            <div className="mb-8 h-1 w-20 bg-gradient-to-r from-amber-200/70 to-orange-200/70" />

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/15 bg-slate-950/65 p-4 transition hover:border-amber-200/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{cert.title}</h4>
                      <p className="mt-1 text-xs font-mono text-amber-100/80">{cert.issuer}</p>
                      <p className="mt-1 text-xs text-gray-400">Supports practical AI and software engineering capabilities.</p>
                    </div>
                    <span className="whitespace-nowrap text-xs font-mono text-gray-500">{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
