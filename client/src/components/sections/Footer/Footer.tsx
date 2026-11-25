import s from "./Footer.module.css"

const NAME = "Ryan Murphy"

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.brand}>
        <img className={s.logo} src="/favicon/apple-touch-icon.png" alt={NAME} />
        <span className={s.caption}>portfolio</span>
      </div>
    </footer>
  )
}
