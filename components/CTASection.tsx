"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import MagneticElement from "./MagneticElement";
import { useCursor } from "@/context/CursorContext";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20%", once: true });
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section id="cta" ref={ref} className="px-6 py-40">
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
          Let&rsquo;s Create
          <br />
          <span
            className="font-[family-name:var(--font-instrument)] italic font-normal"
          >
            Some Motion
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
          Interested in collaborating or just want to say hello? Let&rsquo;s
          connect and make the web move.
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
              href="mailto:hello@example.com"
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
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                &rarr;
              </motion.span>
            </motion.a>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  );
}
