import Link from "next/link";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { Button } from "@/components/ui/button";
import { organizationLd, professionalServiceLd } from "@/lib/seo";
import { cves } from "@/lib/research";
import { nav } from "@/lib/site";

const pillars = nav.find((n) => n.children)?.children ?? [];

const stats = [
  { value: 4, suffix: "", label: "credited CVEs" },
  { value: 10, suffix: "+", label: "years in offensive security" },
  { value: 3, suffix: "", label: "regions: India, UAE, USA" },
  { value: 27, suffix: "", label: "Vyra probe categories" },
];

const trust = [
  { title: "Published CVEs", href: "/research", body: "Four credited vulnerabilities in Oracle and WSO2 products, each linked to the public record." },
  { title: "Vyra", href: "/product", body: "Our autonomous engine widens coverage. People drive exploitation and judgement." },
  { title: "Senior testers, every engagement", href: "/about", body: "A boutique team. The person who scopes your work is the person who does it." },
];

/* Illustrative, labelled. A real four-stage sequence, so the numbering is
   earned. No fabricated data, no reference imagery. */
const phases = [
  { id: "01", name: "recon", note: "Map the exposed surface" },
  { id: "02", name: "foothold", note: "Prove initial access" },
  { id: "03", name: "escalation", note: "Expand control" },
  { id: "04", name: "impact", note: "Demonstrate business risk" },
];

function AttackFigure() {
  return (
    <figure className="soft-shadow-lg overflow-hidden rounded-xl border border-line bg-card">
      <figcaption className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="text-xs text-fg-muted">
          <span className="font-semibold text-fg">Fig. 1</span> Illustrative attack path
        </span>
        <span aria-hidden className="size-2 rounded-[2px] bg-red" />
      </figcaption>
      <ol className="divide-y divide-line">
        {phases.map((p, i) => {
          const last = i === phases.length - 1;
          return (
            <li key={p.id} className="flex items-baseline gap-4 px-5 py-4">
              <span className={`font-mono text-sm tabular-nums ${last ? "text-red" : "text-fg-subtle"}`}>{p.id}</span>
              <span className="min-w-28 text-sm font-semibold text-fg">{p.name}</span>
              <span className="text-sm text-fg-muted">{p.note}</span>
              {last ? <span aria-hidden className="ml-auto h-px w-10 self-center bg-red" /> : null}
            </li>
          );
        })}
      </ol>
      <p className="border-t border-line px-5 py-3 text-xs text-fg-subtle">
        Illustrative. Real findings are specific to your systems and your risk.
      </p>
    </figure>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd(), professionalServiceLd()]} />

      {/* HERO: paper, warm wash, one authored settle entrance */}
      <section className="hero-wash grain-paper relative overflow-hidden border-b border-line">
        <Container className="relative z-10 py-20 md:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <h1 className="settle text-[2.6rem] font-extrabold leading-[1.03] text-fg sm:text-5xl md:text-[3.5rem]">
                Offensive security you can verify, not just trust.
              </h1>
              <p className="settle settle-2 mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                A boutique, practitioner-led firm for penetration testing, AI
                security, threat hunting and biometric testing. Every engagement
                runs on Vyra, our autonomous testing engine, and is driven by
                senior testers who prove the impact.
              </p>
              <div className="settle settle-3 mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button asChild size="lg">
                  <Link href="/contact?topic=consulting">Request a scoped quote</Link>
                </Button>
                <Link href="/services" className="text-sm font-semibold text-red underline-offset-4 hover:underline">
                  Explore services
                </Link>
              </div>
              <div className="settle settle-4 mt-10 border-t border-line pt-6">
                <p className="text-sm text-fg-muted">Verifiable research, four credited CVEs:</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cves.map((c) => (
                    <li key={c.id}>
                      <a
                        href={c.nvdUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md border border-line bg-card px-2.5 py-1 font-mono text-xs text-fg-muted transition-colors hover:border-red hover:text-fg"
                      >
                        {c.id}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link href="/research" className="inline-flex items-center px-1 py-1 text-xs font-medium text-red underline-offset-4 hover:underline">
                      All research
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="settle settle-3 lg:pl-4">
              <AttackFigure />
            </div>
          </div>
        </Container>
      </section>

      {/* STAT ROW: quiet band, typeset readout, no count-up */}
      <section className="border-b border-line bg-band-quiet">
        <Container className="py-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-line-strong pl-4">
                <dt className="font-mono text-2xl font-medium tabular-nums text-fg">
                  {s.value}
                  {s.suffix}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-fg-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* CREDIBILITY: paper, white cards */}
      <section className="border-b border-line">
        <Container className="py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Why teams trust us</h2>
            <p className="mt-3 text-base text-fg-muted">Proof before pitch. Follow any of it to the source.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {trust.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="soft-shadow group flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-colors hover:border-line-strong"
              >
                <h3 className="text-lg font-semibold text-fg">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t.body}</p>
                <span className="mt-5 text-sm font-semibold text-red group-hover:underline">Follow the proof</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ENTERPRISE: paper, two column */}
      <section className="border-b border-line">
        <Container className="py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-red">Enterprise consulting</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                Scoped engagements across every service line.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-fg-muted">
                Deep, bespoke work: penetration testing, AI and LLM red teaming,
                threat hunting, and biometric testing. We scope to your systems and
                your risk, prove the impact, and verify the fix on a retest.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/contact?topic=consulting">Request a scoped quote</Link>
                </Button>
              </div>
            </div>
            <ul className="border-t border-line">
              {pillars.map((p) => (
                <li key={p.href} className="border-b border-line">
                  <Link
                    href={p.href}
                    className="group flex flex-col gap-1 py-5 transition-colors sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="font-semibold text-fg group-hover:text-red sm:w-44 sm:shrink-0">{p.label}</span>
                    <span className="text-sm leading-snug text-fg-muted">{p.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* SECONDARY: paper, two cards */}
      <section className="border-b border-line">
        <Container className="py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="soft-shadow flex h-full flex-col rounded-xl border border-line bg-card p-7">
              <p className="text-sm font-semibold text-red">Startups and SMBs</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-fg">Fixed-scope packages</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                A clear outcome and a set turnaround, without a long scoping call.
                Web app pentest, cloud review, attack-surface assessment, AI review.
              </p>
              <div className="mt-5">
                <Button asChild size="sm" variant="outline"><Link href="/packages">See packages</Link></Button>
              </div>
            </div>
            <div className="soft-shadow flex h-full flex-col rounded-xl border border-line bg-card p-7">
              <p className="text-sm font-semibold text-red">Training</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-fg">The Academy</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Live, mentor-led cohorts taught by practitioners, for individuals
                and corporate teams, from AI red teaming to secure code review.
              </p>
              <div className="mt-5">
                <Button asChild size="sm" variant="outline"><Link href="/academy">Visit the Academy</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA: the one full-bleed confident band */}
      <section className="band-red">
        <Container className="py-20 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Start with a conversation</h2>
              <p className="mt-3 text-lg leading-relaxed text-white/85">
                Tell us what you are building and where it is exposed. We will
                take it from there.
              </p>
            </div>
            <div className="shrink-0">
              <Button
                asChild
                size="lg"
                className="bg-white text-[color:var(--band-red)] hover:bg-white/90"
              >
                <Link href="/contact?topic=consulting">Request a scoped quote</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
