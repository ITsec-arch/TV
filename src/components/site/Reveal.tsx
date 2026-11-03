"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * The page's single orchestrated motion moment: the hero finding record
 * assembles once on load. Respects prefers-reduced-motion (no transform,
 * instant). Not reused elsewhere — everything else on the page is static.
 */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 },
    },
  };

  return (
    <motion.div className={className} variants={container} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}

export function RevealLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.4, ease: [0.2, 0, 0, 1] },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
