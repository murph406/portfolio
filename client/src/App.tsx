import Button from "@components/elements/Button"
import useTheme from "@hooks/useTheme"

export default function App() {
  const { theme, setTheme } = useTheme()

  function handleThemeToggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <main>
      <div>
        <h1>Hello World</h1>
        <Button onClick={handleThemeToggle}>
          Theme: {theme}
        </Button>
      </div>
    </main>
  )
}
