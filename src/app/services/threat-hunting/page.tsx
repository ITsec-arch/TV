import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { FindingRecord } from "@/components/site/FindingRecord";
import { CoverageMatrix } from "@/components/site/CoverageMatrix";
import { StandardsTable } from "@/components/site/StandardsTable";
import { Button } from "@/components/ui/button";
import { pageMetadata, professionalServiceLd, serviceLd } from "@/lib/seo";

const PATH = "/services/threat-hunting";

export const metadata: Metadata = pageMetadata({
  title: "Threat hunting and detection engineering",
  description:
    "Hypothesis-driven threat hunting, Sigma and KQL detection authoring, purple teaming and MITRE ATT&CK coverage mapping. Find the adversary already inside, and catch the next one.",
  path: PATH,
});

const tactics = [
  "Reconnaissance", "Resource development", "Initial access", "Execution",
  "Persistence", "Privilege escalation", "Defense evasion", "Credential access",
  "Discovery", "Lateral movement", "Collection", "Command and control",
  "Exfiltration", "Impact",
].map((label) => ({ label, covered: true }));

const phases = [
  { n: "01", title: "Scope and crown jewels", body: "Agree what matters most and what good and bad look like in your environment." },
  { n: "02", title: "Hypothesis development", body: "Form testable hunt hypotheses from MITRE ATT&CK techniques relevant to you." },
  { n: "03", title: "Telemetry review", body: "Check whether your logs and sensors can even answer each hypothesis." },
  { n: "04", title: "Hunt execution", body: "Work each hypothesis through the data, confirming or ruling out activity." },
  { n: "05", title: "Detection authoring", body: "Turn what we learn into durable Sigma and KQL detections you keep." },
  { n: "06", title: "Purple team validation", body: "Safely emulate the technique to prove the detection fires as intended." },
  { n: "07", title: "Report and handover", body: "Findings, the rules, and an ATT&CK coverage map your team can run with." },
];

const standards = [
  { std: "MITRE ATT&CK", mapped: "Hunt hypotheses and coverage are mapped technique by technique." },
  { std: "Sigma", mapped: "Portable detection rules you can deploy to your own SIEM." },
  { std: "KQL", mapped: "Detections authored for Microsoft Sentinel and Defender." },
  { std: "MITRE D3FEND", mapped: "Defensive countermeasures mapped to the techniques we test." },
];

const deliverables = [
  "A set of tested hunt hypotheses",
  "Confirmed findings with evidence and timeline",
  "Durable Sigma and KQL detection rules",
  "A MITRE ATT&CK coverage map of your telemetry",
  "Purple-team validation results",
  "A prioritised gap and improvement plan",
];

const findingRows = [
  { k: "id", v: "TV-HUNT-022" },
  { k: "tactic", v: "Credential access, MITRE ATT&CK" },
  { k: "hypothesis", v: "LSASS access from an unusual parent process" },
  { k: "evidence", v: "Process and handle telemetry over a 14 day window" },
  { k: "outcome", v: "Two hosts flagged, Sigma rule authored" },
  { k: "status", v: "Detection validated by purple team" },
];

export default function ThreatHuntingPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Threat hunting and detection engineering",
            serviceType: "Threat Hunting",
            description:
              "Hypothesis-driven threat hunting, Sigma/KQL detection authoring, purple teaming and MITRE ATT&CK coverage mapping.",
            path: PATH,
          }),
          professionalServiceLd(),
        ]}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-fg-subtle">
                <Link href="/services" className="hover:text-fg">Services</Link>
                <span aria-hidden>/</span>
                <span className="text-fg-muted">Threat hunting</span>
              </nav>
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
                We hunt the adversary already inside, and leave you able to catch the next one.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                Hypothesis-driven hunts mapped to MITRE ATT&amp;CK, Sigma and KQL
                detections you keep, and purple teaming to prove they fire. You end
                up with findings and durable detection, not a one-off scare.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button asChild size="lg">
                  <Link href="/contact?topic=consulting">Request a scoped quote</Link>
                </Button>
                <Link href="#methodology" className="text-sm font-medium text-fg hover:text-red-bright">
                  See the methodology
                </Link>
              </div>
            </div>
            <FindingRecord
              animate
              label="hunt record"
              severity="Medium"
              rows={findingRows}
              note="Example finding, illustrative, not a client engagement."
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_0.8fr]">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">What it covers</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                We assume an attacker may already be past the perimeter, then go
                looking with specific, testable hypotheses. Where we find activity,
                we prove it. Either way, you keep the detections we build, so the
                value outlasts the engagement.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-fg-subtle">Who it is for</h3>
              <ul className="mt-4 space-y-3 text-sm text-fg-muted">
                {[
                  "Teams with a SIEM but thin detection coverage",
                  "Organisations after an incident or a scare",
                  "Security teams building a detection practice",
                  "Anyone who wants to measure their blind spots",
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

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            ATT&amp;CK coverage we hunt across
          </h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">
            We build hunt hypotheses and detections across the enterprise tactics.
            Depth per technique is scoped to your telemetry and risk.
          </p>
          <div className="mt-8">
            <CoverageMatrix items={tactics} caption="MITRE ATT&CK enterprise tactics we hunt across" />
          </div>
        </Container>
      </section>

      <section id="methodology" className="scroll-mt-20 border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="max-w-md">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How a hunt runs</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                Hypothesis first, data second, detection last. The output is durable:
                rules and a coverage map your team keeps and extends.
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

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Standards we map to</h2>
              <div className="mt-8"><StandardsTable rows={standards} col2="How we use it" /></div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">What you receive</h2>
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

      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Scope a hunt</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us your environment and what worries you. We will scope the
                  hunt and send a quote.
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
