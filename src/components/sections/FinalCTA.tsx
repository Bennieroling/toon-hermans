import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32" id="contact">
      <AnimateIn>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-primary px-6 py-16 text-center text-primary-foreground shadow-2xl shadow-primary/25 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_55%)]">
            <h2 className="font-display text-4xl font-black leading-tight tracking-[-0.05em] text-primary-foreground md:text-6xl">
              {t("final_cta.headline")}
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-4">
              <Button
                asChild
                className="rounded-xl bg-background px-10 py-5 text-lg font-black text-primary shadow-2xl hover:bg-background/90"
                size="lg"
                variant="secondary"
              >
                <a href="mailto:hello@sorun.dev">
                  {t("final_cta.cta")}
                  <ArrowRight className="size-5" />
                </a>
              </Button>
              <a
                className="font-display text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground/80 transition hover:text-primary-foreground"
                href="mailto:hello@sorun.dev"
              >
                {t("final_cta.email")}
              </a>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}
