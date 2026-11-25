import type { ComponentProps } from "react"

import Checkbox from "@components/elements/Checkbox"

import s from "./CheckboxField.module.css"

type CheckboxFieldProps = Omit<ComponentProps<"input">, "type" | "className"> & {
  label: string
}

export default function CheckboxField({ label, ...rest }: CheckboxFieldProps) {
  return (
    <label className={s.checkboxField}>
      <Checkbox {...rest} />
      {label}
    </label>
  )
}
