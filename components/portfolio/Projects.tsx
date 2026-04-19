"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PROJECTS } from "@/lib/portfolio";
import { ExternalLink, GitHub } from "../ui/icons";

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedProject = selectedIndex == null ? null : PROJECTS[selectedIndex];

  return (
    <section id="projects" className="bg-gradient-to-b from-black/70 via-gray-950/85 to-black/70 px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">Projects</h2>
        </motion.div>

        <div className="space-y-10">
          {PROJECTS.map((project, idx) => {
            const isReverse = idx % 2 === 1;
            const imageSrc = project.image ?? "/projects/producthub.svg";
            const imageSpan = idx % 3 === 0 ? "lg:col-span-6" : "lg:col-span-5";
            const textSpan = idx % 3 === 0 ? "lg:col-span-4" : "lg:col-span-5";
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => setSelectedIndex(idx)}
                className="group cursor-pointer rounded-2xl border border-white/22 bg-gradient-to-br from-slate-950/95 via-black to-slate-950/90 p-4 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_18px_40px_rgba(0,0,0,0.56),10px_16px_0_rgba(2,6,23,0.34)] md:p-5"
              >
                <div className="grid gap-4 lg:grid-cols-10 lg:gap-5">
                  <div
                    className={`relative w-full overflow-hidden rounded-xl bg-black/35 ${imageSpan} ${
                      isReverse ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className="relative block w-full group"
                      aria-label={`Open details for ${project.title}`}
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/15 bg-slate-900/55">
                        <Image
                          src={imageSrc}
                          alt={project.title}
                          fill
                          priority={idx < 2}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                      </div>
                    </button>
                  </div>

                  <div
                    onClick={() => setSelectedIndex(idx)}
                    className={`flex flex-col justify-center rounded-xl bg-slate-950/28 p-6 md:p-8 lg:p-9 ${textSpan} ${
                      isReverse ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <h3 className="font-heading text-2xl tracking-tight text-white">{project.title}</h3>
                    <p className="mt-2 text-sm font-mono tracking-[0.12em] text-sky-100/75">{project.subtitle}</p>

                    <div className="my-5 h-px w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

                    <p className="text-[1rem] leading-relaxed text-gray-200">
                      {project.summary}
                    </p>

                    <div className="my-5 h-px w-full bg-gradient-to-r from-white/16 via-white/8 to-transparent" />

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {project.stack.slice(0, 7).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/16 bg-white/[0.04] px-3 py-1 text-xs font-mono text-gray-200/95"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {(project.links.live || project.links.github) ? (
                      <div className="mt-7 flex flex-wrap gap-3">
                        {project.links.live ? (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-lg border border-sky-100/30 bg-sky-100/8 px-4 py-2.5 font-mono text-sm text-sky-50 shadow-[0_0_12px_rgba(186,230,253,0.1)] transition hover:-translate-y-0.5 hover:bg-sky-100/16"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Link
                          </a>
                        ) : null}

                        {project.links.github ? (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/24 bg-white/6 px-4 py-2.5 font-mono text-sm text-gray-100 shadow-[0_0_12px_rgba(203,213,225,0.08)] transition hover:-translate-y-0.5 hover:bg-white/13"
                          >
                            <GitHub className="h-4 w-4" />
                            GitHub Link
                          </a>
                        ) : null}
                      </div>
                    ) : null}

                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[88vh] w-full max-w-5xl overflow-auto rounded-2xl border border-white/15 bg-gradient-to-b from-gray-950 to-black p-5 shadow-[0_30px_100px_rgba(0,0,0,0.75)] md:p-8"
            >
              <div className="flex flex-col gap-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/55">
                  <Image
                    src={selectedProject.image ?? "/projects/producthub.svg"}
                    alt={selectedProject.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>

                <div>
                  <h3 className="font-heading text-3xl text-white">{selectedProject.title}</h3>
                  <p className="mt-2 font-mono text-xs tracking-[0.18em] text-cyan-100/80">{selectedProject.subtitle}</p>

                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-300">
                    <div>
                      <h4 className="font-mono text-xs tracking-[0.14em] text-cyan-100/80">PROJECT OVERVIEW</h4>
                      <p className="mt-1">{selectedProject.summary}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs tracking-[0.14em] text-cyan-100/80">PROBLEM CONTEXT</h4>
                      <p className="mt-1">{selectedProject.paragraphs[0]}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs tracking-[0.14em] text-cyan-100/80">APPROACH / METHODOLOGY</h4>
                      <p className="mt-1">{selectedProject.paragraphs[1]}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs tracking-[0.14em] text-cyan-100/80">KEY FEATURES</h4>
                      <ul className="mt-2 space-y-1.5">
                        {selectedProject.highlights.slice(0, 4).map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-200" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs tracking-[0.14em] text-cyan-100/80">TECHNICAL IMPLEMENTATION</h4>
                      <p className="mt-1">The solution integrates modular APIs, data handling pipelines, and model-assisted logic with production-oriented frontend and backend orchestration.</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs tracking-[0.14em] text-cyan-100/80">CHALLENGES & SOLUTIONS</h4>
                      <ul className="mt-2 space-y-1.5">
                        <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-200" /><span>Handled data inconsistency with structured preprocessing and validation layers.</span></li>
                        <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-200" /><span>Improved response quality through iterative prompt/model and pipeline tuning.</span></li>
                        <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-200" /><span>Reduced integration friction by standardizing API contracts and reusable modules.</span></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs tracking-[0.14em] text-cyan-100/80">OUTCOME / RESULT</h4>
                      <p className="mt-1">Delivered a reliable, user-friendly system with clear technical depth and real-world applicability.</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs tracking-[0.14em] text-cyan-100/80">TECH STACK</h4>
                      <p className="mt-1">Tech: {selectedProject.stack.join(", ")}</p>
                    </div>
                  </div>

                  {(selectedProject.links.live || selectedProject.links.github) ? (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {selectedProject.links.live ? (
                        <a
                          href={selectedProject.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/45 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Link
                        </a>
                      ) : null}
                      {selectedProject.links.github ? (
                        <a
                          href={selectedProject.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/15"
                        >
                          <GitHub className="h-4 w-4" />
                          GitHub Link
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/15"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
