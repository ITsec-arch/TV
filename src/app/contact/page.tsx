import { Mail, Phone, MapPin, Send } from "lucide-react";

export const metadata = {
  title: "Contact — ThreatVet",
  description: "Reach the ThreatVet team for assessments, incidents, or partnerships.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="soft-grid section">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold glow">Get In Touch</h1>
          <p className="mt-4 text-lg text-gray-300">
            Ready to secure your digital future? Let’s discuss your cybersecurity needs.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section pt-0">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: contact info */}
          <div className="rounded-2xl border border-primary/20 bg-[color:var(--secondary)] p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-300 mb-6">
              Our team is available 24/7 for inquiries and emergency incidents.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl border border-primary/40 bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-300">info@threatvet.com</div>
                  <div className="text-xs text-gray-400">General inquiries & support</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl border border-primary/40 bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-gray-300">+91 93453 40430</div>
                  <div className="text-xs text-gray-400">24/7 Emergency Hotline</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl border border-primary/40 bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-gray-300">Chennai, India (HQ) • UAE • USA</div>
                  <div className="text-xs text-gray-400">Serving enterprises worldwide</div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-primary/20 bg-background/40 p-5">
                <div className="font-medium">Business Hours</div>
                <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-gray-400">Mon – Fri</div><div className="text-right">24/7</div>
                  <div className="text-gray-400">Sat – Sun</div><div className="text-right">24/7</div>
                </div>
                <div className="mt-3 text-sm text-[color:var(--accent)]">
                  Round-the-clock security monitoring and incident response
                </div>
              </div>
            </div>
          </div>

          {/* Right: form (static for now) */}
          <form className="rounded-2xl border border-primary/20 bg-[color:var(--secondary)] p-6">
            <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-gray-300">Full Name *</label>
                <input className="mt-2 w-full rounded-lg border border-primary/20 bg-background/40 px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--primary)]" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Email Address *</label>
                <input type="email" className="mt-2 w-full rounded-lg border border-primary/20 bg-background/40 px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--primary)]" placeholder="john@company.com" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Company</label>
                  <input className="mt-2 w-full rounded-lg border border-primary/20 bg-background/40 px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--primary)]" placeholder="Company Name" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Phone</label>
                  <input className="mt-2 w-full rounded-lg border border-primary/20 bg-background/40 px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--primary)]" placeholder="+91 93453 40430" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-300">Message *</label>
                <textarea rows={6} className="mt-2 w-full rounded-lg border border-primary/20 bg-background/40 px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--primary)]" placeholder="Tell us about your cybersecurity needs..." />
              </div>

              <button type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-white bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] hover:opacity-90 transition">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
