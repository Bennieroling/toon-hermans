import { Moon, Sun } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  mobile?: boolean
}

export function ThemeToggle({ mobile = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === "dark"

  return (
    <button
      aria-label={isDark ? t("theme.toggle_light") : t("theme.toggle_dark")}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-border bg-background text-foreground outline-none transition hover:border-primary/40 hover:bg-accent/40",
        mobile ? "h-12 w-full gap-2 rounded-2xl px-4" : "size-11",
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      {isDark ? <Sun className="size-4 text-primary" /> : <Moon className="size-4 text-primary" />}
      {mobile ? (
        <span className="text-sm font-medium">
          {isDark ? t("theme.toggle_light") : t("theme.toggle_dark")}
        </span>
      ) : null}
    </button>
  )
}
