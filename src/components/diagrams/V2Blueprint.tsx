import { useTranslation } from "react-i18next"

import { layers } from "@/lib/utils"

export function V2Blueprint() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
      {layers.map((layer) => {
        const Icon = layer.icon
        return (
          <div
            className="group relative border border-dashed border-primary/30 bg-background/60 p-6 transition hover:border-primary/70 hover:bg-primary/5"
            key={layer.key}
          >
            <span aria-hidden className="absolute -left-[5px] -top-[5px] font-mono text-[10px] text-primary/50">+</span>
            <span aria-hidden className="absolute -right-[5px] -top-[5px] font-mono text-[10px] text-primary/50">+</span>
            <span aria-hidden className="absolute -left-[5px] -bottom-[5px] font-mono text-[10px] text-primary/50">+</span>
            <span aria-hidden className="absolute -right-[5px] -bottom-[5px] font-mono text-[10px] text-primary/50">+</span>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              LAYER / {t(`layers.items.${layer.key}.number`)}
            </p>
            <Icon className="mt-5 size-8 text-foreground/80" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-base font-bold tracking-tight text-foreground">
              {t(`layers.items.${layer.key}.name`)}
            </h3>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              {t(`layers.items.${layer.key}.description`)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
