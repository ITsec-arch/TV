import { cn } from "@/lib/utils";

/**
 * Brand wordmark: the real ThreatVet logo (transparent PNG, white with the red
 * accent on the final T). `full` includes the tagline, for the footer. Height
 * is set by the caller via className.
 */
export function Wordmark({ className, full }: { className?: string; full?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static brand logo, not content imagery
    <img
      src={full ? "/logo-full.png" : "/logo-mark.png"}
      alt="ThreatVet"
      className={cn("w-auto select-none", className)}
    />
  );
}
