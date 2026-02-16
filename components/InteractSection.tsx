"use client";

import { motion, useReducedMotion } from "motion/react";
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
  "Variable Typography",
  "Micro-interactions",
];

export default function InteractSection() {
  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReduced = useReducedMotion();

  return (
    <section className="px-6 py-32">
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
          {BUTTONS.map((btn) => (
            <MagneticElement key={btn.label} strength={0.2}>
              <motion.button
                className="w-full rounded-lg border px-6 py-8 font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-lg)] font-semibold transition-colors"
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
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setCursorVariant(btn.variant)}
                onMouseLeave={resetCursor}
              >
                {btn.label}
              </motion.button>
            </MagneticElement>
          ))}
        </div>

        {/* Interactive text block */}
        <div
          className="mb-24 cursor-default"
          onMouseEnter={() => setCursorVariant("text", "Read")}
          onMouseLeave={resetCursor}
        >
          <p
            className="max-w-2xl font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-lg)] leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            The best interfaces feel inevitable. Every transition considered,
            every movement purposeful. This is what happens when typography
            meets motion — not decoration, but communication.
          </p>
        </div>

        {/* Animated link list */}
        <div>
          <span
            className="mb-6 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Disciplines
          </span>
          <div className="flex flex-col gap-2">
            {LINKS.map((link) => (
              <motion.a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group relative inline-flex w-fit font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-xl)] font-medium"
                style={{ color: "var(--color-text)" }}
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={resetCursor}
              >
                {link}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
                  style={{ backgroundColor: "var(--color-text)" }}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
