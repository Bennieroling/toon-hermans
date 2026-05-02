import { ArrowLeft } from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import {
  WhoWeHelpCalmContainer,
  WhoWeHelpCombined,
  WhoWeHelpDeclarative,
  WhoWeHelpForYouOrNot,
  WhoWeHelpOperatorQuote,
  WhoWeHelpOriginal,
  WhoWeHelpPositive,
  WhoWeHelpRecognition,
  WhoWeHelpScaleSpectrum,
} from "@/components/whowehelp/WhoWeHelpVariants"

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
    id: "ww-original",
    letter: "0",
    title: "Original — Current homepage",
    tagline: "Big blue card with negative-defined headline ('operators who DON'T have IT'), 4 qualifier pills, alternatives line, italic closing — no CTA button.",
    pros: "The blue card is a strong visual moment. Qualifier pills are concrete and scannable.",
    cons: "Defines audience by what they LACK (negative framing). Generic body copy. No CTA — visitor has nowhere to go after reading.",
    Component: WhoWeHelpOriginal,
  },
  {
    id: "ww-positive",
    letter: "1",
    title: "Positive reframe — defined by what you ARE",
    tagline: "Same big blue card, but headline is positive: 'Built for the operator who runs the space AND the tech.' Qualifier pills rephrased positively. Adds a CTA button to the bottom of the card.",
    pros: "Confident framing. Adds a clear booking CTA so the section pushes toward conversion.",
    cons: "Still uses the same big blue card — visually identical to original. The change is mostly tone.",
    Component: WhoWeHelpPositive,
  },
  {
    id: "ww-recognition",
    letter: "2",
    title: "Recognition — 'if you're here, you probably…'",
    tagline: "Drops the blue card. Lists 4 specific recognition moments: 'Just opened your second location and the tech is starting to drag…', 'Inherited a stack from the previous owner…', etc. Same vertical accent rail as the Problem section.",
    pros: "Most operator-voice. Each beat is a concrete moment a real operator can say 'yes, that's me' to. Visually consistent with the Problem section above.",
    cons: "Less filtering — more invitation than qualifier. Risk of attracting wrong-fit operators who recognise the pain but aren't the right scale.",
    Component: WhoWeHelpRecognition,
  },
  {
    id: "ww-foryou-or-not",
    letter: "3",
    title: "For you / Not for you — explicit anti-positioning",
    tagline: "Two-column layout. Left column 'FOR YOU IF…' with 4 positive qualifiers and primary-blue tint. Right column 'NOT FOR YOU IF…' with 4 disqualifiers and muted treatment. Sharpens by exclusion.",
    pros: "Explicit anti-positioning is rare and credibility-building. Filters out wrong-fit visitors quickly. Operator can see themselves on either side and self-qualify.",
    cons: "Could feel cold — 'who we don't help' is unusual on a B2B site. Risks reading as standoffish.",
    Component: WhoWeHelpForYouOrNot,
  },
  {
    id: "ww-operator-quote",
    letter: "4",
    title: "Operator quote — fictional but realistic voice",
    tagline: "Replaces qualifiers with a single composite operator quote: 'I run two locations in Amsterdam. I've been the unofficial IT person for three years…' Marked as 'composite operator · illustrative' so it's not misleading.",
    pros: "Most distinctive. Sounds like a real operator, not a marketing agency. The quote IS the positioning.",
    cons: "Marking it 'illustrative' admits it's not a real testimonial — could undermine the very credibility it's trying to build. Replace with real quote when you have one.",
    Component: WhoWeHelpOperatorQuote,
  },
  {
    id: "ww-calm",
    letter: "5",
    title: "Calmer container — drop the giant blue card",
    tagline: "Same content as original (uses i18n) but in a quieter typography-led layout: max-w-3xl center, thin-border qualifier chips, no big blue card, no shouting.",
    pros: "More confident. 'You don't need shouting if you're saying the right thing.' Lets the headline carry the weight.",
    cons: "Loses the visual anchor — the blue card was the strongest visual moment on the page after the hero.",
    Component: WhoWeHelpCalmContainer,
  },
  {
    id: "ww-declarative",
    letter: "6",
    title: "Single declarative — one big sentence",
    tagline: "Drops the qualifiers entirely. One huge sentence with two primary-blue accents: 'We work with hands-on operators of 1–5 coworking locations who are ready to stop muddling through and start planning their stack instead of inheriting it.' CTA below.",
    pros: "Leanest possible. Headline IS the positioning. Easy to remember, easy to share.",
    cons: "Loses the recognisable specifics that helped operators see themselves. Pure positioning, no recognition moment.",
    Component: WhoWeHelpDeclarative,
  },
  {
    id: "ww-spectrum",
    letter: "7",
    title: "Scale spectrum — visual showing where we fit",
    tagline: "Custom horizontal-bar visual showing 1 → 50+ locations with our sweet spot (2–5) highlighted. Each stop has a brief description. Frames the positioning as 'the gap between too small for IT and too big to need outside help'.",
    pros: "Most visually distinctive. Shows positioning instead of telling. Makes scale-fit obvious in 2 seconds.",
    cons: "Custom visual element to maintain. Doesn't capture qualitative qualifiers (e.g. 'hands-on' or 'tired of muddling through').",
    Component: WhoWeHelpScaleSpectrum,
  },
  {
    id: "ww-combined",
    letter: "8",
    title: "Combined — spectrum + For-you/Not-for-you + CTA (RECOMMENDED)",
    tagline: "Stacks the strongest pieces from 7, 3, and 1 in sequence. Top: compact scale spectrum (position visually). Middle: For-you/Not-for-you two columns (filter qualitatively). Bottom: alternatives line + 'Sounds like you? Let's talk' + booking CTA (push to action).",
    pros: "Walks the visitor through position → filter → act in one section. Each block does one job. Most complete and most defensible.",
    cons: "Tallest section of the lot. If page-length is a concern, picking just one of the three blocks would still work.",
    Component: WhoWeHelpCombined,
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

export function WhoWeHelpDemo(): ReactNode {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 px-4 py-10 lg:px-6">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              INTERNAL / NOT LINKED FROM HOMEPAGE
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              Who We Help — direction options
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Eight treatments for the homepage &quot;Who we help&quot; section. 0 is the
              live version. 1–7 explore different framings — positive vs negative,
              filtering vs inviting, declarative vs visual, big-blue-card vs calm.
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
          <code className="font-mono text-foreground">WhoIsThisFor</code> section on the
          homepage.
        </p>
      </footer>
    </div>
  )
}
