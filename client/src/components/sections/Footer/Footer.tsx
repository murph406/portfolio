import LogoField from "@components/composites/LogoField"

import s from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={s.footer}>
      <LogoField className={s.brand} />
      <p className={s.tagline}>
        Full stack engineer building SaaS platforms, mobile apps, and cloud infrastructure.
      </p>
    </footer>
  )
}
