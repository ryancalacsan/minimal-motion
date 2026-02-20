"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import MagneticElement from "./MagneticElement";
import { useCursor } from "@/context/CursorContext";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20%", once: true });
  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReduced = useReducedMotionSafe();

  return (
    <section id="cta" ref={ref} className="px-6 py-24 sm:py-40">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.h2
          className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-3xl)] font-bold leading-[1.1]"
          style={{ color: "var(--color-text)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Let&rsquo;s Build
          <br />
          <span
            className="font-[family-name:var(--font-instrument)] italic font-normal"
          >
            Something Real
          </span>
        </motion.h2>

        <motion.p
          className="mt-6 max-w-md font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-sm)] leading-relaxed"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          I care about the details that most people never notice but
          everyone feels. If that resonates, let&rsquo;s talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-12"
        >
          <MagneticElement strength={0.15}>
            <motion.a
              href="mailto:calacsancode@gmail.com"
              className="group relative inline-flex items-center gap-3 rounded-full border px-8 py-4 font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-base)] font-semibold transition-colors duration-300"
              style={{
                borderColor: "var(--color-text)",
                color: "var(--color-text)",
              }}
              whileHover={{ scale: 0.97 }}
              whileTap={{ scale: 0.94 }}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={resetCursor}
            >
              <span>Get in Touch</span>
              <motion.span
                className="inline-block"
                animate={prefersReduced ? {} : { x: [0, 4, 0] }}
                transition={
                  prefersReduced
                    ? {}
                    : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }
              >
                &rarr;
              </motion.span>
            </motion.a>
          </MagneticElement>
        </motion.div>

        <motion.a
          href="https://ryancalacsan.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-sm)] transition-colors duration-300"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          onMouseEnter={() => setCursorVariant("link")}
          onMouseLeave={resetCursor}
        >
          ryancalacsan.com &rarr;
        </motion.a>
      </div>
    </section>
  );
}
