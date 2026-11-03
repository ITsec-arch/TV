import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Per-page metadata helper. `path` is a root-relative path ("/services/ai-security").
 * metadataBase (set in root layout) resolves the relative canonical + OG URLs.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { title, description, path } = opts;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ---------------- JSON-LD builders (schema.org) ---------------- */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: site.tagline,
    address: site.locations.map((l) => ({
      "@type": "PostalAddress",
      addressLocality: l.city,
    })),
  };
}

export function professionalServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: site.tagline,
    areaServed: ["IN", "AE", "US", "Worldwide"],
    serviceType: [
      "Penetration Testing",
      "AI Security Testing",
      "Threat Hunting",
      "Threat Intelligence",
    ],
  };
}

/** SoftwareApplication node (for Vyra). No fabricated rating or price. */
export function softwareApplicationLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web",
    description: opts.description,
    url: `${site.url}${opts.path}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
  };
}

/** Course node. Price omitted until confirmed, so no fabricated figure ships. */
export function courseLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT16H",
    },
  };
}

/** Service node for a specific offering page. */
export function serviceLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    areaServed: ["IN", "AE", "US", "Worldwide"],
  };
}
