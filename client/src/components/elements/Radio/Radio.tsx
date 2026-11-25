import type { ComponentProps } from "react"

import styles from "./Radio.module.css"

type RadioProps = Omit<ComponentProps<"input">, "type">

export default function Radio({ className, ...rest }: RadioProps) {
  const classes = [styles.radio, className].filter(Boolean).join(" ")

  return <input type="radio" className={classes} {...rest} />
}
