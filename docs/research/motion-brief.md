# ThreatVet v2 — Motion and graphic brief

Reference capture and the rich design language for the move from restrained
minimal to rich, animated and graphic-forward. The frontend-design skill still
governs craft: its restraint default is lifted, but every motion and graphic
must be intentional and crafted, varied not repeated. Hard avoids stay in force:
no generic particle fields, no rainbow or purple gradients, no stock 3D blobs,
no identical fade-up on every section.

Screenshots captured with headless Playwright on 2026-11-03, saved under
`docs/research/motion/` (`<site>-hero.png`, `<site>-scroll.png`).

## 1. Reference teardown

### Microsoft Security (microsoft-security-hero.png)
- **Graphic:** a large animated mesh-gradient background, photographic subject
  layered over it, bold display headline, an eyebrow label, a segmented card bar
  (For enterprise / business / home) with hover affordance, a persistent
  assistant widget.
- **Steal:** gradient-mesh depth behind the hero; a segmented card bar as a
  scannable chooser; bold display type.
- **Avoid:** their blue-lavender-pink rainbow gradient and stock photography. Our
  depth must be red and near-black only, and our subject is artifacts, not stock
  people.

### Wiz (wiz-hero.png, wiz-platform-*.png)
- **Graphic:** a custom line-art hero illustration (animated line-draw), one
  accent word highlighted, email-plus-demo capture, a logo wall, an "Under
  attack?" utility link.
- **Steal:** a signature hand-drawn-feeling line system that animates on; the
  incident utility link (we already have the pattern); proof directly under the
  hero.
- **Avoid:** their light theme and literal illustration. Ours is dark and
  schematic (graphs, paths, records), not cartoon line-art.

### Stripe (stripe-hero.png, stripe-scroll.png)
- **Graphic/motion:** the signature flowing mesh-gradient ribbon that warps
  continuously (GPU shader), a precise real-number ticker ("Global GDP running
  on Stripe: 1.743..."), big type, logo wall, crisp section reveals on scroll.
- **Steal:** a continuously-living gradient field behind the hero; a precise
  real figure rendered with authority; smooth, understated scroll reveals.
- **Avoid:** the rainbow. Translate the living gradient to a red-on-near-black
  field at low opacity.

### Linear (linear-hero.png, linear-scroll.png)
- **Graphic/motion:** dark near-black, very large crisp headline, a layered
  product-UI artifact floating with depth (fine border, soft shadow), a faint
  top radial glow, famously buttery scroll and subtle staggered reveals.
- **Steal:** this is our closest aesthetic. Dark base, crisp type, a layered
  artifact panel with real depth, a single soft glow, restrained-but-smooth
  motion. Our finding record, phase flow and attack-path graph play the role of
  Linear's product panel.

### Noma (noma-hero.png, noma-scroll.png)
- **Graphic/motion:** dark green-black, illustrated mascots, one real flow
  diagram (agent to MCP), restrained motion, numbered capability tabs.
- **Steal:** one honest schematic diagram as the centrepiece; tabbed capability
  depth. **Avoid:** mascots; off-brand for an offensive-security lab.

### Checkmarx (checkmarx-hero.png, checkmarx-scroll.png)
- **Graphic:** tiered architecture diagram, SDLC flow, stat band. Corporate, not
  motion-forward. **Steal:** the tiered architecture/flow diagram idea (we have
  the phase flow). **Avoid:** the template chrome and stacked banners.

### Vercel (vercel-hero.png, vercel-scroll.png)
- **Graphic/motion:** pure black, geometric triangle motif, conic/gradient
  accents, extremely fast route transitions, deploy and build micro-animations,
  draw-on and shimmer effects.
- **Steal:** fast, confident transitions; draw-on for schematic lines; a
  geometric, engineered feel. **Avoid:** the conic rainbow; ours is red.

## 2. The rich design language (ThreatVet)

Dark, engineered, adversarial. Red stays the single accent. Depth comes from
red-and-near-black gradients, soft glows, layered panels, fine borders and
low-opacity grain. Never a rainbow, never a particle field, never a 3D blob.

### Background systems (component: `HeroBackdrop`)
Layered behind every hero, all low opacity, GPU-friendly, lightened on mobile,
static under reduced motion:
1. Fine engineered grid (existing `.grid-faint`), radially masked.
2. A red radial glow that drifts slowly (CSS transform keyframe, ~24s). The
   Stripe/Linear living-field idea, in our palette.
3. Low-opacity grain (static SVG noise), ~3%, to kill flatness.
4. A single slow telemetry scan line (very low-opacity red sweep). Off on mobile
   and under reduced motion.

### Hero artifacts (signature, per page, inline-SVG, animated, labelled if illustrative)
Extends the Vyra phase-flow and finding-record language:
- **Home:** `AttackPathGraph`, an attack path that traces itself (recon to
  foothold to escalation to impact). Edges draw on by `pathLength`, a scan pulse
  travels the path, the impact node pulses red. A methodology visual, generic
  and honest, not a client finding.
- **Product:** the existing `PhaseFlow`, animated: the spine draws, nodes light
  in sequence, a flow pulse runs the pipeline.
- Service pages (later): animate the finding record assembling and the coverage
  matrix filling.

### Scroll choreography (a different device per section, never uniform)
Reveal, staggered grids, parallax layers, a sticky section that advances a
diagram, count-ups for real figures only, draw-on for SVG paths. On home: hero
load-orchestration, then staggered credibility cards, then count-up stats, then
a parallax pillar cluster, then a calm reveal, then a CTA with a glow sweep.

### Micro-interactions
Card hover lift plus border brighten plus soft red glow (`.card-rich`); animated
CTA fill and glow (`.cta-rich`); a cursor-reactive hero backdrop (pointer
parallax, desktop only); animated tabs and accordions where they exist.

### Non-negotiables baked in
- **Honesty:** no fabricated data; count-ups only run real figures (four CVEs,
  ten-plus years, three regions, eleven phases, twenty-seven probes);
  illustrative artifacts keep their label.
- **Performance:** transform/opacity only; no layout animation; reserve artifact
  space to avoid CLS; animations gated to in-view or load; CSS keyframes for the
  ambient backdrop.
- **Accessibility:** `prefers-reduced-motion: reduce` renders the final static
  state everywhere; decorative SVG is `aria-hidden` with text equivalents
  alongside; keyboard and screen-reader order unchanged; text keeps AA contrast
  because glows sit low-opacity behind a near-black base.
- **Mobile:** backdrops lightened, parallax and scan off, motion amplitude
  reduced, no horizontal scroll.

## 3. Home prototype (build first, then propagate)
- Hero: `HeroBackdrop` + left content (staggered headline, subhead, animated
  CTA, proof chips) + right `AttackPathGraph` artifact, cursor-reactive.
- Stat row: count-ups for the four real figures.
- Credibility band: staggered card reveal with `.card-rich` hovers.
- Enterprise path: pillar cards with parallax entrance and hover glow.
- Secondary paths and CTA: calm reveal, then a CTA glow sweep.
- Plus: animate the Vyra `PhaseFlow` on /product.

Stills at 320/768/1280/1536 and short screen recordings accompany this brief,
since stills cannot show motion.
