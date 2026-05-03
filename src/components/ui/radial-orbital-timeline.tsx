import { useEffect, useRef, useState, type ElementType, type MouseEvent as ReactMouseEvent } from "react"
import { ArrowRight, Link as LinkIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Radial Orbital Timeline — adapted from 21st.dev for the Sorun brand.
 * Original was hard-coded white-on-black; this version uses theme tokens
 * (background / foreground / primary / muted-foreground / border) so it
 * works in both the dark default and the light redesign demo.
 */

export interface OrbitalTimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
}

interface RadialOrbitalTimelineProps {
  timelineData: OrbitalTimelineItem[]
}

export function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const handleContainerClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId)
    return currentItem ? currentItem.relatedIds : []
  }

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
    const totalNodes = timelineData.length
    const targetAngle = (nodeIndex / totalNodes) * 360
    setRotationAngle(270 - targetAngle)
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = { ...prev }
      Object.keys(newState).forEach((key) => {
        if (Number(key) !== id) newState[Number(key)] = false
      })
      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const relatedItems = getRelatedItems(id)
        const newPulseEffect: Record<number, boolean> = {}
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true
        })
        setPulseEffect(newPulseEffect)
        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }

      return newState
    })
  }

  useEffect(() => {
    let rotationTimer: ReturnType<typeof window.setInterval> | undefined
    if (autoRotate) {
      rotationTimer = window.setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)))
      }, 50)
    }
    return () => {
      if (rotationTimer) window.clearInterval(rotationTimer)
    }
  }, [autoRotate])

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radius = 200
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, angle, zIndex, opacity }
  }

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(itemId)
  }

  const getStatusStyles = (status: OrbitalTimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "bg-primary text-primary-foreground border-primary"
      case "in-progress":
        return "bg-foreground text-background border-foreground"
      case "pending":
        return "bg-muted text-muted-foreground border-border"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div
      className="relative flex h-[640px] w-full items-center justify-center overflow-hidden rounded-3xl bg-background"
      onClick={handleContainerClick}
      ref={containerRef}
    >
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Center pulse — uses brand primary instead of multicolor gradient */}
          <div className="absolute z-10 flex size-16 animate-pulse items-center justify-center rounded-full bg-primary">
            <div className="absolute size-20 animate-ping rounded-full border border-primary/40 opacity-70" />
            <div
              className="absolute size-24 animate-ping rounded-full border border-primary/20 opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="size-8 rounded-full bg-primary-foreground/85 backdrop-blur-md" />
          </div>

          {/* Orbit ring */}
          <div className="absolute size-96 rounded-full border border-border" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length)
            const isExpanded = Boolean(expandedItems[item.id])
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = Boolean(pulseEffect[item.id])
            const Icon = item.icon
            const sequenceNumber = String(index + 1).padStart(2, "0")

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            }

            return (
              <div
                className="absolute cursor-pointer transition-all duration-700"
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(item.id)
                }}
                ref={(el) => {
                  nodeRefs.current[item.id] = el
                }}
                style={nodeStyle}
              >
                {/* Soft outer glow */}
                <div
                  className={`absolute -inset-1 rounded-full ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.55 0.22 260 / 0.18) 0%, transparent 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5) / 2}px`,
                    top: `-${(item.energy * 0.5) / 2}px`,
                  }}
                />

                {/* Node circle — shows sequence number for clear ordering */}
                <div
                  className={`flex size-11 items-center justify-center rounded-full border-2 font-display font-black tracking-[-0.04em] transition-all duration-300 ${
                    isExpanded
                      ? "scale-150 border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : isRelated
                      ? "animate-pulse border-primary bg-primary/30 text-foreground"
                      : "border-border bg-background text-foreground"
                  }`}
                >
                  <span className="text-sm">{sequenceNumber}</span>
                </div>

                <div
                  className={`absolute top-12 flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isExpanded ? "scale-125 text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Icon size={11} />
                  {item.title}
                </div>

                {isExpanded ? (
                  <Card className="absolute left-1/2 top-20 w-72 -translate-x-1/2 overflow-visible border-border bg-background/95 shadow-xl shadow-primary/10 backdrop-blur-lg">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-primary/60" />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === "completed"
                            ? "DELIVERED"
                            : item.status === "in-progress"
                              ? "ACTIVE"
                              : "UPCOMING"}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <CardTitle className="mt-2 flex items-center gap-2 text-sm font-bold tracking-tight text-foreground">
                        <span className="font-mono text-[11px] text-primary">{sequenceNumber}</span>
                        <Icon size={14} className="text-primary" />
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      <p className="leading-6">{item.content}</p>

                      {item.relatedIds.length > 0 ? (
                        <div className="mt-4 border-t border-border pt-3">
                          <div className="mb-2 flex items-center">
                            <LinkIcon className="mr-1 text-muted-foreground" size={10} />
                            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              Connected phases
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId)
                              return (
                                <Button
                                  className="flex h-6 items-center border-border bg-transparent px-2 py-0 text-xs text-foreground hover:bg-accent hover:text-foreground"
                                  key={relatedId}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleItem(relatedId)
                                  }}
                                  variant="outline"
                                >
                                  {relatedItem?.title}
                                  <ArrowRight className="ml-1 text-muted-foreground" size={8} />
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RadialOrbitalTimeline
