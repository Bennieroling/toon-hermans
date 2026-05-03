import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { Logo } from "@/components/shared/Logo"

const SECTION_KEYS = ["controller", "what", "legal", "subprocessors", "retention", "rights", "changes"] as const

export function PrivacyPolicy(): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="border-b border-border/50 bg-background">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <a className="inline-flex items-center gap-2.5" href="/">
            <Logo className="size-6 text-primary" />
            <span className="font-display text-base font-bold uppercase tracking-[0.18em]">
              SORUN
            </span>
          </a>
          <a
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            href="/"
          >
            <ArrowLeft className="size-4" />
            Home
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <h1 className="font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
          {t("privacy.title")}
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {t("privacy.updated")}
        </p>
        <p className="mt-8 text-base leading-7 text-foreground sm:text-lg">{t("privacy.intro")}</p>
        <div className="mt-12 space-y-10">
          {SECTION_KEYS.map((key) => (
            <section key={key}>
              <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                {t(`privacy.sections.${key}.heading`)}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {t(`privacy.sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>
      </main>
      <footer className="border-t border-border/50 px-6 py-10">
        <p className="mx-auto max-w-3xl text-xs text-muted-foreground">
          {t("footer.copyright")}
        </p>
      </footer>
    </div>
  )
}
