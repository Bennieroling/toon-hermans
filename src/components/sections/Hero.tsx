import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Hero() {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden pt-24 md:flex-row" id="hero">
      <div className="relative h-[50vh] w-full shrink-0 overflow-hidden md:h-auto md:w-1/2">
        <img
          alt="Modern coworking workspace"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          src="/images/hero-office.jpg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_45%),linear-gradient(120deg,rgba(19,91,236,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent to-background md:block dark:to-background" />
        <div className="absolute inset-6 border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),transparent_35%,rgba(19,91,236,0.12))]" />
      </div>

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
              <a href="mailto:hello@sorun.dev">
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
