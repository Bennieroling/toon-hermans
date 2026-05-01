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
import "./i18n"
import "./styles/globals.css"

const isDiagramDemo =
  typeof window !== "undefined" && window.location.pathname.startsWith("/demo/diagrams")

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>{isDiagramDemo ? <DiagramDemo /> : <App />}</ThemeProvider>
  </StrictMode>,
)
