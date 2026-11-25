import { useSyncExternalStore } from "react"

import { getTheme, setTheme, subscribe } from "@lib/Theme"

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme)
  return { theme, setTheme }
}
