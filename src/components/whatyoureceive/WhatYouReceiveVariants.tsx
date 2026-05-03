import { AlertTriangle, Calendar, Download, FileText, Map, Mic } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { deliverables } from "@/lib/utils"

/**
 * Six variants of the "What you receive" / Deliverables section.
 * Variant 0 reads from i18n (current homepage).
 * Variants 1–5 hardcode richer English copy that adds the missing
 * tactile/visual specifics: page counts, sample findings, roadmap
 * preview, and a brand-consistent line-art report mockup instead of
 * the current stock laptop+code image.
 */

/* ------------------------------------------------------------------ */
/* 0 — ORIGINAL                                                        */
/* ------------------------------------------------------------------ */

export function WhatYouReceiveOriginal() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 overflow-hidden px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
        <AnimateIn>
          <div>
            <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
              {t("deliverables.label")}
            </p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              {t("deliverables.headline")}
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
                          {t(`deliverables.items.${item.key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {t(`deliverables.items.${item.key}.description`)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <p className="mt-8 text-sm leading-7 text-muted-foreground">{t("deliverables.note")}</p>
            <div className="mt-10 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
              <Button asChild className="w-full gap-2 sm:w-auto" variant="outline">
                <a href="/sample-report.pdf" target="_blank">
                  <Download className="size-4" />
                  {t("deliverables.sample_cta")}
                </a>
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">{t("deliverables.sample_sub")}</p>
            </div>
          </div>
        </AnimateIn>
        <AnimateIn delay={120}>
          <div className="relative">
            <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary/12 blur-[80px]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border shadow-lg shadow-black/20">
              <img
                alt="Audit report and findings"
                className="h-full w-full object-cover"
                src="/images/excellence-code.jpg"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(19,91,236,0.18))]" />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Shared — line-art report mockup (replaces the laptop+code image)   */
/* ------------------------------------------------------------------ */

function ReportMockup() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-card/50 to-background/40 p-6 shadow-lg shadow-black/20 lg:p-10">
      <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary/12 blur-[80px]" />

      <svg
        className="relative h-full w-full text-foreground"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 400 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Back page — Roadmap */}
        <g transform="translate(50, 80) rotate(-6)">
          <rect width={260} height={340} rx={6} fill="currentColor" fillOpacity={0.04} stroke="currentColor" strokeOpacity={0.4} strokeWidth={1.2} />
          <text x={20} y={28} className="font-mono fill-primary" fontSize={9} letterSpacing="2.5">ROADMAP · 90 DAYS</text>
          <line x1={20} x2={240} y1={40} y2={40} stroke="currentColor" strokeOpacity={0.3} strokeWidth={0.6} />
          <g transform="translate(20, 60)">
            <text className="font-mono fill-muted-foreground" fontSize={6.5} letterSpacing="1.5">NOW · WEEK 0–2</text>
            <rect x={0} y={8} width={120} height={4} className="fill-primary" opacity={0.85} />
            <rect x={0} y={16} width={80} height={4} className="fill-primary" opacity={0.7} />
            <text y={36} className="font-mono fill-muted-foreground" fontSize={6.5} letterSpacing="1.5">SOON · WEEK 3–6</text>
            <rect x={0} y={44} width={150} height={4} className="fill-primary" opacity={0.55} />
            <rect x={0} y={52} width={100} height={4} className="fill-primary" opacity={0.5} />
            <text y={72} className="font-mono fill-muted-foreground" fontSize={6.5} letterSpacing="1.5">LATER · WEEK 7–12</text>
            <rect x={0} y={80} width={180} height={4} className="fill-primary" opacity={0.35} />
            <rect x={0} y={88} width={140} height={4} className="fill-primary" opacity={0.3} />
            <rect x={0} y={96} width={90} height={4} className="fill-primary" opacity={0.25} />
          </g>
          <line x1={20} x2={240} y1={200} y2={200} stroke="currentColor" strokeOpacity={0.15} strokeWidth={0.6} strokeDasharray="2 3" />
          <text x={20} y={220} className="font-mono fill-muted-foreground" fontSize={6} letterSpacing="1.2">DEPENDENCIES</text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(20, ${235 + i * 16})`}>
              <rect x={0} y={0} width={6} height={6} fill="currentColor" fillOpacity={0.4} />
              <line x1={12} x2={180 - i * 20} y1={3} y2={3} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.5} />
            </g>
          ))}
        </g>

        {/* Middle page — Findings list */}
        <g transform="translate(75, 60) rotate(2)">
          <rect width={260} height={340} rx={6} fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.4} />
          <text x={20} y={28} className="font-mono fill-primary" fontSize={9} letterSpacing="2.5">PRIORITISED FINDINGS</text>
          <line x1={20} x2={240} y1={40} y2={40} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} />
          {[
            { sev: "● HIGH", w: 70 },
            { sev: "● HIGH", w: 70 },
            { sev: "● MED", w: 50 },
            { sev: "● MED", w: 50 },
            { sev: "● LOW", w: 40 },
            { sev: "● LOW", w: 40 },
          ].map((f, i) => (
            <g key={i} transform={`translate(20, ${60 + i * 38})`}>
              <text className="font-mono fill-primary" fontSize={6} letterSpacing="1">{`#${(i + 1).toString().padStart(2, "0")}`}</text>
              <text x={28} className="font-mono fill-foreground" fontSize={6} letterSpacing="1" opacity={0.85}>{f.sev}</text>
              <line x1={0} x2={200} y1={8} y2={8} stroke="currentColor" strokeOpacity={0.18} strokeWidth={0.4} />
              <rect x={0} y={14} width={f.w + 80} height={2.5} className="fill-foreground" opacity={0.4} />
              <rect x={0} y={20} width={140} height={2.5} className="fill-foreground" opacity={0.25} />
            </g>
          ))}
        </g>

        {/* Front page — Cover */}
        <g transform="translate(100, 40)">
          <rect width={260} height={340} rx={6} className="fill-card" fillOpacity={0.95} stroke="currentColor" strokeOpacity={0.65} strokeWidth={1.6} />
          <text x={20} y={28} className="font-mono fill-primary" fontSize={9} letterSpacing="2.5">SORUN · AUDIT REPORT</text>
          <text x={20} y={42} className="font-mono fill-muted-foreground" fontSize={7} letterSpacing="1.5">[SPACE] · 8-LAYER ASSESSMENT</text>
          <line x1={20} x2={240} y1={56} y2={56} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} />
          <text x={20} y={90} className="font-display fill-foreground" fontSize={26} fontWeight={900} letterSpacing="-0.5">A clear</text>
          <text x={20} y={120} className="font-display fill-foreground" fontSize={26} fontWeight={900} letterSpacing="-0.5">picture</text>
          <text x={20} y={150} className="font-display fill-primary" fontSize={26} fontWeight={900} letterSpacing="-0.5">+ a plan.</text>
          <line x1={20} x2={80} y1={170} y2={170} className="stroke-primary" strokeWidth={2} />
          <g transform="translate(20, 200)">
            {[
              "01 NETWORK INFRASTRUCTURE",
              "02 ACCESS CONTROL",
              "03 SPACE MANAGEMENT PLATFORM",
              "04 MEETING ROOM SYSTEMS",
              "05 SECURITY & CCTV",
              "06 TELEPHONY & FRONT OF HOUSE",
              "07 INTEGRATIONS & AUTOMATION",
              "08 IT & DEVICE MANAGEMENT",
            ].map((label, i) => (
              <text key={i} y={i * 14} className="font-mono fill-foreground" fontSize={6.5} letterSpacing="1" opacity={0.7}>
                {label}
              </text>
            ))}
          </g>
          <text x={20} y={326} className="font-mono fill-muted-foreground" fontSize={6} letterSpacing="1.5">VERSION 1.0 · 47 PAGES · CONFIDENTIAL</text>
        </g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 1 — REPLACE IMAGE ONLY (lowest-risk fix)                            */
/* ------------------------------------------------------------------ */

export function WhatYouReceiveBetterImage() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 overflow-hidden px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
        <AnimateIn>
          <div>
            <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">{t("deliverables.label")}</p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              {t("deliverables.headline")}
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
                        <h3 className="text-lg font-bold text-foreground">{t(`deliverables.items.${item.key}.title`)}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(`deliverables.items.${item.key}.description`)}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <p className="mt-8 text-sm leading-7 text-muted-foreground">{t("deliverables.note")}</p>
          </div>
        </AnimateIn>
        <AnimateIn delay={120}>
          <ReportMockup />
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2 — ADD WALKTHROUGH AS A 4TH CARD                                   */
/* ------------------------------------------------------------------ */

const fourDeliverables = [
  {
    icon: FileText,
    title: "Full written report",
    description: "A detailed 40–60 page document covering all 8 layers. Plain language. No jargon.",
    badge: "PDF · 40–60 pages",
  },
  {
    icon: AlertTriangle,
    title: "Prioritised findings",
    description: "Every finding categorised: act now, high priority, 90-day plan, future consideration.",
    badge: "20–30 findings · severity-rated",
  },
  {
    icon: Map,
    title: "Implementation roadmap",
    description: "A sequenced plan showing what to fix first, what it will cost, and how long it will take.",
    badge: "12-week timeline · cost + effort",
  },
  {
    icon: Mic,
    title: "Live walkthrough + Q&A",
    description: "60-minute video call where we present findings to your team. Recorded for the people who couldn't make it.",
    badge: "60 min · recorded",
  },
]

export function WhatYouReceiveFourCards() {
  return (
    <section className="scroll-mt-24 overflow-hidden px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
        <AnimateIn>
          <div>
            <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">WHAT YOU RECEIVE</p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              Four deliverables. Plain language. No jargon.
            </h2>
            <div className="mt-10 space-y-5">
              {fourDeliverables.map((item) => {
                const Icon = item.icon
                return (
                  <Card className="service-card group border-border" key={item.title}>
                    <CardContent className="flex gap-5 p-6">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:scale-110">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-3">
                          <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{item.badge}</span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </AnimateIn>
        <AnimateIn delay={120}>
          <ReportMockup />
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3 — SAMPLE FINDING CARD (show, don't tell)                          */
/* ------------------------------------------------------------------ */

export function WhatYouReceiveSampleFinding() {
  const { t } = useTranslation()
  return (
    <section className="scroll-mt-24 overflow-hidden px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
        <AnimateIn>
          <div>
            <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">WHAT YOU RECEIVE</p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              {t("deliverables.headline")}
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
                        <h3 className="text-lg font-bold text-foreground">{t(`deliverables.items.${item.key}.title`)}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(`deliverables.items.${item.key}.description`)}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </AnimateIn>
        <AnimateIn delay={120}>
          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">SAMPLE FINDING · ILLUSTRATIVE</p>
            <div className="relative mt-4 overflow-hidden rounded-3xl border border-border bg-card/50 p-8 shadow-lg shadow-black/20 lg:p-10">
              <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">FINDING #07</p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-destructive">
                    <span className="size-1.5 rounded-full bg-destructive" /> HIGH PRIORITY
                  </span>
                </div>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">LAYER 02 · ACCESS CONTROL</p>
                <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  Door reader at meeting room 2 fails ~30% of access attempts.
                </h3>

                <dl className="mt-8 space-y-5">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">BUSINESS IMPACT</dt>
                    <dd className="mt-1 text-sm leading-7 text-foreground sm:text-[15px]">
                      Estimated <span className="font-bold text-foreground">12 missed bookings/month</span> →{" "}
                      <span className="font-bold text-foreground">€2,400</span> in lost revenue + member friction.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">RECOMMENDATION</dt>
                    <dd className="mt-1 text-sm leading-7 text-foreground sm:text-[15px]">
                      Replace controller (Aperio kit) — <span className="font-bold text-foreground">€450</span>, 2-hour install.
                      Vendor: ASSA ABLOY.
                    </dd>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">EFFORT</dt>
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
                      <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">IMPACT</dt>
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
              Every finding in your report follows this format. Roughly 20–30 findings per audit, all severity-rated.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4 — QUANTIFIED DELIVERABLES                                         */
/* ------------------------------------------------------------------ */

const quantifiedDeliverables = [
  {
    icon: FileText,
    title: "Full written report",
    badge: "40–60 pages",
    description: "A detailed document covering all 8 layers. Plain language, no jargon, indexed by layer for quick reference.",
    bullets: [
      "Executive summary (1 page)",
      "Per-layer findings (2–6 pages each)",
      "Vendor + integration map",
      "Glossary for non-technical readers",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Prioritised findings",
    badge: "20–30 findings",
    description: "Every finding categorised by severity, with business impact and effort to fix quantified.",
    bullets: [
      "● HIGH — act now",
      "● MEDIUM — 90-day plan",
      "● LOW — future consideration",
      "Each rated for impact + effort + cost",
    ],
  },
  {
    icon: Map,
    title: "Implementation roadmap",
    badge: "12-week timeline",
    description: "A sequenced plan showing what to fix first, what it will cost, and how long it will take.",
    bullets: [
      "NOW (week 0–2): immediate fixes",
      "SOON (week 3–6): high-priority work",
      "LATER (week 7–12): planned upgrades",
      "Per-task cost + effort estimates",
    ],
  },
  {
    icon: Mic,
    title: "Live walkthrough + Q&A",
    badge: "60-min call · recorded",
    description: "We present findings to your team live. Recorded so the people who couldn't make it still get the full story.",
    bullets: ["Bring questions", "Bring your team", "Recording delivered same day"],
  },
]

export function WhatYouReceiveQuantified() {
  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">WHAT YOU RECEIVE</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            Four deliverables. Specific. Measurable. Yours to keep.
          </h2>
        </AnimateIn>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {quantifiedDeliverables.map((item, index) => {
            const Icon = item.icon
            return (
              <AnimateIn delay={index * 80} key={item.title}>
                <Card className="service-card group h-full border-border">
                  <CardContent className="flex h-full flex-col p-7">
                    <div className="flex items-start justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:scale-110">
                        <Icon className="size-6" />
                      </div>
                      <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                    <ul className="mt-5 space-y-2 border-t border-border/50 pt-5">
                      {item.bullets.map((b, i) => (
                        <li className="flex gap-2 text-xs leading-6 text-foreground sm:text-sm" key={i}>
                          <span className="font-mono text-primary">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5 — COMBINED RECOMMENDED                                            */
/*    Brand-consistent image + 4 cards (with walkthrough) +            */
/*    sample finding teaser + sample-report download                   */
/* ------------------------------------------------------------------ */

export function WhatYouReceiveCombined() {
  return (
    <section className="scroll-mt-24 overflow-hidden px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">WHAT YOU RECEIVE</p>
              <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
                A clear picture, a sequenced plan, and a live walkthrough.
              </h2>
            </div>
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              Four deliverables. One audit. Yours to keep.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left — 4 cards stacked */}
          <div className="space-y-5">
            {fourDeliverables.map((item, index) => {
              const Icon = item.icon
              return (
                <AnimateIn delay={index * 80} key={item.title}>
                  <Card className="service-card group border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:scale-110">
                          <Icon className="size-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                              {item.badge}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimateIn>
              )
            })}
          </div>

          {/* Right — brand-consistent report mockup + sample finding teaser + download */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <AnimateIn delay={120}>
              <ReportMockup />
            </AnimateIn>

            <AnimateIn delay={200}>
              <details className="group rounded-2xl border border-border/60 bg-background/40 p-6 transition hover:border-primary/40">
                <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                  <span className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">PEEK INSIDE</p>
                    <p className="mt-1 font-display text-lg font-bold text-foreground">
                      What a finding looks like in your report
                    </p>
                  </span>
                  <span className="ml-auto font-mono text-xs text-muted-foreground transition group-open:rotate-90">▶</span>
                </summary>
                <div className="mt-5 rounded-xl border border-border/40 bg-card/30 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">FINDING #07</p>
                    <span className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-destructive">
                      <span className="size-1.5 rounded-full bg-destructive" /> HIGH
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">LAYER 02 · ACCESS CONTROL</p>
                  <p className="mt-3 font-display text-base font-bold leading-snug text-foreground">
                    Door reader at meeting room 2 fails ~30% of access attempts.
                  </p>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    <span className="font-bold text-foreground">Impact:</span> ~12 missed bookings/month, €2,400 lost revenue.{" "}
                    <span className="font-bold text-foreground">Fix:</span> €450 controller replacement, 2-hour install.
                  </p>
                </div>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Every finding follows this format. ~20–30 per audit, severity-rated.
                </p>
              </details>
            </AnimateIn>

            <AnimateIn delay={280}>
              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6">
                <Button asChild className="w-full gap-2" variant="outline">
                  <a href="/sample-report.pdf" target="_blank">
                    <Download className="size-4" />
                    Download a sample report excerpt
                  </a>
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  PDF, 1.2MB · See the level of detail we provide.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 6 — INTERACTIVE REPORT VIEWER                                       */
/*    Theme-aware atmospheric frame. Inside, 5 different "screens"     */
/*    cycle every 2.4s — report cover → sample finding → roadmap →    */
/*    findings overview → stack inventory. Pause on hover, resume on   */
/*    mouse-leave. Manual click-through dots at the bottom.            */
/*    Dark theme: deep navy gradient, light grain.                     */
/*    Light theme: cool architectural-paper gradient, dark grain.      */
/* ------------------------------------------------------------------ */

interface ReportScreen {
  id: string
  label: string
  render: () => ReactNode
}

function ScreenCover() {
  return (
    <div className="flex h-full flex-col px-7 py-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary">
        SORUN · AUDIT REPORT
      </p>
      <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground">
        [SPACE] · 8-LAYER ASSESSMENT
      </p>
      <div className="mt-4 h-px w-full bg-border" />
      <div className="mt-6">
        <p className="font-display text-3xl font-black leading-[1.05] tracking-[-0.04em] text-foreground sm:text-4xl">
          A clear
          <br />
          picture
        </p>
        <p className="mt-1 font-display text-3xl font-black leading-[1.05] tracking-[-0.04em] text-primary sm:text-4xl">
          + a plan.
        </p>
        <div className="mt-4 h-0.5 w-12 bg-primary" />
      </div>
      <ul className="mt-7 grid gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/80">
        {[
          "01 NETWORK INFRASTRUCTURE",
          "02 ACCESS CONTROL",
          "03 SPACE MANAGEMENT PLATFORM",
          "04 MEETING ROOM SYSTEMS",
          "05 SECURITY & CCTV",
          "06 TELEPHONY & FRONT OF HOUSE",
          "07 INTEGRATIONS & AUTOMATION",
          "08 IT & DEVICE MANAGEMENT",
        ].map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="mt-auto pt-4 font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">
        VERSION 1.0 · 47 PAGES · CONFIDENTIAL
      </p>
    </div>
  )
}

function ScreenFinding() {
  return (
    <div className="flex h-full flex-col px-7 py-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">FINDING #07</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-red-600 dark:text-red-300">
          <span className="size-1.5 rounded-full bg-red-500" />
          HIGH PRIORITY
        </span>
      </div>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
        LAYER 02 · ACCESS CONTROL
      </p>
      <p className="mt-4 font-display text-lg font-bold leading-snug text-foreground sm:text-xl">
        Door reader at meeting room 2 fails ~30% of access attempts.
      </p>
      <div className="mt-5 space-y-3 text-xs leading-6 text-muted-foreground">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">BUSINESS IMPACT</p>
          <p className="mt-1">
            Estimated <span className="font-bold text-foreground">12 missed bookings/month</span> →{" "}
            <span className="font-bold text-foreground">€2,400</span> in lost revenue.
          </p>
        </div>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">RECOMMENDATION</p>
          <p className="mt-1">
            Replace controller (Aperio kit) — <span className="font-bold text-foreground">€450</span>, 2-hour install.
          </p>
        </div>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">EFFORT</p>
          <div className="mt-1.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span className={`size-2 rounded-full ${n <= 2 ? "bg-primary" : "bg-muted"}`} key={`e${n}`} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">IMPACT</p>
          <div className="mt-1.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span className={`size-2 rounded-full ${n <= 4 ? "bg-primary" : "bg-muted"}`} key={`i${n}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScreenRoadmap() {
  return (
    <div className="flex h-full flex-col px-7 py-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary">ROADMAP · 90 DAYS</p>
      <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">23 FINDINGS · €6,800 EST.</p>
      <div className="mt-5 grid gap-4">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-foreground/85">NOW · WEEK 0–2</p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-red-500" />
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
              <span className="font-mono text-[8px] text-muted-foreground">€450</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-red-500" />
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div className="h-full w-3/5 rounded-full bg-primary" />
              </div>
              <span className="font-mono text-[8px] text-muted-foreground">€280</span>
            </div>
          </div>
        </div>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-foreground/85">SOON · WEEK 3–6</p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-500" />
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div className="h-full w-1/2 rounded-full bg-primary/70" />
              </div>
              <span className="font-mono text-[8px] text-muted-foreground">€1,200</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-500" />
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div className="h-full w-2/5 rounded-full bg-primary/70" />
              </div>
              <span className="font-mono text-[8px] text-muted-foreground">€890</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-500" />
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div className="h-full w-3/5 rounded-full bg-primary/70" />
              </div>
              <span className="font-mono text-[8px] text-muted-foreground">€640</span>
            </div>
          </div>
        </div>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-foreground/85">LATER · WEEK 7–12</p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-muted-foreground" />
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div className="h-full w-1/3 rounded-full bg-primary/40" />
              </div>
              <span className="font-mono text-[8px] text-muted-foreground/70">€2,400</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-muted-foreground" />
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div className="h-full w-1/4 rounded-full bg-primary/40" />
              </div>
              <span className="font-mono text-[8px] text-muted-foreground/70">€940</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">
          SEQUENCED · COSTED · DEPENDENCY-AWARE
        </p>
      </div>
    </div>
  )
}

function ScreenFindingsOverview() {
  const findings = [
    { sev: "HIGH", color: "bg-red-500", title: "Door reader fails 30% of attempts", layer: "L02" },
    { sev: "HIGH", color: "bg-red-500", title: "WiFi VLAN segmentation absent", layer: "L01" },
    { sev: "HIGH", color: "bg-red-500", title: "Bookings → access control unwired", layer: "L07" },
    { sev: "MED", color: "bg-amber-500", title: "Camera retention exceeds GDPR", layer: "L05" },
    { sev: "MED", color: "bg-amber-500", title: "Print server lacks per-member auth", layer: "L08" },
    { sev: "MED", color: "bg-amber-500", title: "Meeting rooms — no occupancy data", layer: "L04" },
    { sev: "LOW", color: "bg-muted-foreground", title: "Reception phone old firmware", layer: "L06" },
  ]

  return (
    <div className="flex h-full flex-col px-7 py-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary">PRIORITISED FINDINGS · 23 TOTAL</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-2">
          <p className="font-display text-2xl font-black text-red-600 dark:text-red-300">5</p>
          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-red-600/80 dark:text-red-300/80">HIGH</p>
        </div>
        <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-2">
          <p className="font-display text-2xl font-black text-amber-600 dark:text-amber-300">11</p>
          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-amber-600/80 dark:text-amber-300/80">MED</p>
        </div>
        <div className="rounded-md border border-border bg-muted/40 p-2">
          <p className="font-display text-2xl font-black text-foreground">7</p>
          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">LOW</p>
        </div>
      </div>
      <ul className="mt-5 flex flex-1 flex-col gap-1.5 overflow-hidden">
        {findings.map((f) => (
          <li className="flex items-center gap-3 border-b border-border pb-1.5 last:border-b-0" key={f.title}>
            <span className={`size-1.5 shrink-0 rounded-full ${f.color}`} />
            <p className="flex-1 truncate text-[10px] leading-4 text-foreground">{f.title}</p>
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground/70">{f.layer}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">+ 16 MORE</p>
    </div>
  )
}

function ScreenStackInventory() {
  return (
    <div className="flex h-full flex-col px-7 py-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary">LAYER 01 · NETWORK INFRASTRUCTURE</p>
      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">PAGE 04 / 47</p>
      <div className="mt-4 grid grid-cols-3 gap-2 border-b border-border pb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/70">
        <span>Component</span>
        <span>Vendor / Model</span>
        <span>Status</span>
      </div>
      {[
        { c: "Core switch", v: "Cisco Catalyst 9300", s: "OK", color: "text-emerald-600 dark:text-emerald-400" },
        { c: "WAP · Floor 1", v: "Ubiquiti U6 Pro", s: "OK", color: "text-emerald-600 dark:text-emerald-400" },
        { c: "WAP · Floor 2 ", v: "Ubiquiti U6 Pro", s: "DEGRADED", color: "text-amber-600 dark:text-amber-300" },
        { c: "Firewall", v: "Fortigate 60F", s: "OK", color: "text-emerald-600 dark:text-emerald-400" },
        { c: "ISP primary", v: "KPN 1Gb fibre", s: "OK", color: "text-emerald-600 dark:text-emerald-400" },
        { c: "ISP failover", v: "Vodafone 4G", s: "MISSING", color: "text-red-600 dark:text-red-400" },
        { c: "VLAN tagging", v: "Untagged", s: "AT RISK", color: "text-red-600 dark:text-red-400" },
        { c: "Cabling Cat 6", v: "Mixed era", s: "REVIEW", color: "text-amber-600 dark:text-amber-300" },
      ].map((row) => (
        <div className="grid grid-cols-3 gap-2 border-b border-border/50 py-1.5 text-[10px] leading-4 last:border-b-0" key={row.c}>
          <span className="text-foreground">{row.c}</span>
          <span className="text-muted-foreground">{row.v}</span>
          <span className={`font-mono text-[9px] uppercase tracking-[0.18em] ${row.color}`}>{row.s}</span>
        </div>
      ))}
      <p className="mt-auto pt-3 font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">
        + 14 ADDITIONAL ROWS · 5 KNOWN ISSUES LOGGED
      </p>
    </div>
  )
}

const reportScreens: ReportScreen[] = [
  { id: "cover", label: "Report cover", render: () => <ScreenCover /> },
  { id: "finding", label: "Sample finding", render: () => <ScreenFinding /> },
  { id: "roadmap", label: "Roadmap", render: () => <ScreenRoadmap /> },
  { id: "findings", label: "Findings overview", render: () => <ScreenFindingsOverview /> },
  { id: "inventory", label: "Stack inventory", render: () => <ScreenStackInventory /> },
]

export function InteractiveReportViewer() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [autoPlaying, setAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  /* auto-cycle every 2.4s when playing — matches V5e cadence */
  useEffect(() => {
    if (!autoPlaying) return
    const interval = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % reportScreens.length)
    }, 2400)
    return () => window.clearInterval(interval)
  }, [autoPlaying])

  const handleEnter = () => setAutoPlaying(false)
  const handleLeave = () => setAutoPlaying(true)
  const handleSelect = (i: number) => {
    setActiveIdx(i)
    setAutoPlaying(false)
  }

  return (
    <div className="space-y-3" onMouseEnter={handleEnter} onMouseLeave={handleLeave} ref={containerRef}>
      {/* Atmospheric frame — light architectural paper / dark deep navy */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-slate-100 via-blue-50/60 to-slate-200 shadow-2xl shadow-black/10 dark:from-[#0a0e1a] dark:via-[#101524] dark:to-[#0d1422] dark:shadow-black/40">
        {/* ambient blue glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 size-72 rounded-full bg-primary/20 blur-[100px] dark:bg-primary/15" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 size-64 rounded-full bg-primary/15 blur-[80px] dark:bg-primary/10" />
        {/* subtle grain — dark dots on light, light dots on dark */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(0,0,0,0.5)_0.5px,transparent_0.5px)] [background-size:3px_3px] dark:opacity-[0.05] dark:[background-image:radial-gradient(rgba(255,255,255,0.5)_0.5px,transparent_0.5px)]" />

        {/* floating screens — fade transition between them */}
        <div className="absolute inset-5 sm:inset-7">
          {reportScreens.map((screen, i) => (
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-xl shadow-black/5 backdrop-blur-sm transition-all duration-700 ease-out dark:border-border/60 dark:bg-card/85 dark:shadow-black/20"
              key={screen.id}
              style={{
                opacity: i === activeIdx ? 1 : 0,
                transform: i === activeIdx ? "scale(1) translateY(0)" : "scale(0.97) translateY(8px)",
                pointerEvents: i === activeIdx ? "auto" : "none",
              }}
            >
              {screen.render()}
            </div>
          ))}
        </div>

        {/* live label top-right */}
        <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground backdrop-blur-sm">
          <span className={`size-1.5 rounded-full ${autoPlaying ? "animate-pulse bg-primary" : "bg-muted-foreground/60"}`} />
          {autoPlaying ? "LIVE PREVIEW" : "PAUSED"}
        </div>
      </div>

      {/* Indicators / click-through */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {reportScreens.map((screen, i) => {
          const isActive = i === activeIdx
          return (
            <button
              className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                isActive
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
              key={screen.id}
              onClick={() => handleSelect(i)}
              type="button"
            >
              <span className={`size-1.5 rounded-full ${isActive ? "bg-primary" : "bg-muted-foreground/40"}`} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                {String(i + 1).padStart(2, "0")} · {screen.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function WhatYouReceiveInteractive() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 overflow-hidden px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
        <AnimateIn>
          <div>
            <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
              {t("deliverables.label")}
            </p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              {t("deliverables.headline")}
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
                          {t(`deliverables.items.${item.key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {t(`deliverables.items.${item.key}.description`)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <p className="mt-8 text-sm leading-7 text-muted-foreground">{t("deliverables.note")}</p>
          </div>
        </AnimateIn>
        <AnimateIn delay={120}>
          <InteractiveReportViewer />
        </AnimateIn>
      </div>
    </section>
  )
}

// keep Calendar import live (lint guard); used in metaphor of dates planning above
void Calendar
