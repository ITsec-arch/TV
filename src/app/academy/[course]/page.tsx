import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { Button } from "@/components/ui/button";
import { pageMetadata, courseLd, professionalServiceLd } from "@/lib/seo";
import { programs, getProgram } from "@/lib/courses";
import { resolveFee } from "@/lib/pending";

type Params = { params: Promise<{ course: string }> };

export function generateStaticParams() {
  return programs.map((p) => ({ course: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { course } = await params;
  const p = getProgram(course);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.promise, path: `/academy/${p.slug}` });
}

export default async function ProgramPage({ params }: Params) {
  const { course } = await params;
  const p = getProgram(course);
  if (!p) notFound();

  const specs = [
    { k: "Duration", v: p.durationWeeks },
    { k: "Live sessions", v: p.liveHours },
    { k: "Lab time", v: p.labHours },
    { k: "Format", v: p.format },
    { k: "Language", v: p.language },
    { k: "Level", v: p.level },
  ];

  return (
    <>
      <JsonLd
        data={[
          courseLd({ name: p.title, description: p.promise, path: `/academy/${p.slug}` }),
          professionalServiceLd(),
        ]}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-fg-subtle">
            <Link href="/academy" className="hover:text-fg">Academy</Link>
            <span aria-hidden>/</span>
            <span className="text-fg-muted">{p.title}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded border border-line px-2 py-0.5 text-xs text-fg-subtle">{p.level}</span>
              <span className="inline-flex items-center gap-2 text-xs text-fg-muted">
                <span className="size-1.5 rounded-full bg-red/55" aria-hidden /> Next cohort forming
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl">
              {p.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">{p.promise}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.k}>
                  <dt className="text-fg-subtle">{s.k}</dt>
                  <dd className="mt-1 text-fg">{s.v}</dd>
                </div>
              ))}
              <div>
                <dt className="text-fg-subtle">Program fee</dt>
                <dd className="mt-1 text-fg">{resolveFee(p.slug)}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/contact?topic=academy">Join the waitlist</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/contact?topic=academy">Talk to an advisor</Link></Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_0.8fr]">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">What you will be able to do</h2>
              <ul className="mt-6 space-y-3">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-[1px] bg-red" aria-hidden />
                    <span className="text-fg">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-fg-subtle">Who it is for</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{p.whoFor}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-fg-subtle">Prerequisites</h3>
                <ul className="mt-3 space-y-2 text-sm text-fg-muted">
                  {p.prerequisites.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {p.certs && p.certs.length > 0 ? (
        <section className="border-b border-line">
          <Container className="py-16 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Certifications we prepare you for</h2>
            <p className="mt-4 max-w-2xl text-base text-fg-muted">
              A structured track across hands-on and blue-team certifications. We
              coach the methodology and exam technique, we do not sell or proxy the
              exams.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.certs.map((c) => (
                <li key={c} className="rounded border border-line bg-surface px-3 py-1.5 font-mono text-sm text-fg-muted">{c}</li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Curriculum</h2>
          <ol className="mt-8 border-t border-line">
            {p.modules.map((m, i) => (
              <li key={m.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 sm:gap-6">
                <span className="font-mono text-sm text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-medium text-fg">{m.title}</h3>
                  <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-fg-muted">
                    {m.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-fg-subtle" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Join the next cohort</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Cohorts form ahead of each intake. Join the waitlist and we will
                  tell you when dates open, or talk to an advisor to plan your path.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button asChild size="lg"><Link href="/contact?topic=academy">Join the waitlist</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
