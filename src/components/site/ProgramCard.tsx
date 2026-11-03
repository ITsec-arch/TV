import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Program } from "@/lib/courses";

/**
 * A program card. Cohort status is honest: every program is "forming" with a
 * waitlist CTA until a real cohort date is set. No fake dates or seat counts.
 */
export function ProgramCard({ program }: { program: Program }) {
  const href = `/academy/${program.slug}`;
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6">
      <div className="flex items-center gap-3">
        <span className="rounded border border-line px-2 py-0.5 text-xs text-fg-subtle">{program.level}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">
        <Link href={href} className="hover:text-red-bright">{program.title}</Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{program.promise}</p>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div>
          <dt className="text-fg-subtle">Duration</dt>
          <dd className="mt-0.5 text-fg">{program.durationWeeks}</dd>
        </div>
        <div>
          <dt className="text-fg-subtle">Delivery</dt>
          <dd className="mt-0.5 text-fg">{program.liveHours}, {program.labHours}</dd>
        </div>
        <div>
          <dt className="text-fg-subtle">Format</dt>
          <dd className="mt-0.5 text-fg">{program.format}</dd>
        </div>
        <div>
          <dt className="text-fg-subtle">Language</dt>
          <dd className="mt-0.5 text-fg">{program.language}</dd>
        </div>
      </dl>

      <div className="mt-auto border-t border-line pt-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-fg-subtle">Program fee</div>
            <div className="font-mono text-sm text-fg">{program.feeMarker}</div>
          </div>
          <div className="flex items-center gap-2 text-xs text-fg-muted">
            <span className="size-1.5 rounded-full bg-red/55" aria-hidden />
            Next cohort forming
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button asChild size="sm">
            <Link href="/contact?topic=academy">Join the waitlist</Link>
          </Button>
          <Link href={href} className="text-sm text-fg hover:text-red-bright">Program details</Link>
        </div>
      </div>
    </article>
  );
}
