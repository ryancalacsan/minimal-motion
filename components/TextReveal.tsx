"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type RevealMode = "word" | "letter" | "line" | "mask";

interface TextRevealProps {
  text: string;
  mode?: RevealMode;
  className?: string;
  once?: boolean;
  delay?: number;
}

export default function TextReveal({
  text,
  mode = "word",
  className = "",
  once = true,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px", once });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div ref={ref} className={className}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay }}
        >
          {text}
        </motion.span>
      </div>
    );
  }

  if (mode === "mask") {
    return (
      <div ref={ref} className={className}>
        <motion.span
          className="inline-block"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={
            isInView
              ? { clipPath: "inset(0 0% 0 0)" }
              : { clipPath: "inset(0 100% 0 0)" }
          }
          transition={{
            duration: 1,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {text}
        </motion.span>
      </div>
    );
  }

  if (mode === "line") {
    const lines = text.split("\n");
    return (
      <div ref={ref} aria-label={text} className={className}>
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.div
              aria-hidden="true"
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : { y: "100%" }}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.div>
          </div>
        ))}
      </div>
    );
  }

  if (mode === "letter") {
    return (
      <div
        ref={ref}
        aria-label={text}
        className={className}
        style={{ perspective: "1000px" }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block"
            initial={{ opacity: 0, y: 40, rotateX: -90 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 40, rotateX: -90 }
            }
            transition={{
              duration: 0.6,
              delay: delay + i * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformStyle: "preserve-3d",
              marginRight: char === " " ? "0.25em" : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    );
  }

  // Default: word mode
  const words = text.split(" ");
  return (
    <div ref={ref} aria-label={text} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  );
}
