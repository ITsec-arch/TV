// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inter, JetBrains_Mono } from "next/font/google";

const geistSans = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ThreatVet — Cybersecurity 360°",
  description: "Proactive, AI-driven security for modern enterprises.",
  metadataBase: new URL("https://www.threatvet.com"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      // .ico works too; no need to set rel for standard favicons
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
    // mask icon for Safari pinned tabs
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#E63935" }],
  },
  manifest: "/site.webmanifest",
  // ⛔️ Do NOT put themeColor here; it belongs in viewport.ts
};
const YEAR = 2025;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] antialiased`}
        suppressHydrationWarning
        data-gramm="false"
      >
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-[color:var(--primary)]/20 bg-[color:var(--background)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--background)]/60">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-3">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              {/* 160×32 renders the current logo crisply */}
              <Image
                src="/logo.png"
                alt="ThreatVet"
                width={160}
                height={32}
                priority
              />
            </Link>

            {/* Nav */}
            <div className="flex items-center gap-5 text-sm">
              <Link href="/" className="transition-colors hover:text-[color:var(--primary)]">
                Home
              </Link>
              <Link href="/about" className="transition-colors hover:text-[color:var(--primary)]">
                About
              </Link>
              <Link href="/services" className="transition-colors hover:text-[color:var(--primary)]">
                Services
              </Link>
              <Link href="/intelligence" className="transition-colors hover:text-[color:var(--primary)]">
                Intelligence
              </Link>

              {/* Single CTA → Contact */}
              <Link
                href="/contact"
                className="rounded-xl px-3 py-2 text-white bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] transition hover:opacity-90"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>

        {/* Page content */}
        {children}

        {/* Footer */}
        <footer className="border-t border-[color:var(--primary)]/20 bg-[color:var(--background)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
            <div className="space-y-3">
              <Image src="/logo.png" alt="ThreatVet" width={160} height={32} />
              <p className="text-sm text-gray-300">
                Delivering comprehensive, AI-driven cybersecurity solutions for
                modern enterprises. Protect your digital assets with 360°
                coverage.
              </p>
            </div>

            <div>
              <div className="mb-3 font-semibold">Quick Links</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link className="hover:text-[color:var(--primary)]" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[color:var(--primary)]" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[color:var(--primary)]" href="/services">
                    Services
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[color:var(--primary)]" href="/intelligence">
                    Intelligence
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[color:var(--primary)]" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-3 font-semibold">Contact</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>info@threatvet.com</li>
                <li>+91 93453 40430</li>
                <li>Chennai, India (HQ) • UAE • USA</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[color:var(--primary)]/20 py-4 text-center text-xs text-gray-400">
            © {YEAR} ThreatVet. All rights reserved. | Guardians of your digital realm
          </div>
        </footer>
      </body>
    </html>
  );
}

