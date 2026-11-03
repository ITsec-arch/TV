import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { FindingRecord } from "@/components/site/FindingRecord";
import { StandardsTable } from "@/components/site/StandardsTable";
import { Button } from "@/components/ui/button";
import { pageMetadata, professionalServiceLd, serviceLd } from "@/lib/seo";

const PATH = "/services/offensive-security";

export const metadata: Metadata = pageMetadata({
  title: "Offensive security and penetration testing",
  description:
    "Web, mobile, API and network penetration testing to OWASP WSTG and MASTG, PTES and NIST SP 800-115. VAPT that proves real impact, with reproducible findings and a retest.",
  path: PATH,
});

const threats = [
  { code: "A01", name: "Broken access control", adversary: "Reaches data and actions that should be out of reach by changing an id, a role, or a path." },
  { code: "A03", name: "Injection", adversary: "Feeds crafted input into SQL, commands or templates to read data or run code." },
  { code: "A07", name: "Identification and auth failures", adversary: "Defeats login, session or recovery flows to take over accounts." },
  { code: "SSRF", name: "Server-side request forgery", adversary: "Makes your server call internal services or cloud metadata on their behalf." },
  { code: "A08", name: "Insecure deserialisation", adversary: "Sends hostile serialised objects to trigger code execution." },
  { code: "A05", name: "Security misconfiguration", adversary: "Finds exposed admin, default credentials, verbose errors and leaked secrets." },
];

const phases = [
  { n: "01", title: "Scope and rules of engagement", body: "Agree targets, limits, timing and emergency contacts before anything runs." },
  { n: "02", title: "Recon and mapping", body: "Enumerate the real attack surface: hosts, endpoints, auth flows and dependencies." },
  { n: "03", title: "Vulnerability discovery", body: "Test methodically against OWASP WSTG and MASTG, not just an automated scan." },
  { n: "04", title: "Exploitation", body: "Prove the issue by exploiting it safely, chaining where it increases impact." },
  { n: "05", title: "Post-exploitation and impact", body: "Show what the access is worth: data reached, privilege gained, blast radius." },
  { n: "06", title: "Report and remediation", body: "Reproducible findings with severity and fixes your engineers can act on." },
  { n: "07", title: "Retest", body: "We re-run the proven attacks after you remediate and confirm each is closed." },
];

const standards = [
  { std: "OWASP WSTG", mapped: "The web testing method we work through, control by control." },
  { std: "OWASP MASTG", mapped: "Mobile app testing for Android and iOS." },
  { std: "PTES", mapped: "The engagement lifecycle, from pre-engagement to reporting." },
  { std: "NIST SP 800-115", mapped: "Technical testing approach and evidence handling." },
];

const deliverables = [
  "A map of your real attack surface",
  "Reproducible findings with severity and business impact",
  "Proof of exploitation, handled safely",
  "Prioritised, engineer-ready remediation guidance",
  "An executive summary for stakeholders",
  "A retest once you have remediated",
];

const findingRows = [
  { k: "id", v: "TV-WEB-041" },
  { k: "class", v: "Broken access control, OWASP A01" },
  { k: "vector", v: "Object id in an API call accepts another tenant's value" },
  { k: "impact", v: "Reads and edits records belonging to other customers" },
  { k: "mapping", v: "OWASP WSTG, authorization testing" },
  { k: "status", v: "Reproduced, fix verified on retest" },
];

export default function OffensiveSecurityPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Offensive security and penetration testing",
            serviceType: "Penetration Testing",
            description:
              "Web, mobile, API and network penetration testing to OWASP WSTG/MASTG, PTES and NIST SP 800-115.",
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
                <span className="text-fg-muted">Offensive security</span>
              </nav>
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
                We find the way in before an attacker does.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                Web, mobile, API and network penetration testing to OWASP WSTG and
                MASTG, PTES and NIST SP 800-115. We prove the impact, not just the
                finding, and we come back to check the fix.
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
              severity="High"
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
                A focused assessment of the systems you choose: the web and mobile
                apps, the APIs behind them, and the networks they run on. We test
                the way an attacker works, by hand and with tooling, and we prove
                each issue is real before it goes in the report.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-fg-subtle">Who it is for</h3>
              <ul className="mt-4 space-y-3 text-sm text-fg-muted">
                {[
                  "Teams before a launch or a security review",
                  "Products carrying sensitive or regulated data",
                  "Companies meeting a customer or compliance requirement",
                  "Anyone who wants proof, not a scan report",
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
            What the adversary actually does
          </h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">
            The classes we test for, drawn from the OWASP testing method.
          </p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {threats.map((t) => (
              <li key={t.name} className="grid gap-2 py-5 sm:grid-cols-[7rem_14rem_1fr] sm:gap-6 sm:py-6">
                <span className="font-mono text-sm text-red">{t.code}</span>
                <span className="font-medium text-fg">{t.name}</span>
                <span className="text-sm leading-relaxed text-fg-muted">{t.adversary}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="methodology" className="scroll-mt-20 border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="max-w-md">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How we run an engagement</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                A PTES-aligned lifecycle. Vyra widens coverage; senior testers drive
                the exploitation and judgement. Automation does not replace manual
                testing here.
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
              <div className="mt-8"><StandardsTable rows={standards} /></div>
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
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Scope a penetration test</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us what you want tested and why. We will scope it and send a
                  quote. For smaller, fixed needs, see our packages.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button asChild size="lg"><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button>
                <Button asChild size="lg" variant="outline"><Link href="/packages">See packages</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
