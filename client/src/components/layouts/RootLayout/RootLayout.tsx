import { Outlet } from "react-router"

import Footer from "@components/sections/Footer"
import Header from "@components/sections/Header"

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
