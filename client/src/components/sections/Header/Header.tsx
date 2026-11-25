import { useRef } from "react"

import useScrollShrink from "@hooks/useScrollShrink"

import s from "./Header.module.css"

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  useScrollShrink(headerRef)

  return (
    <header ref={headerRef} className={s.header}>
      <div className={s.glass} />
      <div className={s.inner}>
        <img className={s.logo} src="/favicon/apple-touch-icon.png" alt="Ryan Murphy" />
      </div>
    </header>
  )
}
