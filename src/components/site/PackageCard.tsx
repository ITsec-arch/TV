import Link from "next/link";
import { Button } from "@/components/ui/button";

export type Package = {
  name: string;
  scope: string;
  deliverable: string;
  turnaround: string;
  priceMarker: string;
};

export function PackageCard({
  pkg,
  ctaHref = "/contact?topic=packages",
  ctaLabel = "Enquire",
}: {
  pkg: Package;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-6">
      <h3 className="text-lg font-semibold tracking-tight text-fg">{pkg.name}</h3>
      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="text-xs font-semibold text-fg-subtle">Scope</dt>
          <dd className="mt-1 text-fg-muted">{pkg.scope}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-fg-subtle">Deliverable</dt>
          <dd className="mt-1 text-fg-muted">{pkg.deliverable}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-fg-subtle">Turnaround</dt>
          <dd className="mt-1 text-fg-muted">{pkg.turnaround}</dd>
        </div>
      </dl>
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
        <div>
          <div className="text-xs text-fg-subtle">From</div>
          <div className="font-mono text-sm text-fg">{pkg.priceMarker}</div>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
