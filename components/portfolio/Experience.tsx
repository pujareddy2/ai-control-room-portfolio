"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "../../lib/portfolio";

export default function Experience() {
  return (
    <section className="relative bg-gradient-to-b from-black via-slate-950/55 to-black px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-4 text-center font-heading text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-violet-200 via-sky-200 to-teal-200 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-violet-300/70 to-teal-200/75" />
        </motion.div>

        <div className="mx-auto max-w-5xl space-y-6">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative rounded-2xl border border-white/16 bg-gradient-to-br from-slate-950/70 to-black/65 p-6 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200/42 hover:shadow-[0_0_30px_rgba(125,211,252,0.14)]">
                <div className="absolute bottom-0 left-0 top-0 w-1 rounded-l bg-gradient-to-b from-sky-200/80 to-teal-300/75" />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-[1.35rem] font-bold tracking-tight text-sky-100 md:text-[1.45rem]">{exp.role}</h3>
                    <p className="mt-1 text-[0.98rem] font-medium text-teal-100/90">{exp.org}</p>
                  </div>
                  <span className="mt-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-mono text-gray-400 md:mt-0 md:text-sm">
                    {exp.duration}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {exp.outcomes.slice(0, 4).map((point, i) => (
                    <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-gray-300">
                      <span className="mt-1 text-sky-200">◆</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 border-t border-white/10 pt-3 text-sm text-cyan-100/80">
                  <span className="font-semibold">Tech:</span> {exp.tools.join(", ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
