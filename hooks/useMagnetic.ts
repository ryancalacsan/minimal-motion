"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { useTouchDevice } from "./useTouchDevice";

interface UseMagneticOptions {
  strength?: number;
  damping?: number;
  stiffness?: number;
}

export function useMagnetic({
  strength = 0.3,
  damping = 15,
  stiffness = 150,
}: UseMagneticOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping, stiffness });
  const springY = useSpring(y, { damping, stiffness });

  useEffect(() => {
    if (isTouch || !ref.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const el = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouch, x, y, strength]);

  return { ref, x: springX, y: springY };
}
