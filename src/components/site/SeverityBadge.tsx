import { cn } from "@/lib/utils";

export type Severity = "Critical" | "High" | "Medium" | "Low" | "Info";

// One accent only: red carries severity by intensity, never a rainbow.
// The text label is always present, so colour is never the sole signal.
const dotClass: Record<Severity, string> = {
  Critical: "bg-red",
  High: "bg-red",
  Medium: "bg-red/55",
  Low: "bg-fg-subtle",
  Info: "bg-fg-subtle",
};

export function SeverityBadge({ level, className }: { level: Severity; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-xs text-fg-muted", className)}>
      <span className={cn("dot", dotClass[level])} aria-hidden />
      severity: {level}
    </span>
  );
}
