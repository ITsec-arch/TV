import Link from "next/link";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { Reveal, RevealLine } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { organizationLd, professionalServiceLd } from "@/lib/seo";
import { cves } from "@/lib/research";
import { nav } from "@/lib/site";

const pillars = nav.find((n) => n.children)?.children ?? [];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd(), professionalServiceLd()]} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.03] tracking-tight text-fg sm:text-5xl md:text-6xl">
                Offensive security you can verify, not just trust.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                A boutique, practitioner-led firm for penetration testing, AI
                security, threat hunting and biometric testing. Every engagement runs
                on Vyra, our autonomous testing engine, and is driven by senior
                testers who prove the impact.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button asChild size="lg"><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button>
                <Link href="/services" className="text-sm font-medium text-fg hover:text-red-bright">Explore services</Link>
              </div>
              <div className="mt-10 border-t border-line pt-6">
                <p className="text-sm text-fg-subtle">Verifiable research, four credited CVEs:</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cves.map((c) => (
                    <li key={c.id}>
                      <a
                        href={c.nvdUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded border border-line bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                      >
                        {c.id}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link href="/research" className="inline-flex items-center px-1 py-1 text-xs text-red-bright underline-offset-4 hover:underline">All research</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Credibility layer, the trust anchor (one orchestrated reveal) */}
            <Reveal className="rounded-lg border border-line bg-surface">
              <div className="border-b border-line px-5 py-3">
                <span className="font-mono text-xs text-fg-subtle">why trust us</span>
              </div>
              <dl className="divide-y divide-line">
                <RevealLine>
                  <Link href="/research" className="block px-5 py-4 hover:bg-surface-2">
                    <dt className="text-sm font-medium text-fg">Published CVEs</dt>
                    <dd className="mt-1 text-sm text-fg-muted">Four credited vulnerabilities in Oracle and WSO2 products, linked to the public records.</dd>
                  </Link>
                </RevealLine>
                <RevealLine>
                  <Link href="/product" className="block px-5 py-4 hover:bg-surface-2">
                    <dt className="text-sm font-medium text-fg">Vyra</dt>
                    <dd className="mt-1 text-sm text-fg-muted">Our autonomous engine widens coverage. People drive exploitation and judgement.</dd>
                  </Link>
                </RevealLine>
                <RevealLine>
                  <div className="px-5 py-4">
                    <dt className="text-sm font-medium text-fg">Senior testers, every engagement</dt>
                    <dd className="mt-1 text-sm text-fg-muted">A boutique team. The person who scopes your work is the person who does it.</dd>
                  </div>
                </RevealLine>
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ENTERPRISE (primary path) */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="max-w-xl">
              <p className="text-xs font-semibold text-red">Enterprise consulting</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Scoped engagements across every service line.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-fg-muted">
                Deep, bespoke work: penetration testing, AI and LLM red teaming,
                threat hunting, and biometric testing. We scope to your systems and
                your risk, prove the impact, and verify the fix on a retest.
              </p>
              <div className="mt-6">
                <Button asChild><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="group block rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong">
                    <div className="text-sm font-medium text-fg group-hover:text-red-bright">{p.label}</div>
                    <div className="mt-1 text-xs leading-snug text-fg-muted">{p.blurb}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* SECONDARY PATHS: packages + academy */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-lg border border-line bg-surface p-7">
              <p className="text-xs font-semibold text-fg-subtle">Startups and SMBs</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">Fixed-scope packages</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                A clear outcome and a set turnaround, without a long scoping call.
                Web app pentest, cloud review, attack-surface assessment, AI review.
              </p>
              <div className="mt-5">
                <Button asChild size="sm" variant="outline"><Link href="/packages">See packages</Link></Button>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border border-line bg-surface p-7">
              <p className="text-xs font-semibold text-fg-subtle">Training</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">The Academy</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Hands-on courses taught by practitioners, for individuals and for
                corporate cohorts, from AI red teaming to secure code review.
              </p>
              <div className="mt-5">
                <Button asChild size="sm" variant="outline"><Link href="/academy">Visit the Academy</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Start with a conversation</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us what you are building and where it is exposed. We will take
                  it from there.
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
