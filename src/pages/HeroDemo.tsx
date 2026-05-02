import { ArrowLeft } from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import { HeroA } from "@/components/heroes/HeroA"
import { HeroB } from "@/components/heroes/HeroB"
import { HeroC } from "@/components/heroes/HeroC"

interface HeroVariant {
  id: string
  title: string
  tagline: string
  pros: string
  cons: string
  Component: ComponentType
}

const variants: HeroVariant[] = [
  {
    id: "hero-a-schematic",
    title: "Path A — V5-style schematic",
    tagline: "The same floor plan as the AuditLayers section, used here as a static hero background. One unified visual language across the page.",
    pros: "Brand cohesion: hero and 8-layer section share the same drawing idiom. Cleanest move on the table.",
    cons: "Less photographic / less 'real'. The schematic feels engineered rather than 'this is your space'.",
    Component: HeroA,
  },
  {
    id: "hero-b-blueprint",
    title: "Path B — Real blueprint, refined",
    tagline: "Keeps the real architectural drawing. Stronger right-edge fade. Multiple animated tech overlay icons (WiFi, door reader, CCTV, server) instead of just one.",
    pros: "Most authentic — feels like an actual coworking floor plan with tech overlaid on top.",
    cons: "Style still doesn't match V5's schematic in the AuditLayers section below. The visual language shifts as the visitor scrolls.",
    Component: HeroB,
  },
  {
    id: "hero-c-autoplay",
    title: "Path C — V5 with auto-cycling focus",
    tagline: "Same as Path A, but the active layer advances 01 → 02 → ... → 08 every 2.4 seconds. Visitors see the system in motion.",
    pros: "Most distinctive. 'Wait, is that thing alive?' moment. Highest brand cohesion AND highest production value.",
    cons: "Could feel gimmicky if visitors arrive mid-cycle and see a partial state. Slightly more demanding on cognitive load.",
    Component: HeroC,
  },
]

function HeroSection({ variant, index }: { variant: HeroVariant; index: number }) {
  const { Component } = variant
  return (
    <section className="border-t-2 border-border/60" id={variant.id}>
      <header className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          PATH / {String(index + 1).padStart(2, "0")} / {String.fromCharCode(65 + index)}
        </p>
        <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl">
          {variant.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          {variant.tagline}
        </p>
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
              Three visual treatments for the homepage hero. The current
              homepage hero (real blueprint with single WiFi overlay) is the
              starting point; A, B, and C are different ways forward.
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
          {variants.map((v, i) => (
            <a
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              href={`#${v.id}`}
              key={v.id}
            >
              <span className="font-mono text-primary">{String.fromCharCode(65 + i)}</span>
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
          Pick a direction (or a hybrid). The chosen variant becomes the new{" "}
          <code className="font-mono text-foreground">Hero</code> section on the
          homepage.
        </p>
      </footer>
    </div>
  )
}
