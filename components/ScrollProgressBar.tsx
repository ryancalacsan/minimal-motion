"use client"

import { motion, useScroll, useSpring } from "motion/react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"

export default function ScrollProgressBar() {
  const prefersReduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  })

  if (prefersReduced) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-9998 h-0.5 origin-left"
      style={{
        scaleX,
        backgroundColor: "var(--color-text)",
      }}
    />
  )
}
