import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { JsonLd } from "@/components/site/JsonLd";
import { ContactForm, type EnquiryTopic } from "@/components/site/ContactForm";
import { pageMetadata, organizationLd } from "@/lib/seo";
import { site } from "@/lib/site";

const PATH = "/contact";

export const metadata: Metadata = pageMetadata({
  title: "Contact ThreatVet",
  description:
    "Start an engagement, enquire about a package, or ask about training. Email info@threatvet.com or send a message. We reply within one business day.",
  path: PATH,
});

const VALID: EnquiryTopic[] = ["consulting", "packages", "academy", "general"];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const defaultTopic: EnquiryTopic = VALID.includes(topic as EnquiryTopic)
    ? (topic as EnquiryTopic)
    : "general";

  return (
    <>
      <JsonLd data={organizationLd()} />

      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl">
              Tell us what you need.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              Whether it is a scoped engagement, a fixed package, or training, start
              here. Pick what it is about so it reaches the right person, and we will
              reply within one business day.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div className="order-2 lg:order-1">
              <ContactForm defaultTopic={defaultTopic} />
            </div>

            <aside className="order-1 space-y-8 lg:order-2">
              <div>
                <h2 className="text-sm font-semibold text-fg-subtle">Direct</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a className="text-fg hover:text-red-bright" href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                  <li>
                    <a className="text-fg hover:text-red-bright" href={site.phoneHref}>{site.phone}</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-fg-subtle">Offices</h2>
                <ul className="mt-3 space-y-1 text-sm text-fg-muted">
                  {site.locations.map((l) => (
                    <li key={l.city}>
                      {l.city}
                      {l.note ? <span className="text-fg-subtle"> &middot; {l.note}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-fg-subtle">Response</h2>
                <p className="mt-3 text-sm text-fg-muted">
                  We reply within one business day. For a scoped quote, a sentence or
                  two about what you are building is enough to start.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
