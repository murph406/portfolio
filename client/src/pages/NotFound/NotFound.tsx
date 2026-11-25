import { Link } from "react-router"

import s from "./NotFound.module.css"

export default function NotFound() {
  return (
    <div className={s.page}>
      <div>
        <h1 className={s.code}>404</h1>
        <p className={s.message}>Page not found</p>
        <Link className={s.link} to="/">Back to home</Link>
      </div>
    </div>
  )
}
