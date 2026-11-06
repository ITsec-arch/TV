# Reference study: natural redesign of threatvet.com

Branch: `feat/natural-redesign`, cut from `feat/site-v2` (the finished-content
base), not literally from `main`. `main` is 28 commits behind and still holds
the old pre-v2 pages, so branching there would resurrect old content. See
"Branch base" below.

Goal: reskin so the site reads as human-designed, by cloning the design
LANGUAGE of the references, never their identity. Content, copy and proof are
unchanged.

Method: each reference captured live with Playwright (hero + inner pages, 1280
and 390), computed styles extracted (palette, type, spacing, radii, shadows).
Captures live in the session scratchpad and are NOT committed. No reference
copy, logo, mascot or illustration is reproduced.

## Primary reference: Thinkst Canary (canary.tools) — the system

Measured:
- Palette, COOL off-white: page `#fafbfc`, section band `#f6f7fa`, cards
  `#ffffff`, ink text `#1f2120`, muted `#545e58` / `#9b9b9b`, hairline
  `#cfd9de`. ONE accent: green `#03b46e` (their identity).
- Type: one humanist sans everywhere ("Avenir Thinkst", weights 300-900) plus
  Source Code Pro mono for technical strings. Sentence case, normal tracking,
  no all-caps. Section h2 ~40px/800, hero headline ~96px bold, body 16-17.6px
  at 24-26px line-height.
- Air and material: 96px section rhythm, 12px card radius, very soft shadow
  `rgba(0,0,0,.05) 0 4px 12px`, cool hairline borders.
- Composition (the signature move): full-bleed ACCENT bands (green, soft radial
  gradient, inset top/bottom edge shade, white text) alternate with paper
  sections. Big declarative period-stopped headlines ("Know. When it matters.").
  Real credible imagery (device mockups, console screenshots, human avatars).
  Calm, serious, a little human.

## Secondary reference: Fly.io (fly.io) — warmth and texture only

Measured: serif display "Mackinac" 64px/500 with tight tracking and italic
emphasis, humanist body "Fricolage Grotesque", "Fragment Mono". Deep TINTED ink
`#281950` (not pure black). Soft pastel gradient washes (lavender, sky, pink).
128px air. Whimsical hand illustration. Purple `#7c3aed` accent.

We borrow (texture/warmth only): tinted ink instead of pure black; a very
restrained warm wash plus fine grain for texture; generous air; italic-for-
emphasis as the editorial alternative to bolding one word.

We do NOT borrow: the serif as a type identity (the brief scopes type to
Canary); purple; pastel playfulness; the illustration style.

## Hard line

Clone craft and system, never identity. No bird, no Canary or Fly logo,
wordmark, mascot, illustration or copy. ThreatVet keeps its own wordmark (text
plus a red signal square) and builds original visuals.

## ThreatVet synthesis (the system we build)

### Color (roles and exact hex, all AA-verified below)

| token | hex | role |
|-------|-----|------|
| `paper` | `#f7f6f3` | page background, near-neutral leaning slightly warm |
| `card` | `#ffffff` | raised panels, cards |
| `band-quiet` | `#f1efea` | alternate quiet section fill |
| `ink` | `#1c1b18` | primary text, warm near-black |
| `muted` | `#5f5b54` | secondary text |
| `subtle` | `#8a847b` | large/decorative text ONLY (AA-large) |
| `line` | `#e5e2db` | warm hairline borders and rules |
| `accent` | `#c23b2e` | links, UI, the single red signal |
| `band-red` | `#9e2f26` | the one full-bleed confident band, white text |

Decision note A (paper warmth): the brief said "warm", but Canary measures COOL
(`#fafbfc`). A full warm cream plus a red accent is the number-one AI tell. So
paper is a near-neutral `#f7f6f3` that leans only slightly warm; warmth is
carried by the warm ink and a restrained hero wash and grain, not a cream
flood. Trivial to push warmer if you want it warmer.

### Type

Decision note B (sans, not serif): the brief scopes "editorial humanist type"
to Canary, which is humanist SANS, and scopes Fly to "warmth and texture only".
So the display face is a humanist SANS, not a serif. Journal precision comes
from measure, hairline rules, figure/caption framing and mono identifiers (how
Canary's own /security page does it), not from a serif.

- Display and body: Hanken Grotesk (humanist, warm, weights 400-800). Headlines
  600-800, sentence case, normal tracking.
- Identifiers and data: Source Code Pro (CVE IDs, phase labels, payloads).
  Matching Canary's mono; mono is craft, not identity.
- Self-hosted through `next/font/google` (build-time, no layout shift,
  CWV-safe). Replaces Clash Display / Satoshi / Geist Mono.

### Composition

Decision note C (band color): Canary's band is its accent color. Recolored to a
deep ThreatVet RED band (`#9e2f26`, soft radial, inset edge, white text), used
once for the confident proof/CTA moment. NOT an ink/near-black plate: that is
both an AI trait (near-black plus one bright accent) and the old dark skin we
are leaving.

- Paper sections on a 96px rhythm alternate with the one red band.
- Hero on paper: mono kicker (not all-caps), a big sans statement with one
  italic emphasis, a sans subhead under 70 characters, the real CVE chips
  linked to NVD as proof, and an original honest typeset figure (no device or
  bird copy, labelled illustrative).
- Cards: white, 12px radius, 1px warm hairline, soft `rgba(0,0,0,.05) 0 4px
  12px` shadow. Hierarchy by size and air, not many radii and shadows.
- One orchestrated motion moment, reduced-motion safe; content renders complete
  with no JS. No per-section fade-ups, no count-ups.

### Principles

1. Evidence on paper: reads like a precise field report, not a SaaS landing.
2. One voice: Hanken Grotesk plus Source Code Pro, warm paper, one red signal.
3. Confident calm: big editorial statements, generous air, italic for emphasis,
   no glow, glass or neon.
4. Rhythm: paper sections plus one red band; restraint everywhere else.
5. Honest: real CVEs linked to NVD, illustrative artifacts labelled, no fake
   photos, testimonials or stats.

## Contrast table (computed, WCAG 2.1)

| pair | ratio | verdict |
|------|-------|---------|
| ink `#1c1b18` on paper `#f7f6f3` | 15.94 | AA |
| ink on card `#ffffff` | 17.22 | AA |
| muted `#5f5b54` on paper | 6.25 | AA |
| subtle `#8a847b` on paper | 3.43 | AA-large only |
| accent `#c23b2e` on paper | 4.91 | AA |
| white on accent `#c23b2e` (buttons) | 5.30 | AA |
| white on band-red `#9e2f26` | 7.27 | AA |
| accent `#c23b2e` on ink | 3.25 | AA-large only (accent/rule use only) |

## Branch base

`git rev-list --left-right --count main...feat/site-v2` = `0  28`. `main` is a
strict ancestor; the finished v2 content lives only on `feat/site-v2`. To keep
every piece of existing copy, this branch is cut from `feat/site-v2`.
`feat/site-v2` stays untouched as the fallback. `main` is never touched.

## Build notes

- Tokens flipped in `:root` (globals.css); the site is now light. Removed
  `className="dark"` from `<html>` and added `color-scheme: light`.
- The dark-skin utilities (`.glass`, `.edge-holo`, `.volume-glow`,
  `.field-contours`, `.depth-vignette`, `.card-rich`, `.cta-rich`, `.grain`,
  `.wipe`, `.kinetic`) remain DEFINED so the other 13 routes keep building; they
  are simply not used on the home page.
- Only the home page is art-directed in this pass. The other routes inherit the
  new palette but are NOT yet art-directed (transitional), per the brief's
  "home first, stop for review".
- The dark hero art (poster PNG, HeroLoop video, InstrumentField) is removed
  from home and replaced by the typeset figure.
