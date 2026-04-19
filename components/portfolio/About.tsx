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
          <h3 className="mx-auto mb-10 max-w-[900px] text-center font-heading text-[clamp(1.65rem,2.8vw,2.1rem)] font-bold leading-[1.25] tracking-[0.015em] text-[#E6EDF3] [text-shadow:0_0_10px_rgba(230,237,243,0.1)]">
            Applied AI Developer | Machine Learning Enthusiast
          </h3>
        </motion.div>

        <div className="mb-12 grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5 text-base leading-relaxed text-gray-300 md:text-[1.03rem]"
          >
            <div className="mx-auto mb-6 mt-6 max-w-[700px] text-center">
              <p className="mx-auto mt-3 max-w-[560px] text-[0.96rem] font-normal leading-[1.65] text-[#9BA3AF] md:text-[1rem]">
                Focused on developing real-world AI solutions including intelligent systems, data-driven tools, and scalable ML applications.
              </p>
            </div>

            <div className="max-w-[600px] space-y-4 text-left text-[0.96rem] leading-[1.68] text-[#9BA3AF] md:text-[1rem]">
              <p>
                I&apos;m a final-year Computer Science student at <strong className="text-sky-100">{ABOUT.college}</strong>, with a strong focus on Applied AI and Machine Learning. I enjoy building practical solutions that translate AI concepts into real-world applications.
              </p>
              <p>
                I bring a disciplined engineering mindset with hands-on experience in <span className="text-teal-100">Python</span>, <span className="text-cyan-100">NLP</span>, LLM workflows, and API integration, aiming to create efficient and scalable intelligent systems.
              </p>
            </div>
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
