import GitHubProfileMobile from '#/components/profiles/github/GitHubProfileMobile'

const BackIcon = () => (
  <svg width="11" height="18" viewBox="0 0 11 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 1 2 9 9 17" />
  </svg>
)
const ForwardIcon = () => (
  <svg width="11" height="18" viewBox="0 0 11 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="2 1 9 9 2 17" />
  </svg>
)
const ShareIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 13V3M5 7l4-4 4 4" />
    <path d="M1 14v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
)
const BookmarkIcon = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 2h12a1 1 0 0 1 1 1v15l-7-4-7 4V3a1 1 0 0 1 1-1z" />
  </svg>
)
const TabsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="5" width="13" height="14" rx="2.5" />
    <path d="M5 5V3.5A1.5 1.5 0 0 1 6.5 2h11A1.5 1.5 0 0 1 19 3.5v11a1.5 1.5 0 0 1-1.5 1.5H16" />
  </svg>
)
const LockIcon = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
    <rect x="1" y="5" width="8" height="7" rx="1.5" />
    <path d="M3 5V3.5a2 2 0 0 1 4 0V5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const MobileSafari = () => (
  <div className="mob-safari">
    {/* Scrollable GitHub content — mobile-specific layout */}
    <div className="mob-safari-content">
      <GitHubProfileMobile />
    </div>

    {/* iOS Safari footer: address bar + toolbar */}
    <div className="mob-safari-footer">
      <div className="mob-safari-address">
        <LockIcon />
        <span>github.com/samprit004</span>
      </div>

      <div className="mob-safari-toolbar">
        <button className="mob-safari-tool" aria-label="Back" disabled>
          <BackIcon />
        </button>
        <button className="mob-safari-tool" aria-label="Forward" disabled>
          <ForwardIcon />
        </button>
        <button className="mob-safari-tool" aria-label="Share" onClick={() => window.open('https://github.com/samprit004', '_blank', 'noopener')}>
          <ShareIcon />
        </button>
        <button className="mob-safari-tool" aria-label="Bookmarks">
          <BookmarkIcon />
        </button>
        <button className="mob-safari-tool" aria-label="Tabs">
          <TabsIcon />
        </button>
      </div>
    </div>
  </div>
)

export default MobileSafari
