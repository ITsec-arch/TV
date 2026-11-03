import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { CourseCard } from "@/components/site/CourseCard";
import { Button } from "@/components/ui/button";
import { pageMetadata, professionalServiceLd } from "@/lib/seo";
import { courses, CATALOGUE_STATUS } from "@/lib/courses";

const PATH = "/academy";

export const metadata: Metadata = pageMetadata({
  title: "ThreatVet Academy: offensive security training",
  description:
    "Hands-on offensive security training from practitioners: AI and LLM red teaming, secure code review, web app pentesting and certification prep. Individual seats and corporate cohorts.",
  path: PATH,
});

export default function AcademyPage() {
  return (
    <>
      <JsonLd data={professionalServiceLd()} />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              Training from people who break things for a living.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              The Academy teaches the same methods we use on engagements, hands-on
              and current. Take an individual seat, or bring a course to your whole
              team as a corporate cohort.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/contact?topic=academy">Enquire about training</Link></Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Tracks */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface p-6">
              <h2 className="text-lg font-semibold text-fg">Individual</h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                A seat on a scheduled course. Live, hands-on, and taught by a
                practitioner. Priced per seat.
              </p>
            </div>
            <div className="rounded-lg border border-line bg-surface p-6">
              <h2 className="text-lg font-semibold text-fg">Corporate cohort</h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                A course delivered to your team, tuned to your stack and threat model.
                Scoped and quoted to the cohort.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Courses */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Courses</h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">Individual seats are priced per course. Corporate cohorts are quoted.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
          <p className="mt-6 text-xs text-fg-subtle">{CATALOGUE_STATUS}</p>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Train your team</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Tell us the team, the stack and the goal. We will propose a cohort
                  and a quote.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="lg"><Link href="/contact?topic=academy">Enquire about a cohort</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
