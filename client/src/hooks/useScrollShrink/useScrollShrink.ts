import { type RefObject, useEffect } from "react"


const SCROLL_RANGE = 350 // Scroll distance, in px, to go from full size to fully shrunk
const EASE_MS = 80 // Time constant of the easing, in ms
const DURATION_MS = 1000 // Must match the animation-duration of the animations being scrubbed

function getScrollY() {
  // Clamped to ignore rubber-band bounce past either end of the page
  const maxY = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(Math.max(window.scrollY, 0), Math.max(maxY, 0))
}

/*
 * Scrubs the paused CSS animations inside `ref` by scroll movement:
 * scrolling down advances them, scrolling up rewinds them.
 */
export default function useScrollShrink(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let lastY = getScrollY()
    let target = 0
    let current = 0
    let frame = 0
    let lastTime = 0

    function render(time: number) {
      const elapsed = Math.max(time - lastTime, 0)
      lastTime = time

      const ease = reducedMotion.matches ? 1 : 1 - Math.exp(-elapsed / EASE_MS)
      current += (target - current) * ease
      if (Math.abs(target - current) < 0.001) current = target

      element!.getAnimations({ subtree: true }).forEach((animation) => {
        animation.currentTime = current * DURATION_MS
      })

      frame = current === target ? 0 : requestAnimationFrame(render)
    }

    function handleScroll() {
      const y = getScrollY()
      target = Math.min(Math.max(target + (y - lastY) / SCROLL_RANGE, 0), 1)
      lastY = y

      if (frame || current === target) return
      lastTime = performance.now()
      frame = requestAnimationFrame(render)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [ref])
}
