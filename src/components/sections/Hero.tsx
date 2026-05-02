import { HeroDE2SweepBadges } from "@/components/heroes/HeroSchematics"

/**
 * Production homepage hero.
 *
 * Currently rendering "Option 6" from /demo/heroes:
 * the V5-style schematic floor plan with the system-sweep scan line
 * + extra event simulation + inline data badges. No bottom ticker.
 *
 * Want to swap to a different variant later? See /demo/heroes for
 * all alternatives, including HeroOriginal (the first blueprint
 * version) for reverting.
 */
export function Hero() {
  return (
    <div className="scroll-mt-24" id="hero">
      <HeroDE2SweepBadges />
    </div>
  )
}
