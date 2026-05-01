import { Menu } from "lucide-react"
import { useTranslation } from "react-i18next"

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navItems } from "@/lib/utils"

export function MobileMenu() {
  const { t } = useTranslation()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label={t("nav.menu_toggle")}
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground md:hidden"
          type="button"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <div className="mt-14 flex h-full flex-col">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <SheetClose asChild key={item.key}>
                <a
                  className="rounded-2xl px-4 py-4 text-lg font-semibold text-foreground transition hover:bg-accent/60"
                  href={item.href}
                >
                  {t(`nav.${item.key}`)}
                </a>
              </SheetClose>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <ThemeToggle mobile />
            <LanguageSwitcher mobile />
            <Button asChild className="w-full justify-center" size="lg">
              <a href="#contact">{t("nav.cta")}</a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
