import "./globals.css";
import type { Metadata } from "next";
import { Hanken_Grotesk, Source_Code_Pro } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { site } from "@/lib/site";

/* Display + body: Hanken Grotesk. Humanist, warm, editorial headline voice. */
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/* Identifiers only (CVE IDs, phase ids, payloads). Matches the reference mono. */
const sourceCode = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-code",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

const description =
  "Practitioner-led offensive security and threat intelligence: penetration testing, AI/LLM red teaming, threat hunting and biometric testing, backed by published CVE research and Vyra, our autonomous testing engine.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ThreatVet: offensive security and threat intelligence",
    template: "%s | ThreatVet",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/",
    title: "ThreatVet: offensive security and threat intelligence",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "ThreatVet: offensive security and threat intelligence",
    description,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${hanken.variable} ${sourceCode.variable} min-h-screen antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only rounded-md bg-surface-2 px-4 py-2 text-sm text-fg focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
