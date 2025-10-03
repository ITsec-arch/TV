"use client";
import { Shield, Target, Brain, Code, Cloud, TrendingUp, Eye, FileSearch, Server } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

export default function Services() {
  const offensive = [
    { icon: Shield, title: "Vulnerability Management (VAPT)", desc: "Reduce exploit windows with continuous assessment + patch guidance.", features: ["Automated + manual testing", "Risk scoring", "Executive reporting"] },
    { icon: Target, title: "Continuous Red Teaming", desc: "Persistent adversary emulation that exercises detections and response.", features: ["Threat scenarios", "Purple team", "SOC drills"] },
    { icon: Brain, title: "AI/ML Security Testing", desc: "LLM/model security for prompt injection, data leakage, and jailbreaks.", features: ["Model-in-the-loop", "Guardrail validation", "PII/secret exfil checks"] },
  ];
  const defensive = [
    { icon: Code, title: "Application Security (DevSecOps)", desc: "SAST/DAST + policies in CI/CD with developer-friendly workflows.", features: ["PR checks", "Secrets/IaC scan", "Fix-first guidance"] },
    { icon: Cloud, title: "Cloud Architecture Reviews", desc: "AWS/Azure/GCP landing zones: IAM, network, logging, monitoring.", features: ["Least privilege", "Segmentation", "Audit trails"] },
    { icon: TrendingUp, title: "Strategy Consulting", desc: "Board-ready, ROI-aligned security initiatives.", features: ["Maturity model", "Prioritized roadmap", "KPIs & outcomes"] },
  ];
  const strategic = [
    { icon: Eye, title: "Threat Actor Intelligence", desc: "Sector-specific TTPs, IOCs, and campaign tracking.", features: ["Brand/dark web watch", "Alerts", "Hunts"] },
    { icon: FileSearch, title: "ThreatVet Data Intelligence", desc: "Client scan data + external feeds → action plans.", features: ["Risk trending", "Exposure map", "Exec dashboards"] },
    { icon: Server, title: "Ransomware Prevention", desc: "Controls, detections, tabletop drills to reduce blast radius.", features: ["Coverage map", "Backup/restore drills", "EDR/SIEM use-cases"] },
  ];

  const Section = ({ title, items }: { title: string; items: any[] }) => (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((x, i) => (
          <ServiceCard key={i} icon={x.icon} title={x.title} description={x.desc} features={x.features} />
        ))}
      </div>
    </section>
  );

  return (
    <main className="min-h-screen pb-20">
      <Section title="Offensive" items={offensive} />
      <Section title="Defensive" items={defensive} />
      <Section title="Strategic" items={strategic} />
    </main>
  );
}

