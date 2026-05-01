import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { phases } from "@/lib/utils"

export function Process() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32" id="process">
      <div className="mx-auto max-w-[1440px]">
        <AnimateIn className="lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
                {t("process.label")}
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
                {t("process.headline")}
              </h2>
            </div>
          </div>
        </AnimateIn>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:px-6">
          {phases.map((phase, index) => (
            <AnimateIn delay={index * 80} key={phase}>
              <Card className="service-card group h-full border-border">
                <CardContent className="p-7">
                  <p className="font-display text-4xl font-black tracking-[-0.04em] text-primary">
                    {t(`process.phases.${phase}.number`)}
                  </p>
                  <h3 className="mt-6 text-lg font-bold text-foreground">
                    {t(`process.phases.${phase}.title`)}
                  </h3>
                  <Badge className="mt-3" variant="outline">
                    {t(`process.phases.${phase}.duration`)}
                  </Badge>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {t(`process.phases.${phase}.description`)}
                  </p>
                </CardContent>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
