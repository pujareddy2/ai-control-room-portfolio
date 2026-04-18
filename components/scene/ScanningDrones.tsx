"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import type { ModuleId } from "../../lib/portfolio";

type ModulePoint = {
  id: ModuleId;
  position: [number, number, number];
};

type Props = {
  modules: ModulePoint[];
  onPing: (id: ModuleId) => void;
};

type DroneState = {
  targetIndex: number;
  progress: number;
  lastPingAt: number;
};

export default function ScanningDrones({ modules, onPing }: Props) {
  const drones = useMemo(
    () =>
      new Array(3).fill(0).map((_, i) => ({
        key: `drone-${i}`,
        startOffset: i * 1.7,
      })),
    [],
  );

  const groupRefs = useRef<(Group | null)[]>([]);
  const bodyRefs = useRef<(Mesh | null)[]>([]);
  const statesRef = useRef<DroneState[]>(
    new Array(3).fill(0).map((_, i) => ({
      targetIndex: i % Math.max(1, modules.length),
      progress: 0,
      lastPingAt: 0,
    })),
  );

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    for (let i = 0; i < 3; i++) {
      const group = groupRefs.current[i];
      const body = bodyRefs.current[i];
      if (!group || !body || modules.length === 0) continue;

      const state = statesRef.current[i];
      const target = modules[state.targetIndex]?.position ?? [0, -1.2, 0];

      state.progress += delta * 0.08;
      if (state.progress >= 1) {
        state.progress = 0;
        state.targetIndex = (state.targetIndex + 1 + (i % 2)) % modules.length;
      }

      const nextTarget = modules[(state.targetIndex + 1) % modules.length]?.position ?? target;

      const ease = state.progress * state.progress * (3 - 2 * state.progress);
      const x = target[0] + (nextTarget[0] - target[0]) * ease;
      const z = target[2] + (nextTarget[2] - target[2]) * ease;
      const y = -1.2 + Math.sin(t * 1.6 + i) * 0.25;

      group.position.set(x, y, z);
      group.rotation.y = t * 0.45 + i;

      body.rotation.x = Math.sin(t * 1.8 + i) * 0.15;
      body.rotation.z = Math.cos(t * 1.4 + i) * 0.12;

      const dx = x - nextTarget[0];
      const dz = z - nextTarget[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 0.35 && t - state.lastPingAt > 1.2) {
        state.lastPingAt = t;
        const moduleId = modules[(state.targetIndex + 1) % modules.length]?.id;
        if (moduleId) onPing(moduleId);
      }
    }
  });

  return (
    <group>
      {drones.map((d, i) => (
        <group
          key={d.key}
          ref={(node) => {
            groupRefs.current[i] = node;
          }}
        >
          <mesh
            ref={(node) => {
              bodyRefs.current[i] = node;
            }}
          >
            <icosahedronGeometry args={[0.22, 1]} />
            <meshStandardMaterial
              color="#0b0f14"
              metalness={1}
              roughness={0.25}
              emissive="#00E5FF"
              emissiveIntensity={1.6}
            />
          </mesh>
          <pointLight position={[0, 0.2, 0]} intensity={1.2} color="#00E5FF" distance={6} />
        </group>
      ))}
    </group>
  );
}

