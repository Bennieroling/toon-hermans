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
   A horizontal "reveal line" sits at ~60% down the viewport. Each
   word's opacity depends on how far above (or below) that line the
   word sits — words below stay ghosted at 18%, words above resolve
   to 100%. As you scroll the page down, the line effectively sweeps
   up through the text, lighting it up line-by-line.

   This is per-word position, not overall scroll progress. Means the
   reveal feels tied to *the text you're actually reading*, not to
   how far you've scrolled past the section.

   highlights: pass an array of exact phrases (e.g. ["WiFi complaints",
   "access control"]) to render those phrases in primary blue, bold.
================================================================== */

interface TextRevealProps {
  text: string
  className?: string
  /** Phrases (exact-match, case-sensitive) to highlight in primary blue */
  highlights?: string[]
  /** Viewport % (0–1) below which words are still ghosted. Default 0.7 */
  startPct?: number
  /** Viewport % (0–1) above which words are fully revealed. Default 0.35 */
  endPct?: number
}

export function TextReveal({
  text,
  className,
  highlights = [],
  startPct = 0.7,
  endPct = 0.35,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<{ top: number; height: number; winH: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, height: r.height, winH: window.innerHeight })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  // Build per-word render data with highlight flags
  const tokens = buildTokens(text, highlights)

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <p className="leading-relaxed">
        {tokens.map((tok, i) => {
          let opacity = 0.18
          if (rect) {
            // Estimate word's vertical position by linear interpolation through the paragraph.
            // For wrapped paragraphs this means whole lines reveal close together — which
            // reads naturally as "the reveal line is sweeping the text."
            const wordY = rect.top + (rect.height * (i + 0.5)) / tokens.length
            const startY = rect.winH * startPct
            const endY = rect.winH * endPct
            const wp = Math.max(0, Math.min(1, (startY - wordY) / (startY - endY)))
            opacity = 0.18 + 0.82 * wp
          }
          return (
            <span
              key={i}
              className={tok.highlight ? "font-semibold text-primary" : undefined}
              style={{ opacity, transition: "opacity 180ms ease-out" }}
            >
              {tok.word}
              {!tok.isLast ? " " : ""}
            </span>
          )
        })}
      </p>
    </div>
  )
}

interface RevealToken {
  word: string
  highlight: boolean
  isLast: boolean
}

/** Walk the source text, marking words whose position falls inside any
 *  highlighted phrase. Phrases are matched as exact substrings. */
function buildTokens(text: string, highlights: string[]): RevealToken[] {
  // Build a boolean per character: highlighted or not
  const hl = new Array<boolean>(text.length).fill(false)
  for (const phrase of highlights) {
    if (!phrase) continue
    let from = 0
    while (from < text.length) {
      const idx = text.indexOf(phrase, from)
      if (idx === -1) break
      for (let i = idx; i < idx + phrase.length; i++) hl[i] = true
      from = idx + phrase.length
    }
  }

  // Now split into words while tracking each word's source-character span.
  const tokens: RevealToken[] = []
  const re = /\S+/g
  let m: RegExpExecArray | null = null
  while ((m = re.exec(text)) !== null) {
    const start = m.index
    const end = start + m[0].length
    // A word counts as highlighted if any of its characters are in a highlight span.
    let isHighlighted = false
    for (let i = start; i < end; i++) {
      if (hl[i]) {
        isHighlighted = true
        break
      }
    }
    tokens.push({ word: m[0], highlight: isHighlighted, isLast: false })
  }
  if (tokens.length > 0) tokens[tokens.length - 1].isLast = true
  return tokens
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
