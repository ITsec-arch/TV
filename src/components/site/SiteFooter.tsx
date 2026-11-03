import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Wordmark } from "@/components/site/Wordmark";
import { nav, site } from "@/lib/site";
import { legalEntity, gstin } from "@/lib/pending";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const entity = legalEntity();
  const gst = gstin();

  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + posture */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex">
              <Wordmark className="text-lg" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              A boutique, practitioner-led offensive security and threat
              intelligence firm. Small team, senior testers, verifiable work.
            </p>
            <dl className="mt-6 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="sr-only">Email</dt>
                <dd>
                  <a className="text-fg hover:text-red-bright" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a className="text-fg hover:text-red-bright" href={site.phoneHref}>
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="text-sm">
            <h2 className="mb-3 text-xs font-semibold tracking-wide text-fg-subtle">Company</h2>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-fg-muted hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-fg-muted hover:text-fg">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Locations + legitimacy */}
          <div className="text-sm">
            <h2 className="mb-3 text-xs font-semibold tracking-wide text-fg-subtle">Where we are</h2>
            <ul className="space-y-2">
              {site.locations.map((l) => (
                <li key={l.city} className="text-fg-muted">
                  {l.city}
                  {l.note ? <span className="text-fg-subtle"> &middot; {l.note}</span> : null}
                </li>
              ))}
            </ul>
            {entity || gst ? (
              <div className="mt-6 space-y-1 text-xs text-fg-subtle">
                {entity ? <div>Entity: {entity}</div> : null}
                {gst ? <div>GSTIN: {gst}</div> : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Chennai &middot; UAE &middot; USA</p>
        </div>
      </Container>
    </footer>
  );
}
