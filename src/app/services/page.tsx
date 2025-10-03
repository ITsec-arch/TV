"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Target, Brain, Bug, GlobeLock, LockKeyhole, Code2, Cloud, Settings2, GitBranch,
  Activity, Zap, Database, FileSearch, Siren, Building2, ArrowRight, Info, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type CatKey = "offensive" | "defensive" | "strategic";

type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  punch: string;
  bullets: string[];
};

type Category = {
  label: string;
  blurb: string;
  color: string; // tailwind utility for tinting the badge
  services: Service[];
};

const CATEGORIES: Record<CatKey, Category> = {
  offensive: {
    label: "Offensive Security",
    blurb: "Proactive threat hunting and adversary simulation.",
    color: "from-[color:var(--primary)] to-[color:var(--accent)]",
    services: [
      {
        icon: Bug,
        title: "Vulnerability Management (VAPT)",
        punch: "Reduce exploit windows with continuous testing + fix-first guidance.",
        bullets: [
          "Automated + manual assessments",
          "Risk-based patch prioritization",
          "Zero-day monitoring & reports",
          "Remediation verification",
        ],
      },
      {
        icon: Brain,
        title: "AI/ML & LLM Security Testing",
        punch: "Jailbreak, prompt-injection, data exfil—contained.",
        bullets: [
          "Model-in-the-loop red teaming",
          "Guardrail validation & evals",
          "PII/secret exfil checks",
          "Safety & abuse scenarios",
        ],
      },
      {
        icon: Target,
        title: "Continuous Red Teaming",
        punch: "Human-led attack simulation mapped to your detections.",
        bullets: [
          "Threat-driven scenarios",
          "Purple-team with SOC",
          "Breach/attack drills",
          "Executive breach sims",
        ],
      },
    ],
  },

  defensive: {
    label: "Defensive Security",
    blurb: "Hardened architecture and developer-first defenses.",
    color: "from-sky-500 to-cyan-400",
    services: [
      {
        icon: Code2,
        title: "Application Security (DevSecOps)",
        punch: "Shift-left controls built into CI/CD.",
        bullets: [
          "SAST/DAST/Secrets on PRs",
          "IaC & container scanning",
          "Dependency risk gates",
          "Secure coding enablement",
        ],
      },
      {
        icon: Cloud,
        title: "Cloud Architecture Reviews",
        punch: "AWS • Azure • GCP landing zones, locked down.",
        bullets: [
          "Least-privilege IAM",
          "Segmentation & network design",
          "Logging/monitoring baselines",
          "Serverless & K8s hardening",
        ],
      },
      {
        icon: Settings2,
        title: "Detection & Response Readiness",
        punch: "Actionable use-cases, tuned to your stack.",
        bullets: [
          "EDR/SIEM content packs",
          "Threat hunts & playbooks",
          "Tabletop exercises",
          "MTTD/MTTR improvements",
        ],
      },
    ],
  },

  strategic: {
    label: "Strategic Services",
    blurb: "Data-backed roadmaps aligned to business outcomes.",
    color: "from-violet-500 to-fuchsia-500",
    services: [
      {
        icon: FileSearch,
        title: "ThreatVet Data Intelligence",
        punch: "Fuse your findings & external intel into action.",
        bullets: [
          "Risk trending & exposure maps",
          "Asset/business context",
          "Exec dashboards & KPIs",
          "Prioritized 90-day plan",
        ],
      },
      {
        icon: Siren,
        title: "Ransomware Prevention",
        punch: "Reduce blast radius; rehearse recovery.",
        bullets: [
          "Control coverage mapping",
          "Backup/restore drills",
          "EDR/SIEM detections",
          "Incident playbooks",
        ],
      },
      {
        icon: Building2,
        title: "Security Strategy Consulting",
        punch: "Board-ready plans with measurable ROI.",
        bullets: [
          "Maturity assessments",
          "Investment prioritization",
          "Budget optimization",
          "Compliance guidance",
        ],
      },
    ],
  },
};

export default function ServicesPage() {
  const [active, setActive] = useState<CatKey>("offensive");
  const cat = useMemo(() => CATEGORIES[active], [active]);

  return (
    <main className="soft-grid">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold glow">Our Services</h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-300">
          Comprehensive cybersecurity solutions tailored for modern enterprises.
        </p>
      </section>

      {/* STICKY FILTER BAR */}
      <div className="sticky top-16 z-40 border-y border-primary/20 bg-[color:var(--background)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3">
          {(Object.keys(CATEGORIES) as CatKey[]).map((key) => {
            const c = CATEGORIES[key];
            const is = key === active;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`rounded-full px-4 py-2 text-sm transition 
                  border ${is ? "text-white border-transparent bg-gradient-to-r " + c.color : "text-gray-300 border-primary/30 hover:bg-white/5"}`}
              >
                {c.label}
              </button>
            );
          })}
          <div className="ml-auto hidden md:flex items-center gap-2 text-xs text-gray-400">
            <Info className="h-4 w-4" /> Scroll to explore—cards animate in.
          </div>
        </div>
      </div>

      {/* SECTION HEADER */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <span className={`inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary`}>
          {cat.label}
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
          {active === "offensive" && "Proactive Threat Hunting"}
          {active === "defensive" && "Robust Protection Mechanisms"}
          {active === "strategic" && "Intelligence-Driven Strategy"}
        </h2>
        <p className="mt-2 max-w-2xl text-gray-300">{cat.blurb}</p>
      </section>

      {/* SERVICE CARDS */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {cat.services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ADDITIONAL CAPABILITIES (ALWAYS VISIBLE) */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h3 className="text-2xl font-semibold">Additional Capabilities</h3>
        <p className="mt-1 text-gray-300">Extend coverage across data, response and compliance.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <MiniCard
            icon={Database}
            title="Data Intelligence"
            items={["Security metrics dashboard", "Risk quantification", "Compliance reporting", "Executive KPIs"]}
          />
          <MiniCard
            icon={Siren}
            title="Incident Response"
            items={["Breach containment", "Forensic analysis", "Recovery planning", "Post-incident review"]}
          />
          <MiniCard
            icon={GlobeLock}
            title="Compliance Management"
            items={["GDPR/HIPAA/PCI-DSS", "SOC 2 preparation", "ISO 27001", "Continuous compliance"]}
          />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-[color:var(--primary)]/10 to-[color:var(--accent)]/10 p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-semibold">Get a Risk Baseline in 7 Days</h3>
          <p className="mt-2 text-gray-300">
            We’ll ingest your current findings and deliver a prioritized 90-day plan.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-white
                       border border-primary/40 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] hover:opacity-90 transition"
          >
            Talk to an Expert <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h3 className="text-2xl font-semibold">FAQs</h3>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="q1">
            <AccordionTrigger>How do you measure success?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              We agree success metrics up front—risk reduction %, MTTD/MTTR improvements, patch-time, and control coverage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Do you integrate with our toolchain?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes. We support common clouds (AWS/Azure/GCP), CI/CD (GitHub/GitLab), and security stacks (CrowdStrike, Splunk, Datadog, etc.).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Can we start with a pilot?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Absolutely—a 4–6 week pilot targeting one business unit or application is typical to prove ROI before scale-out.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}

/* --- Presentational components --- */

function ServiceCard({ icon: Icon, title, punch, bullets }: Service) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6 card-tilt"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-gray-300">{punch}</p>
      <ul className="mt-4 grid gap-2 text-sm text-gray-300">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function MiniCard({
  icon: Icon, title, items,
}: { icon: React.ComponentType<{ className?: string }>; title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-lg font-semibold">{title}</div>
      <ul className="mt-2 grid gap-2 text-sm text-gray-300">
        {items.map((i) => <li key={i}>• {i}</li>)}
      </ul>
    </div>
  );
}
