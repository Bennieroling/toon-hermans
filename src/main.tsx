import "@fontsource/inter/300.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/900.css"
import "@fontsource/space-grotesk/500.css"
import "@fontsource/space-grotesk/700.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import { ThemeProvider } from "./components/ThemeProvider"
import { DiagramDemo } from "./pages/DiagramDemo"
import { HeroDemo } from "./pages/HeroDemo"
import { MethodologyDemo } from "./pages/MethodologyDemo"
import { ProblemDemo } from "./pages/ProblemDemo"
import { WhoWeHelpDemo } from "./pages/WhoWeHelpDemo"
import "./i18n"
import "./styles/globals.css"

const path = typeof window !== "undefined" ? window.location.pathname : "/"
const isDiagramDemo = path.startsWith("/demo/diagrams")
const isHeroDemo = path.startsWith("/demo/heroes")
const isProblemDemo = path.startsWith("/demo/problems")
const isWhoWeHelpDemo = path.startsWith("/demo/whowehelp")
const isMethodologyDemo = path.startsWith("/demo/methodology")

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
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
      ) : (
        <App />
      )}
    </ThemeProvider>
  </StrictMode>,
)
