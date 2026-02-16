"use client";

import TextReveal from "./TextReveal";

export default function RevealSection() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <h2 className="sr-only">Reveal Modes</h2>
        <TextReveal
          text="Reveal Modes"
          mode="letter"
          className="mb-20 font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
          aria-hidden
        />

        {/* Word reveal */}
        <div className="mb-24">
          <span
            className="mb-4 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Word by word
          </span>
          <TextReveal
            text="Words arrive one at a time — measured, unhurried, each one intentional."
            mode="word"
            className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-2xl)] font-semibold leading-tight"
            delay={0.1}
          />
        </div>

        {/* Letter reveal */}
        <div className="mb-24">
          <span
            className="mb-4 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Letter by letter
          </span>
          <TextReveal
            text="Precision"
            mode="letter"
            className="font-[family-name:var(--font-syne)] text-[length:var(--text-fluid-hero)] font-bold leading-[1.1]"
          />
        </div>

        {/* Line reveal */}
        <div className="mb-24">
          <span
            className="mb-4 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Line by line
          </span>
          <TextReveal
            text={"Design is not just\nwhat it looks like.\nDesign is how\nit works."}
            mode="line"
            className="font-[family-name:var(--font-instrument)] text-[length:var(--text-fluid-xl)] italic leading-relaxed"
          />
        </div>

        {/* Mask reveal */}
        <div className="mb-24">
          <span
            className="mb-4 block font-[family-name:var(--font-inter)] text-[length:var(--text-fluid-xs)] uppercase tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Mask wipe
          </span>
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
