import { ArrowRight } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { HeroFloorplan } from "@/components/heroes/HeroFloorplan"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { bookingUrl } from "@/lib/utils"

/**
 * Four hero variants on top of the same V5-style schematic floor plan.
 * They share an identical right-column (badge / headline / subheadline
 * / CTA / cta sub) — the only difference is which animation mode the
 * floor plan runs in.
 */

interface HeroShellProps {
  children: ReactNode
}

function HeroShell({ children }: HeroShellProps) {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden md:flex-row">
      {/* Left — schematic */}
      <div className="relative h-[50vh] w-full shrink-0 overflow-hidden md:h-auto md:w-1/2">
        <div className="absolute inset-0 flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-2xl">{children}</div>
        </div>
        {/* gradient fade into the right column */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-background md:block" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(19,91,236,0.06),transparent_55%)]" />
      </div>

      {/* Right — copy + CTA */}
      <div className="relative z-10 flex w-full shrink-0 items-center px-6 py-16 sm:px-8 lg:w-1/2 lg:px-20 lg:py-20">
        <div
          className={`w-full max-w-2xl text-foreground transition-all duration-700 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <Badge className="mb-6 bg-primary/10 text-primary">{t("hero.label")}</Badge>
          <h1 className="mt-6 font-display text-5xl font-black leading-[1.04] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[4.6rem]">
            {t("hero.headline")}
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-8 text-muted-foreground sm:text-lg">
            {t("hero.subheadline")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={bookingUrl} rel="noreferrer" target="_blank">
                {t("hero.cta")}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 max-w-md text-xs leading-6 text-muted-foreground">{t("hero.cta_sub")}</p>
        </div>
      </div>
    </section>
  )
}

/** Path D — clean schematic with ambient overlays only. */
export function HeroD() {
  return (
    <HeroShell>
      <HeroFloorplan />
    </HeroShell>
  )
}

/** Path D + E1 — schematic with cinematic camera fly-through. */
export function HeroDE1() {
  return (
    <HeroShell>
      <HeroFloorplan flyThrough />
    </HeroShell>
  )
}

/** Path D + E2 — schematic with multi-event live simulation on top. */
export function HeroDE2() {
  return (
    <HeroShell>
      <HeroFloorplan extraEvents />
    </HeroShell>
  )
}

/** Path D + E3 — schematic with mouse-tracked spotlight + parallax. */
export function HeroDE3() {
  return (
    <HeroShell>
      <HeroFloorplan parallax />
    </HeroShell>
  )
}

/** Option 1 — narrative cycle "a day in the space" (replaces E2's flavour). */
export function HeroDE2Narrative() {
  return (
    <HeroShell>
      <HeroFloorplan narrativeCycle />
    </HeroShell>
  )
}

/** Option 2 — D+E2 with a system-sweep scan line. */
export function HeroDE2Sweep() {
  return (
    <HeroShell>
      <HeroFloorplan extraEvents systemSweep />
    </HeroShell>
  )
}

/** Option 3 — D+E2 with telemetry ticker + inline data badges. */
export function HeroDE2Ticker() {
  return (
    <HeroShell>
      <HeroFloorplan extraEvents telemetryBadges telemetryTicker />
    </HeroShell>
  )
}

/** Option 6 — D+E2 with system sweep + inline data badges (no bottom ticker).
 *  My recommended production hero combination. */
export function HeroDE2SweepBadges() {
  return (
    <HeroShell>
      <HeroFloorplan extraEvents systemSweep telemetryBadges />
    </HeroShell>
  )
}

/** Option 4 — D+E2 with connection web (system interconnections visualised). */
export function HeroDE2Web() {
  return (
    <HeroShell>
      <HeroFloorplan extraEvents connectionWeb />
    </HeroShell>
  )
}

/** Option 5 — D+E2 with periodic "issue → resolved" alert dramaturgy. */
export function HeroDE2Alert() {
  return (
    <HeroShell>
      <HeroFloorplan extraEvents alertDrama />
    </HeroShell>
  )
}
