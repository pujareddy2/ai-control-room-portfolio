"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

function Satellite({ radius, speed, offset, tilt, scale = 1 }: { radius: number; speed: number; offset: number; tilt: number; scale?: number }) {
  const ref = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.y = t * speed + offset;
    }
  });

  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <group position={[radius, 0, 0]} scale={scale}>
        {/* Core body */}
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 1.2, 16]} />
          <meshStandardMaterial color="#b0c4de" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Solar Panel Left */}
        <mesh position={[-1.2, 0, 0]}>
          <boxGeometry args={[1.8, 0.6, 0.05]} />
          <meshStandardMaterial color="#1ca3ec" emissive="#004455" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Solar Panel Right */}
        <mesh position={[1.2, 0, 0]}>
          <boxGeometry args={[1.8, 0.6, 0.05]} />
          <meshStandardMaterial color="#1ca3ec" emissive="#004455" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ff3366" emissive="#aa0022" />
        </mesh>
      </group>
    </group>
  );
}

export default function SpaceSky() {
  return (
    <group>
      <Satellite radius={80} speed={0.12} offset={0} tilt={0.3} scale={1.5} />
      <Satellite radius={140} speed={-0.08} offset={Math.PI} tilt={-0.2} scale={1.2} />
      <Satellite radius={200} speed={0.05} offset={Math.PI / 2} tilt={0.7} scale={2} />
    </group>
  );
}
