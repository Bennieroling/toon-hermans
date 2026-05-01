import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { layers } from "@/lib/utils"

export function EightLayerStack() {
  const { t } = useTranslation()

  return (
    <div className="relative mx-auto mt-14 max-w-4xl">
      <div
        aria-hidden
        className="absolute left-12 top-3 bottom-3 w-px bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_4px,transparent_4px,transparent_10px)] sm:left-16"
      />
      <ol className="glass-strong overflow-hidden rounded-[2rem]">
        {layers.map((layer, index) => {
          const Icon = layer.icon
          const isLast = index === layers.length - 1

          return (
            <AnimateIn delay={index * 70} key={layer.key}>
              <li
                className={`group relative flex items-start gap-4 px-5 py-6 transition-colors duration-300 hover:bg-primary/5 sm:gap-7 sm:px-8 sm:py-7 ${
                  isLast ? "" : "border-b border-border/60"
                }`}
              >
                <span
                  aria-hidden
                  className="font-display relative z-10 inline-flex w-12 shrink-0 items-center justify-start text-3xl font-black tracking-[-0.04em] text-primary sm:w-16 sm:text-4xl"
                >
                  {t(`layers.items.${layer.key}.number`)}
                </span>
                <span
                  aria-hidden
                  className="relative z-10 mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition duration-300 group-hover:scale-110 sm:size-11"
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {t(`layers.items.${layer.key}.name`)}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-[15px]">
                    {t(`layers.items.${layer.key}.description`)}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-300 group-hover:w-1"
                />
              </li>
            </AnimateIn>
          )
        })}
      </ol>
    </div>
  )
}
