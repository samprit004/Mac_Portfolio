import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Dock from './Dock'
import { locations } from '#constants/index.js'
import useDeviceMode from '#/hooks/useDeviceMode.js'
import useMobileWindowStore from '#store/mobileWindow.js'

/* ── Same font-weight animation as Welcome.jsx, adapted for touch ── */
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 100, max: 800, default: 300 },
}

const MOBILE_FINDER_TABS = [
  {
    id: 'work',
    label: 'Work',
    icon: '/icons/work.svg',
    screen: { id: 'work', title: 'Work', component: 'finder', props: { location: 'work' } },
  },
  {
    id: 'about',
    label: 'About Me',
    icon: '/icons/info.svg',
    screen: { id: 'about', title: 'About Me', component: 'finder', props: { location: 'about' } },
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: '/icons/skills.svg',
    screen: { id: 'skills', title: 'Skills', component: 'skills', props: {} },
  },
]

const getIsPortrait = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(orientation: portrait)').matches
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

  const onMouseMove = (e) => applyAt(e.clientX)
  const onTouchMove = (e) => applyAt(e.touches[0].clientX)

  container.addEventListener('mousemove', onMouseMove)
  container.addEventListener('mouseleave', reset)
  container.addEventListener('touchmove', onTouchMove, { passive: true })
  container.addEventListener('touchend', reset)

  return () => {
    container.removeEventListener('mousemove', onMouseMove)
    container.removeEventListener('mouseleave', reset)
    container.removeEventListener('touchmove', onTouchMove)
    container.removeEventListener('touchend', reset)
  }
}

/* ── Component ── */
const MobileHomeScreen = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const { isTablet } = useDeviceMode()
  const openMobileWindow = useMobileWindowStore((state) => state.open)
  const [isPortrait, setIsPortrait] = useState(getIsPortrait)

  const tabletProjects = useMemo(
    () => (locations.work?.children ?? []).filter((item) => item.kind === 'folder').slice(0, 3),
    []
  )

  const resumeShortcut = useMemo(() => ({
    id: 'resume-shortcut',
    name: locations.resume?.children?.[0]?.name ?? 'Resume.pdf',
    icon: locations.resume?.children?.[0]?.icon ?? '/images/pdf.png',
  }), [])

  const showTabletShortcuts = isTablet && isPortrait

  /* Animated text */
  useGSAP(() => {
    const c1 = setupTextInteraction(subtitleRef.current, 'subtitle')
    const c2 = setupTextInteraction(titleRef.current, 'title')
    return () => { c1?.(); c2?.() }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(orientation: portrait)')
    const updateOrientation = () => setIsPortrait(mediaQuery.matches)

    updateOrientation()
    mediaQuery.addEventListener?.('change', updateOrientation)
    window.addEventListener('resize', updateOrientation)

    return () => {
      mediaQuery.removeEventListener?.('change', updateOrientation)
      window.removeEventListener('resize', updateOrientation)
    }
  }, [])

  const handleProjectShortcut = (project) => {
    openMobileWindow({
      initialScreen: {
        id: `project-${project.id}`,
        title: project.name,
        component: 'project',
        props: { project },
      },
      footerTabs: MOBILE_FINDER_TABS,
      activeTabId: 'work',
    })
  }

  const handleResumeShortcut = () => {
    openMobileWindow({
      initialScreen: {
        id: 'resume',
        title: resumeShortcut.name,
        component: 'resume',
        props: {},
      },
      footerTabs: [],
      activeTabId: null,
    })
  }

  return (
    <section id="mobile-home">
      {/* Content area — relative so absolute icons are scoped here */}
      <div className={`mobile-content-area ${showTabletShortcuts ? 'mobile-content-area--tablet-layout' : ''}`}>
        {showTabletShortcuts && (
          <div className="mobile-tablet-shortcuts" aria-label="Tablet shortcuts">
            <div className="mobile-tablet-shortcut-column mobile-tablet-shortcut-column--projects">
              {tabletProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className="mobile-tablet-shortcut"
                  onClick={() => handleProjectShortcut(project)}
                  aria-label={project.name}
                >
                  <img
                    src={project.icon ?? '/images/folder.png'}
                    alt=""
                    className="mobile-tablet-shortcut-icon"
                  />
                  <span className="mobile-tablet-shortcut-label">{project.name}</span>
                </button>
              ))}
            </div>

            <div className="mobile-tablet-shortcut-column mobile-tablet-shortcut-column--resume">
              <button
                type="button"
                className="mobile-tablet-shortcut"
                onClick={handleResumeShortcut}
                aria-label={resumeShortcut.name}
              >
                <img
                  src={resumeShortcut.icon}
                  alt=""
                  className="mobile-tablet-shortcut-icon"
                />
                <span className="mobile-tablet-shortcut-label">{resumeShortcut.name}</span>
              </button>
            </div>
          </div>
        )}

        {/* Animated welcome text */}
        <div className="mobile-welcome">
          <p ref={subtitleRef} className="mobile-welcome-sub">
            {renderText("Hey, It's Samprit! Welcome to my", 'text-sm', 100)}
          </p>
          <h1 ref={titleRef} className="mobile-welcome-title mt-3">
            {renderText('Portfolio', 'text-6xl tracking-[0.08em] italic', 300)}
          </h1>
        </div>
      </div>

      {/* Search pill */}
      {/* <div className="mobile-search-wrap">
        <button className="mobile-search-pill" aria-label="Search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="10" cy="10" r="7"/>
            <line x1="15" y1="15" x2="21" y2="21"/>
          </svg>
          <span>Search</span>
        </button>
      </div> */}

      {/* Dock */}
      <div className="mobile-dock">
        <Dock mobile />
      </div>
    </section>
  )
}

export default MobileHomeScreen
