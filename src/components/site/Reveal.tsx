"use client";

import { motion, type Variants } from "framer-motion";
import { useAnimate } from "@/components/motion/useAnimate";

/**
 * The page's single orchestrated motion moment: the hero finding record
 * assembles once on load. Gated on useAnimate(), so on the server, the first
 * client render, and for reduced-motion users it renders plain, fully visible
 * output (no hidden content without JS, no hydration mismatch). Not reused for
 * scroll reveals; everything else on the page is static.
 */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const anim = useAnimate();
  if (!anim) return <div className={className}>{children}</div>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  return (
    <motion.div className={className} variants={container} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}

export function RevealLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const anim = useAnimate();
  if (!anim) return <div className={className}>{children}</div>;

  const item: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0, 0, 1] } },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
