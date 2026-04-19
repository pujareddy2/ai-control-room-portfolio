"use client";

import { ABOUT, CONTACT } from "../../lib/portfolio";
import { GitHub, LinkedIn, Mail, SpeakerOff, SpeakerOn } from "./icons";

type Props = {
  soundOn: boolean;
  onToggleSound: () => void;
};

export default function TopBar({ soundOn, onToggleSound }: Props) {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-50">
      <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="inline-flex items-center rounded-lg border border-white/10 bg-surface/45 px-3 py-2 backdrop-blur-xl">
          <span className="font-heading text-xs tracking-[0.2em] text-white/85">{ABOUT.name.toUpperCase()}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface/45 px-2 py-1.5 backdrop-blur-xl">
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-white/75 transition hover:bg-white/10 hover:text-sky-200"
            aria-label="Open LinkedIn"
          >
            <LinkedIn className="h-4 w-4" />
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-white/75 transition hover:bg-white/10 hover:text-gray-100"
            aria-label="Open GitHub"
          >
            <GitHub className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="rounded-md p-1.5 text-white/75 transition hover:bg-white/10 hover:text-emerald-200"
            aria-label="Send email"
          >
            <Mail className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={onToggleSound}
            className="inline-flex items-center gap-1.5 rounded-md p-1.5 text-white/75 transition hover:bg-white/10"
            aria-label={soundOn ? "Mute sound" : "Enable sound"}
          >
            {soundOn ? <SpeakerOn className="h-4 w-4" /> : <SpeakerOff className="h-4 w-4" />}
            <span className="text-[11px] font-mono uppercase tracking-[0.08em]">Audio</span>
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
