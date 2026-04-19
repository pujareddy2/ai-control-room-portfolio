"use client";

import { useEffect } from "react";
import useNightAmbience from "./useNightAmbience";

export default function PortfolioSoundscape() {
  const { enabled, setEnabled } = useNightAmbience(0.12);

  useEffect(() => {
    if (enabled) return;

    const arm = () => {
      setEnabled(true);
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
      window.removeEventListener("wheel", arm);
    };

    window.addEventListener("pointerdown", arm, { once: true });
    window.addEventListener("keydown", arm, { once: true });
    window.addEventListener("wheel", arm, { once: true });

    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
      window.removeEventListener("wheel", arm);
    };
  }, [enabled, setEnabled]);

  useEffect(() => {
    const onToggle = (event: Event) => {
      const custom = event as CustomEvent<{ enabled?: boolean }>;
      if (typeof custom.detail?.enabled === "boolean") {
        setEnabled(custom.detail.enabled);
      }
    };

    window.addEventListener("portfolio-night-audio", onToggle as EventListener);
    return () => {
      window.removeEventListener("portfolio-night-audio", onToggle as EventListener);
    };
  }, [setEnabled]);

  return null;
}
