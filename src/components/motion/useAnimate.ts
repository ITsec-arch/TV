"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * True only after mount and when motion is allowed. During SSR and the first
 * client render it returns false, so animated and static output are identical
 * (no hydration mismatch), content is visible without JS, and the LCP element
 * is never hidden. Reduced-motion users get false permanently, i.e. fully
 * static.
 */
export function useAnimate(): boolean {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready && !reduce;
}
