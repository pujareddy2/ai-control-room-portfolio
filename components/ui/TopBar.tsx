"use client";

import { CONTACT } from "../../lib/portfolio";
import {
  ExternalLink,
  GitHub,
  LinkedIn,
  Mail,
  ResumeIcon,
  SpeakerOff,
  SpeakerOn,
} from "./icons";

type Props = {
  soundOn: boolean;
  onToggleSound: () => void;
};

export default function TopBar({ soundOn, onToggleSound }: Props) {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-50">
      <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(0,229,255,0.45)]" />
          <div className="font-heading text-xs tracking-[0.26em] text-white/85">
            PUJA MIDDE AI PORTFOLIO
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            className="rounded-lg border border-white/10 bg-surface/45 px-3 py-2 text-xs text-white/80 backdrop-blur-xl hover:bg-surface/70"
            href={CONTACT.resumeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Resume"
          >
            <span className="inline-flex items-center gap-2">
              <ResumeIcon className="h-4 w-4" />
              Resume
            </span>
          </a>
          <a
            className="rounded-lg border border-white/10 bg-surface/45 p-2 text-white/75 backdrop-blur-xl hover:bg-surface/70"
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedIn className="h-4 w-4" />
          </a>
          <a
            className="rounded-lg border border-white/10 bg-surface/45 p-2 text-white/75 backdrop-blur-xl hover:bg-surface/70"
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <GitHub className="h-4 w-4" />
          </a>
          <a
            className="rounded-lg border border-white/10 bg-surface/45 p-2 text-white/75 backdrop-blur-xl hover:bg-surface/70"
            href={`mailto:${CONTACT.email}`}
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            className="rounded-lg border border-white/10 bg-surface/45 p-2 text-white/75 backdrop-blur-xl hover:bg-surface/70"
            href={CONTACT.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Portfolio link"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onToggleSound}
            className="rounded-lg border border-white/10 bg-surface/45 p-2 text-white/75 backdrop-blur-xl hover:bg-surface/70"
            aria-label={soundOn ? "Mute sound" : "Enable sound"}
          >
            {soundOn ? <SpeakerOn className="h-4 w-4" /> : <SpeakerOff className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
