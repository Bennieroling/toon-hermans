import { useTranslation } from "react-i18next"

import { layers } from "@/lib/utils"

export function V8Minimal() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <ol className="divide-y divide-border">
        {layers.map((layer) => (
          <li className="grid grid-cols-[3rem_1fr] gap-4 py-5 sm:grid-cols-[4rem_1fr_2fr] sm:gap-8" key={layer.key}>
            <span className="font-mono text-sm tracking-[0.2em] text-muted-foreground sm:text-base">
              {t(`layers.items.${layer.key}.number`)}
            </span>
            <span className="font-display text-base font-bold text-foreground sm:text-lg">
              {t(`layers.items.${layer.key}.name`)}
            </span>
            <span className="col-span-2 text-sm leading-7 text-muted-foreground sm:col-span-1">
              {t(`layers.items.${layer.key}.description`)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
