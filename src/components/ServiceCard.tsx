"use client";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

export default function ServiceCard({
  icon: Icon, title, description, features = [],
}: { icon: LucideIcon; title: string; description: string; features?: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="relative rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6 card-tilt"
    >
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-primary/40 bg-primary/10">
        <Icon className="h-7 w-7 text-[color:var(--primary)]" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4 text-gray-300">{description}</p>
      {features.length > 0 && (
        <ul className="space-y-2 text-sm text-gray-300">
          {features.map((f, i) => <li key={i}>• {f}</li>)}
        </ul>
      )}
    </motion.div>
  );
}

