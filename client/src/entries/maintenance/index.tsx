import { StrictMode } from "react"

import { createRoot } from "react-dom/client"

import Maintenance from "@pages/Maintenance"

import "@/styles/global/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Maintenance />
  </StrictMode>,
)
