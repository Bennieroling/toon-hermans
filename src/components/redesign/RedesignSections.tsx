import {
  ArrowRight,
  Check,
  Clock,
  Download,
  FileText,
  Mail,
  Map,
  Mic,
  Phone,
  Send,
} from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { V5Topology } from "@/components/diagrams/V5Topology"
import { LinkedInIcon } from "@/components/shared/LinkedInIcon"
import { Logo } from "@/components/shared/Logo"
import { useTheme } from "@/hooks/useTheme"
import { bookingUrl, layers } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Section helper: section frame with consistent spacing rhythm        */
/* ------------------------------------------------------------------ */

function SectionFrame({
  children,
  id,
  bg = "default",
}: {
  children: ReactNode
  id?: string
  bg?: "default" | "muted"
}) {
  return (
    <section
      className={`scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36 ${bg === "muted" ? "bg-muted/40" : ""}`}
      id={id}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">{children}</p>
  )
}

/* ================================================================== */
/* HEADER                                                              */
/* ================================================================== */

const navItems = [
  { key: "expertise", label: "Expertise", href: "#layers" },
  { key: "process", label: "Process", href: "#methodology" },
  { key: "pricing", label: "Pricing", href: "#pricing" },
  { key: "contact", label: "Contact", href: "#contact" },
]

export function RedesignHeader() {
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
          <span className="font-display text-base font-bold uppercase tracking-[0.18em]">SORUN</span>
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
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
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

/* ================================================================== */
/* HERO                                                                */
/* ================================================================== */

export function RedesignHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 lg:px-10 lg:pt-28 lg:pb-36" id="hero">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <AnimateIn>
            <SectionEyebrow>Coworking technology advisory</SectionEyebrow>
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
                className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-semibold text-background transition hover:opacity-90"
                href={bookingUrl}
                rel="noreferrer"
                target="_blank"
              >
                Book a 30-minute call
                <ArrowRight className="size-4" />
              </a>
              <a
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                href="#layers"
              >
                See what we audit
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              No commitment. No sales pitch. A conversation about your space.
            </p>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div className="relative">
              <div className="pointer-events-none absolute -right-10 -top-10 size-72 rounded-full bg-primary/12 blur-[100px]" />
              <div className="relative aspect-[5/6] overflow-hidden rounded-[1.5rem] border border-border bg-background/50">
                <div className="absolute inset-0">
                  <V5Topology autoCycle bareFloorPlan disableInteractions />
                </div>
                <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-border/70 bg-background/85 px-3 py-2 backdrop-blur-sm">
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Layers</p>
                    <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-foreground">8</p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/85 px-3 py-2 backdrop-blur-sm">
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Time</p>
                    <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-foreground">2–3 wk</p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/85 px-3 py-2 backdrop-blur-sm">
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">From</p>
                    <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-primary">€1,500</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/* PROBLEM — The gaps between your systems (Variant 9 reframe, lighter)*/
/* ================================================================== */

interface GapBeat {
  pair: string
  whenConnected: string
  whenNot: string
}

const gapBeats: GapBeat[] = [
  {
    pair: "Booking → Access control",
    whenConnected:
      "A member books a phone booth at 11pm for tomorrow's 7am call. The booking system charges them. The access system provisions a 30-minute door pass.",
    whenNot: "The booking sits unprocessed until Monday. The member shows up to a locked door.",
  },
  {
    pair: "Membership → Printing",
    whenConnected:
      "A member sends a 200-page print job. The print server checks their plan, charges their account, logs the job to their billing.",
    whenNot: "They print, you absorb the cost. Or they don't print at all.",
  },
  {
    pair: "WiFi → Occupancy",
    whenConnected:
      "Your APs already know how many devices are in each meeting room. Your booking system uses that to mark rooms as occupied or free.",
    whenNot: "The room shows 'free' on Cal — but it's been occupied for 40 minutes.",
  },
  {
    pair: "VC system → Cleaning ops",
    whenConnected:
      "The camera in each room snapshots the state at the end of each booking. Hosts get a list of rooms that need turning over.",
    whenNot: "The next member walks into yesterday's coffee cups and leaves a 3-star review.",
  },
  {
    pair: "Onboarding → Everything",
    whenConnected:
      "A new member's fob, WiFi credentials, print quota, and booking access are provisioned in one flow on day one.",
    whenNot: "Four signups, four passwords, four ways to feel like an outsider.",
  },
]

export function RedesignProblem() {
  return (
    <SectionFrame id="problem" bg="muted">
      <AnimateIn>
        <SectionEyebrow>The gaps between your systems</SectionEyebrow>
        <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
          Most spaces don't fail in obvious ways. They fall short in the gaps — between
          systems that should be wired together but aren't.
        </h2>
      </AnimateIn>
      <ol className="mt-16 space-y-px overflow-hidden rounded-2xl border border-border/60 bg-background/40">
        {gapBeats.map((beat, index) => (
          <AnimateIn delay={index * 60} key={beat.pair}>
            <li className="grid gap-5 border-b border-border/60 px-6 py-7 last:border-b-0 lg:grid-cols-[260px_1fr_1fr] lg:gap-12 lg:px-10 lg:py-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  GAP / {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {beat.pair}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  WHEN IT'S WIRED
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground sm:text-[15px]">{beat.whenConnected}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  WHEN IT ISN'T
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-[15px]">{beat.whenNot}</p>
              </div>
            </li>
          </AnimateIn>
        ))}
      </ol>
      <AnimateIn delay={400}>
        <div className="mt-12 max-w-3xl">
          <p className="text-base leading-7 text-foreground sm:text-lg">
            An audit finds gaps like these — where your systems already hold the data, but
            nothing is wired up to act on it. We don't promise your WiFi never drops. We
            promise to show you what your stack could be doing for you that it isn't.
          </p>
          <p className="mt-6 font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl">
            The result isn't a tech upgrade. It's making the space operate the way it should
            already be operating.
          </p>
        </div>
      </AnimateIn>
    </SectionFrame>
  )
}

/* ================================================================== */
/* WHO WE HELP                                                         */
/* ================================================================== */

const positiveQualifiers = [
  "You run 1–5 coworking or flex office locations",
  "You make the platform, vendor, and infrastructure calls",
  "You're tired of muddling through",
  "You want a plan, not a patch",
]

export function RedesignWhoWeHelp() {
  return (
    <SectionFrame id="who">
      <AnimateIn>
        <SectionEyebrow>Who we work with</SectionEyebrow>
        <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
          Built for the operator who runs the space <span className="text-primary">and</span> the
          tech.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          If you're the person making the calls about your member platform, your access
          system, and your WiFi vendor — we work with you.
        </p>
      </AnimateIn>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <AnimateIn delay={120}>
          <ul className="space-y-3">
            {positiveQualifiers.map((q, i) => (
              <li className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 px-5 py-4" key={i}>
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-6 text-foreground sm:text-[15px]">{q}</span>
              </li>
            ))}
          </ul>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 lg:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              Already have an IT team?
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground sm:text-[15px]">
              If you've got an in-house IT lead, fractional CTO, or trusted MSP — we often work{" "}
              <span className="font-bold">alongside them</span>, auditing the coworking-specific
              layers a generalist team doesn't always see day-to-day. The audit makes their job
              easier, not redundant.
            </p>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            You've already tried the enterprise integrators, the generalist IT support, or your
            platform vendor's helpdesk. You know they don't fit.
          </p>
        </AnimateIn>
      </div>
    </SectionFrame>
  )
}

/* ================================================================== */
/* AUDIT LAYERS                                                        */
/* ================================================================== */

export function RedesignAuditLayers() {
  return (
    <SectionFrame id="layers" bg="muted">
      <AnimateIn>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <SectionEyebrow>What we audit</SectionEyebrow>
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
    </SectionFrame>
  )
}

/* ================================================================== */
/* METHODOLOGY (Linear-style stepper, light)                           */
/* ================================================================== */

interface RichPhase {
  number: string
  title: string
  duration: string
  dayRange: string
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
    buyerCommit: "One 30–45-minute call. You describe your space and what's bothering you.",
    whatWeDo: "Assess fit, scope the audit, agree on which locations are in.",
    deliverable: "A one-page scope summary in your inbox the same day.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Discovery",
    duration: "Async + 1 call",
    dayRange: "Days 1–4",
    buyerCommit: "Share floor plans, photos, vendor list. ~2 hours of your time.",
    whatWeDo: "Map your technology to how the space actually operates.",
    deliverable: "A technology footprint document showing where each system lives.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Stack inventory",
    duration: "100% remote",
    dayRange: "Days 5–10",
    buyerCommit: "~3 hours of access calls and Q&A with your IT contact.",
    whatWeDo: "Document all 8 layers. Every component and known issue captured.",
    deliverable: "Complete stack inventory — typically 40–60 pages, indexed by layer.",
    icon: Send,
  },
  {
    number: "04",
    title: "Assessment",
    duration: "Analysis only",
    dayRange: "Days 11–14",
    buyerCommit: "Nothing. Step back and let us do the work.",
    whatWeDo: "Rate each layer for severity, business impact, effort, and dependency.",
    deliverable: "Prioritised findings matrix with cost / effort / impact ratings.",
    icon: Check,
  },
  {
    number: "05",
    title: "Report & walkthrough",
    duration: "Delivered + 60-min call",
    dayRange: "Days 15–21",
    buyerCommit: "A 60-minute walkthrough call with your team. Bring questions.",
    whatWeDo: "Deliver the written report. Walk you through findings live. Answer everything.",
    deliverable: "Full written report + executive summary + 90-day roadmap + recording.",
    icon: Mail,
  },
]

const finalDeliverables: { icon: typeof FileText; label: string; meta: string }[] = [
  { icon: FileText, label: "Full written report", meta: "40–60 pages" },
  { icon: Check, label: "Prioritised findings", meta: "20–30 findings" },
  { icon: Map, label: "Implementation roadmap", meta: "12-week timeline" },
  { icon: Mic, label: "Live walkthrough + Q&A", meta: "60 min · recorded" },
]

export function RedesignMethodology() {
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
    <SectionFrame id="methodology">
      <AnimateIn>
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
          From first call to final report in <span className="text-primary">2–3 weeks</span>.
          Each phase ends with something concrete in your hands.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Total of your time: roughly <span className="font-bold text-foreground">5 hours over 3 weeks</span>.
        </p>
      </AnimateIn>

      <div className="relative mt-14" ref={containerRef}>
        <div className="absolute left-6 top-2 bottom-2 w-px bg-border sm:left-8" />
        <div
          className="absolute left-6 top-2 w-px bg-primary transition-all duration-500 sm:left-8"
          style={{ height: `calc(${((activePhase + 1) / richPhases.length) * 100}% - 16px)` }}
        />

        <ol className="space-y-6">
          {richPhases.map((phase, index) => {
            const Icon = phase.icon
            const isActive = index <= activePhase
            return (
              <li className="relative pl-16 sm:pl-20" data-phase={index} key={phase.number}>
                <div
                  className={`absolute left-0 top-2 flex size-12 items-center justify-center rounded-full border transition-all duration-500 sm:size-16 ${isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}
                >
                  <Icon className={isActive ? "size-5" : "size-4"} />
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/40 p-6 lg:p-8">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <p className="font-display text-3xl font-black tracking-[-0.045em] text-primary">
                      {phase.number}
                    </p>
                    <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                      {phase.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <Clock className="size-3" />
                      {phase.duration}
                    </span>
                    <p className="ml-auto font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {phase.dayRange}
                    </p>
                  </div>
                  <div className="mt-5 grid gap-5 lg:grid-cols-3 lg:gap-8">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">YOUR TIME</p>
                      <p className="mt-2 text-sm leading-7 text-foreground sm:text-[14px]">{phase.buyerCommit}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">OUR WORK</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-[14px]">{phase.whatWeDo}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">YOU WALK AWAY WITH</p>
                      <div className="mt-2 flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <p className="text-sm leading-7 text-foreground sm:text-[14px]">{phase.deliverable}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Deliverables climax — replaces standalone What-You-Receive */}
      <AnimateIn delay={200}>
        <div className="mt-20 rounded-3xl border border-border/60 bg-background/40 p-8 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionEyebrow>At the end, you have…</SectionEyebrow>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-3xl">
                A clear picture, a sequenced plan, and a live walkthrough — all yours.
              </h3>
              <ul className="mt-7 space-y-2.5">
                {finalDeliverables.map((d, i) => {
                  const Icon = d.icon
                  return (
                    <li className="flex items-center gap-4 rounded-xl border border-border/50 bg-background px-4 py-3" key={i}>
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex flex-1 items-baseline justify-between gap-3">
                        <p className="text-sm font-bold text-foreground">{d.label}</p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                          {d.meta}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-8">
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                  href="/sample-report.pdf"
                  target="_blank"
                >
                  <Download className="size-4" />
                  Download a sample report excerpt
                </a>
                <p className="mt-2.5 text-xs text-muted-foreground">PDF, 1.2MB · See the level of detail.</p>
              </div>
            </div>

            {/* Sample finding callout */}
            <div className="rounded-2xl border border-border bg-background p-6 lg:p-7">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  SAMPLE FINDING · ILLUSTRATIVE
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-destructive">
                  <span className="size-1.5 rounded-full bg-destructive" />
                  HIGH
                </span>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                LAYER 02 · ACCESS CONTROL · FINDING #07
              </p>
              <p className="mt-4 font-display text-lg font-bold leading-snug text-foreground sm:text-xl">
                Door reader at meeting room 2 fails ~30% of access attempts.
              </p>
              <dl className="mt-5 space-y-3 text-xs leading-6 text-foreground sm:text-sm sm:leading-7">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    BUSINESS IMPACT
                  </dt>
                  <dd className="mt-0.5">
                    ~12 missed bookings/month →{" "}
                    <span className="font-bold">€2,400</span> in lost revenue.
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    RECOMMENDATION
                  </dt>
                  <dd className="mt-0.5">
                    Replace controller (Aperio kit) — <span className="font-bold">€450</span>, 2-hour install.
                  </dd>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">EFFORT</dt>
                    <dd className="mt-1.5 flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span className={`size-2 rounded-full ${n <= 2 ? "bg-primary" : "bg-border"}`} key={`e${n}`} />
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">IMPACT</dt>
                    <dd className="mt-1.5 flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span className={`size-2 rounded-full ${n <= 4 ? "bg-primary" : "bg-border"}`} key={`i${n}`} />
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>
              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                Every finding follows this format. ~20–30 per audit, severity-rated.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>
    </SectionFrame>
  )
}

/* ================================================================== */
/* PRICING                                                             */
/* ================================================================== */

export function RedesignPricing() {
  return (
    <SectionFrame id="pricing" bg="muted">
      <div className="mx-auto max-w-3xl text-center">
        <AnimateIn>
          <SectionEyebrow>Entry-point audit</SectionEyebrow>
          <p className="mt-7 font-display text-7xl font-black tracking-[-0.05em] text-foreground sm:text-8xl">
            from <span className="text-primary">€1,500</span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Fixed price for a single-location audit. No hourly billing, no surprises.
          </p>
        </AnimateIn>

        <AnimateIn delay={150}>
          <ul className="mx-auto mt-10 flex max-w-md flex-col gap-3">
            {[
              "Fixed scope, clear deliverables",
              "2–3 week turnaround",
              "100% remote delivery",
            ].map((feature, i) => (
              <li className="flex items-center gap-3 rounded-xl border border-border/60 bg-background px-5 py-3 text-left text-sm text-foreground" key={i}>
                <Check className="size-4 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <a
            className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-semibold text-background transition hover:opacity-90"
            href={bookingUrl}
            rel="noreferrer"
            target="_blank"
          >
            Book a free 30-minute call
            <ArrowRight className="size-4" />
          </a>
          <p className="mt-5 text-xs text-muted-foreground">
            Running multiple locations? Shared infrastructure means shared scope, not multiplied
            cost.{" "}
            <a className="text-primary hover:underline" href="#contact">
              Let's talk.
            </a>
          </p>
        </AnimateIn>
      </div>
    </SectionFrame>
  )
}

/* ================================================================== */
/* FOUNDER                                                             */
/* ================================================================== */

export function RedesignFounder() {
  return (
    <SectionFrame id="founder">
      <div className="mx-auto max-w-4xl">
        <AnimateIn>
          <SectionEyebrow>About</SectionEyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl">
            Built by someone who has lived this.
          </h2>
        </AnimateIn>
        <AnimateIn delay={120}>
          <div className="mt-12 grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
            <div className="relative inline-flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-border bg-background sm:size-40">
              <span aria-hidden className="font-display text-5xl font-black tracking-[-0.04em] text-primary/40">
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
    </SectionFrame>
  )
}

/* ================================================================== */
/* FINAL CTA                                                           */
/* ================================================================== */

export function RedesignFinalCTA() {
  return (
    <SectionFrame id="contact" bg="muted">
      <AnimateIn>
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Get in touch</SectionEyebrow>
          <h2 className="mt-5 font-display text-4xl font-black leading-tight tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
            Get the tech right.
            <br />
            <span className="text-muted-foreground">The rest gets easier.</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-semibold text-background transition hover:opacity-90"
              href={bookingUrl}
              rel="noreferrer"
              target="_blank"
            >
              Book a 30-minute call
              <ArrowRight className="size-4" />
            </a>
            <a
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
              href="mailto:hello@sorun.dev"
            >
              <Mail className="size-4" />
              hello@sorun.dev
            </a>
          </div>
        </div>
      </AnimateIn>
    </SectionFrame>
  )
}

/* ================================================================== */
/* FOOTER                                                              */
/* ================================================================== */

export function RedesignFooter() {
  return (
    <footer className="border-t border-border/50 bg-background px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Logo className="size-6 text-primary" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground">SORUN.DEV</span>
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

/* ================================================================== */
/* Suppress unused-import lint for icons referenced as types only      */
/* ================================================================== */

void layers
void useTranslation
