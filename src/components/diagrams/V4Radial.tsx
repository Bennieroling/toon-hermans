import { useTranslation } from "react-i18next"

import { layers } from "@/lib/utils"

export function V4Radial() {
  const { t } = useTranslation()
  const cx = 300
  const cy = 300
  const R = 220

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <svg className="w-full text-foreground" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="radial-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={R + 60} fill="url(#radial-glow)" />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="currentColor" strokeOpacity={0.08} strokeDasharray="2 6" />
        <circle cx={cx} cy={cy} r={70} className="fill-primary/10" stroke="currentColor" strokeOpacity={0.5} />
        <text className="fill-primary font-display text-[11px] font-black uppercase" textAnchor="middle" x={cx} y={cy - 4} style={{ letterSpacing: "0.25em" }}>
          MEMBERS
        </text>
        <text className="fill-muted-foreground text-[9px]" textAnchor="middle" x={cx} y={cy + 12}>
          everything serves them
        </text>
        {layers.map((layer, i) => {
          const angle = (i / layers.length) * 2 * Math.PI - Math.PI / 2
          const x = cx + R * Math.cos(angle)
          const y = cy + R * Math.sin(angle)
          return (
            <g className="transition" key={layer.key}>
              <line stroke="currentColor" strokeOpacity={0.18} strokeWidth={1} x1={cx} x2={x} y1={cy} y2={y} />
              <circle cx={x} cy={y} r={36} className="fill-card" stroke="currentColor" strokeOpacity={0.4} />
              <text className="fill-primary font-display text-base font-black" textAnchor="middle" x={x} y={y + 5}>
                {t(`layers.items.${layer.key}.number`)}
              </text>
            </g>
          )
        })}
      </svg>
      <ol className="mt-6 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        {layers.map((layer) => (
          <li className="flex gap-3" key={layer.key}>
            <span className="font-display w-8 shrink-0 font-black text-primary">
              {t(`layers.items.${layer.key}.number`)}
            </span>
            <span className="text-foreground">{t(`layers.items.${layer.key}.name`)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
