import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { InstrumentField } from "@/components/motion/InstrumentField";
import { Appear, AppearItem } from "@/components/motion/Appear";
import { Button } from "@/components/ui/button";
import { pageMetadata, serviceLd, professionalServiceLd } from "@/lib/seo";

const PATH = "/services/threat-intelligence";

export const metadata: Metadata = pageMetadata({
  title: "Threat intelligence",
  description:
    "AI-driven threat intelligence: global monitoring, threat-actor profiling, dark-web intelligence and predictive analytics, aggregated from 50+ sources into decisions you can act on.",
  path: PATH,
});

const stats = [
  { v: "100M+", l: "Threat indicators" },
  { v: "50+", l: "Data sources" },
  { v: "< 5 min", l: "Detection time" },
  { v: "99.8%", l: "Accuracy rate" },
];

const capabilities = [
  { name: "Global monitoring", body: "24/7 surveillance of threats across regions and industries." },
  { name: "Threat actor profiling", body: "Deep analysis of APT groups, their tools, techniques and procedures." },
  { name: "Dark web intelligence", body: "Underground monitoring for leaked credentials and attack chatter." },
  { name: "Predictive analytics", body: "Machine-learning forecasting of emerging risks and attack vectors." },
];

const sources = [
  { group: "Commercial feeds", items: ["Threat intel vendors", "Security research firms", "Vulnerability databases", "Malware repositories"] },
  { group: "Open source", items: ["Public CVE databases", "Security blogs and reports", "GitHub threat repos", "Community forums"] },
  { group: "Proprietary", items: ["ThreatVet honeypots", "Client telemetry", "Red team findings", "Incident response data"] },
];

const steps = [
  { n: "01", t: "Collection", b: "Aggregate data from 50+ sources across commercial, open and proprietary feeds." },
  { n: "02", t: "Enrichment", b: "Contextualise each signal with the data around it." },
  { n: "03", t: "Analysis", b: "Machine-learning pattern recognition and correlation." },
  { n: "04", t: "Prioritisation", b: "Risk-ranked threats mapped to your assets." },
  { n: "05", t: "Action", b: "Playbooks, alerts and detections your team can run." },
];

const why = [
  { t: "Real-time alerts", b: "Instant notification for critical threats relevant to your infrastructure." },
  { t: "Proactive defence", b: "Anticipate attacks before they happen with predictive modelling." },
  { t: "Targeted intelligence", b: "Industry- and asset-specific feeds tuned to your environment." },
];

export default function ThreatIntelligencePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Threat intelligence",
            serviceType: "Threat Intelligence",
            description:
              "AI-driven threat intelligence platform: global monitoring, threat-actor profiling, dark-web intelligence and predictive analytics.",
            path: PATH,
          }),
          professionalServiceLd(),
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <InstrumentField webgl={false} />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,var(--bg)_0%,color-mix(in_oklab,var(--bg)_74%,transparent)_44%,transparent_76%)]"
        />
        <Container className="relative z-10 py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-fg-subtle">
            <Link href="/services" className="hover:text-fg">Services</Link>
            <span aria-hidden>/</span>
            <span className="text-fg-muted">Threat intelligence</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
            Threat intelligence that drives decisions, not dashboards.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            An AI-driven platform that aggregates global data, analyses patterns,
            and turns it into intelligence tied to your risk: what to fix first,
            what to watch, and why it matters to the business.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button asChild size="lg" className="cta-rich"><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button>
            <Link href="#capabilities" className="text-sm font-medium text-fg hover:text-red-bright">What it covers</Link>
          </div>
        </Container>
      </section>

      {/* STAT BAND (platform figures) */}
      <section className="border-b border-line">
        <Container className="py-10 md:py-12">
          <dl className="glass edge-holo grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.l} className={`px-6 py-6 ${i % 2 === 1 ? "border-l border-line/60" : ""} ${i >= 2 ? "border-t border-line/60 sm:border-t-0" : ""} sm:border-l sm:first:border-l-0`}>
                <dt className="font-display text-3xl text-fg sm:text-4xl">{s.v}</dt>
                <dd className="mt-1 text-sm text-fg-muted">{s.l}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-fg-subtle">Platform figures. Ask us for the current, engagement-specific numbers.</p>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="scroll-mt-20 border-b border-line">
        <Container className="py-16 md:py-20">
          <Appear preset="up">
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Intelligence capabilities</h2>
            <p className="mt-4 max-w-2xl text-base text-fg-muted">Comprehensive threat monitoring and analysis.</p>
          </Appear>
          <Appear stagger={0.1} amount={0.2} className="mt-10 grid gap-5 sm:grid-cols-2">
            {capabilities.map((c) => (
              <AppearItem key={c.name} preset="up">
                <div className="glass edge-holo h-full rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-fg">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
                </div>
              </AppearItem>
            ))}
          </Appear>
        </Container>
      </section>

      {/* DATA SOURCES */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Data sources</h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">Aggregated from trusted security feeds, open data, and our own telemetry.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {sources.map((s) => (
              <div key={s.group} className="rounded-xl border border-line bg-surface p-6">
                <h3 className="text-sm font-semibold text-fg-subtle">{s.group}</h3>
                <ul className="mt-4 space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3 text-sm text-fg-muted">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-[1px] bg-red" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How our intelligence works</h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">From data collection to action.</p>
          <ol className="mt-8 border-t border-line">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 sm:gap-6">
                <span className="font-mono text-sm text-fg-subtle">{s.n}</span>
                <div>
                  <h3 className="font-medium text-fg">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* WHY */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Why ThreatVet intelligence</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {why.map((w) => (
              <div key={w.t}>
                <h3 className="text-sm font-semibold text-fg-subtle">{w.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{w.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Turn threat data into decisions</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us your sector and your crown jewels. We will tune the
                  intelligence to what actually threatens you.
                </p>
              </div>
              <div className="shrink-0"><Button asChild size="lg"><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button></div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
