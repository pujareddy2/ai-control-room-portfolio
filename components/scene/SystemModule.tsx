"use client";

import { Edges, Text, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group, Mesh, MeshPhysicalMaterial } from "three";
import type { ModuleId } from "../../lib/portfolio";
import { MODULE_THEMES } from "../../lib/portfolio";

type Props = {
  id: ModuleId;
  label: string;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset?: number;
  y: number;
  active: boolean;
  highlighted: boolean;
  canSelect?: boolean;
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
  orbitOffset = 0,
  y,
  active,
  highlighted,
  canSelect = true,
  pulseStrength,
  onSelect,
  onHoverChange,
}: Props) {
  const groupRef = useRef<Group | null>(null);
  const panelRef = useRef<Mesh | null>(null);
  const glowRef = useRef<Mesh | null>(null);
  const scaleRef = useRef(1);
  const clickBurstUntilRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const a = orbitAngle + t * orbitSpeed + orbitOffset;

    const focus = hovered || active || highlighted;
    const lift = focus ? 0.6 : 0;
    const now = performance.now();
    const clickBurst = Math.max(0, (clickBurstUntilRef.current - now) / 260);

    if (groupRef.current) {
      const x = Math.cos(a) * orbitRadius;
      const z = Math.sin(a) * orbitRadius;
      const forwardX = Math.cos(a) * lift;
      const forwardZ = Math.sin(a) * lift;

      groupRef.current.position.set(x + forwardX, y + Math.sin(t * 1.2 + orbitAngle) * 0.15, z + forwardZ);
      groupRef.current.lookAt(0, y, 0);
      groupRef.current.rotateY(Math.PI);

      const targetScale = (focus ? 1.2 : 1) + clickBurst * 0.18;
      scaleRef.current += (targetScale - scaleRef.current) * 0.18;
      groupRef.current.scale.setScalar(scaleRef.current);
    }

    const panel = panelRef.current;
    if (panel) {
      const material = panel.material as MeshPhysicalMaterial;
      const base = active ? 1.3 : 0.4;
      const h = focus ? 0.75 : 0;
      const p = Math.min(1, pulseStrength) * 0.9;
      material.emissiveIntensity = base + h + p + clickBurst * 1.1;
      material.opacity = focus ? 0.42 : 0.28;
    }

    const glow = glowRef.current;
    if (glow) {
      const mat = glow.material;
      if ("opacity" in mat && typeof mat.opacity === "number") {
        mat.opacity = 0.08 + (focus ? 0.12 : 0) + clickBurst * 0.28;
      }
      glow.scale.setScalar(1 + clickBurst * 0.22);
    }
  });

  const focus = hovered || active || highlighted;
  const theme = MODULE_THEMES[id];

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
          if (!canSelect) return;
          clickBurstUntilRef.current = performance.now() + 260;
          onSelect(id);
        }}
      >
        <planeGeometry args={[4.05, 2.15]} />
        <meshPhysicalMaterial
          color="#0e1319"
          emissive={theme.accent}
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
        <meshBasicMaterial color={theme.accent} transparent opacity={focus ? 0.18 : 0.08} />
      </mesh>

      <mesh ref={glowRef} position={[0, 0, -0.02]}>
        <planeGeometry args={[4.45, 2.55]} />
        <meshBasicMaterial color={theme.accent} transparent opacity={0.1} />
      </mesh>

      <Text position={[0, 0.15, 0.08]} fontSize={0.35} color={theme.accent} anchorX="center" anchorY="middle">
        {label}
      </Text>

      <Text position={[0, -0.48, 0.08]} fontSize={0.12} color={focus ? theme.accent : "#7d98ad"} anchorX="center" anchorY="middle">
        {canSelect ? (focus ? "Click to open" : "Interactive module") : "Zoom out to select"}
      </Text>
    </group>
  );
}
