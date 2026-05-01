import { useEffect, useMemo, useState, type ReactNode } from "react"

import { ThemeContext, type Theme } from "./theme-context"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("sorun-theme")
      if (stored === "light" || stored === "dark") {
        return stored
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    return "dark"
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    window.localStorage.setItem("sorun-theme", theme)
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
