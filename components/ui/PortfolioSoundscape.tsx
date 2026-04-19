"use client";

import { useEffect } from "react";
import useNightAmbience from "./useNightAmbience";

export default function PortfolioSoundscape() {
  const { setEnabled } = useNightAmbience(0.12);

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
