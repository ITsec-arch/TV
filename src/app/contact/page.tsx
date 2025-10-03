"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
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

          {/* Right: Form (no external backend yet) */}
          <form
            className="rounded-2xl border border-primary/25 bg-[color:var(--secondary)] p-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We’ll get back to you shortly.");
            }}
          >
            <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-gray-300">Full Name *</label>
                <input
                  required
                  className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Email Address *</label>
                <input
                  required
                  type="email"
                  className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-gray-300">Company</label>
                <input
                  className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Phone</label>
                <input
                  className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                  placeholder="+91 93453 40430"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300">Message *</label>
              <textarea
                required
                rows={6}
                className="mt-1 w-full rounded-xl bg-background/60 border border-primary/25 px-3 py-2 outline-none focus:border-primary/60"
                placeholder="Tell us about your cybersecurity needs…"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] px-5 py-3 text-white transition hover:opacity-95"
              aria-label="Send Message"
            >
              <Send className="h-5 w-5" />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
