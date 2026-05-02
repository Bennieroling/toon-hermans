import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { V5Topology } from "@/components/diagrams/V5Topology"

export function AuditLayers() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 px-4 py-24 lg:px-6 lg:py-32" id="layers">
      <div className="mx-auto max-w-7xl">
        <AnimateIn className="lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
                {t("layers.label")}
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
                {t("layers.headline")}
              </h2>
            </div>
            <p className="max-w-xl text-base font-light leading-8 text-muted-foreground sm:text-lg">
              {t("layers.subheadline")}
            </p>
          </div>
        </AnimateIn>
        <V5Topology capFloorHeight hideBottomLegend showTopTabs />
      </div>
    </section>
  )
}
