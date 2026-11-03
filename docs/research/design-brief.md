# ThreatVet v2 — Design Brief

Research pass for the frontier-tier rebuild of threatvet.com. No site code was
written in this pass. This file is the reference the build pass follows.

- Branch: `feat/site-v2`
- Date: 2026-11-03
- Scope studied: live teardown of six security-vendor marketing sites, plus
  2026 B2B security / developer-tool design conventions and the specific
  "frontier vs template" visual tells.

## How this was researched (and its limits)

- **Text, structure, copy, nav:** pulled live with WebFetch (page → markdown)
  for each reference homepage, plus one interior page where reachable.
- **Palette + type ground truth:** pulled live by fetching each site's HTML and
  linked assets and reading the actual hex values, `@font-face`/`next/font`
  files, and `color-scheme` hints. These are real values from the shipped
  markup, not guesses. Where a value lives only in an external CSS variable we
  could not resolve, it is marked *inferred*.
- **Not captured this pass:** rendered screenshots. The Playwright MCP server is
  installed and connected, but its tools register on the next session restart,
  and the global `CLAUDE.md` rule forbids the `claude-in-chrome` tools, so no
  browser screenshots were taken here. The build pass will have live Playwright
  for visual QA of our own output and for any screenshot teardown desired.
- **Lacework:** `lacework.com` refused the connection. Lacework was acquired by
  Fortinet (2024) and folded into **FortiCNAPP**; there is no standalone
  frontier site left to study. It is dropped from the reference set and replaced
  in weight by the five live references below.

---

## What ThreatVet is (grounding the design)

Per the frontend-design skill, distinctive choices come from the subject, so we
fix the subject before proposing a look.

- **Subject:** an offensive-security and threat-intelligence firm. Existing App
  Router pages are `services`, `intelligence`, `about`, `contact`. Offerings
  read as penetration testing / red-team engagements plus a threat-intelligence
  practice.
- **Audience:** security buyers and practitioners — CISOs, security engineers,
  blue teams, procurement. Technical, skeptical, proof-driven. They read
  dark-mode tools all day.
- **Primary job of the site:** convert a skeptical technical buyer from "who is
  this" to "book an engagement," by proving credibility (findings, track record,
  certifications, research) faster than a template can.
- **Current brand (v1):** dark-only, near-black `#0b0b0b`, white text, red
  `#ef4444` primary, orange `#f97316` accent, Geist sans/mono. The red/black
  offensive-security palette is a legitimate, ownable starting point — the v2
  job is to make it feel deliberate and frontier, not to discard it.

---

## Reference teardowns

Each entry: palette (real hex), type (real files where resolvable), layout
rhythm, proof strategy, product presentation, motion, navigation.

### 1. Noma Security — https://noma.security
AI-agent security. The closest peer in subject matter (security + AI).

- **Palette (real):** dark, green-biased near-black base `#171b17` (dominant),
  off-whites `#fefefe` / `#f9f8f7`, muted greens `#4e5a4e` `#c0ccc0` `#ecf1ec`,
  and two pops: vermilion `#f9422f` and periwinkle-blue `#4d65ff`. `color-scheme`
  declares both light and dark. One saturated accent used sparingly over a
  tinted near-black — restrained.
- **Type:** Google Fonts (family not resolvable from markup; sans, no mono
  evident).
- **Hero:** text-led headline "Secure AI. Control your agents." + one subhead +
  a single "Get a Demo" button, then an immediate logo strip. A lime mascot
  ("chrome gnome") illustration carries personality instead of a product shot.
- **Proof:** "Trusted by over 10% of the Fortune 100" + 8 marquee logos
  (Pfizer, Dow, UiPath…); a dedicated Gartner Emerging-Market-Quadrant block
  ("Market Shaper"); a 14-tile partner grid (Google Cloud, AWS, Claude,
  CrowdStrike…); trust-center reference in footer.
- **Product:** illustrated mascots + one real flow diagram (agent → toolsets →
  MCP servers). A tabbed capability section numbered 01–04. Little real UI.
- **Motion:** restrained; a mock dashboard card near the hero.
- **Nav:** 5 mega-menus (Platform / Solutions / Products / Resources / Company),
  each with image-led promo cards, so the menu is a marketing surface. Persistent
  "Get a Demo".
- **Steal:** mascot-for-personality over stock product shots; one analyst block
  as the proof centerpiece; a single repeated primary CTA.

### 2. Checkmarx — https://checkmarx.com
Incumbent AppSec. Useful as the "corporate, not frontier" contrast.

- **Palette (real):** runs on **WordPress** — the default Gutenberg swatch set
  (`#ff6900`, `#00d084`, `#0693e3`, `#9b51e0`…) leaks into the markup, a template
  tell in itself. The actual brand color is maroon/crimson `#6d0d0f`.
- **Type:** only `font-family: inherit` in inline styles; real faces sit in
  external CSS. No distinctive type system surfaced.
- **Hero:** text-led, "AI Generates Code. Checkmarx One Secures It." + a product
  screenshot below. Stacked announcement banner + promo card above the hero
  (clutter).
- **Proof (strong):** "1,600+ enterprise customers," "800B+ lines of code
  analyzed monthly," "40%+ of the Fortune 500," Gartner MQ Leader + Forrester
  Wave Leader, SOC 2 Type II / ISO 27001 / FedRAMP badges, 9 testimonials.
- **Product:** tiered architecture diagram; a 7-stage SDLC flow; four pillar
  cards; six value blocks with icons.
- **Motion:** minimal.
- **Nav:** global nav not exposed in capture; in-page anchor "Explore the
  Platform."
- **Steal:** the density and specificity of proof numbers. **Avoid:** WordPress
  template chrome, stacked banners above the hero, generic icon-grid rhythm.

### 3. Chainguard — https://chainguard.dev
Secure-by-default open source / container security. Strong developer brand.

- **Palette (real):** `color-scheme: dark`. Near-black blue-biased base
  `#0d161c`, near-white violet-tinted `#f8f6fe`, a grey ramp
  `#7a7e81`/`#565c60`/`#525252`, violet brand `#9d7af6` + deep indigo `#18113f`,
  and a hot-magenta pop `#fd2bf2`. One brand hue (violet) with a single magenta
  spark.
- **Type:** **Next.js self-hosted** via `next/font` (8 preloaded `.woff2`
  under `/_next/static/media`, `size-adjust`) — a sans family across weights,
  with a monospace reserved for code/terminal blocks.
- **Hero:** text-led "Prevent AI attacks with trusted open source" + subhead,
  CTAs, a G2 4.7★ badge, then a logo strip. No product shot in the hero.
- **Proof:** G2 rating; ~15-logo wall (OpenAI, Anduril, Nasdaq, Snowflake…);
  hard stats ("3,000+ images with 97.6% fewer CVEs"); named case studies
  (Shift5, Canva, Army Software Factory) with quantified outcomes; 2026 Gartner
  MQ; SLSA L3 / FIPS references.
- **Product:** stacked feature blocks (headline → stat → visual → bulleted
  sub-features); a real **terminal mockup** (`docker pull` with checkmarks for
  manifest/provenance/SBOM); a labeled prevention/detection stack diagram; a
  ~20-logo integrations grid shown in inactive→focused states.
- **Motion:** purposeful; integration grid focus states.
- **Nav:** Platform / Solutions / Customers / Resources / Company + direct
  Pricing; mega-menus grouped by job ("Code safely with agents," "Build with
  trusted artifacts," "Ship through trusted CI").
- **Steal:** terminal/code mockups as hero-grade proof for a technical audience;
  menus grouped by *job to be done*, not by product name; quantified case
  studies.

### 4. Wiz — https://www.wiz.io
CNAPP category leader. The current commercial-frontier benchmark.

- **Palette (real):** signature amber `#ffc104` as the single accent (the rest of
  the system lives in CSS variables we couldn't resolve); white-logo asset
  variants imply dark/mixed sections.
- **Type (real):** **DM Sans** (400/500/700) + **Poppins** (400/600),
  self-hosted via `next/font`. A geometric-sans pairing: Poppins for display,
  DM Sans for text.
- **Hero:** text-led "Protect Everything You Build and Run" with the hook "AI
  alone doesn't make security faster. Context does." Lead element is a
  lead-capture form; logo strip directly below.
- **Proof:** "Trusted by more than 65% of Fortune 100"; two review scores
  (4.7/916+, 4.8/265+); Forrester Wave Leader Q1 2026 + IDC MarketScape Leader +
  Gartner Peer Insights Customers' Choice; named CISO testimonials.
- **Product:** three pillars (Code / Cloud / Defend); three named AI agents
  (Green/Red/Blue) as tabs with a real product screenshot; a 4-step attack-path
  diagram with a security-graph visualization; capability tiles with carousels.
- **Motion:** tabbed/carousel reveals tied to interaction, not scroll spam.
- **Nav:** Platform / Solutions / Pricing / Resources / Customers / Company, plus
  "Sign in," a red "Under attack?" incident link, and a highlighted "Get a demo."
- **Steal:** one ownable accent over a restrained system; the "Under attack?"
  utility link (perfect for an offensive-security/IR firm); agents-as-tabs;
  demo CTA repeated roughly every 2–3 sections.

### 5. Vanta — https://www.vanta.com
Compliance automation. The polished-but-friendly end of the spectrum.

- **Palette (real):** violet brand ramp — `#b68eff` → `#ac55ff` → `#8f47d5` →
  `#5e05c4` → deep `#240642`; near-black `#151414`/`#1a1a2e`/`#21222f`; off-white
  `#fcfcfa`; periwinkle `#4d65ff` secondary. `color-scheme` both. Functional UI
  colors (green pass / red critical / amber warn) appear only inside product
  screenshots.
- **Type:** Google Fonts (families in external CSS; sans).
- **Hero:** confident short headline "Get your compliance together" + a concrete
  subhead ("SOC 2, ISO 27001, HIPAA, and 35+ frameworks"); a Lottie animation,
  an in-hero signup form, and a rotating **outcome stat ticker** ("2,000 hrs.
  saved annually," "20% faster deal cycles").
- **Proof:** "Trusted by 16,000 businesses" logo strip; named testimonials with
  headshots; case studies (GitHub, Accumulus…); Forrester Wave Leader Q2 2026;
  footer cert badges (SOC 2 Type 2, ISO 27001, ISO 42001, GDPR).
- **Product:** six feature cards each with a real UI screenshot (controls
  passing, risk heatmap, vendor toggles); framework grid; segment cards
  (Startup/Mid-market/Enterprise) with an illustrated llama mascot.
- **Motion:** the stat ticker and Lottie are the orchestrated moments; otherwise
  calm.
- **Nav:** Platform / Solutions / Resources / Plans + Log in + Get a demo;
  mega-menus organized by Products, Size, Industry, Frameworks.
- **Steal:** rotating outcome-stat ticker in the hero; proof interleaved between
  every section rather than quarantined; a mascot for warmth without losing
  seriousness.

---

## Synthesized "frontier security" design language

The common system across Noma, Chainguard, Wiz, and Vanta (Checkmarx is the
counter-example). This is the spec to follow.

**1. Theme — tinted near-black, never pure black.**
Every frontier peer uses a near-black that carries a hue, not `#000`:
- Noma `#171b17` (green bias) · Chainguard `#0d161c` (blue bias) · Vanta
  `#151414` (neutral-warm). Off-whites are tinted to match (`#f8f6fe`, `#fcfcfa`).
- Takeaway: pick one tinted near-black and one tinted off-white as the spine.
  (The skill flags *untinted* `#0B0B0B`/`#111` as a template tell — a deliberate
  hue bias is the fix, and ThreatVet's `#0b0b0b` should gain a slight warm/red
  bias.)

**2. Color — one ownable accent, disciplined.**
Each peer owns exactly one saturated hue (Wiz amber, Chainguard/Vanta violet,
Noma green) plus at most one secondary spark used rarely. The accent lands on the
primary CTA, key data, and one hero moment — not on every card.

**3. Typography — a geometric/grotesque sans system, mono reserved for code.**
Wiz = DM Sans + Poppins; Chainguard/Vanta = self-hosted sans; monospace appears
only in terminal/code/data contexts. One or two sans families, clearly distinct
when two. No serif display in this category.

**4. Layout rhythm — alternating proof and product, CTA every 2–3 sections.**
Canonical homepage order: hero + single CTA → logo strip → problem framing →
product pillars → interleaved proof (stats / analyst / case study) → capability
deep-dive → testimonials/integrations → closing CTA → footer. Proof is
*interleaved*, never quarantined into one "logos" band.

**5. Proof is the product.** For this audience the proof blocks carry the page:
- Logo wall with a Fortune-% or customer-count claim.
- Hard, specific numbers ("97.6% fewer CVEs," "800B+ lines analyzed").
- One analyst centerpiece (Gartner/Forrester/IDC) with "Get the report."
- Named case studies with quantified outcomes + real attribution.
- Certification badges (SOC 2, ISO 27001, FedRAMP) in a trust zone/footer.

**6. Product presentation — real artifacts beat decoration.**
Terminal mockups (Chainguard), real UI screenshots (Vanta, Wiz), and one honest
architecture/attack-path diagram (Wiz, Noma) outperform icon grids. Tabs and
carousels present depth on demand instead of an endless scroll.

**7. Motion — one orchestrated moment, the rest on interaction.**
A single hero moment (Vanta's stat ticker, Noma's dashboard) plus
interaction-driven tabs/carousels/focus-states. No per-section fade-and-slide-up
and no hover transition on every card (both are explicit AI tells).

**8. Navigation — mega-menus grouped by job-to-be-done.**
Group menu items by what the buyer is trying to do (Chainguard's "Code safely…
/ Build… / Ship…"), with a persistent primary CTA and a utility slot (Wiz's
"Under attack?").

---

## 2026 B2B security / developer-tool conventions

Directional (sources are agency/vendor blogs; treated as consensus, not data):

- **Dark mode is the default**, not a toggle afterthought, for developer and
  security audiences. Pair it with high-fidelity *real* product UI, not mockups
  of mockups.
- **Interactive demos / guided tours** that mimic a real workflow are replacing
  static storytelling; surface security posture, auditability, and data lineage
  inside the evaluation flow.
- **Trust cues up front:** security badges, client logos, certifications, and
  privacy posture treated as first-class content.
- **Core Web Vitals are design constraints,** not an afterthought — LCP, CLS,
  INP budgeted during design.
- **Typography does the heavy lifting;** variable fonts for flexibility + speed.
- **Motion is purposeful and subtle;** micro-interactions over decoration.
- **WCAG 2.2 alignment** is expected.

## Frontier vs template — the specific tells

**Template tells (avoid):**
- Default/stock palette leaking through (Checkmarx's WordPress Gutenberg colors).
- The SaaS-card kit: identical rounded cards, one border-radius on everything,
  the same soft grey shadow under each, gradient washes as decoration.
- Template chrome regardless of subject: tracked-out ALL-CAPS eyebrow above
  every heading; meta joined with middle dots ("A · B · C"); "WORD — fragment"
  with a spaced em dash; untinted near-black standing in for black; a mono face
  for small labels; a "→" glued onto every link/button.
- Accenting a single word in a headline in a different color/italic.
- Numbered markers (01/02/03) on content that is not actually a sequence.
- Fade-and-slide-up on every section; hover transition on every card.
- Stacked announcement banners + promo cards above the hero.
- Unedited demo copy and generic marketing language.

**Frontier signals (do):**
- Restraint applied precisely — spend boldness in one place, keep the rest quiet.
- A custom structure and token system tied to *this* brand and subject.
- Specific, confident copy with real numbers; active-voice CTAs that name the
  outcome ("Book an engagement," not "Submit").
- Consistency of system across every page.
- Fast, clear, obvious next step.
- One tinted near-black + one ownable accent + a disciplined type scale.

---

## Proposed direction for ThreatVet v2

A starting point for the build pass, grounded in the subject (offensive security
/ threat intelligence) and the current red/black brand, built to dodge the tells
above. The frontend-design skill's two-pass method (plan → critique vs brief →
build) should run at build time; this is the pre-plan.

- **Theme:** dark-first, built on a **warm-tinted near-black** (bias the current
  `#0b0b0b` slightly red/warm, e.g. around `#0e0b0b`) with a tinted off-white for
  light surfaces. Avoid flat `#0b0b0b`/`#111`.
- **Accent:** keep **one** owned hue — ThreatVet red `#ef4444` — as the single
  saturated accent on the primary CTA, key findings numbers, and one hero
  moment. Demote the orange `#f97316` to a rare gradient tail only, not a second
  UI accent, so the system stays disciplined.
- **Type:** a confident geometric/grotesque sans for display + a readable sans
  for text (one or two families, distinct). Reserve **mono strictly for
  code / CVE IDs / terminal / finding identifiers** — appropriate here because
  the subject genuinely has code and data, which is the one case the skill
  permits mono.
- **Hero:** text-led. The most characteristic thing in this subject is a *real
  finding* — consider a restrained terminal/report artifact (a sample finding,
  a CVE line, an attack-path fragment) as the hero proof, à la Chainguard, over
  a stock product shot or the default big-number treatment.
- **Proof (the backbone):** interleave logo wall + a Fortune-%/engagement-count
  claim, hard stats (engagements run, CVEs found, time-to-compromise), one
  analyst/press centerpiece if available, named case studies with quantified
  outcomes, and SOC 2 / ISO / CREST-type badges in a trust zone.
- **Product/services:** present services as job-grouped blocks with one honest
  attack-path or methodology diagram; use tabs for depth. A real redacted
  finding or report excerpt beats an icon grid.
- **Motion:** one orchestrated hero moment (e.g. an attack-path or finding
  reveal) + interaction-driven tabs; respect `prefers-reduced-motion`.
- **Nav:** group by job (Assess / Defend / Intelligence style), persistent
  "Book an engagement" CTA, and an "Under attack?" / incident-response utility
  link — a natural fit for an offensive-security firm and a direct steal from
  Wiz.
- **Quality floor:** responsive to mobile, visible keyboard focus, reduced-motion
  respected, WCAG 2.2 AA, Core Web Vitals budgeted. (See `tech-notes.md`.)

---

## Sources

Reference sites (live teardown): https://noma.security ·
https://checkmarx.com · https://chainguard.dev · https://www.wiz.io ·
https://www.wiz.io/platform · https://www.vanta.com · (Lacework retired into
Fortinet FortiCNAPP).

Trends & tells:
- [5 B2B Website Design Trends to Watch in 2026 — Clear Digital](https://www.cleardigital.com/insights/5-b2b-website-design-trends-to-watch)
- [B2B Web Design Trends for 2026 — Design Tennis](https://www.designtennis.com/insights/b2b-web-design-trends-7-trends-teams-should-actually-care-about-in-2026)
- [Cybersecurity Web Design Trends 2026 — Veza Digital](https://www.vezadigital.com/post/cybersecurity-web-design-trends)
- [What makes a website feel premium instead of template-based — Michael Bamidele](https://mikebamidele.is-a.dev/blog/what-makes-a-website-feel-premium-instead-of-template-based)
- [Why a Premium Website Can Look Expensive but Still Lose Buyers — DesignRush](https://news.designrush.com/expensive-looking-websites-still-lose-sales)
- [The New Editorial: Designing Premium Websites in 2026](https://banffdigital1.lovable.app/blog/web-design/editorial-web-design-2026)

Internal design skill: `frontend-design` plugin (`SKILL.md`) — its AI-tell
calibration list is incorporated above.
