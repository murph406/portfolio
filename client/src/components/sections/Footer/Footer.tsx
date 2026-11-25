import LogoField from "@components/composites/LogoField"

import s from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={s.footer}>
      <LogoField className={s.brand} />
    </footer>
  )
}
