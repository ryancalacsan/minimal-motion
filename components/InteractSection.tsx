"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import MagneticElement from "./MagneticElement";
import { useCursor } from "@/context/CursorContext";

const BUTTONS = [
  { label: "Explore", variant: "link" as const },
  { label: "Create", variant: "magnetic" as const },
  { label: "Design", variant: "link" as const },
  { label: "Build", variant: "magnetic" as const },
  { label: "Ship", variant: "link" as const },
  { label: "Iterate", variant: "magnetic" as const },
];

const LINKS = [
  "Interaction Design",
  "Motion Systems",
  "Variable Type",
  "Micro-interactions",
];

export default function InteractSection() {
  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReduced = useReducedMotion();
  const linksRef = useRef<HTMLDivElement>(null);
  const linksInView = useInView(linksRef, { margin: "-50px", once: true });

  return (
    <section id="interact" className="px-6 py-20 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <h2
          className="mb-12 font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
          style={{ color: "var(--color-muted)" }}
        >
          Interact
        </h2>

        {/* Magnetic button grid */}
        <div className="mb-24 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {BUTTONS.map((btn, i) => (
            <MagneticElement key={btn.label} strength={0.2}>
              <motion.button
                className="group relative w-full rounded-lg border px-6 py-8 text-left transition-colors"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                  backgroundColor: "transparent",
                }}
                whileHover={
                  prefersReduced
                    ? {}
                    : {
                        borderColor: "var(--color-text)",
                        scale: 0.98,
                      }
                }
                whileTap={{ scale: 0.95, borderColor: "var(--color-text)" }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setCursorVariant(btn.variant)}
                onMouseLeave={resetCursor}
              >
                <span
                  className="mb-2 block font-[family-name:var(--font-inter)] text-[11px] tabular-nums transition-colors duration-300"
                  style={{ color: "var(--color-border)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-lg)] font-semibold">
                  {btn.label}
                </span>
              </motion.button>
            </MagneticElement>
          ))}
        </div>

        {/* Interactive text block */}
        <div
          className="mb-24"
          onMouseEnter={() => setCursorVariant("text")}
          onMouseLeave={resetCursor}
        >
          <p
            className="max-w-2xl font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-lg)] leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            The best interfaces feel inevitable. Every transition considered,
            every movement purposeful. This is what happens when type
            meets motion — not decoration, but communication.
          </p>
        </div>

        {/* Animated link list */}
        <div ref={linksRef}>
          <span
            className="mb-6 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Disciplines
          </span>
          <div className="flex flex-col gap-2">
            {LINKS.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group relative inline-flex w-fit items-baseline gap-4 font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-xl)] font-medium"
                style={{ color: "var(--color-text)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  linksInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileTap={{ x: 8 }}
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={resetCursor}
              >
                <span
                  className="text-[11px] tabular-nums"
                  style={{ color: "var(--color-border)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">
                  {link}
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full active:w-full"
                    style={{ backgroundColor: "var(--color-text)" }}
                  />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
