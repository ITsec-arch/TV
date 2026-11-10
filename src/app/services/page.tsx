import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { Button } from "@/components/ui/button";
import { pageMetadata, professionalServiceLd } from "@/lib/seo";
import { nav } from "@/lib/site";

const PATH = "/services";

export const metadata: Metadata = pageMetadata({
  title: "Services: offensive security, AI security, threat hunting",
  description:
    "Penetration testing to OWASP and PTES, AI and LLM red teaming, threat hunting with detection engineering, and biometric PAD/IAD testing. Practitioner-led, with a retest on every engagement.",
  path: PATH,
});

const pillars = nav.find((n) => n.children)?.children ?? [];

const paths = [
  {
    title: "Enterprise consulting",
    body: "Deep, scoped engagements across our service lines. We scope the work and send a quote.",
    cta: { label: "Request a scoped quote", href: "/contact?topic=consulting" },
  },
  {
    title: "Startups and SMBs",
    body: "Fixed-scope packages with a clear outcome and a set turnaround. One-step enquiry.",
    cta: { label: "See packages", href: "/packages" },
  },
  {
    title: "Training",
    body: "Hands-on courses from the Academy, for individuals and corporate cohorts.",
    cta: { label: "Visit the Academy", href: "/academy" },
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={professionalServiceLd()} />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              Security, done by people who prove it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              Offensive, defensive and strategic security under one standard: find
              the real issue, prove the impact, and come back to check the fix.
              Every engagement is backed by verifiable research and run by senior
              testers.
            </p>
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Service lines</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {pillars.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-strong"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-fg group-hover:text-red-bright">{p.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.blurb}</p>
                  <span className="mt-4 text-sm text-red-bright">Read more</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Buyer paths */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How to engage us</h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">Three ways in, by what fits you.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {paths.map((p) => (
              <div key={p.title} className="flex h-full flex-col rounded-lg border border-line bg-surface p-6">
                <h3 className="text-lg font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
                <div className="mt-auto pt-5">
                  <Button asChild size="sm" variant="outline"><Link href={p.cta.href}>{p.cta.label}</Link></Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Not sure where to start?</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us the problem in plain terms. We will point you to the right
                  service, package, or course.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="lg"><Link href="/contact">Get in touch</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
