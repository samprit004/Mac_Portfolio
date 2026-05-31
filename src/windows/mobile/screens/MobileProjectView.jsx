import useMobileWindowStore from '#store/mobileWindow.js'

const MobileProjectView = ({ project }) => {
  const { push } = useMobileWindowStore()

  const children = project?.children ?? []

  const handleFile = (file) => {
    if (file.fileType === 'txt') {
      push({
        id: `txt-${file.id}`,
        title: file.name,
        component: 'textfile',
        props: { file },
      })
      return
    }

    if (file.fileType === 'img') {
      push({
        id: `img-${file.id}`,
        title: file.name,
        component: 'imagefile',
        props: { file },
      })
      return
    }

    if (file.fileType === 'url' || file.fileType === 'fig') {
      if (file.href) window.open(file.href, '_blank', 'noopener')
    }
  }

  return (
    <div className="mob-project-view">
      {children.map((file) => (
        <button
          key={file.id}
          className="mob-project-file"
          onClick={() => handleFile(file)}
          aria-label={file.name}
        >
          <img
            src={file.icon ?? '/images/plain.png'}
            alt={file.name}
            className="mob-project-file-icon"
          />
          <div className="mob-project-file-info">
            <span className="mob-project-file-name">{file.name}</span>
            {file.fileType && (
              <span className="mob-project-file-type">{file.fileType.toUpperCase()}</span>
            )}
          </div>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mob-project-file-chevron" aria-hidden="true">
            <polyline points="1 1 7 7 1 13" />
          </svg>
        </button>
      ))}
    </div>
  )
}

export default MobileProjectView
