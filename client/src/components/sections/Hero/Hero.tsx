import Button from "@components/elements/Button"
import useTheme from "@hooks/useTheme"

import s from "./Hero.module.css"

export default function Hero() {
  const { theme, setTheme } = useTheme()

  function handleThemeToggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <section className={s.hero}>
      <div>
        <h1 className={s.title}>Ryan Murphy</h1>
        <Button className={s.toggle} onClick={handleThemeToggle}>
          Theme: {theme}
        </Button>
      </div>
    </section>
  )
}
