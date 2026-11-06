"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Wordmark } from "@/components/site/Wordmark";
import { Button } from "@/components/ui/button";
import { nav, primaryCta } from "@/lib/site";
import { cn } from "@/lib/utils";

const services = nav.find((n) => n.children)?.children ?? [];
const topLinks = nav.filter((n) => !n.children);

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);

  // Close the Services menu on outside click / Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    function onClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesBtnRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 text-base"
            aria-label="ThreatVet home"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <Wordmark />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            <ul className="flex items-center gap-1">
              <li ref={servicesRef} className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}>
                <button
                  ref={servicesBtnRef}
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen((v) => !v)}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  Services
                  <ChevronDown className={cn("size-3.5 transition-transform", servicesOpen && "rotate-180")} aria-hidden />
                </button>
                <div
                  id="services-menu"
                  role="menu"
                  hidden={!servicesOpen}
                  className="absolute left-0 top-full w-[22rem] pt-2"
                >
                  <div className="soft-shadow-lg overflow-hidden rounded-lg border border-line bg-surface-2">
                    {services.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        role="menuitem"
                        className="block border-b border-line/70 px-4 py-3 last:border-0 hover:bg-surface"
                        onClick={() => setServicesOpen(false)}
                      >
                        <div className="text-sm font-medium text-fg">{c.label}</div>
                        <div className="mt-0.5 text-xs leading-snug text-fg-muted">{c.blurb}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
              {topLinks.map((item) => {
                const current = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm transition-colors hover:text-fg",
                        current ? "text-fg" : "text-fg-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild size="sm">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-fg lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-line bg-bg lg:hidden">
          <Container className="py-4">
            <div className="text-xs font-semibold tracking-wide text-fg-subtle">Services</div>
            <ul className="mt-2 space-y-1">
              {services.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="block rounded-md px-2 py-2 text-sm text-fg-muted hover:bg-surface hover:text-fg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-4 space-y-1 border-t border-line pt-4">
              {topLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-2 text-sm text-fg-muted hover:bg-surface hover:text-fg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="block rounded-md px-2 py-2 text-sm text-fg-muted hover:bg-surface hover:text-fg"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <Button asChild className="mt-4 w-full">
              <Link href={primaryCta.href} onClick={() => setMobileOpen(false)}>
                {primaryCta.label}
              </Link>
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
