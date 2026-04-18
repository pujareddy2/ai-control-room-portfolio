"use client";

import { Edges, Text, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group, Mesh, MeshPhysicalMaterial } from "three";
import type { ModuleId } from "../../lib/portfolio";

type Props = {
  id: ModuleId;
  label: string;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  y: number;
  active: boolean;
  highlighted: boolean;
  pulseStrength: number;
  onSelect: (id: ModuleId) => void;
  onHoverChange?: (id: ModuleId | null) => void;
};

export default function SystemModule({
  id,
  label,
  orbitAngle,
  orbitRadius,
  orbitSpeed,
  y,
  active,
  highlighted,
  pulseStrength,
  onSelect,
  onHoverChange,
}: Props) {
  const groupRef = useRef<Group | null>(null);
  const panelRef = useRef<Mesh | null>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const a = orbitAngle + t * orbitSpeed;

    const focus = hovered || active || highlighted;
    const lift = focus ? 0.6 : 0;

    if (groupRef.current) {
      const x = Math.cos(a) * orbitRadius;
      const z = Math.sin(a) * orbitRadius;
      const forwardX = Math.cos(a) * lift;
      const forwardZ = Math.sin(a) * lift;

      groupRef.current.position.set(x + forwardX, y + Math.sin(t * 1.2 + orbitAngle) * 0.15, z + forwardZ);
      groupRef.current.lookAt(0, y, 0);
      groupRef.current.rotateY(Math.PI);
      groupRef.current.scale.setScalar(focus ? 1.22 : 1);
    }

    const panel = panelRef.current;
    if (panel) {
      const material = panel.material as MeshPhysicalMaterial;
      const base = active ? 1.3 : 0.4;
      const h = focus ? 0.75 : 0;
      const p = Math.min(1, pulseStrength) * 0.9;
      material.emissiveIntensity = base + h + p;
      material.opacity = focus ? 0.42 : 0.28;
    }
  });

  const focus = hovered || active || highlighted;

  return (
    <group ref={groupRef}>
      <mesh
        ref={panelRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHoverChange?.(id);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHoverChange?.(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
      >
        <planeGeometry args={[4.05, 2.15]} />
        <meshPhysicalMaterial
          color="#0e1319"
          emissive="#7ec9ff"
          emissiveIntensity={0.6}
          roughness={0.22}
          metalness={0.18}
          transparent
          opacity={0.3}
          transmission={0.45}
          thickness={0.28}
          ior={1.2}
          clearcoat={0.75}
          clearcoatRoughness={0.15}
        />
        <Edges color="#89d4ff" />
      </mesh>

      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[4.12, 2.22]} />
        <meshBasicMaterial color="#67c7ff" transparent opacity={focus ? 0.18 : 0.08} />
      </mesh>

      <Text position={[0, 0.15, 0.08]} fontSize={0.35} color="#f2f8ff" anchorX="center" anchorY="middle">
        {label}
      </Text>

      <Text
        position={[0, -0.48, 0.08]}
        fontSize={0.12}
        color={focus ? "#bfe7ff" : "#7d98ad"}
        anchorX="center"
        anchorY="middle"
      >
        {focus ? "Click to open" : "Interactive module"}
      </Text>
    </group>
  );
}
