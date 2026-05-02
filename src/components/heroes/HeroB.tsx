import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { bookingUrl } from "@/lib/utils"

/**
 * Path B — keep the real architectural blueprint, fix the overlay.
 * Stronger gradient fade so the right edge transitions cleanly into
 * the copy column in both themes. Multiple animated tech overlay
 * icons (WiFi, door reader, CCTV, server) positioned on the plan.
 */
export function HeroB() {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden md:flex-row">
      <style>{`
        @keyframes hb-ping { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes hb-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.3; } }
        .hb-ping-a { transform-origin: center; animation: hb-ping 2.6s ease-out infinite; }
        .hb-ping-b { transform-origin: center; animation: hb-ping 2.6s ease-out 0.9s infinite; }
        .hb-blink { animation: hb-blink 1.2s steps(2) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hb-ping-a, .hb-ping-b, .hb-blink { animation: none; }
        }
      `}</style>

      {/* Left — real blueprint with tech overlays */}
      <div className="relative h-[50vh] w-full shrink-0 overflow-hidden md:h-auto md:w-1/2">
        <img
          alt="Architectural floor plan with technology overlays"
          className="absolute inset-0 h-full w-full object-cover grayscale"
          fetchPriority="high"
          src="/images/hero-blueprint.png"
        />
        {/* light tonal overlay on the image */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(19,91,236,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-primary/8 mix-blend-multiply" />
        {/* aggressive horizontal fade — eats the right ~50% of the image so it bleeds into the copy column */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-background/20 to-background md:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40 md:hidden" />

        {/* Animated tech overlay icons positioned on the floor plan */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full text-primary"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* WiFi access point — coworking ceiling area */}
          <g>
            <circle cx={48} cy={42} r={1.2} fill="currentColor" opacity={0.95} />
            <circle cx={48} cy={42} r={3} className="hb-ping-a" fill="none" stroke="currentColor" strokeWidth={0.3} />
            <circle cx={48} cy={42} r={3} className="hb-ping-b" fill="none" stroke="currentColor" strokeWidth={0.3} />
          </g>
          {/* Door reader — entrance */}
          <g>
            <rect x={12} y={56} width={1.4} height={3} fill="currentColor" opacity={0.7} />
            <circle cx={12.7} cy={57.5} r={2.5} className="hb-ping-a" fill="none" stroke="currentColor" strokeWidth={0.3} />
          </g>
          {/* CCTV view-cone — lobby */}
          <g opacity={0.6}>
            <circle cx={20} cy={75} r={0.8} fill="currentColor" />
            <path d="M 20 75 L 14 86 L 28 86 Z" fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeWidth={0.2} strokeDasharray="0.4 0.6" />
          </g>
          {/* Server LED — IT closet */}
          <g>
            <rect x={86} y={78} width={3} height={6} rx={0.3} fill="none" stroke="currentColor" strokeWidth={0.2} opacity={0.55} />
            <circle cx={87.5} cy={80} r={0.45} fill="currentColor" className="hb-blink" />
            <circle cx={87.5} cy={82} r={0.45} fill="currentColor" className="hb-blink" style={{ animationDelay: "0.4s" }} />
          </g>
          {/* Meeting room display — top center-right */}
          <g opacity={0.7}>
            <rect x={66} y={32} width={6} height={0.5} fill="currentColor" className="hb-blink" />
          </g>
        </svg>
        {/* subtle inner border, fading toward right */}
        <div className="pointer-events-none absolute inset-6 border border-white/10 dark:border-white/5" />
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
