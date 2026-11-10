import Link from "next/link";
import { SeverityBadge } from "@/components/site/SeverityBadge";
import { BrandLogo } from "@/components/site/BrandLogo";
import { FindingsMarquee } from "@/components/site/FindingsMarquee";
import { cves } from "@/lib/research";
import { vyraFindings, hackerOneProfile } from "@/lib/field";

/**
 * The named "Vyra in the field" proof: a spotlight row for the Critical
 * findings, a rolling roster of every reported program, and (full variant) the
 * separate, publicly verifiable CVE record. Honesty stays intact: report IDs
 * are shown as filed, nothing is linked unless publicly disclosed, and the
 * non-endorsement line makes clear a reported finding is not a partnership.
 */
const criticals = vyraFindings.filter((f) => f.highlight);

export function FieldShowcase({ variant = "full" }: { variant?: "full" | "home" }) {
  return (
    <div className="space-y-8">
      {criticals.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {criticals.map((f) => (
            <div key={f.org} className="glass edge-holo relative overflow-hidden rounded-xl p-5">
              <div className="volume-glow" style={{ top: "-60%", right: "-20%", width: "16rem", height: "16rem" }} aria-hidden />
              <div className="relative flex items-center justify-between gap-3">
                <BrandLogo org={f.org} slug={f.logo} size="lg" />
                <SeverityBadge level={f.severity} />
              </div>
              <div className="relative mt-5 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-accent-cool">via Vyra</span>
                {f.ref ? <span className="font-mono text-xs text-fg-subtle">{f.ref}</span> : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <FindingsMarquee />

      {variant === "full" ? (
        <div className="rounded-xl border border-line bg-surface p-6">
          <h3 className="text-sm font-semibold text-fg-subtle">Publicly verifiable</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
            Separately from the field reports above, our four credited CVEs in
            Oracle and WSO2 products are from 2020 manual research, each linked to
            the public record.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {cves.map((c) => (
              <li key={c.id}>
                <a
                  href={c.nvdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded border border-line bg-bg px-2.5 py-1 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {c.id}
                </a>
              </li>
            ))}
          </ul>
          {hackerOneProfile ? (
            <a
              href={hackerOneProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-medium text-red-bright underline-offset-4 hover:underline"
            >
              HackerOne profile
            </a>
          ) : null}
        </div>
      ) : null}

      <p className="max-w-3xl text-xs leading-relaxed text-fg-subtle">
        Findings Vyra surfaced in authorized bug-bounty and coordinated-disclosure
        programs; report identifiers are shown as filed, and most remain under
        program disclosure terms. Program names and marks belong to their owners;
        a reported finding does not imply affiliation with or endorsement by these
        organizations.
      </p>

      {variant === "home" ? (
        <Link
          href="/services/ai-security"
          className="inline-flex text-sm font-medium text-red-bright underline-offset-4 hover:underline"
        >
          How we run an AI security engagement
        </Link>
      ) : null}
    </div>
  );
}
