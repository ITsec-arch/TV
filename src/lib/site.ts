// Central site config. Single source of truth for URL, contact, nav, locations.

export const site = {
  name: "ThreatVet",
  // Apex is canonical; middleware 308-redirects www -> apex.
  url: "https://threatvet.com",
  tagline: "Practitioner-led offensive security and threat intelligence.",
  email: "info@threatvet.com",
  phone: "+91 93453 40430",
  phoneHref: "tel:+919345340430",
  locations: [
    { city: "Chennai, India", note: "HQ" },
    { city: "UAE", note: "" },
    { city: "USA", note: "" },
  ],
} as const;

export type NavChild = { label: string; href: string; blurb: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

// IA: one credibility layer, three buyer paths. Services grouped by job.
export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Offensive security",
        href: "/services/offensive-security",
        blurb: "Web, mobile and network testing to OWASP WSTG/MASTG, PTES, NIST SP 800-115.",
      },
      {
        label: "AI security",
        href: "/services/ai-security",
        blurb: "LLM and agentic red teaming mapped to OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF.",
      },
      {
        label: "Threat hunting",
        href: "/services/threat-hunting",
        blurb: "Hypothesis-driven hunts, Sigma/KQL authoring, ATT&CK coverage mapping.",
      },
      {
        label: "Biometric security",
        href: "/services/biometric-security",
        blurb: "Presentation- and injection-attack testing aligned to ISO/IEC 30107-3 and CEN/TS 18099.",
      },
    ],
  },
  { label: "AI Agents", href: "/agents" },
  { label: "Vyra", href: "/product" },
  { label: "Packages", href: "/packages" },
  { label: "Academy", href: "/academy" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
];

export const primaryCta = { label: "Request a scoped quote", href: "/contact" };
