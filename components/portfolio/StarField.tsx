"use client";

/* eslint-disable react-hooks/purity */

import { useMemo, useLayoutEffect, useRef } from "react";
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
}

export function Starfield() {
  // Generate stars once on initial render
  const stars = useMemo<CSSStarProps[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/20 to-gray-950" />
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="grad1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect fill="url(#grad1)" width="100%" height="100%" />
      </svg>

      {/* CSS-based floating stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full blur-xs animate-pulse"
            style={{
              width: star.width + "px",
              height: star.height + "px",
              left: star.left + "%",
              top: star.top + "%",
              opacity: star.opacity,
              animationDelay: star.animationDelay + "s",
              animationDuration: star.animationDuration + "s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
