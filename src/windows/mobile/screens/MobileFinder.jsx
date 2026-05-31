import { locations } from '#constants/index.js'
import useMobileWindowStore from '#store/mobileWindow.js'

const resumeShortcut = {
  id: 'resume-shortcut',
  name: 'Resume.pdf',
  icon: '/images/pdf.png',
  kind: 'file',
  fileType: 'pdf',
}

const skillsShortcut = {
  id: 'skills-shortcut',
  name: 'Skills',
  icon: '/icons/skills.svg',
  kind: 'file',
  fileType: 'skills',
}

const MobileFinder = ({ location = 'work' }) => {
  const { push } = useMobileWindowStore()

  const loc = locations[location]
  const baseItems = loc?.children ?? []
  const items = location === 'work'
    ? [...baseItems, resumeShortcut, skillsShortcut]
    : baseItems

  const handleItem = (item) => {
    if (item.fileType === 'skills') {
      push({ id: 'skills', title: 'Skills', component: 'skills', props: {} })
      return
    }

    if (item.kind === 'folder') {
      push({
        id: `project-${item.id}`,
        title: item.name,
        component: 'project',
        props: { project: item },
      })
      return
    }

    if (item.fileType === 'pdf' || item.id === 'resume-shortcut') {
      push({ id: 'resume', title: 'Resume.pdf', component: 'resume', props: {} })
      return
    }

    if (item.fileType === 'txt') {
      push({ id: `txt-${item.id}`, title: item.name, component: 'textfile', props: { file: item } })
      return
    }

    if (item.fileType === 'img') {
      push({ id: `img-${item.id}`, title: item.name, component: 'imagefile', props: { file: item } })
      return
    }

    if (item.fileType === 'url' || item.fileType === 'fig') {
      if (item.href) window.open(item.href, '_blank', 'noopener')
    }
  }

  return (
    <div className="mob-finder">
      {/* Search bar */}
      <div className="mob-finder-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <circle cx="10" cy="10" r="7" />
          <line x1="15" y1="15" x2="21" y2="21" />
        </svg>
        <span>Search</span>
        <svg className="mob-finder-mic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 10a7 7 0 0 0 14 0" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      </div>

      {/* Icon grid */}
      <div className="mob-finder-grid">
        {items.map((item) => (
          <button
            key={item.id}
            className="mob-finder-item"
            onClick={() => handleItem(item)}
            aria-label={item.name}
          >
            <img
              src={item.icon ?? '/images/folder.png'}
              alt={item.name}
              className="mob-finder-icon"
            />
            <span className="mob-finder-label">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileFinder
