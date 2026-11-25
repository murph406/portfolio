import { useRef } from "react"

import { Link } from "react-router"

import useScrollShrink from "@hooks/useScrollShrink"

import s from "./Header.module.css"

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  useScrollShrink(headerRef)

  return (
    <header ref={headerRef} className={s.header}>
      <div className={s.backdrop} />
      <div className={s.content}>
        <Link className={s.homeLink} to="/">
          <img className={s.logo} src="/favicon/apple-touch-icon.png" alt="Ryan Murphy, home" />
        </Link>
      </div>
    </header>
  )
}
