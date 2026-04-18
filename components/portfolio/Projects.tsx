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
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => setSelectedIndex(idx)}
                className="group cursor-pointer rounded-2xl border-2 border-white/45 bg-gradient-to-br from-slate-950/92 via-black to-slate-950/92 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.28),0_28px_82px_rgba(0,0,0,0.76),0_0_50px_rgba(148,163,184,0.16)] md:p-5"
              >
                <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
                  <div
                    className={`relative min-h-[280px] overflow-hidden rounded-xl border border-white/20 bg-black/40 lg:min-h-[360px] ${
                      isReverse ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className="relative h-full w-full"
                      aria-label={`Open details for ${project.title}`}
                    >
                      <Image
                        src={imageSrc}
                        alt={project.title}
                        fill
                        priority={idx < 2}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover grayscale-[0.05] transition duration-500 group-hover:scale-[1.035]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/20 bg-black/52 px-4 py-3 text-left backdrop-blur-sm">
                        <div className="font-heading text-xl tracking-wide text-white">{project.title}</div>
                        <div className="mt-1 text-xs font-mono tracking-[0.16em] text-gray-300/80">{project.subtitle}</div>
                      </div>
                    </button>
                  </div>

                  <div
                    onClick={() => setSelectedIndex(idx)}
                    className={`flex flex-col justify-center rounded-xl border border-white/20 bg-black/35 p-6 md:p-8 lg:p-9 ${
                      isReverse ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <p className="text-base leading-relaxed text-gray-300 md:text-[1.03rem]">
                      {project.summary}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-gray-400">
                      {project.paragraphs[0]}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {project.stack.slice(0, 7).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/20 bg-white/[0.07] px-3 py-1 text-xs font-mono text-gray-100"
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
                            className="inline-flex items-center gap-2 rounded-lg border border-sky-100/40 bg-sky-100/10 px-4 py-2.5 font-mono text-sm text-sky-50 shadow-[0_0_18px_rgba(186,230,253,0.14)] transition hover:-translate-y-0.5 hover:bg-sky-100/18"
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
                            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/8 px-4 py-2.5 font-mono text-sm text-gray-100 shadow-[0_0_16px_rgba(203,213,225,0.12)] transition hover:-translate-y-0.5 hover:bg-white/15"
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
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="relative min-h-[280px] overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={selectedProject.image ?? "/projects/producthub.svg"}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-heading text-3xl text-white">{selectedProject.title}</h3>
                  <p className="mt-2 font-mono text-xs tracking-[0.18em] text-cyan-100/80">{selectedProject.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-300">{selectedProject.summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{selectedProject.paragraphs[0]}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{selectedProject.paragraphs[1]}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedProject.stack.map((item) => (
                      <span key={item} className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-xs font-mono text-gray-200">
                        {item}
                      </span>
                    ))}
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

              <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-mono text-xs tracking-[0.16em] text-cyan-100/75">DETAIL HIGHLIGHTS</div>
                <ul className="mt-3 space-y-2 text-sm text-gray-300">
                  {selectedProject.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-200" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProject.contribution ? (
                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-gray-300">
                  <span className="font-mono text-xs tracking-[0.16em] text-cyan-100/75">MY CONTRIBUTION</span>
                  <p className="mt-2 leading-relaxed">{selectedProject.contribution}</p>
                </div>
              ) : null}

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
