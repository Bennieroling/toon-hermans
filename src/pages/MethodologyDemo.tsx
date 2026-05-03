import { ArrowLeft } from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import {
  MethodologyCombined,
  MethodologyDeliverablesLed,
  MethodologyHorizontalTimeline,
  MethodologyMatrix,
  MethodologyMerged,
  MethodologyOriginal,
  MethodologyVerticalStepper,
} from "@/components/methodology/MethodologyVariants"

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
    id: "method-original",
    letter: "0",
    title: "Original — Current homepage",
    tagline: "5 service-card phases in a horizontal grid. Number, title, duration badge, single description per card.",
    pros: "Clean, professional, scannable. Reads at a glance.",
    cons: "All 5 cards look identical — no visual hierarchy or progression. Buyer sees what we DO, not what they GET. No timeline. No commitment transparency. Static — feels like a brochure.",
    Component: MethodologyOriginal,
  },
  {
    id: "method-horizontal-timeline",
    letter: "1",
    title: "Horizontal timeline ruler",
    tagline: "Same 5 phase cards, but anchored to a real timeline at the top: DAY 0 → DAY 7 → DAY 14 → DAY 21. Each card has a 'DAY n' badge top-right and the deliverable as its description.",
    pros: "Makes '2–3 weeks' a visual reality, not just a phrase. Buyer sees their journey on a calendar.",
    cons: "The timeline ruler is decorative — it doesn't tie tightly to the cards visually. Still 5 identical-looking cards.",
    Component: MethodologyHorizontalTimeline,
  },
  {
    id: "method-vertical-stepper",
    letter: "2",
    title: "Vertical stepper with animated progress",
    tagline: "Vertical timeline running down the section. Each phase is a node with an icon (phone, document, send, check, mail) along the line. As you scroll, the line fills with brand-blue and the active phase highlights — node turns from outline to solid primary.",
    pros: "Most cinematic. Section feels like a process you're moving through. Active-phase highlight makes the section dynamic instead of static.",
    cons: "Vertical layout takes more height than the original. On small screens the icons can feel disconnected from the content.",
    Component: MethodologyVerticalStepper,
  },
  {
    id: "method-matrix",
    letter: "3",
    title: "YOU / WE / DELIVERABLE three-column matrix",
    tagline: "Each phase is a row with three columns: YOUR TIME (your commitment), OUR WORK (what we do), YOU WALK AWAY WITH (what's in your hands at the end). Header row labels the columns once at the top.",
    pros: "Most transparent. Buyer can quantify exactly what they're committing to ('one 30-minute call', '~2 hours', '3 hours of access calls'). Reduces sales-call objections before they happen.",
    cons: "Densest — 4 pieces of info per phase × 5 phases = a lot to read. Skimmers may drop off mid-table.",
    Component: MethodologyMatrix,
  },
  {
    id: "method-deliverables-led",
    letter: "4",
    title: "Deliverables-led reframe",
    tagline: "Restructures around what the buyer GETS, not what we DO. Headline: 'You don't wait 2–3 weeks for everything. Each phase ends with something concrete in your hands.' Then 4 milestones: 'Same-day after intake', 'End of week 1', 'End of week 2', 'End of week 3' — each with what's in your hands.",
    pros: "Most buyer-oriented. Reframes the audit as 'rolling delivery' rather than '3 weeks of black box → report'. Each milestone is something tangible.",
    cons: "Loses the 5-phase methodology breakdown — drops one milestone (assessment is folded into week 3). Some buyers want the methodology detail too.",
    Component: MethodologyDeliverablesLed,
  },
  {
    id: "method-combined",
    letter: "5",
    title: "Combined — vertical stepper + matrix + timeline",
    tagline: "Vertical stepper from variant 2 (animated progress + active phase highlight + icons). Each phase node opens into a card with the YOU/WE/DELIVERABLE matrix from variant 3. A small horizontal timeline ruler sits above the stepper showing day progress as you scroll. Headline mentions the total commitment: 'roughly 5 hours over 3 weeks'.",
    pros: "Most complete picture: when (timeline), what you do (your time column), what we do (our work column), what you get (deliverable column). All wrapped in animated progress as you scroll. Hits buyer's three concerns — time, commitment, outcome — in one section.",
    cons: "Tallest section of the lot. Most ambitious to land — pacing of the scroll-tracked progress matters. Test on real visitors before assuming the animation is delightful and not distracting.",
    Component: MethodologyCombined,
  },
  {
    id: "method-merged",
    letter: "6",
    title: "Merged — methodology + deliverables in ONE section (RECOMMENDED)",
    tagline: "Variant 5 plus a deliverables 'climax' at the bottom — replaces the separate 'What You Receive' section entirely. After the vertical stepper finishes, the section closes with: a 4-deliverable badge list (report / findings / roadmap / walkthrough) + report mockup + 'PEEK INSIDE' sample-finding peek + sample-report download CTA.",
    pros: "Removes the duplicate-content overlap with the standalone What-You-Receive section (process and outputs are described in two places today). One narrative arc: cause → effect. Frees one full section's worth of vertical space for something more valuable later. Climax at the end is naturally where buyer attention should peak.",
    cons: "Tallest section by a margin. If a buyer needs to *scan* deliverables fast (without reading the methodology), the standalone deliverables section was easier to find. Picking this means dropping the 'What You Receive' section from the homepage entirely.",
    Component: MethodologyMerged,
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

export function MethodologyDemo(): ReactNode {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 px-4 py-10 lg:px-6">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              INTERNAL / NOT LINKED FROM HOMEPAGE
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              Methodology — direction options
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Six treatments for the methodology section. 0 is the live homepage version
              (a 5-card grid). 1–5 explore making it bigger, more transparent, more
              animated, and more buyer-outcome-focused.
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
          <code className="font-mono text-foreground">Process</code> section on the homepage.
        </p>
      </footer>
    </div>
  )
}
