import { cn } from "@/lib/utils";

/**
 * Text wordmark. The red square is the brand's single "signal" mark — the same
 * red used to annotate findings. Replaces the old gradient logo image.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight text-fg", className)}>
      ThreatVet
      <span aria-hidden className="size-2 rounded-[2px] bg-red" />
    </span>
  );
}
