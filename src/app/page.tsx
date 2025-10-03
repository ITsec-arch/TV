"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Brain, Cloud, Shield, Target, Zap } from "lucide-react";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  const problems = [
    { icon: AlertTriangle, title: "Patching Delays", desc: "Critical vulns stay unpatched for weeks—known exploits remain viable." },
    { icon: Brain,          title: "AI/ML Risks",    desc: "Prompt injection, data leakage, adversarial ML widen attack paths." },
    { icon: Cloud,          title: "Cloud Drift",    desc: "Multi-cloud misconfigurations and identity sprawl create gaps." },
  ];
  const solutions = [
    { icon: Shield, title: "Vulnerability Management",
      desc: "Continuous VAPT and risk-based remediation to shrink exposure windows." },
    { icon: Target, title: "AI/ML Security Testing",
      desc: "Red-teaming LLMs/models for prompt injection, data exfiltration, jailbreaks." },
    { icon: Zap, title: "Continuous Red Teaming",
      desc: "Human-led adversary emulation to validate SOC readiness continuously." },
  ];

  return (
    <div className="min-h-screen">
      <section className="px-6 py-24 text-center bg-gradient-to-b from-[color:var(--primary)]/10 to-transparent">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl text-5xl font-bold"
        >
          ThreatVet — Cybersecurity 360°
        </motion.h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
          Proactive, AI-driven security across offensive, defensive, and strategic domains.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-xl border px-5 py-3 bg-primary/20 border-primary/40 text-primary hover:bg-primary/30"
          >
            Request a Security Review
          </Link>
          <Link
            href="/services"
            className="rounded-xl border px-5 py-3 border-accent/40 text-accent hover:bg-accent/10"
          >
            Explore Services
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-6 text-2xl font-semibold">The Challenge We Solve</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((p, i) => (
            <ServiceCard key={i} icon={p.icon} title={p.title} description={p.desc} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-6 text-2xl font-semibold">Our Solution</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((s, i) => (
            <ServiceCard key={i} icon={s.icon} title={s.title} description={s.desc} />
          ))}
        </div>
      </section>
    </div>
  );
}
