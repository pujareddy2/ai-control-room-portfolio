"use client";

import { motion } from "framer-motion";
import { ABOUT } from "../../lib/portfolio";

export default function About() {
  return (
    <section className="relative bg-gradient-to-b from-black/85 via-slate-950/60 to-black px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="text-center font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">About Me</h2>
          <p className="mt-3 text-center text-sm font-mono tracking-[0.11em] text-cyan-100/80 md:text-[0.95rem]">
            Applied AI | Machine Learning | Real-world Systems
          </p>

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/12 bg-slate-950/35 p-7 text-left backdrop-blur-sm md:p-9">
            <p className="text-[1.01rem] font-medium leading-[1.68] text-[#9BA3AF] md:text-[1.04rem]">
              Applied AI Developer focused on building intelligent, real-world systems.
            </p>
            <p className="mt-4 text-[0.98rem] leading-[1.68] text-[#9BA3AF] md:text-[1rem]">
              I design and develop AI-driven applications using machine learning, data analysis, and practical system integration.
            </p>
            <p className="mt-4 text-[0.98rem] leading-[1.68] text-[#9BA3AF] md:text-[1rem]">
              My work focuses on solving real-world problems through scalable and user-centric solutions.
            </p>
            <p className="mt-4 text-[0.98rem] leading-[1.68] text-[#9BA3AF] md:text-[1rem]">
              I have worked on projects in healthcare AI, intelligent dashboards, and automation systems.
            </p>
            <p className="mt-4 text-[0.98rem] leading-[1.68] text-[#9BA3AF] md:text-[1rem]">
              I aim to continuously build impactful AI solutions that bridge technology and real-world needs.
            </p>

            <div className="mt-6 rounded-xl border border-cyan-100/18 bg-slate-900/45 p-5 shadow-[0_10px_30px_rgba(56,189,248,0.12)]">
              <h3 className="text-base font-bold text-cyan-100 md:text-lg">Education </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300 md:text-base">
                {ABOUT.college}
              </p>
              <p className="mt-1 text-sm text-gray-300 md:text-base">
                CGPA: 8.8/10
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
