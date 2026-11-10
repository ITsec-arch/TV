import type { Severity } from "@/components/site/SeverityBadge";

/**
 * Vyra's field record: vulnerabilities surfaced in authorized bug-bounty and
 * coordinated-disclosure programs, shown as a named roster on the site.
 *
 * HONESTY RULES:
 *  - Every entry is a real report. `ref` is the program's own identifier
 *    (HackerOne report number or program reference) exactly as filed.
 *  - Set `url` ONLY when a report is publicly disclosed, so the site never
 *    links a page that is actually private.
 *  - `highlight` lifts an entry into the Critical spotlight row.
 *  - `logo` is a Simple Icons (CC0) slug, rendered monochrome in our own ink,
 *    never a full-colour brand lockup. Trademarks belong to their owners; a
 *    reported finding is a fact, not a partnership or endorsement. Programs
 *    with no license-clean glyph fall back to a styled wordmark.
 */
export type FieldEntry = {
  org: string;
  severity: Severity;
  type: string;
  ref?: string;
  url?: string;
  highlight?: boolean;
  logo?: string;
};

/** Your public HackerOne profile URL (null until supplied). */
export const hackerOneProfile: string | null = null;

export const vyraFindings: FieldEntry[] = [
  { org: "xAI", severity: "Critical", type: "RCE via .mcp.json auto-execution in grok-build-cli", ref: "#3771765", highlight: true, logo: "x" },
  { org: "Apple", severity: "Critical", type: "Details withheld under Apple's disclosure terms", highlight: true, logo: "apple" },
  { org: "Cloudflare", severity: "High", type: "OAuth auth-code phishing via open dynamic client registration", ref: "#3759331", logo: "cloudflare" },
  { org: "Vercel", severity: "High", type: "Unrestricted SSRF in @vercel/og", ref: "#3757818", logo: "vercel" },
  { org: "Vercel", severity: "High", type: "SSRF guard bypass in validateDownloadUrl", ref: "#3757759", logo: "vercel" },
  { org: "Vercel", severity: "High", type: "Arbitrary local file read via wildcard CORS on turbo GraphQL", ref: "#3757739", logo: "vercel" },
  { org: "OPPO", severity: "High", type: "Production Game Center SDK appSecret leaked on public GitHub", ref: "#3760051", logo: "oppo" },
  { org: "Marriott", severity: "Medium", type: "Unauthenticated API exposes production CRM and financial data", ref: "#3772307", logo: "marriott" },
  { org: "Odoo", severity: "Medium", type: "IDOR in public event registration", ref: "ODOO-KR0F2W9N", logo: "odoo" },
  { org: "Capital.com", severity: "Medium", type: "Onboarding binds an India-IP user to an FCA-regulated entity", ref: "CAPITALCOM-N6N2HKI4" },
  { org: "ICI Paris XL", severity: "Medium", type: "Unauthenticated leak of an internal service-account API key", ref: "ASWATSON-B9KPPHJQ" },
  { org: "Nuxt", severity: "Medium", type: "Dev-server source leak, incomplete-fix bypass of CVE-2026-45670", ref: "#3759311", logo: "nuxt" },
  { org: "ai-sdk", severity: "Medium", type: "MCP OAuth authorization-server substitution", ref: "#3758943" },
  { org: "Eternal", severity: "Medium", type: "Hardcoded HMAC-SHA256 signing keys on a ticketing API", ref: "#3741670" },
  { org: "PayPal", severity: "Medium", type: "Community PayPal sensitive details disclosure", ref: "#504461", logo: "paypal" },
];
