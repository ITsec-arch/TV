import Link from "next/link";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { Button } from "@/components/ui/button";
import { professionalServiceLd, serviceLd } from "@/lib/seo";

export type Capability = { name: string; body: string; points: string[] };
export type ServiceData = {
  path: string;
  breadcrumb: string;
  title: string;
  intro: string;
  serviceType: string;
  overview: string;
  whoFor?: string[];
  capabilities: Capability[];
  approach?: { n: string; title: string; body: string }[];
};

/** Shared layout for a service line: hero, overview, capabilities, approach,
 *  CTA. Keeps every service page on one system; content comes from the data. */
export function ServiceTemplate({ data }: { data: ServiceData }) {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({ name: data.title, serviceType: data.serviceType, description: data.intro, path: data.path }),
          professionalServiceLd(),
        ]}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-fg-subtle">
            <Link href="/services" className="hover:text-fg">Services</Link>
            <span aria-hidden>/</span>
            <span className="text-fg-muted">{data.breadcrumb}</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
            {data.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{data.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button asChild size="lg"><Link href="/contact?topic=consulting">Request a scoped quote</Link></Button>
            <Link href="#capabilities" className="text-sm font-medium text-fg hover:text-red-bright">What it covers</Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_0.8fr]">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">What this covers</h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">{data.overview}</p>
            </div>
            {data.whoFor ? (
              <div>
                <h3 className="text-sm font-semibold text-fg-subtle">Who it is for</h3>
                <ul className="mt-4 space-y-3 text-sm text-fg-muted">
                  {data.whoFor.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-[1px] bg-red" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section id="capabilities" className="scroll-mt-20 border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Capabilities</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {data.capabilities.map((c) => (
              <div key={c.name} className="glass edge-holo rounded-xl p-6">
                <h3 className="text-lg font-semibold text-fg">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.points.map((p) => (
                    <li key={p} className="rounded border border-line bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted">{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {data.approach ? (
        <section className="border-b border-line">
          <Container className="py-16 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How we run it</h2>
            <ol className="mt-8 border-t border-line">
              {data.approach.map((s) => (
                <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 sm:gap-6">
                  <span className="font-mono text-sm text-fg-subtle">{s.n}</span>
                  <div>
                    <h3 className="font-medium text-fg">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Scope this engagement</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us your environment and where you are exposed. We scope the
                  work and send a quote.
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
