"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, Object3D } from "three";
import type { InstancedMesh, MeshBasicMaterial } from "three";

type Props = {
  count?: number;
  radius?: number;
};

export default function InstancedStars({ count = 900, radius = 240 }: Props) {
  const meshRef = useRef<InstancedMesh | null>(null);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new Object3D();

    // Deterministic PRNG (lint-safe, stable across renders).
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
    const cold = new Color("#b7d8ff");
    const tmp = new Color();

    for (let i = 0; i < count; i++) {
      const u = rng();
      const v = rng();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const r = radius + (rng() - 0.5) * 35;
      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
      const s = 0.02 + rng() * 0.055;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);

      tmp.copy(base).lerp(cold, rng() * 0.35);
      mesh.setColorAt?.(i, tmp);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count, radius]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    mesh.rotation.y = t * 0.008;
    const material = mesh.material as MeshBasicMaterial;
    material.transparent = true;
    material.opacity = 0.3 + Math.sin(t * 0.18) * 0.05;
  });

  return (
    <instancedMesh ref={meshRef} args={[null!, null!, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}
