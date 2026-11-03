import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { ProgramCard } from "@/components/site/ProgramCard";
import { LearningPath } from "@/components/site/LearningPath";
import { Button } from "@/components/ui/button";
import { pageMetadata, professionalServiceLd } from "@/lib/seo";
import { TIERS, programsByTier } from "@/lib/courses";
import { resolveBookingHref } from "@/lib/pending";

const PATH = "/academy";

export const metadata: Metadata = pageMetadata({
  title: "ThreatVet Academy: live, mentor-led security training",
  description:
    "A live, cohort-based offensive security academy. Hands-on labs from the first session, mentor-led by practitioners who do the work, taught in English and Tamil. Structured programs and corporate cohorts.",
  path: PATH,
});

const howItWorks = [
  { title: "Live cohorts, not videos", body: "Scheduled live sessions with your cohort, not a self-paced video library you work through alone." },
  { title: "Hands-on from session one", body: "Real target environments and labs from the first class, so you learn by doing, not by watching." },
  { title: "Mentor-led", body: "Our practitioners, the people who run the engagements, teach the classes and review your work." },
  { title: "Projects and assessment", body: "You are assessed on real work, with direct feedback on what you produced, not a multiple-choice quiz." },
  { title: "English and Tamil", body: "Delivered in English and Tamil, structured for defined skill levels from foundational to advanced." },
  { title: "A path, not a one-off", body: "Programs stack from foundational to advanced, so you can keep building a career over time." },
];

export default function AcademyPage() {
  const tiers = TIERS.map((tier) => ({ tier, items: programsByTier(tier) }));

  return (
    <>
      <JsonLd data={professionalServiceLd()} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-70" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold text-red">ThreatVet Academy</p>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
                Learn offensive security the way the work is actually done.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                A live, cohort-based academy. You train in scheduled sessions with
                mentors who run real engagements, on hands-on labs from the first
                class, in English and Tamil. This is academic coaching plus
                real-time practical work, not pre-recorded video and not freelance
                tutoring.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button asChild size="lg"><Link href={resolveBookingHref()}>Talk to an advisor</Link></Button>
                <Link href="#programs" className="text-sm font-medium text-fg hover:text-red-bright">See the programs</Link>
              </div>
              <p className="mt-4 text-xs text-fg-subtle">
                A short advisory call to help you choose the right program for your
                level and goal.
              </p>
            </div>

            <LearningPath />
          </div>
        </Container>
      </section>

      {/* HOW THE TRAINING WORKS */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">How the training works</h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">
            Six things that make this an academy, not a playlist.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {howItWorks.map((h) => (
              <div key={h.title} className="bg-surface p-6">
                <h3 className="font-medium text-fg">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{h.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PROGRAMS, tiered as a curriculum spine */}
      <section id="programs" className="scroll-mt-20 border-b border-line">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Programs</h2>
          <p className="mt-4 max-w-2xl text-base text-fg-muted">
            Structured programs priced per program, grouped by level so you can see
            the path. Each runs as a live cohort with hands-on labs. Cohorts form
            ahead of each intake, so join a waitlist and we will tell you when dates
            open.
          </p>

          <div className="mt-12 space-y-12">
            {tiers.map((row, ti) => {
              const last = ti === tiers.length - 1;
              return (
                <div key={row.tier} className="relative sm:pl-10">
                  {/* curriculum spine (sm and up) */}
                  <div className="absolute left-0 top-1.5 hidden size-3.5 rounded-full border-2 border-red bg-bg sm:block" aria-hidden />
                  {!last ? (
                    <div className="absolute left-[6.5px] top-6 bottom-[-3rem] hidden w-px bg-line sm:block" aria-hidden />
                  ) : null}

                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-fg">{row.tier}</h3>
                    <span className="text-xs text-fg-subtle">
                      {row.items.length} {row.items.length === 1 ? "program" : "programs"}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {row.items.map((p) => (
                      <ProgramCard key={p.slug} program={p} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CORPORATE */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-red">Corporate training</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  Bring a program to your whole team.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted">
                  We deliver any program as a private cohort for your team, tuned to
                  your stack and your threat model. Same mentors, same hands-on labs,
                  scoped to your people. Quoted to the cohort.
                </p>
              </div>
              <div className="lg:justify-self-end">
                <Button asChild size="lg"><Link href="/contact?topic=academy">Request a team cohort</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ADVISOR CTA */}
      <section>
        <Container className="py-16 md:py-24">
          <div className="rounded-lg border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Not sure which program fits?</h2>
                <p className="mt-3 text-base text-fg-muted">
                  Book a short call with an advisor and we will help you pick the
                  right program for your level and goal.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="lg"><Link href={resolveBookingHref()}>Talk to an advisor</Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
