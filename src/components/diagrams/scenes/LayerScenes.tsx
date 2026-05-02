import type { ReactNode } from "react"

/**
 * Animated mini-scenes per audit layer.
 * Each one replaces a static illustration in V5Topology's side panel
 * with a live, animated visual + telemetry strip — so clicking a hotspot
 * reveals the layer "in action" rather than a flat picture.
 *
 * All eight share `SceneFrame` for consistent framing + telemetry. The
 * inner SVG is unique per layer.
 */

interface SceneFrameProps {
  children: ReactNode
  telemetry: string[]
}

function SceneFrame({ children, telemetry }: SceneFrameProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card/60 via-card/30 to-background/60 p-0">
      <div className="relative h-full w-full">{children}</div>
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-lg border border-border/40 bg-background/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
        {telemetry.map((t, i) => (
          <span
            className={i === 0 ? "flex-1 truncate text-primary" : "shrink-0"}
            key={i}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* All keyframes used across scenes — declared once, scoped via class names. */
const sceneStyles = `
  @keyframes ls-ping { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2.2); opacity: 0; } }
  @keyframes ls-pulse-soft { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
  @keyframes ls-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.2; } }
  @keyframes ls-sweep { 0%, 100% { transform: rotate(-26deg); } 50% { transform: rotate(26deg); } }
  @keyframes ls-card-tap {
    0%, 30% { transform: translate(0, 0); }
    50% { transform: translate(-12px, 0); }
    52% { transform: translate(-12px, 0); }
    70%, 100% { transform: translate(0, 0); }
  }
  @keyframes ls-grant-flash {
    0%, 50% { opacity: 0; }
    52%, 70% { opacity: 1; }
    72%, 100% { opacity: 0; }
  }
  @keyframes ls-bar-grow {
    0% { transform: scaleY(0.3); }
    50% { transform: scaleY(1); }
    100% { transform: scaleY(0.3); }
  }
  @keyframes ls-line-rise {
    0% { transform: translateY(8px); opacity: 0.5; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @keyframes ls-counter-flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  @keyframes ls-scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes ls-recording-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0.2; }
  }
  @keyframes ls-ring-call {
    0%, 80% { transform: scale(0.5); opacity: 0.0; }
    20%, 60% { opacity: 0.7; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes ls-waveform-1 { 0%, 100% { transform: scaleY(0.3); } 25% { transform: scaleY(1); } 50% { transform: scaleY(0.6); } 75% { transform: scaleY(0.9); } }
  @keyframes ls-waveform-2 { 0%, 100% { transform: scaleY(0.6); } 30% { transform: scaleY(0.2); } 60% { transform: scaleY(1); } }
  @keyframes ls-waveform-3 { 0%, 100% { transform: scaleY(0.4); } 40% { transform: scaleY(0.8); } 80% { transform: scaleY(0.5); } }
  @keyframes ls-gear-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes ls-gear-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
  @keyframes ls-toast-in {
    0% { transform: translateX(40px); opacity: 0; }
    10%, 70% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(40px); opacity: 0; }
  }
  .ls-ping { animation: ls-ping 2.6s ease-out infinite; }
  .ls-ping-2 { animation: ls-ping 2.6s ease-out 0.9s infinite; }
  .ls-ping-3 { animation: ls-ping 2.6s ease-out 1.7s infinite; }
  .ls-pulse-soft { animation: ls-pulse-soft 1.6s ease-in-out infinite; }
  .ls-blink { animation: ls-blink 1.2s steps(2) infinite; }
  .ls-sweep { animation: ls-sweep 4.6s ease-in-out infinite; }
  .ls-card-tap { animation: ls-card-tap 3s ease-in-out infinite; }
  .ls-grant-flash { animation: ls-grant-flash 3s ease-in-out infinite; }
  .ls-bar-grow { animation: ls-bar-grow 2.2s ease-in-out infinite; transform-origin: bottom; }
  .ls-line-rise { animation: ls-line-rise 0.8s ease-out forwards; }
  .ls-counter-flicker { animation: ls-counter-flicker 1.8s ease-in-out infinite; }
  .ls-scanline { animation: ls-scanline 3s linear infinite; }
  .ls-recording-blink { animation: ls-recording-blink 1.2s steps(2) infinite; }
  .ls-ring-call { animation: ls-ring-call 2.4s ease-out infinite; transform-origin: center; }
  .ls-waveform-1 { animation: ls-waveform-1 0.9s ease-in-out infinite; transform-origin: center; }
  .ls-waveform-2 { animation: ls-waveform-2 0.9s ease-in-out 0.15s infinite; transform-origin: center; }
  .ls-waveform-3 { animation: ls-waveform-3 0.9s ease-in-out 0.3s infinite; transform-origin: center; }
  .ls-gear-cw { animation: ls-gear-cw 8s linear infinite; transform-origin: center; transform-box: fill-box; }
  .ls-gear-ccw { animation: ls-gear-ccw 6s linear infinite; transform-origin: center; transform-box: fill-box; }
  .ls-toast-in { animation: ls-toast-in 4.5s ease-in-out infinite; }
  .ls-toast-in-2 { animation: ls-toast-in 4.5s ease-in-out 1.5s infinite; }
  .ls-toast-in-3 { animation: ls-toast-in 4.5s ease-in-out 3s infinite; }
  @media (prefers-reduced-motion: reduce) {
    .ls-ping, .ls-ping-2, .ls-ping-3, .ls-pulse-soft, .ls-blink, .ls-sweep,
    .ls-card-tap, .ls-grant-flash, .ls-bar-grow, .ls-counter-flicker,
    .ls-scanline, .ls-recording-blink, .ls-ring-call,
    .ls-waveform-1, .ls-waveform-2, .ls-waveform-3,
    .ls-gear-cw, .ls-gear-ccw, .ls-toast-in, .ls-toast-in-2, .ls-toast-in-3 {
      animation: none;
    }
  }
`

export function SceneStyles() {
  return <style>{sceneStyles}</style>
}

/* ---------- 01 NETWORK ---------- */
function NetworkScene() {
  const endpoints: { x: number; y: number; label: string }[] = [
    { x: 36, y: 44, label: "MBP" },
    { x: 164, y: 44, label: "iOS" },
    { x: 36, y: 144, label: "PRT" },
    { x: 164, y: 144, label: "TV" },
  ]
  return (
    <SceneFrame telemetry={["● 12 CONNECTED", "3 APs", "84 MBPS"]}>
      <svg className="h-full w-full text-foreground" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* connection lines */}
        <g stroke="currentColor" strokeOpacity={0.22} strokeWidth={0.8} fill="none">
          {endpoints.map((e, i) => (
            <line key={i} x1={100} y1={100} x2={e.x} y2={e.y} />
          ))}
        </g>
        {/* central AP rings */}
        <g className="text-primary">
          <circle cx={100} cy={100} r={14} className="ls-ping" fill="none" stroke="currentColor" strokeOpacity={0.5} />
          <circle cx={100} cy={100} r={14} className="ls-ping-2" fill="none" stroke="currentColor" strokeOpacity={0.4} />
          <circle cx={100} cy={100} r={14} className="ls-ping-3" fill="none" stroke="currentColor" strokeOpacity={0.3} />
          <circle cx={100} cy={100} r={9} fill="currentColor" fillOpacity={0.18} stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.2} />
          <path d="M 92 96 Q 100 88 108 96" fill="none" stroke="currentColor" strokeWidth={1.4} />
          <path d="M 95 99 Q 100 95 105 99" fill="none" stroke="currentColor" strokeWidth={1.2} />
          <circle cx={100} cy={102} r={1.3} fill="currentColor" />
        </g>
        {/* endpoint nodes */}
        {endpoints.map((e, i) => (
          <g key={i}>
            <circle cx={e.x} cy={e.y} r={9} className="fill-card" stroke="currentColor" strokeOpacity={0.45} strokeWidth={1} />
            <text x={e.x} y={e.y + 2.5} textAnchor="middle" fontSize={5} className="font-mono fill-foreground" opacity={0.55}>{e.label}</text>
          </g>
        ))}
        {/* packets along each path, alternating directions */}
        {endpoints.map((e, i) => (
          <g key={`p-${i}`}>
            <circle r={1.6} className="fill-primary">
              <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4}s`} path={`M ${e.x} ${e.y} L 100 100`} />
            </circle>
            <circle r={1.4} className="fill-primary" opacity={0.6}>
              <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.5 + 0.3}s`} path={`M 100 100 L ${e.x} ${e.y}`} />
            </circle>
          </g>
        ))}
      </svg>
    </SceneFrame>
  )
}

/* ---------- 02 ACCESS CONTROL ---------- */
function AccessScene() {
  return (
    <SceneFrame telemetry={["● 342 SWIPES TODAY", "0 FAILED", "18 ACTIVE"]}>
      <svg className="h-full w-full text-foreground" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* door frame */}
        <rect x={50} y={36} width={70} height={120} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.4} />
        <rect x={56} y={42} width={58} height={108} fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.8} />
        {/* door handle */}
        <circle cx={106} cy={96} r={1.6} fill="currentColor" opacity={0.6} />
        <circle cx={106} cy={96} r={3.2} fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} />
        {/* card reader */}
        <g>
          <rect x={140} y={78} width={32} height={44} rx={3} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.4} />
          <rect x={146} y={84} width={20} height={14} rx={1} fill="none" stroke="currentColor" strokeOpacity={0.4} />
          <rect x={150} y={108} width={12} height={2} fill="currentColor" opacity={0.4} />
          {/* status LED on reader */}
          <circle cx={156} cy={104} r={2} className="fill-primary ls-pulse-soft" />
        </g>
        {/* card animating tap */}
        <g className="ls-card-tap">
          <rect x={178} y={88} width={16} height={24} rx={1.5} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1} />
          <rect x={181} y={94} width={6} height={4} rx={0.5} className="fill-primary" opacity={0.6} />
          <line x1={180} y1={104} x2={192} y2={104} stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} />
        </g>
        {/* "ACCESS GRANTED" flash */}
        <g className="ls-grant-flash">
          <rect x={62} y={140} width={96} height={14} rx={2} className="fill-primary" opacity={0.18} />
          <text x={110} y={150} textAnchor="middle" fontSize={7} className="font-mono fill-primary" letterSpacing="2">
            ACCESS GRANTED
          </text>
        </g>
      </svg>
    </SceneFrame>
  )
}

/* ---------- 03 PLATFORM ---------- */
function PlatformScene() {
  return (
    <SceneFrame telemetry={["● 847 MEMBERS", "92% CAPACITY", "€18,420 MRR"]}>
      <svg className="h-full w-full text-foreground" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* dashboard window */}
        <rect x={18} y={26} width={164} height={130} rx={3} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.2} />
        {/* title bar */}
        <rect x={18} y={26} width={164} height={12} fill="currentColor" opacity={0.06} />
        <circle cx={26} cy={32} r={1.4} fill="currentColor" opacity={0.4} />
        <circle cx={31} cy={32} r={1.4} fill="currentColor" opacity={0.4} />
        <circle cx={36} cy={32} r={1.4} fill="currentColor" opacity={0.4} />
        {/* sidebar */}
        <line x1={56} y1={38} x2={56} y2={156} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.6} />
        <rect x={22} y={48} width={28} height={3} rx={0.5} className="fill-primary" opacity={0.7} />
        <rect x={22} y={56} width={26} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
        <rect x={22} y={62} width={20} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
        <rect x={22} y={68} width={24} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
        <rect x={22} y={74} width={22} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
        {/* big counter */}
        <text x={64} y={64} fontSize={18} fontWeight={900} className="font-display fill-foreground ls-counter-flicker">847</text>
        <text x={64} y={72} fontSize={5} letterSpacing="2" className="font-mono fill-muted-foreground">ACTIVE MEMBERS</text>
        {/* bar chart */}
        <g transform="translate(64,98)">
          {[10, 18, 14, 22, 28, 24, 32].map((h, i) => (
            <rect
              key={i}
              x={i * 7}
              y={36 - h}
              width={4}
              height={h}
              className="fill-primary ls-bar-grow"
              style={{ animationDelay: `${i * 0.12}s` }}
              opacity={0.85}
            />
          ))}
          <line x1={0} y1={36} x2={49} y2={36} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.5} />
        </g>
        {/* line chart */}
        <g transform="translate(120,90)">
          <polyline
            points="0,30 6,22 12,26 18,16 24,18 30,8 36,12 42,4 48,8"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeOpacity={0.85}
            className="text-primary ls-line-rise"
          />
          <line x1={0} y1={36} x2={48} y2={36} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.5} />
        </g>
        {/* recent activity row */}
        <rect x={64} y={142} width={108} height={8} rx={1} fill="currentColor" opacity={0.07} />
        <circle cx={70} cy={146} r={1.8} className="fill-primary ls-pulse-soft" />
        <text x={76} y={148} fontSize={4.5} letterSpacing="1.5" className="font-mono fill-muted-foreground">
          new member · sarah · 2m ago
        </text>
      </svg>
    </SceneFrame>
  )
}

/* ---------- 04 MEETING ROOM ---------- */
function MeetingScene() {
  return (
    <SceneFrame telemetry={["● ROOM A LIVE", "14:00 — 15:00", "6 / 8 BOOKED"]}>
      <svg className="h-full w-full text-foreground" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* TV display */}
        <rect x={28} y={32} width={144} height={92} rx={4} fill="currentColor" opacity={0.05} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.4} />
        <rect x={32} y={36} width={136} height={84} rx={2} fill="currentColor" opacity={0.04} />
        {/* video tile - active speaker */}
        <rect x={56} y={48} width={88} height={50} rx={2} fill="currentColor" opacity={0.1} stroke="currentColor" strokeOpacity={0.3} />
        <circle cx={100} cy={68} r={9} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.2} />
        <path d="M 88 86 Q 100 76 112 86" fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.2} />
        {/* recording / live dot */}
        <circle cx={64} cy={56} r={2} className="fill-destructive ls-recording-blink" />
        <text x={70} y={58} fontSize={4.5} letterSpacing="1.5" className="font-mono fill-foreground" opacity={0.7}>LIVE</text>
        {/* participant tiles */}
        <rect x={36} y={102} width={20} height={14} rx={1} fill="currentColor" opacity={0.08} />
        <rect x={60} y={102} width={20} height={14} rx={1} fill="currentColor" opacity={0.08} />
        <rect x={84} y={102} width={20} height={14} rx={1} fill="currentColor" opacity={0.08} />
        <rect x={108} y={102} width={20} height={14} rx={1} fill="currentColor" opacity={0.08} />
        <rect x={132} y={102} width={20} height={14} rx={1} fill="currentColor" opacity={0.08} />
        {/* mic icon pulsing */}
        <g transform="translate(96,134)" className="text-primary">
          <circle cx={0} cy={0} r={10} fill="currentColor" opacity={0.18} className="ls-pulse-soft" />
          <rect x={-2} y={-5} width={4} height={8} rx={2} fill="currentColor" />
          <path d="M -5 0 V 2 A 5 5 0 0 0 5 2 V 0" fill="none" stroke="currentColor" strokeWidth={1} />
        </g>
        {/* booking panel right */}
        <rect x={158} y={140} width={28} height={20} rx={2} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <circle cx={163} cy={150} r={2} className="fill-primary ls-pulse-soft" />
        <rect x={168} y={148} width={14} height={1.5} rx={0.5} fill="currentColor" opacity={0.3} />
        <rect x={168} y={152} width={10} height={1.5} rx={0.5} fill="currentColor" opacity={0.3} />
      </svg>
    </SceneFrame>
  )
}

/* ---------- 05 SECURITY / CCTV ---------- */
function SecurityScene() {
  return (
    <SceneFrame telemetry={["● REC", "4 CAMS · 30D", "ZONE A"]}>
      <svg className="h-full w-full text-foreground" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* viewfinder background */}
        <rect x={20} y={28} width={160} height={120} rx={2} fill="currentColor" opacity={0.06} stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.2} />
        {/* corner crosshairs */}
        <g stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} fill="none">
          <path d="M 24 36 L 24 28 L 32 28" />
          <path d="M 168 28 L 176 28 L 176 36" />
          <path d="M 24 140 L 24 148 L 32 148" />
          <path d="M 168 148 L 176 148 L 176 140" />
        </g>
        {/* center crosshair */}
        <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.6} fill="none">
          <line x1={94} y1={88} x2={106} y2={88} />
          <line x1={100} y1={82} x2={100} y2={94} />
          <circle cx={100} cy={88} r={5} />
        </g>
        {/* abstract scene shapes */}
        <g stroke="currentColor" strokeOpacity={0.25} fill="none" strokeWidth={0.8}>
          <rect x={30} y={120} width={32} height={20} rx={1} />
          <rect x={70} y={114} width={28} height={26} rx={1} />
          <rect x={108} y={118} width={24} height={22} rx={1} />
          <rect x={142} y={112} width={32} height={28} rx={1} />
        </g>
        {/* moving "person" silhouette dot */}
        <circle r={3} className="fill-primary">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 30 138 Q 100 138 170 138" />
        </circle>
        {/* scan line */}
        <g style={{ overflow: "hidden" }}>
          <rect x={20} y={28} width={160} height={2} className="fill-primary ls-scanline" opacity={0.35} />
        </g>
        {/* REC dot top-left */}
        <g>
          <circle cx={32} cy={40} r={2.5} className="fill-destructive ls-recording-blink" />
          <text x={38} y={42} fontSize={5} letterSpacing="2" className="font-mono fill-foreground" opacity={0.75}>REC</text>
        </g>
        {/* timestamp top-right */}
        <text x={172} y={42} textAnchor="end" fontSize={4.5} letterSpacing="1" className="font-mono fill-foreground" opacity={0.55}>
          14:32:08
        </text>
        {/* dome camera glyph */}
        <g transform="translate(100,162)">
          <ellipse cx={0} cy={0} rx={12} ry={5} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />
          <circle cx={0} cy={-2} r={3} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1} />
          <circle cx={0} cy={-2} r={1.4} className="fill-primary ls-pulse-soft" />
        </g>
      </svg>
    </SceneFrame>
  )
}

/* ---------- 06 TELEPHONY ---------- */
function TelephonyScene() {
  return (
    <SceneFrame telemetry={["● CALL ACTIVE", "12 TODAY · 0 MISSED", "AVG 4 MIN"]}>
      <svg className="h-full w-full text-foreground" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* phone base */}
        <rect x={56} y={60} width={90} height={86} rx={3} fill="currentColor" opacity={0.06} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />
        {/* screen */}
        <rect x={66} y={70} width={70} height={20} rx={1.5} fill="currentColor" opacity={0.08} />
        <rect x={70} y={75} width={28} height={2} rx={0.5} className="fill-primary" opacity={0.7} />
        <rect x={70} y={80} width={22} height={2} rx={0.5} fill="currentColor" opacity={0.4} />
        <rect x={70} y={85} width={18} height={2} rx={0.5} fill="currentColor" opacity={0.3} />
        {/* call active dot on screen */}
        <circle cx={130} cy={80} r={2.4} className="fill-primary ls-pulse-soft" />
        {/* keypad */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={70 + col * 18}
              y={100 + row * 12}
              width={12}
              height={8}
              rx={1.5}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.35}
              strokeWidth={0.8}
            />
          )),
        )}
        {/* call-active button highlighted */}
        <rect x={106} y={100} width={12} height={8} rx={1.5} className="fill-primary" opacity={0.18} />
        {/* handset on left */}
        <g transform="translate(38,90)">
          <rect x={0} y={0} width={12} height={48} rx={5} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />
          <rect x={3} y={6} width={6} height={4} rx={1} fill="currentColor" opacity={0.4} />
          <rect x={3} y={38} width={6} height={4} rx={1} fill="currentColor" opacity={0.4} />
        </g>
        {/* ring waves emanating from handset */}
        <g className="text-primary">
          <circle cx={44} cy={114} r={20} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} className="ls-ring-call" />
          <circle cx={44} cy={114} r={20} fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={0.8} className="ls-ring-call" style={{ animationDelay: "0.8s" }} />
          <circle cx={44} cy={114} r={20} fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={0.8} className="ls-ring-call" style={{ animationDelay: "1.6s" }} />
        </g>
        {/* waveform at bottom */}
        <g transform="translate(100,168)" className="text-primary">
          {[-20, -14, -8, -2, 4, 10, 16].map((x, i) => {
            const cls = ["ls-waveform-1", "ls-waveform-2", "ls-waveform-3"][i % 3]
            return <rect key={i} x={x} y={-6} width={3} height={12} rx={0.5} fill="currentColor" className={cls} />
          })}
        </g>
      </svg>
    </SceneFrame>
  )
}

/* ---------- 07 INTEGRATIONS ---------- */
function IntegrationsScene() {
  return (
    <SceneFrame telemetry={["● 87 SYNCS / HR", "API HEALTHY", "0 ERRORS"]}>
      <svg className="h-full w-full text-foreground" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* left system */}
        <g>
          <rect x={20} y={70} width={48} height={60} rx={3} fill="currentColor" opacity={0.06} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />
          <rect x={26} y={78} width={36} height={4} rx={1} fill="currentColor" opacity={0.45} />
          <rect x={26} y={86} width={28} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
          <rect x={26} y={92} width={32} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
          <rect x={26} y={98} width={24} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
          <rect x={26} y={106} width={36} height={16} rx={1.5} className="fill-primary" opacity={0.18} />
          <text x={44} y={117} textAnchor="middle" fontSize={5} letterSpacing="1.5" className="font-mono fill-foreground" opacity={0.7}>PLATFORM</text>
        </g>
        {/* right system */}
        <g>
          <rect x={132} y={70} width={48} height={60} rx={3} fill="currentColor" opacity={0.06} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />
          <rect x={138} y={78} width={36} height={4} rx={1} fill="currentColor" opacity={0.45} />
          <rect x={138} y={86} width={28} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
          <rect x={138} y={92} width={32} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
          <rect x={138} y={98} width={24} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
          <rect x={138} y={106} width={36} height={16} rx={1.5} className="fill-primary" opacity={0.18} />
          <text x={156} y={117} textAnchor="middle" fontSize={5} letterSpacing="1.5" className="font-mono fill-foreground" opacity={0.7}>BILLING</text>
        </g>
        {/* gears in middle */}
        <g transform="translate(86,84)" className="text-foreground" opacity={0.55}>
          <g className="ls-gear-cw" style={{ transformOrigin: "8px 8px" }}>
            <circle cx={8} cy={8} r={6} fill="none" stroke="currentColor" strokeWidth={1.2} />
            <circle cx={8} cy={8} r={2} fill="none" stroke="currentColor" strokeWidth={1} />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <rect key={i} x={7} y={1} width={2} height={3} fill="currentColor" transform={`rotate(${deg} 8 8)`} />
            ))}
          </g>
        </g>
        <g transform="translate(102,98)" className="text-primary" opacity={0.7}>
          <g className="ls-gear-ccw" style={{ transformOrigin: "8px 8px" }}>
            <circle cx={8} cy={8} r={6} fill="none" stroke="currentColor" strokeWidth={1.2} />
            <circle cx={8} cy={8} r={2} fill="none" stroke="currentColor" strokeWidth={1} />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <rect key={i} x={7} y={1} width={2} height={3} fill="currentColor" transform={`rotate(${deg} 8 8)`} />
            ))}
          </g>
        </g>
        {/* connection pipe */}
        <path d="M 68 100 L 132 100" stroke="currentColor" strokeOpacity={0.25} strokeWidth={1.4} fill="none" strokeDasharray="3 4" />
        {/* packets flowing both directions */}
        <circle r={2.4} className="fill-primary">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 68 100 L 132 100" />
        </circle>
        <circle r={2} className="fill-primary" opacity={0.6}>
          <animateMotion dur="3s" begin="0.6s" repeatCount="indefinite" path="M 132 100 L 68 100" />
        </circle>
        {/* status row at top */}
        <g transform="translate(28,38)">
          <circle cx={3} cy={3} r={2} className="fill-primary ls-pulse-soft" />
          <text x={10} y={5} fontSize={5} letterSpacing="1.5" className="font-mono fill-muted-foreground">AUTO_SYNC . LAST 0:42</text>
        </g>
      </svg>
    </SceneFrame>
  )
}

/* ---------- 08 IT / DEVICES ---------- */
function DevicesScene() {
  return (
    <SceneFrame telemetry={["● 23 DEVICES", "22 PATCHED", "1 PENDING"]}>
      <svg className="h-full w-full text-foreground" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* laptop */}
        <g>
          <rect x={28} y={60} width={108} height={68} rx={3} fill="currentColor" opacity={0.05} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.4} />
          <rect x={32} y={64} width={100} height={60} rx={1.5} fill="currentColor" opacity={0.04} />
          {/* base */}
          <path d="M 22 132 L 142 132 L 138 142 L 26 142 Z" fill="currentColor" opacity={0.12} stroke="currentColor" strokeOpacity={0.45} strokeWidth={1} />
          {/* screen content: device list rows */}
          <rect x={40} y={72} width={84} height={3} rx={0.5} className="fill-primary" opacity={0.7} />
          <rect x={40} y={78} width={68} height={2} rx={0.5} fill="currentColor" opacity={0.25} />
          <g>
            <circle cx={44} cy={88} r={1.5} className="fill-primary" />
            <rect x={48} y={87} width={38} height={2} fill="currentColor" opacity={0.4} />
            <rect x={108} y={87} width={14} height={2} className="fill-primary" opacity={0.5} />
          </g>
          <g>
            <circle cx={44} cy={96} r={1.5} className="fill-primary" />
            <rect x={48} y={95} width={42} height={2} fill="currentColor" opacity={0.4} />
            <rect x={108} y={95} width={14} height={2} className="fill-primary" opacity={0.5} />
          </g>
          <g>
            <circle cx={44} cy={104} r={1.5} fill="currentColor" opacity={0.5} />
            <rect x={48} y={103} width={36} height={2} fill="currentColor" opacity={0.4} />
            <rect x={108} y={103} width={14} height={2} fill="currentColor" opacity={0.4} />
          </g>
          <g>
            <circle cx={44} cy={112} r={1.5} className="fill-destructive ls-recording-blink" />
            <rect x={48} y={111} width={40} height={2} fill="currentColor" opacity={0.4} />
            <rect x={108} y={111} width={14} height={2} className="fill-destructive" opacity={0.4} />
          </g>
        </g>
        {/* phone next to laptop */}
        <g>
          <rect x={150} y={86} width={26} height={48} rx={3} fill="currentColor" opacity={0.06} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />
          <rect x={154} y={92} width={18} height={32} rx={1} fill="currentColor" opacity={0.05} />
          <circle cx={163} cy={130} r={1.4} fill="none" stroke="currentColor" strokeOpacity={0.5} />
          <rect x={156} y={94} width={14} height={2} className="fill-primary" opacity={0.6} />
        </g>
        {/* notification toasts streaming in upper right */}
        <g className="text-primary">
          <g className="ls-toast-in">
            <rect x={146} y={28} width={50} height={12} rx={2} fill="currentColor" opacity={0.18} />
            <rect x={146} y={28} width={50} height={12} rx={2} fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={0.8} />
            <text x={150} y={36} fontSize={4.5} letterSpacing="1" className="font-mono fill-foreground">PATCHED · MBP-04</text>
          </g>
          <g className="ls-toast-in-2">
            <rect x={146} y={42} width={50} height={12} rx={2} fill="currentColor" opacity={0.14} />
            <rect x={146} y={42} width={50} height={12} rx={2} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={0.8} />
            <text x={150} y={50} fontSize={4.5} letterSpacing="1" className="font-mono fill-foreground">ENROLLED · iOS-12</text>
          </g>
          <g className="ls-toast-in-3">
            <rect x={146} y={56} width={50} height={12} rx={2} fill="currentColor" opacity={0.10} />
            <rect x={146} y={56} width={50} height={12} rx={2} fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.8} />
            <text x={150} y={64} fontSize={4.5} letterSpacing="1" className="font-mono fill-foreground">BACKUP · OK</text>
          </g>
        </g>
      </svg>
    </SceneFrame>
  )
}

/* Public registry — V5 looks up by layer key */
// eslint-disable-next-line react-refresh/only-export-components
export const layerScenes: Record<string, () => ReactNode> = {
  network: NetworkScene,
  access: AccessScene,
  platform: PlatformScene,
  meeting: MeetingScene,
  security: SecurityScene,
  telephony: TelephonyScene,
  integrations: IntegrationsScene,
  devices: DevicesScene,
}
