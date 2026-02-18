"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useScrollVelocitySkew } from "@/hooks/useScrollVelocitySkew";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const PANELS = [
  {
    number: "01",
    title: "Restraint",
    description:
      "The power of what you leave out. Every element earns its place — nothing decorative, nothing wasted.",
    accent: "less, but better",
  },
  {
    number: "02",
    title: "Rhythm",
    description:
      "Consistent spacing, fluid type scales, and measured pacing create a visual tempo that guides the eye.",
    accent: "tempo & flow",
  },
  {
    number: "03",
    title: "Purpose",
    description:
      "Motion with intent. Every animation communicates — revealing hierarchy, confirming actions, creating continuity.",
    accent: "meaningful motion",
  },
  {
    number: "04",
    title: "Craft",
    description:
      "Obsessive attention to the details that most people never notice, but everyone feels.",
    accent: "the invisible details",
  },
];

function PanelContent({
  panel,
  index,
}: {
  panel: (typeof PANELS)[number];
  index: number;
}) {
  return (
    <div className="flex h-full w-screen shrink-0 items-center px-8 md:px-16 lg:px-24">
      <div className="mx-auto max-w-xl">
        <span
          className="mb-4 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-sm)] tracking-[0.2em]"
          style={{ color: "var(--color-muted)" }}
        >
          {panel.number} / 04
        </span>
        <h3
          className="mb-6 font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-3xl)] font-bold uppercase leading-[1.1] tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          {panel.title}
        </h3>
        <p
          className="mb-8 max-w-sm font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-base)] leading-relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          {panel.description}
        </p>
        <p
          className="font-[family-name:var(--font-instrument)] text-[length:var(--text-fluid-lg)] italic"
          style={{ color: "var(--color-muted)" }}
        >
          {panel.accent}
        </p>
      </div>
    </div>
  );
}

function ReducedMotionFallback() {
  return (
    <section id="horizontal" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-12 font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-sm)] uppercase tracking-[0.2em]"
          style={{ color: "var(--color-muted)" }}
        >
          Principles
        </p>
        <div className="grid gap-16 md:grid-cols-2 md:gap-12">
          {PANELS.map((panel, i) => (
            <div key={i}>
              <span
                className="mb-2 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-sm)] tracking-[0.2em]"
                style={{ color: "var(--color-muted)" }}
              >
                {panel.number}
              </span>
              <h3
                className="mb-3 font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-2xl)] font-bold uppercase leading-[1.1] tracking-tight"
                style={{ color: "var(--color-text)" }}
              >
                {panel.title}
              </h3>
              <p
                className="mb-4 font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-base)] leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                {panel.description}
              </p>
              <p
                className="font-[family-name:var(--font-instrument)] text-[length:var(--text-fluid-lg)] italic"
                style={{ color: "var(--color-muted)" }}
              >
                {panel.accent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);
  const skewY = useScrollVelocitySkew({ maxSkew: 2 });

  if (prefersReduced) return <ReducedMotionFallback />;

  return (
    <div ref={containerRef} style={{ height: "400vh" }}>
      <section
        id="horizontal"
        className="sticky top-0 flex h-screen flex-col overflow-hidden"
      >
        {/* Label */}
        <div className="absolute top-8 left-8 z-10 md:left-16">
          <p
            className="font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-sm)] uppercase tracking-[0.2em]"
            style={{ color: "var(--color-muted)" }}
          >
            Principles
          </p>
        </div>

        {/* Panels */}
        <motion.div
          className="flex h-full items-center"
          style={{ x, skewY }}
        >
          {PANELS.map((panel, i) => (
            <PanelContent key={i} panel={panel} index={i} />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-8 right-8 md:left-16 md:right-16">
          <div
            className="h-px w-full"
            style={{ backgroundColor: "var(--color-border)" }}
          >
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: scrollYProgress,
                backgroundColor: "var(--color-text)",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
