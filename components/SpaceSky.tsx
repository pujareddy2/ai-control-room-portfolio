"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { BackSide, TextureLoader } from "three";
import type { Mesh } from "three";

export default function SpaceSky() {
  const texture = useLoader(TextureLoader, "/textures/space.jpg");
  const layerARef = useRef<Mesh | null>(null);
  const layerBRef = useRef<Mesh | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (layerARef.current) layerARef.current.rotation.y = t * 0.0035;
    if (layerBRef.current) {
      layerBRef.current.rotation.y = -t * 0.0025;
      layerBRef.current.rotation.x = Math.sin(t * 0.06) * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={layerARef} scale={520}>
        <sphereGeometry args={[1, 72, 72]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>

      <mesh ref={layerBRef} scale={505}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={texture} side={BackSide} transparent opacity={0.2} />
      </mesh>

      <mesh scale={430}>
        <sphereGeometry args={[1, 56, 56]} />
        <meshBasicMaterial color="#07111f" transparent opacity={0.11} side={BackSide} />
      </mesh>

      <mesh scale={360}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#12263b" transparent opacity={0.06} side={BackSide} />
      </mesh>
    </group>
  );
}
