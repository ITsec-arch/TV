import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper: escape basic HTML
function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c] as string));
}

export async function POST(req: Request) {
  try {
    const { name, email, company = "", phone = "", message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const to = process.env.CONTACT_TO!;
    const from = process.env.CONTACT_FROM || "no-reply@your-domain.com";
    const bcc = process.env.CONTACT_BCC || undefined;

    if (!process.env.RESEND_API_KEY || !to) {
      return NextResponse.json(
        { ok: false, error: "Contact email not configured on the server." },
        { status: 500 }
      );
    }

    const subject = `New inquiry from ${name} — ThreatVet`;

    // Plain HTML email (no @react-email/render required)
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111">
        <h2>New Website Inquiry</h2>
        <table style="border-collapse:collapse;width:100%;max-width:640px">
          <tbody>
            <tr><td style="padding:6px 8px;background:#f6f6f6;width:140px"><strong>Name</strong></td><td style="padding:6px 8px">${esc(name)}</td></tr>
            <tr><td style="padding:6px 8px;background:#f6f6f6"><strong>Email</strong></td><td style="padding:6px 8px">${esc(email)}</td></tr>
            <tr><td style="padding:6px 8px;background:#f6f6f6"><strong>Company</strong></td><td style="padding:6px 8px">${esc(company)}</td></tr>
            <tr><td style="padding:6px 8px;background:#f6f6f6"><strong>Phone</strong></td><td style="padding:6px 8px">${esc(phone)}</td></tr>
          </tbody>
        </table>

        <h3 style="margin-top:16px">Message</h3>
        <div style="white-space:pre-wrap;border:1px solid #eee;background:#fafafa;padding:10px;border-radius:8px;">
          ${esc(message)}
        </div>

        <p style="margin-top:18px;color:#666;font-size:12px">
          Sent from ThreatVet contact form.
        </p>
      </div>
    `;

    // Confirmation email to the sender
    const confirmHtml = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111">
        <h2>Thanks, ${esc(name)}!</h2>
        <p>We’ve received your message and our team will get back to you shortly.</p>
        <p><strong>Summary</strong></p>
        <ul>
          <li><strong>Email:</strong> ${esc(email)}</li>
          ${company ? `<li><strong>Company:</strong> ${esc(company)}</li>` : ""}
          ${phone ? `<li><strong>Phone:</strong> ${esc(phone)}</li>` : ""}
        </ul>
        <p style="white-space:pre-wrap;border:1px solid #eee;background:#fafafa;padding:10px;border-radius:8px;">
          ${esc(message)}
        </p>
        <p style="margin-top:18px;color:#666;font-size:12px">— ThreatVet Team</p>
      </div>
    `;

    // Send to ThreatVet inbox
    await resend.emails.send({
      from,
      to,
      ...(bcc ? { bcc } : {}),
      subject,
      html,
      replyTo: email, // reply goes back to the user
    });

    // Send confirmation to the user
    await resend.emails.send({
      from,
      to: email,
      subject: "We received your message — ThreatVet",
      html: confirmHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("CONTACT_API_ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
