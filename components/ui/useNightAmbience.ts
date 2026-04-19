"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useNightAmbience(volume = 0.12) {
  const ctxRef = useRef<AudioContext | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [enabled, setEnabled] = useState(false);

  const stop = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (ctxRef.current) {
      void ctxRef.current.close();
      ctxRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }

    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    const lowpass = ctx.createBiquadFilter();
    const noiseGain = ctx.createGain();
    const droneGain = ctx.createGain();
    const shimmerGain = ctx.createGain();

    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(Math.max(0.02, volume), ctx.currentTime + 3.2);

    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(1300, ctx.currentTime);
    lowpass.Q.setValueAtTime(0.7, ctx.currentTime);

    noiseGain.gain.setValueAtTime(0.11, ctx.currentTime);
    droneGain.gain.setValueAtTime(0.16, ctx.currentTime);
    shimmerGain.gain.setValueAtTime(0.0001, ctx.currentTime);

    master.connect(lowpass);
    lowpass.connect(ctx.destination);

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const channelData = noiseBuffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < channelData.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      channelData[i] = last * 2.1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(420, ctx.currentTime);
    noiseFilter.Q.setValueAtTime(0.8, ctx.currentTime);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();

    const droneA = ctx.createOscillator();
    const droneB = ctx.createOscillator();
    droneA.type = "sine";
    droneB.type = "triangle";
    droneA.frequency.setValueAtTime(65.41, ctx.currentTime);
    droneB.frequency.setValueAtTime(98, ctx.currentTime);

    const droneLfo = ctx.createOscillator();
    const droneLfoGain = ctx.createGain();
    droneLfo.type = "sine";
    droneLfo.frequency.setValueAtTime(0.06, ctx.currentTime);
    droneLfoGain.gain.setValueAtTime(22, ctx.currentTime);

    droneA.connect(droneGain);
    droneB.connect(droneGain);
    droneGain.connect(master);

    droneLfo.connect(droneLfoGain);
    droneLfoGain.connect(noiseFilter.frequency);
    droneLfo.start();

    droneA.start();
    droneB.start();

    let shimmerTimeout: number | null = null;

    const playShimmer = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const notes = [523.25, 659.25, 783.99, 987.77];
      const note = notes[Math.floor(Math.random() * notes.length)];
      osc.frequency.setValueAtTime(note, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.018, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

      osc.connect(gain);
      gain.connect(shimmerGain);
      shimmerGain.connect(master);

      osc.start();
      osc.stop(ctx.currentTime + 2.85);

      const nextIn = 12000 + Math.random() * 12000;
      shimmerTimeout = window.setTimeout(playShimmer, nextIn);
    };

    shimmerTimeout = window.setTimeout(playShimmer, 7000);

    cleanupRef.current = () => {
      if (shimmerTimeout != null) {
        window.clearTimeout(shimmerTimeout);
      }

      [noise, droneA, droneB, droneLfo].forEach((node) => {
        try {
          node.stop();
        } catch {
          // Ignore stop if already ended.
        }
      });

      noise.disconnect();
      droneA.disconnect();
      droneB.disconnect();
      droneLfo.disconnect();
      droneLfoGain.disconnect();
      noiseFilter.disconnect();
      noiseGain.disconnect();
      droneGain.disconnect();
      shimmerGain.disconnect();
      lowpass.disconnect();
      master.disconnect();
    };

    void ctx.resume();

    return () => {
      stop();
    };
  }, [enabled, stop, volume]);

  return { enabled, setEnabled };
}
