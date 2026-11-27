import s from "./Hero.module.css"

export default function Hero() {

  return (
    <section className={s.hero}>
      <div>
        <h1 className={s.title}>Ryan Murphy</h1>
        <p>
          Full stack software engineer with 5+ years of experience shipping multi-tenant SaaS
          platforms, cross-platform mobile apps, and scalable cloud infrastructure.
        </p>
      </div>
    </section>
  )
}
