"use client";

import { motion, type Variants } from "framer-motion";
import { useAnimate } from "./useAnimate";

type Preset = "up" | "scale" | "left" | "fade";

const PRESETS: Record<Preset, { hidden: Record<string, number>; show: Record<string, number> }> = {
  up: { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } },
  left: { hidden: { opacity: 0, x: -18 }, show: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

function variantsFor(preset: Preset, duration: number): Variants {
  const p = PRESETS[preset];
  return { hidden: p.hidden, show: { ...p.show, transition: { duration, ease: [0.2, 0, 0, 1] } } };
}

/** Reveal on scroll-in (once). Varied presets avoid a uniform fade-up. Falls
 *  back to plain, visible output on the server, first render and reduced motion
 *  (via useAnimate), so no hydration mismatch and no hidden content without JS. */
export function Appear({
  children,
  preset = "up",
  stagger = 0,
  amount = 0.3,
  className,
}: {
  children: React.ReactNode;
  preset?: Preset;
  stagger?: number;
  amount?: number;
  className?: string;
}) {
  const anim = useAnimate();
  if (!anim) return <div className={className}>{children}</div>;

  if (stagger > 0) {
    const container: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger } } };
    return (
      <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }} variants={container}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }} variants={variantsFor(preset, 0.5)}>
      {children}
    </motion.div>
  );
}

export function AppearItem({
  children,
  preset = "up",
  className,
}: {
  children: React.ReactNode;
  preset?: Preset;
  className?: string;
}) {
  const anim = useAnimate();
  if (!anim) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={variantsFor(preset, 0.45)}>
      {children}
    </motion.div>
  );
}
