import Footer from "@components/sections/Footer"
import Header from "@components/sections/Header"
import Hero from "@components/sections/Hero"
import ThemeSection from "@components/sections/ThemeSection"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ThemeSection />
      </main>
      <Footer />
    </>
  )
}
