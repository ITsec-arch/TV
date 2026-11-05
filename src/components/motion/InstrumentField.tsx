"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** WebGL field is lazy and client-only; its absence changes nothing structural. */
const DepthField = dynamic(() => import("./DepthField"), { ssr: false });

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Hero backdrop for the re-art-directed pages: a layered field with depth.
 *
 * Base (always rendered, and the full no-JS / reduced-motion look): faint
 * iso-contours, a breathing red volumetric glow, a cool counter-glow, and an
 * edge vignette that sinks the frame into ink. On desktop with motion allowed
 * and WebGL present, a volumetric depth field is layered on top for a true
 * sense of looking into a 3D space. Decorative, aria-hidden, transforms and
 * opacity only; the whole group drifts a few px with the pointer (desktop,
 * motion only), so the instrument feels alive without flashing.
 */
export function InstrumentField({ className, webgl = true }: { className?: string; webgl?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [gl, setGl] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const gx = useTransform(sx, (v) => v * 26);
  const gy = useTransform(sy, (v) => v * 20);

  useEffect(() => {
    if (reduce) return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (desktop && webgl && supportsWebGL()) setGl(true);
    if (!desktop) return;
    const host = ref.current?.parentElement;
    if (!host) return;
    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    host.addEventListener("mousemove", onMove);
    return () => host.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my, webgl]);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 field-contours opacity-80" />
      {gl && <DepthField className="absolute inset-0" />}
      <motion.div className="absolute inset-0" style={{ x: gx, y: gy }}>
        <div className="volume-glow breathe" style={{ top: "-14%", right: "6%", width: "34rem", height: "34rem" }} />
        <div className="volume-glow cool" style={{ bottom: "-20%", left: "-6%", width: "30rem", height: "30rem" }} />
      </motion.div>
      <div className="absolute inset-0 depth-vignette" />
    </div>
  );
}
