"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import TextReveal from "./TextReveal";
import ThemeToggle from "./ThemeToggle";

const PALETTE = [
  { label: "Background", variable: "--color-bg" },
  { label: "Text", variable: "--color-text" },
  { label: "Muted", variable: "--color-muted" },
  { label: "Border", variable: "--color-border" },
  { label: "Surface", variable: "--color-surface" },
];

export default function ThemeShowcase() {
  const paletteRef = useRef<HTMLDivElement>(null);
  const paletteInView = useInView(paletteRef, {
    margin: "-50px",
    once: true,
  });

  return (
    <section id="shift" className="px-6 py-20 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <h2 className="sr-only">Shift — Theme Showcase</h2>
        <TextReveal
          text="Shift"
          mode="letter"
          className="mb-12 font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-hero)] font-bold leading-[1.1] sm:mb-20"
          aria-hidden
        />

        <TextReveal
          text="A monochrome palette that breathes. Toggle between light and dark — every token transitions in concert."
          mode="word"
          className="mb-10 max-w-2xl font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-lg)] leading-relaxed sm:mb-16"
          delay={0.2}
        />

        {/* Centered toggle */}
        <div className="mb-10 flex justify-center sm:mb-20">
          <ThemeToggle size="large" />
        </div>

        {/* Color palette display */}
        <div
          ref={paletteRef}
          className="grid grid-cols-5 gap-3 sm:gap-4"
        >
          {PALETTE.map((color, i) => (
            <motion.div
              key={color.variable}
              className="group flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={
                paletteInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="aspect-square w-full rounded-lg border transition-colors duration-300"
                style={{
                  backgroundColor: `var(${color.variable})`,
                  borderColor: "var(--color-border)",
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                }}
                whileTap={{
                  scale: 0.95,
                  rotate: -1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              />
              <span
                className="text-[10px] font-[family-name:var(--font-inter)] sm:text-[length:var(--text-fluid-xs)]"
                style={{ color: "var(--color-muted)" }}
              >
                {color.label}
              </span>
              <span
                className="hidden font-[family-name:var(--font-inter)] text-xs font-mono sm:block"
                style={{ color: "var(--color-muted)" }}
              >
                {color.variable}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
