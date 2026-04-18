"use client";

import type { ModuleId } from "../../lib/portfolio";
import { ABOUT, CERTIFICATIONS, CONTACT, EXPERIENCE, MODULES, PROJECTS, SKILLS } from "../../lib/portfolio";

type Props = {
  onOpen?: (id: ModuleId) => void;
};

export default function MobileMode({ onOpen }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-2xl px-5 py-7">
        <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-xl">
          <div className="font-heading text-sm tracking-[0.24em] text-white/85">PUJA MIDDE AI PORTFOLIO</div>
          <div className="mt-2 text-sm text-white/60">
            Mobile mode - cinematic scene simplified for smooth reading.
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {MODULES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onOpen?.(m.id)}
              className="rounded-2xl border border-white/10 bg-surface/55 p-5 text-left backdrop-blur-xl hover:border-white/20"
            >
              <div className="font-heading text-xs tracking-[0.22em] text-white/85">{m.label}</div>
              <div className="mt-2 text-sm text-white/60">Tap to open</div>
            </button>
          ))}
        </div>

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
