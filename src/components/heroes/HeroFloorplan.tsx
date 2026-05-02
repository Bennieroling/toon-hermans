import { useEffect, useRef, useState } from "react"

/**
 * HeroFloorplan — a hero-optimised schematic floor plan.
 *
 * Same drawing language as V5Topology (line-art, brand-blue accents,
 * mono labels, technical-drawing flourishes) but:
 *   - No numbered audit hotspots (no "01"–"08" circles)
 *   - No interactivity / detail panel
 *   - Pure visual: rooms, furniture, ambient tech overlays
 *
 * Props pick the level of motion:
 *   - default (D): ambient pulses only — WiFi, CCTV, door reader,
 *     server LEDs, meeting display
 *   - extraEvents (E2): adds fob taps on more doors, packets flying
 *     through coworking, phone ring in booth, dashboard counter
 *     ticking in reception, member dot moving through the corridor,
 *     printer briefly active
 *   - flyThrough (E1): viewBox animates between 5 framings, holding
 *     each ~3 s, then loops
 *   - parallax (E3): pointer-tracked spotlight + soft layer parallax
 */

interface HeroFloorplanProps {
  extraEvents?: boolean
  flyThrough?: boolean
  parallax?: boolean
  /** Option 1 — phase-gated narrative cycle (replaces extraEvents flavour). */
  narrativeCycle?: boolean
  /** Option 2 — vertical scan line sweeps L→R every 8s, lighting tech as it passes. */
  systemSweep?: boolean
  /** Option 3 — scrolling telemetry ticker + inline data badges next to tech points. */
  telemetryTicker?: boolean
  /** Option 4 — dashed connection lines between tech systems with packets traveling on them. */
  connectionWeb?: boolean
  /** Option 5 — periodic "issue detected → resolved" alert dramatism on a tech point. */
  alertDrama?: boolean
}

const techPoints: { id: string; x: number; y: number }[] = [
  { id: "ap", x: 315, y: 70 },        // WiFi access point
  { id: "cctv", x: 100, y: 410 },     // CCTV camera
  { id: "reader", x: 40, y: 320 },    // Door reader
  { id: "server", x: 670, y: 515 },   // Server rack center
  { id: "display", x: 610, y: 52 },   // Meeting display
  { id: "phone", x: 505, y: 510 },    // Phone in left booth
]

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

/* Five framings the camera fly-through cycles through (E1).
   Format: x y width height for the SVG viewBox. */
const flyThroughShots: [number, number, number, number][] = [
  [0, 0, 800, 620],         // wide overview
  [20, 240, 220, 200],      // zoom: front door + reception desk
  [160, 30, 320, 340],      // zoom: open coworking
  [430, 20, 360, 240],      // zoom: meeting room + display
  [620, 410, 180, 180],     // zoom: IT closet + server rack
]

export function HeroFloorplan({
  extraEvents = false,
  flyThrough = false,
  parallax = false,
  narrativeCycle = false,
  systemSweep = false,
  telemetryTicker = false,
  connectionWeb = false,
  alertDrama = false,
}: HeroFloorplanProps = {}) {
  const [shotIndex, setShotIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
  const [phase, setPhase] = useState(0)
  const [memberCount, setMemberCount] = useState(847)
  const [bandwidth, setBandwidth] = useState(84)
  const [alertTarget, setAlertTarget] = useState<{ id: string; status: "alert" | "resolved" } | null>(null)

  /* narrative cycle phase advance — Option 1 */
  useEffect(() => {
    if (!narrativeCycle) return
    const interval = window.setInterval(() => {
      setPhase((p) => (p + 1) % 5)
    }, 4000)
    return () => window.clearInterval(interval)
  }, [narrativeCycle])

  /* telemetry counter ticking — Option 3 */
  useEffect(() => {
    if (!telemetryTicker) return
    const interval = window.setInterval(() => {
      setMemberCount((c) => c + (Math.random() < 0.5 ? 1 : 0))
      setBandwidth((b) => Math.max(60, Math.min(120, b + (Math.random() < 0.5 ? 1 : -1) * Math.floor(Math.random() * 4))))
    }, 1500)
    return () => window.clearInterval(interval)
  }, [telemetryTicker])

  /* alert drama cycle — Option 5 */
  useEffect(() => {
    if (!alertDrama) return
    let timeout: number | undefined
    const tick = () => {
      const target = techPoints[Math.floor(Math.random() * techPoints.length)]!
      setAlertTarget({ id: target.id, status: "alert" })
      timeout = window.setTimeout(() => {
        setAlertTarget({ id: target.id, status: "resolved" })
        timeout = window.setTimeout(() => {
          setAlertTarget(null)
        }, 1500)
      }, 1500)
    }
    tick()
    const interval = window.setInterval(tick, 12000)
    return () => {
      window.clearInterval(interval)
      if (timeout) window.clearTimeout(timeout)
    }
  }, [alertDrama])

  /* fly-through cycle */
  useEffect(() => {
    if (!flyThrough) return
    const interval = window.setInterval(() => {
      setShotIndex((i) => (i + 1) % flyThroughShots.length)
    }, 3400)
    return () => window.clearInterval(interval)
  }, [flyThrough])

  /* parallax pointer tracking */
  useEffect(() => {
    if (!parallax) return
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setPointer({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) })
    }
    const onLeave = () => setPointer(null)
    const el = containerRef.current
    if (!el) return
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [parallax])

  const currentShot = flyThroughShots[shotIndex] ?? flyThroughShots[0]!
  const viewBox = currentShot.join(" ")

  /* parallax offset — translate background layers by a small amount based on cursor */
  const parallaxBg = pointer ? `translate(${(pointer.x - 0.5) * -8}px, ${(pointer.y - 0.5) * -6}px)` : "translate(0,0)"
  const parallaxFg = pointer ? `translate(${(pointer.x - 0.5) * 14}px, ${(pointer.y - 0.5) * 10}px)` : "translate(0,0)"

  return (
    <div
      className="relative h-full w-full"
      ref={containerRef}
      style={{ cursor: parallax ? "crosshair" : undefined }}
    >
      <style>{`
        @keyframes hf-ping { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes hf-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes hf-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.2; } }
        @keyframes hf-sweep { 0%, 100% { transform: rotate(-22deg); } 50% { transform: rotate(22deg); } }
        @keyframes hf-card-tap {
          0%, 30% { transform: translate(0,0); opacity: 0.85; }
          50% { transform: translate(-8px, 0); opacity: 1; }
          70%, 100% { transform: translate(0,0); opacity: 0.85; }
        }
        @keyframes hf-counter { 0%, 100% { opacity: 1; } 50% { opacity: 0.65; } }
        @keyframes hf-ring-out { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2.6); opacity: 0; } }
        @keyframes hf-printer-flash { 0%, 80%, 100% { opacity: 0.25; } 90% { opacity: 1; } }

        .hf-ping { transform-origin: center; animation: hf-ping 2.6s ease-out infinite; }
        .hf-ping-2 { transform-origin: center; animation: hf-ping 2.6s ease-out 0.9s infinite; }
        .hf-ping-3 { transform-origin: center; animation: hf-ping 2.6s ease-out 1.7s infinite; }
        .hf-pulse { animation: hf-pulse 1.6s ease-in-out infinite; }
        .hf-blink { animation: hf-blink 1.2s steps(2) infinite; }
        .hf-blink-2 { animation: hf-blink 1.2s steps(2) 0.4s infinite; }
        .hf-blink-3 { animation: hf-blink 1.2s steps(2) 0.8s infinite; }
        .hf-sweep { transform-origin: 100px 410px; animation: hf-sweep 5s ease-in-out infinite; }
        .hf-card-tap { animation: hf-card-tap 4.5s ease-in-out infinite; }
        .hf-card-tap-2 { animation: hf-card-tap 4.5s ease-in-out 1.5s infinite; }
        .hf-card-tap-3 { animation: hf-card-tap 4.5s ease-in-out 2.5s infinite; }
        .hf-counter { animation: hf-counter 1.8s ease-in-out infinite; }
        .hf-ring-out { transform-origin: center; animation: hf-ring-out 2.4s ease-out infinite; }
        .hf-ring-out-2 { transform-origin: center; animation: hf-ring-out 2.4s ease-out 0.8s infinite; }
        .hf-printer-flash { animation: hf-printer-flash 4s ease-in-out infinite; }

        /* Option 2 — system sweep */
        @keyframes hf-scan-line {
          0% { transform: translateX(40px); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateX(760px); opacity: 0; }
        }
        @keyframes hf-scan-boost {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.8); opacity: 1; }
        }
        .hf-scan-line { animation: hf-scan-line 8s linear infinite; transform-origin: 0 0; }
        .hf-scan-boost-ap { transform-origin: 315px 70px; animation: hf-scan-boost 8s ease-in-out 3.15s infinite; }
        .hf-scan-boost-cctv { transform-origin: 100px 410px; animation: hf-scan-boost 8s ease-in-out 1s infinite; }
        .hf-scan-boost-reader { transform-origin: 40px 320px; animation: hf-scan-boost 8s ease-in-out 0s infinite; }
        .hf-scan-boost-server { transform-origin: 670px 515px; animation: hf-scan-boost 8s ease-in-out 6.7s infinite; }
        .hf-scan-boost-display { transform-origin: 610px 52px; animation: hf-scan-boost 8s ease-in-out 6.1s infinite; }
        .hf-scan-boost-phone { transform-origin: 505px 510px; animation: hf-scan-boost 8s ease-in-out 5.05s infinite; }

        /* Option 3 — telemetry ticker scrolling */
        @keyframes hf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .hf-marquee-track { animation: hf-marquee 30s linear infinite; }

        /* Option 4 — connection web breathing dashes */
        @keyframes hf-dash-flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -20; } }
        .hf-dash-flow { animation: hf-dash-flow 2s linear infinite; }

        /* Option 5 — alert dramaturgy */
        @keyframes hf-alert-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        .hf-alert-pulse { transform-origin: center; animation: hf-alert-pulse 0.6s ease-in-out infinite; }

        .hf-svg { transition: ${flyThrough ? "all 1.4s cubic-bezier(0.5, 0, 0.2, 1)" : "none"}; }
        .hf-spotlight {
          position: absolute; inset: 0;
          background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(19,91,236,0.12), transparent 22%);
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0; transition: opacity 0.2s ease;
        }
        .hf-spotlight.hf-active { opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .hf-ping, .hf-ping-2, .hf-ping-3, .hf-pulse, .hf-blink, .hf-blink-2,
          .hf-blink-3, .hf-sweep, .hf-card-tap, .hf-card-tap-2, .hf-card-tap-3,
          .hf-counter, .hf-ring-out, .hf-ring-out-2, .hf-printer-flash, .hf-svg,
          .hf-scan-line, .hf-scan-boost-ap, .hf-scan-boost-cctv, .hf-scan-boost-reader,
          .hf-scan-boost-server, .hf-scan-boost-display, .hf-scan-boost-phone,
          .hf-marquee-track, .hf-dash-flow, .hf-alert-pulse { animation: none; transition: none; }
        }
      `}</style>

      <svg
        className="hf-svg h-full w-full text-foreground"
        preserveAspectRatio="xMidYMid meet"
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* drawing-sheet header (very subtle) */}
        <g className="font-mono fill-foreground" opacity={0.35} style={{ transform: parallaxBg }}>
          <text x={40} y={28} fontSize={11} style={{ letterSpacing: "0.25em" }}>
            FLOOR PLAN — TYPICAL COWORKING (SCHEMATIC)
          </text>
          <text x={760} y={28} textAnchor="end" fontSize={11} style={{ letterSpacing: "0.25em" }}>
            LIVE / SCHEMATIC
          </text>
        </g>

        {/* outer wall */}
        <g style={{ transform: parallaxBg }}>
          <rect
            x={40}
            y={40}
            width={720}
            height={540}
            fill="currentColor"
            fillOpacity={0.04}
            stroke="currentColor"
            strokeOpacity={0.55}
            strokeWidth={2.2}
          />

          {/* room divisions */}
          {rooms.map((r, i) => (
            <rect
              key={`room-${i}`}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1.1}
            />
          ))}

          {/* doors */}
          <g stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.4} fill="none" className="text-primary">
            <path d="M 40 320 L 40 300" />
            <path d="M 40 300 A 28 28 0 0 1 68 328" />
          </g>
          <g stroke="currentColor" strokeOpacity={0.32} strokeWidth={1.2} fill="none">
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

          {/* meeting room table + chairs */}
          <ellipse cx={610} cy={140} rx={100} ry={36} fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={1.2} />
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
            <circle key={`chair-${i}`} cx={cx} cy={cy} r={6} fill="none" stroke="currentColor" strokeOpacity={0.22} strokeWidth={1} />
          ))}
          {/* meeting room display strip — pulsing */}
          <rect x={580} y={50} width={60} height={4} fill="currentColor" className="text-primary hf-pulse" />

          {/* kitchen island + appliances + bar seating */}
          <rect x={245} y={445} width={140} height={50} rx={4} fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={1.2} />
          <g stroke="currentColor" strokeOpacity={0.22} strokeWidth={1} fill="none">
            <rect x={185} y={370} width={28} height={22} rx={1} />
            <rect x={215} y={370} width={28} height={22} rx={1} />
            <rect x={245} y={370} width={28} height={22} rx={1} />
          </g>
          {[200, 245, 290, 335, 380, 425].map((cx, i) => (
            <circle key={`seat-${i}`} cx={cx} cy={540} r={7} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={1} />
          ))}

          {/* office desks + chairs */}
          <rect x={485} y={290} width={100} height={30} rx={2} fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={1} />
          <circle cx={535} cy={355} r={7} fill="none" stroke="currentColor" strokeOpacity={0.25} />
          <rect x={635} y={290} width={100} height={30} rx={2} fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={1} />
          <circle cx={685} cy={355} r={7} fill="none" stroke="currentColor" strokeOpacity={0.25} />

          {/* booth chairs + sidetables */}
          <circle cx={505} cy={510} r={9} fill="none" stroke="currentColor" strokeOpacity={0.25} />
          <rect x={490} y={540} width={30} height={5} fill="currentColor" fillOpacity={0.18} />
          <circle cx={595} cy={510} r={9} fill="none" stroke="currentColor" strokeOpacity={0.25} />
          <rect x={580} y={540} width={30} height={5} fill="currentColor" fillOpacity={0.18} />

          {/* IT closet — server rack with blinking LEDs */}
          <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} fill="none">
            <rect x={655} y={485} width={30} height={70} rx={1} />
            {[0, 1, 2, 3, 4, 5].map((j) => (
              <line key={`rack-${j}`} x1={655} x2={685} y1={495 + j * 11} y2={495 + j * 11} />
            ))}
          </g>
          <circle cx={680} cy={493} r={1.8} className="text-primary hf-blink" fill="currentColor" />
          <circle cx={680} cy={515} r={1.8} className="text-primary hf-blink-2" fill="currentColor" />
          <circle cx={680} cy={537} r={1.8} className="text-primary hf-blink-3" fill="currentColor" />

          {/* reception desk (curved) */}
          <path d="M 50 100 Q 105 80 160 100" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1.4} />
          <rect x={50} y={100} width={110} height={16} fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} />

          {/* lobby seating cluster */}
          <circle cx={75} cy={490} r={13} fill="none" stroke="currentColor" strokeOpacity={0.25} />
          <circle cx={125} cy={490} r={13} fill="none" stroke="currentColor" strokeOpacity={0.25} />
          <rect x={70} y={520} width={70} height={6} fill="currentColor" fillOpacity={0.18} />

          {/* room labels */}
          {rooms.map((r, i) => (
            <text
              key={`label-${i}`}
              x={r.x + r.w / 2}
              y={r.y + 22}
              textAnchor="middle"
              className="font-mono fill-foreground"
              fontSize={r.w > 120 ? 13 : 10}
              opacity={0.5}
              style={{ letterSpacing: r.w > 120 ? "0.25em" : "0.18em" }}
            >
              {r.label}
            </text>
          ))}

          {/* north arrow */}
          <g transform="translate(745, 72)">
            <circle r={18} fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} />
            <path d="M 0 -13 L 5 5 L 0 1 L -5 5 Z" fill="currentColor" fillOpacity={0.55} className="text-primary" />
            <text textAnchor="middle" y={-22} className="font-mono fill-foreground" fontSize={11} opacity={0.5} style={{ letterSpacing: "0.2em" }}>
              N
            </text>
          </g>

          {/* scale bar */}
          <g transform="translate(40, 600)" className="font-mono fill-foreground" opacity={0.45}>
            <line x1={0} x2={100} y1={0} y2={0} stroke="currentColor" strokeWidth={1} />
            <line x1={0} x2={0} y1={-4} y2={4} stroke="currentColor" strokeWidth={1} />
            <line x1={50} x2={50} y1={-3} y2={3} stroke="currentColor" strokeWidth={1} />
            <line x1={100} x2={100} y1={-4} y2={4} stroke="currentColor" strokeWidth={1} />
            <text x={50} y={16} textAnchor="middle" fontSize={10} style={{ letterSpacing: "0.2em" }}>5 M</text>
          </g>
        </g>

        {/* foreground / animated tech overlays — these get extra parallax */}
        <g style={{ transform: parallaxFg }}>
          {/* WiFi access point — coworking ceiling */}
          <g className="text-primary">
            <circle cx={315} cy={70} r={4} fill="currentColor" fillOpacity={0.55} />
            <circle cx={315} cy={70} r={12} className="hf-ping" fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.2} />
            <circle cx={315} cy={70} r={12} className="hf-ping-2" fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={1} />
            <circle cx={315} cy={70} r={12} className="hf-ping-3" fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={1} />
          </g>

          {/* CCTV camera with sweeping cone */}
          <g className="text-primary">
            <g className="hf-sweep" stroke="currentColor" strokeOpacity={0.45} strokeWidth={0.8} fill="currentColor" fillOpacity={0.06}>
              <path d="M 100 410 L 60 460 L 145 460 Z" strokeDasharray="2 4" />
            </g>
            <circle cx={100} cy={410} r={3.5} fill="currentColor" fillOpacity={0.6} />
          </g>

          {/* Door reader pulse — entrance */}
          <g className="text-primary">
            <rect x={36} y={315} width={4} height={10} fill="currentColor" fillOpacity={0.55} />
            <circle cx={40} cy={320} r={10} className="hf-ring-out" fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.2} />
            <circle cx={40} cy={320} r={10} className="hf-ring-out-2" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} />
          </g>

          {/* Extra events for E2 */}
          {extraEvents ? (
            <>
              {/* Fob taps on additional doors */}
              <g className="text-primary">
                {/* office A door tap */}
                <g className="hf-card-tap">
                  <rect x={502} y={232} width={8} height={12} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.8} />
                </g>
                {/* IT closet door tap */}
                <g className="hf-card-tap-2">
                  <rect x={662} y={432} width={8} height={12} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.8} />
                </g>
                {/* booth booking tap */}
                <g className="hf-card-tap-3">
                  <rect x={482} y={510} width={6} height={10} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.8} />
                </g>
              </g>

              {/* Packets flying around the WiFi AP */}
              {[
                ["M 315 70 L 200 235", "2.4s", "0s"],
                ["M 315 70 L 380 235", "2.6s", "0.4s"],
                ["M 315 70 L 200 305", "2.8s", "0.8s"],
                ["M 315 70 L 380 305", "2.5s", "1.2s"],
                ["M 200 235 L 315 70", "2.4s", "0.6s"],
                ["M 380 305 L 315 70", "2.7s", "1.4s"],
              ].map(([path, dur, delay], i) => (
                <circle key={`pkt-${i}`} r={2} fill="currentColor" className="text-primary" opacity={0.85}>
                  <animateMotion dur={dur as string} repeatCount="indefinite" begin={delay as string} path={path as string} />
                </circle>
              ))}

              {/* Phone ringing in left booth */}
              <g className="text-primary">
                <rect x={500} y={503} width={10} height={14} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.8} />
                <circle cx={505} cy={510} r={8} className="hf-ring-out" fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={1} />
                <circle cx={505} cy={510} r={8} className="hf-ring-out-2" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8} />
              </g>

              {/* Dashboard counter ticking — reception */}
              <g className="text-primary font-mono">
                <rect x={50} y={130} width={110} height={20} rx={1.5} fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.6} />
                <text x={56} y={144} fontSize={6.5} className="fill-muted-foreground" letterSpacing="2">MEMBERS</text>
                <text x={155} y={144} textAnchor="end" fontSize={9} className="fill-primary hf-counter" letterSpacing="1">847</text>
              </g>

              {/* Member dot moving through the corridor */}
              <circle r={2.5} fill="currentColor" className="text-primary" opacity={0.9}>
                <animateMotion dur="14s" repeatCount="indefinite" path="M 100 320 L 100 160 L 250 160 L 250 250 L 320 250 L 320 415 L 600 415" />
              </circle>

              {/* Printer briefly active in coworking corner */}
              <g className="text-primary">
                <rect x={420} y={170} width={26} height={20} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={0.8} />
                <rect x={424} y={186} width={18} height={3} fill="currentColor" className="hf-printer-flash" />
              </g>
            </>
          ) : null}

          {/* Option 1 — narrative cycle (phase-gated events) */}
          {narrativeCycle ? (
            <>
              {/* Phase chip in top-right area */}
              <g className="text-primary font-mono">
                <rect x={555} y={595} width={205} height={18} rx={2} fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} />
                <circle cx={566} cy={604} r={2.5} fill="currentColor" className="hf-pulse" />
                <text x={576} y={607} fontSize={8.5} letterSpacing="2.5" className="fill-foreground">
                  {phase === 0 ? "08:00 · MORNING ARRIVAL" :
                   phase === 1 ? "10:30 · MEETING STARTS" :
                   phase === 2 ? "12:45 · LUNCH RUSH" :
                   phase === 3 ? "15:00 · PEAK NETWORK" :
                                 "22:00 · QUIET / OVERNIGHT"}
                </text>
              </g>

              {/* Phase 0 — morning: member arrives, dashboard ticks */}
              {phase === 0 ? (
                <g className="text-primary">
                  <circle r={3} fill="currentColor">
                    <animateMotion dur="3.6s" repeatCount="indefinite" path="M 35 320 L 80 320 L 105 130" />
                  </circle>
                  <g className="font-mono">
                    <rect x={50} y={130} width={110} height={20} rx={1.5} fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} />
                    <text x={56} y={144} fontSize={6.5} className="fill-muted-foreground" letterSpacing="2">CHECK-INS · TODAY</text>
                    <text x={155} y={144} textAnchor="end" fontSize={9} className="fill-primary hf-counter" letterSpacing="1">12</text>
                  </g>
                </g>
              ) : null}

              {/* Phase 1 — meeting starts: display brightens, packets surge */}
              {phase === 1 ? (
                <g className="text-primary">
                  <rect x={580} y={50} width={60} height={4} fill="currentColor" opacity={1} />
                  <rect x={584} y={56} width={52} height={1.5} fill="currentColor" opacity={0.7} />
                  {/* fob tap on meeting room door */}
                  <g className="hf-card-tap">
                    <rect x={462} y={62} width={8} height={12} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.8} />
                  </g>
                  {/* surge of packets to AP */}
                  {[0.0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
                    <circle key={`narr1-pkt-${i}`} r={2} fill="currentColor">
                      <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${delay}s`} path={`M 580 90 L 315 70`} />
                    </circle>
                  ))}
                </g>
              ) : null}

              {/* Phase 2 — lunch: kitchen seats fill + phone ring */}
              {phase === 2 ? (
                <g className="text-primary">
                  {[200, 245, 290, 335].map((cx, i) => (
                    <circle key={`narr2-seat-${i}`} cx={cx} cy={540} r={4} fill="currentColor" opacity={0.7}>
                      <animate attributeName="opacity" dur="0.3s" begin={`${i * 0.4}s`} from="0" to="0.7" fill="freeze" />
                    </circle>
                  ))}
                  <g>
                    <rect x={500} y={503} width={10} height={14} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={0.8} />
                    <circle cx={505} cy={510} r={8} className="hf-ring-out" fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1} />
                    <circle cx={505} cy={510} r={8} className="hf-ring-out-2" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8} />
                  </g>
                </g>
              ) : null}

              {/* Phase 3 — afternoon: peak network, multi taps, printer */}
              {phase === 3 ? (
                <g className="text-primary">
                  <g className="hf-card-tap"><rect x={502} y={232} width={8} height={12} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.8} /></g>
                  <g className="hf-card-tap-2"><rect x={662} y={432} width={8} height={12} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.8} /></g>
                  <g className="hf-card-tap-3"><rect x={482} y={510} width={6} height={10} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.8} /></g>
                  {[
                    ["M 315 70 L 200 235", "2s", "0s"],
                    ["M 315 70 L 380 235", "2.2s", "0.2s"],
                    ["M 315 70 L 200 305", "1.8s", "0.4s"],
                    ["M 315 70 L 380 305", "2s", "0.6s"],
                    ["M 200 235 L 315 70", "1.9s", "0.8s"],
                    ["M 380 305 L 315 70", "2.1s", "1s"],
                  ].map(([path, dur, delay], i) => (
                    <circle key={`narr3-pkt-${i}`} r={2} fill="currentColor">
                      <animateMotion dur={dur as string} repeatCount="indefinite" begin={delay as string} path={path as string} />
                    </circle>
                  ))}
                  <g>
                    <rect x={420} y={170} width={26} height={20} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={0.8} />
                    <rect x={424} y={186} width={18} height={3} fill="currentColor" className="hf-printer-flash" />
                  </g>
                </g>
              ) : null}

              {/* Phase 4 — quiet: dim background, just security */}
              {phase === 4 ? (
                <rect x={40} y={40} width={720} height={540} fill="currentColor" fillOpacity={0.18} pointerEvents="none" />
              ) : null}
            </>
          ) : null}

          {/* Option 2 — system sweep */}
          {systemSweep ? (
            <>
              {/* Sweeping vertical line */}
              <g className="text-primary">
                <line x1={0} x2={0} y1={40} y2={580} className="hf-scan-line" stroke="currentColor" strokeOpacity={0.55} strokeWidth={2} />
                <line x1={-1} x2={-1} y1={40} y2={580} className="hf-scan-line" stroke="currentColor" strokeOpacity={0.18} strokeWidth={6} />
              </g>
              {/* Boost rings on each tech point — fire when line passes over */}
              <g className="text-primary" fill="none" stroke="currentColor" strokeWidth={1.4} strokeOpacity={0.85}>
                <circle cx={315} cy={70} r={16} className="hf-scan-boost-ap" />
                <circle cx={100} cy={410} r={16} className="hf-scan-boost-cctv" />
                <circle cx={40} cy={320} r={16} className="hf-scan-boost-reader" />
                <circle cx={670} cy={515} r={16} className="hf-scan-boost-server" />
                <circle cx={610} cy={52} r={16} className="hf-scan-boost-display" />
                <circle cx={505} cy={510} r={16} className="hf-scan-boost-phone" />
              </g>
            </>
          ) : null}

          {/* Option 3 — telemetry inline data badges (ticker bar is HTML, below) */}
          {telemetryTicker ? (
            <g className="text-primary font-mono">
              {/* AP throughput badge */}
              <g>
                <rect x={332} y={62} width={48} height={14} rx={2} fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.5} />
                <text x={356} y={71.5} textAnchor="middle" fontSize={7} className="fill-primary hf-counter" letterSpacing="1">{bandwidth} MBPS</text>
              </g>
              {/* CCTV camera badge */}
              <g>
                <rect x={120} y={398} width={48} height={14} rx={2} fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.5} />
                <text x={144} y={407.5} textAnchor="middle" fontSize={7} className="fill-primary" letterSpacing="1">4 CAMS</text>
              </g>
              {/* Server load badge */}
              <g>
                <rect x={695} y={510} width={48} height={14} rx={2} fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.5} />
                <text x={719} y={519.5} textAnchor="middle" fontSize={7} className="fill-primary hf-counter" letterSpacing="1">12% CPU</text>
              </g>
              {/* Members badge in reception */}
              <g>
                <rect x={50} y={130} width={110} height={20} rx={1.5} fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} />
                <text x={56} y={144} fontSize={6.5} className="fill-muted-foreground" letterSpacing="2">MEMBERS</text>
                <text x={155} y={144} textAnchor="end" fontSize={9} className="fill-primary hf-counter" letterSpacing="1">{memberCount}</text>
              </g>
            </g>
          ) : null}

          {/* Option 4 — connection web (dashed lines + traveling packets) */}
          {connectionWeb ? (
            <g className="text-primary">
              {/* Dashed connection paths between tech points */}
              <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.1} fill="none" strokeDasharray="4 4" className="hf-dash-flow">
                <path d="M 315 70 Q 500 40 670 515" />
                <path d="M 670 515 Q 400 480 100 410" />
                <path d="M 670 515 Q 600 380 610 52" />
                <path d="M 670 515 Q 350 520 40 320" />
                <path d="M 670 515 Q 590 510 505 510" />
              </g>
              {/* Connection labels */}
              <g className="font-mono fill-foreground" opacity={0.4}>
                <text x={488} y={220} fontSize={6} letterSpacing="1.5">WIFI ↔ CTRL</text>
                <text x={350} y={488} fontSize={6} letterSpacing="1.5">NVR FEED</text>
                <text x={636} y={300} fontSize={6} letterSpacing="1.5">ROOM AV</text>
                <text x={310} y={420} fontSize={6} letterSpacing="1.5">ACCESS LOG</text>
              </g>
              {/* Packets traveling along connections */}
              {[
                ["M 315 70 Q 500 40 670 515", "3.6s", "0s"],
                ["M 670 515 Q 400 480 100 410", "3.4s", "0.6s"],
                ["M 670 515 Q 600 380 610 52", "3.2s", "1.2s"],
                ["M 670 515 Q 350 520 40 320", "3.8s", "1.8s"],
                ["M 670 515 Q 590 510 505 510", "2.4s", "0.4s"],
              ].map(([path, dur, delay], i) => (
                <circle key={`web-pkt-${i}`} r={2.4} fill="currentColor" opacity={0.95}>
                  <animateMotion dur={dur as string} repeatCount="indefinite" begin={delay as string} path={path as string} />
                </circle>
              ))}
            </g>
          ) : null}

          {/* Option 5 — alert dramaturgy */}
          {alertDrama && alertTarget ? (() => {
            const target = techPoints.find((p) => p.id === alertTarget.id)
            if (!target) return null
            const isAlert = alertTarget.status === "alert"
            return (
              <g style={{ color: isAlert ? "var(--destructive)" : "oklch(0.7 0.18 145)" }}>
                <circle cx={target.x} cy={target.y} r={20} className="hf-alert-pulse" fill="none" stroke="currentColor" strokeOpacity={0.85} strokeWidth={1.6} />
                <circle cx={target.x} cy={target.y} r={32} fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} />
                <g className="font-mono" transform={`translate(${target.x + 28} ${target.y - 8})`}>
                  <rect x={0} y={0} width={isAlert ? 90 : 100} height={14} rx={2} fill="currentColor" fillOpacity={0.18} stroke="currentColor" strokeOpacity={0.65} strokeWidth={0.5} />
                  <text x={5} y={9.5} fontSize={6.5} fill="currentColor" letterSpacing="1.5">
                    {isAlert ? "● ISSUE DETECTED" : "✓ AUTO-RESOLVED"}
                  </text>
                </g>
              </g>
            )
          })() : null}
        </g>
      </svg>

      {/* Option 3 — HTML telemetry ticker (scrolling along the bottom of the floor plan) */}
      {telemetryTicker ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-2 overflow-hidden">
          <div className="hf-marquee-track flex whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.25em] text-primary opacity-70">
            {[0, 1].map((dup) => (
              <span className="flex shrink-0 items-center gap-6 pr-6" key={dup}>
                <span>● WIFI HEALTHY {bandwidth} MBPS · 12 DEVICES</span>
                <span>● CCTV REC ZONE A · 4 CAMS · 30D</span>
                <span>● {memberCount} MEMBERS · 92% CAPACITY</span>
                <span>● LAST SYNC 0:42 · 0 ALERTS</span>
                <span>● API HEALTHY · €18,420 MRR</span>
                <span>● ROOM A 14:00–15:00 · 6/8 BOOKED</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {parallax ? (
        <div
          className={`hf-spotlight ${pointer ? "hf-active" : ""}`}
          style={pointer ? ({ ["--x" as string]: `${pointer.x * 100}%`, ["--y" as string]: `${pointer.y * 100}%` } as React.CSSProperties) : undefined}
        />
      ) : null}
    </div>
  )
}
