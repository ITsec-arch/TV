// Single source of truth for values the client has not supplied yet.
// Set a field to a real string to go live. While a value is null, the site
// renders deliberate fallback copy, never a raw token. The /status route lists
// everything still unset (dev-facing; never shown in the main nav or sitemap).

type Maybe = string | null;

export const pending = {
  // Fees, keyed by program slug and package key. Set a price string to go live.
  prices: {
    "offensive-security-practitioner": null,
    "ai-llm-red-teaming": null,
    "secure-code-review": null,
    "web-app-pentesting-fundamentals": null,
    "certification-prep": null,
    "pkg-web-app-pentest": null,
    "pkg-cloud-config-review": null,
    "pkg-external-attack-surface": null,
    "pkg-ai-llm-review": null,
  } as Record<string, Maybe>,

  cohortDate: null as Maybe,
  bookingLink: null as Maybe,
  legalEntity: null as Maybe,
  gstin: null as Maybe,
  gff2026: "nominee" as Maybe, // agreed default
};

export const FEE_FALLBACK = "Pricing on request";
export const COHORT_FALLBACK = "Next intake forming";

const has = (v?: Maybe): v is string => typeof v === "string" && v.trim().length > 0;

export const resolveFee = (id: string): string => {
  const v = pending.prices[id];
  return has(v) ? v : FEE_FALLBACK;
};
export const resolveCohort = (): string => (has(pending.cohortDate) ? pending.cohortDate : COHORT_FALLBACK);
export const resolveBookingHref = (): string => (has(pending.bookingLink) ? pending.bookingLink : "/contact?topic=academy");
export const resolveGff = (): string => (has(pending.gff2026) ? pending.gff2026 : "nominee");
export const legalEntity = (): string | null => (has(pending.legalEntity) ? pending.legalEntity : null);
export const gstin = (): string | null => (has(pending.gstin) ? pending.gstin : null);

// Dev status: field names and the fallback in use. No raw tokens.
export function pendingStatus(): { field: string; status: string }[] {
  const out: { field: string; status: string }[] = [];
  for (const [id, v] of Object.entries(pending.prices)) {
    if (!has(v)) out.push({ field: `price: ${id}`, status: `fallback "${FEE_FALLBACK}"` });
  }
  if (!has(pending.cohortDate)) out.push({ field: "cohort date", status: `fallback "${COHORT_FALLBACK}"` });
  if (!has(pending.bookingLink)) out.push({ field: "booking link", status: "CTA routes to /contact?topic=academy" });
  if (!has(pending.legalEntity)) out.push({ field: "legal entity", status: "footer line omitted" });
  if (!has(pending.gstin)) out.push({ field: "GSTIN", status: "footer line omitted" });
  return out;
}
