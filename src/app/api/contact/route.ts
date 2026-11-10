import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Response contract is unchanged: { ok: true } / { ok: false, error: "..." }.
const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  company: z.string().max(200).optional().nullable(),
  phone: z.string().max(60).optional().nullable(),
  message: z.string().min(10).max(5000),
  // Additive, optional: routes the enquiry by buyer. Defaults to general.
  topic: z.enum(["consulting", "packages", "academy", "general"]).optional().default("general"),
});

// Enquiry routing. Each topic can target its own inbox; falls back to CONTACT_TO.
const TOPIC = {
  consulting: { label: "Enterprise consulting", env: "CONTACT_TO_CONSULTING" },
  packages: { label: "SMB package", env: "CONTACT_TO_PACKAGES" },
  academy: { label: "Academy and training", env: "CONTACT_TO_ACADEMY" },
  general: { label: "General enquiry", env: "CONTACT_TO" },
} as const;

// Escape every field before interpolating into the HTML email (prevents the
// stored HTML/script injection the previous version allowed).
function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return input.replace(/[&<>"']/g, (c) => map[c]);
}

// Header-safe single line (for the subject).
function oneLine(input: string, max = 120): string {
  return input.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

// In-memory fixed-window rate limit. Per server instance, not distributed;
// adequate as a first line against abuse of a single contact endpoint.
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  // Bound memory: sweep expired buckets once the map grows large.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
  }
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (rec.count >= MAX_REQ) return true;
  rec.count += 1;
  return false;
}

// Best-effort client IP. Prefer the platform-set x-real-ip over the leftmost
// x-forwarded-for, which a client can spoof to rotate past the rate limit. IP
// limiting is a coarse control; the honeypot below is the primary bot guard.
function clientIp(req: NextRequest): string {
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return "unknown";
}

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(clientIp(req))) {
      return NextResponse.json({ ok: false, error: "RATE_LIMITED" }, { status: 429 });
    }

    const json = (await req.json()) as Record<string, unknown>;

    // Honeypot: a hidden field real users never fill. If it has content, treat
    // the sender as a bot and drop silently with a success response (no email).
    if (typeof json.website === "string" && json.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const { name, email, company, phone, message, topic } = ContactSchema.parse(json);

    const route = TOPIC[topic];
    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env[route.env] ?? process.env.CONTACT_TO ?? "info@threatvet.com";
    const from = process.env.CONTACT_FROM ?? "ThreatVet <no-reply@threatvet.com>";

    const subject = `[${route.label}] enquiry from ${oneLine(name)}`;
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111">
        <h2>New enquiry: ${escapeHtml(route.label)}</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Company:</b> ${escapeHtml(company ?? "-")}</p>
        <p><b>Phone:</b> ${escapeHtml(phone ?? "-")}</p>
        <p><b>Topic:</b> ${escapeHtml(route.label)}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({ from, to, subject, html, replyTo: email });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json({ ok: false, error: "MAIL_SEND_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Contact API error:", err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "INVALID_INPUT", issues: err.issues },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: false, error: "UNKNOWN_ERROR" }, { status: 500 });
  }
}
