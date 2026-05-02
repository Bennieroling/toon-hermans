import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { layerScenes, SceneStyles } from "@/components/diagrams/scenes/LayerScenes"
import { layers } from "@/lib/utils"

interface Room {
  x: number
  y: number
  w: number
  h: number
  label: string
}

const rooms: Room[] = [
  { x: 40, y: 40, w: 130, h: 340, label: "RECEPTION" },
  { x: 40, y: 380, w: 130, h: 200, label: "LOBBY" },
  { x: 170, y: 40, w: 290, h: 310, label: "OPEN COWORKING" },
  { x: 170, y: 350, w: 290, h: 230, label: "KITCHEN  /  LOUNGE" },
  { x: 460, y: 40, w: 300, h: 200, label: "MEETING ROOM" },
  { x: 460, y: 240, w: 150, h: 200, label: "PRIVATE OFFICE" },
  { x: 610, y: 240, w: 150, h: 200, label: "PRIVATE OFFICE" },
  { x: 460, y: 440, w: 90, h: 140, label: "BOOTH" },
  { x: 550, y: 440, w: 90, h: 140, label: "BOOTH" },
  { x: 640, y: 440, w: 120, h: 140, label: "IT  CLOSET" },
]

const nodePositions: { x: number; y: number }[] = [
  { x: 700, y: 510 }, // 01 Network → IT closet
  { x: 40, y: 320 }, // 02 Access control → front door
  { x: 105, y: 130 }, // 03 Platform → reception desk
  { x: 610, y: 140 }, // 04 Meeting room
  { x: 105, y: 480 }, // 05 Security/CCTV → lobby
  { x: 595, y: 510 }, // 06 Telephony → phone booths
  { x: 315, y: 470 }, // 07 Integrations → kitchen
  { x: 315, y: 165 }, // 08 IT/devices → coworking desks
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
    <div className="mx-auto mt-10 max-w-7xl" ref={containerRef}>
      <SceneStyles />
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

      <div className="rounded-2xl border border-border bg-background/40 p-3 sm:p-5">
        <svg
          className="w-full text-foreground"
          viewBox="0 0 800 620"
          xmlns="http://www.w3.org/2000/svg"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveLayer(null)
          }}
        >
            {/* drawing-sheet header */}
            <g className="font-mono fill-foreground" opacity={0.5}>
              <text x={40} y={28} fontSize={13} style={{ letterSpacing: "0.25em" }}>
                FLOOR PLAN — TYPICAL COWORKING (SCHEMATIC)
              </text>
              <text
                x={760}
                y={28}
                textAnchor="end"
                fontSize={13}
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
              height={540}
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
              <path d="M 40 320 L 40 300" />
              <path d="M 40 300 A 28 28 0 0 1 68 328" />
            </g>
            <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} fill="none">
              <path d="M 170 130 L 170 100" />
              <path d="M 170 100 A 25 25 0 0 1 195 125" />
              <path d="M 170 440 L 170 420" />
              <path d="M 170 420 A 22 22 0 0 1 192 442" />
              <path d="M 460 90 L 460 65" />
              <path d="M 460 65 A 22 22 0 0 1 482 87" />
              <path d="M 535 240 L 510 240" />
              <path d="M 510 240 A 22 22 0 0 1 532 262" />
              <path d="M 685 240 L 660 240" />
              <path d="M 660 240 A 22 22 0 0 1 682 262" />
              <path d="M 695 440 L 670 440" />
              <path d="M 670 440 A 22 22 0 0 1 692 462" />
            </g>

            {/* coworking hot-desks */}
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`desk-${row}-${col}`}
                  x={185 + col * 65}
                  y={195 + row * 50}
                  width={50}
                  height={28}
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
              cy={140}
              rx={100}
              ry={36}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1.2}
            />
            {[
              [510, 140],
              [710, 140],
              [560, 100],
              [610, 90],
              [660, 100],
              [560, 180],
              [610, 190],
              [660, 180],
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
              y={445}
              width={140}
              height={50}
              rx={4}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1.2}
            />
            <g stroke="currentColor" strokeOpacity={0.22} strokeWidth={1} fill="none">
              <rect x={185} y={370} width={28} height={22} rx={1} />
              <rect x={215} y={370} width={28} height={22} rx={1} />
              <rect x={245} y={370} width={28} height={22} rx={1} />
            </g>
            {[200, 245, 290, 335, 380, 425].map((cx, i) => (
              <circle
                key={`seat-${i}`}
                cx={cx}
                cy={540}
                r={7}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.2}
                strokeWidth={1}
              />
            ))}

            {/* offices */}
            <rect
              x={485}
              y={290}
              width={100}
              height={30}
              rx={2}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.25}
              strokeWidth={1}
            />
            <circle cx={535} cy={355} r={7} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <rect
              x={635}
              y={290}
              width={100}
              height={30}
              rx={2}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.25}
              strokeWidth={1}
            />
            <circle cx={685} cy={355} r={7} fill="none" stroke="currentColor" strokeOpacity={0.25} />

            {/* booths */}
            <circle cx={505} cy={510} r={9} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <rect x={490} y={540} width={30} height={5} fill="currentColor" fillOpacity={0.18} />
            <circle cx={595} cy={510} r={9} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <rect x={580} y={540} width={30} height={5} fill="currentColor" fillOpacity={0.18} />

            {/* IT closet — server rack with blinking LEDs */}
            <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} fill="none">
              <rect x={655} y={485} width={30} height={70} rx={1} />
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <line
                  key={`rack-${j}`}
                  x1={655}
                  x2={685}
                  y1={495 + j * 11}
                  y2={495 + j * 11}
                />
              ))}
            </g>
            <circle cx={680} cy={493} r={1.8} className="text-primary v5-rack-led-a" fill="currentColor" />
            <circle cx={680} cy={515} r={1.8} className="text-primary v5-rack-led-b" fill="currentColor" />
            <circle cx={680} cy={537} r={1.8} className="text-primary v5-rack-led-c" fill="currentColor" />

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
            <circle cx={75} cy={490} r={13} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <circle cx={125} cy={490} r={13} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <rect x={70} y={520} width={70} height={6} fill="currentColor" fillOpacity={0.18} />

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
                <path d="M 100 410 L 60 460 L 145 460 Z" strokeDasharray="2 4" />
              </g>
              <circle cx={100} cy={410} r={3.5} fill="currentColor" fillOpacity={0.6} />
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
              <rect x={36} y={315} width={4} height={10} fill="currentColor" fillOpacity={0.55} />
              <circle
                cx={40}
                cy={320}
                r={10}
                className="v5-reader-pulse-1"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.6}
                strokeWidth={1.2}
              />
              <circle
                cx={40}
                cy={320}
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
                y={r.y + 22}
                textAnchor="middle"
                className="font-mono fill-foreground"
                fontSize={r.w > 120 ? 14 : 11}
                opacity={0.55}
                style={{ letterSpacing: r.w > 120 ? "0.25em" : "0.18em" }}
              >
                {r.label}
              </text>
            ))}

            {/* north arrow */}
            <g transform="translate(745, 72)">
              <circle r={18} fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} />
              <path
                d="M 0 -13 L 5 5 L 0 1 L -5 5 Z"
                fill="currentColor"
                fillOpacity={0.55}
                className="text-primary"
              />
              <text
                textAnchor="middle"
                y={-22}
                className="font-mono fill-foreground"
                fontSize={12}
                opacity={0.55}
                style={{ letterSpacing: "0.2em" }}
              >
                N
              </text>
            </g>

            {/* scale bar */}
            <g
              transform="translate(40, 600)"
              className="font-mono fill-foreground"
              opacity={0.5}
            >
              <line x1={0} x2={100} y1={0} y2={0} stroke="currentColor" strokeWidth={1} />
              <line x1={0} x2={0} y1={-4} y2={4} stroke="currentColor" strokeWidth={1} />
              <line x1={50} x2={50} y1={-3} y2={3} stroke="currentColor" strokeWidth={1} />
              <line x1={100} x2={100} y1={-4} y2={4} stroke="currentColor" strokeWidth={1} />
              <text x={50} y={16} textAnchor="middle" fontSize={11} style={{ letterSpacing: "0.2em" }}>
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
                        r={38}
                        fill="none"
                        stroke="currentColor"
                        className="text-primary"
                        strokeWidth={1.5}
                        opacity={0.5}
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={30}
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
                    r={isActive ? 26 : 19}
                    className={isActive ? "fill-primary" : "fill-background"}
                    stroke="currentColor"
                    strokeOpacity={0.85}
                    strokeWidth={2.2}
                    style={{ transition: "r 0.3s ease, fill 0.3s ease" }}
                  />
                  <text
                    x={p.x}
                    y={p.y + (isActive ? 6 : 5)}
                    textAnchor="middle"
                    className={`font-display font-black ${isActive ? "fill-primary-foreground" : "fill-primary"}`}
                    fontSize={isActive ? 17 : 14}
                    style={{ transition: "font-size 0.3s ease" }}
                  >
                    {t(`layers.items.${layer.key}.number`)}
                  </text>
                </g>
              )
            })}
        </svg>
      </div>

      {/* Detail strip — full-width below the floor plan when a layer is active */}
      <aside aria-live="polite" className="mt-6">
        {activeLayerData ? (
          <div className="rounded-2xl border border-border bg-background/60 p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
              {/* Animated scene */}
              <div className="lg:max-w-[280px]" key={activeLayerData.key}>
                {(() => {
                  const Scene = layerScenes[activeLayerData.key]
                  return Scene ? <Scene /> : null
                })()}
              </div>

              {/* Layer info column */}
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-5xl font-black leading-none tracking-[-0.04em] text-primary lg:text-6xl">
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
                <h3 className="mt-4 font-display text-xl font-bold text-foreground lg:text-2xl">
                  {t(`layers.items.${activeLayerData.key}.name`)}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  LIVES IN / {layerRoomLabels[activeLayerData.key]}
                </p>
                <p className="mt-5 text-sm leading-7 text-muted-foreground lg:text-base lg:leading-8">
                  {t(`layers.items.${activeLayerData.key}.description`)}
                </p>
              </div>

              {/* Audit checks column */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  WHAT WE AUDIT
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground">
                  {auditChecks[activeLayerData.key]?.map((check, i) => (
                    <li className="flex gap-3" key={i}>
                      <span className="font-mono text-[10px] text-primary mt-2">▸</span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/60 bg-background/30 px-6 py-4">
            <p className="text-center text-sm text-muted-foreground">
              <span className="font-mono mr-3 align-middle text-[11px] uppercase tracking-[0.3em] text-primary">
                INSTRUCTIONS
              </span>
              Hover or tap any number on the floor plan to see the layer in action and what we audit there.
            </p>
          </div>
        )}
      </aside>

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
