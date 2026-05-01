# Honest review — `toon-hermans` (Sorun.dev placeholder)

This is one designer/strategist's opinion, not gospel. Take what's useful, ignore the rest.

## The 30-second take

The site looks competent and ships. The design is on-trend and the messaging is clear. **It is not yet differentiated, doesn't earn trust, and the wedge ("we audit") is half a business.** With the changes below, you'd be in much better shape — most are small.

The single biggest issue: **zero social proof.** For a €1,500 service that requires the operator to hand over access to their stack, a stranger from the internet needs a reason to trust you. Right now there is none.

The single biggest opportunity: **own the "8 layers" framework so hard that it becomes the thing you're known for.** It's the only piece of content here that doesn't sound like every other B2B services site. Lean in.

---

## What works

- **The 8-layer framework.** Concrete, methodical, defensible. Implies "you need a coworking-tech specialist, not a generalist." Keep building on this.
- **Showing pricing from €1,500.** Most consultants hide pricing — putting it on the page is a trust move and a qualifying filter at once.
- **Direct, declarative voice.** "You run the space. We handle the tech." No marketing fluff. Continue.
- **The 2–3 week, 100% remote, fixed-scope frame.** This sells low-risk, predictable. Also a good qualifier.
- **The visual system.** Clean, modern, glassy. Reads as "we know what we're doing." Slightly trend-bound (see below) but executes its style well.

---

## Critical issues (would hurt conversion right now)

### 1. No proof. None.

There are no testimonials, no client logos, no case studies, no sample report download, no founder photo, no "based in X / [n] audits delivered" line, no LinkedIn link, no third-party validation of any kind. A cold visitor has only your word that you are competent and real.

**Fix path:**
- If you have done even *one* audit: get a quote and a logo. One real testimonial > zero.
- If you have done zero: ship a free "self-assessment checklist" tied to the 8 layers. Builds your list, demonstrates expertise without claiming clients.
- Add a small founder block with a photo and one paragraph ("I'm X, I spent N years doing Y, here's why I'm doing this"). Trust on a high-ticket service is mostly: *is a real person behind this and do they sound like they know the work?*

### 2. The CTAs are `mailto:` links.

"Book a free 30-minute call" → opens an email composer. The promise was "book," but the user has to compose, send, wait, then negotiate times. That's friction at the highest-intent moment.

**Fix:** wire up Cal.com or SavvyCal (both free for one calendar). Replace every `mailto:hello@sorun.dev` CTA with a real booking link. Keep the email visible as a fallback.

### 3. The audit is half a business.

After the audit you hand the operator a prioritized roadmap. *Then what?* If you don't fix the issues, they're back where they started — knowing more, but still broken. If you do, that's not on the site.

This isn't a content problem; it's a strategic one. **Decide:** are you selling diagnosis only (and partnering with implementers), or diagnosis + implementation? Either is fine. Right now the site is silent on it, which leaves the operator's most obvious next question unanswered.

### 4. No real second-step CTA.

Visitors not ready to book have nothing else to do. No checklist download, no email subscribe, no "send me one tip per month." Cold traffic leaves and never comes back.

**Cheap fix:** add a single email-capture form somewhere mid-page — "Get a one-page self-assessment of your 8 layers."

---

## Design feedback

### What's working

- Typography hierarchy. Space Grotesk display + Inter body, both with strong weights, reads premium without trying too hard.
- The dark-first palette with OKLCH primary blue.
- The blue gradient blobs + grain overlay add depth without being noisy.

### What I'd push on

**The hero photo is generic.** "Modern minimalist office space" reads as stock — it doesn't say *coworking* and it doesn't say *technology*. A photo of a real coworking space (with members in it, slightly imperfect, maybe even one with a visible WiFi access point in frame) would do more work. Even better: a photo of a floor plan with annotations, or a screenshot of a sample report page. Show the work, not the vibe.

**The 8-layer cards look identical.** Same icon size, same square, same Lucide outline, same numbered badge. After looking at the second card, the eye stops parsing. Differentiate them — vary icon color/treatment between layers, or group them visually (e.g., "infrastructure" vs "operations" vs "experience"). Right now it's a wall.

**Process feels flat.** Five cards in a row with even visual weight don't communicate *sequence*. A real timeline (with a connecting line, alternating sides on desktop, or a "1 → 2 → 3" arrow flow) would convey "this is a journey" rather than "five things." The plan considered this and chose the safer fallback — worth revisiting.

**Pricing card feels lonely.** A single card centered on the section reads as *we have one thing and we hope you want it.* Two options would let you anchor — e.g., "Single-site €1,500" / "Multi-site from €X" / "Implementation engagement (let's talk)." Even three with the middle one as recommended works. The current single card is so unflanked it almost feels like a placeholder.

**Glassmorphism is starting to feel dated.** The look peaked 2023–24 and is now the visual language of every AI-startup landing page. You don't need to abandon it, but consider one signature design move that's *yours* — a custom illustration of the 8-layer stack, an animated diagram of the audit process, a hand-drawn floor-plan annotation style. Anything that breaks the "another shadcn site" pattern.

**Light mode wasn't visually verified.** The plan added theme-aware glass/grain tokens, but I never opened a browser. Test it; the OKLCH primary at 12% over near-white might still feel heavy.

**The grain overlay** is barely visible at the chosen opacities (0.025 dark / 0.035 light). It's adding a kilobyte and a paint cost for an effect most users won't notice. Either raise it (around 0.05–0.07) so it earns its keep, or drop it entirely.

---

## Content / voice feedback

### Strengths

- **Declarative sentences.** "We audit." "We assess." "Fixed price." Refreshing in a category that loves passive constructions.
- **Specific numbers.** "30–45 min." "2–3 weeks." "€1,500." Specificity = competence.
- **Naming the alternatives** (enterprise integrators, generalist IT, vendors). Triangulation positioning is good.

### What I'd change

**The Problem section is too long.** Two dense paragraphs of prose at section 2 is friction before the user gets to "what's actually on offer." Cut by 60%, or restructure as a 3-bullet "you know this feeling when…" list. Right now most people skim past it.

**"You run the space. We handle the tech."** is *almost* great. It's also been said by a thousand B2B services in slight variations ("you focus on X, we handle Y"). Consider sharper framing tied to *coworking specifically*, e.g.:
- "Coworking is a hospitality business with a network closet."
- "Your members will judge you on the WiFi."
- "WiFi reliability isn't a tech metric — it's a churn metric."

Pick a thesis that's *only true for your industry* and own it.

**WhoIsThisFor headline is a negative.** "We work with independent operators who *don't* have a dedicated IT department." Defining yourself by what your customer lacks is wobbly positioning. Try: "For operators who run coworking like a business, not a lifestyle." Or: "Built for the operator-of-one." Lean in.

**The "label → headline → body" pattern repeats five times.** "The problem", "What we audit", "The methodology", "What you receive", "Entry-point audit". After the second one the reader pattern-matches to "marketing copy." Consider varying the section openers — sometimes lead with a question, sometimes a number, sometimes a quote. Texture matters.

**Final CTA reuses the hero CTA verbatim.** "Book a free 30-minute call" appears twice with the same supporting text. The closing should be a build, not a repeat. Try one of:
- "Stop firefighting your tech. Start running your space." → CTA
- "Three weeks from today, you could have a plan." → CTA
- A single, hard sentence: "If your WiFi went down right now, would you know why?"

**Empathy is missing.** "Recurring WiFi complaints lead to churn. Broken access control wastes your staff's time." These are facts, but they're not *acknowledged* — they're stated. A single "we know how exhausting it is to fight your tech every Monday morning" would warm up the entire page without compromising the engineer-confident voice.

---

## Strategic / positioning questions

These aren't content fixes — these are decisions you should make explicit before the next pass.

1. **Audit-only, or audit-plus-fix?** This is the biggest unanswered question on the site. Decide and tell visitors.
2. **Single market or multiple?** Coworking is the obvious target, but "flex office", "shared workspace", "studio space", and "co-living" are adjacent and have similar problems. Wider TAM, but dilutes positioning. Recommend: stay narrow until you have 10 paying customers, then widen.
3. **Geography.** No mention of where you operate. "100% remote" implies anywhere, but in practice timezones, language, and on-site pre-checks usually have a footprint. Be explicit (Europe? EMEA? English/Dutch/Spanish-speaking spaces?). It's qualifying, not limiting.
4. **The "from €1,500" anchor.** Is that a real floor or a marketing number? If it's a real floor and 80% of audits cost €2,500–€4,000, write "from €1,500, typically €2,500–€4,000." Range pricing trains the buyer's expectation and reduces sticker shock at the proposal stage.
5. **What's the buying trigger?** Most B2B services have one — *something* makes the operator suddenly need this. Onboarding a new platform? Member churn spike? Legal/compliance review? Insurance audit? Identify it, name it, and address it directly. It will pull the right people in.

---

## On the name "sorun"

You said it's a placeholder, so this is just a flag: **"sorun" is the Turkish word for "problem"**. If that was intentional ("we solve the sorun"), it's clever-but-narrow — works only for the audience that knows Turkish. If unintentional, you'd want to know before launch. Other quick checks for any candidate name:
- `.com` available, or strong `.co/.dev/.io`?
- No collision in your target markets' languages (English, Dutch, Spanish at minimum based on your i18n)
- Trademark search clear in EU?
- Pronounceable on a phone call without spelling it

For naming a B2B services brand: prefer concrete + memorable + slightly opinionated. "Stack Audit", "Eight", "Floorplan", "Platform" are all the kind of single-word grabs that age well. Avoid: portmanteaus, deliberate misspellings, anything ending in -ly.

---

## Tech / hygiene (cheap to fix, will matter at launch)

- **Convert images to WebP.** The Hero.tsx already has a TODO comment about this. `cwebp -q 80 hero-office.jpg -o hero-office.webp`, then `<picture>` element with both. Hero image is 334KB right now → ~80KB as WebP.
- **Add og-image.png** to `/public/`. The HTML references it (`og:image` tag was on hermans original) but the file doesn't exist. LinkedIn/Slack/Twitter unfurls will look broken.
- **Add JSON-LD structured data** for `Service` and `LocalBusiness`. ~15 lines, helps SEO directly.
- **Wire up analytics** before any traffic hits. Plausible (€9/mo, GDPR-friendly) or Umami (self-hosted, free).
- **Add robots.txt and sitemap.xml** content (they exist but are minimal — hermans had the same; that's fine for now).
- **Test the theme toggle.** The plan added light-mode tokens but I never opened a browser. Validate before you ship.

---

## Prioritized next steps

If I could only do five things, in order:

1. **Replace `mailto:` CTAs with a real booking link** (Cal.com, 30 min).
2. **Add one piece of social proof** — a testimonial, a logo, a founder photo, or a sample-report download. Pick whichever you can ship within 48 hours.
3. **Decide the audit-only vs. audit+implementation question** and write a single sentence on the site that answers it.
4. **Cut the Problem section by 60%** and consider replacing the empathy gap with one warm sentence.
5. **Find your signature design move** — one thing on this site that no other shadcn-styled landing page would have. A custom 8-layer diagram is the obvious candidate.

Everything else can wait until you have a few real customers and learn what they actually respond to. Design polish before you have product-market fit is the most common mistake I see — you have the bones of a good site already; the next 10× isn't another design pass, it's getting one paying customer and writing about them on the homepage.
