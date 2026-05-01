import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"

export function Problem() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32" id="problem">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
            {t("problem.label")}
          </p>
          <p className="mt-8 font-light text-xl leading-8 text-foreground sm:text-2xl">
            {t("problem.body_1")}
          </p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            {t("problem.body_2")}
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
