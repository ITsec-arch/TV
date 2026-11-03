import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { PhaseFlow, type Phase } from "@/components/site/PhaseFlow";
import { ProbeMatrix } from "@/components/site/ProbeMatrix";
import { HeroBackdrop } from "@/components/motion/HeroBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { Appear } from "@/components/motion/Appear";
import { Button } from "@/components/ui/button";
import { pageMetadata, softwareApplicationLd } from "@/lib/seo";

const PATH = "/product";

export const metadata: Metadata = pageMetadata({
  title: "Vyra: our autonomous offensive-testing engine",
  description:
    "Vyra orchestrates an eleven-phase testing pipeline across 27 probe categories to widen coverage and consistency on every engagement. Automation plus a human operator. It does not replace manual testing.",
  path: PATH,
});

const phases: Phase[] = [
  { id: "pt-00", title: "Scope intake", body: "Load the agreed scope, limits and targets. Nothing runs outside it." },
  { id: "pt-01", title: "Recon and asset discovery", body: "Enumerate the reachable surface from the scoped entry points." },
  { id: "pt-02", title: "Surface mapping", body: "Map endpoints, parameters, auth flows and dependencies." },
  { id: "pt-03", title: "Fingerprinting", body: "Identify stacks, frameworks and versions to focus the probes." },
  { id: "pt-04", title: "Automated probing", body: "Run the probe categories broadly for coverage and consistency." },
  { id: "pt-05", title: "Vulnerability analysis", body: "Correlate signals into candidate findings and rank by likely impact." },
  { id: "pt-05b", title: "Exploit validation", body: "A validation branch that safely confirms a candidate before it is trusted.", branch: true },
  { id: "pt-06", title: "Human-led exploitation", body: "A senior operator takes over for chaining, bypasses and judgement calls." },
  { id: "pt-07", title: "Post-exploitation and impact", body: "Establish what the access is actually worth, within scope." },
  { id: "pt-08", title: "Evidence collection", body: "Capture reproducible evidence for every confirmed finding." },
  { id: "pt-09", title: "Reporting", body: "Assemble the report in the formats your team needs." },
];

const probes = [
  "Recon", "Subdomain enumeration", "Port and service", "TLS and certificates",
  "HTTP security headers", "Authentication", "Session management", "Access control",
  "SQL injection", "NoSQL injection", "Command injection", "Template injection",
  "Cross-site scripting", "SSRF", "XXE", "Insecure deserialisation",
  "File upload", "Path traversal", "Open redirect", "CORS",
  "CSRF", "Rate limiting and abuse", "Secrets exposure", "API and GraphQL",
  "LLM and prompt injection", "Cloud and container misconfig", "Business logic",
];

const specs = [
  { value: 11, suffix: "", label: "phases, pt-00 to pt-09" },
  { value: 27, suffix: "", label: "probe categories" },
  { value: 3, suffix: "", label: "report formats" },
];

export default function ProductPage() {
  return (
    <>
      <JsonLd
        data={softwareApplicationLd({
          name: "Vyra",
          description:
            "Autonomous offensive-testing engine: an eleven-phase pipeline across 27 probe categories that widens coverage and consistency on an engagement, operated by a human tester.",
          path: PATH,
        })}
      />

      {/* HERO */}
      <section className="grain relative overflow-hidden border-b border-line">
        <HeroBackdrop />
        <Container className="relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="rise flex items-center gap-2 text-sm text-fg-subtle">
              <span className="font-mono text-red">vyra</span>
              <span aria-hidden>/</span>
              <span>the engine behind our engagements</span>
            </div>
            <div className="rise rise-2">
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
                Our autonomous offensive-testing engine.
              </h1>
            </div>
            <div className="rise rise-3">
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
                Vyra runs a disciplined, repeatable pipeline across the attack surface,
                so coverage does not depend on which day of the week a tester got to
                your target. A human operator drives exploitation and judgement. Vyra
                does not replace manual testing. It makes the manual testing count.
              </p>
            </div>
            <div className="rise rise-4">
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                {specs.map((s) => (
                  <div key={s.label}>
                    <dt className="text-3xl font-semibold text-fg">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-0.5 text-sm text-fg-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <Button asChild size="lg" className="cta-rich"><Link href="/contact?topic=consulting">Put Vyra on your engagement</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HONEST FRAMING */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <Appear preset="left">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">What Vyra is</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                An orchestration engine that runs the broad, repeatable parts of an
                assessment: discovery, mapping, and probing across a wide set of
                categories. It gives every engagement the same floor of coverage,
                and it flags candidates for a human to confirm and exploit.
              </p>
            </Appear>
            <Appear preset="up">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">What it is not</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                It is not a replacement for a tester. Automation is good at breadth
                and bad at judgement, chaining and business logic. Those stay with a
                senior operator. We are explicit about this because the opposite
                claim is how automated testing earns its bad name.
              </p>
            </Appear>
          </div>
        </Container>
      </section>

      {/* PHASE FLOW */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <Appear preset="up">
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">The pipeline</h2>
            <p className="mt-4 max-w-2xl text-base text-fg-muted">
              Eleven phases from scope to report. Phase pt-05b is a validation branch:
              a candidate is confirmed before it is ever trusted or exploited.
            </p>
          </Appear>
          <div className="mt-10 max-w-2xl">
            <PhaseFlow phases={phases} />
          </div>
        </Container>
      </section>

      {/* PROBE CATEGORIES */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <Appear preset="up">
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Probe categories</h2>
            <p className="mt-4 max-w-2xl text-base text-fg-muted">
              The 27 categories Vyra covers on a web and API engagement.
            </p>
          </Appear>
          <div className="mt-10">
            <ProbeMatrix probes={probes} />
          </div>
        </Container>
      </section>

      {/* HOW IT FITS + ROADMAP */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <Appear preset="left">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How it fits your stack</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                Vyra orchestrates proven tools, including browser automation and an
                intercepting proxy, through a single control layer, and it produces
                one coherent result. You receive the report in the format you work
                in.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {["PDF", "HTML", "JSON"].map((f) => (
                  <li key={f} className="rounded border border-line bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted">{f}</li>
                ))}
              </ul>
            </Appear>
            <Appear preset="up">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Where it is going</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                The direction is continuous: recurring runs that watch a surface over
                time, so a new exposure is caught when it appears rather than at the
                next annual test. Human-led exploitation stays part of the loop.
              </p>
            </Appear>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-16 md:py-24">
          <Appear preset="scale">
            <div className="relative overflow-hidden rounded-lg border border-line bg-surface p-8 md:p-12">
              <div className="glow-drift pointer-events-none" style={{ top: "-40%", right: "-10%", width: "26rem", height: "26rem", opacity: 0.12 }} aria-hidden />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">See Vyra on your next engagement</h2>
                  <p className="mt-3 text-base text-fg-muted">
                    Vyra ships as part of our testing, not as a box to run yourself.
                    Scope an engagement and it does the heavy lifting underneath.
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
