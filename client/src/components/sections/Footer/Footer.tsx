import logo from "@assets/logos/logo-white.png"

import s from "./Footer.module.css"

const EMAIL = "ryanmurphy@mymail.com"
const NAME = "Ryan Murphy"

export default function Footer() {
  return (
    <footer className={s.footer}>
      <address className={s.contact}>
        <img className={s.logo} src={logo} alt={NAME} />

        <p className={s.label}>Email</p>
        <a className={s.email} href={`mailto:${EMAIL}`}>{EMAIL}</a>
        
      </address>
    </footer>
  )
}

