import { brandLogos } from "@/lib/brandLogos";

/**
 * A program's mark for the field roster: a monochrome CC0 glyph tinted to our
 * ink plus the name, or just the name when there is no license-clean glyph.
 * Full-colour brand lockups are deliberately avoided; this keeps the wall
 * cohesive and reads as factual disclosure, not a brand endorsement.
 */
export function BrandLogo({
  org,
  slug,
  size = "sm",
}: {
  org: string;
  slug?: string;
  size?: "sm" | "lg";
}) {
  const path = slug ? brandLogos[slug] : undefined;
  const icon = size === "lg" ? "h-5 w-5" : "h-[18px] w-[18px]";
  const label = size === "lg" ? "text-lg" : "text-sm";
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      {path ? (
        <svg viewBox="0 0 24 24" aria-hidden className={`${icon} shrink-0 fill-current text-fg`}>
          <path d={path} />
        </svg>
      ) : null}
      <span className={`truncate font-display ${label} font-semibold text-fg`}>{org}</span>
    </span>
  );
}
