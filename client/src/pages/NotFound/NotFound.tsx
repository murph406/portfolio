import { Link } from "react-router"

import styles from "./NotFound.module.css"

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>Page not found</p>
        <Link className={styles.link} to="/">Back to home</Link>
      </div>
    </main>
  )
}
