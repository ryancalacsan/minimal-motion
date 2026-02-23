"use client";

import { useRef } from "react";
import { motion, useInView, useAnimate } from "motion/react";
import MagneticElement from "./MagneticElement";
import { useCursor } from "@/context/CursorContext";
import { useTouchDevice } from "@/hooks/useTouchDevice";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const BUTTONS = [
  { label: "Explore", variant: "link" as const },
  { label: "Create", variant: "magnetic" as const },
  { label: "Craft", variant: "link" as const },
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

function DisciplineLink({
  link,
  index,
  inView,
  isTouch,
}: {
  link: string;
  index: number;
  inView: boolean;
  isTouch: boolean;
}) {
  const { setCursorVariant, resetCursor } = useCursor();
  const [scope, animate] = useAnimate();

  const handleTap = async () => {
    await animate(
      scope.current,
      { x: 12 },
      { duration: 0.15, ease: "easeOut" }
    );
    await animate(
      scope.current,
      { x: 0 },
      { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    );
  };

  return (
    <motion.a
      ref={scope}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleTap();
      }}
      className="group relative inline-flex w-full select-none items-baseline gap-4 border-b py-4 font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-xl)] font-medium sm:w-fit sm:border-0 sm:py-2"
      style={{
        color: "var(--color-text)",
        borderColor: "var(--color-border)",
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => !isTouch && setCursorVariant("link")}
      onMouseLeave={() => !isTouch && resetCursor()}
    >
      <span
        className="text-[11px] tabular-nums"
        style={{ color: "var(--color-border)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative flex-1">
        {link}
        {/* Desktop: hover-reveal underline */}
        <span
          className="absolute -bottom-1 left-0 hidden h-px w-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full sm:block"
          style={{ backgroundColor: "var(--color-text)" }}
        />
      </span>
      {/* Mobile: arrow */}
      <span
        className="font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-sm)] opacity-30 sm:hidden"
        style={{ color: "var(--color-text)" }}
        aria-hidden="true"
      >
        &rarr;
      </span>
    </motion.a>
  );
}

export default function InteractSection() {
  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReduced = useReducedMotionSafe();
  const isTouch = useTouchDevice();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { margin: "-50px", once: true });
  const linksRef = useRef<HTMLDivElement>(null);
  const linksInView = useInView(linksRef, { margin: "-50px", once: true });

  return (
    <section id="interact" className="px-6 py-20 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <h2
          className="font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
          style={{ color: "var(--color-muted)" }}
        >
          Interact
        </h2>
        <p
          className="mb-12 mt-4 max-w-md font-[family-name:var(--font-instrument)] text-[length:var(--text-fluid-lg)] italic"
          style={{ color: "var(--color-muted)" }}
        >
          Magnetic pull, cursor morphing, tap feedback &mdash; buttons
          that respond before you ask.
        </p>

        {/* Magnetic button grid */}
        <div
          ref={gridRef}
          className="mb-24 grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          {BUTTONS.map((btn, i) => (
            <MagneticElement key={btn.label} strength={0.2}>
              <motion.button
                className="group relative w-full select-none overflow-hidden rounded-lg border px-6 py-8 text-left"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                  backgroundColor: "transparent",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  gridInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={
                  prefersReduced
                    ? {}
                    : {
                        borderColor: "var(--color-text)",
                        scale: 0.98,
                      }
                }
                whileTap={{
                  scale: 0.95,
                  backgroundColor: "var(--color-text)",
                  color: "var(--color-bg)",
                  borderColor: "var(--color-text)",
                }}
                onMouseEnter={() => !isTouch && setCursorVariant(btn.variant)}
                onMouseLeave={() => !isTouch && resetCursor()}
              >
                <span
                  className="mb-2 block font-[family-name:var(--font-inter)] text-[11px] tabular-nums"
                  style={{ color: "inherit", opacity: 0.4 }}
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
          onMouseEnter={() => !isTouch && setCursorVariant("text")}
          onMouseLeave={() => !isTouch && resetCursor()}
        >
          <p
            className="max-w-2xl font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-lg)] leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            Nothing here exists without reason. Each element responds,
            each transition tells you something. When type and motion
            share the same language, the interface disappears &mdash; and
            only the experience remains.
          </p>
        </div>

        {/* Animated link list */}
        <div ref={linksRef}>
          <span
            className="mb-2 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Disciplines
          </span>
          <p
            className="mb-6 max-w-sm font-[family-name:var(--font-instrument)] text-[length:var(--text-fluid-base)] italic"
            style={{ color: "var(--color-muted)" }}
          >
            The territories where type, motion, and interaction overlap.
          </p>
          <div className="flex flex-col">
            {LINKS.map((link, i) => (
              <DisciplineLink
                key={link}
                link={link}
                index={i}
                inView={linksInView}
                isTouch={isTouch}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
