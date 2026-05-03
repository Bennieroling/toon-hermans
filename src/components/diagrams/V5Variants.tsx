import { V5Topology } from "@/components/diagrams/V5Topology"

/**
 * Sub-variants of V5 used on /demo/diagrams to compare layout choices
 * for the post-floor-plan vertical real estate (legend / no legend /
 * compact / capped floor plan).
 */

export function V5aNoLegend() {
  return <V5Topology hideBottomLegend />
}

export function V5bTopTabs() {
  return <V5Topology capFloorHeight hideBottomLegend showTopTabs />
}

export function V5cCompact() {
  return <V5Topology compact />
}

export function V5dCappedNoLegend() {
  return <V5Topology hideBottomLegend capFloorHeight />
}

/** V5e — V5b config (chip strip + floor plan + capped width) PLUS auto-cycle.
 *  Auto-advances through 01–08 every 2.4s. Pauses on any user interaction
 *  (click, hover, keyboard). Resumes after 20s of no interaction. */
export function V5eAutoCycleIdle() {
  return (
    <V5Topology
      autoCycleIdleMs={20000}
      capFloorHeight
      hideBottomLegend
      showTopTabs
    />
  )
}
