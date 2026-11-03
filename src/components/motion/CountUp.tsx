"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useAnimate } from "./useAnimate";

/** Counts a real figure up when it scrolls into view (once). Renders the final
 *  value on the server, first render and reduced motion, so no-JS and reduced
 *  users see the correct number. Only ever used for genuine figures. */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.2,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const anim = useAnimate();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!anim || !inView) return;
    setDisplay(0);
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0, 0, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [anim, inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
