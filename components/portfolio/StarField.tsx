"use client";

import { useMemo, useLayoutEffect, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, Object3D } from "three";
import type { InstancedMesh, MeshBasicMaterial } from "three";

type Props = {
  count?: number;
  radius?: number;
  minSize?: number;
  maxSize?: number;
  opacityBase?: number;
  opacityPulse?: number;
  rotationSpeed?: number;
  depthJitter?: number;
};

export function StarField({
  count = 1800,
  radius = 300,
  minSize = 0.015,
  maxSize = 0.04,
  opacityBase = 0.35,
  opacityPulse = 0.05,
  rotationSpeed = 0.004,
  depthJitter = 40,
}: Props) {
  const meshRef = useRef<InstancedMesh | null>(null);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new Object3D();

    const mulberry32 = (seed: number) => {
      return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    };

    const rng = mulberry32((count * 131 + Math.floor(radius * 10)) | 0);

    const base = new Color("#EAEAEA");
    const cold = new Color("#8db5d8");
    const tmp = new Color();

    for (let i = 0; i < count; i++) {
      const u = rng();
      const v = rng();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const r = radius + (rng() - 0.5) * depthJitter;
      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
      const s = minSize + rng() * Math.max(0.001, maxSize - minSize);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);

      tmp.copy(base).lerp(cold, rng() * 0.3);
      mesh.setColorAt?.(i, tmp);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count, depthJitter, maxSize, minSize, radius]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    mesh.rotation.y = t * rotationSpeed;
    const material = mesh.material as MeshBasicMaterial;
    material.transparent = true;
    material.opacity = opacityBase + Math.sin(t * 0.15) * opacityPulse;
  });

  return (
    <instancedMesh ref={meshRef} args={[null!, null!, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

interface CSSStarProps {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
  glow?: number;
  shimmer?: boolean;
}

function makeSeededRng(seedInput: number) {
  let seed = seedInput | 0;
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createStarLayer(count: number, min: number, max: number, opacityMin: number, opacityMax: number, seed: number, shimmerRatio = 0) {
  const rng = makeSeededRng(seed);
  return Array.from({ length: count }, (_, i) => {
    const size = min + rng() * (max - min);
    const opacity = opacityMin + rng() * (opacityMax - opacityMin);
    return {
      id: i,
      width: size,
      height: size,
      left: rng() * 100,
      top: rng() * 100,
      opacity,
      animationDelay: rng() * 8,
      animationDuration: 9 + rng() * 10,
      glow: rng() > 0.8 ? 0.22 + rng() * 0.2 : 0,
      shimmer: rng() < shimmerRatio,
    } as CSSStarProps;
  });
}

export function Starfield() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const bgStars = useMemo(() => {
    return createStarLayer(260, 0.55, 1.2, 0.18, 0.36, 1011);
  }, []);

  const midStars = useMemo(() => {
    return createStarLayer(120, 0.9, 1.9, 0.3, 0.58, 3037, 0.08);
  }, []);

  const fgStars = useMemo(() => {
    return createStarLayer(45, 1.4, 3.1, 0.5, 0.85, 7223, 0.2);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let targetX = 0;
    let targetY = 0;
    let targetScroll = 0;
    let smoothX = 0;
    let smoothY = 0;
    let smoothScroll = 0;

    const update = () => {
      smoothX += (targetX - smoothX) * 0.075;
      smoothY += (targetY - smoothY) * 0.075;
      smoothScroll += (targetScroll - smoothScroll) * 0.08;

      root.style.setProperty("--star-mx", `${smoothX.toFixed(3)}px`);
      root.style.setProperty("--star-my", `${smoothY.toFixed(3)}px`);
      root.style.setProperty("--star-scroll", `${smoothScroll.toFixed(3)}px`);

      rafRef.current = window.requestAnimationFrame(update);
    };

    const onPointerMove = (event: PointerEvent) => {
      const nx = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const ny = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      targetX = nx * 7;
      targetY = ny * 6;
    };

    const onScroll = () => {
      targetScroll = Math.min(window.scrollY * 0.04, 14);
    };

    rafRef.current = window.requestAnimationFrame(update);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.9) 52%, rgba(0,0,0,0.72) 78%, rgba(0,0,0,0.56) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.9) 52%, rgba(0,0,0,0.72) 78%, rgba(0,0,0,0.56) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#040814_0%,#02050d_48%,#010205_100%)]" />
      <div className="absolute inset-0 opacity-75 bg-[radial-gradient(circle_at_18%_12%,rgba(58,92,148,0.24),transparent_38%),radial-gradient(circle_at_76%_18%,rgba(84,117,161,0.2),transparent_34%)]" />

      <div
        className="absolute inset-0"
        style={{
          transform: "translate3d(calc(var(--star-mx, 0px) * 0.22), calc(var(--star-my, 0px) * 0.18 + var(--star-scroll, 0px) * -0.08), 0)",
        }}
      >
        {bgStars.map((star) => (
          <span
            key={`bg-${star.id}`}
            className="absolute rounded-full bg-slate-100 star-twinkle"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          transform: "translate3d(calc(var(--star-mx, 0px) * 0.42), calc(var(--star-my, 0px) * 0.34 + var(--star-scroll, 0px) * -0.16), 0)",
        }}
      >
        {midStars.map((star) => (
          <span
            key={`mid-${star.id}`}
            className="absolute rounded-full bg-slate-100 star-twinkle"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              boxShadow: star.glow ? `0 0 ${4 + star.glow * 8}px rgba(186, 219, 255, ${star.glow})` : undefined,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          transform: "translate3d(calc(var(--star-mx, 0px) * 0.62), calc(var(--star-my, 0px) * 0.5 + var(--star-scroll, 0px) * -0.24), 0)",
        }}
      >
        {fgStars.map((star) => (
          <span
            key={`fg-${star.id}`}
            className={`absolute rounded-full bg-white ${star.shimmer ? "star-shimmer" : "star-twinkle"}`}
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              boxShadow: `0 0 ${6 + (star.glow ?? 0.2) * 12}px rgba(214, 234, 255, 0.24)`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
