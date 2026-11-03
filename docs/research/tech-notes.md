# ThreatVet v2 — Technical Notes

Version-accurate implementation guidance for the build pass. Pulled from current
knowledge of the installed versions and grounded in this repo's real config.

> **Context7 status:** the Context7 MCP needs OAuth before its doc tools
> (`resolve-library-id`, `get-library-docs`) are callable — run `/mcp` and select
> **claude.ai Context7**. This pass was written without it. Everything below is
> accurate for the pinned versions to the best of current knowledge, but the
> build pass should re-verify the **version-sensitive signatures flagged with
> ⚠︎** against Context7 once authenticated.

## Repo config — confirmed

- **Next.js** `15.5.4` (App Router, `--turbopack` for dev *and* build), **React**
  `19.1.0` / `react-dom` `19.1.0`, **TypeScript** `5`.
- **Tailwind** `4.1.14` via `@tailwindcss/postcss`. `globals.css` uses the
  correct v4 CSS-first model: `@import "tailwindcss"; @plugin
  "tailwindcss-animate"; @custom-variant dark (&:is(.dark *)); @theme inline {…}`.
- **Framer Motion** `12.23.22`. **Radix** primitives (accordion, dialog, label,
  navigation-menu, slot). **shadcn** "new-york", RSC on, `cssVariables: true`,
  css at `src/app/globals.css`, lucide icons. **Resend** `6.1.2` + `react-email`.
  **Zod** `4.1.11`. `tailwind-merge`, `clsx`, `class-variance-authority`.
- App Router files already present: `layout.tsx`, `page.tsx`, `globals.css`,
  `robots.ts`, `sitemap.ts`, `viewport.ts`, `icon.png`, `middleware.ts`
  (canonical www→apex redirect). Routes: `about`, `services`, `intelligence`,
  `contact`.
- Brand tokens today: `--background:#0b0b0b`, `--foreground:#fff`,
  `--primary:#ef4444`, `--accent:#f97316`, fonts Geist sans/mono.

### ⚠︎ Config issues to fix in the build pass
1. **Dead legacy Tailwind config.** `tailwind.config.mjs` is v3-style
   (`content` array + `plugins: [require("tailwindcss-animate")]`). In v4 nothing
   loads it unless `globals.css` has `@config "../../tailwind.config.mjs"`, which
   it does not — so it is vestigial, and its `require()` would throw under ESM if
   ever loaded. **Delete it** and keep the CSS-first `@theme` model (or, if a JS
   config is truly wanted, convert to ESM `import` and wire it with `@config`).
   Do not keep both.
2. **Redundant animate libraries.** Both `tailwindcss-animate` (dep) and
   `tw-animate-css` (devDep) are present; `globals.css` only `@plugin`s the
   former. Pick one.
3. **`autoprefixer` is redundant in v4.** Tailwind v4 handles vendor prefixing
   and `@import` inlining itself; `autoprefixer` in `postcss.config.mjs` can be
   removed unless something else needs it.
4. **Dark-mode tokens are identical for `:root` and `.dark`.** The site is
   effectively dark-only. If v2 stays dark-first that is fine — but then the
   `@custom-variant dark` + `.dark` scaffolding is unused ceremony; decide
   explicitly (dark-only vs real light theme).

---

## Next.js 15 — App Router

### Metadata API
- Static: `export const metadata: Metadata = {…}`. Dynamic: `export async
  function generateMetadata({ params }): Promise<Metadata>`.
- Set **`metadataBase`** once in `app/layout.tsx` so relative OG/canonical URLs
  resolve: `metadataBase: new URL("https://threatvet.com")`.
- **Canonical** via `alternates`:
  ```ts
  export const metadata: Metadata = {
    title: { default: "ThreatVet", template: "%s — ThreatVet" },
    description: "...",
    alternates: { canonical: "/" },          // per-page: "/services" etc.
    openGraph: { type: "website", url: "/", siteName: "ThreatVet", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image" },
  };
  ```
- **Viewport + themeColor** are their own export (already `viewport.ts` here):
  ```ts
  export const viewport: Viewport = { themeColor: "#0b0b0b", colorScheme: "dark" };
  ```

### Dynamic OG images — `next/og`
- File convention: `app/opengraph-image.tsx` (and optional `twitter-image.tsx`).
  Export `size`, `contentType`, `alt`, and a default async fn returning
  `ImageResponse`:
  ```tsx
  import { ImageResponse } from "next/og";
  export const size = { width: 1200, height: 630 };
  export const contentType = "image/png";
  export const alt = "ThreatVet";
  export default async function Image() {
    return new ImageResponse(( <div style={{/* flexbox only */}}>ThreatVet</div> ), { ...size });
  }
  ```
- ⚠︎ `ImageResponse` supports a **flexbox-only** subset of CSS (no grid). Custom
  fonts must be fetched as `ArrayBuffer` and passed via the `fonts` option.
  Route-based variant: `app/og/route.tsx` reading `searchParams` for per-page OG.

### sitemap.ts / robots.ts (already present — confirm signatures)
```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://threatvet.com";
  return ["", "/services", "/intelligence", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`, lastModified: new Date(),
    changeFrequency: "monthly", priority: p === "" ? 1 : 0.8,
  }));
}
```
```ts
// app/robots.ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" },
           sitemap: "https://threatvet.com/sitemap.xml",
           host: "https://threatvet.com" };
}
```
For many URLs, split with `generateSitemaps()`.

### Static generation & caching (Next 15 changes)
- App Router routes are **static by default** unless they use dynamic APIs.
  Force with `export const dynamic = "force-static"`; ISR with `export const
  revalidate = 3600`. A marketing site should be fully static/ISR.
- ⚠︎ **Next 15 breaking changes to know:**
  - `fetch()` is **no longer cached by default** — opt in with `cache:
    "force-cache"` or route-level config.
  - `cookies()`, `headers()`, `draftMode()`, and route `params` / `searchParams`
    are now **async** — you must `await` them (affects `middleware.ts`,
    `generateMetadata`, pages). Double-check existing `middleware.ts`.
  - `<Link>` prefetching and client router cache `staleTimes` defaults changed.
- Keep components Server Components by default; add `"use client"` only to
  interactive leaves (nav toggle, tabs, motion, the contact form).

---

## React 19 — patterns for a marketing site

- **Server Components default.** Data fetching and metadata happen on the server;
  ship minimal client JS.
- **Forms via Server Actions** (ideal for the Resend contact form):
  ```tsx
  // actions.ts  →  "use server"
  // form.tsx (client): const [state, action, pending] = useActionState(submit, initial)
  ```
  - `useActionState(fn, initialState)` ⚠︎ (this is the React 19 name; it replaced
    `useFormState`). Pair with `useFormStatus()` (from `react-dom`) for a pending
    submit button, and `useOptimistic()` for optimistic UI.
  - Validate with **Zod** inside the action; return typed field errors into
    `state` and render them with `aria-describedby` (see WCAG below).
- **`ref` is a plain prop** — `forwardRef` is no longer required for function
  components (simplifies shadcn-style wrappers).
- **`use()`** can read a promise/context during render (Suspense-friendly).
- React 19 can hoist `<title>`/`<meta>`/`<link>`, but in App Router **prefer the
  Next Metadata API** — don't mix the two for the same tags.
- Context can render as `<MyContext>` directly (provider shorthand).

---

## Tailwind v4 — CSS-first

- `@import "tailwindcss";` replaces the old three `@tailwind` directives (repo is
  already correct).
- **Tokens generate utilities** via `@theme`. `@theme inline` (repo's choice)
  references existing CSS vars so tokens follow `:root`/`.dark`. Define brand
  scales as `--color-*`, type as `--font-*`, radius as `--radius-*`, etc.:
  ```css
  @theme {
    --color-brand: #ef4444;
    --font-display: "...", sans-serif;
    --radius-card: 0.75rem;
  }
  ```
  → yields `bg-brand`, `font-display`, `rounded-card`.
- **No `tailwind.config.js` needed.** v4 auto-detects content; there is no
  `content` array. To load a legacy JS config use `@config "..."`. (See config
  fix #1 above.)
- **Dark mode:** default is `prefers-color-scheme`. For class-based toggling use
  `@custom-variant dark (&:is(.dark *))` — repo already has it.
- v4 niceties to use: colors in **OKLCH** / P3, **container queries** built in
  (`@container`, `cq` units), `@utility` for custom utilities, `@variant`,
  `@starting-style` for enter animations, native 3D transforms.
- PostCSS: only `@tailwindcss/postcss` is required with Next 15 + Turbopack
  (drop `autoprefixer`, per config fix #3).

---

## Framer Motion 12 — scroll reveal + reduced motion

- Motion components are **client-only** → the file needs `"use client"`. Import
  from `framer-motion` (v12 is also published as the `motion` package; either
  import path works, don't mix within a file). ⚠︎ confirm the import path your
  build settles on.
- **Scroll-triggered reveal (the ONE orchestrated moment, not every section):**
  ```tsx
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  />
  ```
- **Scroll-linked (hero/parallax):** `const { scrollYProgress } = useScroll();`
  then `useTransform(scrollYProgress, [0,1], [...])`.
- **Reduced motion (required):**
  - Global: wrap the app in `<MotionConfig reducedMotion="user">`.
  - Local: `const reduce = useReducedMotion();` and drop transforms / shorten
    duration when `reduce` is true. Never convey information by motion alone.
- **Bundle discipline:** `LazyMotion` + `domAnimation` features with the `m`
  component to cut client JS on a marketing site.
- `AnimatePresence` for exit (mobile menu, dialog). Radix Dialog/Accordion can be
  wrapped, but prefer Radix's own data-state CSS transitions for simple cases.

---

## Structured data (JSON-LD)

Inject per page in a Server Component; no client JS needed:
```tsx
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
```

- **ProfessionalService** (home / about — subtype of LocalBusiness):
  ```jsonc
  { "@context":"https://schema.org", "@type":"ProfessionalService",
    "name":"ThreatVet", "url":"https://threatvet.com",
    "image":"https://threatvet.com/opengraph-image",
    "description":"Offensive security & threat intelligence.",
    "serviceType":["Penetration Testing","Threat Intelligence","Red Teaming"],
    "areaServed":"Worldwide", "telephone":"...",
    "address":{ "@type":"PostalAddress", "addressCountry":"..." },
    "sameAs":["https://www.linkedin.com/company/...","https://x.com/..."] }
  ```
- **SoftwareApplication** (if a product/platform is offered):
  ```jsonc
  { "@context":"https://schema.org", "@type":"SoftwareApplication",
    "name":"...", "applicationCategory":"SecurityApplication",
    "operatingSystem":"Web",
    "offers":{ "@type":"Offer", "price":"0", "priceCurrency":"USD" } }
  ```
- **Course** (training/education). ⚠︎ Google's Course rich result now expects a
  **`hasCourseInstance`** with mode + offers, not just name/provider:
  ```jsonc
  { "@context":"https://schema.org", "@type":"Course",
    "name":"...", "description":"...",
    "provider":{ "@type":"Organization", "name":"ThreatVet",
                 "sameAs":"https://threatvet.com" },
    "hasCourseInstance":{ "@type":"CourseInstance",
      "courseMode":"online",
      "courseWorkload":"PT10H",
      "offers":{ "@type":"Offer","price":"...","priceCurrency":"USD",
                 "category":"Paid" } } }
  ```
- Also worth adding: an **Organization** node (logo, sameAs) and a **WebSite**
  node with `potentialAction` SearchAction if the site has search. Validate every
  block in Google's Rich Results Test and schema.org validator before ship.

---

## Technical SEO 2026

- **Core Web Vitals "good" thresholds** (budget these at design time): LCP
  ≤ **2.5s**, INP ≤ **200ms** (INP replaced FID in 2024), CLS ≤ **0.1**. Static
  rendering + `next/font` (no layout shift) + sized images via `next/image`
  (explicit width/height or `fill` + aspect ratio) protects LCP/CLS; keep client
  JS small and defer non-critical motion for INP.
- **Structured data** (above) for eligibility in rich results.
- **Internal linking:** hub-and-spoke — pillar pages (Services, Intelligence)
  linking to specific technique/finding pages with **descriptive anchor text**
  (not "learn more"). Keep important pages ≤3 clicks from home.
- **Canonicalization:** keep the www→apex redirect (already in `middleware.ts`)
  and set `alternates.canonical` per page to the apex URL to avoid duplicates.
- **Low-competition technique keywords:** build intent-specific, genuinely deep
  pages around concrete techniques/questions a security buyer searches
  ("how to test for <X>", "<technique> assessment"). Long-tail + real depth +
  internal links from pillars + matching intent is what ranks where competition
  is low. Demonstrate **E-E-A-T** (named authors, credentials, dates) — security
  content is trust-sensitive.
- Per-page unique `<title>`/description, OG + Twitter cards, XML sitemap, clean
  robots, fast TTFB (static/ISR on Vercel).

---

## WCAG 2.2 AA checklist

New-in-2.2 criteria that affect this build (plus the perennials):

**Navigation**
- Landmarks: one `<nav aria-label>` per nav region; a visible **skip link** to
  main content; `<main>` present.
- **2.4.7 Focus Visible** and **2.4.11 Focus Not Obscured (AA, new)** — a sticky
  header must not hide the focused element; add `scroll-margin-top` and ensure
  focus rings are never clipped.
- Full keyboard operability; current-page indication not by color alone.
- Mega-menu (Radix `navigation-menu`): correct ARIA, `Esc` closes, focus
  management, operable by keyboard — Radix handles most; verify.

**Accordions (Radix Accordion)**
- Header is a `<button>` with `aria-expanded` + `aria-controls` (Radix default);
  visible focus; don't rely on color/icon rotation alone to signal state;
  respect reduced motion on the open/close transition.

**Forms (contact / Resend)**
- Every control has a programmatic label (`<label htmlFor>` / Radix `Label`).
- **3.3.1 / 3.3.3** error identification + suggestion; tie messages with
  `aria-describedby`, set `aria-invalid`; don't signal errors by color alone.
- **3.3.7 Redundant Entry (new):** don't re-ask info already provided in the
  flow. **3.3.8 Accessible Authentication (new):** if any auth/gate exists, no
  cognitive-function test (no puzzle/transcription) as the only method.
- **2.5.8 Target Size (Minimum, new):** interactive targets ≥ **24×24 CSS px**
  (or adequate spacing) — check icon buttons and small links.
- Use `autocomplete` attributes; associate hints.

**Animated content (the Vanta-style stat ticker, carousels, motion reveals)**
- **2.2.2 Pause/Stop/Hide:** anything that auto-moves/auto-updates for >5s needs
  a pause control. **2.3.1:** no more than three flashes/sec. Respect
  `prefers-reduced-motion` (wire it through `MotionConfig`/`useReducedMotion`).
- Don't convey meaning by motion/animation alone.

**Color & contrast**
- **1.4.3** text ≥ 4.5:1 (large text ≥ 3:1); **1.4.11** UI components/graphics
  ≥ 3:1. ⚠︎ **Red `#ef4444` on near-black `#0b0b0b`** is borderline for body
  text — verify and, if short, reserve pure red for large text / accents / icons
  and use a lighter tint for small text. Never use red/green state as the sole
  signal (color-blind users).
- Note: WCAG 2.2 **removed 4.1.1 Parsing** (obsolete) — no action needed.

Tooling: axe DevTools / Lighthouse / Playwright-axe in CI; manual keyboard pass;
test with `prefers-reduced-motion` and forced dark.
