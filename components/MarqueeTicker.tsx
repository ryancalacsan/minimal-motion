"use client";

import { motion } from "motion/react";
import { useScrollVelocitySkew } from "@/hooks/useScrollVelocitySkew";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const TICKER_TEXT =
  "MINIMAL MOTION \u00B7 TYPOGRAPHY \u00B7 INTERACTION \u00B7 DESIGN \u00B7 ";

export default function MarqueeTicker() {
  const prefersReduced = useReducedMotionSafe();
  const skewY = useScrollVelocitySkew({ maxSkew: 3 });

  if (prefersReduced) {
    return (
      <div
        className="overflow-hidden border-y py-5"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p
          className="truncate text-center font-syne text-fluid-xl font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--color-muted)" }}
        >
          MINIMAL MOTION &middot; TYPOGRAPHY &middot; INTERACTION &middot;
          DESIGN
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="overflow-hidden border-y py-5"
      style={{
        borderColor: "var(--color-border)",
        skewY,
      }}
    >
      <div className="marquee-track flex whitespace-nowrap">
        <span
          className="inline-block shrink-0 font-syne text-fluid-xl font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--color-muted)" }}
        >
          {TICKER_TEXT}
        </span>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block shrink-0 font-syne text-fluid-xl font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--color-muted)" }}
          >
            {TICKER_TEXT}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
