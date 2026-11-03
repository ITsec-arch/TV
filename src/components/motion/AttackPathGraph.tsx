"use client";

import { motion, type Variants } from "framer-motion";
import { useAnimate } from "./useAnimate";

const NODES = [
  { id: "recon", label: "Recon", x: 48, y: 56 },
  { id: "foothold", label: "Foothold", x: 150, y: 112 },
  { id: "escalation", label: "Escalation", x: 242, y: 186 },
  { id: "impact", label: "Impact", x: 330, y: 250 },
];

function nodeCircles(n: (typeof NODES)[number], last: boolean) {
  return (
    <>
      <circle cx={n.x} cy={n.y} r={11} fill="none" stroke="var(--red)" strokeOpacity={last ? 0.5 : 0.25} strokeWidth={1.5} />
      <circle cx={n.x} cy={n.y} r={6} fill={last ? "var(--red)" : "var(--surface-2)"} stroke="var(--red)" strokeWidth={1.5} />
      <text x={n.x + 16} y={n.y + 4} fontSize="12" fontFamily="var(--font-mono)" fill={last ? "var(--red-bright)" : "var(--fg-muted)"}>
        {n.label}
      </text>
    </>
  );
}

export function AttackPathGraph() {
  const anim = useAnimate();

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.32, delayChildren: 0.15 } } };
  const edgeV: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } },
  };
  const nodeV: Variants = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.35 } },
  };

  const body = anim ? (
    <motion.svg
      viewBox="0 0 400 300"
      className="h-auto w-full"
      initial="hidden"
      animate="show"
      variants={container}
      role="img"
      aria-label="Illustrative attack path from reconnaissance to impact"
    >
      {NODES.map((n, i) => {
        const last = i === NODES.length - 1;
        const m = NODES[i + 1];
        return (
          <g key={n.id}>
            <motion.g variants={nodeV} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
              {nodeCircles(n, last)}
            </motion.g>
            {!last ? (
              <motion.line
                x1={n.x}
                y1={n.y}
                x2={m.x}
                y2={m.y}
                stroke={i === NODES.length - 2 ? "var(--red)" : "var(--line-strong)"}
                strokeWidth={1.5}
                variants={edgeV}
              />
            ) : null}
          </g>
        );
      })}
      <motion.circle
        r={4}
        fill="var(--red-bright)"
        initial={{ opacity: 0 }}
        animate={{ cx: NODES.map((n) => n.x), cy: NODES.map((n) => n.y), opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2, delay: 2.4, ease: "linear" }}
      />
    </motion.svg>
  ) : (
    <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label="Illustrative attack path from reconnaissance to impact">
      {NODES.map((n, i) => {
        const last = i === NODES.length - 1;
        const m = NODES[i + 1];
        return (
          <g key={n.id}>
            {!last ? (
              <line x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={i === NODES.length - 2 ? "var(--red)" : "var(--line-strong)"} strokeWidth={1.5} />
            ) : null}
            <g>{nodeCircles(n, last)}</g>
          </g>
        );
      })}
    </svg>
  );

  return (
    <div className="rounded-lg border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-xs text-fg-subtle">attack path</span>
        <span className="font-mono text-xs text-fg-muted">recon to impact</span>
      </div>
      <div className="px-2 py-3">{body}</div>
      <p className="border-t border-line px-4 py-2.5 text-xs text-fg-subtle">
        Illustrative path, not a client engagement.
      </p>
    </div>
  );
}
