"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Props = {
  target?: [number, number, number];
};

export default function CameraRig({ target = [0, -1.5, 0] }: Props) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const keysRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
    };
    const up = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.target.set(target[0], target[1], target[2]);
    controls.update();
  }, [target]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    // Slow cinematic keyboard navigation (orbit + dolly).
    const rot = 0.65 * delta;
    const dolly = 0.8 * delta;

    const keys = keysRef.current;
    const left = keys["a"] || keys["arrowleft"];
    const right = keys["d"] || keys["arrowright"];
    const up = keys["w"] || keys["arrowup"];
    const down = keys["s"] || keys["arrowdown"];
    const zoomIn = keys["q"];
    const zoomOut = keys["e"];

    if (left || right) {
      const a = controls.getAzimuthalAngle() + (left ? rot : 0) + (right ? -rot : 0);
      controls.setAzimuthalAngle(a);
    }
    if (up || down) {
      const p0 = controls.getPolarAngle();
      const p1 = p0 + (up ? rot : 0) + (down ? -rot : 0);
      const clamped = Math.min(controls.maxPolarAngle, Math.max(controls.minPolarAngle, p1));
      controls.setPolarAngle(clamped);
    }
    if (zoomIn) controls.dollyIn(1 + dolly);
    if (zoomOut) controls.dollyOut(1 + dolly);

    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.5}
      zoomSpeed={0.6}
      enablePan={false}
      minDistance={10}
      maxDistance={30}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={(3 * Math.PI) / 4}
    />
  );
}
