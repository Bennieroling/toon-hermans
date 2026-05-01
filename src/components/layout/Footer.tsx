import { Mail } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Logo } from "@/components/shared/Logo"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-card px-4 py-16 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="size-8 text-primary" />
              <span className="font-display text-xl font-black uppercase tracking-[0.18em] text-foreground">
                {t("footer.brand")}
              </span>
            </div>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <div className="mt-6">
              <a
                aria-label={t("footer.social_email")}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                href="mailto:hello@sorun.dev"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
          <div className="lg:justify-self-end">
            <h3 className="text-sm font-bold uppercase tracking-[0.28em] text-foreground/80">
              {t("nav.brand")}
            </h3>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              <li>
                <a className="transition hover:text-primary" href="#layers">
                  {t("footer.links.expertise")}
                </a>
              </li>
              <li>
                <a className="transition hover:text-primary" href="#process">
                  {t("footer.links.process")}
                </a>
              </li>
              <li>
                <a className="transition hover:text-primary" href="#pricing">
                  {t("footer.links.pricing")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{t("footer.copyright")}</p>
          <a className="transition hover:text-primary" href="mailto:hello@sorun.dev">
            hello@sorun.dev
          </a>
        </div>
      </div>
    </footer>
  )
}
