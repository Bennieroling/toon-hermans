import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { AuditLayers } from "@/components/sections/AuditLayers"
import { Deliverables } from "@/components/sections/Deliverables"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { Hero } from "@/components/sections/Hero"
import { Pricing } from "@/components/sections/Pricing"
import { Problem } from "@/components/sections/Problem"
import { Process } from "@/components/sections/Process"
import { WhoIsThisFor } from "@/components/sections/WhoIsThisFor"

function App() {
  const { i18n, t } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.title = t("meta.title")

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute("content", t("meta.description"))
    }
  }, [i18n.language, t])

  return (
    <div className="grain-overlay min-h-screen bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
        href="#main"
      >
        {t("accessibility.skipToContent")}
      </a>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-60 dark:opacity-100">
        <div className="absolute right-[15%] top-[5%] h-[700px] w-[700px] rounded-full bg-primary/12 blur-[160px]" />
        <div className="absolute left-[-8%] top-[35%] h-[500px] w-[500px] rounded-full bg-primary/8 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[5%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />
      </div>
      <Header />
      <div className="relative z-10" key={i18n.language}>
        <main id="main">
          <Hero />
          <Problem />
          <WhoIsThisFor />
          <AuditLayers />
          <Process />
          <Deliverables />
          <Pricing />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
