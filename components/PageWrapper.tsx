"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import Preloader from "./Preloader";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReduced = useReducedMotionSafe();
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Preloader onComplete={handleComplete} />
      <motion.div
        className="relative"
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        animate={
          prefersReduced
            ? { opacity: 1 }
            : isLoading
              ? { opacity: 0 }
              : { opacity: 1 }
        }
        transition={{ duration: prefersReduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
