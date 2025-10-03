export default function Marquee() {
  const items = ["AWS", "Azure", "GCP", "Kubernetes", "Okta", "CrowdStrike", "Splunk", "Datadog"];
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="rounded-2xl border border-primary/20 bg-[color:var(--secondary)] p-4">
        <div className="marquee">
          <div className="marquee-track">
            {items.concat(items).map((x, i) => (
              <div key={i} className="text-gray-300">{x}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

