"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimate } from "@/components/motion/useAnimate";

export type Phase = { id: string; title: string; body?: string; branch?: boolean };

/**
 * Vyra's pipeline as a vertical spine, sharing the home spine's motion
 * language. When it scrolls into view the connectors draw and rows settle top
 * to bottom, then each node carries a slow cool breathe ring, so the pipeline
 * reads as a live instrument. Server, first render and reduced motion render
 * the final static state (no hydration mismatch, no hidden content). Phase ids
 * (pt-00) are technical tokens, so they stay mono.
 */
export function PhaseFlow({ phases }: { phases: Phase[] }) {
  const anim = useAnimate();

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const row: Variants = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.2, 0, 0, 1] } },
  };
  const draw: Variants = { hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.45, ease: [0.2, 0, 0, 1] } } };
  const nodeV: Variants = { hidden: { scale: 0 }, show: { scale: 1, transition: { duration: 0.3 } } };
  const introDone = phases.length * 0.12 + 0.5;

  function content(p: Phase) {
    return (
      <div className={cn("min-w-0 pb-8", p.branch && "opacity-95")}>
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-mono text-xs text-red">{p.id}</span>
          <h3 className="font-medium text-fg">{p.title}</h3>
        </div>
        {p.body ? <p className="mt-1 text-sm leading-relaxed text-fg-muted">{p.body}</p> : null}
      </div>
    );
  }

  if (!anim) {
    return (
      <ol className="w-full">
        {phases.map((p, i) => {
          const first = i === 0;
          const last = i === phases.length - 1;
          return (
            <li key={p.id} className="grid grid-cols-[2.25rem_1fr] gap-4">
              <svg className="h-full w-9" aria-hidden focusable="false">
                {!first && <line x1="18" y1="0" x2="18" y2="16" stroke="var(--line-strong)" strokeWidth="1.5" />}
                {!last && <line x1="18" y1="16" x2="18" y2="100%" stroke="var(--line-strong)" strokeWidth="1.5" />}
                <circle cx="18" cy="16" r={p.branch ? 4 : 5} fill={p.branch ? "var(--bg)" : "var(--red)"} stroke={p.branch ? "var(--red)" : "none"} strokeWidth="1.5" />
              </svg>
              {content(p)}
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <motion.ol className="w-full" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
      {phases.map((p, i) => {
        const first = i === 0;
        const last = i === phases.length - 1;
        return (
          <motion.li key={p.id} className="grid grid-cols-[2.25rem_1fr] gap-4" variants={row}>
            <svg className="h-full w-9" aria-hidden focusable="false">
              {!first && <line x1="18" y1="0" x2="18" y2="16" stroke="var(--line-strong)" strokeWidth="1.5" />}
              {!last && <motion.line x1="18" y1="16" x2="18" y2="100%" stroke="var(--line-strong)" strokeWidth="1.5" variants={draw} />}
              <motion.circle
                cx="18"
                cy="16"
                r={10}
                fill="none"
                stroke="var(--accent-cool)"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.3, 0.12, 0.3], scale: [0.8, 1.25, 1.05, 1.25] }}
                transition={{ duration: 5, delay: introDone + i * 0.12, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "18px 16px" }}
              />
              <motion.circle cx="18" cy="16" r={p.branch ? 4 : 5} fill={p.branch ? "var(--bg)" : "var(--red)"} stroke={p.branch ? "var(--red)" : "none"} strokeWidth="1.5" variants={nodeV} style={{ transformOrigin: "18px 16px" }} />
            </svg>
            {content(p)}
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
