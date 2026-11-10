"use client";

import { motion, type Variants } from "framer-motion";
import { useAnimate } from "./useAnimate";

/**
 * The company's signature: an autonomous agent's working loop, observe to
 * verify, drawn once then orbiting calmly. SSR / no-JS / reduced motion render
 * the settled final state (ring + nodes visible, nothing moving). Gated on
 * useAnimate so content is never hidden without JS.
 */
const CX = 200;
const CY = 160;
const R = 96;
const NODES = [
  { id: "observe", label: "Observe", x: CX, y: CY - R, anchor: "middle" as const, dy: -14 },
  { id: "plan", label: "Plan", x: CX + R, y: CY, anchor: "start" as const, dx: 14 },
  { id: "act", label: "Act", x: CX, y: CY + R, anchor: "middle" as const, dy: 24 },
  { id: "verify", label: "Verify", x: CX - R, y: CY, anchor: "end" as const, dx: -14 },
];
const INTRO = 1.6;

function Defs() {
  return (
    <defs>
      <linearGradient id="agent-ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--accent-cool)" stopOpacity="0.55" />
        <stop offset="0.5" stopColor="var(--line-strong)" stopOpacity="0.7" />
        <stop offset="1" stopColor="var(--red)" stopOpacity="0.95" />
      </linearGradient>
    </defs>
  );
}

function Node({ n }: { n: (typeof NODES)[number] }) {
  return (
    <>
      <circle cx={n.x} cy={n.y} r={7} fill="var(--surface-2)" stroke="var(--red)" strokeWidth={1.5} />
      <circle cx={n.x} cy={n.y} r={2.5} fill="var(--red-bright)" />
      <text
        x={n.x + (n.dx ?? 0)}
        y={n.y + (n.dy ?? 4)}
        textAnchor={n.anchor}
        fontSize="13"
        fontFamily="var(--font-sans)"
        fontWeight="500"
        fill="var(--fg-muted)"
      >
        {n.label}
      </text>
    </>
  );
}

function Core() {
  return (
    <>
      <circle cx={CX} cy={CY} r={26} fill="none" stroke="var(--line)" strokeWidth={1} />
      <text x={CX} y={CY - 2} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--fg-subtle)">
        agent
      </text>
      <text x={CX} y={CY + 12} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--fg-subtle)">
        loop
      </text>
    </>
  );
}

export function AgentLoop() {
  const anim = useAnimate();

  const ringV: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: [0.2, 0, 0, 1] } },
  };
  const nodeV: Variants = { hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { duration: 0.35 } } };
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } } };

  const Body = anim ? (
    <motion.svg viewBox="0 0 400 320" className="h-auto w-full" initial="hidden" animate="show" variants={container} role="img" aria-label="An autonomous agent loop: observe, plan, act, verify">
      <Defs />
      {/* the loop ring, drawn once */}
      <motion.circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#agent-ring)" strokeWidth={1.75} variants={ringV} />
      {/* breathing presence on each node */}
      {NODES.map((n, i) => (
        <motion.circle
          key={`ring-${n.id}`}
          cx={n.x}
          cy={n.y}
          r={11}
          fill="none"
          stroke="var(--accent-cool)"
          strokeWidth={1}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 0.3, 0.12, 0.3], scale: [0.92, 1.15, 1, 1.15] }}
          transition={{ duration: 5, delay: INTRO + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
      {NODES.map((n) => (
        <motion.g key={n.id} variants={nodeV} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
          <Node n={n} />
        </motion.g>
      ))}
      <Core />
      {/* a pulse orbits the loop, clockwise, forever */}
      <motion.g
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{ rotate: { duration: 6, delay: INTRO, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.6, delay: INTRO } }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      >
        <circle cx={CX} cy={CY - R} r={4} fill="var(--red-bright)" />
      </motion.g>
    </motion.svg>
  ) : (
    <svg viewBox="0 0 400 320" className="h-auto w-full" role="img" aria-label="An autonomous agent loop: observe, plan, act, verify">
      <Defs />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#agent-ring)" strokeWidth={1.75} />
      {NODES.map((n) => (
        <g key={n.id}>
          <Node n={n} />
        </g>
      ))}
      <Core />
    </svg>
  );

  return (
    <div className="glass edge-holo rounded-xl">
      <div className="flex items-center justify-between border-b border-line/70 px-4 py-3">
        <span className="font-mono text-xs text-fg-subtle">agent runtime</span>
        <span className="font-mono text-xs text-accent-cool">observe to verify</span>
      </div>
      <div className="px-3 py-4">{Body}</div>
      <p className="border-t border-line/70 px-4 py-2.5 text-xs text-fg-subtle">The loop every ThreatVet agent runs, with a human on verify.</p>
    </div>
  );
}
