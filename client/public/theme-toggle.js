// Loaded as a blocking script in <head> so the theme is set before first paint.
(() => {
  let theme = null
  try {
    theme = localStorage.getItem("theme-preference")
  } catch {
    // Storage can be blocked; fall back to the OS preference.
  }

  if (theme !== "light" && theme !== "dark") {
    theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  document.documentElement.setAttribute("data-theme", theme)
})()
