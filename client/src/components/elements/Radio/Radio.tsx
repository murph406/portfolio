import type { ComponentProps } from "react"

import s from "./Radio.module.css"

type RadioProps = Omit<ComponentProps<"input">, "type">

export default function Radio({ className, ...rest }: RadioProps) {
  const classes = [s.radio, className].filter(Boolean).join(" ")

  return <input type="radio" className={classes} {...rest} />
}
