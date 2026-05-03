import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react"

import { cn } from "@/lib/utils"

/* ==================================================================
   TextReveal — word-by-word ghost-to-solid scroll reveal
   ==================================================================
   Each word starts at 20% opacity. As the section scrolls through
   the viewport, words resolve to full opacity one at a time, tied to
   scroll progress. Linear / Apple-style reveal — calm, methodical,
   reads as "we're walking you through this."
================================================================== */

interface TextRevealProps {
  text: string
  className?: string
  /** Pixels of additional sticky scroll height to spread the reveal over.
   *  Higher = slower / more deliberate reveal. */
  scrollDistance?: number
}

export function TextReveal({ text, className, scrollDistance = 600 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const winH = window.innerHeight
      // Map: when bottom of element enters viewport → 0, when top exits → 1
      const total = rect.height + winH
      const passed = winH - rect.top
      const p = Math.max(0, Math.min(1, passed / total))
      setProgress(p)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const words = text.split(/\s+/)
  // Spread reveal across scroll: word `i` starts revealing at p = i / words.length
  // and is fully revealed at p = (i + 1) / words.length (with light overlap).
  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ minHeight: scrollDistance ? undefined : undefined }}
    >
      <p className="leading-relaxed">
        {words.map((word, i) => {
          const wordStart = i / words.length
          const wordEnd = (i + 1.2) / words.length
          const wordProgress = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart)))
          const opacity = 0.18 + 0.82 * wordProgress
          return (
            <span
              key={i}
              style={{ opacity, transition: "opacity 200ms ease-out" }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          )
        })}
      </p>
    </div>
  )
}

/* ==================================================================
   CountUp — slot-machine-style animated number counter
   ==================================================================
   On first intersection with the viewport, animates the number from
   0 to the target with easeOutCubic. Tabular-nums for stable
   alignment so the digits don't reflow. Use for stats like "847
   members" / "8 layers" / "€1,500".
================================================================== */

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  /** If true, formats with comma thousand separators */
  format?: boolean
}

export function CountUp({
  end,
  duration = 1400,
  prefix = "",
  suffix = "",
  className,
  format = true,
}: CountUpProps) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || started) return
    if (!("IntersectionObserver" in window)) {
      const t = globalThis.setTimeout(() => setStarted(true), 0)
      return () => globalThis.clearTimeout(t)
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setValue(eased * end)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, end, duration])

  const display = format ? Math.round(value).toLocaleString() : Math.round(value).toString()

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/* ==================================================================
   FlowButton — geometric two-color fill on hover
   ==================================================================
   A circular fill animates from off-screen on hover, replacing the
   button's background and inverting the text colour. No glow, no
   gradient, no pulse — just a clean geometric flip. Pairs primary
   blue with primary-foreground for the brand.
================================================================== */

interface FlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  asChild?: boolean
  href?: string
}

export function FlowButton({
  children,
  className,
  href,
  ...props
}: FlowButtonProps) {
  const baseClasses = cn(
    "group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full border border-border bg-background px-7 text-sm font-semibold text-foreground transition-colors duration-300",
    "hover:text-primary-foreground",
    className,
  )

  const overlay = (
    <span
      aria-hidden
      className="absolute left-1/2 top-1/2 -z-0 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-all duration-500 ease-out group-hover:h-[200%] group-hover:w-[200%]"
    />
  )

  if (href) {
    return (
      <a className={baseClasses} href={href} rel="noreferrer" target="_blank">
        {overlay}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    )
  }

  return (
    <button className={baseClasses} type="button" {...props}>
      {overlay}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}
