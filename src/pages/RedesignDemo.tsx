import { useEffect, type ReactNode } from "react"

import {
  RedesignAuditLayers,
  RedesignFinalCTA,
  RedesignFooter,
  RedesignFounder,
  RedesignHeader,
  RedesignHero,
  RedesignMethodology,
  RedesignPricing,
  RedesignProblem,
  RedesignWhoWeHelp,
} from "@/components/redesign/RedesignSections"

/**
 * /demo/redesign — full homepage do-over inspired by density.io and
 * linear.app. Light mode by default, dark via the in-page toggle only
 * (no system-pref auto-detection here).
 *
 * On mount: forces the document into "light" theme regardless of
 * what was stored. The header's toggle then flips between light/dark
 * via the existing ThemeProvider.
 *
 * On unmount: restores the user's previous theme preference, so this
 * page doesn't permanently change their site-wide dark/light choice.
 */
export function RedesignDemo(): ReactNode {
  useEffect(() => {
    const root = document.documentElement
    const previousLight = root.classList.contains("light")
    const previousDark = root.classList.contains("dark")
    const previousStored = window.localStorage.getItem("sorun-theme")

    // Force light on mount (overrides whatever the global state was)
    root.classList.remove("dark")
    root.classList.add("light")

    return () => {
      // Restore previous classes + localStorage when leaving the page
      root.classList.remove("light", "dark")
      if (previousDark) root.classList.add("dark")
      if (previousLight) root.classList.add("light")
      if (previousStored !== null) {
        window.localStorage.setItem("sorun-theme", previousStored)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <RedesignHeader />
      <main>
        <RedesignHero />
        <RedesignProblem />
        <RedesignWhoWeHelp />
        <RedesignAuditLayers />
        <RedesignMethodology />
        <RedesignPricing />
        <RedesignFounder />
        <RedesignFinalCTA />
      </main>
      <RedesignFooter />
    </div>
  )
}
