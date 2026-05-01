import { useTranslation } from "react-i18next"

import { layers } from "@/lib/utils"

const visibleKeys = ["access", "platform", "meeting", "telephony"]
const hiddenKeys = ["network", "security", "integrations", "devices"]

export function V6Iceberg() {
  const { t } = useTranslation()
  const find = (k: string) => layers.find((l) => l.key === k)

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="rounded-t-3xl border border-b-0 border-primary/30 bg-gradient-to-b from-primary/5 to-primary/15 px-8 pb-12 pt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">VISIBLE</p>
        <p className="mt-2 text-sm text-muted-foreground">What members experience day to day</p>
        <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {visibleKeys.map((k) => {
            const layer = find(k)
            if (!layer) return null
            const Icon = layer.icon
            return (
              <li className="flex items-center gap-3 rounded-xl border border-primary/30 bg-background/70 px-4 py-3 text-sm" key={k}>
                <Icon className="size-4 shrink-0 text-primary" />
                <span className="font-mono text-xs text-primary">{t(`layers.items.${k}.number`)}</span>
                <span className="text-foreground">{t(`layers.items.${k}.name`)}</span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="relative h-px bg-primary/40">
        <div className="absolute inset-x-0 -top-3 text-center">
          <span className="bg-background px-4 font-mono text-[11px] uppercase tracking-[0.35em] text-primary">WATERLINE</span>
        </div>
      </div>
      <div className="rounded-b-3xl border border-t-0 border-primary/40 bg-gradient-to-b from-primary/20 to-primary/40 px-8 pb-12 pt-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary-foreground/85">INFRASTRUCTURE</p>
        <p className="mt-2 text-sm text-primary-foreground/70">What runs underneath, where the real cost lives</p>
        <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {hiddenKeys.map((k) => {
            const layer = find(k)
            if (!layer) return null
            const Icon = layer.icon
            return (
              <li className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-primary-foreground" key={k}>
                <Icon className="size-4 shrink-0" />
                <span className="font-mono text-xs">{t(`layers.items.${k}.number`)}</span>
                <span>{t(`layers.items.${k}.name`)}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
