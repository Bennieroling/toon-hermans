import { ArrowRight, CheckCircle, X } from "lucide-react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { Button } from "@/components/ui/button"
import { bookingUrl } from "@/lib/utils"

/**
 * Eight variants of the "Who We Help" section for /demo/whowehelp.
 * Variant 0 reads from i18n (it's the live homepage section).
 * Variants 1–7 hardcode English copy so changes are visible at a glance.
 */

const qualifierKeys = ["q1", "q2", "q3", "q4"] as const

/* ------------------------------------------------------------------ */
/* 0 — ORIGINAL                                                       */
/* ------------------------------------------------------------------ */

export function WhoWeHelpOriginal() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32">
      <AnimateIn>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-primary px-6 py-16 text-primary-foreground shadow-2xl shadow-primary/25 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_55%)] text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary-foreground/80">
              {t("who.label")}
            </p>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-[-0.04em] text-primary-foreground sm:text-4xl md:text-5xl">
              {t("who.headline")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-primary-foreground/85 sm:text-lg">
              {t("who.body")}
            </p>
            <ul className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              {qualifierKeys.map((key) => (
                <li
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground"
                  key={key}
                >
                  <CheckCircle className="size-4 shrink-0" />
                  {t(`who.qualifiers.${key}`)}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-10 max-w-2xl text-sm leading-7 text-primary-foreground/80 sm:text-base">
              {t("who.alternatives")}
            </p>
            <p className="mt-6 font-display text-lg italic text-primary-foreground/90 sm:text-xl">
              {t("who.closing")}
            </p>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Helper — positive qualifier list (used by several variants)        */
/* ------------------------------------------------------------------ */

const POSITIVE_QUALIFIERS = [
  "You run 1–5 coworking or flex office locations.",
  "You make the platform, vendor, and infrastructure calls.",
  "You're tired of muddling through.",
  "You want a plan, not a patch.",
]

const NEGATIVE_QUALIFIERS = [
  "You're a 50-location chain with a dedicated CTO and IT team.",
  "You haven't opened your first space yet.",
  "You're shopping for a new platform — we don't sell platforms.",
  "You want someone to fix everything by tomorrow.",
]

const RECOGNITION_BEATS = [
  "You just opened your second location and the tech is starting to drag.",
  "You inherited a stack from the previous owner — and have no idea what's in the rack.",
  "You lost a member to 'the WiFi' and want to make sure it's not a pattern.",
  "You're evaluating your fourth platform vendor and wondering if maybe the problem isn't the platform.",
]

const ALTERNATIVES_LINE =
  "You've already tried the enterprise integrators, the generalist IT support, or your platform vendor's helpdesk. You know they don't fit."

/* ------------------------------------------------------------------ */
/* 1 — POSITIVE REFRAME                                               */
/* ------------------------------------------------------------------ */

export function WhoWeHelpPositive() {
  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32">
      <AnimateIn>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-primary px-6 py-16 text-primary-foreground shadow-2xl shadow-primary/25 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_55%)] text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary-foreground/80">
              WHO WE WORK WITH
            </p>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-[-0.04em] text-primary-foreground sm:text-4xl md:text-5xl">
              Built for the operator who runs the space AND the tech.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-primary-foreground/85 sm:text-lg">
              If you're the person making the calls about your member platform, your access
              system, and your WiFi vendor — we work with you.
            </p>
            <ul className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              {POSITIVE_QUALIFIERS.map((q, i) => (
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
              {ALTERNATIVES_LINE}
            </p>
            <div className="mt-10 flex justify-center">
              <Button asChild className="rounded-xl bg-background px-8 py-4 text-base font-bold text-primary hover:bg-background/90" size="lg" variant="secondary">
                <a href={bookingUrl} rel="noreferrer" target="_blank">
                  Book a free 30-minute call
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2 — RECOGNITION ("you're here because...")                         */
/* ------------------------------------------------------------------ */

export function WhoWeHelpRecognition() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
            WHY YOU'RE HERE
          </p>
          <h2 className="mt-6 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            If you're reading this, you probably…
          </h2>
        </AnimateIn>
        <ul className="mt-12 space-y-6 border-l-2 border-primary/30">
          {RECOGNITION_BEATS.map((beat, index) => (
            <AnimateIn delay={index * 80} key={beat}>
              <li className="relative pl-6 sm:pl-8">
                <span aria-hidden className="absolute -left-[5px] top-3 size-2 rounded-full bg-primary" />
                <p className="font-display text-xl font-medium leading-9 text-foreground sm:text-2xl">
                  {beat}
                </p>
              </li>
            </AnimateIn>
          ))}
        </ul>
        <AnimateIn delay={400}>
          <div className="mt-12 flex flex-col items-start gap-5 border-t border-border/40 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              Any of these you? Let's talk.
            </p>
            <Button asChild size="lg">
              <a href={bookingUrl} rel="noreferrer" target="_blank">
                Book a call
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3 — FOR YOU / NOT FOR YOU                                          */
/* ------------------------------------------------------------------ */

export function WhoWeHelpForYouOrNot() {
  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">IS THIS FOR YOU?</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            Honest about who we fit — and who we don't.
          </h2>
        </AnimateIn>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <AnimateIn>
            <div className="h-full rounded-3xl border border-primary/40 bg-primary/5 p-8 lg:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">FOR YOU IF…</p>
              <ul className="mt-6 space-y-4">
                {POSITIVE_QUALIFIERS.map((q, i) => (
                  <li className="flex gap-3 text-base leading-7 text-foreground sm:text-[17px]" key={i}>
                    <CheckCircle className="mt-1 size-5 shrink-0 text-primary" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
          <AnimateIn delay={120}>
            <div className="h-full rounded-3xl border border-border/60 bg-background/40 p-8 lg:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                NOT FOR YOU IF…
              </p>
              <ul className="mt-6 space-y-4">
                {NEGATIVE_QUALIFIERS.map((q, i) => (
                  <li className="flex gap-3 text-base leading-7 text-muted-foreground sm:text-[17px]" key={i}>
                    <X className="mt-1 size-5 shrink-0 text-muted-foreground/70" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
        <AnimateIn delay={300}>
          <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
              If 'For you' is closer to home, we should talk.
            </p>
            <Button asChild size="lg">
              <a href={bookingUrl} rel="noreferrer" target="_blank">
                Book a call
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4 — OPERATOR QUOTE                                                 */
/* ------------------------------------------------------------------ */

export function WhoWeHelpOperatorQuote() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">SOUND FAMILIAR?</p>
        </AnimateIn>
        <AnimateIn delay={120}>
          <blockquote className="mt-8 border-l-4 border-primary pl-6 sm:pl-10">
            <p className="font-display text-2xl font-medium leading-relaxed text-foreground sm:text-3xl">
              <span className="mr-1 text-primary">&ldquo;</span>I run two locations in Amsterdam. I've been the
              unofficial IT person for three years. Every vendor pitch is the same — they sell their
              platform and pretend the rest of the stack doesn't exist. I want someone to look at all of it
              and tell me what's wrong.<span className="ml-1 text-primary">&rdquo;</span>
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-black text-primary">
                AK
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  COMPOSITE OPERATOR · ILLUSTRATIVE
                </p>
                <p className="text-sm font-bold text-foreground">An operator we'd work with.</p>
              </div>
            </footer>
          </blockquote>
        </AnimateIn>
        <AnimateIn delay={300}>
          <div className="mt-14 flex flex-col items-start gap-5 border-t border-border/40 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
              If that sounds like you, we should talk.
            </p>
            <Button asChild size="lg">
              <a href={bookingUrl} rel="noreferrer" target="_blank">
                Book a call
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5 — CALMER CONTAINER                                               */
/* ------------------------------------------------------------------ */

export function WhoWeHelpCalmContainer() {
  const { t } = useTranslation()
  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">{t("who.label")}</p>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl">
            {t("who.headline")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            {t("who.body")}
          </p>
        </AnimateIn>
        <AnimateIn delay={150}>
          <ul className="mt-10 flex flex-col flex-wrap items-center justify-center gap-2 sm:flex-row">
            {qualifierKeys.map((key) => (
              <li
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-foreground"
                key={key}
              >
                <CheckCircle className="size-4 shrink-0 text-primary" />
                {t(`who.qualifiers.${key}`)}
              </li>
            ))}
          </ul>
        </AnimateIn>
        <AnimateIn delay={300}>
          <p className="mx-auto mt-10 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t("who.alternatives")}
          </p>
          <p className="mt-8 font-display text-lg italic text-foreground sm:text-xl">{t("who.closing")}</p>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 6 — SINGLE DECLARATIVE                                             */
/* ------------------------------------------------------------------ */

export function WhoWeHelpDeclarative() {
  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">WHO</p>
        </AnimateIn>
        <AnimateIn delay={150}>
          <h2 className="mt-8 font-display text-3xl font-black leading-[1.1] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            We work with hands-on operators of <span className="text-primary">1–5 coworking locations</span> who
            are ready to stop muddling through and start <span className="text-primary">planning</span> their
            stack instead of inheriting it.
          </h2>
        </AnimateIn>
        <AnimateIn delay={300}>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={bookingUrl} rel="noreferrer" target="_blank">
                Book a 30-minute call
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <p className="text-xs leading-6 text-muted-foreground">No pitch. Just a conversation about your space.</p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 8 — COMBINED — spectrum + for-you/not-for-you + CTA                */
/* ------------------------------------------------------------------ */

export function WhoWeHelpCombined() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Position — header + compact spectrum */}
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
            WHO WE WORK WITH
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            We work in the gap between <span className="text-primary">"too small for IT"</span> and{" "}
            <span className="text-primary">"too big to need outside help"</span>.
          </h2>
        </AnimateIn>

        <AnimateIn delay={120}>
          <div className="mt-10 rounded-2xl border border-border/50 bg-background/30 px-6 py-7 lg:px-10 lg:py-8">
            <svg className="w-full text-foreground" viewBox="0 0 100 18" xmlns="http://www.w3.org/2000/svg">
              {/* track */}
              <line x1={4} x2={96} y1={9} y2={9} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.4} />
              {/* sweet-spot highlight */}
              <line x1={20} x2={56} y1={9} y2={9} stroke="currentColor" strokeOpacity={1} strokeWidth={1.4} className="text-primary" />
              <text x={38} y={4} textAnchor="middle" fontSize={2.6} className="font-mono fill-primary" letterSpacing="0.5">
                WE WORK HERE
              </text>
              {/* stops */}
              {spectrumStops.map((stop, i) => (
                <g key={i}>
                  <circle
                    cx={stop.x}
                    cy={9}
                    r={stop.sweet ? 1.6 : 1.1}
                    className={stop.sweet ? "fill-primary" : "fill-card"}
                    stroke="currentColor"
                    strokeWidth={stop.sweet ? 0 : 0.4}
                    strokeOpacity={stop.sweet ? 0 : 0.5}
                  />
                  <text
                    x={stop.x}
                    y={14.2}
                    textAnchor="middle"
                    fontSize={3}
                    className={`font-display fill-foreground ${stop.sweet ? "font-black" : ""}`}
                  >
                    {stop.label}
                  </text>
                  <text
                    x={stop.x}
                    y={17.5}
                    textAnchor="middle"
                    fontSize={1.7}
                    className="font-mono fill-muted-foreground"
                    opacity={0.85}
                  >
                    LOCATIONS
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </AnimateIn>

        {/* Filter — for you / not for you */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <AnimateIn delay={180}>
            <div className="h-full rounded-3xl border border-primary/40 bg-primary/5 p-8 lg:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">FOR YOU IF…</p>
              <ul className="mt-6 space-y-4">
                {POSITIVE_QUALIFIERS.map((q, i) => (
                  <li className="flex gap-3 text-base leading-7 text-foreground sm:text-[17px]" key={i}>
                    <CheckCircle className="mt-1 size-5 shrink-0 text-primary" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
          <AnimateIn delay={260}>
            <div className="h-full rounded-3xl border border-border/60 bg-background/40 p-8 lg:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                NOT FOR YOU IF…
              </p>
              <ul className="mt-6 space-y-4">
                {NEGATIVE_QUALIFIERS.map((q, i) => (
                  <li className="flex gap-3 text-base leading-7 text-muted-foreground sm:text-[17px]" key={i}>
                    <X className="mt-1 size-5 shrink-0 text-muted-foreground/70" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>

        {/* Alternatives + Action */}
        <AnimateIn delay={360}>
          <div className="mt-12 border-t border-border/40 pt-8">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {ALTERNATIVES_LINE}
            </p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                Sounds like you? Let's talk.
              </p>
              <Button asChild size="lg">
                <a href={bookingUrl} rel="noreferrer" target="_blank">
                  Book a 30-minute call
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              No pitch. Just a conversation about your space.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 7 — SCALE SPECTRUM                                                 */
/* ------------------------------------------------------------------ */

const spectrumStops: { x: number; label: string; sublabel: string; sweet?: boolean }[] = [
  { x: 5, label: "1", sublabel: "Solo · all decisions on you" },
  { x: 25, label: "2–3", sublabel: "Small ops team · tech is informal", sweet: true },
  { x: 50, label: "4–5", sublabel: "Multi-site · scaling pains", sweet: true },
  { x: 75, label: "10+", sublabel: "Some IT capacity · still tactical" },
  { x: 95, label: "50+", sublabel: "Full IT team · CTO" },
]

export function WhoWeHelpScaleSpectrum() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">WHERE WE FIT</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            We work in the gap between <span className="text-primary">"too small for IT"</span> and{" "}
            <span className="text-primary">"too big to need outside help"</span>.
          </h2>
        </AnimateIn>
        <AnimateIn delay={200}>
          <div className="mt-14 rounded-3xl border border-border/60 bg-background/40 px-6 py-10 lg:px-12 lg:py-14">
            <svg className="w-full text-foreground" viewBox="0 0 100 26" xmlns="http://www.w3.org/2000/svg">
              {/* track */}
              <line x1={4} x2={96} y1={12} y2={12} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.4} />
              {/* sweet-spot highlight */}
              <line x1={20} x2={56} y1={12} y2={12} stroke="currentColor" strokeOpacity={1} strokeWidth={1.6} className="text-primary" />
              <text x={38} y={5.5} textAnchor="middle" fontSize={3} className="font-mono fill-primary" letterSpacing="0.5">
                WE WORK HERE
              </text>
              {/* stops */}
              {spectrumStops.map((stop, i) => (
                <g key={i}>
                  <circle
                    cx={stop.x}
                    cy={12}
                    r={stop.sweet ? 1.8 : 1.2}
                    className={stop.sweet ? "fill-primary" : "fill-card"}
                    stroke="currentColor"
                    strokeWidth={stop.sweet ? 0 : 0.4}
                    strokeOpacity={stop.sweet ? 0 : 0.5}
                  />
                  <text
                    x={stop.x}
                    y={18}
                    textAnchor="middle"
                    fontSize={3.5}
                    className={`font-display fill-foreground ${stop.sweet ? "font-black" : ""}`}
                  >
                    {stop.label}
                  </text>
                  <text
                    x={stop.x}
                    y={23.5}
                    textAnchor="middle"
                    fontSize={2}
                    className="font-mono fill-muted-foreground"
                    opacity={0.85}
                  >
                    LOCATIONS
                  </text>
                </g>
              ))}
            </svg>
            <div className="mt-10 grid gap-3 sm:grid-cols-5">
              {spectrumStops.map((stop, i) => (
                <div
                  className={`rounded-xl border p-3 text-xs leading-5 ${stop.sweet ? "border-primary/50 bg-primary/5 text-foreground" : "border-border/40 bg-background/30 text-muted-foreground"}`}
                  key={i}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{stop.label}</span>
                  <p className="mt-1">{stop.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
        <AnimateIn delay={400}>
          <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
              If you're in the middle, that's us.
            </p>
            <Button asChild size="lg">
              <a href={bookingUrl} rel="noreferrer" target="_blank">
                Book a call
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
