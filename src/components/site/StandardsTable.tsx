/** A framework-to-coverage table. Reused across service pages. */
export function StandardsTable({
  rows,
  caption = "Standards and what we map to each",
  col1 = "Framework",
  col2 = "What we map to it",
}: {
  rows: { std: string; mapped: string }[];
  caption?: string;
  col1?: string;
  col2?: string;
}) {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="border-b border-line-strong">
          <th scope="col" className="py-3 pr-4 text-xs font-semibold text-fg-subtle">{col1}</th>
          <th scope="col" className="py-3 text-xs font-semibold text-fg-subtle">{col2}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((s) => (
          <tr key={s.std} className="border-b border-line align-top">
            <th scope="row" className="py-4 pr-4 text-sm font-medium text-fg">{s.std}</th>
            <td className="py-4 text-sm text-fg-muted">{s.mapped}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
