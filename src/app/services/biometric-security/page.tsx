import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { StandardsTable } from "@/components/site/StandardsTable";
import { Button } from "@/components/ui/button";
import { pageMetadata, professionalServiceLd, serviceLd } from "@/lib/seo";

const PATH = "/services/biometric-security";

export const metadata: Metadata = pageMetadata({
  title: "Biometric security testing: face liveness PAD and IAD",
  description:
    "Presentation attack detection (PAD) and injection attack detection (IAD) testing aligned to ISO/IEC 30107-3 and CEN/TS 18099. We report APCER, BPCER, penetration rate and attack difficulty. Aligned, not an accredited certification lab.",
  path: PATH,
});

const attacks = [
  { group: "Presentation", name: "Printed and screen replay", adversary: "Presents a photo or a video of the real person to the sensor." },
  { group: "Presentation", name: "3D artefacts", adversary: "Uses masks, silicone or moulds to imitate a real face or fingerprint." },
  { group: "Presentation", name: "Deepfake and synthetic media", adversary: "Drives a generated face or voice through the capture path." },
  { group: "Injection", name: "Capture bypass", adversary: "Skips the real sensor and feeds frames straight into the pipeline." },
  { group: "Injection", name: "Stream and API injection", adversary: "Injects crafted media into the app or API behind the camera." },
];

const metrics = [
  { m: "APCER", d: "Attack presentation classification error rate: the share of attack presentations wrongly accepted as genuine." },
  { m: "BPCER", d: "Bona fide presentation classification error rate: the share of genuine users wrongly rejected." },
  { m: "Penetration rate", d: "How often a given attack instrument gets through, across attempts." },
  { m: "Attack difficulty", d: "The skill, cost and effort an attack instrument takes to build and use." },
];

const phases = [
  { n: "01", title: "Scope and PAD levels", body: "Agree the modalities, the target systems and the attack levels in scope." },
  { n: "02", title: "Attack instrument creation", body: "Build the presentation and injection instruments the scope calls for." },
  { n: "03", title: "Presentation testing (PAD)", body: "Run attack instruments against the live sensor and record outcomes." },
  { n: "04", title: "Injection testing (IAD)", body: "Test paths that bypass the sensor and reach the pipeline directly." },
  { n: "05", title: "Metric computation", body: "Compute APCER, BPCER, penetration rate and attack difficulty from the runs." },
  { n: "06", title: "Report", body: "A clear report of what passed, what got through, and how to harden it." },
];

const standards = [
  { std: "ISO/IEC 30107-3", mapped: "The presentation attack detection testing method and metrics we align to." },
  { std: "CEN/TS 18099", mapped: "Injection attack detection guidance we align our IAD testing to." },
];

export default function BiometricSecurityPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Biometric security testing (PAD and IAD)",
            serviceType: "Biometric Security Testing",
            description:
              "Presentation and injection attack testing aligned to ISO/IEC 30107-3 and CEN/TS 18099. Not an accredited certification lab.",
            path: PATH,
          }),
          professionalServiceLd(),
        ]}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-fg-subtle">
              <Link href="/services" className="hover:text-fg">Services</Link>
              <span aria-hidden>/</span>
              <span className="text-fg-muted">Biometric security</span>
            </nav>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              We test face and fingerprint liveness the way a spoofing attacker would.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              Presentation attack detection and injection attack detection, aligned
              to ISO/IEC 30107-3 and CEN/TS 18099. We report APCER, BPCER,
              penetration rate and attack difficulty, so you know exactly what your
              liveness check stops and what it does not.
            </p>

            {/* Explicit scope disclaimer */}
            <div className="mt-8 rounded-lg border border-line-strong bg-surface p-5">
              <p className="text-sm leading-relaxed text-fg">
                <span className="font-semibold">Scope of this service.</span> We test
                aligned to ISO/IEC 30107-3 and CEN/TS 18099. We are not an accredited
                certification lab, and this testing does not issue a formal
                certification.
              </p>
            </div>

            <div className="mt-8">
              <Button asChild size="lg"><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            What the attacker actually does
          </h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">
            Presentation attacks fool the sensor. Injection attacks skip it.
          </p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {attacks.map((t) => (
              <li key={t.name} className="grid gap-2 py-5 sm:grid-cols-[7rem_15rem_1fr] sm:gap-6 sm:py-6">
                <span className="font-mono text-sm text-red">{t.group}</span>
                <span className="font-medium text-fg">{t.name}</span>
                <span className="text-sm leading-relaxed text-fg-muted">{t.adversary}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-fg sm:text-3xl">What we report</h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">
            The metrics from ISO/IEC 30107-3, computed from your own runs.
          </p>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {metrics.map((x) => (
              <div key={x.m} className="bg-surface p-6">
                <dt className="font-mono text-sm text-red">{x.m}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-fg-muted">{x.d}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section id="methodology" className="scroll-mt-20 border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="max-w-md">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How testing runs</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                We build real attack instruments, run them against your system, and
                compute the standard metrics. The report is plain about what got
                through and how to harden it.
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
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Standards we align to</h2>
          <div className="mt-8 max-w-3xl"><StandardsTable rows={standards} col2="How we align to it" /></div>
          <p className="mt-6 max-w-3xl text-sm text-fg-subtle">
            Aligned to these standards for testing and reporting. ThreatVet is not an
            accredited certification body.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Scope a biometric test</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us your modality and the systems in scope. We will scope the
                  testing and send a quote.
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
