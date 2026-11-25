import type { ComponentProps } from "react"

import Checkbox from "@components/elements/Checkbox"

import styles from "./CheckboxField.module.css"

type CheckboxFieldProps = Omit<ComponentProps<"input">, "type" | "className"> & {
  label: string
}

export default function CheckboxField({ label, ...rest }: CheckboxFieldProps) {
  return (
    <label className={styles.checkboxField}>
      <Checkbox {...rest} />
      {label}
    </label>
  )
}
