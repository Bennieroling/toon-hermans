import { useTranslation } from "react-i18next"

import { layers } from "@/lib/utils"

interface Room {
  x: number
  y: number
  w: number
  h: number
  label: string
}

const rooms: Room[] = [
  { x: 40, y: 40, w: 130, h: 280, label: "RECEPTION" },
  { x: 40, y: 320, w: 130, h: 140, label: "LOBBY" },
  { x: 170, y: 40, w: 290, h: 240, label: "OPEN COWORKING" },
  { x: 170, y: 280, w: 290, h: 180, label: "KITCHEN  /  LOUNGE" },
  { x: 460, y: 40, w: 300, h: 160, label: "MEETING ROOM" },
  { x: 460, y: 200, w: 150, h: 160, label: "PRIVATE OFFICE" },
  { x: 610, y: 200, w: 150, h: 160, label: "PRIVATE OFFICE" },
  { x: 460, y: 360, w: 90, h: 100, label: "BOOTH" },
  { x: 550, y: 360, w: 90, h: 100, label: "BOOTH" },
  { x: 640, y: 360, w: 120, h: 100, label: "IT  CLOSET" },
]

const nodePositions: { x: number; y: number }[] = [
  { x: 700, y: 415 }, // 01 Network → IT closet
  { x: 40, y: 290 }, // 02 Access control → front door
  { x: 105, y: 130 }, // 03 Platform → reception desk
  { x: 610, y: 120 }, // 04 Meeting room
  { x: 105, y: 380 }, // 05 Security/CCTV → lobby
  { x: 595, y: 410 }, // 06 Telephony → phone booths
  { x: 315, y: 380 }, // 07 Integrations → kitchen wall
  { x: 315, y: 145 }, // 08 IT/devices → coworking desks
]

export function V5Topology() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <svg
        className="w-full text-foreground"
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* drawing-sheet header (architectural drawing convention) */}
        <g className="font-mono fill-foreground" opacity={0.5}>
          <text x={40} y={28} className="text-[10px]" style={{ letterSpacing: "0.25em" }}>
            FLOOR PLAN — TYPICAL COWORKING (SCHEMATIC)
          </text>
          <text x={760} y={28} textAnchor="end" className="text-[10px]" style={{ letterSpacing: "0.25em" }}>
            SHEET 01 / 01
          </text>
        </g>

        {/* outer wall */}
        <rect
          className="fill-card"
          fillOpacity={0.35}
          x={40}
          y={40}
          width={720}
          height={420}
          stroke="currentColor"
          strokeOpacity={0.55}
          strokeWidth={2.5}
        />

        {/* interior wall divisions (drawn from rooms but stroked thin) */}
        {rooms.map((r, i) => (
          <rect
            key={`room-${i}`}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.32}
            strokeWidth={1.2}
          />
        ))}

        {/* door arcs at key openings */}
        {/* main entrance into reception (left wall) */}
        <g stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.4} fill="none" className="text-primary">
          <path d="M 40 290 L 40 270" />
          <path d="M 40 270 A 28 28 0 0 1 68 298" />
          <path d="M 68 298 L 40 290" strokeOpacity={0} />
        </g>
        {/* reception → coworking (interior wall x=170) */}
        <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} fill="none">
          <path d="M 170 130 L 170 100" />
          <path d="M 170 100 A 25 25 0 0 1 195 125" />
        </g>
        {/* lobby → kitchen */}
        <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} fill="none">
          <path d="M 170 380 L 170 360" />
          <path d="M 170 360 A 22 22 0 0 1 192 382" />
        </g>
        {/* coworking → meeting room */}
        <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} fill="none">
          <path d="M 460 90 L 460 65" />
          <path d="M 460 65 A 22 22 0 0 1 482 87" />
        </g>
        {/* office A door */}
        <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} fill="none">
          <path d="M 535 200 L 510 200" />
          <path d="M 510 200 A 22 22 0 0 1 532 222" />
        </g>
        {/* office B door */}
        <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} fill="none">
          <path d="M 685 200 L 660 200" />
          <path d="M 660 200 A 22 22 0 0 1 682 222" />
        </g>
        {/* IT closet door */}
        <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} fill="none">
          <path d="M 695 360 L 670 360" />
          <path d="M 670 360 A 22 22 0 0 1 692 382" />
        </g>

        {/* coworking hot-desks (3 rows × 4 desks) */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`desk-${row}-${col}`}
              x={185 + col * 65}
              y={170 + row * 35}
              width={50}
              height={22}
              rx={2}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.22}
              strokeWidth={1}
            />
          )),
        )}

        {/* meeting room table (oval) */}
        <ellipse
          cx={610}
          cy={120}
          rx={100}
          ry={32}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.3}
          strokeWidth={1.2}
        />
        {/* meeting chairs (dots around table) */}
        {[
          [510, 120],
          [710, 120],
          [560, 80],
          [610, 70],
          [660, 80],
          [560, 160],
          [610, 170],
          [660, 160],
        ].map(([cx, cy], i) => (
          <circle
            key={`chair-${i}`}
            cx={cx}
            cy={cy}
            r={6}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.22}
            strokeWidth={1}
          />
        ))}
        {/* meeting room display */}
        <rect
          x={580}
          y={50}
          width={60}
          height={4}
          fill="currentColor"
          fillOpacity={0.45}
          className="text-primary"
        />

        {/* kitchen island */}
        <rect
          x={245}
          y={355}
          width={140}
          height={45}
          rx={4}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.3}
          strokeWidth={1.2}
        />
        {/* kitchen appliances row */}
        <g stroke="currentColor" strokeOpacity={0.22} strokeWidth={1} fill="none">
          <rect x={185} y={300} width={28} height={20} rx={1} />
          <rect x={215} y={300} width={28} height={20} rx={1} />
          <rect x={245} y={300} width={28} height={20} rx={1} />
        </g>
        {/* kitchen seating */}
        {[200, 245, 290, 335, 380, 425].map((cx, i) => (
          <circle
            key={`seat-${i}`}
            cx={cx}
            cy={420}
            r={6}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        ))}

        {/* office A desk + chair */}
        <rect
          x={485}
          y={300}
          width={100}
          height={26}
          rx={2}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={1}
        />
        <circle cx={535} cy={340} r={6} fill="none" stroke="currentColor" strokeOpacity={0.25} />

        {/* office B desk + chair */}
        <rect
          x={635}
          y={300}
          width={100}
          height={26}
          rx={2}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={1}
        />
        <circle cx={685} cy={340} r={6} fill="none" stroke="currentColor" strokeOpacity={0.25} />

        {/* booths — small chair + side table */}
        <circle cx={505} cy={410} r={8} fill="none" stroke="currentColor" strokeOpacity={0.25} />
        <rect x={490} y={430} width={30} height={4} fill="currentColor" fillOpacity={0.18} />
        <circle cx={595} cy={410} r={8} fill="none" stroke="currentColor" strokeOpacity={0.25} />
        <rect x={580} y={430} width={30} height={4} fill="currentColor" fillOpacity={0.18} />

        {/* IT closet — server rack hint */}
        <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} fill="none">
          <rect x={655} y={395} width={30} height={50} rx={1} />
          {[0, 1, 2, 3, 4].map((j) => (
            <line key={`rack-${j}`} x1={655} x2={685} y1={403 + j * 9} y2={403 + j * 9} />
          ))}
        </g>

        {/* reception desk (curved) */}
        <path
          d="M 50 100 Q 105 80 160 100"
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={1.4}
        />
        <rect
          x={50}
          y={100}
          width={110}
          height={16}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.3}
          strokeWidth={1}
        />
        {/* lobby seating cluster */}
        <circle cx={75} cy={400} r={11} fill="none" stroke="currentColor" strokeOpacity={0.25} />
        <circle cx={125} cy={400} r={11} fill="none" stroke="currentColor" strokeOpacity={0.25} />
        <rect
          x={70}
          y={425}
          width={70}
          height={5}
          fill="currentColor"
          fillOpacity={0.18}
        />

        {/* CCTV camera triangle of view in lobby */}
        <g className="text-primary" stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.8} fill="none">
          <path d="M 100 340 L 60 380 L 145 380 Z" strokeDasharray="2 4" />
          <circle cx={100} cy={340} r={3} fill="currentColor" fillOpacity={0.5} stroke="none" />
        </g>

        {/* WiFi access point pings (over coworking) */}
        <g className="text-primary" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8} fill="none">
          <circle cx={315} cy={70} r={4} fill="currentColor" fillOpacity={0.4} stroke="none" />
          <circle cx={315} cy={70} r={12} strokeDasharray="2 3" />
          <circle cx={315} cy={70} r={22} strokeDasharray="2 3" opacity={0.6} />
        </g>

        {/* room labels (architectural convention: small uppercase, mono, centered) */}
        {rooms.map((r, i) => (
          <text
            key={`label-${i}`}
            x={r.x + r.w / 2}
            y={r.y + 18}
            textAnchor="middle"
            className="font-mono fill-foreground"
            fontSize={r.w > 120 ? 11 : 9}
            opacity={0.55}
            style={{ letterSpacing: r.w > 120 ? "0.25em" : "0.18em" }}
          >
            {r.label}
          </text>
        ))}

        {/* north arrow */}
        <g transform="translate(750, 70)">
          <circle r={14} fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} />
          <path d="M 0 -10 L 4 4 L 0 1 L -4 4 Z" fill="currentColor" fillOpacity={0.55} className="text-primary" />
          <text
            textAnchor="middle"
            y={-16}
            className="font-mono fill-foreground"
            fontSize={9}
            opacity={0.55}
            style={{ letterSpacing: "0.2em" }}
          >
            N
          </text>
        </g>

        {/* scale bar */}
        <g transform="translate(40, 480)" className="font-mono fill-foreground" opacity={0.5}>
          <line
            x1={0}
            x2={80}
            y1={0}
            y2={0}
            stroke="currentColor"
            strokeWidth={1}
          />
          <line x1={0} x2={0} y1={-3} y2={3} stroke="currentColor" strokeWidth={1} />
          <line x1={40} x2={40} y1={-2} y2={2} stroke="currentColor" strokeWidth={1} />
          <line x1={80} x2={80} y1={-3} y2={3} stroke="currentColor" strokeWidth={1} />
          <text x={40} y={14} textAnchor="middle" fontSize={9} style={{ letterSpacing: "0.2em" }}>
            5 M
          </text>
        </g>

        {/* layer nodes — drawn last so they sit on top */}
        {layers.map((layer, i) => {
          const p = nodePositions[i]
          return (
            <g key={layer.key}>
              <circle
                cx={p.x}
                cy={p.y}
                r={16}
                className="fill-background"
                stroke="currentColor"
                strokeOpacity={0.85}
                strokeWidth={2}
              />
              <text
                x={p.x}
                y={p.y + 4}
                textAnchor="middle"
                className="fill-primary font-display text-[11px] font-black"
              >
                {t(`layers.items.${layer.key}.number`)}
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
