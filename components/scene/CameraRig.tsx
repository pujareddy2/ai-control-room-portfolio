"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Props = {
  target?: [number, number, number];
  focusLevel?: number;
  punch?: number;
  onDistanceChange?: (distance: number) => void;
  zoomIntent?: "in" | "out" | null;
};

export default function CameraRig({ target = [0, -1.5, 0], focusLevel = 0, punch = 0, onDistanceChange, zoomIntent = null }: Props) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const currentTargetRef = useRef<[number, number, number]>(target);
  const lastDistanceRef = useRef<number | null>(null);

  const keysRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!e.key) return;
      keysRef.current[e.key.toLowerCase()] = true;
    };
    const up = (e: KeyboardEvent) => {
      if (!e.key) return;
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
    currentTargetRef.current = target;
  }, [target]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || zoomIntent == null) return;

    if (zoomIntent === "in") {
      controls.dollyIn(1.12);
    } else {
      controls.dollyOut(1.12);
    }

    controls.update();
  }, [zoomIntent]);

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

    const targetBreathe = 0.12 + punch * 0.18;
    const targetRise = currentTargetRef.current[1] + Math.sin((punch + focusLevel) * Math.PI) * targetBreathe;
    controls.target.y += (targetRise - controls.target.y) * 0.08;

    const currentDistance = controls.getDistance();
    if (onDistanceChange) {
      const last = lastDistanceRef.current;
      if (last == null || Math.abs(last - currentDistance) > 0.03) {
        onDistanceChange(currentDistance);
        lastDistanceRef.current = currentDistance;
      }
    }

    controls.enableRotate = false;
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.rotateSpeed = 0;

    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0}
      zoomSpeed={0.75}
      enablePan={false}
      enableZoom
      minDistance={8.2}
      maxDistance={30}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={(3 * Math.PI) / 4}
    />
  );
}
