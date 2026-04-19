"use client";

import { motion } from "framer-motion";
const SKILL_MODULES = [
  {
    title: "AI / Machine Learning",
    tone: "border-cyan-200/35 bg-cyan-950/20",
    groups: [
      { label: "Languages", items: ["Python"] },
      { label: "Libraries / Frameworks", items: ["Scikit-learn", "Pandas", "NumPy", "HuggingFace"] },
      { label: "Concepts", items: ["Machine Learning", "NLP", "LLM Workflows", "Prompt Engineering"] },
    ],
  },
  {
    title: "Data & Analytics",
    tone: "border-sky-200/25 bg-sky-950/16",
    groups: [
      { label: "Processing", items: ["Data Cleaning", "Feature Engineering", "EDA"] },
      { label: "Visualization", items: ["Power BI", "Dashboarding", "KPI Tracking"] },
      { label: "Datastores", items: ["SQL", "MySQL", "Firebase / Firestore"] },
    ],
  },
  {
    title: "Development",
    tone: "border-violet-200/22 bg-violet-950/14",
    groups: [
      { label: "Backend", items: ["FastAPI", "Flask", "REST APIs"] },
      { label: "Frontend", items: ["React", "Next.js", "TypeScript"] },
      { label: "Integration", items: ["OpenAI API", "Gemini API", "GitHub API"] },
    ],
  },
  {
    title: "Tools & Platforms",
    tone: "border-teal-200/22 bg-teal-950/14",
    groups: [
      { label: "Developer Tools", items: ["Git", "GitHub", "VS Code", "Jupyter"] },
      { label: "Cloud", items: ["Google Cloud", "Oracle Cloud"] },
      { label: "Workflow", items: ["Model Testing", "API Debugging", "Deployment Basics"] },
    ],
  },
];

export default function SkillsCarousel() {

  return (
    <section className="relative bg-gradient-to-b from-black via-slate-950/50 to-black px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-4 text-center font-heading text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-slate-100 via-sky-100 to-teal-100 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-300/70 to-teal-200/70 mx-auto mt-4" />
        </motion.div>

        <p className="mx-auto mb-10 max-w-xl text-center text-sm text-gray-300 md:text-base">
          Technologies I use to design and build AI-driven solutions
        </p>

        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {SKILL_MODULES.map((module, idx) => (
            <motion.article
              key={module.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(148,205,255,0.12)] ${module.tone} ${idx === 0 ? "md:col-span-2" : ""}`}
            >
              <h3 className={`font-heading tracking-tight ${idx === 0 ? "text-2xl text-cyan-100 md:text-[1.85rem]" : "text-xl text-white"}`}>
                {module.title}
              </h3>

              <div className={`mt-5 grid gap-4 ${idx === 0 ? "md:grid-cols-3" : "md:grid-cols-1"}`}>
                {module.groups.map((group) => (
                  <div key={group.label} className="rounded-xl border border-white/12 bg-black/24 p-4 transition hover:border-white/22">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-sky-100/80">{group.label}</p>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-gray-200 transition group-hover:text-white">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-200/85" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
          </div>
      </div>
    </section>
  );
}
