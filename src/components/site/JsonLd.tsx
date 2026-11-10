/** Server-rendered JSON-LD. Pass a schema.org object (or array of them). */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is app-authored, not user input. Escape "<" anyway so a value
      // could never break out of the script with "</script>".
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
