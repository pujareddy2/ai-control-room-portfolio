"use client";

import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import type { ModuleId } from "../../lib/portfolio";
import { MODULES } from "../../lib/portfolio";
import SpaceSky from "../SpaceSky";
import RobotAssistant from "../RobotAssistant";
import AICore from "./AICore";
import CameraRig from "./CameraRig";
import Floor from "./Floor";
import GlassDome from "./GlassDome";
import InstancedStars from "./InstancedStars";
import SystemModule from "./SystemModule";
import BootSequence from "../ui/BootSequence";
import AssistantOverlay from "../ui/AssistantOverlay";
import ModuleContent from "../ui/ModuleContent";
import ModuleOverlay from "../ui/ModuleOverlay";
import MobileMode from "../ui/MobileMode";
import useIsMobile from "../ui/useIsMobile";
import TopBar from "../ui/TopBar";
import useAmbientAudio from "../ui/useAmbientAudio";
import useGameSfx from "../ui/useGameSfx";

export default function ControlRoom() {
  const isMobile = useIsMobile(820);
  const ambient = useAmbientAudio("/audio/ambient.mp3", 0.2);
  const { playClick, playOpen, playClose, playBoot, playAssistant } = useGameSfx();

  const [bootDone, setBootDone] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [hoverModule, setHoverModule] = useState<ModuleId | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState(
    "Welcome to Puja Midde AI Portfolio. Hover a module and click to open.",
  );

  const [modulePingAt, setModulePingAt] = useState<Record<ModuleId, number>>({
    about: 0,
    projects: 0,
    skills: 0,
    experience: 0,
    certifications: 0,
    contact: 0,
  });

  const moduleOrbits = useMemo(() => {
    const radius = 10.8;
    const y = -0.25;
    return MODULES.map((m, idx) => {
      const angle = (idx / MODULES.length) * Math.PI * 2;
      return {
        ...m,
        orbitAngle: angle,
        orbitRadius: radius,
        y,
        orbitSpeed: 0.12,
      };
    });
  }, []);

  const onSelectModule = useCallback((id: ModuleId) => {
    void playOpen();
    setActiveModule(id);
    setAssistantMessage(`Opening ${id.toUpperCase()} module. Review the case details in the overlay.`);
    setAssistantOpen(true);
    setModulePingAt((s) => ({ ...s, [id]: performance.now() }));
  }, [playOpen]);

  useEffect(() => {
    if (!bootDone) return;
    void playBoot();
  }, [bootDone, playBoot]);

  const pulseStrength = useCallback(
    (id: ModuleId) => {
      const t = modulePingAt[id];
      const dt = (performance.now() - t) / 1000;
      return dt < 0.9 ? 1 - dt / 0.9 : 0;
    },
    [modulePingAt],
  );

  if (isMobile) {
    return (
      <div className="relative h-full w-full">
        <MobileMode
          onOpen={(id) => {
            void playOpen();
            setActiveModule(id);
          }}
        />
        <ModuleOverlay
          open={activeModule != null}
          title={activeModule ? activeModule.toUpperCase() : ""}
          subtitle="PUJA MIDDE AI PORTFOLIO - MOBILE"
          onClose={() => {
            void playClose();
            setActiveModule(null);
          }}
        >
          {activeModule ? <ModuleContent id={activeModule} /> : null}
        </ModuleOverlay>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-background">
      <TopBar
        soundOn={ambient.enabled}
        onToggleSound={() => {
          void playClick();
          ambient.setEnabled((v) => !v);
        }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: bootDone ? 1 : 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <Canvas camera={{ position: [0, 3.4, 16], fov: 50, far: 2000 }} dpr={[1, 1.9]}>
          <color attach="background" args={["#03060c"]} />
          <fog attach="fog" args={["#03060c", 30, 110]} />

          <Suspense fallback={null}>
            <SpaceSky />
            <InstancedStars count={2200} radius={340} />
            <GlassDome />
            <Floor />
          </Suspense>

          <ambientLight intensity={0.28} color="#89b3d8" />
          <pointLight position={[8, 10, 5]} intensity={1.7} color="#c4dcff" />
          <pointLight position={[-10, 5, -8]} intensity={0.85} color="#6f95c0" />

          <AICore position={[0, -0.35, 0]} />

          {moduleOrbits.map((m) => (
            <SystemModule
              key={m.id}
              id={m.id}
              label={m.label}
              orbitAngle={m.orbitAngle}
              orbitRadius={m.orbitRadius}
              orbitSpeed={m.orbitSpeed}
              y={m.y}
              active={activeModule === m.id}
              highlighted={hoverModule === m.id}
              pulseStrength={pulseStrength(m.id)}
              onSelect={onSelectModule}
              onHoverChange={(id) => setHoverModule(id)}
            />
          ))}

          <Suspense fallback={null}>
            <RobotAssistant
              onActivate={() => {
                void playAssistant();
                setAssistantMessage("Welcome to Puja Midde AI Portfolio. Hover and click any module to explore.");
                setAssistantOpen(true);
              }}
            />
          </Suspense>

          <CameraRig target={[0, -0.35, 0]} />
        </Canvas>
      </motion.div>

      <AnimatePresence>{!bootDone ? <BootSequence onDone={() => setBootDone(true)} /> : null}</AnimatePresence>

      <ModuleOverlay
        open={activeModule != null}
        title={activeModule ? activeModule.toUpperCase() : ""}
        subtitle="PUJA MIDDE AI PORTFOLIO - CASE DETAILS"
        onClose={() => {
          void playClose();
          setActiveModule(null);
        }}
      >
        {activeModule ? <ModuleContent id={activeModule} /> : null}
      </ModuleOverlay>

      <AssistantOverlay open={assistantOpen} message={assistantMessage} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}
