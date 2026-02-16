"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
} from "motion/react";

export default function TypeInMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(sectionRef, { margin: "-100px", once: false });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-driven font weight: 400 → 800, smoothed with spring
  const rawWeight = useTransform(scrollYProgress, [0.2, 0.8], [400, 800]);
  const fontWeight = useSpring(rawWeight, { damping: 40, stiffness: 100 });

  // Scroll-driven letter spacing, also smoothed
  const rawSpacing = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["-0.02", "0.08"]
  );
  const smoothSpacing = useSpring(rawSpacing, { damping: 40, stiffness: 100 });
  const letterSpacing = useTransform(smoothSpacing, (v) => `${v}em`);

  // Hover-driven weight
  const mouseX = useMotionValue(0);
  const hoverWeight = useSpring(
    useTransform(mouseX, [0, 1], [400, 800]),
    { damping: 30, stiffness: 80 }
  );

  const handleHoverMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverRef.current) return;
    const rect = hoverRef.current.getBoundingClientRect();
    const normalized = (e.clientX - rect.left) / rect.width;
    mouseX.set(Math.max(0, Math.min(1, normalized)));
  };

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] py-32">
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Section label */}
        <motion.h2
          className="mb-8 font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Type in Motion
        </motion.h2>

        {/* Scroll-driven weight */}
        <motion.div
          className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-hero)] leading-[1.1]"
          style={
            prefersReduced
              ? { color: "var(--color-text)", fontWeight: 700 }
              : {
                  color: "var(--color-text)",
                  fontWeight,
                  letterSpacing,
                }
          }
        >
          Fluid
        </motion.div>

        <p
          className="mt-6 max-w-md text-center font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-sm)]"
          style={{ color: "var(--color-muted)" }}
        >
          Variable fonts respond to scroll position.
          <br />
          Font weight shifts from 400 to 800 as you move through this section.
        </p>

        {/* Hover-driven weight demo */}
        <div className="mt-16 w-full max-w-2xl">
          <span
            className="mb-4 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Hover to control
          </span>
          <div
            ref={hoverRef}
            onMouseMove={handleHoverMove}
            className="cursor-crosshair overflow-hidden rounded-lg border px-8 py-12 text-center"
            style={{ borderColor: "var(--color-border)" }}
          >
            <motion.span
              className="inline-block font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-2xl)] leading-none"
              style={
                prefersReduced
                  ? { color: "var(--color-text)", fontWeight: 600 }
                  : { color: "var(--color-text)", fontWeight: hoverWeight }
              }
            >
              Interactive
            </motion.span>
          </div>
          <div
            className="mt-2 flex justify-between font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)]"
            style={{ color: "var(--color-muted)" }}
          >
            <span>Light 400</span>
            <span>Bold 800</span>
          </div>
        </div>
      </div>
    </section>
  );
}
