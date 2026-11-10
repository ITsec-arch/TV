import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { InstrumentField } from "@/components/motion/InstrumentField";
import { AgentLoop } from "@/components/motion/AgentLoop";
import { FieldShowcase } from "@/components/site/FieldShowcase";
import { Appear, AppearItem } from "@/components/motion/Appear";
import { Button } from "@/components/ui/button";
import { pageMetadata, serviceLd, professionalServiceLd } from "@/lib/seo";

const PATH = "/agents";

export const metadata: Metadata = pageMetadata({
  title: "AI Agents: Agent-as-a-Service",
  description:
    "We design, build and run autonomous AI agents for real use cases, with a human on the decisions that matter. Our flagship agent, Vyra, finds Critical vulnerabilities in production systems.",
  path: PATH,
});

const builds = [
  {
    title: "Security and red-team agents",
    body: "Autonomous testing across web, API, cloud and AI systems. Vyra is the one we run; we can build one scoped to your stack.",
    proven: true,
  },
  {
    title: "AI red-team agents",
    body: "Agents that attack your LLM and agentic stack: prompt injection, tool and agent abuse, data exfiltration, mapped to the OWASP LLM Top 10 and MITRE ATLAS.",
  },
  {
    title: "Recon and intelligence agents",
    body: "Continuous discovery and monitoring of an external attack surface, so a new exposure is caught when it appears rather than at the next annual test.",
  },
  {
    title: "Custom domain agents",
    body: "A workflow that needs judgement at machine speed? Bring the use case. We design the loop, wire the tools, and set the guardrails.",
  },
];

const steps = [
  { n: "01", title: "Scope the use case and the guardrails", body: "What the agent may touch, what it must never do, and what a good outcome looks like. Limits first." },
  { n: "02", title: "Build the loop on proven tools", body: "Browser automation, intercepting proxies, your own APIs, orchestrated through one control layer." },
  { n: "03", title: "Autonomy where it is safe", body: "The agent runs the broad, repeatable work. A human stays on the decisions that carry risk." },
  { n: "04", title: "Verify every action", body: "Nothing is trusted on the agent's word. We prove the outcome, the way we prove a finding." },
  { n: "05", title: "Run, measure, improve", body: "We operate it, watch it, and tighten the loop as the surface and the use case change." },
];

const why = [
  { title: "We run our own agent in production", body: "Vyra is not a slide. It tests real systems on real engagements and has surfaced Critical findings. We build agents because we operate one." },
  { title: "Practitioner-led engineering", body: "Ten-plus years in offensive security, preceded by years building software. The people who scope your agent can read the codebase it runs against." },
  { title: "Honest about autonomy", body: "Automation is good at breadth and bad at judgement. We say so, and we keep a human on the calls that matter. That is the whole design." },
];

export default function AgentsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Agent-as-a-Service",
            serviceType: "AI Agent Development",
            description:
              "We design, build and operate autonomous AI agents for real use cases, with human oversight. Flagship agent: Vyra, an autonomous offensive-testing engine.",
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
        <Container className="relative z-10 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="wipe">
                <span className="glass inline-flex items-center gap-2 rounded-full border-line/80 px-3 py-1 text-xs text-fg-muted">
                  <span aria-hidden className="size-1.5 rounded-full bg-red" />
                  Agent-as-a-Service
                </span>
              </div>
              <h1 className="kinetic mt-5 text-[2.5rem] font-semibold leading-[1.03] tracking-tight text-fg sm:text-5xl md:text-6xl">
                We build autonomous AI agents that do the work.
              </h1>
              <p className="wipe wipe-3 mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                We design, build and run AI agents for real use cases, with a human
                on the decisions that matter. Our flagship agent, Vyra, finds
                Critical vulnerabilities in production systems. We bring the same
                engineering to yours.
              </p>
              <div className="wipe wipe-4 mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button asChild size="lg" className="cta-rich">
                  <Link href="/contact?topic=consulting">Tell us your use case</Link>
                </Button>
                <Link href="/product" className="text-sm font-medium text-fg hover:text-red-bright">Meet Vyra</Link>
              </div>
            </div>

            <div className="wipe wipe-3 lg:pl-4">
              <AgentLoop />
            </div>
          </div>
        </Container>
      </section>

      {/* PROOF: VYRA */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <Appear preset="up">
            <p className="text-sm font-medium text-red">Proof, not a pitch</p>
            <h2 className="mt-3 text-2xl tracking-tight text-fg sm:text-3xl">
              The agent we built, in the field.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
              Vyra is the agent we run in production today. It has surfaced Critical
              and High vulnerabilities across authorized bug-bounty and
              coordinated-disclosure programs. That is the bar every agent we build
              is held to.
            </p>
          </Appear>
          <div className="mt-10">
            <FieldShowcase variant="home" />
          </div>
        </Container>
      </section>

      {/* WHAT WE BUILD */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <Appear preset="up">
            <h2 className="text-2xl tracking-tight text-fg sm:text-3xl">Agents we build</h2>
            <p className="mt-4 max-w-2xl text-base text-fg-muted">
              Start with the use case. Vyra is the one we operate today; the rest we
              scope and build for you, on the same engineering.
            </p>
          </Appear>
          <Appear stagger={0.1} amount={0.2} className="mt-10 grid gap-5 md:grid-cols-2">
            {builds.map((b) => (
              <AppearItem key={b.title} preset="up">
                <div className="card-rich glass edge-holo flex h-full flex-col rounded-xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-fg">{b.title}</h3>
                    {b.proven ? (
                      <span className="shrink-0 rounded-full border border-red/40 bg-red/10 px-2.5 py-0.5 font-mono text-[11px] text-red-bright">
                        in production
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fg-subtle">
                        built to order
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{b.body}</p>
                </div>
              </AppearItem>
            ))}
          </Appear>
        </Container>
      </section>

      {/* HOW WE BUILD */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Appear preset="left" className="max-w-md">
              <h2 className="text-2xl tracking-tight text-fg sm:text-3xl">How we build an agent</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                The same loop you see running in the hero: scope, build, act, verify.
                Autonomy expands coverage. A human keeps judgement in the loop.
              </p>
            </Appear>
            <ol className="border-t border-line">
              {steps.map((s) => (
                <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 sm:gap-6">
                  <span className="font-mono text-sm text-fg-subtle">{s.n}</span>
                  <div>
                    <h3 className="font-medium text-fg">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* WHY US */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <Appear preset="up">
            <h2 className="max-w-2xl text-2xl tracking-tight text-fg sm:text-3xl">Why build with us</h2>
          </Appear>
          <Appear stagger={0.12} amount={0.25} className="mt-10 grid gap-8 md:grid-cols-3">
            {why.map((w) => (
              <AppearItem key={w.title} preset="up">
                <div>
                  <h3 className="text-sm font-semibold text-fg-subtle">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{w.body}</p>
                </div>
              </AppearItem>
            ))}
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
                  <h2 className="text-2xl tracking-tight text-fg sm:text-3xl">Bring us a use case.</h2>
                  <p className="mt-3 text-base text-fg-muted">
                    Tell us the workflow and where judgement is needed. We will tell
                    you honestly whether an agent is the right tool, and scope it if
                    it is.
                  </p>
                </div>
                <div className="shrink-0">
                  <Button asChild size="lg" className="cta-rich"><Link href="/contact?topic=consulting">Start a conversation</Link></Button>
                </div>
              </div>
            </div>
          </Appear>
        </Container>
      </section>
    </>
  );
}
