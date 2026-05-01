import { useTranslation } from "react-i18next"

import { AnimateIn } from "@/components/AnimateIn"
import { LinkedInIcon } from "@/components/shared/LinkedInIcon"

export function Founder() {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 bg-muted px-4 py-24 lg:px-6 lg:py-32" id="founder">
      <div className="mx-auto max-w-4xl">
        <AnimateIn>
          <p className="text-primary-text text-sm font-bold uppercase tracking-[0.35em]">
            {t("founder.label")}
          </p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            {t("founder.headline")}
          </h2>
        </AnimateIn>
        <AnimateIn delay={120}>
          <div className="mt-12 grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
            <div className="relative inline-flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-border bg-card sm:size-40">
              <span
                aria-hidden
                className="font-display text-5xl font-black tracking-[-0.04em] text-primary/40"
              >
                {/* placeholder initials — drop a /public/founder.jpg and replace this block with <img/> */}
                {(t("founder.name") || "??")
                  .replace(/[[\]]/g, "")
                  .split(" ")
                  .map((word) => word[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                {t("founder.name")}
              </p>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("founder.title")}
              </p>
              <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
                {t("founder.bio")}
              </p>
              <a
                aria-label={t("founder.linkedin_label")}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                href="https://linkedin.com/in/YOUR-HANDLE"
                rel="noreferrer"
                target="_blank"
              >
                <LinkedInIcon className="size-4 text-primary" />
                {t("founder.linkedin_cta")}
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
