"use client";

import {
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";

interface ScrollVelocitySkewOptions {
  maxSkew?: number;
  damping?: number;
  stiffness?: number;
}

export function useScrollVelocitySkew({
  maxSkew = 5,
  damping = 50,
  stiffness = 400,
}: ScrollVelocitySkewOptions = {}): MotionValue<number> {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skewRaw = useTransform(
    velocity,
    [-2000, 0, 2000],
    [maxSkew, 0, -maxSkew]
  );
  const skew = useSpring(skewRaw, { damping, stiffness });

  return skew;
}
