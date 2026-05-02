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
  return <V5Topology hideBottomLegend showTopTabs />
}

export function V5cCompact() {
  return <V5Topology compact />
}

export function V5dCappedNoLegend() {
  return <V5Topology hideBottomLegend capFloorHeight />
}
