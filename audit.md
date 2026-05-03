# Sorun.dev — Pre-Launch Audit

**Branch audited:** `preview-3` (commit `dd93b23`)
**Audit date:** 2026-05-03
**Scope:** the production homepage (`/`) and the supporting `/demo/*` exploration pages

---

## TL;DR — Should we ship?

**Not yet.** The site is visually accomplished and the core narrative works, but it has a small handful of launch-blockers that would embarrass us if a real prospect saw the page today. None are technical — all are content / trust / legal hygiene.

**Hard blockers (a prospect would notice within 30 seconds):**
1. The Founder section literally renders the strings `[Your Name]`, `[N years]`, and `[N coworking and flex office locations]` to the visitor.
2. The footer and Founder LinkedIn link points to `https://linkedin.com/in/YOUR-HANDLE`.
3. The "Download sample report" CTA links to `/sample-report.pdf` — a file that does not exist (404 on click).
4. The favicon is a purple/violet brand mark that does not match the electric-blue brand identity used everywhere else on the site, and visually resembles the Anthropic logo. Either this is a placeholder that was never swapped, or it is unintentionally borrowed iconography. Either way, ship-blocker.
5. There is no privacy policy, cookies notice, or imprint — for a site translated into NL and ES targeting EU operators, this is a GDPR/ePrivacy compliance gap, not a polish item.

**Soft blockers (would not break a meeting, but undermine the pitch):**
6. The `/demo/*` exploration pages are publicly reachable in the production bundle.
7. The homepage is hardcoded English — the NL and ES locale files exist and are 177 lines each but are not used (only the embedded "What you receive" section reads from i18n).
8. No social proof anywhere on the site — no client logos, no testimonial, no anonymised case study.

The rest of this document explains the perspectives.

---

## 1 · CEO sign-off perspective

I would not put my name to this site as it currently stands. Three reasons, in order:

**(a) The Founder section is empty.** A prospective buyer evaluating a €1,500+ engagement will read the founder bio carefully — it is the single page element that substitutes for "are these people credible?". When it reads `[Your Name]` and `[N years]`, two things happen: the visitor concludes the business is unfinished, and the credibility of every other claim on the page (the 8 layers, the methodology, the pricing) drops with it. This is the first thing to fix.

**(b) We are silent on credibility signals.** No client list, no testimonial, no anonymised before/after, no logo bar, no "audited X spaces across Y countries." The site argues by assertion ("we know what good looks like") rather than by proof. For a fixed-price advisory service this is the conversion limiter, not a "nice to have."

**(c) Compliance footprint is missing.** The site is published in three languages, opts visitors into translation memory in their browser, and points at a Dutch-EU buyer base. No privacy policy, no cookie banner, no terms-of-service, no imprint, no DPA-friendly data-handling statement. This is not just legal exposure — savvy operators check for these and quietly disqualify vendors who lack them.

**Sign-off conditions.** I would sign off the moment those three are addressed AND the broken sample-report link is removed (or filled). Everything else in this document is improvement, not gate.

**Strategic notes.**
- The single price point ("from €1,500") is a clear positioning choice but creates a thin pricing surface. Multi-site operators will not know what to expect; enterprise integrators will assume we cannot scale. Worth acknowledging in copy even if we keep the entry-tier explicit.
- The competitive narrative ("enterprise integrators are too expensive, IT support doesn't get hospitality, software vendors only care about their platform") is correct and well-said. Lean further into this — it is our best paragraph.

---

## 2 · Senior marketing perspective

**What's working**
- *Positioning is sharp.* "Coworking is a hospitality business with a network closet" earns its place in the hero subhead. Unique, memorable, credible.
- *Information architecture is correct.* Hero → Problem → Audience qualifier → What we audit (8-layer interactive) → Methodology → Deliverables → Pricing → Founder → CTA. This is the canonical B2B advisory flow and the page does not over-engineer it.
- *The 8-layer floor plan and the cycling report viewer are the two strongest visual moments.* They are concrete, brand-specific, and they answer "what do I get for €1,500" in a way that text cannot. These are the page's best assets — protect them.
- *The Problem copy is genuinely empathetic.* Specific scenarios beat abstract pain claims. The blue inline highlights make it scannable.

**What's missing or wrong**
- **No social proof.** Nothing. Not a logo, not a quote, not a number ("audited 40+ spaces across 6 countries"). For an advisory engagement this is the conversion limiter.
- **No FAQ.** A fixed-price audit raises predictable questions: do you serve outside the Netherlands? What's the smallest space you'll work with? What's NOT included? Do I need to be on-site? Can you start before our renewal cycle? The page answers none of them.
- **No "what happens on the call" preview.** The primary CTA goes straight to a Cal.com link. The visitor commits a calendar slot without knowing what they'll be asked or what they'll get out of the 30 minutes. A 4-bullet preview ("we'll cover X, Y, Z; afterwards you'll know A, B") would meaningfully increase booking rate.
- **The pricing block is exposed.** "from €1,500" with no anchor and no second tier reads as either underpriced (to enterprise buyers) or overpriced (to single-site operators trying to decide between us and a freelancer). Either show the next tier (multi-site / advisory retainer) for anchoring, or add a one-line qualifier ("single location, fully remote, fixed scope — multi-site engagements quoted separately").
- **The "live walkthrough + Q&A" deliverable lost prominence.** It used to be a 4th card in iterations; in the current Variant 6 it lives only as a one-line note below the deliverable cards. This is one of the most valuable deliverables for a non-technical buyer (they get to ask questions to a human) and burying it is a missed differentiator.
- **CTA wording is uniform.** "Book a 30-minute call" appears three times verbatim. Vary it: "See if we're a fit" (hero), "Book a free intro" (pricing), "Get the audit started" (final). Same destination, different intent at each step.
- **No urgency or scarcity.** Not asking for false urgency, but a soft signal ("Currently booking June engagements") tells the visitor the practice is active and helps them plan around their own quarter.
- **The Problem section is heavy.** Five lines of negative scenarios in TextReveal, then a second negative paragraph. The eventual positive turn ("you need someone who understands the full stack") arrives but lands tired. Trim or interleave with one declarative positive line.

**Copy lint**
- Hero headline "You run the space. We handle the tech." is good. But "we handle" is an over-claim — we don't *handle*, we *audit*. Consider "You run the space. We map the tech." or "...We make the tech legible."
- "Built by someone who has lived this" — this is excellent copy *if* the founder section underneath it actually says who that someone is.
- "Get the tech right. The rest gets easier." — fine, but generic. Consider tying back to brand: "Get the tech right. The rest is hospitality."

---

## 3 · Senior engineering perspective

**Stack snapshot**
- React 18.3 + Vite 5 + TypeScript + Tailwind v4
- i18next for localisation (en/nl/es), `localStorage`-persisted, with `prefers-color-scheme` fallback for theme
- shadcn/ui primitives, Lucide icons, custom inline SVG diagrams
- Path-based routing in `main.tsx` (no router library)
- Single bundle, no code-splitting

**What's solid**
- TypeScript is strictly used; lint passes clean; build is reproducible.
- The theme system on the boot script in `index.html` correctly applies a class before the React tree mounts — no flash-of-wrong-theme. This is a non-trivial detail done right.
- Component decomposition is clean: variant systems live next to their demo pages, animations are isolated in `ui/animations.tsx`, the V5 floor plan accepts well-named props (`autoCycleIdleMs`, `capFloorHeight`, `hideBottomLegend`, `showTopTabs`).
- Accessibility hooks are mostly present: `aria-label` on the theme button, `alt` text on hero images, `aria-hidden` on decorative SVG halos.

**What's a problem**

| Severity | Issue | Detail |
|---|---|---|
| HIGH | `/demo/*` shipped in production bundle | All variant exploration pages are reachable in the deployed build via path routing. They reveal internal iteration history and dilute SEO. Should be excluded from prod (env-gated route, or route table swap at build time). |
| HIGH | No code-splitting | One JS bundle, **580 KB minified / 183 KB gzipped**. Vite's own warning fires (`> 500 KB`). The demo pages and the variant component trees are all eagerly loaded for every visitor. Lazy-load demos behind `React.lazy` or — preferably — exclude them from production. |
| HIGH | Image weights | `floorplan-iso-light.png` is **2.3 MB**, dark is **1.8 MB**, `hero-blueprint.png` is **1.7 MB**, `platform.png` is **1 MB**. These are PNGs displayed at <800px wide. Convert to AVIF/WebP, serve responsive `srcSet`, and the page weight drops by ~6 MB (≈80% reduction). |
| HIGH | `lucide-react` pinned to `^1.8.0` | This is the pre-fork (Feather-era) version; current is around `0.5xx` post-fork. The pin was deliberate to work around a Linkedin export issue but freezes the project against years of icon updates and bug fixes. Re-evaluate. |
| MED | TypeScript `~6.0.2` | TypeScript has not shipped a 6.x line as of writing — this is likely a fictitious future version pinned by the scaffold tool. Build works, but resolve before this becomes a supply-chain question at audit time. |
| MED | No `prefers-reduced-motion` handling | The V5 pulses, auto-cycling report viewer, animated count-up, and TextReveal all run regardless of OS-level reduced-motion preference. Accessibility miss. |
| MED | Hardcoded English on the homepage | `AnimationsDemo` does not use `useTranslation()`. The 3 locale files (177 lines each) are used by the embedded `WhatYouReceiveInteractive` component but nothing else on `/`. The language switcher present in `App.tsx` is not present on the new homepage either. |
| MED | No skip-to-content link | The i18n key `accessibility.skipToContent` exists but is not rendered. Screen reader and keyboard-only users have to tab through the header on every page. |
| MED | Duplicate `alt` on light/dark hero images | Both `<img>` tags carry the same `alt`. Either use `<picture>` with `<source media="(prefers-color-scheme: ...)">` (cleaner, single decode) or set `aria-hidden` on the inactive one. |
| LOW | No mobile menu | Nav links are `hidden md:flex`. On mobile, the visitor sees logo + theme toggle (which is itself `hidden sm:inline-flex` — also gone) + the primary CTA. Acceptable for a marketing page, but it means in-page anchor navigation is desktop-only. |
| LOW | Theme toggle hidden under `sm` breakpoint | Visitors on phones cannot manually flip theme. With `prefers-color-scheme` fallback this is rarely a problem in practice but it is a quiet inconsistency. |
| LOW | External links use `rel="noreferrer"` only | Modern browsers imply `noopener` from `noreferrer`, so this is fine, but explicit `rel="noopener noreferrer"` is the audit-friendly form. |
| LOW | No focus-visible audit | Default Tailwind focus rings are inherited; have not been verified for contrast on the brand-blue background. Worth one Lighthouse run. |

**Architectural observations** (not blockers, but worth noting before the next round)

- The "everything is a section variant in one big file" pattern (`WhatYouReceiveVariants.tsx` is now 1,021 lines) is fine for exploration but starts to bite at this size. After the next round of decisions, collapse to one chosen variant per section and delete the rest.
- The `path.startsWith()` chain in `main.tsx` is fine for ~10 routes but already getting unwieldy. Either keep it as-is (acceptable) or move to a tiny router (`wouter` is ~1 KB) before adding more.
- Component naming is mixed: `EightLayerStack`, `V5Topology`, `WhatYouReceiveInteractive`, `AnimationsDemo` — three different naming schemes (semantic, alphanumeric variant, page suffix). Settle on one before the surface grows further.

---

## 4 · UX, accessibility & visual design perspective

**Strengths**
- Visual hierarchy is consistently strong — the use of `font-mono` micro-labels above each section, then a heavy display headline, then body copy, lands every section with the same rhythm.
- Brand colour discipline is good. One blue, one foreground, one muted, one card. No accidental greys or strays.
- The interactive moments (V5 floor plan, cycling report viewer) are genuinely novel without being gimmicky. Most B2B sites this size have zero interactivity; this has two well-tuned ones.
- Light and dark themes are both legible. The recent Variant 6 refactor closed the "dark frame on a light page" mistake.

**Issues**
- **The "PEEK INSIDE" / "ILLUSTRATIVE" framing is buried.** The cycling viewer shows €2,400 / €450 / 23 findings / 47 pages — these read like real data. There is no on-screen indicator that the numbers are illustrative (the pip says "LIVE PREVIEW" which suggests *more* realism, not less). A small "ILLUSTRATIVE EXAMPLE" badge on the frame would close this gap.
- **CountUp on hero stats.** The pricing CountUp was rightly removed; the stats CountUp on "8 layers / 20–30 findings / from €1,500" remains. It earns its place better here (these read as data points, not money), but the tiny "from €1,500" line still animates. Consider matching the pricing decision and going static there too for consistency.
- **The "Live preview" pip on the cycling viewer is ambiguous.** "LIVE" implies real-time data; the visitor sees a sample. Rename to "AUTO-CYCLE" or "PREVIEW" without the "LIVE" qualifier.
- **The Problem section TextReveal is heavy on long text.** Five sentences across one paragraph reveal word-by-word. The reveal logic is good (per-word position-based) but five sentences is long enough that the lower words are still ghosted while the upper sentences are being read. Consider chunking by sentence rather than running as one block.
- **No reduced-motion fallback** for any of the animations.
- **Color contrast on muted-foreground in light theme** should be verified against WCAG AA (4.5:1 for body). Tailwind's default `muted-foreground` runs ~ 4.6:1 on `bg-background` which is right on the line.

---

## 5 · Legal, compliance, trust perspective

**Required before public launch in EU jurisdictions**
- **Privacy policy** — required by GDPR Art. 13/14 the moment any personal data is collected, including via cookies, analytics, contact forms, or Cal.com bookings.
- **Cookie consent** — `localStorage` for theme + language is functional/strictly necessary and exempt, but if any analytics or third-party embed is added, opt-in consent is required (ePrivacy Directive).
- **Imprint / legal entity disclosure** — required in NL (and DE if expanded) under e-commerce / commercial-communication rules. Should disclose: legal entity name, KVK number, registered address, VAT number, contact email.
- **Terms of service** — not legally required for a marketing-only site, but a "Terms" page covering scope, payment, deliverables, IP, confidentiality is needed before invoicing.
- **DPA stub** — for B2B EU buyers, expect to be asked for a Data Processing Agreement before kickoff. Have a template ready.

**Trust hygiene**
- The Cal.com integration sends booking data through a US-based processor (Cal.com Inc.). If kept, document this in the privacy policy (sub-processors).
- `hello@sorun.dev` should be confirmed as monitored. A buyer who emails and gets no reply in 24h disqualifies you.
- LinkedIn URL should be verified (currently broken placeholder).

---

## 6 · SEO & discoverability perspective

| Item | State | Action |
|---|---|---|
| `<title>` | OK ("Sorun.dev — Coworking technology audits") | none |
| Meta description | OK, ~180 chars, well-targeted | none |
| Open Graph | Partial — `og:type`, `og:url`, `og:title`, `og:description`, `og:locale*` set | **Missing `og:image`** — social shares look bare |
| Twitter card | Missing | add `twitter:card`, `twitter:image`, `twitter:title` |
| Structured data (JSON-LD) | None | Add `Organization` + `Service` schema |
| `hreflang` alternates | None (despite NL/ES translations existing) | Add `<link rel="alternate" hreflang="nl|es|en">` per page |
| `sitemap.xml` | Has 1 URL (`/`) | Add the language variants and any future content URLs |
| `robots.txt` | Allows all (default) | Should explicitly `Disallow: /demo/` once those pages are kept |
| Canonical | Not set | Add `<link rel="canonical">` |
| Heading hierarchy | One `<h1>` per page (good) | none |
| Internal linking | Anchors only (in-page nav) | Acceptable for a single-page site — revisit if blog/case studies are added |

**Indexing risk:** the `/demo/*` pages will be indexed unless explicitly excluded. They duplicate hero/problem copy from the production page and will fragment SEO juice between near-identical pages. Block them in `robots.txt` AND `noindex` meta as belt-and-braces.

---

## 7 · Pre-launch punch list (consolidated, prioritised)

### P0 — must-fix before any external link is shared

1. Fill in the Founder section: real name, real bio, real LinkedIn URL.
2. Replace the favicon with a brand-aligned mark (or temporarily remove it — a missing favicon is better than a wrong one).
3. Either upload `/sample-report.pdf` or remove the "Download sample report" CTA from the final CTA block.
4. Publish a privacy policy + imprint page. Link from footer.
5. Decide on the `/demo/*` pages: either gate behind environment, exclude from build, or `noindex` + `robots.txt` block.

### P1 — strongly recommended before launch announcement

6. Add at least one credibility signal: a logo bar, an anonymised testimonial, or a "X spaces audited across Y countries" stat. Even one is dramatically better than zero.
7. Add a 4-bullet "what happens on the call" preview block above the booking CTA.
8. Wire the homepage to i18n. NL and ES locale files are already there. (Or — if NL/ES are aspirational — remove the `og:locale:alternate` declarations.)
9. Convert the hero floor plan and diagram illustrations to AVIF/WebP with responsive `srcSet`. Drop ~6 MB of payload.
10. Code-split or strip the `/demo/*` pages from the production bundle.
11. Add a privacy-respecting analytics tool (Plausible, Fathom, Vercel Web Analytics — all cookieless and GDPR-friendly) so we can measure the changes we make from here.

### P2 — quality polish

12. Add an FAQ section (5–6 questions).
13. Add `og:image`, Twitter card meta, and JSON-LD `Organization` schema.
14. Mark the cycling-report viewer numbers as "ILLUSTRATIVE EXAMPLE" on the frame.
15. Add a `prefers-reduced-motion` audit pass for all animations.
16. Add a skip-to-content link (the i18n key is already there).
17. Re-introduce a mobile theme toggle.
18. Add `hreflang` alternates and language URLs to the sitemap.

### P3 — opportunistic improvements

19. Vary CTA copy across the page.
20. Soften the Problem section — interleave one declarative positive line.
21. Audit `lucide-react` pin and re-evaluate moving to current versions.
22. Resolve the TypeScript version pin (`~6.0.2`) to a real released version.
23. Move from path-based routing to a tiny router if the page count grows.

---

## Closing note

The core narrative, the visual identity, the technical execution of the two interactive moments, and the section-by-section information architecture are all genuinely good. Nothing on this site needs to be torn up — it needs to be **finished**. The P0 list is short and entirely about hygiene, not craft. Once those are closed and the credibility-signal gap (P1 #6) is addressed even minimally, this is a site that I would expect to convert at the high end of the B2B advisory benchmark.
