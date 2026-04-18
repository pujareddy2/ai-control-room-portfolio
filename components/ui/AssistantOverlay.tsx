"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "./icons";

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export default function AssistantOverlay({ open, message, onClose }: Props) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="absolute bottom-4 right-4 z-40 w-[min(520px,92vw)] sm:bottom-5 sm:right-5"
          initial={{ y: 18, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 14, opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <div className="scanline-overlay relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-surface/60 p-4 shadow-[0_0_40px_rgba(0,229,255,0.18)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.18),transparent_46%)]" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-heading text-xs tracking-[0.2em] text-cyan-100/85">TACTICAL AI ASSISTANT</div>
                <div className="mt-2 font-mono text-[13px] leading-6 text-white/80">
                  <span className="text-accent">&gt;</span> <span className="ml-2">{message}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/75 hover:bg-white/10"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
