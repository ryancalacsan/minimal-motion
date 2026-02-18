"use client";

import { motion } from "motion/react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticElement({
  children,
  strength = 0.3,
  className,
}: MagneticElementProps) {
  const { ref, x, y } = useMagnetic({ strength });

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
