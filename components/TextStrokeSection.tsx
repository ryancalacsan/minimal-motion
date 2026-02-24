"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { useTouchDevice } from "@/hooks/useTouchDevice"

const HOVER_WORDS = ["Form", "Function", "Finesse"]

function HoverWord({ word, isTouch }: { word: string; isTouch: boolean }) {
  const [active, setActive] = useState(false)

  return (
    <button
      className={`cursor-pointer font-syne text-fluid-3xl font-bold uppercase leading-[1.1] tracking-tight transition-all duration-500 ${
        active ? "text-stroke-filled" : "text-stroke-outline"
      }`}
      onClick={isTouch ? () => setActive((prev) => !prev) : undefined}
      onMouseEnter={isTouch ? undefined : () => setActive(true)}
      onMouseLeave={isTouch ? undefined : () => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-label={`${word} — ${isTouch ? "tap" : "hover"} to fill`}
    >
      {word}
    </button>
  )
}

export default function TextStrokeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotionSafe()
  const isTouch = useTouchDevice()

  const { scrollYProgress } = useScroll({
    target: fillRef,
    offset: ["start 0.8", "end 0.3"],
  })

  const clipRight = useTransform(scrollYProgress, [0, 1], [100, 0])
  const clipPath = useTransform(clipRight, (v) => `inset(0 ${v}% 0 0)`)

  return (
    <section
      id="outline"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <p
            className="mb-4 font-inter text-fluid-sm uppercase tracking-[0.2em]"
            style={{ color: "var(--color-muted)" }}
          >
            Outline &amp; Fill
          </p>
          <p
            className="max-w-md font-instrument text-fluid-lg italic"
            style={{ color: "var(--color-muted)" }}
          >
            The space between visible and invisible &mdash; outlines that earn
            their weight as you move through the page.
          </p>
        </div>

        {/* Demo 1: Scroll-to-fill */}
        <div ref={fillRef} className="mb-20 md:mb-28">
          <div className="relative inline-block">
            <span
              className="text-stroke-outline font-syne text-fluid-hero font-bold uppercase leading-none tracking-tight select-none"
              aria-hidden="true"
            >
              Contrast
            </span>
            {!prefersReduced && (
              <motion.span
                className="text-stroke-filled absolute inset-0 font-syne text-fluid-hero font-bold uppercase leading-none tracking-tight select-none"
                style={{ clipPath }}
                aria-hidden="true"
              >
                Contrast
              </motion.span>
            )}
          </div>
          <p
            className="mt-4 font-inter text-fluid-sm"
            style={{ color: "var(--color-muted)" }}
          >
            Scroll to reveal &mdash; presence follows progress
          </p>
        </div>

        {/* Demo 2: Tap/Hover-to-fill */}
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4 md:gap-x-12">
            {HOVER_WORDS.map((word) => (
              <HoverWord key={word} word={word} isTouch={isTouch} />
            ))}
          </div>
          <p
            className="mt-4 font-inter text-fluid-sm"
            style={{ color: "var(--color-muted)" }}
          >
            {isTouch ? "Tap" : "Hover"} to fill &mdash; interaction shapes form
          </p>
        </div>
      </div>
    </section>
  )
}
