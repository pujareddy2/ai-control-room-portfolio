"use client";

import { motion } from "framer-motion";
import { ABOUT } from "@/lib/portfolio";

export default function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-20 z-30 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >
        <div className="inline-flex items-center gap-3 rounded-xl border border-cyan-300/25 bg-black/45 px-4 py-3 backdrop-blur-md">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-300" />
          <div className="font-heading text-xs tracking-[0.22em] text-white/90">
            {ABOUT.name.toUpperCase()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
