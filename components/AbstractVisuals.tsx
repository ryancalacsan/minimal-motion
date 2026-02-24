"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface ShapeItemProps {
  d: string;
  scrollYProgress: MotionValue<number>;
  startOffset: number;
  endOffset: number;
  strokeColor: string;
  strokeWidth?: number;
}

function ShapeItem({
  d,
  scrollYProgress,
  startOffset,
  endOffset,
  strokeColor,
  strokeWidth = 1,
}: ShapeItemProps) {
  const pathLength = useTransform(
    scrollYProgress,
    [startOffset, endOffset],
    [0, 1]
  );

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      style={{ pathLength }}
    />
  );
}

interface CircleShapeProps {
  cx: number;
  cy: number;
  r: number;
  scrollYProgress: MotionValue<number>;
  startOffset: number;
  endOffset: number;
  strokeColor: string;
  strokeWidth?: number;
}

function CircleShape({
  cx,
  cy,
  r,
  scrollYProgress,
  startOffset,
  endOffset,
  strokeColor,
  strokeWidth = 1,
}: CircleShapeProps) {
  const pathLength = useTransform(
    scrollYProgress,
    [startOffset, endOffset],
    [0, 1]
  );

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      style={{ pathLength }}
    />
  );
}

export default function AbstractVisuals() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section
      id="compose"
      ref={sectionRef}
      className="relative min-h-[60vh] overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Section header */}
      <div className="relative z-10 mb-16 md:mb-24">
        <p
          className="mb-4 font-inter text-fluid-sm uppercase tracking-[0.2em]"
          style={{ color: "var(--color-muted)" }}
        >
          Compose
        </p>
        <p
          className="max-w-md font-instrument text-fluid-lg italic"
          style={{ color: "var(--color-muted)" }}
        >
          Geometric primitives drawn by scroll &mdash; circles, arcs, and
          lines as the building blocks of visual rhythm.
        </p>
      </div>

      {/* Central text */}
      <div className="relative z-10 flex min-h-[40vh] items-center justify-center">
        <p
          className="text-center font-instrument text-fluid-xl italic"
          style={{ color: "var(--color-muted)" }}
        >
          composition &amp; type
        </p>
      </div>

      {/* SVG shapes */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg
          className="h-full w-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {prefersReduced ? (
            <>
              {/* Static shapes for reduced motion */}
              <circle
                cx={150}
                cy={150}
                r={80}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth={1}
              />
              <circle
                cx={850}
                cy={120}
                r={50}
                fill="none"
                stroke="var(--color-muted)"
                strokeWidth={1}
              />
              <line
                x1={100}
                y1={450}
                x2={400}
                y2={450}
                stroke="var(--color-border)"
                strokeWidth={1}
              />
              <path
                d="M 700 400 A 100 100 0 0 1 800 500"
                fill="none"
                stroke="var(--color-muted)"
                strokeWidth={1}
              />
              <path
                d="M 480 80 L 480 120 M 460 100 L 500 100"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth={1}
              />
              <path
                d="M 200 300 Q 350 200 500 300"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth={1}
              />
            </>
          ) : (
            <>
              {/* Large circle — left */}
              <CircleShape
                cx={150}
                cy={150}
                r={80}
                scrollYProgress={scrollYProgress}
                startOffset={0}
                endOffset={0.4}
                strokeColor="var(--color-border)"
              />

              {/* Small circle — right */}
              <CircleShape
                cx={850}
                cy={120}
                r={50}
                scrollYProgress={scrollYProgress}
                startOffset={0.1}
                endOffset={0.5}
                strokeColor="var(--color-muted)"
              />

              {/* Horizontal line — bottom left */}
              <ShapeItem
                d="M 100 450 L 400 450"
                scrollYProgress={scrollYProgress}
                startOffset={0.15}
                endOffset={0.55}
                strokeColor="var(--color-border)"
              />

              {/* Arc — bottom right */}
              <ShapeItem
                d="M 700 400 A 100 100 0 0 1 800 500"
                scrollYProgress={scrollYProgress}
                startOffset={0.25}
                endOffset={0.65}
                strokeColor="var(--color-muted)"
              />

              {/* Cross — top center */}
              <ShapeItem
                d="M 480 80 L 480 120 M 460 100 L 500 100"
                scrollYProgress={scrollYProgress}
                startOffset={0.3}
                endOffset={0.7}
                strokeColor="var(--color-border)"
              />

              {/* Curve — center */}
              <ShapeItem
                d="M 200 300 Q 350 200 500 300"
                scrollYProgress={scrollYProgress}
                startOffset={0.35}
                endOffset={0.8}
                strokeColor="var(--color-border)"
              />
            </>
          )}
        </svg>
      </div>
    </section>
  );
}
