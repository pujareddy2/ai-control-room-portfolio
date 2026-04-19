"use client";

import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ModuleId } from "../../lib/portfolio";
import { MODULES, MODULE_THEMES } from "../../lib/portfolio";
import SpaceSky from "../SpaceSky";
import RobotAssistant from "../RobotAssistant";
import AICore from "./AICore";
import CameraRig from "./CameraRig";
import Floor from "./Floor";
import GlassDome from "./GlassDome";
import InstancedStars from "./InstancedStars";
import SystemModule from "./SystemModule";
import ModuleContent from "../ui/ModuleContent";
import ModuleOverlay from "../ui/ModuleOverlay";
import MobileMode from "../ui/MobileMode";
import useIsMobile from "../ui/useIsMobile";
import TopBar from "../ui/TopBar";
import useAmbientAudio from "../ui/useAmbientAudio";
import useGameSfx from "../ui/useGameSfx";

export default function ControlRoom() {
  const detectedMobile = useIsMobile(760);
  const [force3DRoom, setForce3DRoom] = useState(false);
  const isMobile = detectedMobile && !force3DRoom;
  const { enabled: ambientEnabled, setEnabled: setAmbientEnabled } = useAmbientAudio("/audio/night-sky-soft.mp3", 0.24);
  const { playClick, playOpen, playClose, playBoot, playAssistant, playHover, playModuleHit, playModuleTheme, playLockSwell } = useGameSfx();

  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [hoverModule, setHoverModule] = useState<ModuleId | null>(null);
  const [modulePingAt] = useState<Record<ModuleId, number>>({
    about: 0,
    projects: 0,
    skills: 0,
    experience: 0,
    certifications: 0,
    contact: 0,
  });
  const orbitOffsetRef = useRef(0);
  const orbitRafRef = useRef<number | null>(null);
  const [orbitOffset, setOrbitOffset] = useState(0);
  const [mouseOrbitBias, setMouseOrbitBias] = useState(0);
  const [cameraDistance, setCameraDistance] = useState(16);
  const [zoomIntent, setZoomIntent] = useState<"in" | "out" | null>(null);
  const [screenPunch, setScreenPunch] = useState(0);
  const [glitchBurst, setGlitchBurst] = useState(0);
  const dragOrbitRef = useRef<{ active: boolean; startX: number; startOffset: number; lastX: number }>({
    active: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
  });
  const dragVelocityRef = useRef(0);
  const dragInertiaRafRef = useRef<number | null>(null);

  const moduleOrbits = useMemo(() => {
    const radius = 10.8;
    const y = -0.25;
    return MODULES.map((item, idx) => {
      const angle = (idx / MODULES.length) * Math.PI * 2;
      return {
        ...item,
        orbitAngle: angle,
        orbitRadius: radius,
        y,
        orbitSpeed: 0.102,
      };
    });
  }, []);

  useEffect(() => {
    orbitOffsetRef.current = orbitOffset;
  }, [orbitOffset]);

  const snapToNearestModule = useCallback((offset: number) => {
    const frontAngle = Math.PI / 2;
    let nearestOffset = offset;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const orbitModule of moduleOrbits) {
      const desiredOffset = frontAngle - orbitModule.orbitAngle;
      const turns = Math.round((offset - desiredOffset) / (Math.PI * 2));
      const candidate = desiredOffset + turns * Math.PI * 2;
      const distance = Math.abs(candidate - offset);

      if (distance < bestDistance) {
        bestDistance = distance;
        nearestOffset = candidate;
      }
    }

    return nearestOffset;
  }, [moduleOrbits]);

  const animateOrbitTo = useCallback((targetOffset: number, duration = 620) => {
    if (orbitRafRef.current != null) {
      window.cancelAnimationFrame(orbitRafRef.current);
      orbitRafRef.current = null;
    }

    const startOffset = orbitOffsetRef.current;
    const startTime = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3.4);
      const nextOffset = startOffset + (targetOffset - startOffset) * eased;

      setOrbitOffset(nextOffset);
      orbitOffsetRef.current = nextOffset;

      if (progress < 1) {
        orbitRafRef.current = window.requestAnimationFrame(tick);
        return;
      }

      orbitRafRef.current = null;
    };

    orbitRafRef.current = window.requestAnimationFrame(tick);
  }, []);

  const triggerScreenPunch = useCallback(() => {
    const startTime = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / 520);
      const punch = Math.sin(progress * Math.PI) * 1;
      setScreenPunch(punch);
      setGlitchBurst(progress < 0.42 ? 1 - progress / 0.42 : 0);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
        return;
      }

      setScreenPunch(0);
      setGlitchBurst(0);
    };

    window.requestAnimationFrame(tick);
  }, []);

  const canSelectModule = cameraDistance >= 10.2;

  const onSelectModule = useCallback((id: ModuleId) => {
    if (!canSelectModule) {
      void playClick();
      return;
    }

    const targetModule = moduleOrbits.find((item) => item.id === id);
    if (targetModule) {
      const frontAngle = Math.PI / 2;
      const targetOffset = frontAngle - targetModule.orbitAngle;
      animateOrbitTo(targetOffset, 760);
    }
    void playModuleHit();
    void playModuleTheme(id);
    void playLockSwell();
    triggerScreenPunch();

    window.setTimeout(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveModule(null);
    }, 220);
  }, [animateOrbitTo, canSelectModule, moduleOrbits, playClick, playLockSwell, playModuleHit, playModuleTheme, triggerScreenPunch]);

  useEffect(() => {
    if (zoomIntent == null) return;
    const clear = window.setTimeout(() => setZoomIntent(null), 180);
    return () => window.clearTimeout(clear);
  }, [zoomIntent]);

  useEffect(() => {
    void playBoot();
  }, [playBoot]);

  useEffect(() => {
    if (ambientEnabled) return;

    const armAmbient = () => {
      setAmbientEnabled(true);
      window.dispatchEvent(new CustomEvent("portfolio-night-audio", { detail: { enabled: true } }));
      window.removeEventListener("pointerdown", armAmbient);
      window.removeEventListener("keydown", armAmbient);
      window.removeEventListener("wheel", armAmbient);
    };

    window.addEventListener("pointerdown", armAmbient, { once: true });
    window.addEventListener("keydown", armAmbient, { once: true });
    window.addEventListener("wheel", armAmbient, { once: true });

    return () => {
      window.removeEventListener("pointerdown", armAmbient);
      window.removeEventListener("keydown", armAmbient);
      window.removeEventListener("wheel", armAmbient);
    };
  }, [ambientEnabled, setAmbientEnabled]);

  const pulseStrength = useCallback(
    (id: ModuleId) => {
      const t = modulePingAt[id];
      const dt = (performance.now() - t) / 1000;
      return dt < 0.9 ? 1 - dt / 0.9 : 0;
    },
    [modulePingAt],
  );

  const activeTheme = activeModule ? MODULE_THEMES[activeModule] : null;

  useEffect(() => {
    const target = snapToNearestModule(orbitOffsetRef.current);
    animateOrbitTo(target, 520);
  }, [animateOrbitTo, snapToNearestModule]);

  useEffect(() => {
    const step = () => {
      if (!dragOrbitRef.current.active && Math.abs(dragVelocityRef.current) > 0.00003) {
        const nextOffset = orbitOffsetRef.current + dragVelocityRef.current;
        setOrbitOffset(nextOffset);
        orbitOffsetRef.current = nextOffset;
        dragVelocityRef.current *= 0.946;
      }

      dragInertiaRafRef.current = window.requestAnimationFrame(step);
    };

    dragInertiaRafRef.current = window.requestAnimationFrame(step);

    return () => {
      if (dragInertiaRafRef.current != null) {
        window.cancelAnimationFrame(dragInertiaRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (orbitRafRef.current != null) {
        window.cancelAnimationFrame(orbitRafRef.current);
      }
      if (dragInertiaRafRef.current != null) {
        window.cancelAnimationFrame(dragInertiaRafRef.current);
      }
    };
  }, []);

  if (isMobile) {
    return (
      <div className="relative h-full w-full">
        <MobileMode
          onOpen3DRoom={() => setForce3DRoom(true)}
          onOpen={(id) => {
            void playOpen();
            setActiveModule(id);
          }}
        />
        <ModuleOverlay
          open={activeModule != null}
          title={activeModule ? activeModule.toUpperCase() : ""}
          subtitle="MODULE DETAILS"
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
    <div
      className="relative h-full w-full touch-none select-none bg-background"
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        dragOrbitRef.current = {
          active: true,
          startX: event.clientX,
          startOffset: orbitOffsetRef.current,
          lastX: event.clientX,
        };
        dragVelocityRef.current = 0;
      }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const normalized = ((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 2 - 1;
        const steerAmplitude = cameraDistance >= 12 ? 0.34 : 0.14;
        setMouseOrbitBias(normalized * steerAmplitude);

        if (dragOrbitRef.current.active) {
          const deltaX = event.clientX - dragOrbitRef.current.lastX;
          const dragOffset = orbitOffsetRef.current + deltaX * -0.0125;
          setOrbitOffset(dragOffset);
          orbitOffsetRef.current = dragOffset;
          dragVelocityRef.current = deltaX * -0.00074;
          dragOrbitRef.current.lastX = event.clientX;
        }
      }}
      onPointerLeave={() => {
        setMouseOrbitBias(0);
        if (dragOrbitRef.current.active) {
          dragOrbitRef.current.active = false;
        }
      }}
      onPointerUp={() => {
        if (dragOrbitRef.current.active) {
          dragOrbitRef.current.active = false;
        }
      }}
      onPointerCancel={() => {
        if (dragOrbitRef.current.active) {
          dragOrbitRef.current.active = false;
        }
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-5">
        <div className="hud-grid-bg absolute inset-0 opacity-35" />
        <div className="scanline-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_42%,rgba(0,0,0,0.6)_100%)]" />
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          animate={{ opacity: glitchBurst * 0.18 }}
          transition={{ duration: 0.08 }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,229,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)",
            backgroundSize: "100% 18px, 18px 100%",
            clipPath: glitchBurst > 0.15 ? "polygon(0 0, 100% 0, 100% 34%, 0 29%)" : "none",
          }}
        />
      </div>

      <TopBar
        soundOn={ambientEnabled}
        onToggleSound={() => {
          void playClick();
          setAmbientEnabled((v) => {
            const next = !v;
            window.dispatchEvent(new CustomEvent("portfolio-night-audio", { detail: { enabled: next } }));
            return next;
          });
        }}
      />

      <motion.div
        className="pointer-events-none absolute left-4 top-20 z-30 rounded-xl border border-cyan-300/20 bg-surface/45 px-3 py-2 backdrop-blur-xl"
        initial={{ x: -18, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-[11px] tracking-[0.2em] text-cyan-100/80">
          AUTO ORBIT + DRAG CONTROL • DRAG LEFT/RIGHT TO BRING MODULE FRONT
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-40">
        <div className="pointer-events-auto inline-flex flex-col overflow-hidden rounded-xl border border-white/15 bg-black/45 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setZoomIntent("in")}
            className="px-3 py-2 text-lg font-semibold text-white/85 transition hover:bg-white/10"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setZoomIntent("out")}
            className="border-t border-white/10 px-3 py-2 text-lg font-semibold text-white/85 transition hover:bg-white/10"
            aria-label="Zoom out"
          >
            -
          </button>
        </div>
      </div>

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1 + screenPunch * 0.008, rotateX: screenPunch * 0.18, rotateZ: screenPunch * 0.06 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Canvas camera={{ position: [0, 3.4, 16], fov: 50, far: 2000 }} dpr={[0.7, 1]} gl={{ antialias: false, powerPreference: "high-performance" }}>
          <color attach="background" args={["#03060c"]} />
          <fog attach="fog" args={["#03060c", 36, 150]} />

          <Suspense fallback={null}>
            <SpaceSky />
            <InstancedStars count={980} radius={356} minSize={0.008} maxSize={0.041} opacityBase={0.48} opacityPulse={0.06} rotationSpeed={0.0068} depthJitter={58} />
            <InstancedStars count={520} radius={274} minSize={0.012} maxSize={0.053} opacityBase={0.4} opacityPulse={0.08} rotationSpeed={-0.012} depthJitter={34} />
            <InstancedStars count={180} radius={218} minSize={0.016} maxSize={0.065} opacityBase={0.28} opacityPulse={0.1} rotationSpeed={0.015} depthJitter={18} />
            <GlassDome />
            <Floor />
          </Suspense>

          <ambientLight intensity={0.28} color="#89b3d8" />
          <pointLight position={[8, 10, 5]} intensity={1.7} color="#c4dcff" />
          <pointLight position={[-10, 5, -8]} intensity={0.85} color="#6f95c0" />

          <AICore position={[0, -0.35, 0]} />

          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.28, 0]} raycast={() => null}>
            <torusGeometry args={[10.8, 0.06, 16, 240]} />
            <meshBasicMaterial color="#5bc0ff" transparent opacity={0.22} />
          </mesh>

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
              orbitOffset={orbitOffset + mouseOrbitBias}
              canSelect={canSelectModule}
              onSelect={onSelectModule}
              onHoverChange={(id) => {
                if (id && id !== hoverModule) {
                  void playHover();
                }
                setHoverModule(id);
              }}
            />
          ))}

          <Suspense fallback={null}>
            <RobotAssistant
              onActivate={() => {
                void playAssistant();
                onSelectModule("about");
              }}
            />
          </Suspense>

          <CameraRig
            target={[0, -0.35, 0]}
            focusLevel={activeModule != null ? 1.2 : 0.2}
            punch={screenPunch * 1.15}
            onDistanceChange={(distance) => setCameraDistance(distance)}
            zoomIntent={zoomIntent}
          />
        </Canvas>
      </motion.div>

      <AnimatePresence>
        {activeModule && activeTheme ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="relative h-[42vw] max-h-115 w-[42vw] max-w-115 min-h-65 min-w-65">
              <motion.div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: activeTheme.accent, boxShadow: `0 0 40px ${activeTheme.glow}` }}
                animate={{ scale: [0.96, 1.02, 1], opacity: [0.55, 1, 0.85] }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.2 }}
              />
              <motion.div
                className="absolute inset-[10%] rounded-full border border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-1 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${activeTheme.accent}, transparent)` }}
                animate={{ opacity: [0.15, 0.9, 0.15], scaleX: [0.96, 1.01, 0.96] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[78%] w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: `linear-gradient(180deg, transparent, ${activeTheme.accent}, transparent)` }}
                animate={{ opacity: [0.15, 0.75, 0.15], scaleY: [0.96, 1.01, 0.96] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="font-heading text-sm tracking-[0.24em] text-white/75">{activeTheme.label}</div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ModuleOverlay
        open={activeModule != null}
        title={activeModule ? activeModule.toUpperCase() : ""}
        subtitle="MODULE DETAILS"
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








