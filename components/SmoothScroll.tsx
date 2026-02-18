"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReduced = useReducedMotionSafe();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        touchMultiplier: 0,
      }}
    >
      {children}
    </ReactLenis>
  );
}
