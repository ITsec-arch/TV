// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inter, JetBrains_Mono } from "next/font/google";

const geistSans = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "ThreatVet — Cybersecurity 360°",
  description: "Proactive, AI-driven security for modern enterprises.",
  metadataBase: new URL("https://www.threatvet.com"),
};

const YEAR = 2025;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-primary/20 bg-[color:var(--background)]/75 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--background)]/60">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3" aria-label="ThreatVet home">
              <Image
                src="/logo.png"           // ensure public/logo.png exists
                alt="ThreatVet"
                width={136}
                height={28}
                priority
                sizes="136px"
                className="h-[28px] w-auto select-none"
              />
            </Link>

            {/* Primary Nav */}
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <Link href="/intelligence" className="hover:text-primary transition-colors">Intelligence</Link>

              <Link
                href="/contact"
                className="rounded-xl border border-primary/40 px-3 py-2 text-primary hover:bg-primary/10 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="rounded-xl px-3 py-2 text-white bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>

        {/* Page content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-primary/20 bg-[color:var(--background)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
            <div className="space-y-3">
              <Image src="/logo.png" alt="ThreatVet" width={160} height={32} className="h-8 w-auto" />
              <p className="text-sm text-gray-300">
                Delivering comprehensive, AI-driven cybersecurity solutions for modern enterprises.
                Protect your digital assets with 360° coverage.
              </p>
            </div>

            <div>
              <div className="mb-3 font-semibold">Quick Links</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link className="hover:text-primary" href="/">Home</Link></li>
                <li><Link className="hover:text-primary" href="/about">About</Link></li>
                <li><Link className="hover:text-primary" href="/services">Services</Link></li>
                <li><Link className="hover:text-primary" href="/intelligence">Intelligence</Link></li>
                <li><Link className="hover:text-primary" href="/contact">Contact</Link></li>
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

          <div className="border-t border-primary/20 py-4 text-center text-xs text-gray-400">
            © {YEAR} ThreatVet. All rights reserved. | Guardians of your digital realm
          </div>
        </footer>
      </body>
    </html>
  );
}
