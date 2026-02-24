"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import MagneticElement from "./MagneticElement";
import { useCursor } from "@/context/CursorContext";
import { useMounted } from "@/hooks/useMounted";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const TITLE = "Minimal Motion";
const WORDS = TITLE.split(" ");

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: -90,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.5 + i * 0.04,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const reducedLetterVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.02,
      duration: 0.5,
    },
  }),
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const { setCursorVariant, resetCursor } = useCursor();
  const mounted = useMounted();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -100]);

  const variants = prefersReduced ? reducedLetterVariants : letterVariants;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        className="text-left sm:text-center"
        style={prefersReduced ? {} : { opacity, y }}
      >
        <MagneticElement strength={0.05}>
          <h1
            aria-label={TITLE}
            className="font-sora text-fluid-hero font-bold leading-[1.1] tracking-tight"
            style={{
              color: "var(--color-text)",
              perspective: "1000px",
            }}
            onMouseEnter={() => setCursorVariant("magnetic")}
            onMouseLeave={resetCursor}
          >
            {WORDS.map((word, wordIndex) => {
              const charOffset = WORDS.slice(0, wordIndex).reduce(
                (sum, w) => sum + w.length + 1,
                0
              );
              return (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.split("").map((letter, letterIndex) => {
                    const i = charOffset + letterIndex;
                    return (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={variants}
                        initial={mounted ? "hidden" : "visible"}
                        animate="visible"
                        aria-hidden="true"
                        className="inline-block"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                  {wordIndex < WORDS.length - 1 && (
                    <span className="inline-block w-[0.3em]" />
                  )}
                </span>
              );
            })}
          </h1>
        </MagneticElement>

        <motion.p
          className="mt-12 font-instrument text-fluid-xl italic"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          where{" "}
          <span
            className="relative inline-block"
            style={{ color: "var(--color-text)" }}
          >
            typography
            <motion.span
              className="absolute -bottom-1 left-0 h-px w-full origin-left"
              style={{ backgroundColor: "var(--color-text)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 1.8,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </span>{" "}
          meets interaction
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span
          className="font-inter text-fluid-xs uppercase tracking-[0.2em]"
          style={{ color: "var(--color-muted)" }}
        >
          Scroll
        </span>
        <motion.div
          className="h-12 w-px"
          style={{ backgroundColor: "var(--color-muted)" }}
          animate={
            prefersReduced
              ? { scaleY: 1, originY: 0 }
              : { scaleY: [0, 1, 0], originY: 0 }
          }
          transition={
            prefersReduced
              ? { duration: 0.3 }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </motion.div>
    </section>
  );
}
