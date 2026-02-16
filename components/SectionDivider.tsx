"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40%", once: false });

  return (
    <div ref={ref} className="flex justify-center py-4">
      <motion.div
        className="h-px w-full max-w-5xl origin-left"
        style={{ backgroundColor: "var(--color-border)" }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </div>
  );
}
