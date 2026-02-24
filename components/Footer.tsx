"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import MagneticElement from "./MagneticElement";
import ThemeToggle from "./ThemeToggle";
import { useCursor } from "@/context/CursorContext";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const TECH_STACK = [
  "Next.js 16",
  "Motion",
  "Tailwind CSS v4",
  "Lenis",
  "TypeScript",
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/ryancalacsan" },
  { label: "X", href: "https://x.com/ryancalacsan" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ryancalacsan" },
];

export default function Footer() {
  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReduced = useReducedMotionSafe();
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillsInView = useInView(pillsRef, { margin: "-50px", once: true });

  return (
    <footer
      className="border-t px-6 py-16"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Back to top */}
        <div className="mb-16 flex justify-center">
          <MagneticElement strength={0.15}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex flex-col items-center gap-2"
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={resetCursor}
              aria-label="Scroll to top"
            >
              <motion.div
                className="h-12 w-px"
                style={{ backgroundColor: "var(--color-muted)" }}
                animate={
                  prefersReduced
                    ? { scaleY: 1, originY: 1 }
                    : { scaleY: [0, 1, 0], originY: 1 }
                }
                transition={
                  prefersReduced
                    ? { duration: 0.3 }
                    : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }
              />
              <span
                className="font-inter text-fluid-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--color-muted)" }}
              >
                Top
              </span>
            </button>
          </MagneticElement>
        </div>

        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: name + attribution + toggle */}
          <div className="flex flex-col gap-4">
            <span
              className="font-sora text-fluid-lg font-bold"
              style={{ color: "var(--color-text)" }}
            >
              Minimal Motion
            </span>
            <p
              className="font-instrument text-fluid-sm italic"
              style={{ color: "var(--color-muted)" }}
            >
              Designed &amp; built by Ryan Calacsan
            </p>
            <ThemeToggle />
          </div>

          {/* Right: socials */}
          <div className="flex gap-6">
            {SOCIALS.map((social) => (
              <MagneticElement key={social.label} strength={0.15}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link font-inter text-fluid-sm transition-colors duration-300"
                  style={{ color: "var(--color-muted)" }}
                  onMouseEnter={() => setCursorVariant("link")}
                  onMouseLeave={resetCursor}
                >
                  {social.label}
                </a>
              </MagneticElement>
            ))}
          </div>
        </div>

        {/* Tech stack pills */}
        <div ref={pillsRef} className="mt-12 flex flex-wrap gap-2">
          {TECH_STACK.map((tech, i) => (
            <motion.span
              key={tech}
              className="tech-pill rounded-full border px-4 py-1.5 font-inter text-fluid-xs transition-colors duration-300"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-muted)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={
                pillsInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Copyright */}
        <div
          className="mt-12 font-inter text-fluid-xs"
          style={{ color: "var(--color-muted)" }}
        >
          &copy; {new Date().getFullYear()} Minimal Motion.
        </div>
      </div>
    </footer>
  );
}
