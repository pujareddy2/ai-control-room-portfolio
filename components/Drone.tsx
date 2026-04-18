"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import type { Camera } from "three"

export default function Drone() {

  const camera = useThree((state) => state.camera)
  const cameraRef = useRef<Camera>(camera)

  const keys = useRef<Record<string, boolean>>({})
  const rotation = useRef({ x: 0, y: 0 })

  useEffect(() => {

    cameraRef.current = camera

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false
    }

    const handleMouseMove = (e: MouseEvent) => {

      rotation.current.y -= e.movementX * 0.002
      rotation.current.x -= e.movementY * 0.002

      rotation.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, rotation.current.x)
      )

    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("mousemove", handleMouseMove)
    }

  }, [camera])

  useFrame(() => {
    const camera = cameraRef.current

    const speed = 0.15

    const forward = keys.current["w"] || keys.current["arrowup"]
    const back = keys.current["s"] || keys.current["arrowdown"]
    const left = keys.current["a"] || keys.current["arrowleft"]
    const right = keys.current["d"] || keys.current["arrowright"]

    if(forward) camera.position.z -= speed
    if(back) camera.position.z += speed
    if(left) camera.position.x -= speed
    if(right) camera.position.x += speed

    camera.rotation.x = rotation.current.x
    camera.rotation.y = rotation.current.y

  })

  return null
}
