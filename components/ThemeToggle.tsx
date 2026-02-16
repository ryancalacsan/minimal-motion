"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

interface ThemeToggleProps {
  size?: "default" | "large";
}

export default function ThemeToggle({ size = "default" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        className={`rounded-full ${
          size === "large" ? "h-12 w-24" : "h-7 w-14"
        }`}
        style={{ backgroundColor: "var(--color-border)" }}
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggleWidth = size === "large" ? 96 : 56;
  const toggleHeight = size === "large" ? 48 : 28;
  const thumbSize = size === "large" ? 40 : 22;
  const padding = (toggleHeight - thumbSize) / 2;

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative rounded-full transition-colors duration-300"
      style={{
        width: toggleWidth,
        height: toggleHeight,
        backgroundColor: isDark ? "var(--color-text)" : "var(--color-border)",
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: thumbSize,
          height: thumbSize,
          top: padding,
          backgroundColor: isDark ? "var(--color-bg)" : "var(--color-text)",
        }}
        animate={{
          left: isDark ? toggleWidth - thumbSize - padding : padding,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}
