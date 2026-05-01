import { useTranslation } from "react-i18next"

import { layers } from "@/lib/utils"

const positions: { x: number; y: number; label: string }[] = [
  { x: 100, y: 80, label: "Network closet" },
  { x: 300, y: 50, label: "Front door" },
  { x: 500, y: 80, label: "Back office" },
  { x: 200, y: 220, label: "Meeting room" },
  { x: 400, y: 220, label: "CCTV view" },
  { x: 100, y: 360, label: "Reception" },
  { x: 300, y: 390, label: "Server / API" },
  { x: 500, y: 360, label: "Staff devices" },
]

export function V5Topology() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <svg className="w-full text-foreground" viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg">
        <rect fill="none" height={400} rx={6} stroke="currentColor" strokeOpacity={0.4} strokeWidth={1.5} width={560} x={20} y={20} />
        <line stroke="currentColor" strokeDasharray="3 6" strokeOpacity={0.15} x1={20} x2={580} y1={150} y2={150} />
        <line stroke="currentColor" strokeDasharray="3 6" strokeOpacity={0.15} x1={20} x2={580} y1={290} y2={290} />
        <line stroke="currentColor" strokeDasharray="3 6" strokeOpacity={0.15} x1={210} x2={210} y1={20} y2={420} />
        <line stroke="currentColor" strokeDasharray="3 6" strokeOpacity={0.15} x1={400} x2={400} y1={20} y2={420} />
        {layers.map((layer, i) => {
          const next = positions[(i + 1) % positions.length]
          const here = positions[i]
          return (
            <line
              key={`line-${layer.key}`}
              stroke="currentColor"
              strokeOpacity={0.12}
              strokeWidth={1}
              x1={here.x}
              x2={next.x}
              y1={here.y}
              y2={next.y}
            />
          )
        })}
        {layers.map((layer, i) => {
          const p = positions[i]
          return (
            <g key={layer.key}>
              <circle cx={p.x} cy={p.y} r={22} className="fill-background" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.5} />
              <text className="fill-primary font-display text-xs font-black" textAnchor="middle" x={p.x} y={p.y + 4}>
                {t(`layers.items.${layer.key}.number`)}
              </text>
              <text className="fill-foreground text-[10px] font-medium" textAnchor="middle" x={p.x} y={p.y + 42}>
                {p.label}
              </text>
            </g>
          )
        })}
      </svg>
      <ol className="mt-8 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
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
