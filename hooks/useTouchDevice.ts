"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function getSnapshot(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useTouchDevice(): boolean {
  return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}
