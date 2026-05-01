import { useEffect, useRef, useState } from "react"
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

// Sample audit checks per layer. These are the visible signal of expertise —
// the depth that makes "we look at the 8 layers" feel real. If V5 ships,
// move these to i18n.
const auditChecks: Record<string, string[]> = {
  network: [
    "WiFi access point coverage + density vs. desk count",
    "VLAN segmentation between members, staff, and admin",
    "ISP redundancy and automatic failover",
    "Switch / cable plant condition and labelling",
  ],
  access: [
    "Door reader response time and offline behaviour",
    "Mobile credential support and revocation",
    "Visitor and contractor onboarding flow",
    "Anti-tailgate and shared-credential exposure",
  ],
  platform: [
    "Member onboarding automation end-to-end",
    "Billing accuracy and dispute workflow",
    "Booking conflict prevention and overrides",
    "Reporting depth and data export controls",
  ],
  meeting: [
    "Display + camera + microphone quality",
    "One-tap booking and meeting start",
    "Calendar sync across Google / 365 / Apple",
    "Soundproofing and wall-shared microphones",
  ],
  security: [
    "Camera coverage of all public zones and exits",
    "Recording retention policy vs. local law",
    "Footage retrieval workflow and audit trail",
    "GDPR / privacy compliance posture",
  ],
  telephony: [
    "VoIP call quality, routing, and call paths",
    "Reception phone / intercom integration",
    "After-hours and overflow coverage",
    "Emergency announcement and PA reach",
  ],
  integrations: [
    "Platform ↔ accounting sync (Xero / QuickBooks / etc.)",
    "Single sign-on and identity provider",
    "API rate limits and breakage points",
    "Manual handoffs that should be automated",
  ],
  devices: [
    "Staff laptop provisioning and recovery",
    "Member-facing kiosks and reliability",
    "Printer access, quotas, and credentials",
    "Software update and patch policy",
  ],
}

const layerRoomLabels: Record<string, string> = {
  network: "IT CLOSET",
  access: "FRONT DOOR",
  platform: "RECEPTION",
  meeting: "MEETING ROOM",
  security: "LOBBY",
  telephony: "PHONE BOOTHS",
  integrations: "KITCHEN / LOUNGE",
  devices: "OPEN COWORKING",
}

export function V5Topology() {
  const { t } = useTranslation()
  const [activeLayer, setActiveLayer] = useState<string | null>(null)
  const [entered, setEntered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = globalThis.setTimeout(() => setEntered(true), 0)
      return () => globalThis.clearTimeout(fallbackTimer)
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "-50px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const activeLayerData = activeLayer ? layers.find((l) => l.key === activeLayer) : null

  return (
    <div className="mx-auto mt-10 max-w-5xl" ref={containerRef}>
      <style>{`
        @keyframes v5-wifi-ping {
          0% { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes v5-cctv-sweep {
          0%, 100% { transform: rotate(-22deg); }
          50% { transform: rotate(22deg); }
        }
        @keyframes v5-rack-led {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        @keyframes v5-reader-pulse {
          0% { transform: scale(0.6); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes v5-display-glow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.8; }
        }
        @keyframes v5-stroke-draw {
          to { stroke-dashoffset: 0; }
        }
        .v5-ap-ring-1 { transform-origin: 315px 70px; animation: v5-wifi-ping 2.6s ease-out infinite; }
        .v5-ap-ring-2 { transform-origin: 315px 70px; animation: v5-wifi-ping 2.6s ease-out 0.9s infinite; }
        .v5-ap-ring-3 { transform-origin: 315px 70px; animation: v5-wifi-ping 2.6s ease-out 1.7s infinite; }
        .v5-cctv-cone { transform-origin: 100px 340px; animation: v5-cctv-sweep 5.2s ease-in-out infinite; }
        .v5-rack-led-a { animation: v5-rack-led 1.4s ease-in-out infinite; }
        .v5-rack-led-b { animation: v5-rack-led 1.4s ease-in-out 0.35s infinite; }
        .v5-rack-led-c { animation: v5-rack-led 1.4s ease-in-out 0.7s infinite; }
        .v5-reader-pulse-1 { transform-origin: 40px 290px; animation: v5-reader-pulse 2.4s ease-out infinite; }
        .v5-reader-pulse-2 { transform-origin: 40px 290px; animation: v5-reader-pulse 2.4s ease-out 1.2s infinite; }
        .v5-display-glow { animation: v5-display-glow 3s ease-in-out infinite; }
        .v5-wall-entrance {
          stroke-dasharray: 1500;
          stroke-dashoffset: 1500;
        }
        .v5-wall-entrance.v5-entered {
          animation: v5-stroke-draw 1.2s ease-out forwards;
        }
        .v5-node-entrance {
          opacity: 0;
          transform: scale(0.6);
          transform-origin: center;
          transform-box: fill-box;
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .v5-node-entrance.v5-entered {
          opacity: 1;
          transform: scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .v5-ap-ring-1, .v5-ap-ring-2, .v5-ap-ring-3,
          .v5-cctv-cone, .v5-rack-led-a, .v5-rack-led-b, .v5-rack-led-c,
          .v5-reader-pulse-1, .v5-reader-pulse-2, .v5-display-glow {
            animation: none;
          }
          .v5-wall-entrance {
            stroke-dashoffset: 0 !important;
            animation: none !important;
          }
          .v5-node-entrance {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-start">
        <div className="rounded-2xl border border-border bg-background/40 p-3 sm:p-5">
          <svg
            className="w-full text-foreground"
            viewBox="0 0 800 500"
            xmlns="http://www.w3.org/2000/svg"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveLayer(null)
            }}
          >
            {/* drawing-sheet header */}
            <g className="font-mono fill-foreground" opacity={0.5}>
              <text x={40} y={28} fontSize={10} style={{ letterSpacing: "0.25em" }}>
                FLOOR PLAN — TYPICAL COWORKING (SCHEMATIC)
              </text>
              <text
                x={760}
                y={28}
                textAnchor="end"
                fontSize={10}
                style={{ letterSpacing: "0.25em" }}
              >
                LIVE / INTERACTIVE
              </text>
            </g>

            {/* outer wall — animated draw-in */}
            <rect
              className={`fill-card v5-wall-entrance ${entered ? "v5-entered" : ""}`}
              fillOpacity={0.35}
              x={40}
              y={40}
              width={720}
              height={420}
              stroke="currentColor"
              strokeOpacity={0.55}
              strokeWidth={2.5}
            />

            {/* interior wall divisions */}
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

            {/* doors */}
            <g stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.4} fill="none" className="text-primary">
              <path d="M 40 290 L 40 270" />
              <path d="M 40 270 A 28 28 0 0 1 68 298" />
            </g>
            <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} fill="none">
              <path d="M 170 130 L 170 100" />
              <path d="M 170 100 A 25 25 0 0 1 195 125" />
              <path d="M 170 380 L 170 360" />
              <path d="M 170 360 A 22 22 0 0 1 192 382" />
              <path d="M 460 90 L 460 65" />
              <path d="M 460 65 A 22 22 0 0 1 482 87" />
              <path d="M 535 200 L 510 200" />
              <path d="M 510 200 A 22 22 0 0 1 532 222" />
              <path d="M 685 200 L 660 200" />
              <path d="M 660 200 A 22 22 0 0 1 682 222" />
              <path d="M 695 360 L 670 360" />
              <path d="M 670 360 A 22 22 0 0 1 692 382" />
            </g>

            {/* coworking hot-desks */}
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

            {/* meeting room */}
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
            {/* meeting display — pulsing */}
            <rect
              x={580}
              y={50}
              width={60}
              height={4}
              fill="currentColor"
              className="text-primary v5-display-glow"
            />

            {/* kitchen */}
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
            <g stroke="currentColor" strokeOpacity={0.22} strokeWidth={1} fill="none">
              <rect x={185} y={300} width={28} height={20} rx={1} />
              <rect x={215} y={300} width={28} height={20} rx={1} />
              <rect x={245} y={300} width={28} height={20} rx={1} />
            </g>
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

            {/* offices */}
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

            {/* booths */}
            <circle cx={505} cy={410} r={8} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <rect x={490} y={430} width={30} height={4} fill="currentColor" fillOpacity={0.18} />
            <circle cx={595} cy={410} r={8} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <rect x={580} y={430} width={30} height={4} fill="currentColor" fillOpacity={0.18} />

            {/* IT closet — server rack with blinking LEDs */}
            <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} fill="none">
              <rect x={655} y={395} width={30} height={50} rx={1} />
              {[0, 1, 2, 3, 4].map((j) => (
                <line
                  key={`rack-${j}`}
                  x1={655}
                  x2={685}
                  y1={403 + j * 9}
                  y2={403 + j * 9}
                />
              ))}
            </g>
            <circle cx={680} cy={401} r={1.5} className="text-primary v5-rack-led-a" fill="currentColor" />
            <circle cx={680} cy={419} r={1.5} className="text-primary v5-rack-led-b" fill="currentColor" />
            <circle cx={680} cy={437} r={1.5} className="text-primary v5-rack-led-c" fill="currentColor" />

            {/* reception desk */}
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

            {/* lobby seating */}
            <circle cx={75} cy={400} r={11} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <circle cx={125} cy={400} r={11} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <rect x={70} y={425} width={70} height={5} fill="currentColor" fillOpacity={0.18} />

            {/* CCTV camera with sweeping cone */}
            <g className="text-primary">
              <g
                className="v5-cctv-cone"
                stroke="currentColor"
                strokeOpacity={0.45}
                strokeWidth={0.8}
                fill="currentColor"
                fillOpacity={0.06}
              >
                <path d="M 100 340 L 60 380 L 145 380 Z" strokeDasharray="2 4" />
              </g>
              <circle cx={100} cy={340} r={3} fill="currentColor" fillOpacity={0.6} />
            </g>

            {/* WiFi access point with three pulsing rings */}
            <g className="text-primary">
              <circle cx={315} cy={70} r={4} fill="currentColor" fillOpacity={0.55} />
              <circle
                cx={315}
                cy={70}
                r={12}
                className="v5-ap-ring-1"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.45}
                strokeWidth={1.2}
              />
              <circle
                cx={315}
                cy={70}
                r={12}
                className="v5-ap-ring-2"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.35}
                strokeWidth={1}
              />
              <circle
                cx={315}
                cy={70}
                r={12}
                className="v5-ap-ring-3"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.25}
                strokeWidth={1}
              />
            </g>

            {/* Door reader pulse near entrance */}
            <g className="text-primary">
              <rect x={36} y={285} width={4} height={10} fill="currentColor" fillOpacity={0.55} />
              <circle
                cx={40}
                cy={290}
                r={10}
                className="v5-reader-pulse-1"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.6}
                strokeWidth={1.2}
              />
              <circle
                cx={40}
                cy={290}
                r={10}
                className="v5-reader-pulse-2"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.4}
                strokeWidth={1}
              />
            </g>

            {/* room labels */}
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
              <path
                d="M 0 -10 L 4 4 L 0 1 L -4 4 Z"
                fill="currentColor"
                fillOpacity={0.55}
                className="text-primary"
              />
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
            <g
              transform="translate(40, 480)"
              className="font-mono fill-foreground"
              opacity={0.5}
            >
              <line x1={0} x2={80} y1={0} y2={0} stroke="currentColor" strokeWidth={1} />
              <line x1={0} x2={0} y1={-3} y2={3} stroke="currentColor" strokeWidth={1} />
              <line x1={40} x2={40} y1={-2} y2={2} stroke="currentColor" strokeWidth={1} />
              <line x1={80} x2={80} y1={-3} y2={3} stroke="currentColor" strokeWidth={1} />
              <text x={40} y={14} textAnchor="middle" fontSize={9} style={{ letterSpacing: "0.2em" }}>
                5 M
              </text>
            </g>

            {/* layer nodes — interactive */}
            {layers.map((layer, i) => {
              const p = nodePositions[i]
              const isActive = activeLayer === layer.key
              const isInactive = activeLayer !== null && activeLayer !== layer.key
              return (
                <g
                  key={layer.key}
                  className={`v5-node-entrance ${entered ? "v5-entered" : ""} cursor-pointer transition-opacity duration-300`}
                  style={{
                    opacity: isInactive ? 0.35 : 1,
                    transitionDelay: entered ? `${1100 + i * 90}ms` : "0ms",
                  }}
                  onClick={() => setActiveLayer(activeLayer === layer.key ? null : layer.key)}
                  onMouseEnter={() => setActiveLayer(layer.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setActiveLayer(activeLayer === layer.key ? null : layer.key)
                    }
                  }}
                  aria-label={`Layer ${t(`layers.items.${layer.key}.number`)} — ${t(`layers.items.${layer.key}.name`)}`}
                >
                  {isActive && (
                    <>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={32}
                        fill="none"
                        stroke="currentColor"
                        className="text-primary"
                        strokeWidth={1.5}
                        opacity={0.5}
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={26}
                        fill="none"
                        stroke="currentColor"
                        className="text-primary"
                        strokeWidth={1}
                        opacity={0.3}
                      />
                    </>
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 22 : 16}
                    className={isActive ? "fill-primary" : "fill-background"}
                    stroke="currentColor"
                    strokeOpacity={0.85}
                    strokeWidth={2}
                    style={{ transition: "r 0.3s ease, fill 0.3s ease" }}
                  />
                  <text
                    x={p.x}
                    y={p.y + (isActive ? 5 : 4)}
                    textAnchor="middle"
                    className={`font-display font-black ${isActive ? "fill-primary-foreground" : "fill-primary"}`}
                    fontSize={isActive ? 13 : 11}
                    style={{ transition: "font-size 0.3s ease" }}
                  >
                    {t(`layers.items.${layer.key}.number`)}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Side panel */}
        <aside
          aria-live="polite"
          className="rounded-2xl border border-border bg-background/60 p-6 lg:sticky lg:top-24"
        >
          {activeLayerData ? (
            <div>
              <div className="mb-5 aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-card/30 p-4">
                <img
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain mix-blend-multiply transition-opacity duration-300 dark:mix-blend-lighten"
                  key={activeLayerData.key}
                  src={`/diagram-illustrations/${activeLayerData.key}.png`}
                />
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-5xl font-black tracking-[-0.04em] text-primary">
                  {t(`layers.items.${activeLayerData.key}.number`)}
                </span>
                <button
                  aria-label="Clear selection"
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground"
                  onClick={() => setActiveLayer(null)}
                  type="button"
                >
                  CLEAR
                </button>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                {t(`layers.items.${activeLayerData.key}.name`)}
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                LIVES IN / {layerRoomLabels[activeLayerData.key]}
              </p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                {t(`layers.items.${activeLayerData.key}.description`)}
              </p>
              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                WHAT WE AUDIT
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground">
                {auditChecks[activeLayerData.key]?.map((check, i) => (
                  <li className="flex gap-3" key={i}>
                    <span className="font-mono text-[10px] text-primary mt-2">▸</span>
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                INSTRUCTIONS
              </p>
              <p className="mt-4 font-display text-xl font-bold leading-tight text-foreground">
                Hover or tap any number on the floor plan.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Each one points to a real piece of the technology stack. We
                audit all eight — what you see and what runs underneath.
              </p>
              <ul className="mt-7 space-y-2 text-xs">
                <li className="flex gap-2 text-muted-foreground">
                  <span className="font-mono text-primary">●</span>
                  <span>WiFi access point pinging in coworking</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <span className="font-mono text-primary">●</span>
                  <span>CCTV camera sweeping the lobby</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <span className="font-mono text-primary">●</span>
                  <span>Door reader pulsing at the entrance</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <span className="font-mono text-primary">●</span>
                  <span>Server rack LEDs blinking in IT closet</span>
                </li>
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Legend below */}
      <ol className="mt-8 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        {layers.map((layer) => {
          const isActive = activeLayer === layer.key
          return (
            <li
              className={`flex cursor-pointer gap-3 rounded-lg px-2 py-1 transition ${isActive ? "bg-primary/10" : "hover:bg-primary/5"}`}
              key={layer.key}
              onClick={() => setActiveLayer(activeLayer === layer.key ? null : layer.key)}
              onMouseEnter={() => setActiveLayer(layer.key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setActiveLayer(activeLayer === layer.key ? null : layer.key)
                }
              }}
            >
              <span className="font-display w-8 shrink-0 font-black text-primary">
                {t(`layers.items.${layer.key}.number`)}
              </span>
              <span className="text-foreground">{t(`layers.items.${layer.key}.name`)}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
