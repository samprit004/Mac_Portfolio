import useMobileWindowStore from '#store/mobileWindow.js'
import MobileFinder from '../windows/mobile/screens/MobileFinder.jsx'
import MobileProjectView from '../windows/mobile/screens/MobileProjectView.jsx'
import MobileTextFile from '../windows/mobile/screens/MobileTextFile.jsx'
import MobileImageFile from '../windows/mobile/screens/MobileImageFile.jsx'
import MobileResume from '../windows/mobile/screens/MobileResume.jsx'
import MobileSafari from '../windows/mobile/screens/MobileSafari.jsx'
import MobileContact from '../windows/mobile/screens/MobileContact.jsx'
import MobileGmail from '../windows/mobile/screens/MobileGmail.jsx'
import MobilePhotos from '../windows/mobile/screens/MobilePhotos.jsx'
import MobileSkills from '../windows/mobile/screens/MobileSkills.jsx'
import MobileTimelineFile from '../windows/mobile/screens/MobileTimelineFile.jsx'

const SCREEN_MAP = {
  finder: MobileFinder,
  project: MobileProjectView,
  textfile: MobileTextFile,
  imagefile: MobileImageFile,
  resume: MobileResume,
  safari: MobileSafari,
  contact: MobileContact,
  gmail: MobileGmail,
  photos: MobilePhotos,
  skills: MobileSkills,
  timelinefile: MobileTimelineFile,
}

const ChevronLeft = () => (
  <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="8 1 2 7.5 8 14" />
  </svg>
)

const ListIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="6" y1="2" x2="17" y2="2" />
    <line x1="6" y1="7" x2="17" y2="7" />
    <line x1="6" y1="12" x2="17" y2="12" />
    <circle cx="2" cy="2" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="2" cy="7" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="2" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

const MobileWindowWrapper = () => {
  const { isOpen, stack, footerTabs, activeTabId, pop, close, switchTab } =
    useMobileWindowStore()

  if (!isOpen || stack.length === 0) return null

  const current = stack[stack.length - 1]
  const canGoBack = stack.length > 1
  const ScreenComponent = SCREEN_MAP[current.component]

  return (
    <div id="mobile-window">
      {/* ── Top navigation bar ── */}
      <div className="mob-win-nav">
        <button className="mob-win-back" onClick={pop} aria-label="Go back">
          <ChevronLeft />
          <span>{canGoBack ? 'Go back' : 'Go back'}</span>
        </button>

        <h2 className="mob-win-title">{current.title}</h2>

        <button className="mob-win-cancel" onClick={close} aria-label="Cancel">
          <ListIcon />
          <span>Cancel</span>
        </button>
      </div>

      {/* ── Scrollable content — each screen manages its own overflow ── */}
      <div className="mob-win-content">
        {ScreenComponent ? (
          <ScreenComponent {...(current.props ?? {})} />
        ) : (
          <p style={{ padding: '2rem', opacity: 0.5 }}>Screen not found: {current.component}</p>
        )}
      </div>

      {/* ── Footer tab bar — hidden when screen has no tabs ── */}
      {footerTabs.length > 0 && (
        <div className="mob-win-footer">
          {footerTabs.map((tab) => (
            <button
              key={tab.id}
              className={`mob-win-tab ${activeTabId === tab.id ? 'mob-win-tab--active' : ''}`}
              onClick={() => switchTab(tab.id)}
              aria-label={tab.label}
            >
              <img src={tab.icon} alt="" className="mob-win-tab-icon" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileWindowWrapper
