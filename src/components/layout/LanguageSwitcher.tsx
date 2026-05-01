import { Check, ChevronDown, Languages } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const languages = [
  { code: "en", label: "EN" },
  { code: "nl", label: "NL" },
  { code: "es", label: "ES" },
] as const

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { i18n } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Switch language"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground outline-none transition hover:border-primary/40 hover:bg-accent/40",
            mobile && "w-full justify-between rounded-2xl px-4 py-3",
          )}
          type="button"
        >
          <span className="inline-flex items-center gap-2">
            <Languages className="size-4 text-primary" />
            {i18n.language.toUpperCase()}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32 shadow-xl shadow-black/30" sideOffset={10}>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onSelect={() => {
              i18n.changeLanguage(language.code)
              if (typeof window !== "undefined") {
                window.localStorage.setItem("sorun-language", language.code)
              }
            }}
          >
            <span>{language.label}</span>
            {i18n.language === language.code ? <Check className="size-4 text-primary" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
