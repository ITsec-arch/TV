import { cves, creditedThrough } from "@/lib/research";

/** Renders the credited CVE research. Reused on /research and service pages. */
export function ResearchList({ showCredit = true }: { showCredit?: boolean }) {
  return (
    <div>
      <ul className="divide-y divide-line border-y border-line">
        {cves.map((c) => (
          <li key={c.id} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <div className="font-mono text-sm text-fg">{c.id}</div>
            <div>
              <div className="text-sm font-medium text-fg">
                {c.product}, {c.type}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{c.summary}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs">
                <a
                  className="text-red-bright underline-offset-4 hover:underline"
                  href={c.nvdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NVD record
                </a>
                <a
                  className="text-red-bright underline-offset-4 hover:underline"
                  href={c.advisory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.advisory.label}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showCredit ? (
        <p className="mt-4 text-xs text-fg-subtle">Research credited through {creditedThrough}.</p>
      ) : null}
    </div>
  );
}
