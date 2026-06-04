import { useState, useEffect } from 'react'

const ExpandIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
)

const FullscreenPrompt = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!document.fullscreenElement) setVisible(true)
  }, [])

  const handleYes = () => {
    const el = document.documentElement
    try {
      if      (el.requestFullscreen)       el.requestFullscreen()
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
    } catch { /* silently ignore — iOS Safari doesn't support it */ }
    setVisible(false)
  }

  const handleNo = () => setVisible(false)

  if (!visible) return null

  return (
    <div id="fullscreen-prompt" role="dialog" aria-modal="true" aria-label="Fullscreen suggestion">
      <div className="fs-card">
        <div className="fs-icon-wrap">
          <ExpandIcon />
        </div>

        <h2 className="fs-title">Best Viewed in Fullscreen</h2>
        <p className="fs-desc">
          Enter fullscreen for the full macOS portfolio experience — no browser chrome, just the app.
        </p>

        <div className="fs-actions">
          <button className="fs-btn-primary" onClick={handleYes}>
            Yes, Enter Fullscreen
          </button>
          <button className="fs-btn-secondary" onClick={handleNo}>
            Continue Normally
          </button>
        </div>
      </div>
    </div>
  )
}

export default FullscreenPrompt
