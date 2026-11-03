import { cn } from "@/lib/utils";

export type Phase = { id: string; title: string; body?: string; branch?: boolean };

/**
 * Vertical phase flow drawn with inline SVG (connectors + nodes), labels in
 * HTML for accessibility. No raster image. The spine uses the element's own
 * pixel coordinates with percentage line endpoints, so nodes never distort.
 * `branch: true` renders a hollow sub-phase node (e.g. pt-05b).
 */
export function PhaseFlow({ phases }: { phases: Phase[] }) {
  return (
    <ol className="w-full">
      {phases.map((p, i) => {
        const first = i === 0;
        const last = i === phases.length - 1;
        return (
          <li key={p.id} className="grid grid-cols-[2.25rem_1fr] gap-4">
            <svg className="h-full w-9" aria-hidden focusable="false">
              {!first && (
                <line x1="18" y1="0" x2="18" y2="16" stroke="var(--line-strong)" strokeWidth="1.5" />
              )}
              {!last && (
                <line x1="18" y1="16" x2="18" y2="100%" stroke="var(--line-strong)" strokeWidth="1.5" />
              )}
              <circle
                cx="18"
                cy="16"
                r={p.branch ? 4 : 5}
                fill={p.branch ? "var(--bg)" : "var(--red)"}
                stroke={p.branch ? "var(--red)" : "none"}
                strokeWidth="1.5"
              />
            </svg>
            <div className={cn("min-w-0 pb-8", p.branch && "opacity-95")}>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-xs text-red">{p.id}</span>
                <h3 className="font-medium text-fg">{p.title}</h3>
              </div>
              {p.body ? <p className="mt-1 text-sm leading-relaxed text-fg-muted">{p.body}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
