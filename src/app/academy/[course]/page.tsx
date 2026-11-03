import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { Button } from "@/components/ui/button";
import { pageMetadata, courseLd, professionalServiceLd } from "@/lib/seo";
import { courses, getCourse } from "@/lib/courses";

type Params = { params: Promise<{ course: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { course } = await params;
  const c = getCourse(course);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.summary, path: `/academy/${c.slug}` });
}

export default async function CoursePage({ params }: Params) {
  const { course } = await params;
  const c = getCourse(course);
  if (!c) notFound();

  return (
    <>
      <JsonLd
        data={[
          courseLd({ name: c.title, description: c.summary, path: `/academy/${c.slug}` }),
          professionalServiceLd(),
        ]}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-fg-subtle">
            <Link href="/academy" className="hover:text-fg">Academy</Link>
            <span aria-hidden>/</span>
            <span className="text-fg-muted">{c.title}</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl">
              {c.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">{c.summary}</p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div>
                <dt className="text-fg-subtle">Duration</dt>
                <dd className="mt-1 font-mono text-fg">{c.duration}</dd>
              </div>
              <div>
                <dt className="text-fg-subtle">Format</dt>
                <dd className="mt-1 text-fg">{c.format}</dd>
              </div>
              <div>
                <dt className="text-fg-subtle">Individual seat, from</dt>
                <dd className="mt-1 font-mono text-fg">{c.priceMarker}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/contact?topic=academy">Enquire about a seat</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/contact?topic=academy">Book a corporate cohort</Link></Button>
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
                {c.outcomes.map((o) => (
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
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{c.audience}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-fg-subtle">Prerequisites</h3>
                <ul className="mt-3 space-y-2 text-sm text-fg-muted">
                  {c.prerequisites.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Syllabus</h2>
          <ol className="mt-8 border-t border-line">
            {c.modules.map((m, i) => (
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
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Join this course</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Ask about the next scheduled seat, or bring it to your team as a
                  cohort.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="lg"><Link href="/contact?topic=academy">Enquire</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
