"use client";

import type { Mesh } from "three";
import { BackSide } from "three";
import { useRef } from "react";

type Props = {
  radius?: number;
  y?: number;
};

export default function GlassDome({ radius = 22, y = -3 }: Props) {
  const ref = useRef<Mesh | null>(null);

  return (
    <mesh ref={ref} position={[0, y, 0]}>
      {/* Hemisphere */}
      <sphereGeometry args={[radius, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshPhysicalMaterial
        color="#0b0f14"
        roughness={0.18}
        metalness={0.05}
        transmission={1}
        thickness={0.6}
        ior={1.35}
        transparent
        opacity={0.12}
        clearcoat={0.9}
        clearcoatRoughness={0.15}
        side={BackSide}
      />
    </mesh>
  );
}

