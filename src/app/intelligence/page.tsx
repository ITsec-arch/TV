"use client";

import { motion } from "framer-motion";
import {
  Brain, Shield, Eye, Activity, Globe, Database, Zap, LineChart, Target, Layers,
} from "lucide-react";

type KPI = { label: string; value: string };
type Card = { icon: React.ReactNode; title: string; text: string };
type Source = { title: string; bullets: string[] };
type Step = { n: number; title: string; text: string };

const kpis: KPI[] = [
  { label: "Threat Indicators", value: "100M+" },
  { label: "Data Sources", value: "50+" },
  { label: "Detection Time", value: "<5min" },
  { label: "Accuracy Rate", value: "99.8%" },
];

const capabilities: Card[] = [
  { icon: <Globe className="h-6 w-6" />, title: "Global Monitoring", text: "24/7 surveillance of threats across regions & industries." },
  { icon: <Target className="h-6 w-6" />, title: "Threat Actor Profiling", text: "Deep analysis of APT groups, TTPs and procedures." },
  { icon: <Eye className="h-6 w-6" />, title: "Dark Web Intelligence", text: "Underground monitoring for credentials & attack chatter." },
  { icon: <LineChart className="h-6 w-6" />, title: "Predictive Analytics", text: "ML-driven forecasting of emerging risks & vectors." },
];

const sources: Source[] = [
  {
    title: "Commercial Feeds",
    bullets: [
      "Threat intel vendors",
      "Security research firms",
      "Vulnerability databases",
      "Malware repositories",
    ],
  },
  {
    title: "Open Source",
    bullets: [
      "Public CVE databases",
      "Security blogs & reports",
      "GitHub threat repos",
      "Community forums",
    ],
  },
  {
    title: "Proprietary",
    bullets: [
      "ThreatVet honeypots",
      "Client telemetry",
      "Red team findings",
      "Incident response data",
    ],
  },
];

const steps: Step[] = [
  { n: 1, title: "Collection", text: "Aggregate data from 50+ sources." },
  { n: 2, title: "Enrichment", text: "Contextualize with additional signals." },
  { n: 3, title: "Analysis", text: "ML pattern recognition & correlations." },
  { n: 4, title: "Prioritization", text: "Risk-ranked threats mapped to assets." },
  { n: 5, title: "Action", text: "Playbooks, alerts & detections." },
];

export default function Intelligence() {
  return (
    <main className="soft-grid">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold glow">Threat Intelligence</h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-300">
          Stay ahead of threats with AI-powered intelligence and real-time monitoring.
        </p>
      </section>

      {/* PLATFORM PANEL + KPIs */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-[color:var(--primary)]/10 to-[color:var(--accent)]/10 p-6 md:p-8">
          <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-semibold">
            <Brain className="h-7 w-7 text-primary" />
            ThreatVet Intelligence Platform
          </div>
          <p className="mx-auto mt-3 max-w-3xl text-center text-gray-300">
            Our AI-driven platform aggregates global data, analyzes patterns, and delivers actionable insights in real time.
          </p>

          <div className="mx-auto mt-6 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-2xl border border-primary/20 bg-[color:var(--secondary)]/60 p-4 text-center"
              >
                <div className="text-2xl font-bold text-[color:var(--accent)]">{k.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-gray-300">{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <h2 className="text-3xl font-bold text-center">Intelligence Capabilities</h2>
        <p className="mt-2 text-center text-gray-300">Comprehensive threat monitoring and analysis</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6 card-tilt"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                {c.icon}
              </div>
              <div className="text-lg font-semibold">{c.title}</div>
              <p className="mt-1 text-sm text-gray-300">{c.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* DATA SOURCES */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <h2 className="text-3xl font-bold text-center">Intelligence Data Sources</h2>
        <p className="mt-2 text-center text-gray-300">Aggregated from the world’s most trusted security feeds</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {sources.map((s) => (
            <div key={s.title} className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                {s.title === "Commercial Feeds" ? <Shield className="h-5 w-5" /> :
                 s.title === "Open Source" ? <Database className="h-5 w-5" /> :
                 <Zap className="h-5 w-5" />}
              </div>
              <div className="text-lg font-semibold">{s.title}</div>
              <ul className="mt-3 grid gap-2 text-sm text-gray-300">
                {s.bullets.map((b) => <li key={b}>• {b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <h2 className="text-3xl font-bold text-center">How Our Intelligence Works</h2>
        <p className="mt-2 text-center text-gray-300">From data collection to actionable insights</p>

        <div className="mt-8 grid gap-6 md:grid-cols-5">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6">
              <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-white text-sm font-semibold">
                {s.n}
              </div>
              <div className="font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-gray-300">{s.text}</p>
              {/* connector */}
              {s.n !== steps.length && (
                <div className="pointer-events-none absolute right-[-12px] top-1/2 hidden translate-y-[-50%] md:block">
                  <div className="h-1 w-6 rounded-full bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WHY STRIP */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-[color:var(--primary)]/10 to-[color:var(--accent)]/10 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Why ThreatVet Intelligence?</h2>
          <p className="mt-2 text-center text-gray-300">Transform raw threat data into strategic security decisions</p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <WhyCard icon={<Zap className="h-6 w-6" />} title="Real-Time Alerts" text="Instant notifications for critical threats relevant to your infrastructure." />
            <WhyCard icon={<Activity className="h-6 w-6" />} title="Proactive Defense" text="Anticipate attacks before they happen with predictive modeling." />
            <WhyCard icon={<Target className="h-6 w-6" />} title="Targeted Intelligence" text="Industry- and asset-specific feeds tuned to your environment." />
          </div>
        </div>
      </section>
    </main>
  );
}

/* small presentational components */
function WhyCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)]/70 p-6 text-center">
      <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-1 text-sm text-gray-300">{text}</p>
    </div>
  );
}
