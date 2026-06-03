import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import useThemeStore from '#store/theme.js'

const MobileStatusBar = () => {
  const { toggleTheme } = useThemeStore()
  const [time, setTime] = useState(dayjs().format('h:mm'))

  useEffect(() => {
    const timer = setInterval(() => setTime(dayjs().format('h:mm')), 10000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div id="mobile-status-bar">
      <time>{time}</time>

      <div className="mobile-status-icons">
        {/* Theme toggle — same icon as desktop nav */}
        <button
          className="mobile-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <img src="/icons/mode.svg" alt="toggle theme" className="nav-icon" width="16" height="16" />
        </button>

        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true">
          <rect x="0"    y="7"   width="3" height="5"  rx="0.5"/>
          <rect x="4.5"  y="4.5" width="3" height="7.5" rx="0.5"/>
          <rect x="9"    y="2"   width="3" height="10" rx="0.5"/>
          <rect x="13.5" y="0"   width="3" height="12" rx="0.5" opacity="0.35"/>
        </svg>

        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
          <circle cx="8" cy="11" r="1.5"/>
          <path d="M4.5 7.8C5.6 6.7 7 6 8.5 6C9.9 6 11.2 6.6 12.2 7.6L13.5 6.3C12.1 4.9 10.4 4 8.5 4C6.5 4 4.7 4.8 3.3 6.1L4.5 7.8Z" opacity="0.8"/>
          <path d="M1.5 4.8C3.2 3.1 5.5 2 8 2C10.5 2 12.8 3.1 14.4 4.8L15.6 3.5C13.7 1.5 11 0.3 8 0.3C5 0.3 2.3 1.5 0.5 3.5L1.5 4.8Z" opacity="0.5"/>
        </svg>

        {/* Battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="currentColor" aria-hidden="true">
          <rect x="0.5" y="0.5" width="21" height="12" rx="3.5" stroke="currentColor" strokeOpacity="0.35" fill="none"/>
          <rect x="2" y="2" width="14" height="9" rx="2"/>
          <path d="M23 4.5V8.5C24 8 24.5 7.1 24.5 6.5C24.5 5.9 24 5 23 4.5Z" opacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

export default MobileStatusBar
