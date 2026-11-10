import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { Button } from "@/components/ui/button";
import { pageMetadata, organizationLd, professionalServiceLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { resolveGff } from "@/lib/pending";

const PATH = "/about";

export const metadata: Metadata = pageMetadata({
  title: "About ThreatVet",
  description:
    "ThreatVet is a boutique, practitioner-led offensive security and threat intelligence firm. Senior testers on every engagement, verifiable research, and offices in Chennai, the UAE and the USA.",
  path: PATH,
});

const principles = [
  { title: "Senior testers, every time", body: "A small team by design. The person who scopes your work is the person who does it. No handoff to juniors." },
  { title: "Proof over claims", body: "We would rather show you a credited CVE than a wall of client logos. If we say we found something, you can reproduce it." },
  { title: "Honest about automation", body: "Our engine widens coverage. People drive exploitation and judgement. We never pretend a tool replaces a tester." },
  { title: "Plain reports", body: "Findings a developer can act on: what, where, why it matters, and how to fix it." },
];

const experience = [
  { k: "10+ years", v: "in offensive security" },
  { k: "~9 years", v: "building software before that" },
  { k: "3 years", v: "in Gulf government cybersecurity" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[organizationLd(), professionalServiceLd()]} />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              A boutique offensive security practice, led by practitioners.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              ThreatVet is small on purpose. We take the work we can do well, we do it
              ourselves, and we stand behind it with research you can verify. We say
              what we are, a boutique team of senior testers, and we do not dress it
              up as something larger.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How we work</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="bg-surface p-6">
                <h3 className="font-medium text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_0.8fr]">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Background</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                The practice is built on a decade of offensive security, on top of
                years spent writing production software and years inside government
                cybersecurity. That mix is the point: we read the codebase, not just
                the responses, and we understand the organisations that have to live
                with the fixes.
              </p>
              <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                {experience.map((e) => (
                  <div key={e.k}>
                    <dt className="text-2xl font-semibold text-fg">{e.k}</dt>
                    <dd className="mt-1 text-sm text-fg-muted">{e.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-fg-subtle">Certifications</h3>
                <ul className="mt-3 space-y-2 text-sm text-fg-muted">
                  <li className="text-fg">OSCP+ <span className="text-fg-subtle">(certified 14 Sep 2026)</span></li>
                  <li className="text-fg">CPENT</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-fg-subtle">Recognition</h3>
                <ul className="mt-3 space-y-1 text-sm text-fg-muted">
                  <li>GFF 2026 {resolveGff()}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-fg-subtle">Verifiable work</h3>
                <p className="mt-3 text-sm text-fg-muted">
                  Four credited CVEs.{" "}
                  <Link href="/research" className="text-red-bright underline-offset-4 hover:underline">See the research</Link>.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Where we are</h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {site.locations.map((l) => (
              <li key={l.city} className="bg-surface p-6">
                <div className="text-fg">{l.city}</div>
                {l.note ? <div className="mt-1 text-sm text-fg-subtle">{l.note}</div> : null}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Work with us</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Enterprise consulting, fixed-scope packages, or training. Tell us
                  what you need.
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
