/* eslint-disable react-refresh/only-export-components */
import "@fontsource/inter/300.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/900.css"
import "@fontsource/space-grotesk/500.css"
import "@fontsource/space-grotesk/700.css"

import { lazy, StrictMode, Suspense, useEffect } from "react"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "./components/ThemeProvider"
import { AnimationsDemo } from "./pages/AnimationsDemo"
import { Imprint } from "./pages/Imprint"
import { PrivacyPolicy } from "./pages/PrivacyPolicy"
import "./i18n"
import "./styles/globals.css"

/* /demo/* exploration pages are lazy-loaded so production visitors don't
 * download the variant exploration trees. They are also marked
 * noindex,follow at runtime — see DemoFrame below.                       */
const DiagramDemo = lazy(() => import("./pages/DiagramDemo").then((m) => ({ default: m.DiagramDemo })))
const HeroDemo = lazy(() => import("./pages/HeroDemo").then((m) => ({ default: m.HeroDemo })))
const ProblemDemo = lazy(() => import("./pages/ProblemDemo").then((m) => ({ default: m.ProblemDemo })))
const WhoWeHelpDemo = lazy(() => import("./pages/WhoWeHelpDemo").then((m) => ({ default: m.WhoWeHelpDemo })))
const MethodologyDemo = lazy(() => import("./pages/MethodologyDemo").then((m) => ({ default: m.MethodologyDemo })))
const WhatYouReceiveDemo = lazy(() => import("./pages/WhatYouReceiveDemo").then((m) => ({ default: m.WhatYouReceiveDemo })))
const RedesignDemo = lazy(() => import("./pages/RedesignDemo").then((m) => ({ default: m.RedesignDemo })))

const path = typeof window !== "undefined" ? window.location.pathname : "/"
const isDiagramDemo = path.startsWith("/demo/diagrams")
const isHeroDemo = path.startsWith("/demo/heroes")
const isProblemDemo = path.startsWith("/demo/problems")
const isWhoWeHelpDemo = path.startsWith("/demo/whowehelp")
const isMethodologyDemo = path.startsWith("/demo/methodology")
const isWhatYouReceiveDemo = path.startsWith("/demo/whatyoureceive")
const isRedesignDemo = path.startsWith("/demo/redesign")
const isAnimationsDemo = path.startsWith("/demo/animations")
const isAnyDemo = path.startsWith("/demo/")
const isPrivacy = path.startsWith("/privacy")
const isImprint = path.startsWith("/imprint")

/** Inject <meta name="robots" content="noindex,follow"> on demo routes so
 *  the variant exploration pages don't dilute SEO juice or get indexed. */
function NoIndex() {
  useEffect(() => {
    if (typeof document === "undefined") return
    const existing = document.querySelector('meta[name="robots"]')
    if (existing) existing.setAttribute("content", "noindex,follow")
    else {
      const meta = document.createElement("meta")
      meta.name = "robots"
      meta.content = "noindex,follow"
      document.head.appendChild(meta)
    }
  }, [])
  return null
}

function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoIndex />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Loading…
            </p>
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {isPrivacy ? (
        <PrivacyPolicy />
      ) : isImprint ? (
        <Imprint />
      ) : isAnyDemo ? (
        <DemoFrame>
          {isDiagramDemo ? (
            <DiagramDemo />
          ) : isHeroDemo ? (
            <HeroDemo />
          ) : isProblemDemo ? (
            <ProblemDemo />
          ) : isWhoWeHelpDemo ? (
            <WhoWeHelpDemo />
          ) : isMethodologyDemo ? (
            <MethodologyDemo />
          ) : isWhatYouReceiveDemo ? (
            <WhatYouReceiveDemo />
          ) : isRedesignDemo ? (
            <RedesignDemo />
          ) : isAnimationsDemo ? (
            <AnimationsDemo />
          ) : (
            <AnimationsDemo />
          )}
        </DemoFrame>
      ) : (
        // preview-4: the animations-demo page is the production homepage.
        <AnimationsDemo />
      )}
    </ThemeProvider>
  </StrictMode>,
)
