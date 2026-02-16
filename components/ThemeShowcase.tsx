"use client";

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
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <h2 className="sr-only">Shift — Theme Showcase</h2>
        <TextReveal
          text="Shift"
          mode="letter"
          className="mb-20 font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-hero)] font-bold leading-[0.9]"
          aria-hidden
        />

        <TextReveal
          text="A monochrome palette that breathes. Toggle between light and dark to see every color transition smoothly."
          mode="word"
          className="mb-16 max-w-2xl font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-lg)] leading-relaxed"
          delay={0.2}
        />

        {/* Centered toggle */}
        <div className="mb-20 flex justify-center">
          <ThemeToggle size="large" />
        </div>

        {/* Color palette display */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {PALETTE.map((color) => (
            <div key={color.variable} className="flex flex-col gap-2">
              <div
                className="aspect-square w-full rounded-lg border transition-colors duration-300"
                style={{
                  backgroundColor: `var(${color.variable})`,
                  borderColor: "var(--color-border)",
                }}
              />
              <span
                className="font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)]"
                style={{ color: "var(--color-muted)" }}
              >
                {color.label}
              </span>
              <span
                className="font-[family-name:var(--font-inter)] text-xs font-mono"
                style={{ color: "var(--color-muted)" }}
              >
                {color.variable}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
