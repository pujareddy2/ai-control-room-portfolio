"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  onDone: () => void;
};

export default function BootSequence({ onDone }: Props) {
  const lines = useMemo(
    () => [
      "SYSTEM INITIALIZING...",
      "LOADING NEURAL INTERFACE...",
      "ACTIVATING INTELLIGENCE CORE...",
      "SYNCING ORBIT MODULES...",
      "SYSTEM READY.",
    ],
    [],
  );

  const [shown, setShown] = useState<string[]>([]);
  const [cursorOn, setCursorOn] = useState(true);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    let idx = 0;

    const tick = () => {
      if (cancelled) return;
      if (idx < lines.length) {
        setShown((s) => [...s, lines[idx]]);
        idx += 1;
        setTimeout(tick, idx === 1 ? 600 : 520);
        return;
      }

      setTimeout(() => {
        if (!cancelled) onDone();
      }, 650);
    };

    const cursor = setInterval(() => setCursorOn((v) => !v), 480);
    const start = setTimeout(tick, 450);

    return () => {
      cancelled = true;
      clearTimeout(start);
      clearInterval(cursor);
    };
  }, [lines, onDone]);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="w-full max-w-xl px-6">
        <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 backdrop-blur-xl">
          <div className="font-heading text-xs tracking-[0.25em] text-white/60">
            PUJA MIDDE AI PORTFOLIO - CONTROL ROOM
          </div>
          <div className="mt-4 font-mono text-[13px] leading-6 text-white/85">
            {shown.map((l, i) => (
              <div key={`${i}-${l}`} className="flex gap-2">
                <span className="text-accent">&gt;</span>
                <span>{l}</span>
              </div>
            ))}
            <div className="mt-1 text-white/70">
              <span className="text-accent">&gt;</span> <span className="ml-2">{cursorOn ? "|" : " "}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs text-white/55">Tip: Drag to rotate | Scroll to zoom | WASD / Arrows to orbit</div>
            <div className="h-[2px] w-28 overflow-hidden rounded bg-white/10">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
