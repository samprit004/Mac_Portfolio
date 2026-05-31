import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'
import { locations } from '#constants/index.js'
import useMobileWindowStore from '#store/mobileWindow.js'
import Dock from './Dock'

/* ── Same font-weight animation as Welcome.jsx, adapted for touch ── */
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title:    { min: 100, max: 800, default: 300 },
}

const renderText = (text, className, baseweight = 300) =>
  [...text].map((char, i) => (
    <span
      key={i}
      className={`font-inter ${className}`}
      style={{ fontVariationSettings: `'wght' ${baseweight}` }}
    >
      {char === ' ' ? ' ' : char}
    </span>
  ))

const setupTextInteraction = (container, type) => {
  if (!container) return
  const letters = container.querySelectorAll('span')
  const { max, default: baseweight } = FONT_WEIGHTS[type]

  const animate = (letter, weight) =>
    gsap.to(letter, { fontVariationSettings: `'wght' ${weight}`, duration: 0.25, ease: 'power2.Out' })

  const applyAt = (x) => {
    const { left } = container.getBoundingClientRect()
    letters.forEach(letter => {
      const { left: lLeft, width } = letter.getBoundingClientRect()
      const dist = Math.abs(x - left - (lLeft - left + width / 2))
      const intensity = Math.exp(-(dist ** 2) / 3000)
      animate(letter, baseweight + (max - baseweight) * intensity)
    })
  }

  const reset = () => letters.forEach(l => animate(l, baseweight))

  const onMouseMove  = (e) => applyAt(e.clientX)
  const onTouchMove  = (e) => applyAt(e.touches[0].clientX)

  container.addEventListener('mousemove',  onMouseMove)
  container.addEventListener('mouseleave', reset)
  container.addEventListener('touchmove',  onTouchMove, { passive: true })
  container.addEventListener('touchend',   reset)

  return () => {
    container.removeEventListener('mousemove',  onMouseMove)
    container.removeEventListener('mouseleave', reset)
    container.removeEventListener('touchmove',  onTouchMove)
    container.removeEventListener('touchend',   reset)
  }
}

/* ── Desktop items — same data as Home.jsx ── */
const projects = locations.work?.children ?? []
const resumeShortcut = {
  id: 'resume-shortcut',
  name: locations.resume.children?.[0]?.name ?? 'Resume.pdf',
  icon: locations.resume.children?.[0]?.icon ?? '/images/pdf.png',
  type: 'resume',
}
const desktopItems = [...projects, resumeShortcut]

/* One item per corner — top items pushed below the 36 px status bar */
const MOBILE_POS = {
  5:                'top-14   left-4',
  6:                'top-14   right-4',
  7:                'bottom-4 left-4',
  'resume-shortcut':'bottom-4 right-4',
}

/* ── Component ── */
const MobileHomeScreen = () => {
  const { open: openMobileWindow } = useMobileWindowStore()
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)

  const openMobileItem = (item) => {
    if (!item) return

    if (item.type === 'resume') {
      openMobileWindow({
        initialScreen: { id: 'resume', title: 'Resume.pdf', component: 'resume', props: {} },
        footerTabs: [],
        activeTabId: null,
      })
      return
    }

    openMobileWindow({
      initialScreen: {
        id: `proj-${item.id}`,
        title: item.name,
        component: 'project',
        props: { project: item },
      },
      footerTabs: [],
      activeTabId: null,
    })
  }

  /* Animated text */
  useGSAP(() => {
    const c1 = setupTextInteraction(subtitleRef.current, 'subtitle')
    const c2 = setupTextInteraction(titleRef.current,    'title')
    return () => { c1?.(); c2?.() }
  }, [])

  /* Draggable folders — distinct class from desktop '.folder' */
  useGSAP(() => {
    const itemsById = new Map(desktopItems.map((item) => [String(item.id), item]))

    const draggables = Draggable.create('.mob-folder', {
      minimumMovement: 8,
      onPress()   { this.target.dataset.dragging = 'false' },
      onDrag()    { this.target.dataset.dragging = 'true' },
      onRelease() {
        const shouldOpen = this.target.dataset.dragging !== 'true'
        const itemId = this.target.dataset.mobItem

        requestAnimationFrame(() => {
          this.target.dataset.dragging = 'false'
        })

        if (shouldOpen) {
          openMobileItem(itemsById.get(String(itemId)))
        }
      },
    })

    return () => {
      draggables.forEach((draggable) => draggable.kill())
    }
  }, [])

  return (
    <section id="mobile-home">
      {/* Content area — relative so absolute icons are scoped here */}
      <div className="mobile-content-area">
        {/* Animated welcome text */}
        <div className="mobile-welcome">
          <p ref={subtitleRef} className="mobile-welcome-sub">
            {renderText("Hey, It's Samprit! Welcome to my", 'text-sm', 100)}
          </p>
          <h1 ref={titleRef} className="mobile-welcome-title mt-3">
            {renderText('Portfolio', 'text-6xl tracking-[0.08em] italic', 300)}
          </h1>
        </div>

        {/* Draggable desktop-style icons */}
        {desktopItems.map((item) => (
          <div
            key={item.id}
            data-mob-item={item.id}
            className={`mob-folder group absolute flex flex-col items-center select-none ${MOBILE_POS[item.id] ?? 'top-[10vh] left-6'}`}
          >
            <img
              src={item.icon ?? '/images/folder.png'}
              alt={item.name}
              className="w-16 h-16 object-contain group-hover:bg-gray-950/10 p-1 rounded-md"
            />
            <p className="text-xs text-white text-center px-1 rounded-md mt-1 group-hover:bg-blue-500 transition-colors max-w-[80px] leading-tight">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* Search pill */}
      <div className="mobile-search-wrap">
        <button className="mobile-search-pill" aria-label="Search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="10" cy="10" r="7"/>
            <line x1="15" y1="15" x2="21" y2="21"/>
          </svg>
          <span>Search</span>
        </button>
      </div>

      {/* Dock */}
      <div className="mobile-dock">
        <Dock mobile />
      </div>
    </section>
  )
}

export default MobileHomeScreen
