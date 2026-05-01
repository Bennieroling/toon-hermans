import { useTranslation } from "react-i18next"

import { layers } from "@/lib/utils"

const rows: number[][] = [
  [0, 1, 2],
  [3, 4],
  [5, 6, 7],
]

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

export function V7Honeycomb() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div className="flex flex-col items-center">
        {rows.map((row, ri) => (
          <div className="flex gap-3" key={ri} style={{ marginTop: ri > 0 ? -22 : 0 }}>
            {row.map((i) => {
              const layer = layers[i]
              if (!layer) return null
              const Icon = layer.icon
              return (
                <div
                  className="group relative flex h-32 w-28 flex-col items-center justify-center bg-primary/15 p-3 text-center transition hover:bg-primary/30 sm:h-36 sm:w-32"
                  key={layer.key}
                  style={{ clipPath: hexClip }}
                >
                  <Icon className="size-5 text-primary" />
                  <p className="mt-1 font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                    {t(`layers.items.${layer.key}.number`)}
                  </p>
                  <p className="mt-1 px-1 text-[10px] font-medium leading-tight text-foreground">
                    {t(`layers.items.${layer.key}.name`)}
                  </p>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
