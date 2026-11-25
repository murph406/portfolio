import type { ComponentProps } from "react"

import styles from "./Checkbox.module.css"

type CheckboxProps = Omit<ComponentProps<"input">, "type">

export default function Checkbox({ className, ...rest }: CheckboxProps) {
  const classes = [styles.checkbox, className].filter(Boolean).join(" ")

  return <input type="checkbox" className={classes} {...rest} />
}
