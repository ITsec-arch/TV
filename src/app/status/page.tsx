import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/Container";
import { pendingStatus } from "@/lib/pending";

// Dev-only internal status. 404s in production; noindex regardless. Never linked
// in navigation or the sitemap. Shows field names and fallbacks, never a token.
export const metadata: Metadata = {
  title: "Build status",
  robots: { index: false, follow: false },
};

export default function StatusPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const items = pendingStatus();

  return (
    <section>
      <Container className="py-16 md:py-20">
        <h1 className="text-2xl font-semibold tracking-tight text-fg">Unset values (dev)</h1>
        <p className="mt-3 max-w-2xl text-sm text-fg-muted">
          Internal status. Values the client has not supplied yet, and the fallback
          in use on the live pages. Set a field in lib/pending to go live. This page
          is not linked in navigation and is excluded from production.
        </p>

        {items.length === 0 ? (
          <p className="mt-8 text-sm text-fg">Everything is set.</p>
        ) : (
          <table className="mt-8 w-full max-w-3xl border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line-strong">
                <th scope="col" className="py-2 pr-4 text-xs font-semibold text-fg-subtle">Field</th>
                <th scope="col" className="py-2 text-xs font-semibold text-fg-subtle">Current behaviour</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.field} className="border-b border-line">
                  <th scope="row" className="py-2 pr-4 font-mono font-normal text-fg">{it.field}</th>
                  <td className="py-2 text-fg-muted">{it.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </section>
  );
}
