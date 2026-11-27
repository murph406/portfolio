import type { ComponentProps } from "react"

type ButtonProps = ComponentProps<"button">

export default function Button({ type = "button", ...rest }: ButtonProps) {
  return <button type={type} {...rest} />
}
