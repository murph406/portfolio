import Button from "@components/elements/Button"
import useTheme from "@hooks/useTheme"

import styles from "./Hero.module.css"

export default function Hero() {
  const { theme, setTheme } = useTheme()

  function handleThemeToggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <section className={styles.hero}>
      <div>
        <h1 className={styles.title}>Ryan Murphy</h1>
        <Button className={styles.toggle} onClick={handleThemeToggle}>
          Theme: {theme}
        </Button>
      </div>
    </section>
  )
}
