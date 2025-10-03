import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
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
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}>
        <header className="sticky top-0 z-50 border-b border-primary/20 bg-[color:var(--background)]/75 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--background)]/60">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Threat<span className="text-primary">Vet</span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <Link href="/intelligence" className="hover:text-primary transition-colors">Intelligence</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link
                href="/contact"
                className="rounded-xl border border-primary/40 px-3 py-2 text-primary hover:bg-primary/10 transition-colors"
              >
                Contact
              </Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className="border-t border-primary/20 bg-[color:var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-10 grid gap-6 md:grid-cols-2 text-sm text-gray-400">
            <p>© {YEAR} ThreatVet — Cybersecurity 360°</p>
            <div className="flex gap-4 md:justify-end">
              <Link href="/privacy" className="hover:text-primary">Privacy</Link>
              <Link href="/terms" className="hover:text-primary">Terms</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
