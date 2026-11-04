import Link from "next/link";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { InstrumentField } from "@/components/motion/InstrumentField";
import { AttackPathGraph } from "@/components/motion/AttackPathGraph";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { Appear, AppearItem } from "@/components/motion/Appear";
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd(), professionalServiceLd()]} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <InstrumentField />
        {/* ink scrim keeps the headline column AA over the field */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,var(--bg)_0%,color-mix(in_oklab,var(--bg)_74%,transparent)_42%,transparent_74%)]"
        />
        <Container className="relative z-10 py-20 md:py-28 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="rise">
                <span className="glass inline-flex items-center gap-2 rounded-full border-line/80 px-3 py-1 text-xs text-fg-muted">
                  <span aria-hidden className="size-1.5 rounded-full bg-red" />
                  Practitioner-led offensive security
                </span>
              </div>
              <h1 className="rise rise-2 mt-5 text-[2.55rem] leading-[1.02] text-fg sm:text-5xl md:text-6xl">
                Offensive security you can verify, not just trust.
              </h1>
              <p className="rise rise-3 mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                A boutique, practitioner-led firm for penetration testing, AI
                security, threat hunting and biometric testing. Every engagement
                runs on Vyra, our autonomous testing engine, and is driven by
                senior testers who prove the impact.
              </p>
              <div className="rise rise-4 mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button asChild size="lg" className="cta-rich">
                  <Link href="/contact?topic=consulting">Request a scoped quote</Link>
                </Button>
                <Link href="/services" className="text-sm font-medium text-fg hover:text-red-bright">Explore services</Link>
              </div>
              <div className="rise rise-4 mt-8 border-t border-line/70 pt-6">
                <p className="text-sm text-fg-subtle">Verifiable research, four credited CVEs:</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cves.map((c) => (
                    <li key={c.id}>
                      <a
                        href={c.nvdUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded border border-line bg-surface/70 px-2.5 py-1 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
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

            <Parallax amount={20} className="lg:pl-4">
              <AttackPathGraph />
            </Parallax>
          </div>
        </Container>
      </section>

      {/* STAT BAND: instrument readout */}
      <section className="border-b border-line">
        <Container className="py-10 md:py-12">
          <dl className="glass edge-holo grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`px-6 py-6 ${i % 2 === 1 ? "border-l border-line/60" : ""} ${i >= 2 ? "border-t border-line/60 sm:border-t-0" : ""} sm:border-l sm:first:border-l-0`}>
                <dt className="font-display text-3xl text-fg sm:text-4xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dt>
                <dd className="mt-1 text-sm text-fg-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* CREDIBILITY */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <Appear preset="up">
            <h2 className="text-2xl tracking-tight text-fg sm:text-3xl">Why teams trust us</h2>
            <p className="mt-3 max-w-2xl text-base text-fg-muted">Proof before pitch. Follow any of it to the source.</p>
          </Appear>
          <Appear stagger={0.12} amount={0.25} className="mt-10 grid gap-6 md:grid-cols-3">
            {trust.map((t) => (
              <AppearItem key={t.title} preset="scale">
                <Link href={t.href} className="card-rich glass edge-holo flex h-full flex-col rounded-xl p-6">
                  <h3 className="text-fg">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t.body}</p>
                  <span className="mt-4 text-sm text-red-bright">Follow the proof</span>
                </Link>
              </AppearItem>
            ))}
          </Appear>
        </Container>
      </section>

      {/* ENTERPRISE: plain panels, for hierarchy against the glass cards */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Appear preset="left" className="max-w-xl">
              <p className="text-sm font-medium text-red">Enterprise consulting</p>
              <h2 className="mt-3 text-2xl tracking-tight text-fg sm:text-3xl">
                Scoped engagements across every service line.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-fg-muted">
                Deep, bespoke work: penetration testing, AI and LLM red teaming,
                threat hunting, and biometric testing. We scope to your systems and
                your risk, prove the impact, and verify the fix on a retest.
              </p>
              <div className="mt-6">
                <Button asChild className="cta-rich"><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button>
              </div>
            </Appear>
            <Appear stagger={0.1} amount={0.25} className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p) => (
                <AppearItem key={p.href} preset="up">
                  <Link href={p.href} className="card-rich block h-full rounded-lg border border-line bg-surface p-5">
                    <div className="text-sm font-medium text-fg">{p.label}</div>
                    <div className="mt-1 text-xs leading-snug text-fg-muted">{p.blurb}</div>
                  </Link>
                </AppearItem>
              ))}
            </Appear>
          </div>
        </Container>
      </section>

      {/* SECONDARY */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <Appear stagger={0.1} className="grid gap-6 md:grid-cols-2">
            <AppearItem preset="fade">
              <div className="card-rich glass edge-holo flex h-full flex-col rounded-xl p-7">
                <p className="text-xs font-medium text-fg-subtle">Startups and SMBs</p>
                <h3 className="mt-2 text-xl tracking-tight text-fg">Fixed-scope packages</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  A clear outcome and a set turnaround, without a long scoping call.
                  Web app pentest, cloud review, attack-surface assessment, AI review.
                </p>
                <div className="mt-5"><Button asChild size="sm" variant="outline"><Link href="/packages">See packages</Link></Button></div>
              </div>
            </AppearItem>
            <AppearItem preset="fade">
              <div className="card-rich glass edge-holo flex h-full flex-col rounded-xl p-7">
                <p className="text-xs font-medium text-fg-subtle">Training</p>
                <h3 className="mt-2 text-xl tracking-tight text-fg">The Academy</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  Live, mentor-led cohorts taught by practitioners, for individuals
                  and corporate teams, from AI red teaming to secure code review.
                </p>
                <div className="mt-5"><Button asChild size="sm" variant="outline"><Link href="/academy">Visit the Academy</Link></Button></div>
              </div>
            </AppearItem>
          </Appear>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-16 md:py-24">
          <Appear preset="scale">
            <div className="glass edge-holo relative overflow-hidden rounded-2xl p-8 md:p-12">
              <div className="volume-glow breathe" style={{ top: "-45%", right: "-8%", width: "26rem", height: "26rem" }} aria-hidden />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-2xl tracking-tight text-fg sm:text-3xl">Start with a conversation</h2>
                  <p className="mt-3 text-base text-fg-muted">
                    Tell us what you are building and where it is exposed. We will
                    take it from there.
                  </p>
                </div>
                <div className="shrink-0">
                  <Button asChild size="lg" className="cta-rich"><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button>
                </div>
              </div>
            </div>
          </Appear>
        </Container>
      </section>
    </>
  );
}
