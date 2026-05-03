import { ArrowRight, Check, CheckCircle, ChevronDown, Clock, Globe, Languages, Mail, Menu, MessageCircle, Phone, Star } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { V5Topology } from "@/components/diagrams/V5Topology"
import { LinkedInIcon } from "@/components/shared/LinkedInIcon"
import { Logo } from "@/components/shared/Logo"
import { Badge } from "@/components/ui/badge"
import { CountUp, FlowButton, TextReveal } from "@/components/ui/animations"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { WhatYouReceiveInteractive } from "@/components/whatyoureceive/WhatYouReceiveVariants"
import { useTheme } from "@/hooks/useTheme"
import { bookingUrl } from "@/lib/utils"

const NAV_KEYS = ["expertise", "process", "pricing", "contact"] as const
const NAV_HREFS: Record<typeof NAV_KEYS[number], string> = {
  expertise: "#layers",
  process: "#methodology",
  pricing: "#pricing",
  contact: "#contact",
}

const PHASE_KEYS = ["intake", "discovery", "inventory", "assessment", "report"] as const
const QUALIFIER_KEYS = ["q1", "q2", "q3", "q4"] as const
const WHAT_HAPPENS_KEYS = ["i1", "i2", "i3", "i4"] as const
const FAQ_KEYS = ["geography", "smallest", "multisite", "not_included", "timing", "remote"] as const

const SAMPLE_REPORT_HREF = "mailto:hello@sorun.dev?subject=Sample%20report%20request"

/* ==================================================================
   HEADER
================================================================== */

function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const current = i18n.language?.slice(0, 2) || "en"

  const change = (lng: string) => {
    i18n.changeLanguage(lng)
    try {
      window.localStorage.setItem("sorun-language", lng)
    } catch {
      /* ignore */
    }
    // document.documentElement.lang is updated by the page-level useEffect on i18n.language change
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("language.switch_label")}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
      >
        <Languages className="size-3.5" />
        <span className="font-mono uppercase">{t(`language.${current}`)}</span>
        <ChevronDown className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        {(["en", "nl", "es"] as const).map((lng) => (
          <DropdownMenuItem
            className={current === lng ? "font-semibold text-primary" : undefined}
            key={lng}
            onClick={() => change(lng)}
          >
            <Globe className="mr-2 size-3.5" />
            {t(`language.${lng}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AnimHeader() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
            {t("nav.brand")}
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV_KEYS.map((key) => (
            <a
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              href={NAV_HREFS[key]}
              key={key}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            aria-label={theme === "dark" ? t("theme.toggle_light") : t("theme.toggle_dark")}
            className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-background px-3 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="button"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <a
            className="hidden h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:inline-flex"
            href={bookingUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("nav.cta")}
            <ArrowRight className="size-3.5" />
          </a>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label={t("nav.menu_toggle")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:border-primary/40 hover:text-foreground md:hidden"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent className="w-[18rem]">
              <SheetHeader>
                <SheetTitle className="text-left font-display text-lg">{t("nav.brand")}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
                {NAV_KEYS.map((key) => (
                  <a
                    className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition hover:bg-muted"
                    href={NAV_HREFS[key]}
                    key={key}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(`nav.${key}`)}
                  </a>
                ))}
                <a
                  className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  href={bookingUrl}
                  onClick={() => setMenuOpen(false)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t("nav.cta")}
                  <ArrowRight className="size-4" />
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

/* ==================================================================
   HERO — iso illustration + CountUp stats + FlowButton CTA
================================================================== */

function AnimHero() {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const tt = window.setTimeout(() => setLoaded(true), 0)
    return () => window.clearTimeout(tt)
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
              {t("hero.label")}
            </p>
            <h1 className="mt-6 font-display text-5xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[5.5rem]">
              {t("hero.headline_main")}
              <br />
              <span className="text-muted-foreground">{t("hero.headline_sub")}</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              {t("hero.subheadline")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                href={bookingUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t("hero.cta")}
                <ArrowRight className="size-4" />
              </a>
              <FlowButton href="#layers">{t("hero.cta_secondary")}</FlowButton>
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
                <picture>
                  <source media="(prefers-color-scheme: dark)" srcSet="/images/floorplan-iso-dark.png" />
                  <img
                    alt="Isometric floor plan of a coworking space"
                    className="block h-full w-full object-cover dark:hidden"
                    fetchPriority="high"
                    src="/images/floorplan-iso-light.png"
                  />
                </picture>
                <img
                  alt=""
                  aria-hidden="true"
                  className="hidden h-full w-full object-cover dark:block"
                  fetchPriority="high"
                  src="/images/floorplan-iso-dark.png"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-border/70 bg-background px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                    {t("hero.stat_layers")}
                  </p>
                  <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-foreground">
                    <CountUp end={8} duration={1200} format={false} />
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                    {t("hero.stat_findings")}
                  </p>
                  <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-foreground">
                    <CountUp end={20} duration={1400} format={false} suffix="–30" />
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                    {t("hero.stat_from")}
                  </p>
                  <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-primary">
                    €1,500
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
   PROBLEM — long paragraph (TextReveal w/ blue highlights) + positive bridge + fit paragraph
================================================================== */

function AnimProblem() {
  const { t } = useTranslation()
  return (
    <section
      className="scroll-mt-24 bg-muted/40 px-6 py-28 lg:px-10 lg:py-36"
      id="problem"
    >
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            {t("problem.label")}
          </p>
        </AnimateIn>
        <div className="mt-10">
          <TextReveal
            className="font-display text-2xl font-medium tracking-[-0.015em] text-foreground sm:text-3xl"
            highlights={[
              "WiFi complaints",
              "WiFi-klachten",
              "WiFi se cae",
              "access control",
              "kapotte access control",
              "control de acceso roto",
              "Manual processes",
              "Handmatige processen",
              "procesos manuales",
              "no longer fit",
              "niet meer passen",
              "ya no encajan",
              "members, revenue, and reputation",
              "leden, omzet en reputatie",
              "miembros, ingresos y reputación",
            ]}
            text={t("problem.long_paragraph")}
          />
        </div>
        <AnimateIn delay={150}>
          <p className="mt-10 font-display text-lg font-semibold leading-8 text-primary sm:text-xl">
            {t("problem.positive_bridge")}
          </p>
        </AnimateIn>
        <AnimateIn delay={250}>
          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
            {t("problem.fit_paragraph")}
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   WHO WE HELP — production format (giant blue card)
================================================================== */

function AnimWhoWeHelp() {
  const { t } = useTranslation()
  return (
    <section className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36" id="who">
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
              {QUALIFIER_KEYS.map((key) => (
                <li
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground"
                  key={key}
                >
                  <CheckCircle aria-hidden className="size-4 shrink-0" />
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

/* ==================================================================
   AUDIT LAYERS — V5b config with auto-cycle
================================================================== */

function AnimAuditLayers() {
  const { t } = useTranslation()
  return (
    <section className="scroll-mt-24 bg-muted/40 px-6 py-28 lg:px-10 lg:py-36" id="layers">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
                {t("layers.label")}
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
                {t("layers.headline")}
              </h2>
            </div>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              {t("layers.subheadline")}
            </p>
          </div>
        </AnimateIn>
        <div className="mt-14">
          {/* Auto-cycles 01–08 every 2.4s. Pauses on interact, resumes on mouse-leave.
              6s timer is a touch-device fallback. */}
          <V5Topology autoCycleIdleMs={6000} capFloorHeight hideBottomLegend showTopTabs />
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   METHODOLOGY — horizontal timeline ruler
================================================================== */

function AnimMethodology() {
  const { t } = useTranslation()
  return (
    <section
      className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
      id="methodology"
    >
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            {t("process.label")}
          </p>
        </AnimateIn>
        <div className="mt-5">
          <TextReveal
            className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl"
            text={t("process.headline")}
          />
        </div>
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
              {PHASE_KEYS.map((key, index) => (
                <AnimateIn delay={index * 80} key={key}>
                  <Card className="service-card h-full border-border">
                    <CardContent className="p-6">
                      <div className="flex items-baseline justify-between">
                        <p className="font-display text-3xl font-black tracking-[-0.04em] text-primary">
                          {t(`process.phases.${key}.number`)}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          {t(`process.phases.${key}.day_range`)}
                        </p>
                      </div>
                      <h3 className="mt-4 text-base font-bold text-foreground">
                        {t(`process.phases.${key}.title`)}
                      </h3>
                      <Badge className="mt-2" variant="outline">
                        <Clock aria-hidden className="mr-1 size-3" />
                        {t(`process.phases.${key}.duration`)}
                      </Badge>
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {t(`process.phases.${key}.deliverable`)}
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
   WHAT YOU RECEIVE — Variant 6 (interactive cycling viewer)
================================================================== */

function AnimWhatYouReceive() {
  return (
    <div className="scroll-mt-24 bg-muted/40" id="deliverables">
      <WhatYouReceiveInteractive />
    </div>
  )
}

/* ==================================================================
   WHAT HAPPENS ON THE CALL — 4-bullet preview
================================================================== */

function AnimWhatHappens() {
  const { t } = useTranslation()
  return (
    <section className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36" id="what-happens">
      <div className="mx-auto max-w-5xl">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            {t("what_happens.label")}
          </p>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
            {t("what_happens.headline")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {t("what_happens.subheadline")}
          </p>
        </AnimateIn>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {WHAT_HAPPENS_KEYS.map((key, index) => (
            <AnimateIn delay={index * 90} key={key}>
              <Card className="service-card h-full border-border">
                <CardContent className="flex items-start gap-5 p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-mono text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {t(`what_happens.items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {t(`what_happens.items.${key}.description`)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn delay={400}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              href={bookingUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("hero.cta")}
              <ArrowRight className="size-4" />
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4" />
              30 min · {t("hero.cta_sub")}
            </span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   CREDIBILITY — stats row + anonymised testimonial
================================================================== */

function AnimCredibility() {
  const { t } = useTranslation()
  return (
    <section className="scroll-mt-24 bg-muted/40 px-6 py-28 lg:px-10 lg:py-36" id="credibility">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            {t("credibility.label")}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
            {t("credibility.headline")}
          </h2>
        </AnimateIn>
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: t("credibility.stat_locations"), value: t("credibility.stat_locations_value") },
            { label: t("credibility.stat_countries"), value: t("credibility.stat_countries_value") },
            { label: t("credibility.stat_findings"), value: t("credibility.stat_findings_value") },
            { label: t("credibility.stat_satisfaction"), value: t("credibility.stat_satisfaction_value") },
          ].map((stat, i) => (
            <AnimateIn delay={i * 80} key={stat.label}>
              <div className="rounded-2xl border border-border bg-background px-6 py-7">
                <p className="font-display text-4xl font-black tracking-[-0.04em] text-primary sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn delay={300}>
          <figure className="mt-14 rounded-3xl border border-border bg-background p-8 lg:p-12">
            <div className="flex items-center gap-1 text-primary">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star aria-hidden key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed tracking-[-0.015em] text-foreground sm:text-2xl">
              <span className="text-primary">"</span>
              {t("credibility.testimonial_quote")}
              <span className="text-primary">"</span>
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              {t("credibility.testimonial_attribution")}
            </figcaption>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
              {t("credibility.testimonial_note")}
            </p>
          </figure>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   PRICING — €1,500 static
================================================================== */

function AnimPricing() {
  const { t } = useTranslation()
  return (
    <section className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36" id="pricing">
      <div className="mx-auto max-w-3xl text-center">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            {t("pricing.label")}
          </p>
          <p className="mt-7 font-display text-7xl font-black tracking-[-0.05em] text-foreground sm:text-8xl">
            <span className="text-primary">{t("pricing.price")}</span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {t("pricing.subtitle")}
          </p>
        </AnimateIn>
        <AnimateIn delay={150}>
          <ul className="mx-auto mt-10 flex max-w-md flex-col gap-3">
            {(["fixed", "turnaround", "remote"] as const).map((key) => (
              <li
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background px-5 py-3 text-left text-sm text-foreground"
                key={key}
              >
                <Check aria-hidden className="size-4 shrink-0 text-primary" />
                {t(`pricing.features.${key}`)}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <a
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              href={bookingUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("pricing.cta")}
              <ArrowRight className="size-4" />
            </a>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-sm text-muted-foreground">
            {t("pricing.multisite_text")}{" "}
            <a className="font-semibold text-primary hover:underline" href="#contact">
              {t("pricing.multisite_link")}
            </a>
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   FAQ — collapsible <details> items, fully accessible
================================================================== */

function AnimFAQ() {
  const { t } = useTranslation()
  return (
    <section className="scroll-mt-24 bg-muted/40 px-6 py-28 lg:px-10 lg:py-36" id="faq">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            {t("faq.label")}
          </p>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
            {t("faq.headline")}
          </h2>
        </AnimateIn>
        <div className="mt-12 divide-y divide-border/60 border-y border-border/60">
          {FAQ_KEYS.map((key, i) => (
            <AnimateIn delay={i * 70} key={key}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                  <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                    {t(`faq.items.${key}.question`)}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition group-open:rotate-180" />
                </summary>
                <p className="pb-6 pr-8 text-sm leading-7 text-muted-foreground sm:text-base">
                  {t(`faq.items.${key}.answer`)}
                </p>
              </details>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   FOUNDER
================================================================== */

function AnimFounder() {
  const { t } = useTranslation()
  const founderName = t("founder.name")
  const initials = founderName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s: string) => s[0])
    .join("")
    .toUpperCase()

  return (
    <section className="scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36" id="founder">
      <div className="mx-auto max-w-4xl">
        <AnimateIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            {t("founder.label")}
          </p>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl">
            {t("founder.headline")}
          </h2>
        </AnimateIn>
        <AnimateIn delay={120}>
          <div className="mt-12 grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
            <div className="relative inline-flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-border bg-background sm:size-40">
              <span
                aria-hidden
                className="font-display text-5xl font-black tracking-[-0.04em] text-primary/40"
              >
                {initials}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                {founderName}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {t("founder.title")}
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-foreground sm:text-lg">
                {t("founder.bio")}
              </p>
              <a
                aria-label={t("founder.linkedin_label")}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                href={t("founder.linkedin_url")}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedInIcon className="size-4 text-primary" />
                {t("founder.linkedin_cta")}
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ==================================================================
   FINAL CTA — primary booking + email sample request
================================================================== */

function AnimFinalCTA() {
  const { t } = useTranslation()
  return (
    <section className="scroll-mt-24 bg-muted/40 px-6 py-28 lg:px-10 lg:py-36" id="contact">
      <AnimateIn>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            {t("final_cta.label")}
          </p>
          <h2 className="mt-5 font-display text-4xl font-black leading-tight tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
            {t("final_cta.headline_main")}
            <br />
            <span className="text-muted-foreground">{t("final_cta.headline_sub")}</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              href={bookingUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("final_cta.cta")}
              <ArrowRight className="size-4" />
            </a>
            <FlowButton href={SAMPLE_REPORT_HREF}>
              <MessageCircle className="size-4" />
              {t("final_cta.secondary_cta")}
            </FlowButton>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            <a className="hover:text-foreground" href={`mailto:${t("final_cta.email")}`}>
              <Mail aria-hidden className="mr-1 inline size-3.5" />
              {t("final_cta.email")}
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
  const { t } = useTranslation()
  return (
    <footer className="border-t border-border/50 bg-background px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Logo className="size-6 text-primary" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground">
            {t("footer.brand")}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <a className="transition hover:text-foreground" href={`mailto:${t("final_cta.email")}`}>
            {t("final_cta.email")}
          </a>
          <a
            aria-label={t("footer.social_linkedin")}
            className="inline-flex items-center gap-1.5 transition hover:text-primary"
            href={t("founder.linkedin_url")}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedInIcon className="size-3.5" />
            LinkedIn
          </a>
          <a className="transition hover:text-foreground" href="/privacy">
            {t("footer.links.privacy")}
          </a>
          <a className="transition hover:text-foreground" href="/imprint">
            {t("footer.links.imprint")}
          </a>
          <span>{t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  )
}

/* ==================================================================
   PAGE
================================================================== */

export function AnimationsDemo(): ReactNode {
  const { t, i18n } = useTranslation()

  // Apply localStorage language preference + sync html lang on language change
  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.title = t("meta.title")
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute("content", t("meta.description"))
  }, [i18n.language, t])

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
        href="#main"
      >
        {t("accessibility.skipToContent")}
      </a>
      <AnimHeader />
      <main id="main" key={i18n.language}>
        <AnimHero />
        <AnimProblem />
        <AnimWhoWeHelp />
        <AnimAuditLayers />
        <AnimMethodology />
        <AnimWhatYouReceive />
        <AnimWhatHappens />
        <AnimCredibility />
        <AnimPricing />
        <AnimFAQ />
        <AnimFounder />
        <AnimFinalCTA />
      </main>
      <AnimFooter />
    </div>
  )
}
