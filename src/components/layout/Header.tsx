import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { MobileMenu } from "@/components/layout/MobileMenu"
import { Logo } from "@/components/shared/Logo"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { useScrollSpy } from "@/hooks/useScrollSpy"
import { cn, navItems, sectionIds } from "@/lib/utils"

export function Header() {
  const { t } = useTranslation()
  const activeSection = useScrollSpy(sectionIds)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-4 py-4 lg:px-6">
      <div
        className={cn(
          "glass mx-auto flex h-20 max-w-7xl items-center justify-between rounded-3xl px-5 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)_saturate(180%)] transition-all duration-300 lg:px-8",
          scrolled && "shadow-xl shadow-black/10 dark:shadow-black/25",
        )}
      >
        <a className="inline-flex items-center gap-3" href="#hero">
          <Logo className="size-8 text-primary" />
          <span className="font-display text-lg font-black uppercase tracking-[0.16em]">
            {t("nav.brand")}
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const active = activeSection === item.sectionId

            return (
              <a
                className={cn(
                  "group relative text-sm font-medium text-muted-foreground transition hover:text-foreground",
                  active && "text-foreground",
                )}
                href={item.href}
                key={item.key}
              >
                {t(`nav.${item.key}`)}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-0.5 rounded-full bg-primary transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </a>
            )
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild>
            <a href="#contact">
              {t("nav.cta")}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
        <MobileMenu />
      </div>
    </header>
  )
}
