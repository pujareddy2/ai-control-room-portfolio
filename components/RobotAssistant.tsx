"use client"

import { useGLTF, useCursor } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Vector3 } from "three"
import type { Object3D } from "three"
import type { ThreeEvent } from "@react-three/fiber"

type Props = {
  onActivate?: () => void
}

export default function RobotAssistant({ onActivate }: Props) {

  const robot = useGLTF("/models/Flying saucer.glb")
  const ref = useRef<Object3D | null>(null)

  const camera = useThree((s) => s.camera)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const dir = useRef(new Vector3())
  const up = useRef(new Vector3(0, 1, 0))
  const right = useRef(new Vector3())
  const desired = useRef(new Vector3())

  useFrame(({ clock }) => {

    const t = clock.getElapsedTime()

    if(ref.current){

      camera.getWorldDirection(dir.current)
      right.current.copy(dir.current).cross(up.current).normalize()

      desired.current
        .copy(camera.position)
        .addScaledVector(right.current, 2.0)
        .addScaledVector(up.current, 0.9)
        .addScaledVector(dir.current, -2.6)

      ref.current.position.lerp(desired.current, 0.08)
      ref.current.position.y += Math.sin(t * 1.6) * 0.12

      ref.current.rotation.y = t * 0.35

    }

  })

  return (
    <primitive
      ref={ref}
      object={robot.scene}
      scale={1.4}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        onActivate?.()
      }}
    />
  )
}
