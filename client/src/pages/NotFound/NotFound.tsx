import { Link } from "react-router"

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        textAlign: "center",
      }}
    >
      <div>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">Back to home</Link>
      </div>
    </main>
  )
}
