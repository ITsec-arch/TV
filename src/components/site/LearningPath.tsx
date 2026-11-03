"use client";

import Link from "next/link";
import { Reveal, RevealLine } from "@/components/site/Reveal";
import { TIERS, programsByTier } from "@/lib/courses";

/**
 * The academy's hero artifact: an inline-SVG learning path from Foundational to
 * Advanced, with the five programs placed on the path by level. Connectors and
 * nodes are SVG (percentage endpoints, no raster), labels are HTML. Assembles
 * once (reduced-motion aware via Reveal).
 */
export function LearningPath() {
  const rows = TIERS.map((tier) => ({ tier, items: programsByTier(tier) }));

  return (
    <Reveal className="rounded-lg border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-xs text-fg-subtle">learning path</span>
        <span className="font-mono text-xs text-fg-muted">foundational to advanced</span>
      </div>

      <ol>
        {rows.map((row, i) => {
          const first = i === 0;
          const last = i === rows.length - 1;
          return (
            <RevealLine key={row.tier}>
              <li className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line px-4 last:border-0">
                <svg className="h-full w-10" aria-hidden focusable="false">
                  {!first && <line x1="20" y1="0" x2="20" y2="28" stroke="var(--line-strong)" strokeWidth="1.5" />}
                  {!last && <line x1="20" y1="28" x2="20" y2="100%" stroke="var(--line-strong)" strokeWidth="1.5" />}
                  <circle cx="20" cy="28" r="11" fill="none" stroke="var(--red)" strokeOpacity="0.3" strokeWidth="1.5" />
                  <circle cx="20" cy="28" r="6" fill="var(--red)" />
                </svg>
                <div className="py-4">
                  <div className="text-sm font-semibold text-fg">{row.tier}</div>
                  <ul className="mt-2 space-y-1.5">
                    {row.items.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/academy/${p.slug}`} className="text-sm text-fg-muted hover:text-red-bright">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </RevealLine>
          );
        })}
      </ol>

      <p className="border-t border-line px-4 py-2.5 text-xs text-fg-subtle">
        Five programs, placed by level. Start where you are.
      </p>
    </Reveal>
  );
}
