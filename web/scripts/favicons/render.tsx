// The page generate.mjs screenshots: the Logo alone, filling the viewport
import { createRoot } from "react-dom/client"

import Logo from "@components/elements/Logo"

import "@/styles/global/index.css"
import s from "./render.module.css"

createRoot(document.getElementById("root")!).render(<Logo className={s.icon} />)
