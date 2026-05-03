import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { bookingUrl } from "@/lib/utils"

/**
 * HeroIsometric — proposed hero using the AI-generated isometric floor
 * plan illustrations (light + dark variants) as the right-column visual.
 * Uses the same layout and copy treatment as the /demo/redesign hero
 * (light-default styling, restrained primary blue, foreground-on-
 * background CTAs replaced with primary-blue CTA per user feedback).
 */
export function HeroIsometric() {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 lg:px-10 lg:pt-28 lg:pb-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div
            className={`transition-all duration-700 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
              {t("hero.label")}
            </p>
            <h1 className="mt-6 font-display text-5xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[5.5rem]">
              You run the space.
              <br />
              <span className="text-muted-foreground">We handle the tech.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              {t("hero.subheadline")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                href={bookingUrl}
                rel="noreferrer"
                target="_blank"
              >
                {t("hero.cta")}
                <ArrowRight className="size-4" />
              </a>
              <a
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                href="#layers"
              >
                See what we audit
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">{t("hero.cta_sub")}</p>
          </div>

          <div
            className={`transition-all duration-700 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="relative">
              <div className="pointer-events-none absolute -right-10 -top-10 size-72 rounded-full bg-primary/12 blur-[100px]" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-border bg-background/50 shadow-lg shadow-black/5 dark:shadow-black/30">
                {/* theme-aware image swap */}
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
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Layers</p>
                  <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-foreground">8</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Time</p>
                  <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-foreground">2–3 wk</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">From</p>
                  <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-primary">€1,500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
