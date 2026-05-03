import { ArrowLeft } from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import {
  WhatYouReceiveBetterImage,
  WhatYouReceiveCombined,
  WhatYouReceiveFourCards,
  WhatYouReceiveInteractive,
  WhatYouReceiveOriginal,
  WhatYouReceiveQuantified,
  WhatYouReceiveSampleFinding,
} from "@/components/whatyoureceive/WhatYouReceiveVariants"

interface Variant {
  id: string
  letter: string
  title: string
  tagline: string
  pros: string
  cons: string
  Component: ComponentType
}

const variants: Variant[] = [
  {
    id: "wyr-original",
    letter: "0",
    title: "Original — Current homepage",
    tagline: "Two-column layout. Left: 3 deliverable cards (report / findings / roadmap) + a footnote about the live walkthrough + a sample-report download CTA. Right: stock laptop+code image.",
    pros: "Layout is clean. Icons + cards are scannable. Sample-report download is a real trust signal.",
    cons: "The right-side image is a stock laptop+code shot — implies developer service, not strategy/operations. Live walkthrough is buried as a footnote despite being a high-value differentiator. Cards describe deliverables abstractly without page counts, finding counts, timeline length, or sample contents. Buyer can't picture what they're getting.",
    Component: WhatYouReceiveOriginal,
  },
  {
    id: "wyr-better-image",
    letter: "1",
    title: "Just swap the image — line-art report mockup",
    tagline: "Same layout, same content. Replaces the stock laptop+code image with a custom SVG report mockup in the V5 line-art aesthetic: three pages stacked with perspective offset, showing roadmap (back), findings (middle), and report cover with the 8 layers indexed (front).",
    pros: "Lowest-risk fix. Image now matches the V5 floor plan / brand drawing language. Visitor sees what the report actually looks like.",
    cons: "Doesn't address the 'walkthrough buried as footnote' or the 'cards too abstract' issues. Still 3 cards, still abstract descriptions.",
    Component: WhatYouReceiveBetterImage,
  },
  {
    id: "wyr-four-cards",
    letter: "2",
    title: "4 deliverables (walkthrough as equal card) + brand image",
    tagline: "Promotes the live walkthrough from footnote to a 4th equal card with mic icon. Each card now also has a small mono badge showing the quantifier (e.g. '40–60 pages', '20–30 findings', '12-week timeline', '60 min · recorded'). Replaces image with the line-art report mockup.",
    pros: "Walkthrough finally gets the weight it deserves — it's a real differentiator. Quantifier badges add specificity without adding bulk.",
    cons: "4 stacked cards is taller than 3. Still doesn't show what a finding actually looks like.",
    Component: WhatYouReceiveFourCards,
  },
  {
    id: "wyr-sample-finding",
    letter: "3",
    title: "Sample finding card replaces the image",
    tagline: "Same 3 deliverable cards on the left. Right column drops the image entirely and shows a fully-formatted sample finding: 'FINDING #07 · LAYER 02 · ACCESS CONTROL · HIGH PRIORITY' with business impact (€2,400 lost revenue), recommendation (€450 controller, 2-hour install), and effort + impact dot ratings.",
    pros: "Most tactile. Buyer instantly understands what they're getting because they're literally looking at it. Show, don't tell.",
    cons: "The sample is illustrative — labelled as such, but visitors who don't read the disclaimer might mistake it for a real client finding. Numbers are fabricated.",
    Component: WhatYouReceiveSampleFinding,
  },
  {
    id: "wyr-quantified",
    letter: "4",
    title: "Quantified deliverables (4 cards in a 2×2 grid)",
    tagline: "Drops the right-side image entirely. Goes wide with a 2×2 grid of 4 deliverable cards. Each card now has: badge (40–60 pages / 20–30 findings / 12-week timeline / 60-min recorded) + 3–4 bullet sub-deliverables (e.g. 'Executive summary (1 page) · Per-layer findings (2–6 pages each) · Vendor + integration map · Glossary for non-technical readers').",
    pros: "Most information-dense. Each card gives the buyer 6 facts about what they're getting instead of 1 abstract description. Most defensible — every claim has a measurable backing.",
    cons: "No visual moment. Can read as a brochure. The quantifier numbers (40–60 pages, 20–30 findings) need to match your actual delivery — flag if any are off.",
    Component: WhatYouReceiveQuantified,
  },
  {
    id: "wyr-combined",
    letter: "5",
    title: "Combined — 4 cards + report mockup + sample-finding peek + download",
    tagline: "Best of variants 1, 2, 3. Two-column layout: left has 4 deliverable cards with quantifier badges (walkthrough included). Right has the line-art report mockup + a 'PEEK INSIDE' expandable showing a real sample finding + the existing sample-report download in its own dashed-border block.",
    pros: "Hits the buyer's three concerns: what (4 cards), what does it look like (report mockup), how detailed (peek-inside finding). Brand-consistent visual language. Walkthrough finally gets equal billing.",
    cons: "Tallest section of the lot. The 'peek inside' details element requires interaction — visitors who don't click won't see the sample. Could be made always-visible if testing shows people don't click.",
    Component: WhatYouReceiveCombined,
  },
  {
    id: "wyr-interactive",
    letter: "6",
    title: "Interactive Report Viewer — moody frame + cycling screens (RECOMMENDED)",
    tagline: "Original 3-card layout on the left. Right side is a moody dark frame (mimicking the original photo's atmosphere via gradients + grain, no actual photo) with a 'screen' that cycles through 5 different report views every 5 seconds: 01 cover · 02 sample finding · 03 roadmap · 04 findings overview · 05 stack inventory. Pauses on hover, resumes on mouse-leave. Click the indicator chips below to jump to any screen. A 'LIVE PREVIEW' status pip top-right shows whether the cycle is running.",
    pros: "Tour of what they're getting without making them click. Atmospheric mood preserved without the wrong-signal developer photo. Far more compelling than any static image — visitor sees actual report depth (severity colours, finding details, roadmap costs, inventory tables). Best 'wow' moment of the section.",
    cons: "Most complex variant — five distinct screens to maintain. Numbers in the screens (€2,400, €450, 23 findings, 47 pages, etc.) are illustrative; verify they match real audits. Touch devices fall back to autoplay-only since hover doesn't fire on touch.",
    Component: WhatYouReceiveInteractive,
  },
]

function VariantSection({ variant, index }: { variant: Variant; index: number }) {
  const { Component } = variant
  return (
    <section className="border-t-2 border-border/60" id={variant.id}>
      <header className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          VARIANT / {String(index).padStart(2, "0")} / {variant.letter}
        </p>
        <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl">
          {variant.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{variant.tagline}</p>
        <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
          <p>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">PROS</span>{" "}
            <span className="text-foreground">{variant.pros}</span>
          </p>
          <p>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">CONS</span>{" "}
            <span className="text-muted-foreground">{variant.cons}</span>
          </p>
        </div>
      </header>
      <div className="border-t border-border/40">
        <Component />
      </div>
    </section>
  )
}

export function WhatYouReceiveDemo(): ReactNode {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 px-4 py-10 lg:px-6">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              INTERNAL / NOT LINKED FROM HOMEPAGE
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              What You Receive — direction options
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Six treatments for the deliverables section. 0 is the live homepage version
              (with the off-brand laptop+code image). 1–5 explore swapping the image,
              promoting the walkthrough to a real card, quantifying every deliverable,
              and showing a sample finding visually.
            </p>
          </div>
          <a
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            href="/"
          >
            <ArrowLeft className="size-4" />
            Home
          </a>
        </div>
        <nav className="mx-auto mt-8 flex max-w-5xl flex-wrap gap-2">
          {variants.map((v) => (
            <a
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              href={`#${v.id}`}
              key={v.id}
            >
              <span className="font-mono text-primary">{v.letter}</span>
              <span>{v.title.split("—")[1]?.trim() ?? v.title}</span>
            </a>
          ))}
        </nav>
      </header>
      <main>
        {variants.map((v, i) => (
          <VariantSection index={i} key={v.id} variant={v} />
        ))}
      </main>
      <footer className="border-t border-border/60 px-4 py-12 lg:px-6">
        <p className="mx-auto max-w-5xl text-sm text-muted-foreground">
          Pick a direction (or a hybrid). Selected variant becomes the new{" "}
          <code className="font-mono text-foreground">Deliverables</code> section.
        </p>
      </footer>
    </div>
  )
}
