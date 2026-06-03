import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import lottie from 'lottie-web'

const ANIMATION_PATH = '/intro/e2164f16-117d-11ee-b961-c7db19038f49.json'
const SPEED = 1.5
const MIN_VISIBLE_MS = 500   // always stay visible at least this long
const HOLD_AFTER_DONE_MS = 0  // extra pause on the final frame before sliding away
const FALLBACK_MS = 30000        // fire if lottie never emits complete

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  const overlayRef = useRef(null)
  const glassRef = useRef(null)
  const animRef = useRef(null)
  const revealedRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    let instance = null
    let holdTimer = null
    let fallbackTimer = null
    const startTime = Date.now()

    function runReveal() {
      if (cancelled || revealedRef.current || !overlayRef.current) return
      revealedRef.current = true

      gsap.timeline({ onComplete: () => setVisible(false) })
        .to(animRef.current,    { y: -72, scale: 0.9, opacity: 0.4, duration: 0.7, ease: 'power2.inOut' })
        .to(glassRef.current,   { yPercent: -108, duration: 1.05, ease: 'power4.inOut' }, 0.08)
        .to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0.72)
    }

    function scheduleReveal() {
      if (cancelled || revealedRef.current) return
      clearTimeout(fallbackTimer)
      holdTimer = setTimeout(runReveal, HOLD_AFTER_DONE_MS)
    }

    function onAnimationComplete() {
      // Respect the minimum visible time even if the animation is very short
      const elapsed = Date.now() - startTime
      const delay = Math.max(0, MIN_VISIBLE_MS - elapsed)
      setTimeout(scheduleReveal, delay)
    }

    fetch(ANIMATION_PATH)
      .then(r => r.json())
      .then(data => {
        if (cancelled || !animRef.current) return

        instance = lottie.loadAnimation({
          container: animRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: data,
        })

        instance.setSpeed(SPEED)
        instance.addEventListener('complete', onAnimationComplete)

        // Only fires if lottie never emits complete — true last resort
        fallbackTimer = setTimeout(onAnimationComplete, FALLBACK_MS)
      })
      .catch(() => {
        // Animation failed to load — just reveal after a short pause
        if (!cancelled) setTimeout(runReveal, 1200)
      })

    return () => {
      cancelled = true
      clearTimeout(holdTimer)
      clearTimeout(fallbackTimer)
      instance?.removeEventListener('complete', onAnimationComplete)
      instance?.destroy()
    }
  }, [])

  if (!visible) return null

  return (
    <div ref={overlayRef} id="intro-overlay" role="presentation" aria-hidden="true">
      <div ref={glassRef} className="intro-glass">
        <div className="intro-glass-highlight" />
        <div ref={animRef} className="intro-animation-wrap intro-animation" />
      </div>
    </div>
  )
}
