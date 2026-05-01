import { CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const featureKeys = ["fixed", "turnaround", "remote"] as const

export function Pricing() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32" id="pricing">
      <div className="mx-auto max-w-2xl text-center">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
            {t("pricing.label")}
          </p>
          <Card className="glass-strong mx-auto mt-10 max-w-md rounded-[2rem] text-left">
            <CardContent className="p-10">
              <p className="font-display text-5xl font-black tracking-[-0.04em] text-foreground">
                {t("pricing.price")}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{t("pricing.subtitle")}</p>
              <ul className="mt-8 space-y-3">
                {featureKeys.map((key) => (
                  <li className="flex items-center gap-3 text-sm text-foreground" key={key}>
                    <CheckCircle className="size-4 shrink-0 text-primary" />
                    {t(`pricing.features.${key}`)}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full" size="lg">
                <a href="mailto:hello@sorun.dev">{t("pricing.cta")}</a>
              </Button>
              <p className="mt-6 text-xs leading-6 text-muted-foreground">
                {t("pricing.multisite_text")}{" "}
                <a className="font-semibold text-primary hover:underline" href="#contact">
                  {t("pricing.multisite_link")}
                </a>
              </p>
            </CardContent>
          </Card>
        </AnimateIn>
      </div>
    </section>
  )
}
