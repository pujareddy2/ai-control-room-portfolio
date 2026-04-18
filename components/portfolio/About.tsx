"use client";

import { motion } from "framer-motion";
import { ABOUT } from "../../lib/portfolio";

export default function About() {
  return (
    <section className="relative bg-gradient-to-b from-black/80 via-slate-950/60 to-black px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-center font-heading text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="mx-auto mb-12 h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-200" />
        </motion.div>

        <div className="mb-12 grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 text-base leading-relaxed text-gray-300 md:text-[1.03rem]"
          >
            <p>
              I&apos;m a fresher and final-year Computer Science student at <strong className="text-sky-100">{ABOUT.college}</strong>, focused on Applied AI and Machine Learning.
            </p>
            <p>
              I enjoy building meaningful, real-world solutions from AI ideas, whether it is intelligent assistants, data-driven tools, or full-stack ML products.
            </p>
            <p>
              I bring a positive, disciplined engineering mindset with strong foundations in <span className="text-teal-100">Python</span>, <span className="text-cyan-100">NLP</span>, LLM workflows, and API integration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/15 bg-sky-950/20 p-6 backdrop-blur">
              <div className="mb-2 text-sm font-mono text-sky-100/90">EDUCATION</div>
              <div className="text-lg font-semibold text-white">{ABOUT.education}</div>
              <div className="text-gray-400 text-sm mt-1">Expected 2027</div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-teal-950/20 p-6 backdrop-blur">
              <div className="mb-2 text-sm font-mono text-teal-100/90">FOCUS AREAS</div>
              <div className="flex flex-wrap gap-2">
                {["Generative AI", "NLP", "Machine Learning", "RAG Systems", "Full-Stack AI Apps"].map((tag) => (
                  <span key={tag} className="rounded-xl border border-white/25 bg-white/10 px-3 py-1 text-xs font-mono text-gray-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
