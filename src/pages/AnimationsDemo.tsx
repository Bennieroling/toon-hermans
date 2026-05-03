import { ArrowRight, Check, CheckCircle, Clock, Download, Mail, Mic } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"

import { AnimateIn } from "@/components/AnimateIn"
import { V5Topology } from "@/components/diagrams/V5Topology"
import { LinkedInIcon } from "@/components/shared/LinkedInIcon"
import { Logo } from "@/components/shared/Logo"
import { Badge } from "@/components/ui/badge"
import { CountUp, FlowButton, TextReveal } from "@/components/ui/animations"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/hooks/useTheme"
import { bookingUrl, deliverables } from "@/lib/utils"

/**
 * /demo/animations — full-page composition combining the requested
 * section bases with the three animation primitives applied where
 * they earn their keep.
 *
 * Bases:
 * - Hero        → HeroIsometric (theme-aware iso illustration)
 * - Problem     → original 2-paragraph format with the user-supplied text
 * - Who we help → current production WhoIsThisFor (giant blue card)
 * - 8 layers    → current production V5b config
 * - Methodology → /demo/methodology Variant 1 (horizontal timeline ruler)
 * - You receive → /demo/whatyoureceive Variant 3 (sample finding card)
 * - Pricing / Founder / FinalCTA: clean light versions
 *
 * Animations applied:
 * - TextReveal     → Problem paragraph + Methodology headline
 * - CountUp        → Hero stat badges + Pricing €1,500 + sample-finding numbers
 * - FlowButton     → Primary CTAs in hero, pricing, and final CTA
 *
 * Light-default theme management mirrors /demo/redesign — overrides
 * stored preference on mount, restores on unmount.
 */

/* ==================================================================
   HEADER
================================================================== */

const navItems = [
  { key: "expertise", label: "Expertise", href: "#layers" },
  { key: "process", label: "Process", href: "#methodology" },
  { key: "pricing", label: "Pricing", href: "#pricing" },
  { key: "contact", label: "Contact", href: "#contact" },
]

function AnimHeader() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? "border-b border-border/50 bg-background/85 backdrop-blur-xl" : "border-b border-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-10">
        <a className="inline-flex items-center gap-2.5" href="#hero">
          <Logo className="size-6 text-primary" />
          <span className="font-display text-base font-bold uppercase tracking-[0.18em]">
            SORUN
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              href={item.href}
              key={item.key}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="hidden h-9 items-center justify-center rounded-full border border-border bg-background px-3 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground sm:inline-flex"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="button"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <a
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            href={bookingUrl}
            rel="noreferrer"
            target="_blank"
          >
            Get started
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </header>
  )
}

/* ==================================================================
   HERO — iso illustration + CountUp stats + FlowButton CTA
================================================================== */

function AnimHero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 0)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section
      className="relative overflow-hidden px-6 pt-20 pb-24 lg:px-10 lg:pt-28 lg:pb-36"
      id="hero"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div
            className={`transition-all duration-700 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
              Coworking technology advisory
            </p>
            <h1 className="mt-6 font-display text-5xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[5.5rem]">
              You run the space.
              <br />
              <span className="text-muted-foreground">We handle the tech.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              Coworking is a hospitality business with a network closet. We audit the systems
              that run your space — from WiFi and access control to your management platform.
              One fixed price. One clear roadmap.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                href={bookingUrl}
                rel="noreferrer"
                target="_blank"
              >
                Book a 30-minute call
                <ArrowRight className="size-4" />
              </a>
              <FlowButton href="#layers">See what we audit</FlowButton>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              No commitment. No sales pitch. A conversation about your space.
            </p>
          </div>

          <div
            className={`transition-all duration-700 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="relative">
              <div className="pointer-events-none absolute -right-10 -top-10 size-72 rounded-full bg-primary/12 blur-[100px]" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-border bg-background/50 shadow-lg shadow-black/5 dark:shadow-black/30">
                <img
                  alt="Isometric floor plan of a coworking space"
                  className="block h-full w-full object-cover dark:hidden"
                  fetchPriority="high"
                  src="/images/floorplan-iso-light.png"
                />
                <img
                  alt="Isometric floor plan of a coworking space"
                  className="hidden h-full w-full object-cover dark:block"
                  fetchPriority="high"
                  src="/images/floorplan-iso-dark.png"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-border/70 bg-background px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                    Layers
                  </p>
                  <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-foreground">
                    <CountUp end={8} duration={1200} format={false} />
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                    Findings
                  </p>
                  <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-foreground">
                    <CountUp end={20} duration={1400} format={false} suffix="–30" />
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                    From
                  </p>
                  <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-primary">
                    <CountUp end={1500} duration={1600} prefix="€" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   PROBLEM — original 2-paragraph format + TextReveal on first paragraph
================================================================== */

function AnimProblem() {
  return (
    <section
      className="scroll-mt-24 bg-muted/40 px-6 py-28 lg:px-10 lg:py-36"
      id="problem"
    >
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            The Problem
          </p>
        </AnimateIn>
        <div className="mt-10">
          <TextReveal
            className="font-display text-2xl font-medium tracking-[-0.015em] text-foreground sm:text-3xl"
            text="Recurring WiFi complaints lead to churn. Broken access control wastes your staff's time. Manual processes that should be automated eat hours every week. Most coworking spaces are running on technology decisions that made sense at setup but no longer fit how the space actually operates — and by the time it breaks, it has already cost you members, revenue, and reputation."
          />
        </div>
        <AnimateIn delay={200}>
          <p className="mt-10 text-base leading-7 text-muted-foreground sm:text-lg">
            The help that exists does not fit. Enterprise integrators are too expensive.
            General IT support does not understand your operations. Software vendors only care
            about their own platform. You need someone who understands the full stack and the
            business it supports.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   WHO WE HELP — current production format (giant blue card)
================================================================== */

const positiveQualifiers = [
  "Independent coworking or flex office operator",
  "Single-site or small multi-site — without enterprise IT resources",
  "Dealing with tech that wastes your time or frustrates your members",
  "Ready to fix it properly, once",
]

function AnimWhoWeHelp() {
  return (
    <section className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36" id="who">
      <AnimateIn>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-primary px-6 py-16 text-primary-foreground shadow-2xl shadow-primary/25 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_55%)] text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary-foreground/80">
              Who we help
            </p>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-[-0.04em] text-primary-foreground sm:text-4xl md:text-5xl">
              We work with independent operators who don't have a dedicated IT department.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-primary-foreground/85 sm:text-lg">
              Whether you are opening your first space or managing several, our audit ensures
              your technology foundations are built for growth, not firefighting.
            </p>
            <ul className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              {positiveQualifiers.map((q, i) => (
                <li
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground"
                  key={i}
                >
                  <CheckCircle className="size-4 shrink-0" />
                  {q}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-10 max-w-2xl text-sm leading-7 text-primary-foreground/80 sm:text-base">
              If you've already tried enterprise integrators, generalist IT, or your platform
              vendor's support team — you know they don't fit.
            </p>
            <p className="mt-6 font-display text-lg italic text-primary-foreground/90 sm:text-xl">
              If this sounds like you, we should talk.
            </p>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}

/* ==================================================================
   AUDIT LAYERS — current production V5b config
================================================================== */

function AnimAuditLayers() {
  return (
    <section className="scroll-mt-24 bg-muted/40 px-6 py-28 lg:px-10 lg:py-36" id="layers">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
                What we audit
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
                The 8 layers of workspace technology.
              </h2>
            </div>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              Every coworking space runs on these eight systems. We assess all of them — and
              how they connect.
            </p>
          </div>
        </AnimateIn>
        <div className="mt-14">
          <V5Topology capFloorHeight hideBottomLegend showTopTabs />
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   METHODOLOGY — Variant 1 (horizontal timeline ruler) + TextReveal
================================================================== */

interface MethodPhase {
  number: string
  title: string
  duration: string
  dayRange: string
  deliverable: string
}

const methodPhases: MethodPhase[] = [
  {
    number: "01",
    title: "Intake call",
    duration: "30–45 min",
    dayRange: "Day 0",
    deliverable: "A one-page scope summary in your inbox the same day.",
  },
  {
    number: "02",
    title: "Discovery",
    duration: "Async + 1 call",
    dayRange: "Days 1–4",
    deliverable: "A technology footprint document showing where each system lives.",
  },
  {
    number: "03",
    title: "Stack inventory",
    duration: "100% remote",
    dayRange: "Days 5–10",
    deliverable: "Complete stack inventory — typically 40–60 pages, indexed by layer.",
  },
  {
    number: "04",
    title: "Assessment",
    duration: "Analysis only",
    dayRange: "Days 11–14",
    deliverable: "Prioritised findings matrix with cost / effort / impact ratings.",
  },
  {
    number: "05",
    title: "Report & walkthrough",
    duration: "Delivered + 60-min call",
    dayRange: "Days 15–21",
    deliverable: "Full written report + executive summary + 90-day roadmap + recording.",
  },
]

function AnimMethodology() {
  return (
    <section
      className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
      id="methodology"
    >
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            The methodology
          </p>
        </AnimateIn>
        <div className="mt-5">
          <TextReveal
            className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl"
            text="From first call to final report in 2–3 weeks."
          />
        </div>

        {/* Horizontal timeline ruler */}
        <AnimateIn delay={120}>
          <div className="mt-16">
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border/60" />
              <div className="absolute left-0 top-1/2 h-px bg-primary" style={{ width: "100%" }} />
              <div className="relative flex justify-between">
                {[0, 7, 14, 21].map((day) => (
                  <div className="flex flex-col items-center" key={day}>
                    <div className="size-2 rounded-full bg-primary" />
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      DAY {day}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {methodPhases.map((phase, index) => (
                <AnimateIn delay={index * 80} key={phase.number}>
                  <Card className="service-card h-full border-border">
                    <CardContent className="p-6">
                      <div className="flex items-baseline justify-between">
                        <p className="font-display text-3xl font-black tracking-[-0.04em] text-primary">
                          {phase.number}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          {phase.dayRange}
                        </p>
                      </div>
                      <h3 className="mt-4 text-base font-bold text-foreground">{phase.title}</h3>
                      <Badge className="mt-2" variant="outline">
                        <Clock className="mr-1 size-3" />
                        {phase.duration}
                      </Badge>
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {phase.deliverable}
                      </p>
                    </CardContent>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   WHAT YOU RECEIVE — Variant 3 (sample finding) + CountUp on numbers
================================================================== */

function AnimWhatYouReceive() {
  return (
    <section
      className="scroll-mt-24 overflow-hidden bg-muted/40 px-6 py-28 lg:px-10 lg:py-36"
      id="deliverables"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
        <AnimateIn>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
              What you receive
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
              A clear picture and a plan to fix it.
            </h2>
            <div className="mt-10 space-y-5">
              {deliverables.map((item) => {
                const Icon = item.icon
                return (
                  <Card className="service-card group border-border" key={item.key}>
                    <CardContent className="flex gap-5 p-6">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:scale-110">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          {item.key === "report"
                            ? "Full written report"
                            : item.key === "findings"
                            ? "Prioritised findings"
                            : "Implementation roadmap"}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {item.key === "report"
                            ? "A detailed document covering all 8 layers of your technology infrastructure. Plain language. No jargon."
                            : item.key === "findings"
                            ? "Every finding categorised: act now, high priority, 90-day plan, and future consideration."
                            : "A sequenced plan showing what to fix first, what it will cost, and how long it will take."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
              <Card className="service-card group border-border" key="walkthrough">
                <CardContent className="flex gap-5 p-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:scale-110">
                    <Mic className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Live walkthrough + Q&amp;A
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      A 60-minute call where we present findings to your team. Recorded for the
                      people who couldn't make it.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimateIn>

        {/* Sample finding card with CountUp on numbers */}
        <AnimateIn delay={120}>
          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              SAMPLE FINDING · ILLUSTRATIVE
            </p>
            <div className="relative mt-4 overflow-hidden rounded-3xl border border-border bg-background/60 p-8 shadow-lg shadow-black/10 lg:p-10">
              <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    FINDING #07
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-destructive">
                    <span className="size-1.5 rounded-full bg-destructive" /> HIGH PRIORITY
                  </span>
                </div>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                  LAYER 02 · ACCESS CONTROL
                </p>
                <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  Door reader at meeting room 2 fails ~30% of access attempts.
                </h3>

                <dl className="mt-8 space-y-5">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      BUSINESS IMPACT
                    </dt>
                    <dd className="mt-1 text-sm leading-7 text-foreground sm:text-[15px]">
                      Estimated{" "}
                      <span className="font-bold text-foreground">
                        <CountUp end={12} duration={1200} format={false} /> missed bookings/month
                      </span>{" "}
                      →{" "}
                      <span className="font-bold text-foreground">
                        <CountUp end={2400} duration={1500} prefix="€" />
                      </span>{" "}
                      in lost revenue + member friction.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      RECOMMENDATION
                    </dt>
                    <dd className="mt-1 text-sm leading-7 text-foreground sm:text-[15px]">
                      Replace controller (Aperio kit) —{" "}
                      <span className="font-bold text-foreground">
                        <CountUp end={450} duration={1300} prefix="€" />
                      </span>
                      , 2-hour install. Vendor: ASSA ABLOY.
                    </dd>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        EFFORT
                      </dt>
                      <dd className="mt-1 flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            className={`size-3 rounded-full ${n <= 2 ? "bg-primary" : "bg-border"}`}
                            key={`e-${n}`}
                          />
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        IMPACT
                      </dt>
                      <dd className="mt-1 flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            className={`size-3 rounded-full ${n <= 4 ? "bg-primary" : "bg-border"}`}
                            key={`i-${n}`}
                          />
                        ))}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Every finding follows this format. Roughly{" "}
              <CountUp end={20} duration={1400} format={false} suffix="–30" /> findings per
              audit, all severity-rated.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   PRICING — clean light + CountUp on €1,500
================================================================== */

function AnimPricing() {
  return (
    <section
      className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
      id="pricing"
    >
      <div className="mx-auto max-w-3xl text-center">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            Entry-point audit
          </p>
          <p className="mt-7 font-display text-7xl font-black tracking-[-0.05em] text-foreground sm:text-8xl">
            from{" "}
            <span className="text-primary">
              <CountUp end={1500} duration={1800} prefix="€" />
            </span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Fixed price for a single-location audit. No hourly billing, no surprises.
          </p>
        </AnimateIn>
        <AnimateIn delay={150}>
          <ul className="mx-auto mt-10 flex max-w-md flex-col gap-3">
            {["Fixed scope, clear deliverables", "2–3 week turnaround", "100% remote delivery"].map(
              (feature, i) => (
                <li
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-background px-5 py-3 text-left text-sm text-foreground"
                  key={i}
                >
                  <Check className="size-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ),
            )}
          </ul>

          <div className="mt-10 flex justify-center">
            <a
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              href={bookingUrl}
              rel="noreferrer"
              target="_blank"
            >
              Book a free 30-minute call
              <ArrowRight className="size-4" />
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   FOUNDER
================================================================== */

function AnimFounder() {
  return (
    <section
      className="scroll-mt-24 bg-muted/40 px-6 py-28 lg:px-10 lg:py-36"
      id="founder"
    >
      <div className="mx-auto max-w-4xl">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">About</p>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl">
            Built by someone who has lived this.
          </h2>
        </AnimateIn>
        <AnimateIn delay={120}>
          <div className="mt-12 grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
            <div className="relative inline-flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-border bg-background sm:size-40">
              <span
                aria-hidden
                className="font-display text-5xl font-black tracking-[-0.04em] text-primary/40"
              >
                YN
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                [Your Name]
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Founder
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-foreground sm:text-lg">
                I spent [N years] auditing and running technology across [N coworking and flex
                office locations] before starting this. I know what fails on a Tuesday morning
                and why — and I know what good looks like. This is the work I want to be doing.
              </p>
              <a
                aria-label="Connect on LinkedIn"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                href="https://linkedin.com/in/YOUR-HANDLE"
                rel="noreferrer"
                target="_blank"
              >
                <LinkedInIcon className="size-4 text-primary" />
                LinkedIn
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   FINAL CTA — FlowButton on the sample report download
================================================================== */

function AnimFinalCTA() {
  return (
    <section className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36" id="contact">
      <AnimateIn>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            Get in touch
          </p>
          <h2 className="mt-5 font-display text-4xl font-black leading-tight tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
            Get the tech right.
            <br />
            <span className="text-muted-foreground">The rest gets easier.</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              href={bookingUrl}
              rel="noreferrer"
              target="_blank"
            >
              Book a 30-minute call
              <ArrowRight className="size-4" />
            </a>
            <FlowButton href="/sample-report.pdf">
              <Download className="size-4" />
              Download sample report
            </FlowButton>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            <a className="hover:text-foreground" href="mailto:hello@sorun.dev">
              <Mail className="mr-1 inline size-3.5" />
              hello@sorun.dev
            </a>
          </p>
        </div>
      </AnimateIn>
    </section>
  )
}

/* ==================================================================
   FOOTER
================================================================== */

function AnimFooter() {
  return (
    <footer className="border-t border-border/50 bg-background px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Logo className="size-6 text-primary" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground">
            SORUN.DEV
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a className="transition hover:text-foreground" href="mailto:hello@sorun.dev">
            hello@sorun.dev
          </a>
          <a
            aria-label="Sorun on LinkedIn"
            className="inline-flex items-center gap-1.5 transition hover:text-primary"
            href="https://linkedin.com/in/YOUR-HANDLE"
            rel="noreferrer"
            target="_blank"
          >
            <LinkedInIcon className="size-3.5" />
            LinkedIn
          </a>
          <span>© 2026 Sorun</span>
        </div>
      </div>
    </footer>
  )
}

/* ==================================================================
   PAGE
================================================================== */

export function AnimationsDemo(): ReactNode {
  useEffect(() => {
    const root = document.documentElement
    const prevDark = root.classList.contains("dark")
    const prevLight = root.classList.contains("light")
    const prevStored = window.localStorage.getItem("sorun-theme")

    root.classList.remove("dark")
    root.classList.add("light")

    return () => {
      root.classList.remove("light", "dark")
      if (prevDark) root.classList.add("dark")
      if (prevLight) root.classList.add("light")
      if (prevStored !== null) window.localStorage.setItem("sorun-theme", prevStored)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <AnimHeader />
      <main>
        <AnimHero />
        <AnimProblem />
        <AnimWhoWeHelp />
        <AnimAuditLayers />
        <AnimMethodology />
        <AnimWhatYouReceive />
        <AnimPricing />
        <AnimFounder />
        <AnimFinalCTA />
      </main>
      <AnimFooter />
    </div>
  )
}
