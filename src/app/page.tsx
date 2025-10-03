"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Target,
  Zap,
  Cloud,
  Brain,
  Lock,
  TrendingUp,
  Eye,
  Server,
  FileSearch,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

type Problem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

type Pillar = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
};

type Value = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const problems: Problem[] = [
  {
    icon: AlertTriangle,
    title: "Patching Delays",
    description:
      "Critical vulnerabilities remain unpatched for weeks, leaving systems exposed to known exploits.",
  },
  {
    icon: Brain,
    title: "AI/ML Risks",
    description:
      "LLMs face prompt injection, data leakage, and adversarial attacks that bypass traditional testing.",
  },
  {
    icon: Cloud,
    title: "Cloud Misconfigurations",
    description:
      "Complex multi-cloud estates create security gaps and ongoing compliance challenges.",
  },
];

const pillars: Pillar[] = [
  {
    icon: Target,
    title: "Offensive Security",
    description:
      "Proactive hunting & penetration testing that finds issues before adversaries do.",
    color: "from-[color:var(--primary)] to-[color:var(--accent)]",
  },
  {
    icon: Shield,
    title: "Defensive Security",
    description:
      "Hardened architectures, zero-trust patterns, and DevSecOps automation.",
    color: "from-[color:var(--primary)]/75 to-[color:var(--primary)]/50",
  },
  {
    icon: Brain,
    title: "Strategic Intelligence",
    description:
      "AI-powered intel and data-backed roadmaps aligned to business outcomes.",
    color: "from-[color:var(--accent)] to-[color:var(--primary)]",
  },
];

const values: Value[] = [
  {
    icon: Shield,
    title: "360° Coverage",
    description:
      "Lifecycle management from assessment to remediation—on one platform.",
  },
  {
    icon: Brain,
    title: "AI-Driven Testing",
    description:
      "Faster detection and predictive analytics with intelligent automation.",
  },
  {
    icon: TrendingUp,
    title: "Business-Aligned ROI",
    description:
      "Security tied to KPIs, budget clarity, and measurable outcomes.",
  },
];

export default function HomePage() {
  return (
    <div className="soft-grid">
      {/* HERO */}
      <section className="relative min-h-[82vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden">
        {/* Brand auras */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-[-6rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(closest-side, var(--primary) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[-6rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(closest-side, var(--accent) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-primary">
              Cybersecurity 360°
            </div>

            <h1 className="mt-6 text-5xl font-extrabold md:text-7xl leading-tight">
              <span className="block glow">ThreatVet</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--primary)] via-white to-[color:var(--accent)]">
                Guardians of your digital realm
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg md:text-xl text-gray-300">
              Proactive, AI-driven security for modern enterprises.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* WORKING CTA → /contact */}
              <Link
                href="/contact"
                prefetch
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] px-6 py-3 text-white shadow-lg transition hover:opacity-95"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center rounded-xl border border-primary/40 px-6 py-3 text-white/90 hover:bg-primary/10 transition"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              The Challenge We Solve
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-gray-300">
              Threats evolve daily. We counter them with automation, intelligence,
              and continuous testing.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative rounded-2xl border border-primary/25 bg-[color:var(--secondary)]/80 p-6"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
                <div className="text-lg font-semibold">{p.title}</div>
                <p className="mt-2 text-gray-300">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 360 SOLUTION */}
      <section className="bg-gradient-to-b from-transparent to-[color:var(--primary)]/5 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Our 360° Solution</h2>
            <p className="mx-auto mt-3 max-w-3xl text-gray-300">
              Offensive, defensive, and strategic security—delivered as one platform.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-[color:var(--secondary)] p-6"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                />
                <div className="relative">
                  <div
                    className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white`}
                  >
                    <s.icon className="h-7 w-7" />
                  </div>
                  <div className="text-2xl font-bold">{s.title}</div>
                  <p className="mt-2 text-gray-300">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFENSIVE SERVICES */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Offensive Security Services
            </h2>
            <p className="mt-2 max-w-3xl text-gray-300">
              Proactive identification and elimination of risk before adversaries
              strike.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <ServiceCard
              icon={FileSearch}
              title="Vulnerability Management"
              description="Full VAPT with risk-based prioritization and remediation acceleration."
              features={[
                "Automated scanning",
                "Risk-based prioritization",
                "Penetration testing",
                "Patch automation",
              ]}
            />
            <ServiceCard
              icon={Brain}
              title="AI/ML Model Security"
              description="Testing for LLM prompt injection, adversarial and data-leakage vectors."
              features={[
                "Prompt-injection testing",
                "Adversarial attacks",
                "Poisoning detection",
                "Model hardening",
              ]}
            />
            <ServiceCard
              icon={Eye}
              title="Continuous Red Teaming"
              description="Human-led emulation to validate controls under real-world attack paths."
              features={[
                "Real-world simulation",
                "Social engineering",
                "Physical assessment",
                "Purple team exercises",
              ]}
            />
          </div>
        </div>
      </section>

      {/* DEFENSIVE SERVICES */}
      <section className="bg-gradient-to-b from-transparent to-[color:var(--accent)]/5 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Defensive Security Services
            </h2>
            <p className="mt-2 max-w-3xl text-gray-300">
              Resilience by design: secure patterns, automation, and continuous
              assurance.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <ServiceCard
              icon={Lock}
              title="Application Security"
              description="DevSecOps integration and CI/CD security automation for safe delivery."
              features={[
                "SAST/DAST integration",
                "Container security",
                "API testing",
                "Secure code review",
              ]}
            />
            <ServiceCard
              icon={Cloud}
              title="Cloud Architecture Reviews"
              description="Security assessments for AWS/Azure/GCP landing zones and controls."
              features={[
                "Multi-cloud security",
                "IAM policy review",
                "Network segmentation",
                "Compliance validation",
              ]}
            />
            <ServiceCard
              icon={TrendingUp}
              title="Strategy Consulting"
              description="AI-assisted roadmaps aligned to business KPI & budget impact."
              features={[
                "Maturity assessment",
                "Strategic roadmap",
                "Budget optimization",
                "Executive reporting",
              ]}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS – brand-aligned red/ember cards */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold">How ThreatVet Works</h2>
            <p className="mx-auto mt-3 max-w-3xl text-gray-300">
              Continuous intelligence, client-specific testing, and automated
              response.
            </p>
          </motion.div>

          <div className="relative grid gap-6 md:grid-cols-2">
            {/* Data Intelligence */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-2xl border border-[color:var(--primary)]/35 bg-gradient-to-br from-[color:var(--primary)]/12 to-[color:var(--accent)]/10 p-6"
            >
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <Brain className="h-7 w-7 text-[color:var(--primary)]" />
                ThreatVet Data Intelligence
              </h3>
              <ol className="space-y-4">
                {[
                  "Global threat data aggregation",
                  "AI-powered pattern recognition",
                  "Vulnerability database updates",
                  "Signature & behavior analysis",
                  "Threat actor tracking",
                ].map((t, i) => (
                  <li key={t} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--primary)]/50 bg-[color:var(--primary)]/20 text-[color:var(--primary)] font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-gray-200">{t}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Client Scanning */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-2xl border border-[color:var(--primary)]/35 bg-gradient-to-br from-[color:var(--accent)]/12 to-[color:var(--primary)]/10 p-6"
            >
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <Zap className="h-7 w-7 text-[color:var(--accent)]" />
                Client Security Scanning
              </h3>
              <ol className="space-y-4">
                {[
                  "Infrastructure assessment",
                  "Application security testing",
                  "Cloud configuration review",
                  "Compliance gap analysis",
                  "Custom remediation plans",
                ].map((t, i) => (
                  <li key={t} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--primary)]/50 bg-[color:var(--primary)]/20 text-[color:var(--primary)] font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-gray-200">{t}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-gradient-to-b from-transparent to-[color:var(--primary)]/5 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Why Choose ThreatVet</h2>
            <p className="mx-auto mt-3 max-w-3xl text-gray-300">
              Enterprise-grade security with measurable outcomes.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-[color:var(--secondary)] p-8 text-center"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-[color:var(--primary)]/8 to-[color:var(--accent)]/8" />
                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--primary)]/20 to-[color:var(--accent)]/20">
                    <v.icon className="h-10 w-10 text-[color:var(--primary)]" />
                  </div>
                  <div className="text-2xl font-bold">{v.title}</div>
                  <p className="mt-3 text-gray-300">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[color:var(--primary)]/20 to-[color:var(--accent)]/20 p-10 text-center"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color:var(--primary)]/10 to-[color:var(--accent)]/10" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold">
                Ready to Secure Your Digital Future?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-gray-200">
                Start with a comprehensive assessment and uncover vulnerabilities
                before attackers do.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                {/* WORKING CTA → /contact */}
                <Link
                  href="/contact"
                  prefetch
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] px-6 py-3 text-white shadow-lg transition hover:opacity-95"
                >
                  Schedule Consultation <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center rounded-xl border border-primary/40 px-6 py-3 text-white/90 hover:bg-primary/10 transition"
                >
                  View Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
