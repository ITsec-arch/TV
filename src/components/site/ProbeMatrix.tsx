"use client";

import { motion, type Variants } from "framer-motion";
import { useAnimate } from "@/components/motion/useAnimate";

/**
 * The /product coverage matrix: the 27 probe categories fill in a sweep as the
 * grid scrolls into view (once). Each cell rises in on a short stagger and its
 * leading status dot flares red then settles, reading as probes firing one by
 * one; the index carries the cool telemetry accent. Transform/opacity only,
 * reserved layout (no CLS). On the server, first render and reduced motion it
 * renders the final static state: all cells visible, every dot settled. No
 * fabricated data, just the real 27.
 */
export function ProbeMatrix({ probes }: { probes: string[] }) {
  const anim = useAnimate();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.025, delayChildren: 0.04 } },
  };
  const cell: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.2, 0, 0, 1] } },
  };
  const dot: Variants = {
    hidden: { opacity: 0, scale: 0.4 },
    show: { opacity: [0, 1, 0.5], scale: [0.4, 1.15, 1], transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
  };

  const gridClass =
    "grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line edge-holo sm:grid-cols-2 lg:grid-cols-3";
  const cellClass = "flex items-center gap-3 bg-surface px-4 py-3 transition-colors hover:bg-surface-2";

  if (!anim) {
    return (
      <ul className={gridClass}>
        {probes.map((p, i) => (
          <li key={p} className={cellClass}>
            <span aria-hidden className="size-1.5 shrink-0 rounded-full" style={{ background: "var(--red)", opacity: 0.5 }} />
            <span className="font-mono text-xs text-accent-cool">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm text-fg">{p}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul className={gridClass} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      {probes.map((p, i) => (
        <motion.li key={p} className={cellClass} variants={cell}>
          <motion.span aria-hidden variants={dot} className="size-1.5 shrink-0 rounded-full" style={{ background: "var(--red)" }} />
          <span className="font-mono text-xs text-accent-cool">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-sm text-fg">{p}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
