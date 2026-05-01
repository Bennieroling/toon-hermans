import { useTranslation } from "react-i18next"

import { layers } from "@/lib/utils"

export function V3OSIStack() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div className="flex items-center justify-between border-x border-t border-border bg-card/40 px-6 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">MEMBER-FACING</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">VISIBLE</p>
      </div>
      {layers.slice(0, 4).map((layer) => {
        const Icon = layer.icon
        return (
          <div
            className="flex items-center gap-5 border border-b-0 border-border bg-card px-6 py-5 transition hover:bg-primary/5"
            key={layer.key}
          >
            <span className="font-display w-10 text-2xl font-black tracking-tight text-primary">
              {t(`layers.items.${layer.key}.number`)}
            </span>
            <Icon className="size-5 shrink-0 text-foreground/80" />
            <span className="flex-1 font-display text-base font-bold text-foreground">
              {t(`layers.items.${layer.key}.name`)}
            </span>
            <span className="hidden max-w-xs text-xs leading-6 text-muted-foreground md:block">
              {t(`layers.items.${layer.key}.description`)}
            </span>
          </div>
        )
      })}
      <div className="flex items-center justify-between border-x border-y border-border bg-muted/40 px-6 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">INFRASTRUCTURE</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">FOUNDATION</p>
      </div>
      {layers.slice(4).map((layer, i) => {
        const Icon = layer.icon
        const isLast = i === layers.slice(4).length - 1
        return (
          <div
            className={`flex items-center gap-5 border-x border-b border-border bg-card/60 px-6 py-5 transition hover:bg-primary/5 ${isLast ? "rounded-b-none" : ""}`}
            key={layer.key}
          >
            <span className="font-display w-10 text-2xl font-black tracking-tight text-primary">
              {t(`layers.items.${layer.key}.number`)}
            </span>
            <Icon className="size-5 shrink-0 text-foreground/80" />
            <span className="flex-1 font-display text-base font-bold text-foreground">
              {t(`layers.items.${layer.key}.name`)}
            </span>
            <span className="hidden max-w-xs text-xs leading-6 text-muted-foreground md:block">
              {t(`layers.items.${layer.key}.description`)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
