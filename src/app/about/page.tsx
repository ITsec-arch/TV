"use client";

import { Building2, Shield, Target, Users, Globe, MapPin, Zap, CheckCircle2 } from "lucide-react";

type Value = { icon: React.ReactNode; title: string; text: string };
type Metric = { value: string; label: string };
type Capability = { icon: React.ReactNode; title: string; text: string };
type Office = { country: string; city: string; role: string; blurb: string };

const values: Value[] = [
  { icon: <Target className="h-6 w-6" />, title: "Proactive Protection", text: "We identify and reduce risk before attackers can exploit it." },
  { icon: <Zap className="h-6 w-6" />, title: "Innovation First", text: "AI-assisted analysis and automation to stay ahead of evolving threats." },
  { icon: <Users className="h-6 w-6" />, title: "Client Partnership", text: "Security strategies aligned to business outcomes and ROI." },
];

const metrics: Metric[] = [
  { value: "500+", label: "Clients Protected" },
  { value: "10M+", label: "Threats Blocked" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Security Monitoring" },
];

const capabilities: Capability[] = [
  { icon: <Globe className="h-5 w-5" />, title: "Global Threat Intelligence", text: "Real-time monitoring of global threat landscapes with AI-powered analysis." },
  { icon: <Shield className="h-5 w-5" />, title: "Certified Professionals", text: "CISSP, CEH, OSCP and cloud-certified experts with decades of experience." },
  { icon: <Shield className="h-5 w-5" />, title: "Compliance Excellence", text: "Deep expertise in GDPR, HIPAA, PCI-DSS, SOC 2, and ISO 27001." },
  { icon: <Zap className="h-5 w-5" />, title: "Rapid Response", text: "Incident response team ready to deploy within hours of detection." },
];

const offices: Office[] = [
  {
    country: "India",
    city: "Chennai",
    role: "Headquarters (Main)",
    blurb: "Security operations, R&D, red/purple teaming, and global program delivery.",
  },
  {
    country: "United Arab Emirates",
    city: "UAE",
    role: "Regional Office",
    blurb: "GCC customer delivery, executive advisory, and compliance engagements.",
  },
  {
    country: "United States",
    city: "USA",
    role: "Regional Office",
    blurb: "North America customer success, incident response, and partnerships.",
  },
];

export default function AboutPage() {
  return (
    <main className="soft-grid">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold glow">About ThreatVet</h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-300">
          We are the guardians of your digital realm, protecting enterprises with 360° cybersecurity excellence.
        </p>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-[color:var(--primary)]/10 to-[color:var(--accent)]/10 p-6 md:p-8 text-center">
          <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
          <p className="mx-auto mt-3 max-w-4xl text-gray-300">
            ThreatVet exists to eliminate the complexity of cybersecurity for modern enterprises. We combine
            offensive, defensive, and strategic security into a single, AI-driven platform that delivers
            measurable protection and business-aligned ROI.
          </p>
        </div>
      </section>

      {/* VALUES + METRICS */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <h3 className="text-3xl font-bold text-center">Our Core Values</h3>
        <p className="mt-2 text-center text-gray-300">Principles that guide everything we do</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                {v.icon}
              </div>
              <div className="text-lg font-semibold">{v.title}</div>
              <p className="mt-1 text-sm text-gray-300">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-primary/20 bg-[color:var(--secondary)]/60 p-4 text-center">
              <div className="text-2xl font-bold text-[color:var(--accent)]">{m.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-gray-300">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <h3 className="text-3xl font-bold text-center">Our Expertise</h3>
        <p className="mt-2 text-center text-gray-300">Industry-leading security capabilities</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                {c.icon}
              </div>
              <div className="text-lg font-semibold">{c.title}</div>
              <p className="mt-1 text-sm text-gray-300">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFICES / LOCATIONS */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <h3 className="text-3xl font-bold text-center">Our Offices</h3>
        <p className="mt-2 text-center text-gray-300">Global presence with a strong base in India</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {offices.map((o) => (
            <div key={o.city} className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold">{o.city}, {o.country}</div>
              <div className="text-xs text-primary font-medium mt-0.5">{o.role}</div>
              <p className="mt-2 text-sm text-gray-300">{o.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-[color:var(--primary)]/10 to-[color:var(--accent)]/10 p-6 md:p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Our Commitment to You</h3>
          <p className="mx-auto mt-3 max-w-4xl text-gray-300">
            Cybersecurity is a trust relationship. We commit to transparency, continuous improvement, and unwavering support
            for your organization’s security journey. Your digital assets are our top priority—we treat them with the same care as our own.
          </p>
        </div>
      </section>
    </main>
  );
}
