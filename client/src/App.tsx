import Button from "@components/elements/Button"
import useTheme from "@hooks/useTheme"

export default function App() {
  const { theme, setTheme } = useTheme()

  function handleThemeToggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        textAlign: "center",
      }}
    >
      <div>
        <h1>Ryan Murphy</h1>
        <Button onClick={handleThemeToggle}>
          Theme: {theme}
        </Button>
      </div>
    </main>
  )
}
