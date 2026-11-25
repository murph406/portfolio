import useTheme from "../../../hooks/useTheme";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Theme: {theme}
    </button>
  );
}
