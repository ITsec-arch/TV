import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { ResearchList } from "@/components/site/ResearchList";
import { Button } from "@/components/ui/button";
import { pageMetadata, organizationLd, professionalServiceLd } from "@/lib/seo";
import { writeups } from "@/lib/research";

const PATH = "/research";

export const metadata: Metadata = pageMetadata({
  title: "Research: published CVEs and technical write-ups",
  description:
    "Verifiable security research from ThreatVet: four credited CVEs in Oracle Fusion Middleware and WSO2 Identity Server, each linked to the vendor advisory and the NVD record.",
  path: PATH,
});

export default function ResearchPage() {
  return (
    <>
      <JsonLd data={[organizationLd(), professionalServiceLd()]} />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              Proof you can check yourself.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              We would rather show you verifiable work than a wall of logos. Below are
              credited CVEs, each linking to the vendor advisory and the public NVD
              record. Follow them and confirm the work is real.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Published CVEs</h2>
          <div className="mt-8 max-w-4xl">
            <ResearchList />
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Write-ups and tools</h2>
          {writeups.length === 0 ? (
            <p className="mt-4 max-w-2xl text-base text-fg-muted">
              Technical write-ups, tool documentation and talks will appear here.
              <span className="ml-2 font-mono text-sm text-fg-subtle">{"{{NEEDS_INPUT: research write-ups}}"}</span>
            </p>
          ) : (
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {writeups.map((w) => (
                <li key={w.slug} className="py-5">
                  <div className="text-sm font-medium text-fg">{w.title}</div>
                  <p className="mt-1 text-sm text-fg-muted">{w.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Want this rigour on your systems?</h2>
                <p className="mt-3 text-base text-fg-muted">
                  The same approach that finds vendor CVEs is what we bring to an
                  engagement. Tell us what you want tested.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="lg"><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
