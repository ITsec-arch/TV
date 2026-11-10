"use client";

import { motion, type Variants } from "framer-motion";
import { useAnimate } from "./useAnimate";

/** The brand's living spine: recon to impact, drawn with depth. Nodes further
 *  along the chain sit "closer" (larger, brighter glow). It draws and traverses
 *  once on load, then breathes slowly. SSR / no-JS / reduced motion render the
 *  settled final state. Phase names are labels, not tokens, so they are set in
 *  the body face, not mono. */
const NODES = [
  { id: "recon", label: "Recon", x: 58, y: 66, depth: 0.4 },
  { id: "foothold", label: "Foothold", x: 152, y: 116, depth: 0.58 },
  { id: "escalation", label: "Escalation", x: 248, y: 178, depth: 0.8 },
  { id: "impact", label: "Impact", x: 338, y: 242, depth: 1 },
];

const INTRO = 1.9; // seconds: edges + nodes settle before breathe/traverse

function Defs() {
  return (
    <defs>
      <linearGradient id="tv-edge" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--accent-cool)" stopOpacity="0.5" />
        <stop offset="0.5" stopColor="var(--line-strong)" stopOpacity="0.7" />
        <stop offset="1" stopColor="var(--red)" stopOpacity="0.95" />
      </linearGradient>
    </defs>
  );
}

function Node({ n, lit }: { n: (typeof NODES)[number]; lit: boolean }) {
  const r = 4.5 + n.depth * 2.5;
  return (
    <>
      <circle cx={n.x} cy={n.y} r={r + 7} fill="var(--red)" opacity={lit ? n.depth * 0.14 : 0} />
      <circle cx={n.x} cy={n.y} r={r} fill={lit ? "var(--red)" : "var(--surface-2)"} stroke="var(--red)" strokeWidth={1.5} strokeOpacity={0.5 + n.depth * 0.5} />
      <text x={n.x + r + 7} y={n.y + 4} fontSize="12.5" fontFamily="var(--font-sans)" fontWeight="500" fill={lit ? "var(--red-bright)" : "var(--fg-muted)"}>
        {n.label}
      </text>
    </>
  );
}

export function AttackPathGraph() {
  const anim = useAnimate();

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.3, delayChildren: 0.15 } } };
  const edgeV: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } },
  };
  const nodeV: Variants = { hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { duration: 0.35 } } };

  const body = anim ? (
    <motion.svg viewBox="0 0 400 300" className="h-auto w-full" initial="hidden" animate="show" variants={container} role="img" aria-label="Illustrative attack path from reconnaissance to impact">
      <Defs />
      {NODES.map((n, i) => {
        const m = NODES[i + 1];
        const last = i === NODES.length - 1;
        return (
          <g key={n.id}>
            {m ? <motion.line x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="url(#tv-edge)" strokeWidth={1.75} variants={edgeV} /> : null}
            {/* breathing presence ring, starts after the intro settles */}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={6 + n.depth * 4}
              fill="none"
              stroke="var(--accent-cool)"
              strokeWidth={1}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, n.depth * 0.28, n.depth * 0.12, n.depth * 0.28], scale: [0.92, 1.12, 1, 1.12] }}
              transition={{ duration: 5.5, delay: INTRO + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            <motion.g variants={nodeV} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
              <Node n={n} lit={last} />
            </motion.g>
          </g>
        );
      })}
      {/* one traversal pulse, recon to impact, repeating calmly */}
      <motion.g
        initial={{ opacity: 0, x: NODES[0].x, y: NODES[0].y }}
        animate={{ x: NODES.map((n) => n.x), y: NODES.map((n) => n.y), opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 2.4, delay: INTRO + 0.3, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
      >
        <circle r={3.5} fill="var(--red-bright)" />
      </motion.g>
    </motion.svg>
  ) : (
    <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label="Illustrative attack path from reconnaissance to impact">
      <Defs />
      {NODES.map((n, i) => {
        const m = NODES[i + 1];
        const last = i === NODES.length - 1;
        return (
          <g key={n.id}>
            {m ? <line x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="url(#tv-edge)" strokeWidth={1.75} /> : null}
            <Node n={n} lit={last} />
          </g>
        );
      })}
    </svg>
  );

  return (
    <div className="glass edge-holo rounded-xl">
      <div className="flex items-center justify-between border-b border-line/70 px-4 py-3">
        <span className="font-mono text-xs text-fg-subtle">attack path</span>
        <span className="font-mono text-xs text-accent-cool">recon to impact</span>
      </div>
      <div className="px-3 py-4">{body}</div>
      <p className="border-t border-line/70 px-4 py-2.5 text-xs text-fg-subtle">Illustrative path, not a client engagement.</p>
    </div>
  );
}
