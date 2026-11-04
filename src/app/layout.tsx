import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { site } from "@/lib/site";

/* Display: Clash Display (Fontshare), self-hosted. Editorial headline voice. */
const clash = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/* Body / UI: Satoshi (Fontshare), self-hosted. */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/* Technical tokens only (CVE IDs, phase ids, payloads). */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${clash.variable} ${satoshi.variable} ${geistMono.variable} min-h-screen antialiased`}
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
