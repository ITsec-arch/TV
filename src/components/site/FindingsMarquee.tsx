import { BrandLogo } from "@/components/site/BrandLogo";
import { vyraFindings, type FieldEntry } from "@/lib/field";

// Compact severity for the narrow cards: red by intensity, label always present.
const dotClass: Record<string, string> = {
  Critical: "bg-red",
  High: "bg-red",
  Medium: "bg-red/55",
  Low: "bg-fg-subtle",
  Info: "bg-fg-subtle",
};

/**
 * Premium rolling roster of real Vyra findings, in ThreatVet's own palette
 * (not any program's brand colour or logo artwork). Two rows roll in opposite
 * directions, pause on hover or focus, and hold still under reduced motion.
 * The content is fully present with no JS; the animation is pure CSS transform.
 */
function Card({ f, clone }: { f: FieldEntry; clone?: boolean }) {
  return (
    <div
      aria-hidden={clone || undefined}
      className={`mr-3 flex min-w-[14rem] max-w-[14rem] shrink-0 flex-col gap-4 rounded-xl border p-4 ${
        clone ? "marquee-clone " : ""
      }${f.highlight ? "glass edge-holo border-red/45" : "border-line bg-surface"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <BrandLogo org={f.org} slug={f.logo} size="sm" />
        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-fg-muted">
          <span className={`dot ${dotClass[f.severity]}`} aria-hidden /> {f.severity}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-accent-cool">via Vyra</span>
        {f.ref ? <span className="font-mono text-[11px] text-fg-subtle">{f.ref}</span> : null}
      </div>
    </div>
  );
}

function Row({ items, dir }: { items: FieldEntry[]; dir: "l" | "r" }) {
  return (
    <div className="marquee">
      <div className={`marquee-track ${dir === "l" ? "marquee-track-l" : "marquee-track-r"}`}>
        {items.map((f, i) => (
          <Card key={`a-${f.org}-${i}`} f={f} />
        ))}
        {items.map((f, i) => (
          <Card key={`b-${f.org}-${i}`} f={f} clone />
        ))}
      </div>
    </div>
  );
}

export function FindingsMarquee() {
  // The Criticals already lead in the spotlight row, so the roster rolls the rest.
  const roster = vyraFindings.filter((f) => !f.highlight);
  const half = Math.ceil(roster.length / 2);
  const rowA = roster.slice(0, half);
  const rowB = roster.slice(half);
  return (
    <div
      className="space-y-3"
      role="group"
      aria-label="Vulnerabilities Vyra reported through authorized bug-bounty and disclosure programs"
    >
      <Row items={rowA} dir="l" />
      <Row items={rowB} dir="r" />
    </div>
  );
}
