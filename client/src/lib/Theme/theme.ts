// The data-theme attribute on <html> is the source of truth.
// public/theme-toggle.js sets it before first paint and must use the same storage key.
export type Theme = "light" | "dark"

const storageKey = "theme-preference"
const listeners = new Set<() => void>()

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light"
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(storageKey, theme)
  } catch {
  }

  listeners.forEach((listener) => listener())
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  
  return () => {
    listeners.delete(listener)
  }
}
