import { Check, Clock, FileText, Mail, Phone, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { phases } from "@/lib/utils"

/**
 * Six variants of the Methodology section for /demo/methodology.
 * Variant 0 reads from i18n (current homepage).
 * Variants 1–5 hardcode richer English copy that adds buyer-side
 * transparency (timeline, commitment, deliverables) the original
 * doesn't surface.
 */

/* ------------------------------------------------------------------ */
/* 0 — ORIGINAL                                                        */
/* ------------------------------------------------------------------ */

export function MethodologyOriginal() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <AnimateIn className="lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
                {t("process.label")}
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
                {t("process.headline")}
              </h2>
            </div>
          </div>
        </AnimateIn>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:px-6">
          {phases.map((phase, index) => (
            <AnimateIn delay={index * 80} key={phase}>
              <Card className="service-card group h-full border-border">
                <CardContent className="p-7">
                  <p className="font-display text-4xl font-black tracking-[-0.04em] text-primary">
                    {t(`process.phases.${phase}.number`)}
                  </p>
                  <h3 className="mt-6 text-lg font-bold text-foreground">
                    {t(`process.phases.${phase}.title`)}
                  </h3>
                  <Badge className="mt-3" variant="outline">
                    {t(`process.phases.${phase}.duration`)}
                  </Badge>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {t(`process.phases.${phase}.description`)}
                  </p>
                </CardContent>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Shared — richer phase data used by variants 1-5                    */
/* ------------------------------------------------------------------ */

interface RichPhase {
  number: string
  title: string
  duration: string
  dayRange: string
  dayStart: number
  dayEnd: number
  buyerCommit: string
  whatWeDo: string
  deliverable: string
  icon: typeof Phone
}

const richPhases: RichPhase[] = [
  {
    number: "01",
    title: "Intake call",
    duration: "30–45 min",
    dayRange: "Day 0",
    dayStart: 0,
    dayEnd: 0,
    buyerCommit: "One 30–45-minute call. You describe your space, your team, and what's bothering you.",
    whatWeDo: "Assess fit, scope the audit, agree on which locations are in.",
    deliverable: "A one-page scope summary in your inbox the same day.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Discovery",
    duration: "Async + 1 call",
    dayRange: "Days 1–4",
    dayStart: 1,
    dayEnd: 4,
    buyerCommit: "Share floor plans, photos, vendor list. ~2 hours of your time spread over a week.",
    whatWeDo: "Map your technology to how the space actually operates. Identify the touchpoints we need to inspect.",
    deliverable: "A technology footprint document showing where each system lives and what it touches.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Stack inventory",
    duration: "100% remote",
    dayRange: "Days 5–10",
    dayStart: 5,
    dayEnd: 10,
    buyerCommit: "Roughly 3 hours of access calls and Q&A with your IT lead, vendor portals.",
    whatWeDo: "Document all 8 layers. Every component, configuration, and known issue captured.",
    deliverable: "A complete stack inventory — typically 40–60 pages, indexed by layer.",
    icon: Send,
  },
  {
    number: "04",
    title: "Assessment",
    duration: "Analysis only",
    dayRange: "Days 11–14",
    dayStart: 11,
    dayEnd: 14,
    buyerCommit: "Nothing. Step back and let us do the work.",
    whatWeDo: "Rate every layer for severity, business impact, effort, and dependency. Build the priority matrix.",
    deliverable: "Prioritised findings matrix with cost / effort / impact ratings per layer.",
    icon: Check,
  },
  {
    number: "05",
    title: "Report & walkthrough",
    duration: "Delivered + 60-min call",
    dayRange: "Days 15–21",
    dayStart: 15,
    dayEnd: 21,
    buyerCommit: "A 60-minute walkthrough call with your team. Bring questions.",
    whatWeDo: "Deliver the written report. Walk you through findings live. Answer everything.",
    deliverable:
      "Full written report + executive summary + 90-day roadmap + recording of your walkthrough.",
    icon: Mail,
  },
]

const TIMELINE_TOTAL_DAYS = 21

/* ------------------------------------------------------------------ */
/* 1 — HORIZONTAL TIMELINE RULER                                       */
/* ------------------------------------------------------------------ */

export function MethodologyHorizontalTimeline() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <AnimateIn className="lg:px-6">
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">THE METHODOLOGY</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            From first call to final report in <span className="text-primary">2–3 weeks</span>.
          </h2>
        </AnimateIn>

        <div className="mt-16 lg:px-6">
          {/* Timeline ruler */}
          <AnimateIn delay={120}>
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border/60" />
              <div className="absolute left-0 top-1/2 h-px bg-primary" style={{ width: "100%" }} />
              <div className="relative flex justify-between">
                {[0, 7, 14, 21].map((day) => (
                  <div className="flex flex-col items-center" key={day}>
                    <div className="size-2 rounded-full bg-primary" />
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {day === 0 ? "DAY 0" : `DAY ${day}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Phase cards anchored to the timeline */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {richPhases.map((phase, index) => (
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
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">{phase.deliverable}</p>
                  </CardContent>
                </Card>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2 — VERTICAL STEPPER WITH ANIMATED PROGRESS LINE                    */
/* ------------------------------------------------------------------ */

export function MethodologyVerticalStepper() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return
    const els = Array.from(containerRef.current?.querySelectorAll("[data-phase]") ?? [])
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const idx = Number((visible[0].target as HTMLElement).dataset.phase)
          if (!Number.isNaN(idx)) setActivePhase(idx)
        }
      },
      { threshold: [0.4, 0.6], rootMargin: "-30% 0px -30% 0px" },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">THE METHODOLOGY</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            From first call to final report in <span className="text-primary">2–3 weeks</span>.
          </h2>
        </AnimateIn>

        <div className="relative mt-16" ref={containerRef}>
          {/* Vertical line — base + filled progress */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/40 sm:left-8" />
          <div
            className="absolute left-6 top-0 w-0.5 bg-primary transition-all duration-500 sm:left-8"
            style={{ height: `${((activePhase + 1) / richPhases.length) * 100}%` }}
          />

          <ol className="space-y-12">
            {richPhases.map((phase, index) => {
              const Icon = phase.icon
              const isActive = index <= activePhase
              return (
                <li className="relative pl-16 sm:pl-20" data-phase={index} key={phase.number}>
                  {/* Phase node circle */}
                  <div
                    className={`absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border-2 transition-all duration-500 sm:size-16 ${isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}
                  >
                    <Icon className={isActive ? "size-5" : "size-4"} />
                  </div>
                  <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-baseline">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-display text-3xl font-black tracking-[-0.04em] text-primary sm:text-4xl">
                          {phase.number}
                        </p>
                        <Badge variant="outline">
                          <Clock className="mr-1 size-3" />
                          {phase.duration}
                        </Badge>
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{phase.title}</h3>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground lg:text-right">
                      {phase.dayRange}
                    </p>
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-foreground">{phase.deliverable}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3 — YOU / WE / DELIVERABLE THREE-COLUMN MATRIX                      */
/* ------------------------------------------------------------------ */

export function MethodologyMatrix() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">THE METHODOLOGY</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            From first call to final report in <span className="text-primary">2–3 weeks</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Here's what each phase looks like — your time, our work, what you walk away with.
          </p>
        </AnimateIn>

        <div className="mt-14 space-y-6">
          {/* Header row, desktop only */}
          <div className="hidden grid-cols-[80px_1fr_1fr_1fr] gap-6 px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground lg:grid">
            <p>Phase</p>
            <p className="text-primary">YOUR TIME</p>
            <p>OUR WORK</p>
            <p className="text-primary">YOU WALK AWAY WITH</p>
          </div>

          {richPhases.map((phase, index) => (
            <AnimateIn delay={index * 60} key={phase.number}>
              <div className="rounded-3xl border border-border/60 bg-background/40 p-6 lg:p-8">
                <div className="grid gap-6 lg:grid-cols-[80px_1fr_1fr_1fr] lg:items-start lg:gap-6">
                  <div>
                    <p className="font-display text-4xl font-black tracking-[-0.04em] text-primary">
                      {phase.number}
                    </p>
                    <p className="mt-2 text-sm font-bold text-foreground">{phase.title}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {phase.dayRange}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary lg:hidden">YOUR TIME</p>
                    <p className="mt-1 text-sm leading-7 text-foreground lg:mt-0 lg:text-[15px] lg:leading-7">
                      {phase.buyerCommit}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground lg:hidden">OUR WORK</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground lg:mt-0 lg:text-[15px] lg:leading-7">
                      {phase.whatWeDo}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary lg:hidden">YOU WALK AWAY WITH</p>
                    <div className="mt-1 flex gap-3 lg:mt-0">
                      <Check className="mt-1 size-4 shrink-0 text-primary" />
                      <p className="text-sm leading-7 text-foreground lg:text-[15px] lg:leading-7">{phase.deliverable}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4 — DELIVERABLES-LED REFRAME                                        */
/* ------------------------------------------------------------------ */

const deliverableMilestones = [
  {
    when: "Same-day, after the intake call",
    has: "A one-page scope summary in your inbox.",
    sub: "You know exactly what we're auditing, who's involved, and what it costs — before we lift a finger.",
  },
  {
    when: "End of week 1",
    has: "A complete map of your space's technology footprint.",
    sub: "Every system, vendor, and integration documented. The picture you've never had time to draw yourself.",
  },
  {
    when: "End of week 2",
    has: "All 8 layers of your stack documented in detail.",
    sub: "Every configuration, every known issue, every dependency captured in one place.",
  },
  {
    when: "End of week 3",
    has: "A full written report, executive summary, and a 90-day roadmap.",
    sub: "Plus a 60-minute walkthrough with your team, recorded for the people who couldn't make it.",
  },
]

export function MethodologyDeliverablesLed() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">WHAT YOU GET, WHEN</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            You don't wait <span className="text-primary">2–3 weeks</span> for everything. Each phase
            ends with something concrete in your hands.
          </h2>
        </AnimateIn>

        <ol className="mt-16 space-y-12 border-l-2 border-primary/30">
          {deliverableMilestones.map((milestone, index) => (
            <AnimateIn delay={index * 100} key={index}>
              <li className="relative pl-8 sm:pl-12">
                <span aria-hidden className="absolute -left-[7px] top-2 size-3 rounded-full bg-primary ring-4 ring-muted" />
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">{milestone.when}</p>
                <p className="mt-3 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  {milestone.has}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {milestone.sub}
                </p>
              </li>
            </AnimateIn>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5 — COMBINED RECOMMENDED                                            */
/*    Vertical stepper + matrix per phase + deliverables language      */
/* ------------------------------------------------------------------ */

export function MethodologyCombined() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return
    const els = Array.from(containerRef.current?.querySelectorAll("[data-phase]") ?? [])
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const idx = Number((visible[0].target as HTMLElement).dataset.phase)
          if (!Number.isNaN(idx)) setActivePhase(idx)
        }
      },
      { threshold: [0.4, 0.6], rootMargin: "-25% 0px -35% 0px" },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">THE METHODOLOGY</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            From first call to final report in <span className="text-primary">2–3 weeks</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Each phase ends with something concrete in your hands. Total of your time:
            roughly <span className="font-bold text-foreground">5 hours over 3 weeks</span>.
          </p>
        </AnimateIn>

        {/* Days 0–21 timeline ruler */}
        <AnimateIn delay={120}>
          <div className="relative mt-12 hidden lg:block">
            <div className="absolute inset-x-0 top-1/2 h-px bg-border/60" />
            <div
              className="absolute left-0 top-1/2 h-px bg-primary transition-all duration-500"
              style={{
                width: `${((richPhases[activePhase]?.dayEnd ?? 0) / TIMELINE_TOTAL_DAYS) * 100}%`,
              }}
            />
            <div className="relative flex items-center justify-between">
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
        </AnimateIn>

        <div className="relative mt-12" ref={containerRef}>
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/40 sm:left-8" />
          <div
            className="absolute left-6 top-0 w-0.5 bg-primary transition-all duration-500 sm:left-8"
            style={{ height: `${((activePhase + 1) / richPhases.length) * 100}%` }}
          />

          <ol className="space-y-10">
            {richPhases.map((phase, index) => {
              const Icon = phase.icon
              const isActive = index <= activePhase
              return (
                <li className="relative pl-16 sm:pl-20" data-phase={index} key={phase.number}>
                  {/* Phase node circle */}
                  <div
                    className={`absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border-2 transition-all duration-500 sm:size-16 ${isActive ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "border-border bg-background text-muted-foreground"}`}
                  >
                    <Icon className={isActive ? "size-5" : "size-4"} />
                  </div>

                  <div className="rounded-3xl border border-border/60 bg-background/50 p-6 lg:p-8">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <p className="font-display text-4xl font-black tracking-[-0.04em] text-primary">
                        {phase.number}
                      </p>
                      <h3 className="font-display text-2xl font-bold text-foreground">{phase.title}</h3>
                      <Badge variant="outline">
                        <Clock className="mr-1 size-3" />
                        {phase.duration}
                      </Badge>
                      <p className="ml-auto font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        {phase.dayRange}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-3 lg:gap-8">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                          YOUR TIME
                        </p>
                        <p className="mt-2 text-sm leading-7 text-foreground sm:text-[15px]">
                          {phase.buyerCommit}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                          OUR WORK
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-[15px]">
                          {phase.whatWeDo}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                          YOU WALK AWAY WITH
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <p className="text-sm leading-7 text-foreground sm:text-[15px]">{phase.deliverable}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
