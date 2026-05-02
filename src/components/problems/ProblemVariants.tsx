import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"

/**
 * Problem-section variants for /demo/problems.
 *
 * Variant 0 reads from i18n (it's the live homepage Problem).
 * The proposal variants (1-8) hardcode English copy so the changes
 * are visible at a glance — they would be moved to i18n if shipped.
 */

const scenarioKeys = ["s1", "s2", "s3"] as const

/* ------------------------------------------------------------------ */
/* 0 — ORIGINAL (current homepage)                                    */
/* ------------------------------------------------------------------ */

export function ProblemOriginal() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
            {t("problem.label")}
          </p>
        </AnimateIn>
        <ul className="mt-10 space-y-1 border-l-2 border-primary/30">
          {scenarioKeys.map((key, index) => (
            <AnimateIn delay={index * 100} key={key}>
              <li className="relative pl-6 sm:pl-8">
                <span aria-hidden className="absolute -left-[5px] top-3 size-2 rounded-full bg-primary" />
                <p className="font-display text-xl font-medium leading-9 text-foreground sm:text-2xl">
                  {t(`problem.scenarios.${key}`)}
                </p>
              </li>
            </AnimateIn>
          ))}
        </ul>
        <AnimateIn delay={300}>
          <p className="mt-12 text-base font-medium leading-8 text-foreground sm:text-lg">
            {t("problem.empathy")}
          </p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            {t("problem.closing")}
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Helpers used by several proposal variants                          */
/* ------------------------------------------------------------------ */

interface BulletListProps {
  scenarios: string[]
  pulse?: boolean
}

function BulletList({ scenarios, pulse = false }: BulletListProps) {
  return (
    <ul className="mt-10 space-y-1 border-l-2 border-primary/30">
      {scenarios.map((scenario, index) => (
        <AnimateIn delay={index * 100} key={index}>
          <li className="relative pl-6 sm:pl-8">
            <span
              aria-hidden
              className={`absolute -left-[5px] top-3 size-2 rounded-full bg-primary ${pulse ? "pv-bullet-pulse" : ""}`}
              style={pulse ? { animationDelay: `${index * 0.6}s` } : undefined}
            />
            <p className="font-display text-xl font-medium leading-9 text-foreground sm:text-2xl">
              {scenario}
            </p>
          </li>
        </AnimateIn>
      ))}
    </ul>
  )
}

const ORIGINAL_SCENARIOS = [
  "The WiFi drops on a Tuesday morning. A member tweets about it.",
  "The door reader fails. Staff have to let people in manually.",
  "Platform data doesn't sync. You're re-entering every invoice.",
]

const ESCALATING_SCENARIOS = [
  "The WiFi drops on Monday morning. A member tweets about it.",
  "The door reader fails. Your staff lets people in by hand for two hours.",
  "Platform data doesn't sync. You're re-entering every invoice — and missing the ones you don't catch.",
]

const ORIGINAL_EMPATHY =
  "We know how exhausting it is to fight your tech every Monday morning. Coworking is a hospitality business with a network closet — and your members judge you on the WiFi."
const ORIGINAL_CLOSING =
  "Most spaces grow faster than their infrastructure. By the time it breaks, it has already cost you members, revenue, and reputation."

const COMPRESSED_EMPATHY =
  "Coworking is a hospitality business with a network closet. Your members don't see the tech — they judge you on the WiFi."
const SHARPENED_CLOSING =
  "By the time it breaks, it's not a tech problem. It's a churn problem."
const PIVOT_LINE = "Most operators muddle through. We help them stop."
const FOURTH_SCENARIO = "You arrive at 7:30am to apologise to a member who couldn't get in."

/* ------------------------------------------------------------------ */
/* 1 — STAT / PULL-QUOTE ON THE RIGHT                                 */
/* ------------------------------------------------------------------ */

export function ProblemPullquote() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <AnimateIn>
            <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
              The Friction
            </p>
          </AnimateIn>
          <BulletList scenarios={ORIGINAL_SCENARIOS} />
          <AnimateIn delay={300}>
            <p className="mt-12 text-base font-medium leading-8 text-foreground sm:text-lg">
              {ORIGINAL_EMPATHY}
            </p>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              {ORIGINAL_CLOSING}
            </p>
          </AnimateIn>
        </div>
        <AnimateIn delay={200}>
          <aside className="rounded-3xl border border-border/60 bg-background/40 p-8 lg:sticky lg:top-24 lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              MEMBER SURVEY · ILLUSTRATIVE
            </p>
            <p className="mt-6 font-display text-7xl font-black leading-none tracking-[-0.04em] text-primary lg:text-8xl">
              #1
            </p>
            <p className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
              Complaint members make about coworking spaces
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              <span className="font-bold text-foreground">WiFi reliability.</span> Above price, above location,
              above community. Replace this stat with a real one once you have it from your audit data —
              the layout works either way.
            </p>
          </aside>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2 — ANIMATED BULLET DOTS                                           */
/* ------------------------------------------------------------------ */

export function ProblemAnimatedBullets() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <style>{`
        @keyframes pv-bullet-pulse {
          0%, 100% { box-shadow: 0 0 0 0 oklch(0.55 0.22 260 / 0.5); transform: scale(1); }
          50% { box-shadow: 0 0 0 8px oklch(0.55 0.22 260 / 0); transform: scale(1.25); }
        }
        .pv-bullet-pulse { animation: pv-bullet-pulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pv-bullet-pulse { animation: none; } }
      `}</style>
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">The Friction</p>
        </AnimateIn>
        <BulletList scenarios={ORIGINAL_SCENARIOS} pulse />
        <AnimateIn delay={300}>
          <p className="mt-12 text-base font-medium leading-8 text-foreground sm:text-lg">{ORIGINAL_EMPATHY}</p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">{ORIGINAL_CLOSING}</p>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3 — DIFFERENTIATED EMPATHY VS CLOSING                              */
/* ------------------------------------------------------------------ */

export function ProblemDifferentiatedParagraphs() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">The Friction</p>
        </AnimateIn>
        <BulletList scenarios={ORIGINAL_SCENARIOS} />
        <AnimateIn delay={300}>
          <p className="mt-12 text-base leading-8 text-muted-foreground sm:text-lg">{ORIGINAL_EMPATHY}</p>
          <div className="mt-10 border-l-4 border-primary bg-background/30 px-6 py-5 lg:px-8 lg:py-6">
            <p className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {ORIGINAL_CLOSING}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4 — ESCALATING BULLETS + CONSISTENT MONDAY                         */
/* ------------------------------------------------------------------ */

export function ProblemEscalatingBullets() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">The Friction</p>
        </AnimateIn>
        <BulletList scenarios={ESCALATING_SCENARIOS} />
        <AnimateIn delay={300}>
          <p className="mt-12 text-base font-medium leading-8 text-foreground sm:text-lg">{ORIGINAL_EMPATHY}</p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">{ORIGINAL_CLOSING}</p>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5 — SHARPENED CLOSING                                              */
/* ------------------------------------------------------------------ */

export function ProblemSharpenedClosing() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">The Friction</p>
        </AnimateIn>
        <BulletList scenarios={ORIGINAL_SCENARIOS} />
        <AnimateIn delay={300}>
          <p className="mt-12 text-base font-medium leading-8 text-foreground sm:text-lg">{ORIGINAL_EMPATHY}</p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">{SHARPENED_CLOSING}</p>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 6 — PIVOT LINE BRIDGING TO NEXT SECTION                            */
/* ------------------------------------------------------------------ */

export function ProblemWithPivot() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">The Friction</p>
        </AnimateIn>
        <BulletList scenarios={ORIGINAL_SCENARIOS} />
        <AnimateIn delay={300}>
          <p className="mt-12 text-base font-medium leading-8 text-foreground sm:text-lg">{ORIGINAL_EMPATHY}</p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">{ORIGINAL_CLOSING}</p>
        </AnimateIn>
        <AnimateIn delay={400}>
          <div className="mt-14 flex items-center gap-3 border-t border-border/40 pt-8">
            <p className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {PIVOT_LINE}
            </p>
            <ArrowRight aria-hidden className="size-6 shrink-0 text-primary" />
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 7 — COMPRESSED EMPATHY + 4TH EMOTIONAL SCENARIO                    */
/* ------------------------------------------------------------------ */

export function ProblemTightenedVoice() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">The Friction</p>
        </AnimateIn>
        <BulletList scenarios={[...ORIGINAL_SCENARIOS, FOURTH_SCENARIO]} />
        <AnimateIn delay={400}>
          <p className="mt-12 text-base font-medium leading-8 text-foreground sm:text-lg">{COMPRESSED_EMPATHY}</p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">{ORIGINAL_CLOSING}</p>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 8 — EVERYTHING COMBINED                                            */
/* ------------------------------------------------------------------ */

export function ProblemAllCombined() {
  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32">
      <style>{`
        @keyframes pv-bullet-pulse {
          0%, 100% { box-shadow: 0 0 0 0 oklch(0.55 0.22 260 / 0.5); transform: scale(1); }
          50% { box-shadow: 0 0 0 8px oklch(0.55 0.22 260 / 0); transform: scale(1.25); }
        }
        .pv-bullet-pulse { animation: pv-bullet-pulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pv-bullet-pulse { animation: none; } }
      `}</style>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <AnimateIn>
              <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">The Friction</p>
            </AnimateIn>
            <BulletList scenarios={[...ESCALATING_SCENARIOS, FOURTH_SCENARIO]} pulse />
            <AnimateIn delay={400}>
              <p className="mt-12 text-base leading-8 text-muted-foreground sm:text-lg">{COMPRESSED_EMPATHY}</p>
              <div className="mt-10 border-l-4 border-primary bg-background/30 px-6 py-5 lg:px-8 lg:py-6">
                <p className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  {SHARPENED_CLOSING}
                </p>
              </div>
            </AnimateIn>
          </div>
          <AnimateIn delay={200}>
            <aside className="rounded-3xl border border-border/60 bg-background/40 p-8 lg:sticky lg:top-24 lg:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
                MEMBER SURVEY · ILLUSTRATIVE
              </p>
              <p className="mt-6 font-display text-7xl font-black leading-none tracking-[-0.04em] text-primary lg:text-8xl">
                #1
              </p>
              <p className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
                Complaint members make about coworking spaces
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                <span className="font-bold text-foreground">WiFi reliability.</span> Above price, above location,
                above community. Replace with a real survey number once you have it.
              </p>
            </aside>
          </AnimateIn>
        </div>
        <AnimateIn delay={500}>
          <div className="mx-auto mt-16 flex max-w-3xl items-center gap-3 border-t border-border/40 pt-8">
            <p className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {PIVOT_LINE}
            </p>
            <ArrowRight aria-hidden className="size-6 shrink-0 text-primary" />
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
