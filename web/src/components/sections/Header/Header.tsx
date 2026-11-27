import { useRef } from "react"

import LogoField from "@components/composites/LogoField"
import useHandleNavigate from "@hooks/useHandleNavigate"
import useScrollShrink from "@hooks/useScrollShrink"

import s from "./Header.module.css"

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  useScrollShrink(headerRef)

  const handleNavigate = useHandleNavigate()

  return (
    <header ref={headerRef} className={s.header}>
      <div className={s.backdrop} />
      <div className={s.content}>
        <button
          type="button"
          role="link"
          className={s.homeLink}
          aria-label="Ryan Murphy portfolio, home"
          onClick={handleNavigate("/")}>
          <LogoField />
        </button>
      </div>
    </header>
  )
}
