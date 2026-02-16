"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type CursorVariant = "default" | "text" | "link" | "magnetic" | "hidden";

interface CursorState {
  variant: CursorVariant;
  text: string;
}

interface CursorContextValue {
  cursorState: CursorState;
  setCursorVariant: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: "default",
    text: "",
  });

  const setCursorVariant = useCallback(
    (variant: CursorVariant, text: string = "") => {
      setCursorState({ variant, text });
    },
    []
  );

  const resetCursor = useCallback(() => {
    setCursorState({ variant: "default", text: "" });
  }, []);

  return (
    <CursorContext.Provider
      value={{ cursorState, setCursorVariant, resetCursor }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
