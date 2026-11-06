"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAnimate } from "./useAnimate";

/** The scroll hook lives in this child, which only ever mounts once motion is
 *  allowed. So its target ref is attached (during commit) before Motion reads
 *  it in its layout effect: no "target ref is defined but not hydrated" error,
 *  which happens when useScroll is called while its ref element is absent. */
function ParallaxMotion({
  children,
  amount,
  className,
}: {
  children: React.ReactNode;
  amount: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Subtle scroll parallax (transform only). Plain, static output on the server,
 *  first render and reduced motion, so no hydration mismatch and content is
 *  visible without JS. */
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
  if (!anim) return <div className={className}>{children}</div>;
  return (
    <ParallaxMotion amount={amount} className={className}>
      {children}
    </ParallaxMotion>
  );
}
