import process from "node:process"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Each target is a folder in src/entries; index.html reads the variable to pick its script
const targets = ["main", "maintenance"]
const target = (process.env.VITE_BUILD_TARGET ??= "main")

if (!targets.includes(target)) {
  throw new Error(`Unknown VITE_BUILD_TARGET: ${target}`)
}

export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  build: { outDir: `dist/${target}` },
})
