import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { Card, CardContent } from "@/components/ui/card"
import { layers } from "@/lib/utils"

export function AuditLayers() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32" id="layers">
      <div className="mx-auto max-w-[1440px]">
        <AnimateIn className="lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
                {t("layers.label")}
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
                {t("layers.headline")}
              </h2>
            </div>
            <p className="max-w-xl text-base font-light leading-8 text-muted-foreground sm:text-lg">
              {t("layers.subheadline")}
            </p>
          </div>
        </AnimateIn>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
          {layers.map((layer, index) => {
            const Icon = layer.icon

            return (
              <AnimateIn delay={index * 60} key={layer.key}>
                <Card className="service-card group h-full border-border">
                  <CardContent className="p-7">
                    <div className="flex items-start justify-between">
                      <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:scale-110">
                        <Icon className="size-7" />
                      </div>
                      <span className="font-display text-xs font-bold tracking-[0.3em] text-muted-foreground">
                        {t(`layers.items.${layer.key}.number`)}
                      </span>
                    </div>
                    <h3 className="mt-7 text-lg font-bold text-foreground">
                      {t(`layers.items.${layer.key}.name`)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {t(`layers.items.${layer.key}.description`)}
                    </p>
                    <div className="mt-6 h-1 w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-12" />
                  </CardContent>
                </Card>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
