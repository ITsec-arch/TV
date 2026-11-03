import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { PackageCard, type Package } from "@/components/site/PackageCard";
import { Button } from "@/components/ui/button";
import { pageMetadata, professionalServiceLd } from "@/lib/seo";

const PATH = "/packages";

export const metadata: Metadata = pageMetadata({
  title: "Fixed-scope security packages for startups and SMBs",
  description:
    "Clear, fixed-scope security testing for startups and smaller teams: web app pentest, cloud config review, external attack-surface assessment and AI/LLM security review. Fixed scope, set turnaround, one-step enquiry.",
  path: PATH,
});

const packages: Package[] = [
  {
    key: "pkg-web-app-pentest",
    name: "Web app pentest",
    scope: "One web application and its API, with up to two roles, tested to OWASP WSTG.",
    deliverable: "Reproducible findings with severity, fixes, and a free retest.",
    turnaround: "Typically one to two weeks",
  },
  {
    key: "pkg-cloud-config-review",
    name: "Cloud config review",
    scope: "One cloud account or subscription: identity, network, storage and logging.",
    deliverable: "Prioritised misconfigurations mapped to a hardening checklist.",
    turnaround: "Typically one week",
  },
  {
    key: "pkg-external-attack-surface",
    name: "External attack-surface assessment",
    scope: "Everything you expose to the internet: domains, hosts, services and leaks.",
    deliverable: "A ranked map of your external surface and the risks on it.",
    turnaround: "Typically one week",
  },
  {
    key: "pkg-ai-llm-review",
    name: "AI / LLM security review",
    scope: "One LLM feature or agent: prompt injection, tool abuse and data exposure.",
    deliverable: "Findings mapped to the OWASP LLM Top 10, with fixes.",
    turnaround: "Typically one to two weeks",
  },
];

export default function PackagesPage() {
  return (
    <>
      <JsonLd data={professionalServiceLd()} />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              Security testing with a fixed scope and a fixed price.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              Built for startups and smaller teams who want a clear outcome without a
              drawn-out scoping call. Pick the package that fits, send one enquiry,
              and we confirm timing and price. Larger or less standard work goes
              through enterprise consulting instead.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/contact?topic=packages">Enquire about a package</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/services">See full services</Link></Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2">
            {packages.map((p) => (
              <PackageCard key={p.name} pkg={p} ctaLabel="Enquire" />
            ))}
          </div>
          <p className="mt-6 text-sm text-fg-subtle">
            Prices are shown once confirmed. Every package is fixed-scope, so you know
            what you are buying before you commit.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Not sure which fits?</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us what you are building in a sentence or two. We will point you
                  to the right package, or to consulting if that suits you better.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="lg"><Link href="/contact?topic=packages">Send a quick enquiry</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
