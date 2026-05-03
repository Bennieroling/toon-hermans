import { useEffect, useRef, useState, type ReactNode } from "react"

import { useReducedMotion } from "@/hooks/useReducedMotion"

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimateIn({ children, className = "", delay = 0 }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      const t = globalThis.setTimeout(() => setVisible(true), 0)
      return () => globalThis.clearTimeout(t)
    }
    const element = ref.current
    if (!element) {
      return
    }

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = globalThis.setTimeout(() => setVisible(true), 0)
      return () => globalThis.clearTimeout(fallbackTimer)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          globalThis.setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "-50px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay, reducedMotion])

  return (
    <div
      className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
      ref={ref}
    >
      {children}
    </div>
  )
}
