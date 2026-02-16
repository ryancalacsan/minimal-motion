"use client";

import TextReveal from "./TextReveal";

export default function RevealSection() {
  return (
    <section id="reveal-modes" className="px-6 py-20 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <h2 className="sr-only">Reveal Modes</h2>
        <TextReveal
          text="Reveal Modes"
          mode="letter"
          className="mb-6 font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
          aria-hidden
        />
        <TextReveal
          text="Four ways to reveal text on scroll — each with its own character and cadence."
          mode="word"
          className="mb-24 max-w-xl font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-sm)] leading-relaxed"
          delay={0.15}
        />

        {/* Word reveal */}
        <div className="mb-28">
          <div className="mb-4 flex items-baseline gap-4">
            <span
              className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-xs)] font-semibold tabular-nums"
              style={{ color: "var(--color-border)" }}
            >
              01
            </span>
            <span
              className="font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
              style={{ color: "var(--color-muted)" }}
            >
              Word by word
            </span>
          </div>
          <TextReveal
            text="Words arrive one at a time — measured, unhurried, each one intentional."
            mode="word"
            className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-2xl)] font-semibold leading-tight"
            delay={0.1}
          />
        </div>

        {/* Letter reveal — centered for impact */}
        <div className="mb-28 text-center">
          <div className="mb-4 flex items-baseline justify-center gap-4">
            <span
              className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-xs)] font-semibold tabular-nums"
              style={{ color: "var(--color-border)" }}
            >
              02
            </span>
            <span
              className="font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
              style={{ color: "var(--color-muted)" }}
            >
              Letter by letter
            </span>
          </div>
          <TextReveal
            text="Precision"
            mode="letter"
            className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-hero)] font-bold leading-[1.1]"
          />
        </div>

        {/* Line reveal — right-aligned for variety */}
        <div className="mb-28 sm:ml-auto sm:max-w-2xl sm:text-right">
          <div className="mb-4 flex items-baseline gap-4 sm:justify-end">
            <span
              className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-xs)] font-semibold tabular-nums"
              style={{ color: "var(--color-border)" }}
            >
              03
            </span>
            <span
              className="font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
              style={{ color: "var(--color-muted)" }}
            >
              Line by line
            </span>
          </div>
          <TextReveal
            text={"Not just\nwhat it looks like.\nHow it works."}
            mode="line"
            className="font-[family-name:var(--font-instrument)] text-[length:var(--text-fluid-xl)] italic leading-relaxed"
          />
        </div>

        {/* Mask reveal */}
        <div className="mb-28">
          <div className="mb-4 flex items-baseline gap-4">
            <span
              className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-xs)] font-semibold tabular-nums"
              style={{ color: "var(--color-border)" }}
            >
              04
            </span>
            <span
              className="font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
              style={{ color: "var(--color-muted)" }}
            >
              Mask wipe
            </span>
          </div>
          <TextReveal
            text="The finest interfaces feel inevitable — every transition considered, every movement with intent."
            mode="mask"
            className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-xl)] font-medium leading-snug"
          />
        </div>
      </div>
    </section>
  );
}
