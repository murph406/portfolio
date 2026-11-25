import Button from "@components/elements/Button"
import useTheme from "@hooks/useTheme"

import styles from "./Home.module.css"

export default function Home() {
  const { theme, setTheme } = useTheme()

  function handleThemeToggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <main className={styles.page}>
      <div>
        <h1 className={styles.title}>Ryan Murphy</h1>
        <Button className={styles.toggle} onClick={handleThemeToggle}>
          Theme: {theme}
        </Button>
      </div>
    </main>
  )
}
