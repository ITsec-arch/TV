"use client";

import { Brain, Shield, Server, Radar, ArrowRight, Layers3, Network, Bug } from "lucide-react";
import { motion } from "framer-motion";

export default function Intelligence() {
  return (
    <main className="soft-grid">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold glow">ThreatVet Intelligence</h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-300">
          Fuse client scan data, threat actor tradecraft, and ransomware prevention patterns
          into <span className="text-primary font-medium">actionable remediation</span>.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-semibold">How it Works</h2>

        <div className="grid gap-6 lg:grid-cols-3">
          <FlowCard
            icon={<Layers3 className="h-5 w-5" />}
            title="Client Scanning Data"
            text="Aggregate findings from VAPT, SAST/DAST, cloud scans, and IAM reviews."
          />
          <Connector />
          <FlowCard
            icon={<Radar className="h-5 w-5" />}
            title="ThreatVet Data Intelligence"
            text="Normalize & correlate with external intel to prioritize real risk."
          />
          <Connector />
          <FlowCard
            icon={<Server className="h-5 w-5" />}
            title="Ransomware Prevention"
            text="Turn signals into controls, detections, and a 90-day action plan."
            highlight
          />
        </div>
      </section>

      {/* INTELLIGENCE CAPABILITIES */}
      <section className="relative mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-6 text-2xl font-semibold">Capabilities</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <CapCard
            icon={<Bug className="h-6 w-6" />}
            title="Attack Surface Mapping"
            points={[
              "External exposure inventory",
              "Shadow assets & misconfigs",
              "Exploitability signal"
            ]}
          />
          <CapCard
            icon={<Network className="h-6 w-6" />}
            title="Threat Actor Intel"
            points={[
              "Sector TTPs & IOCs",
              "Campaign tracking",
              "Dark-web & brand watch"
            ]}
          />
          <CapCard
            icon={<Brain className="h-6 w-6" />}
            title="AI/LLM Security"
            points={[
              "Prompt injection tests",
              "Data exfil & jailbreaks",
              "Guardrail validation"
            ]}
          />
          <CapCard
            icon={<Shield className="h-6 w-6" />}
            title="Ransomware Readiness"
            points={[
              "Control coverage map",
              "EDR/SIEM detections",
              "Backup/restore drills"
            ]}
          />
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-8 text-center">
          <h3 className="text-xl font-semibold">Get a Risk Baseline in 7 Days</h3>
          <p className="mt-2 text-gray-300">
            We’ll ingest your current findings and deliver a prioritized 90-day plan.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-white
                       border-primary/40 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] hover:opacity-90 transition"
          >
            Talk to an Expert <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

/* Cards */

function FlowCard({
  icon, title, text, highlight = false,
}: { icon: React.ReactNode; title: string; text: string; highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-3xl border p-6 card-tilt
        ${highlight
          ? "border-primary/30 bg-gradient-to-b from-[color:var(--primary)]/10 to-[color:var(--secondary)]"
          : "border-primary/20 bg-[color:var(--secondary)]"}`}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-1 text-sm text-gray-300">{text}</p>
    </motion.div>
  );
}

function Connector() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)]" />
    </div>
  );
}

function CapCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6 card-tilt"
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-lg font-semibold">{title}</div>
      <ul className="mt-2 grid gap-2 text-sm text-gray-300">
        {points.map((p) => <li key={p}>• {p}</li>)}
      </ul>
    </motion.div>
  );
}
