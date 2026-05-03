import { ArrowLeft } from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import { HeroB } from "@/components/heroes/HeroB"
import { HeroIsometric } from "@/components/heroes/HeroIsometric"
import { HeroOriginal } from "@/components/heroes/HeroOriginal"
import {
  HeroD,
  HeroDE1,
  HeroDE2,
  HeroDE2Alert,
  HeroDE2Narrative,
  HeroDE2Sweep,
  HeroDE2SweepBadges,
  HeroDE2Ticker,
  HeroDE2Web,
  HeroDE3,
} from "@/components/heroes/HeroSchematics"

interface HeroVariant {
  id: string
  letter: string
  title: string
  tagline: string
  pros: string
  cons: string
  Component: ComponentType
}

const variants: HeroVariant[] = [
  {
    id: "hero-original",
    letter: "0",
    title: "Original — First shipped hero (preserved for reference)",
    tagline: "The original homepage hero before this exploration: raster architectural-blueprint image with a single animated WiFi-pulse overlay. Kept here so we can always revert or share for outside opinions.",
    pros: "Real, authentic floor plan — feels like an actual coworking space.",
    cons: "Visual style doesn't match V5's schematic in AuditLayers below; the right-edge fade between image and copy column is harsh in light mode.",
    Component: HeroOriginal,
  },
  {
    id: "hero-isometric",
    letter: "I",
    title: "Isometric — Gemini-generated floor plan, theme-aware (RECOMMENDED)",
    tagline: "Uses the same layout / type / CTA treatment as the redesign hero, but the right-column visual is the AI-generated isometric floor plan illustration. Light version on light theme, dark version on dark theme — auto-swap via the existing .dark class. Three data badges below (8 layers / 2–3 wk / from €1,500).",
    pros: "Far more polished than the V5 schematic for a hero moment. Brand voice matches (north arrow, scale bar, blue accents). Works in both themes.",
    cons: "Static (no auto-cycle / pulses). Files are 1.8MB / 2.3MB unoptimised — needs WebP conversion before shipping to production.",
    Component: HeroIsometric,
  },
  {
    id: "hero-b-blueprint",
    letter: "B",
    title: "Path B — Real blueprint, multiple tech overlays",
    tagline: "Real architectural drawing, stronger horizontal fade, multiple animated tech overlay icons (WiFi pulse, door reader, CCTV cone, server LEDs, meeting display).",
    pros: "Most authentic — feels like an actual coworking floor plan with tech overlaid on top.",
    cons: "Visual language doesn't match V5's schematic in the AuditLayers section below.",
    Component: HeroB,
  },
  {
    id: "hero-d-schematic",
    letter: "D",
    title: "Path D — Schematic floor plan, ambient",
    tagline: "Custom V5-style floor plan, no numbered hotspots, with ambient tech overlays (WiFi rings, CCTV cone, door reader pulse, server LEDs, meeting display strip).",
    pros: "Brand cohesion — same drawing language as the AuditLayers section below. Calm, professional.",
    cons: "On its own, can feel quiet/static after a few seconds.",
    Component: HeroD,
  },
  {
    id: "hero-d-e2-multievent",
    letter: "D+E2",
    title: "Path D + E2 — Live multi-event simulation",
    tagline: "Same schematic, but with several events firing continuously: fob taps on multiple doors, packets flying around the WiFi, a phone ringing in the booth, dashboard counter ticking, a member dot walking through the corridor, printer briefly active.",
    pros: "Most 'alive' — feels like watching a control-room view of the building. High production value.",
    cons: "Could be visually busy. Risk of distracting from the headline.",
    Component: HeroDE2,
  },
  {
    id: "hero-d-e1-flythrough",
    letter: "D+E1",
    title: "Path D + E1 — Cinematic camera fly-through",
    tagline: "Schematic plus auto camera moves: viewBox transitions every ~3.4s through 5 framings — wide overview → entrance → coworking floor → meeting room → IT closet → back to overview.",
    pros: "Most dramatic. Each shot feels like an architectural reel. Implies 'we look at every part of your space'.",
    cons: "Cycle is rigid — once the visitor sees one full loop, the magic fades. Also some viewers prefer not to be 'driven' by an auto-cycle.",
    Component: HeroDE1,
  },
  {
    id: "hero-d-e3-spotlight",
    letter: "D+E3",
    title: "Path D + E3 — Pointer spotlight + parallax",
    tagline: "Schematic stays static. Cursor casts a soft brand-blue spotlight that follows the mouse, plus subtle layered parallax — background and foreground shift in opposite directions as you move.",
    pros: "Highly interactive without demanding clicks. Encourages exploration. Feels modern.",
    cons: "Touch devices fall back to no-spotlight. Effect is subtle — desktop only signal.",
    Component: HeroDE3,
  },
  {
    id: "hero-de2-narrative",
    letter: "1",
    title: "Option 1 — Narrative cycle (a day in the space)",
    tagline: "Phase chip in the corner advances every 4s through 5 stages: Morning arrival → Meeting starts → Lunch rush → Peak network → Quiet/overnight. Different events fire each phase, so the floor plan tells a 20-second story.",
    pros: "Most sophisticated. Story arc implies 'we monitor your space all day, every part of it'.",
    cons: "Needs to be seen for ~20 s to land. Reset back to morning can feel abrupt if pacing is off.",
    Component: HeroDE2Narrative,
  },
  {
    id: "hero-de2-sweep",
    letter: "2",
    title: "Option 2 — System sweep / radar scan",
    tagline: "D+E2 base + a vertical brand-blue scan line moves left to right every 8 seconds. As it passes over each tech point (door reader, CCTV, WiFi, phone, display, server), that point over-pulses with an extra-large ring.",
    pros: "Visceral 'audit in progress' feel. Fastest 'wait, that's clever' reaction.",
    cons: "Risk of looking like an alarm scanner — make sure the line stays calm and brand-blue, not red.",
    Component: HeroDE2Sweep,
  },
  {
    id: "hero-de2-ticker",
    letter: "3",
    title: "Option 3 — Live telemetry ticker + data badges",
    tagline: "D+E2 base + a thin scrolling ticker at the bottom (WIFI HEALTHY 84 MBPS · 12 DEVICES · CCTV REC ZONE A · 847 MEMBERS · ...) plus 4 inline data badges anchored to tech points (Mbps next to AP, CPU% next to server, members in reception, cams next to camera).",
    pros: "Most enterprise / 'real numbers'. Adds weight without flashiness.",
    cons: "Adds visual noise at the bottom — narrows where the floor plan can breathe.",
    Component: HeroDE2Ticker,
  },
  {
    id: "hero-de2-web",
    letter: "4",
    title: "Option 4 — Connection web (system interconnections)",
    tagline: "D+E2 base + faint dashed lines connecting tech points to the server rack (the 'brain'), with packets traveling along each connection. Tiny labels mark what each line carries (WIFI ↔ CTRL, NVR FEED, ROOM AV, ACCESS LOG).",
    pros: "Most differentiating message: 'we see how every system connects, not just the parts'.",
    cons: "Adds the most visual clutter to the floor plan. Could feel diagram-busy.",
    Component: HeroDE2Web,
  },
  {
    id: "hero-de2-alert",
    letter: "5",
    title: "Option 5 — Issue detected → resolved dramaturgy",
    tagline: "D+E2 base + every ~12 seconds, a random tech point shows a red 'ISSUE DETECTED' indicator for 1.5s, then transitions to a green 'AUTO-RESOLVED' indicator for another 1.5s. Implies: 'we catch issues before your members feel them'.",
    pros: "Most direct sales positioning — visibly sells the value of the audit.",
    cons: "Risky: visitors who arrive mid-alert see 'something is wrong' and might bounce. Use sparingly.",
    Component: HeroDE2Alert,
  },
  {
    id: "hero-de2-sweep-badges",
    letter: "6",
    title: "Option 6 — System sweep + inline data badges (RECOMMENDED)",
    tagline: "D+E2 base + Option 2's vertical scan line every 8s + Option 3's inline data badges (Mbps near AP, CPU% on server, members in reception, cams next to camera). No bottom marquee. Sweep gives the dramatic 'wait, that's clever' moment; badges ground it in real numbers continuously.",
    pros: "Best simplicity-to-impact ratio. 'Operations control room' feel. Numbers + scan together = sophisticated, continuous audit.",
    cons: "Slightly busier than Option 2 alone, but much less so than the full ticker.",
    Component: HeroDE2SweepBadges,
  },
]

function HeroSection({ variant, index }: { variant: HeroVariant; index: number }) {
  const { Component } = variant
  return (
    <section className="border-t-2 border-border/60" id={variant.id}>
      <header className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          PATH / {String(index + 1).padStart(2, "0")} / {variant.letter}
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

export function HeroDemo(): ReactNode {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 px-4 py-10 lg:px-6">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              INTERNAL / NOT LINKED FROM HOMEPAGE
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              Hero — direction options
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Five visual treatments for the homepage hero. B is the
              "real blueprint" reference. D is the new schematic baseline. The
              three D-variants layer different motion modes on top.
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
          <HeroSection index={i} key={v.id} variant={v} />
        ))}
      </main>
      <footer className="border-t border-border/60 px-4 py-12 lg:px-6">
        <p className="mx-auto max-w-5xl text-sm text-muted-foreground">
          Pick a direction (or a hybrid like "D+E2 but slower" or "D+E3 with a
          touch-friendly fallback"). The chosen variant becomes the new{" "}
          <code className="font-mono text-foreground">Hero</code> on the homepage.
        </p>
      </footer>
    </div>
  )
}
