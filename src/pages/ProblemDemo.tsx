import { ArrowLeft } from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import {
  ProblemAllCombined,
  ProblemAnimatedBullets,
  ProblemDifferentiatedParagraphs,
  ProblemEscalatingBullets,
  ProblemOriginal,
  ProblemPullquote,
  ProblemSharpenedClosing,
  ProblemSystemGaps,
  ProblemTightenedVoice,
  ProblemWithPivot,
} from "@/components/problems/ProblemVariants"

interface ProblemVariant {
  id: string
  letter: string
  title: string
  tagline: string
  pros: string
  cons: string
  Component: ComponentType
}

const variants: ProblemVariant[] = [
  {
    id: "problem-original",
    letter: "0",
    title: "Original — Current homepage",
    tagline: "Three Tuesday-morning scenarios on a vertical accent rail, then an empathy paragraph and a closing context paragraph. Centered max-w-3xl text block.",
    pros: "Specific scenarios are recognisable. The 'hospitality business with a network closet' line is brand-defining.",
    cons: "Mostly empty page (typography in a box), Tuesday/Monday day inconsistency, empathy + closing paragraphs read identically, no pivot to action.",
    Component: ProblemOriginal,
  },
  {
    id: "problem-pullquote",
    letter: "1",
    title: "Visual #1 — Stat / pull-quote on the right",
    tagline: "Two-column layout. Left column unchanged. Right column has a big '#1 complaint members make about coworking spaces · WiFi reliability' stat card.",
    pros: "Fills the right-side dead space. Adds visual weight without adding noise. Ready to swap with a real audit number when you have one.",
    cons: "Stat is currently illustrative (no real source data) — the card admits this in small print, but a survey claim with no citation can hurt credibility if visitors look closely.",
    Component: ProblemPullquote,
  },
  {
    id: "problem-animated-bullets",
    letter: "2",
    title: "Visual #2 — Pulsing bullet dots",
    tagline: "The three blue bullet dots pulse with a brand-blue ring expansion every 2.4s, staggered 0.6s apart.",
    pros: "Echoes the live-system feel of the hero above. Subtle but meaningful — section feels alive.",
    cons: "If overused with the hero's pulses still in view, the page can feel like everything is blinking. Test together.",
    Component: ProblemAnimatedBullets,
  },
  {
    id: "problem-differentiated",
    letter: "3",
    title: "Visual #3 — Differentiated empathy vs closing",
    tagline: "Empathy stays as a regular paragraph. Closing becomes a left-bordered callout in display type — bigger, bolder, visually marked as 'the one to remember'.",
    pros: "Forces the eye to read empathy and closing as two beats, not one wall. Closing now lands like a punch.",
    cons: "Adds a card-like element to a section that's currently all flowing text. Could feel inconsistent with sections that have no callouts.",
    Component: ProblemDifferentiatedParagraphs,
  },
  {
    id: "problem-escalating",
    letter: "4",
    title: "Content #4 — Escalating bullets + consistent Monday",
    tagline: "All three scenarios reference Monday morning (no more Tuesday/Monday split). Severity escalates: WiFi tweet → 2 hours of staff hand-letting people in → re-entering invoices AND missing some.",
    pros: "Fixes the day inconsistency. Each bullet has more weight than the last — story builds. Most defensible content edit.",
    cons: "Slightly longer scenarios. The 'two hours' specificity is invented and might not apply to every operator's reality.",
    Component: ProblemEscalatingBullets,
  },
  {
    id: "problem-sharpened-closing",
    letter: "5",
    title: "Content #5 — Sharpened closing",
    tagline: "Replaces 'Most spaces grow faster than their infrastructure...' with: 'By the time it breaks, it's not a tech problem. It's a churn problem.'",
    pros: "Punchier. Connects friction directly to the metric operators care most about (churn). Memorable.",
    cons: "Loses the 'members, revenue, and reputation' triple — that line was rich. The new closing is leaner but says less per word.",
    Component: ProblemSharpenedClosing,
  },
  {
    id: "problem-pivot",
    letter: "6",
    title: "Content #6 — Pivot line bridging to next section",
    tagline: "Adds a single bridging line at the very end, separated by a hairline rule, in display type with an arrow: 'Most operators muddle through. We help them stop. →'",
    pros: "Gives the visitor something to do with the pain. Visually signals 'now read on'. Adds momentum to the scroll.",
    cons: "Could feel like over-explanation. Some sites trust visitors to figure out the bridge themselves.",
    Component: ProblemWithPivot,
  },
  {
    id: "problem-tightened-voice",
    letter: "7",
    title: "Content #7 — Compressed empathy + 4th emotional scenario",
    tagline: "Drops 'We know how exhausting it is...' (telling) for a sharper 'Coworking is a hospitality business with a network closet. Your members don't see the tech — they judge you on the WiFi.' Adds a 4th scenario: 'You arrive at 7:30am to apologise to a member who couldn't get in.'",
    pros: "Show, don't tell. Adds a human moment among the technical ones. The 7:30am scenario is the most relatable.",
    cons: "Adds a scenario to a section that already runs longer than the others on the page. Empathy line is leaner but loses the explicit 'we get it' acknowledgment.",
    Component: ProblemTightenedVoice,
  },
  {
    id: "problem-all-combined",
    letter: "8",
    title: "Combined — All proposed changes together",
    tagline: "Pull-quote on the right + animated bullets + escalating Monday-morning bullets + 4th 7:30am scenario + compressed empathy + sharpened closing in a callout + pivot line at the bottom. The full proposal.",
    pros: "Strongest version. Every fix applied. Section has visual weight, content escalates, and the section ends with a forward-looking line.",
    cons: "Most invasive change. Mixing the stat + the callout + the pivot line in one section can feel like a lot — risk of over-design.",
    Component: ProblemAllCombined,
  },
  {
    id: "problem-system-gaps",
    letter: "9",
    title: "Reframe — The gaps between your systems (story-in-facts)",
    tagline: "Drops the incident framing entirely. Shows 5 concrete capability gaps where systems should talk to each other but don't (Booking ↔ Access, Membership ↔ Printing, WiFi ↔ Occupancy, VC ↔ Cleaning, Onboarding ↔ Everything). Each beat shows what 'wired' looks like vs. what an unintegrated stack actually does.",
    pros: "Honest scope — doesn't promise to stop incidents you can't prevent. Maps directly to what an audit reveals: integrations that should exist, don't. Differentiates from generic IT helpdesks.",
    cons: "Longer than the current section. Reads more like an article than a quick scroll. May benefit from being shorter/punchier on mobile.",
    Component: ProblemSystemGaps,
  },
]

function ProblemSection({ variant, index }: { variant: ProblemVariant; index: number }) {
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

export function ProblemDemo(): ReactNode {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 px-4 py-10 lg:px-6">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              INTERNAL / NOT LINKED FROM HOMEPAGE
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              Problem section — direction options
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Nine treatments for the &quot;The Friction&quot; section. 0 is the live homepage version
              (preserved unchanged). 1–7 are individual proposed changes. 8 combines them all.
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
          <ProblemSection index={i} key={v.id} variant={v} />
        ))}
      </main>
      <footer className="border-t border-border/60 px-4 py-12 lg:px-6">
        <p className="mx-auto max-w-5xl text-sm text-muted-foreground">
          Pick whichever (or a hybrid). Selected variant becomes the new{" "}
          <code className="font-mono text-foreground">Problem</code> section on the homepage.
        </p>
      </footer>
    </div>
  )
}
