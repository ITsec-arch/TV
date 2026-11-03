import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { FindingRecord } from "@/components/site/FindingRecord";
import { StandardsTable } from "@/components/site/StandardsTable";
import { Button } from "@/components/ui/button";
import { pageMetadata, professionalServiceLd, serviceLd } from "@/lib/seo";
import { cves, creditedThrough } from "@/lib/research";

const PATH = "/services/ai-security";

export const metadata: Metadata = pageMetadata({
  title: "AI & LLM security testing",
  description:
    "LLM penetration testing and agentic AI red teaming: prompt injection, tool and agent abuse, data exfiltration, RAG and model manipulation, mapped to the OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF and CERT-In's 2026 AI guidance.",
  path: PATH,
});

// Threat model. The two LLM01 rows are sub-tagged so they do not read as a
// duplicate: prompt injection is one OWASP category with two delivery paths.
const threats: { code: string; tag?: string; name: string; adversary: string }[] = [
  { code: "LLM01", tag: "direct", name: "Direct prompt injection", adversary: "Overrides your system prompt and guardrails to make the model act against its instructions." },
  { code: "LLM01", tag: "indirect", name: "Indirect prompt injection", adversary: "Plants instructions in content the model later reads, such as a web page, a document, or a retrieved record." },
  { code: "LLM02", name: "Sensitive information disclosure", adversary: "Coaxes out secrets, other users' data, or the hidden system prompt." },
  { code: "LLM05", name: "Improper output handling", adversary: "Turns unsanitised model output into XSS, SSRF or command execution downstream." },
  { code: "LLM06", name: "Excessive agency", adversary: "Abuses the tools and actions an agent can take, such as sending mail, calling APIs, or moving money." },
  { code: "LLM04", name: "Data and model poisoning", adversary: "Corrupts training data or a RAG corpus so the model fails on attacker-chosen inputs." },
];

const phases: { n: string; title: string; body: React.ReactNode }[] = [
  { n: "01", title: "Scope and threat model", body: "Map the system (models, tools, data flows, trust boundaries) and tie each surface to the OWASP LLM Top 10 and MITRE ATLAS." },
  { n: "02", title: "Automated probing", body: (<>Vyra runs broad probe categories across the surface for coverage and consistency. <Link href="/product" className="text-red-bright underline-offset-4 hover:underline">See Vyra</Link>.</>) },
  { n: "03", title: "Manual exploitation", body: "Senior testers drive the attacks that need judgement: injection chains, guardrail bypasses, and abuse of real business logic." },
  { n: "04", title: "Impact validation", body: "We prove real impact, such as exfiltrated data or unauthorised actions, rather than reporting theoretical risk." },
  { n: "05", title: "Report and remediation", body: "Reproducible findings with severity, standard mappings and concrete fixes your engineers can act on." },
  { n: "06", title: "Retest", body: "We re-run the proven attacks after you remediate and confirm each one is closed." },
];

const standards = [
  { std: "OWASP Top 10 for LLM Applications (2025)", mapped: "Every finding tagged to an LLM risk category." },
  { std: "MITRE ATLAS", mapped: "Adversary techniques specific to AI and ML systems." },
  { std: "NIST AI RMF + Generative AI Profile", mapped: "Risk framed across Govern, Map, Measure, Manage." },
  { std: "CERT-In 2026 AI guidance", mapped: "India-specific expectations for securing AI systems." },
];

const deliverables = [
  "A threat model and attack-surface map of your AI system",
  "Reproducible findings with severity and standard mappings",
  "Evidence of real impact, not theoretical risk",
  "Prioritised, engineer-ready remediation guidance",
  "An executive summary for non-technical stakeholders",
  "A retest once you have remediated",
];

const findingRows = [
  { k: "id", v: "TV-AI-013" },
  { k: "class", v: "Indirect prompt injection, OWASP LLM01" },
  { k: "vector", v: "Poisoned document retrieved by the RAG pipeline" },
  { k: "impact", v: "Agent exfiltrates session context to an external URL" },
  { k: "mapping", v: "MITRE ATLAS, LLM prompt injection" },
  { k: "status", v: "Reproduced, fix verified on retest" },
];

export default function AiSecurityPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "AI & LLM security testing",
            serviceType: "AI Security Testing",
            description:
              "LLM penetration testing and agentic AI red teaming mapped to OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF and CERT-In 2026 AI guidance.",
            path: PATH,
          }),
          professionalServiceLd(),
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-fg-subtle">
                <Link href="/services" className="hover:text-fg">Services</Link>
                <span aria-hidden>/</span>
                <span className="text-fg-muted">AI security</span>
              </nav>

              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
                We test LLM and agentic systems the way real attackers exploit them.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                Prompt injection, tool and agent abuse, data exfiltration, and RAG
                and model manipulation, assessed against the OWASP LLM Top 10,
                MITRE ATLAS and NIST AI RMF, with findings you can reproduce and fix.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button asChild size="lg">
                  <Link href="/contact?topic=consulting">Request a scoped quote</Link>
                </Button>
                <Link href="#methodology" className="text-sm font-medium text-fg hover:text-red-bright">
                  See the methodology
                </Link>
              </div>

              <div className="mt-10 border-t border-line pt-6">
                <p className="text-sm text-fg-subtle">We publish verifiable research. Four credited CVEs:</p>
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
                    <Link href="/research" className="inline-flex items-center px-1 py-1 text-xs text-red-bright underline-offset-4 hover:underline">
                      All research
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <FindingRecord
              animate
              severity="High"
              rows={findingRows}
              note="Example finding, illustrative, not a client engagement."
            />
          </div>
        </Container>
      </section>

      {/* WHAT IT IS / WHO */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_0.8fr]">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                What AI security testing covers
              </h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                Shipping an LLM feature, a RAG system or an autonomous agent adds a
                new attack surface that conventional application testing does not
                reach. We assess that surface directly: how your prompts, tools,
                retrieval and model boundaries behave under a motivated attacker,
                and what it costs you when they get through.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-fg-subtle">Who it is for</h3>
              <ul className="mt-4 space-y-3 text-sm text-fg-muted">
                {[
                  "Teams shipping LLM-backed product features",
                  "RAG and knowledge-retrieval systems",
                  "Autonomous agents and copilots with tool access",
                  "Model and inference APIs exposed to users",
                ].map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-[1px] bg-red" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* THREAT MODEL */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            What the adversary actually does
          </h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">
            The attacks we run, each mapped to an OWASP LLM Top 10 category.
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {threats.map((t) => (
              <li key={t.name} className="grid gap-2 py-5 sm:grid-cols-[7rem_14rem_1fr] sm:gap-6 sm:py-6">
                <span className="font-mono text-sm text-red">
                  {t.code}
                  {t.tag ? <span className="ml-1.5 text-fg-subtle">{t.tag}</span> : null}
                </span>
                <span className="font-medium text-fg">{t.name}</span>
                <span className="text-sm leading-relaxed text-fg-muted">{t.adversary}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="scroll-mt-20 border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="max-w-md">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                How we run an engagement
              </h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                Automation expands coverage and consistency. A human operator drives
                exploitation and judgement. It does not replace manual testing. It
                frees our testers to spend their time where it counts.
              </p>
            </div>

            <ol className="border-t border-line">
              {phases.map((p) => (
                <li key={p.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 sm:gap-6">
                  <span className="font-mono text-sm text-fg-subtle">{p.n}</span>
                  <div>
                    <h3 className="font-medium text-fg">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* STANDARDS + DELIVERABLES */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Standards we map to
              </h2>
              <div className="mt-8">
                <StandardsTable rows={standards} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                What you receive
              </h2>
              <ul className="mt-8 space-y-4">
                {deliverables.map((d) => (
                  <li key={d} className="flex gap-3 border-b border-line pb-4 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-[1px] bg-red" aria-hidden />
                    <span className="text-fg">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CREDIBILITY */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Why trust our findings
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-fg-subtle">Published research</h3>
              <ul className="mt-4 space-y-3">
                {cves.map((c) => (
                  <li key={c.id} className="text-sm">
                    <div className="font-mono text-fg">{c.id}</div>
                    <div className="text-fg-muted">{c.product}, {c.type}</div>
                    <div className="mt-1 flex gap-3 text-xs">
                      <a className="text-red-bright underline-offset-4 hover:underline" href={c.nvdUrl} target="_blank" rel="noopener noreferrer">NVD</a>
                      <a className="text-red-bright underline-offset-4 hover:underline" href={c.advisory.url} target="_blank" rel="noopener noreferrer">{c.advisory.label}</a>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-fg-subtle">Research credited through {creditedThrough}.</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-fg-subtle">Practitioner-led</h3>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                Ten-plus years in offensive security, preceded by roughly nine years
                building software. Most testers cannot read a codebase, and their
                reports show it. Ours can, so findings come with the why, not just
                the what.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-fg-subtle">Certified</h3>
              <ul className="mt-4 space-y-2 text-sm text-fg-muted">
                <li className="text-fg">OSCP+ <span className="text-fg-subtle">(certified 14 Sep 2026)</span></li>
                <li className="text-fg">CPENT</li>
              </ul>
              <p className="mt-4 text-sm text-fg-muted">
                A boutique team: senior testers on every engagement, no handoff to
                juniors.
              </p>
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
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  Scope an AI security engagement
                </h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us what you are shipping and where it is exposed. We will scope
                  the test and send a quote. No fixed package, no guesswork.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="lg">
                  <Link href="/contact?topic=consulting">Request a scoped quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
