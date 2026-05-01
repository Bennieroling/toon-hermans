import { Download } from "lucide-react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { deliverables } from "@/lib/utils"

export function Deliverables() {
  const { t } = useTranslation()

  return (
    <section
      className="scroll-mt-24 overflow-hidden px-4 py-24 lg:px-6 lg:py-32"
      id="deliverables"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
        <AnimateIn>
          <div>
            <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
              {t("deliverables.label")}
            </p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
              {t("deliverables.headline")}
            </h2>
            <div className="mt-10 space-y-5">
              {deliverables.map((item) => {
                const Icon = item.icon

                return (
                  <Card className="service-card group border-border" key={item.key}>
                    <CardContent className="flex gap-5 p-6">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:scale-110">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          {t(`deliverables.items.${item.key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {t(`deliverables.items.${item.key}.description`)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <p className="mt-8 text-sm leading-7 text-muted-foreground">{t("deliverables.note")}</p>
            <div className="mt-10 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
              <Button asChild className="w-full gap-2 sm:w-auto" variant="outline">
                <a href="/sample-report.pdf" target="_blank">
                  <Download className="size-4" />
                  {t("deliverables.sample_cta")}
                </a>
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                {t("deliverables.sample_sub")}
              </p>
            </div>
          </div>
        </AnimateIn>
        <AnimateIn delay={120}>
          <div className="relative">
            <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary/12 blur-[80px]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border shadow-lg shadow-black/20">
              <img
                alt="Audit report and findings"
                className="h-full w-full object-cover"
                src="/images/excellence-code.jpg"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(19,91,236,0.18))]" />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
