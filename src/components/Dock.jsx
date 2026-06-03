import { useState, useRef } from 'react'
import { dockApps, locations } from '#constants/index.js'
import { Tooltip } from 'react-tooltip'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useWindowStore from '#store/Window.js'
import useLocationStore from '#/store/location'
import useMobileWindowStore from '#store/mobileWindow.js'

const FINDER_MOBILE_CONFIG = {
  initialScreen: { id: 'work', title: 'Work', component: 'finder', props: { location: 'work' } },
  footerTabs: [
    { id: 'work',   label: 'Work',     icon: '/icons/work.svg',   screen: { id: 'work',   title: 'Work',     component: 'finder', props: { location: 'work' } } },
    { id: 'about',  label: 'About Me', icon: '/icons/info.svg',   screen: { id: 'about',  title: 'About Me', component: 'finder', props: { location: 'about' } } },
    { id: 'skills', label: 'Skills',   icon: '/icons/skills.svg', screen: { id: 'skills', title: 'Skills',   component: 'skills', props: {} } },
  ],
  activeTabId: 'work',
}

const SAFARI_MOBILE_CONFIG = {
  initialScreen: { id: 'safari', title: 'Safari', component: 'safari', props: {} },
  footerTabs: [],
  activeTabId: null,
}

const CONTACT_MOBILE_CONFIG = {
  initialScreen: { id: 'contact', title: 'Contacts', component: 'contact', props: {} },
  footerTabs: [],
  activeTabId: null,
}

const PHOTOS_MOBILE_CONFIG = {
  initialScreen: { id: 'photos', title: 'Gallery', component: 'photos', props: {} },
  footerTabs: [],
  activeTabId: null,
}

const MOBILE_DOCK_IDS = ['finder', 'safari', 'photos', 'contact']
const mobileDockApps = dockApps.filter(app => MOBILE_DOCK_IDS.includes(app.id))

const Dock = ({ mobile = false }) => {
  const { openWindow, closeWindow, windows } = useWindowStore()
  const { activeLocation, setActiveLocation } = useLocationStore()
  const openMobileWindow = useMobileWindowStore((s) => s.open)
  const [hoveredAppId, setHoveredAppId] = useState(null)
  const dockRef = useRef(null)

  useGSAP(() => {
    const dock = dockRef.current
    if (!dock) return

    const icons = dock.querySelectorAll('.dock-icon')

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect()
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect()
        const center = iconLeft - left + width / 2
        const distance = Math.abs(mouseX - center)
        const intensity = Math.exp(-(distance ** 2.5) / 10000)
        gsap.to(icon, { scale: 1 + 0.25 * intensity, y: -15 * intensity, duration: 0.2, ease: 'power1.Out' })
      })
    }

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect()
      animateIcons(e.clientX - left)
    }

    const resetIcons = () => {
      icons.forEach((icon) => gsap.to(icon, { scale: 1, y: 0, duration: 0.3 }))
    }

    dock.addEventListener('mousemove', handleMouseMove)
    dock.addEventListener('mouseleave', resetIcons)
    return () => {
      dock.removeEventListener('mousemove', handleMouseMove)
      dock.removeEventListener('mouseleave', resetIcons)
    }
  }, [])

  const toggleApp = (id) => {
    if (id === 'trash') {
      if (windows.finder?.isOpen && activeLocation?.id === locations.trash.id) {
        closeWindow('finder')
        return
      }
      setActiveLocation(locations.trash)
      openWindow('finder')
      return
    }
    const win = windows[id]
    if (!win) return
    if (win.isOpen) closeWindow(id)
    else openWindow(id)
  }

  /* ── Mobile variant — rendered inside MobileHomeScreen ── */
  if (mobile) {
    const MOBILE_CONFIGS = {
      finder:  FINDER_MOBILE_CONFIG,
      safari:  SAFARI_MOBILE_CONFIG,
      contact: CONTACT_MOBILE_CONFIG,
      photos:  PHOTOS_MOBILE_CONFIG,
    }

    const handleMobileTap = (id) => {
      if (MOBILE_CONFIGS[id]) {
        openMobileWindow(MOBILE_CONFIGS[id])
        return
      }
      toggleApp(id)
    }

    return (
      <div className="mobile-dock-inner">
        {mobileDockApps.map(({ id, name, icon }) => {
          const src = `/images/${icon}`
          return (
            <button
              key={id}
              className="mobile-dock-icon"
              onClick={() => handleMobileTap(id)}
              aria-label={name}
            >
              <img src={src} alt={name} />
            </button>
          )
        })}
      </div>
    )
  }

  /* ── Desktop variant ── */
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div
            key={id ?? name}
            className={`relative flex justify-center ${id === 'photos' ? 'dock-divider-before' : ''}`}
          >
            <div
              id={`dock-app-${id}`}
              className="flex justify-center"
              onMouseEnter={() => setHoveredAppId(id)}
              onMouseLeave={() => setHoveredAppId((cur) => (cur === id ? null : cur))}
              onFocus={() => setHoveredAppId(id)}
              onBlur={() => setHoveredAppId((cur) => (cur === id ? null : cur))}
            >
              <button
                id={`dock-icon-${id}`}
                type="button"
                className="dock-icon"
                aria-label={name}
                disabled={!canOpen}
                onClick={() => toggleApp(id)}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={`dock-icon-image ${id === 'trash' ? 'dock-icon-image-archive' : ''} ${canOpen ? '' : 'opacity-60'}`}
                />
              </button>
            </div>
            <Tooltip
              anchorSelect={`#dock-icon-${id}`}
              content={name}
              place="top"
              className="tooltip pointer-events-none"
              positionStrategy="fixed"
              noArrow
              imperativeModeOnly
              isOpen={hoveredAppId === id}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dock
