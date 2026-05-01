import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { Card, CardContent } from "@/components/ui/card"

const pathKeys = ["team", "partner", "coordinate"] as const

export function WhatHappensAfter() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32" id="whats-next">
      <div className="mx-auto max-w-[1440px]">
        <AnimateIn className="lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
                {t("whats_next.label")}
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
                {t("whats_next.headline")}
              </h2>
            </div>
            <p className="max-w-xl text-base font-light leading-8 text-muted-foreground sm:text-lg">
              {t("whats_next.subheadline")}
            </p>
          </div>
        </AnimateIn>
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:px-6">
          {pathKeys.map((key, index) => (
            <AnimateIn delay={index * 80} key={key}>
              <Card className="service-card group h-full border-border">
                <CardContent className="flex h-full flex-col p-7">
                  <p className="font-display text-4xl font-black tracking-[-0.04em] text-primary">
                    {t(`whats_next.paths.${key}.number`)}
                  </p>
                  <h3 className="mt-6 text-lg font-bold text-foreground">
                    {t(`whats_next.paths.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {t(`whats_next.paths.${key}.description`)}
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
