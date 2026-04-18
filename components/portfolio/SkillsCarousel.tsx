"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const SKILL_CATEGORIES = {
  "Programming Languages": ["Python", "JavaScript", "Java", "C", "HTML", "CSS", "TypeScript"],
  "AI & Machine Learning": ["LLMs", "Generative AI", "NLP", "PyTorch", "TensorFlow", "Scikit-learn", "HuggingFace", "CNN"],
  "Frameworks & APIs": ["FastAPI", "Flask", "React", "Streamlit", "Next.js", "OpenAI API", "Gemini API", "REST APIs"],
  "Databases & Cloud": ["Firebase", "SQL", "MySQL", "GCP", "Oracle Cloud", "GitHub", "Git"],
};

export default function SkillsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = Object.entries(SKILL_CATEGORIES);
  const totalCategories = categories.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCategories);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalCategories]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index % totalCategories);
  };

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

        <div className="relative">
          <div ref={scrollContainerRef} className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}%))`,
              }}
            >
              {categories.map(([category, skills], idx) => (
                <motion.div
                  key={idx}
                  className="w-full flex-shrink-0 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-slate-950/80 to-black/60 p-8 backdrop-blur md:p-12">
                    <h3 className="mb-8 font-heading text-2xl font-bold tracking-tight text-sky-100 md:text-3xl">
                      {category}
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="group cursor-pointer rounded-xl border border-slate-200/20 bg-slate-100/5 px-4 py-3 text-center transition hover:border-sky-200/45 hover:bg-sky-200/10"
                        >
                          <span className="font-mono text-sm text-gray-200 transition group-hover:text-sky-100">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-sky-300"
                    : "bg-gray-600 w-2 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="mt-6 text-center text-gray-400 text-sm font-mono">
            {currentIndex + 1} / {totalCategories}
          </div>
        </div>
      </div>
    </section>
  );
}
