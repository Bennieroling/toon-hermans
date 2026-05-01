import { useTranslation } from "react-i18next"
import { layers } from "@/lib/utils"

export function V9BlueprintImages() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {layers.map((layer) => (
        <div
          className="group relative flex flex-col border border-border/60 bg-card/30 p-0 transition-all duration-300 hover:border-primary/40 hover:bg-card/50"
          key={layer.key}
        >
          {/* Technical Drawing Markers */}
          <span aria-hidden className="absolute -left-1.5 -top-1.5 size-3 font-mono text-[10px] text-primary/40">+</span>
          <span aria-hidden className="absolute -right-1.5 -top-1.5 size-3 font-mono text-[10px] text-primary/40">+</span>
          <span aria-hidden className="absolute -left-1.5 -bottom-1.5 size-3 font-mono text-[10px] text-primary/40">+</span>
          <span aria-hidden className="absolute -right-1.5 -bottom-1.5 size-3 font-mono text-[10px] text-primary/40">+</span>
          
          {/* Layer Header */}
          <div className="flex items-center justify-between border-b border-border/40 px-4 py-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70">
              LYR / {t(`layers.items.${layer.key}.number`)}
            </p>
            <div className="h-px flex-1 mx-3 bg-border/20" />
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/50">
              DET.0{t(`layers.items.${layer.key}.number`)}
            </p>
          </div>

          {/* Image Container */}
          <div className="relative aspect-square w-full overflow-hidden bg-muted/5 p-4">
            <img
              src={`/diagram-illustrations/${layer.key}.png`}
              alt=""
              className="size-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 dark:mix-blend-lighten opacity-80 group-hover:opacity-100"
            />
            {/* Perspective Grid Background */}
            <div className="absolute inset-0 -z-10 opacity-[0.03] [background-image:radial-gradient(var(--primary)_0.5px,transparent_0.5px)] [background-size:16px_16px]" />
          </div>

          {/* Text Content */}
          <div className="p-5">
            <h3 className="font-display text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {t(`layers.items.${layer.key}.name`)}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {t(`layers.items.${layer.key}.description`)}
            </p>
          </div>
          
          {/* Footer Detail */}
          <div className="mt-auto border-t border-border/40 px-4 py-2">
             <div className="flex justify-between items-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                <div className="flex gap-1">
                  <div className="size-1 rounded-full bg-primary" />
                  <div className="size-1 rounded-full bg-border" />
                  <div className="size-1 rounded-full bg-border" />
                </div>
                <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
                   {layer.key.toUpperCase()} // AUDIT_SPEC
                </p>
             </div>
          </div>
        </div>
      ))}
    </div>
  )
}
