import { cn } from "@/lib/utils";

/**
 * A coverage grid (for example MITRE ATT&CK tactics). Qualitative: it shows
 * where we build hunt hypotheses and detections, not a fabricated percentage.
 */
export function CoverageMatrix({
  items,
  caption,
}: {
  items: { label: string; covered?: boolean }[];
  caption?: string;
}) {
  return (
    <div>
      {caption ? <p className="sr-only">{caption}</p> : null}
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2.5 bg-surface px-4 py-3">
            <span
              className={cn("dot shrink-0", it.covered === false ? "bg-fg-subtle/40" : "bg-red")}
              aria-hidden
            />
            <span className="text-sm text-fg">{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
