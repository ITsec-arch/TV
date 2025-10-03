import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const json = (await req.json()) as unknown;
    const { name, email, company, phone, message } = ContactSchema.parse(json);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO ?? "info@threatvet.com";
    const from =
      process.env.CONTACT_FROM ?? "ThreatVet <no-reply@threatvet.com>";

    const subject = `New inquiry from ${name}`;
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111">
        <h2>New Contact Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company ?? "-"}</p>
        <p><b>Phone:</b> ${phone ?? "-"}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap">${message}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo: email,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { ok: false, error: "MAIL_SEND_FAILED" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Contact API error:", err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "INVALID_INPUT", issues: err.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
