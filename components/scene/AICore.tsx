"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending } from "three";
import type { Group, Mesh } from "three";

type Props = {
  position?: [number, number, number];
};

export default function AICore({ position = [0, -0.5, 0] }: Props) {
  const rootRef = useRef<Group | null>(null);
  const cageRef = useRef<Mesh | null>(null);
  const haloRef = useRef<Mesh | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (rootRef.current) {
      rootRef.current.position.y = position[1] + Math.sin(t * 0.65) * 0.08;
      rootRef.current.rotation.y = t * 0.14;
    }

    if (cageRef.current) {
      cageRef.current.rotation.y += 0.0025;
      cageRef.current.rotation.x = Math.sin(t * 0.25) * 0.1;
    }

    if (haloRef.current) {
      haloRef.current.rotation.z += 0.0018;
    }
  });

  return (
    <group ref={rootRef} position={position}>
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[2.12, 1]} />
        <meshStandardMaterial
          color="#b4d8ff"
          emissive="#86c8ff"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.62}
        />
      </mesh>

      <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.28, 0.035, 24, 200]} />
        <meshBasicMaterial
          color="#7cd3ff"
          transparent
          opacity={0.45}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <pointLight position={[0, 0.2, 1.8]} intensity={1.8} color="#a5d9ff" distance={12} />
      <pointLight position={[0, -0.3, -1.8]} intensity={0.9} color="#7db2d9" distance={10} />
    </group>
  );
}
