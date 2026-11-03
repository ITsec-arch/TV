"use client";

import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealLine } from "@/components/site/Reveal";
import { SeverityBadge, type Severity } from "@/components/site/SeverityBadge";

export type FindingRow = { k: string; v: React.ReactNode };

/**
 * A finding record rendered as real structure (mono), the recurring proof
 * artifact. Any illustrative instance must carry the standard honesty note.
 * `animate` enables the single hero assembly (reduced-motion aware via Reveal).
 */
export function FindingRecord({
  label = "finding record",
  severity,
  rows,
  note,
  animate = false,
  className,
}: {
  label?: string;
  severity: Severity;
  rows: FindingRow[];
  note?: string;
  animate?: boolean;
  className?: string;
}) {
  const Wrapper: ElementType = animate ? Reveal : "div";
  const Row: ElementType = animate ? RevealLine : "div";

  return (
    <Wrapper className={cn("rounded-lg border border-line bg-surface", className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-xs text-fg-subtle">{label}</span>
        <SeverityBadge level={severity} />
      </div>
      <dl className="divide-y divide-line font-mono text-sm">
        {rows.map((r) => (
          <Row key={r.k}>
            <div className="grid grid-cols-[5.5rem_1fr] gap-3 px-4 py-3">
              <dt className="text-fg-subtle">{r.k}</dt>
              <dd className="text-fg">{r.v}</dd>
            </div>
          </Row>
        ))}
      </dl>
      {note ? (
        <p className="border-t border-line px-4 py-2.5 text-xs text-fg-subtle">{note}</p>
      ) : null}
    </Wrapper>
  );
}
