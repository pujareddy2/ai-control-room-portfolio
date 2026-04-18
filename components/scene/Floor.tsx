"use client";

import { Grid, MeshReflectorMaterial } from "@react-three/drei";

type Props = {
  y?: number;
};

export default function Floor({ y = -3 }: Props) {
  return (
    <group position={[0, y, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[20, 128]} />
        <MeshReflectorMaterial
          color="#0b0f14"
          blur={[200, 60]}
          resolution={512}
          mixBlur={0.8}
          mixStrength={0.25}
          roughness={0.45}
          metalness={0.9}
          depthScale={0.12}
          minDepthThreshold={0.85}
          maxDepthThreshold={1.2}
        />
      </mesh>

      <Grid
        position={[0, 0.01, 0]}
        args={[40, 40]}
        cellSize={0.8}
        cellThickness={0.35}
        cellColor="#0b3440"
        sectionSize={4}
        sectionThickness={0.9}
        sectionColor="#00E5FF"
        fadeDistance={55}
        fadeStrength={1}
        infiniteGrid={false}
      />
    </group>
  );
}

