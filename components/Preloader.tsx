"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const SESSION_KEY = "mm-preloader-shown";

export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const prefersReduced = useReducedMotionSafe();
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const [letterRevealed, setLetterRevealed] = useState(false);
  const [lineExtended, setLineExtended] = useState(false);

  useEffect(() => {
    // Skip if reduced motion or already shown this session
    if (prefersReduced || !show) {
      onComplete();
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");

    // Sequence: letter reveal → line → hold → exit
    const t1 = setTimeout(() => setLetterRevealed(true), 100);
    const t2 = setTimeout(() => setLineExtended(true), 500);
    const t3 = setTimeout(() => setShow(false), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [prefersReduced, onComplete]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence
      onExitComplete={onComplete}
    >
      {show && (
        <motion.div
          className="fixed inset-0 z-[10001] flex items-center justify-center"
          style={{ backgroundColor: "var(--color-bg)" }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="flex flex-col items-center">
            {/* Letter M reveal */}
            <div
              className="overflow-hidden"
              style={{ height: "clamp(4rem, 8vw, 8rem)" }}
            >
              <motion.span
                className="block font-[family-name:var(--font-syne)] font-bold leading-[1]"
                style={{
                  color: "var(--color-text)",
                  fontSize: "clamp(4rem, 8vw, 8rem)",
                }}
                initial={{ y: "100%" }}
                animate={letterRevealed ? { y: "0%" } : { y: "100%" }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                M
              </motion.span>
            </div>

            {/* Underline */}
            <motion.div
              className="mt-2 h-px origin-center"
              style={{ backgroundColor: "var(--color-text)" }}
              initial={{ width: 0 }}
              animate={lineExtended ? { width: "3rem" } : { width: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
