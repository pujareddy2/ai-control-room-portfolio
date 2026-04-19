"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useAmbientAudio(src?: string, volume = 0.2) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const synthCleanupRef = useRef<(() => void) | null>(null);
  const [enabled, setEnabled] = useState(false);

  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (synthCleanupRef.current) {
      synthCleanupRef.current();
      synthCleanupRef.current = null;
    }

    if (ctxRef.current) {
      void ctxRef.current.close();
      ctxRef.current = null;
    }
  }, []);

  const startSynthAmbient = useCallback(async () => {
    const AudioCtx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtx) {
      setEnabled(false);
      return;
    }

    const ctx = new AudioCtx();
    ctxRef.current = ctx;
    await ctx.resume().catch(() => null);

    const master = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const dryGain = ctx.createGain();
    const wetGain = ctx.createGain();
    const delay = ctx.createDelay(1.2);
    const feedback = ctx.createGain();

    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(Math.max(0.02, volume * 0.2), ctx.currentTime + 2.6);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1100, ctx.currentTime);
    filter.Q.setValueAtTime(0.6, ctx.currentTime);

    dryGain.gain.setValueAtTime(0.95, ctx.currentTime);
    wetGain.gain.setValueAtTime(0.18, ctx.currentTime);
    delay.delayTime.setValueAtTime(0.38, ctx.currentTime);
    feedback.gain.setValueAtTime(0.2, ctx.currentTime);

    master.connect(filter);
    filter.connect(dryGain);
    dryGain.connect(ctx.destination);
    filter.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(ctx.destination);

    const baseVoices = [55, 82.41, 110];
    const oscillators = baseVoices.map((freq, idx) => {
      const osc = ctx.createOscillator();
      const voiceGain = ctx.createGain();

      osc.type = idx === 1 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime((idx - 1) * 3.5, ctx.currentTime);

      voiceGain.gain.setValueAtTime(idx === 1 ? 0.35 : 0.28, ctx.currentTime);
      osc.connect(voiceGain);
      voiceGain.connect(master);
      osc.start();

      return osc;
    });

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.07, ctx.currentTime);
    lfoGain.gain.setValueAtTime(220, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const chordCycle = [
      [55, 82.41, 110],
      [49, 73.42, 98],
      [58.27, 87.31, 116.54],
      [46.25, 69.3, 92.5],
    ];

    let chordIndex = 0;
    const progression = window.setInterval(() => {
      const next = chordCycle[chordIndex % chordCycle.length];
      chordIndex += 1;
      oscillators.forEach((osc, index) => {
        osc.frequency.setTargetAtTime(next[index], ctx.currentTime, 2.5);
      });
    }, 12000);

    synthCleanupRef.current = () => {
      clearInterval(progression);
      oscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // Ignore stop errors during teardown.
        }
        osc.disconnect();
      });
      try {
        lfo.stop();
      } catch {
        // Ignore stop errors during teardown.
      }
      lfo.disconnect();
      lfoGain.disconnect();
      delay.disconnect();
      feedback.disconnect();
      wetGain.disconnect();
      dryGain.disconnect();
      filter.disconnect();
      master.disconnect();
    };
  }, [volume]);

  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  useEffect(() => {
    if (!enabled) {
      stopAll();
      return;
    }

    if (!src) {
      void startSynthAmbient();
      return () => {
        stopAll();
      };
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    void audio.play().catch(async () => {
      // Fallback to synthesized ambient pad when audio file is missing or blocked.
      audioRef.current = null;
      await startSynthAmbient();
    });

    return () => {
      stopAll();
    };
  }, [enabled, src, stopAll, startSynthAmbient, volume]);

  return { enabled, setEnabled };
}
