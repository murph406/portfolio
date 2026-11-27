import type { ComponentProps } from "react"

import s from "./Logo.module.css"

type LogoProps = ComponentProps<"svg">

export default function Logo({ className, ...rest }: LogoProps) {
  const classes = [s.logo, className].filter(Boolean).join(" ")

  return (
    <svg className={classes} viewBox="0 0 100 100" role="img" {...rest}>
      <rect className={s.square} width="100" height="100" />
      <text className={s.letters} x="51" y="50" textAnchor="middle" dominantBaseline="central">
        RM
      </text>
    </svg>
  )
}
