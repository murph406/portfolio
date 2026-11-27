import LogoField from "@components/composites/LogoField"

import s from "./Maintenance.module.css"

export default function Maintenance() {
  return (
    <>
      <title>Maintenance | Ryan Murphy</title>
      <main className={s.page}>
        <LogoField />
        <p className={s.message}>Down for maintenance. Back soon.</p>
      </main>
    </>
  )
}
