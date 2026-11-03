"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAnimate } from "./useAnimate";

/** Subtle scroll parallax (transform only). Plain, static output on the server,
 *  first render and reduced motion, so no hydration mismatch. */
export function Parallax({
  children,
  amount = 30,
  className,
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const anim = useAnimate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  if (!anim) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
