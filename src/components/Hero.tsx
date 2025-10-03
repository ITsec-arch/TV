"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-bg" />
      <div className="grid-overlay" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-6xl font-bold leading-tight"
        >
          Cybersecurity <span className="bg-gradient-to-b from-primary to-accent bg-clip-text text-transparent">360°</span> for
          Modern Enterprises
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-5 max-w-3xl text-lg text-gray-300"
        >
          ThreatVet blends continuous offensive testing, DevSecOps integration, and threat intelligence to
          reduce risk—fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-9 flex justify-center gap-4"
        >
          <Link
            href="/contact"
            className="rounded-2xl border px-6 py-3 bg-primary/20 border-primary/40 text-primary hover:bg-primary/30 transition-colors"
          >
            Request a Security Review
          </Link>
          <Link
            href="/services"
            className="rounded-2xl border px-6 py-3 border-accent/40 text-accent hover:bg-accent/10 transition-colors"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* Trust row / logos */}
        <div className="mt-14 marquee">
          <div className="marquee-track text-gray-400">
            <span>• Zero-Trust Readiness</span>
            <span>• SOC Validation</span>
            <span>• Cloud Hardening</span>
            <span>• LLM Security</span>
            <span>• Risk-Based Patch</span>
            <span>• CI/CD AppSec</span>

            <span>• Zero-Trust Readiness</span>
            <span>• SOC Validation</span>
            <span>• Cloud Hardening</span>
            <span>• LLM Security</span>
            <span>• Risk-Based Patch</span>
            <span>• CI/CD AppSec</span>
          </div>
        </div>
      </div>
    </section>
  );
}

