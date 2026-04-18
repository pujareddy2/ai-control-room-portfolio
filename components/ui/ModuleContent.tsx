"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { ModuleId } from "../../lib/portfolio";
import {
  ABOUT,
  ACHIEVEMENTS,
  CERTIFICATIONS,
  CONTACT,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
} from "../../lib/portfolio";
import ContactForm from "./ContactForm";
import { ExternalLink, GitHub, LinkedIn, Mail, ResumeIcon, X } from "./icons";

type Props = {
  id: ModuleId;
};

const skillGroups = [
  { title: "Programming Languages", items: SKILLS.programmingLanguages },
  { title: "AI / ML", items: SKILLS.aiMl },
  { title: "Frameworks / APIs", items: SKILLS.frameworksApis },
  { title: "Databases / Cloud", items: SKILLS.databasesCloud },
  { title: "Developer Tools", items: SKILLS.developerTools },
] as const;

function ProjectVisual({ title, image }: { title: string; image?: string }) {
  const palette = useMemo(() => {
    const colors = [
      "from-cyan-500/25 via-slate-900/85 to-blue-900/35",
      "from-blue-500/25 via-slate-900/85 to-cyan-900/35",
      "from-sky-500/25 via-slate-900/85 to-indigo-900/35",
      "from-teal-500/25 via-slate-900/85 to-blue-950/35",
    ];
    const hash = [...title].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return colors[hash % colors.length];
  }, [title]);

  return (
    <div className={`relative h-40 rounded-xl border border-white/10 bg-linear-to-br ${palette}`}>
      {image ? (
        <Image
          src={image}
          alt={`${title} project visual`}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="absolute inset-0 rounded-xl object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.25),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(96,165,250,0.2),transparent_45%)]" />
      <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-xs text-white/80 backdrop-blur-sm">
        {title}
      </div>
    </div>
  );
}

export default function ModuleContent({ id }: Props) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

  const listVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  if (id === "about") {
    return (
      <div className="space-y-5 text-sm text-white/75">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="font-heading text-xs tracking-[0.2em] text-white/80">ABOUT ME</div>
          <p className="mt-3 leading-7 text-white/85">{ABOUT.summary}</p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <div>
              <span className="text-white/90">Role:</span> {ABOUT.title}
            </div>
            <div>
              <span className="text-white/90">Education:</span> {ABOUT.education}
            </div>
            <div>
              <span className="text-white/90">College:</span> {ABOUT.college}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
          >
            <LinkedIn className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
          >
            <GitHub className="h-4 w-4" /> GitHub
          </a>
          <a
            href={CONTACT.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
          >
            <ResumeIcon className="h-4 w-4" /> Resume
          </a>
        </div>
      </div>
    );
  }

  if (id === "projects") {
    const project = selectedProject != null ? PROJECTS[selectedProject] : null;

    return (
      <motion.div
        className="space-y-4"
        variants={listVariants}
        initial="hidden"
        animate="show"
      >
        {PROJECTS.map((p, index) => (
          <motion.article
            key={p.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
            variants={itemVariants}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -2, scale: 1.01 }}
          >
            <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="font-heading text-xs tracking-[0.18em] text-white/90">{p.title}</div>
                {p.subtitle ? <div className="mt-1 text-xs text-cyan-200/80">{p.subtitle}</div> : null}
                <p className="mt-3 text-sm leading-6 text-white/75">{p.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <span
                      key={`${p.title}-${tech}`}
                      className="rounded-full border border-white/10 bg-surface/60 px-2.5 py-1 text-[11px] text-white/75"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(index)}
                    className="rounded-lg border border-cyan-300/25 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-100 transition hover:bg-cyan-500/20"
                  >
                    Open Case Study
                  </button>
                  {p.links.live ? (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
                    >
                      Live
                    </a>
                  ) : null}
                  {p.links.github ? (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
                    >
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
              <ProjectVisual title={p.title} image={p.image} />
            </div>
          </motion.article>
        ))}

        <AnimatePresence>
          {project ? (
            <motion.div
              className="fixed inset-0 z-80 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="absolute inset-0 bg-black/70" onClick={() => setSelectedProject(null)} />
              <motion.div
                className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-surface/85 shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
                initial={{ y: 20, scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 12, scale: 0.98, opacity: 0 }}
              >
                <div className="flex items-start justify-between border-b border-white/10 px-5 py-4">
                  <div>
                    <div className="font-heading text-sm tracking-[0.17em] text-white/90">{project.title}</div>
                    {project.subtitle ? (
                      <div className="mt-1 text-xs text-cyan-200/80">{project.subtitle}</div>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
                    aria-label="Close project details"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-[78vh] space-y-5 overflow-auto px-5 py-5">
                  <ProjectVisual title={project.title} image={project.image} />
                  <p className="text-sm leading-7 text-white/80">{project.paragraphs[0]}</p>
                  <p className="text-sm leading-7 text-white/75">{project.paragraphs[1]}</p>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-heading text-xs tracking-[0.16em] text-white/85">KEY HIGHLIGHTS</div>
                    <div className="mt-3 grid gap-2 text-sm text-white/75">
                      {project.highlights.map((item) => (
                        <div key={item} className="flex gap-2">
                          <span className="text-cyan-300">&gt;</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {project.contribution ? (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/75">
                      <span className="text-white/90">Contribution:</span> {project.contribution}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={`modal-${project.title}-${tech}`}
                        className="rounded-full border border-white/10 bg-surface/60 px-3 py-1 text-xs text-white/75"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pb-2">
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-500/20"
                      >
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    ) : null}
                    {project.links.github ? (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
                      >
                        <GitHub className="h-4 w-4" /> GitHub
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (id === "skills") {
    return (
      <motion.div className="grid gap-4" variants={listVariants} initial="hidden" animate="show">
        {skillGroups.map((group) => (
          <motion.div key={group.title} className="rounded-xl border border-white/10 bg-white/5 p-4" variants={itemVariants} transition={{ duration: 0.35 }}>
            <div className="font-heading text-xs tracking-[0.18em] text-white/85">{group.title}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={`${group.title}-${skill}`}
                  className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-xs text-white/80 transition hover:scale-[1.02] hover:bg-cyan-500/15"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (id === "experience") {
    const item = selectedExperience != null ? EXPERIENCE[selectedExperience] : null;

    return (
      <motion.div className="space-y-3" variants={listVariants} initial="hidden" animate="show">
        {EXPERIENCE.map((exp, index) => (
          <motion.button
            key={`${exp.org}-${exp.role}`}
            type="button"
            onClick={() => setSelectedExperience(index)}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
            variants={itemVariants}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -2, scale: 1.01 }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="font-heading text-xs tracking-[0.18em] text-white/85">{exp.role}</div>
              <div className="text-xs text-cyan-200/75">{exp.duration}</div>
            </div>
            <div className="mt-1 text-sm text-white/85">{exp.org}</div>
            <div className="mt-2 text-sm text-white/70">{exp.summary}</div>
          </motion.button>
        ))}

        <AnimatePresence>
          {item ? (
            <motion.div
              className="fixed inset-0 z-80 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="absolute inset-0 bg-black/70" onClick={() => setSelectedExperience(null)} />
              <motion.div
                className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-surface/85 backdrop-blur-2xl"
                initial={{ y: 20, scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 12, scale: 0.98, opacity: 0 }}
              >
                <div className="flex items-start justify-between border-b border-white/10 px-5 py-4">
                  <div>
                    <div className="font-heading text-sm tracking-[0.16em] text-white/90">{item.role}</div>
                    <div className="mt-1 text-xs text-cyan-200/75">{item.org} - {item.duration}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedExperience(null)}
                    className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
                    aria-label="Close experience details"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-[78vh] space-y-5 overflow-auto px-5 py-5 text-sm leading-7 text-white/78">
                  <p>{item.paragraphs[0]}</p>
                  <p>{item.paragraphs[1]}</p>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-heading text-xs tracking-[0.16em] text-white/85">TOOLS USED</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tools.map((tool) => (
                        <span
                          key={`${item.org}-${tool}`}
                          className="rounded-full border border-white/10 bg-surface/55 px-3 py-1 text-xs text-white/78"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-heading text-xs tracking-[0.16em] text-white/85">OUTCOMES & IMPACT</div>
                    <div className="mt-3 grid gap-2 text-sm text-white/75">
                      {item.outcomes.map((outcome) => (
                        <div key={outcome} className="flex gap-2">
                          <span className="text-cyan-300">&gt;</span>
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (id === "certifications") {
    return (
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/25 hover:bg-white/[0.07]"
            >
              <div className="font-heading text-xs tracking-[0.15em] text-white/88">{cert.title}</div>
              <div className="mt-2 text-xs text-white/65">{cert.issuer}</div>
              {cert.year ? <div className="mt-2 text-xs text-cyan-200/75">Issued: {cert.year}</div> : null}
              {cert.credentialId ? (
                <div className="mt-1 text-xs text-white/55">Credential ID: {cert.credentialId}</div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="font-heading text-xs tracking-[0.18em] text-white/85">ACHIEVEMENTS</div>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            {ACHIEVEMENTS.map((a) => (
              <div key={a} className="flex gap-2">
                <span className="text-cyan-300">&gt;</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (id === "contact") {
    return (
      <div className="space-y-4 text-sm text-white/75">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="font-heading text-xs tracking-[0.2em] text-white/80">LET&apos;S BUILD SOMETHING IMPACTFUL</div>
          <div className="mt-3 grid gap-2">
            <div>
              <span className="text-white/90">Phone:</span> <a href={`tel:${CONTACT.phone}`} className="hover:text-cyan-200">{CONTACT.phone}</a>
            </div>
            <div>
              <span className="text-white/90">Email:</span> <a href={`mailto:${CONTACT.email}`} className="hover:text-cyan-200">{CONTACT.email}</a>
            </div>
            <div>
              <span className="text-white/90">LinkedIn:</span> <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-200">{CONTACT.linkedin}</a>
            </div>
            <div>
              <span className="text-white/90">GitHub:</span> <a href={CONTACT.github} target="_blank" rel="noreferrer" className="hover:text-cyan-200">{CONTACT.github}</a>
            </div>
            <div>
              <span className="text-white/90">Portfolio:</span> <a href={CONTACT.portfolioUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-200">{CONTACT.portfolioUrl}</a>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a href={`mailto:${CONTACT.email}`} className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10" aria-label="LinkedIn">
              <LinkedIn className="h-4 w-4" />
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10" aria-label="GitHub">
              <GitHub className="h-4 w-4" />
            </a>
            <a href={CONTACT.resumeUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10" aria-label="Resume">
              <ResumeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="font-heading text-xs tracking-[0.2em] text-white/75">MESSAGE</div>
          <ContactForm />
        </div>
      </div>
    );
  }

  return null;
}
