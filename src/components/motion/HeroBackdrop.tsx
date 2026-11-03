"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Layered hero background: engineered grid, two drifting red glows, a telemetry
 * scan line, and a pointer-reactive glow (desktop). Decorative, aria-hidden,
 * transforms/opacity only. The grid, glows, scan and pointer glow all render
 * identically on server and client (no reduce-based render branch), so there is
 * no hydration mismatch; the drift/scan are disabled in CSS under reduced
 * motion, and the pointer listener is skipped under reduced motion.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const x = useTransform(sx, (v) => v * 80);
  const y = useTransform(sy, (v) => v * 60);

  useEffect(() => {
    if (reduce) return;
    const host = ref.current?.parentElement;
    if (!host) return;
    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    host.addEventListener("mousemove", onMove);
    return () => host.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 grid-faint opacity-70" />
      <div className="glow-drift" style={{ top: "-12%", left: "52%", width: "34rem", height: "34rem" }} />
      <div className="glow-drift glow-drift-2" style={{ bottom: "-22%", left: "2%", width: "28rem", height: "28rem" }} />
      <div className="scan-line" />
      <motion.div
        className="absolute left-1/2 top-[34%] hidden size-[26rem] rounded-full md:block"
        style={{
          x,
          y,
          marginLeft: "-13rem",
          marginTop: "-13rem",
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--red) 42%, transparent), transparent 70%)",
          opacity: 0.13,
          filter: "blur(44px)",
        }}
      />
    </div>
  );
}
