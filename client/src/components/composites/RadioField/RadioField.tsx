import type { ComponentProps } from "react"

import Radio from "@components/elements/Radio"

import styles from "./RadioField.module.css"

type RadioFieldProps = Omit<ComponentProps<"input">, "type" | "className"> & {
  label: string
}

export default function RadioField({ label, ...rest }: RadioFieldProps) {
  return (
    <label className={styles.radioField}>
      <Radio {...rest} />
      {label}
    </label>
  )
}
