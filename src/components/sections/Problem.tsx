import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"

const scenarioKeys = ["s1", "s2", "s3"] as const

export function Problem() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32" id="problem">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
            {t("problem.label")}
          </p>
        </AnimateIn>
        <ul className="mt-10 space-y-1 border-l-2 border-primary/30">
          {scenarioKeys.map((key, index) => (
            <AnimateIn delay={index * 100} key={key}>
              <li className="relative pl-6 sm:pl-8">
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-3 size-2 rounded-full bg-primary"
                />
                <p className="font-display text-xl font-medium leading-9 text-foreground sm:text-2xl">
                  {t(`problem.scenarios.${key}`)}
                </p>
              </li>
            </AnimateIn>
          ))}
        </ul>
        <AnimateIn delay={300}>
          <p className="mt-12 text-base font-medium leading-8 text-foreground sm:text-lg">
            {t("problem.empathy")}
          </p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            {t("problem.closing")}
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
