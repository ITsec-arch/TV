"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError(null);

    const form = new FormData(e.currentTarget);

    // Basic client-side validation (HTML5 `required` still applies)
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const company = String(form.get("company") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();

    // Simple honeypot (hidden field). If filled, drop the submit.
    const hp = String(form.get("website") || "");
    if (hp) {
      setState("success"); // act as if it worked (don’t tip off bots)
      (e.target as HTMLFormElement).reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, phone, message }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send message. Please try again.");
      }

      setState("success");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err?.message || "Unexpected error");
      setState("error");
    }
  }

  return (
    <main className="soft-grid">
      {/* Hero */}
      <section className="px-6 pt-16 pb-6 md:pt-24 md:pb-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold glow">Get In Touch</h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-300">
          Ready to secure your digital future? Let’s discuss your cybersecurity needs.
        </p>
      </section>

      {/* Content */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {/* Left: Contact info */}
          <div className="rounded-2xl border border-primary/25 bg-[color:var(--secondary)] p-6">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-gray-300">info@threatvet.com</div>
                  <div className="text-xs text-gray-400">General inquiries & support</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-gray-300">+91 93453 40430</div>
                  <div className="text-xs text-gray-400">24/7 Emergency Hotline</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Locations</div>
                  <div className="text-gray-300">Chennai, India (HQ) • UAE • USA</div>
                  <div className="text-xs text-gray-400">Serving enterprises worldwide</div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-background/50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Business Hours</div>
                  <div className="text-sm text-gray-300">Monday – Sunday</div>
                </div>
                <div className="text-right font-semibold">24/7</div>
              </div>
              <p className="mt-3 text-sm text-primary">
                Round-the-clock security monitoring and incident response
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <form
            className="rounded-2xl border border-primary/25 bg-[color:var(--secondary)] p-6 space-y-4"
            onSubmit={onSubmit}
          >
            <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>

            {/* success & error banners */}
            {state === "success" && (
              <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2 text-green-300">
                <CheckCircle2 className="h-5 w-5" />
                <span>Thanks! We’ve received your message and emailed a confirmation.</span>
              </div>
            )}
            {state === "error" && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-300">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm text-gray-300">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-gray-300">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="company" className="text-sm text-gray-300">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm text-gray-300">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                  placeholder="+91 93453 40430"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm text-gray-300">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                placeholder="Tell us about your cybersecurity needs…"
              />
            </div>

            {/* Honeypot (hidden) */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
            />

            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] px-5 py-3 text-white transition hover:opacity-95 disabled:opacity-60"
              aria-label="Send Message"
            >
              <Send className="h-5 w-5" />
              {state === "loading" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
