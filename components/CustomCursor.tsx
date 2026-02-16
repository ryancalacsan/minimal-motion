"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCursor, CursorVariant } from "@/context/CursorContext";
import { useTouchDevice } from "@/hooks/useTouchDevice";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const variantSizes: Record<CursorVariant, number> = {
  default: 16,
  text: 120,
  link: 60,
  magnetic: 48,
  hidden: 0,
};

export default function CustomCursor() {
  const { cursorState } = useCursor();
  const isTouch = useTouchDevice();
  const prefersReduced = useReducedMotionSafe();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouch, prefersReduced, cursorX, cursorY]);

  if (isTouch || prefersReduced) return null;

  const size = variantSizes[cursorState.variant];

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: size,
        height: size,
        opacity: cursorState.variant === "hidden" ? 0 : 1,
      }}
      transition={{
        width: { type: "spring", damping: 20, stiffness: 300 },
        height: { type: "spring", damping: 20, stiffness: 300 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: "var(--color-text)" }}
      />
      {cursorState.text && cursorState.variant === "text" && (
        <span
          className="relative z-10 text-xs font-medium"
          style={{ color: "var(--color-bg)" }}
        >
          {cursorState.text}
        </span>
      )}
    </motion.div>
  );
}
