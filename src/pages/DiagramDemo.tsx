import { ArrowLeft } from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import { EightLayerStack } from "@/components/EightLayerStack"
import { V2Blueprint } from "@/components/diagrams/V2Blueprint"
import { V3OSIStack } from "@/components/diagrams/V3OSIStack"
import { V4Radial } from "@/components/diagrams/V4Radial"
import { V5Topology } from "@/components/diagrams/V5Topology"
import { V6Iceberg } from "@/components/diagrams/V6Iceberg"
import { V7Honeycomb } from "@/components/diagrams/V7Honeycomb"
import { V8Minimal } from "@/components/diagrams/V8Minimal"

interface Variant {
  id: string
  title: string
  tagline: string
  pros: string
  cons: string
  Component: ComponentType
}

const variants: Variant[] = [
  {
    id: "v1-stacked",
    title: "V1 — Stacked glass (current)",
    tagline: "Single container, hairline dotted spine, mono numbers",
    pros: "Familiar, scannable, fits the existing glass design system",
    cons: "Reads like a fancy list — could feel safe / generic",
    Component: EightLayerStack,
  },
  {
    id: "v2-blueprint",
    title: "V2 — Blueprint grid",
    tagline: "4×2 dashed-border cells, technical-drawing markers, mono labels",
    pros: "Distinctive, on-brand for an audit firm, sharp",
    cons: "Cooler/colder vibe — risks intimidating non-technical operators",
    Component: V2Blueprint,
  },
  {
    id: "v3-osi",
    title: "V3 — Two-tone stack",
    tagline: "Layers split into MEMBER-FACING vs INFRASTRUCTURE bands",
    pros: "Communicates hierarchy + 'we see both halves' in one glance",
    cons: "The split is subjective — some layers don't fit cleanly",
    Component: V3OSIStack,
  },
  {
    id: "v4-radial",
    title: "V4 — Radial / orbital",
    tagline: "Members at the center, 8 layers orbiting around",
    pros: "Strong metaphor — everything serves the member experience",
    cons: "Hard to scan; numbers in circles feel small",
    Component: V4Radial,
  },
  {
    id: "v5-topology",
    title: "V5 — Floor-plan topology",
    tagline: "8 numbered nodes positioned where each layer lives in a real space",
    pros: "Most coworking-specific. Brand-defining.",
    cons: "Most work to perfect — needs a real floor-plan illustration",
    Component: V5Topology,
  },
  {
    id: "v6-iceberg",
    title: "V6 — Iceberg",
    tagline: "Above waterline = visible / Below = infrastructure",
    pros: "Memorable metaphor, visual punch",
    cons: "Forces a binary that doesn't match all 8 layers cleanly",
    Component: V6Iceberg,
  },
  {
    id: "v7-honeycomb",
    title: "V7 — Honeycomb",
    tagline: "8 hexagons in a 3-2-3 layout",
    pros: "Modern, distinctive shape language",
    cons: "Slightly trendy; tight space for descriptions",
    Component: V7Honeycomb,
  },
  {
    id: "v8-minimal",
    title: "V8 — Anti-design / minimal",
    tagline: "Hairline-divided list, mono numbers, no decoration at all",
    pros: "Confident — 'the work speaks, no styling needed'",
    cons: "Forgettable if the rest of the page isn't strong",
    Component: V8Minimal,
  },
]

function VariantSection({ variant, index }: { variant: Variant; index: number }) {
  const { Component } = variant
  return (
    <section className="border-t border-border/60 px-4 py-20 lg:px-6 lg:py-24" id={variant.id}>
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-baseline">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              VARIANT / {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl">
              {variant.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{variant.tagline}</p>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">PROS</span>{" "}
              <span className="text-foreground">{variant.pros}</span>
            </p>
            <p>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">CONS</span>{" "}
              <span className="text-muted-foreground">{variant.cons}</span>
            </p>
          </div>
        </div>
        <Component />
      </div>
    </section>
  )
}

export function DiagramDemo(): ReactNode {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 px-4 py-10 lg:px-6">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              INTERNAL / NOT LINKED FROM HOMEPAGE
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              8-layer diagram — direction options
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Eight visual treatments for the same data. Browse, react, pick a direction
              (or hybrid). The current homepage uses V1.
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
        <nav className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-2">
          {variants.map((v, i) => (
            <a
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              href={`#${v.id}`}
              key={v.id}
            >
              <span className="font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
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
          Pick one (or call out elements you want combined). The chosen variant becomes
          the new <code className="font-mono text-foreground">EightLayerStack</code> in
          AuditLayers.
        </p>
      </footer>
    </div>
  )
}
