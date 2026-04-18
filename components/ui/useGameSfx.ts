"use client";

import { useCallback, useRef } from "react";
import type { ModuleId } from "../../lib/portfolio";

export default function useGameSfx() {
  const ctxRef = useRef<AudioContext | null>(null);
  const lastHoverAtRef = useRef(0);

  const ensureContext = useCallback(async () => {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!ctxRef.current) {
      ctxRef.current = new AudioCtx();
    }

    if (ctxRef.current.state === "suspended") {
      await ctxRef.current.resume();
    }

    return ctxRef.current;
  }, []);

  const playTone = useCallback(async (frequency: number, duration = 0.08, volume = 0.05, type: OscillatorType = "triangle") => {
    const ctx = await ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(50, frequency * 1.16), ctx.currentTime + duration);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration + 0.01);
  }, [ensureContext]);

  const playChord = useCallback(
    async (frequencies: number[], duration: number, volume: number, type: OscillatorType = "triangle") => {
      await Promise.all(
        frequencies.map((freq, idx) => playTone(freq, duration + idx * 0.01, volume * (idx === 0 ? 1 : 0.7), type)),
      );
    },
    [playTone],
  );

  const playClick = useCallback(async () => {
    await playTone(392, 0.07, 0.035, "triangle");
    setTimeout(() => {
      void playTone(523.25, 0.06, 0.03, "sine");
    }, 42);
  }, [playTone]);

  const playOpen = useCallback(async () => {
    await playChord([329.63, 392, 493.88], 0.12, 0.032, "triangle");
    setTimeout(() => {
      void playTone(659.25, 0.11, 0.026, "sine");
    }, 80);
  }, [playChord, playTone]);

  const playClose = useCallback(async () => {
    await playTone(523.25, 0.09, 0.03, "sine");
    setTimeout(() => {
      void playTone(349.23, 0.11, 0.026, "triangle");
    }, 55);
  }, [playTone]);

  const playBoot = useCallback(async () => {
    await playChord([220, 277.18, 329.63], 0.2, 0.028, "sine");
    setTimeout(() => {
      void playChord([246.94, 311.13, 369.99], 0.22, 0.024, "triangle");
    }, 180);
  }, [playChord]);

  const playAssistant = useCallback(async () => {
    await playTone(587.33, 0.08, 0.03, "sine");
    setTimeout(() => {
      void playTone(783.99, 0.09, 0.024, "triangle");
    }, 48);
  }, [playTone]);

  const playHover = useCallback(async () => {
    const now = performance.now();
    if (now - lastHoverAtRef.current < 120) return;
    lastHoverAtRef.current = now;

    await playTone(698.46, 0.05, 0.015, "sine");
  }, [playTone]);

  const playModuleHit = useCallback(async () => {
    await playChord([261.63, 329.63, 392], 0.09, 0.034, "triangle");
    setTimeout(() => {
      void playTone(783.99, 0.07, 0.022, "sine");
    }, 64);
  }, [playChord, playTone]);

  const playModuleTheme = useCallback(async (id: ModuleId) => {
    const sequences: Record<ModuleId, { chord: number[]; accent: number }> = {
      about: { chord: [261.63, 329.63, 392], accent: 523.25 },
      projects: { chord: [293.66, 369.99, 440], accent: 659.25 },
      skills: { chord: [329.63, 415.3, 493.88], accent: 739.99 },
      experience: { chord: [246.94, 311.13, 392], accent: 587.33 },
      certifications: { chord: [277.18, 349.23, 415.3], accent: 622.25 },
      contact: { chord: [220, 277.18, 329.63], accent: 493.88 },
    };

    const selected = sequences[id];
    await playChord(selected.chord, 0.12, 0.03, "triangle");
    setTimeout(() => {
      void playTone(selected.accent, 0.1, 0.024, "sine");
    }, 68);
  }, [playChord, playTone]);

  const playLockSwell = useCallback(async () => {
    await playChord([110, 138.59, 164.81], 0.22, 0.042, "sine");
    setTimeout(() => {
      void playTone(82.41, 0.28, 0.03, "triangle");
    }, 60);
  }, [playChord, playTone]);

  return { playClick, playOpen, playClose, playBoot, playAssistant, playHover, playModuleHit, playModuleTheme, playLockSwell };
}
