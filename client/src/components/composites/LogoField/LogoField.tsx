import Logo from "@components/elements/Logo"

import s from "./LogoField.module.css"

type LogoFieldProps = {
  className?: string
}

export default function LogoField({ className }: LogoFieldProps) {
  const classes = [s.logoField, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <Logo className={s.logo} aria-hidden="true" />
      <span className={s.caption}>portfolio</span>
    </div>
  )
}
