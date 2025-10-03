"use client";

import { useState } from "react";
import { Shield, Target, Brain, Code, Cloud, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TabKey = "offensive" | "defensive" | "strategic";

const TABS: Record<TabKey, { title: string; icon: any; bullets: string[]; blurb: string }> = {
  offensive: {
    title: "Offensive",
    icon: Target,
    blurb: "Adversary simulation and exposure reduction through continuous testing.",
    bullets: [
      "Vulnerability Management (VAPT)",
      "Continuous Red Teaming",
      "LLM/Model Security Testing",
    ],
  },
  defensive: {
    title: "Defensive",
    icon: Code,
    blurb: "Bake security into delivery pipelines and cloud foundations.",
    bullets: [
      "AppSec in CI/CD (SAST/DAST, secrets, IaC)",
      "Cloud Architecture Security Reviews",
      "Incident Readiness & Purple-Team",
    ],
  },
  strategic: {
    title: "Strategic",
    icon: TrendingUp,
    blurb: "Board-aligned roadmaps and intelligence that drive ROI.",
    bullets: [
      "Threat Actor Intelligence",
      "Ransomware Prevention Guidance",
      "Risk & Maturity Roadmaps",
    ],
  },
};

export default function FeatureTabs() {
  const [tab, setTab] = useState<TabKey>("offensive");
  const ActiveIcon = TABS[tab].icon;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-[color:var(--secondary)] p-2">
        {Object.entries(TABS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setTab(key as TabKey)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-colors ${
              tab === key ? "bg-primary/20 text-primary border border-primary/40" : "hover:bg-white/5"
            }`}
          >
            <val.icon className="h-4 w-4" />
            {val.title}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6 card-tilt"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10">
              <ActiveIcon className="h-6 w-6 text-[color:var(--primary)]" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold">{TABS[tab].title} Security</h3>
            <p className="text-gray-300">{TABS[tab].blurb}</p>
            <ul className="mt-5 grid gap-2 text-sm text-gray-300">
              {TABS[tab].bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-6 sm:grid-cols-2">
          <InfoCard icon={Shield} title="360° Coverage" text="Offense + defense + strategy, continuously." />
          <InfoCard icon={Cloud} title="Cloud Native" text="AWS • Azure • GCP landing zones hardened." />
          <InfoCard icon={Brain} title="AI/LLM Ready" text="Guardrails, jailbreak testing, data exfil checks." />
          <InfoCard icon={Code} title="Developer-First" text="CI/CD gates & fix-first guidance." />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6 card-tilt">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
        <Icon className="h-5 w-5 text-[color:var(--primary)]" />
      </div>
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-1 text-sm text-gray-300">{text}</p>
    </div>
  );
}

