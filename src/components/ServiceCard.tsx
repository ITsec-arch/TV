"use client";

import { type ComponentType } from "react";

type Props = Readonly<{
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}>;

export default function ServiceCard({ icon: Icon, title, description, features }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-[color:var(--secondary)] p-6 transition-shadow hover:shadow-[0_0_0_1px] hover:shadow-primary/30">
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)]/0 to-[color:var(--accent)]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
      <div className="relative z-10">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-300">{description}</p>
        <ul className="mt-4 space-y-2 text-sm text-gray-300">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
