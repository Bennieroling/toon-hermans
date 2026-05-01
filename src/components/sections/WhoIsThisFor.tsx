import { CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"

const qualifierKeys = ["q1", "q2", "q3", "q4"] as const

export function WhoIsThisFor() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32" id="who">
      <AnimateIn>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-primary px-6 py-16 text-primary-foreground shadow-2xl shadow-primary/25 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_55%)] text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary-foreground/80">
              {t("who.label")}
            </p>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-[-0.04em] text-primary-foreground sm:text-4xl md:text-5xl">
              {t("who.headline")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-primary-foreground/85 sm:text-lg">
              {t("who.body")}
            </p>
            <ul className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              {qualifierKeys.map((key) => (
                <li
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground"
                  key={key}
                >
                  <CheckCircle className="size-4 shrink-0" />
                  {t(`who.qualifiers.${key}`)}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-10 max-w-2xl text-sm leading-7 text-primary-foreground/80 sm:text-base">
              {t("who.alternatives")}
            </p>
            <p className="mt-6 font-display text-lg italic text-primary-foreground/90 sm:text-xl">
              {t("who.closing")}
            </p>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}
