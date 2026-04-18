"use client";

import { motion } from "framer-motion";
import type { ModuleId } from "../../lib/portfolio";
import { ABOUT, CERTIFICATIONS, CONTACT, EXPERIENCE, MODULES, PROJECTS, SKILLS } from "../../lib/portfolio";

type Props = {
  onOpen?: (id: ModuleId) => void;
  onOpen3DRoom?: () => void;
};

export default function MobileMode({ onOpen, onOpen3DRoom }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="hud-grid-bg absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(14,116,144,0.2),transparent_40%)]" />
      </div>
      <div className="mx-auto w-full max-w-2xl px-5 py-7">
        <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-xl">
          <div className="font-heading text-sm tracking-[0.24em] text-shimmer">PUJA MIDDE AI PORTFOLIO</div>
          <div className="mt-2 text-sm text-white/60">
            Mobile mode - cinematic scene simplified for smooth reading.
          </div>
          <button
            type="button"
            onClick={onOpen3DRoom}
            className="mt-4 rounded-xl border border-cyan-200/35 bg-cyan-100/10 px-4 py-2 text-xs font-mono tracking-[0.16em] text-cyan-100 transition hover:bg-cyan-100/20"
          >
            OPEN 3D AI ROOM
          </button>
        </div>

        <motion.div
          className="mt-6 grid gap-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
        >
          {MODULES.map((m, index) => (
            <motion.button
              key={m.id}
              type="button"
              onClick={() => onOpen?.(m.id)}
              className="rounded-2xl border border-white/10 bg-surface/55 p-5 text-left backdrop-blur-xl hover:border-white/20"
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.28, delay: index * 0.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-heading text-xs tracking-[0.22em] text-white/85">{m.label}</div>
              <div className="mt-2 text-sm text-white/60">Tap to open</div>
            </motion.button>
          ))}
        </motion.div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-surface/40 p-5 text-sm text-white/65">
          <div className="font-heading text-xs tracking-[0.22em] text-white/80">QUICK PREVIEW</div>
          <div className="mt-3 space-y-2">
            <div>
              <span className="text-white/80">About:</span> {ABOUT.title}
            </div>
            <div>
              <span className="text-white/80">Projects:</span> {PROJECTS.length} complete case studies
            </div>
            <div>
              <span className="text-white/80">Skills:</span> {SKILLS.programmingLanguages.slice(0, 3).join(", ")}...
            </div>
            <div>
              <span className="text-white/80">Experience:</span> {EXPERIENCE.length} internships
            </div>
            <div>
              <span className="text-white/80">Certifications:</span> {CERTIFICATIONS.length}
            </div>
            <div>
              <span className="text-white/80">Contact:</span> {CONTACT.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
