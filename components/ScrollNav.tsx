"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTouchDevice } from "@/hooks/useTouchDevice";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "type-in-motion", label: "Type" },
  { id: "reveal-modes", label: "Reveal" },
  { id: "outline", label: "Outline" },
  { id: "interact", label: "Interact" },
  { id: "horizontal", label: "Principles" },
  { id: "shift", label: "Shift" },
  { id: "compose", label: "Compose" },
  { id: "cta", label: "CTA" },
];

export default function ScrollNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const isTouch = useTouchDevice();
  const prefersReduced = useReducedMotionSafe();

  useEffect(() => {
    if (isTouch) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show after scrolling past hero
      setVisible(scrollY > windowHeight * 0.5);

      // Find active section
      const sections = SECTIONS.map((s) => document.getElementById(s.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.5) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTouch]);

  if (isTouch || prefersReduced) return null;

  return (
    <motion.nav
      className="fixed right-6 top-1/2 z-50 -translate-y-1/2"
      initial={{ opacity: 0, x: 20 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Page sections"
    >
      <div className="flex flex-col items-center gap-3">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => {
              const el = document.getElementById(section.id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative flex items-center"
            aria-label={`Scroll to ${section.label}`}
            aria-current={i === activeIndex ? "true" : undefined}
          >
            {/* Label tooltip */}
            <span
              className="absolute right-6 whitespace-nowrap rounded px-2 py-1 font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                color: "var(--color-muted)",
              }}
            >
              {section.label}
            </span>
            {/* Dot */}
            <motion.div
              className="rounded-full"
              style={{ backgroundColor: "var(--color-text)" }}
              animate={{
                width: i === activeIndex ? 8 : 4,
                height: i === activeIndex ? 8 : 4,
                opacity: i === activeIndex ? 1 : 0.3,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            />
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
