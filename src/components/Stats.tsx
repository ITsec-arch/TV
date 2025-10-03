"use client";

import { useEffect, useRef, useState } from "react";

function useCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

export default function Stats() {
  const vulns = useCounter(1200);
  const coverage = useCounter(92);
  const mttr = useCounter(48);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-3">
        <StatBox label="Vulns Identified / Q" value={vulns} suffix="+" />
        <StatBox label="Control Coverage" value={coverage} suffix="%" />
        <StatBox label="MTTR Improvement" value={mttr} suffix="hrs" />
      </div>
    </section>
  );
}

function StatBox({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6 text-center card-tilt">
      <div className="text-4xl font-bold text-primary">{value}{suffix}</div>
      <div className="mt-2 text-gray-300">{label}</div>
    </div>
  );
}

