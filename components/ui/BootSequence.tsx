"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  onDone: () => void;
};

export default function BootSequence({ onDone }: Props) {
  const lines = useMemo(
    () => [
      "SYSTEM INITIALIZING...",
      "LOADING CONTROL ROOM...",
      "SYSTEM READY.",
    ],
    [],
  );

  const [shown, setShown] = useState<string[]>([]);
  const startedRef = useRef(false);
  const finishedRef = useRef(false);

  const finishBoot = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    let idx = 0;
    const autoFinish = window.setTimeout(() => {
      if (!cancelled) finishBoot();
    }, 2400);

    const tick = () => {
      if (cancelled) return;
      if (idx < lines.length) {
        setShown((s) => [...s, lines[idx]]);
        idx += 1;
        setTimeout(tick, idx === 1 ? 260 : 220);
        return;
      }
    };

    const start = setTimeout(tick, 50);

    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(autoFinish);
    };
  }, [finishBoot, lines]);

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
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs text-white/55">Loading control room modules...</div>
            <div className="h-[2px] w-28 overflow-hidden rounded bg-white/10">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
