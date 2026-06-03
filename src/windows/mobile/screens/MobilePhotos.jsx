import useMobileWindowStore from '#store/mobileWindow.js'

const SECTIONS = [
  {
    id: 'samprit',
    label: 'Samprit',
    items: [
      { id: 'samprit-1', name: 'Samprit', imageUrl: '/images/samprit-1.jpg' },
      { id: 'samprit-2', name: 'Samprit', imageUrl: '/images/samprit-2.jpg' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    items: [
      { id: 'marg-sathi', name: 'Marg Sathi', imageUrl: '/images/marg_sathi.png' },
      { id: 'pocket-legal-aid', name: 'Pocket Legal Aid', imageUrl: '/images/pocket_legal_aid.png' },
      { id: 'freelance', name: 'Freelance', imageUrl: '/images/freelance.png' },
    ],
  },
  {
    id: 'diversion',
    label: 'Diversion',
    items: [
      { id: 'diversion-1', name: 'Diversion', imageUrl: '/images/diversion-1.jpeg' },
      { id: 'diversion-2', name: 'Diversion', imageUrl: '/images/diversion-2.jpeg' },
    ],
  },
  {
    id: 'sih',
    label: 'Smart India Hackathon',
    items: [
      { id: 'sih-1', name: 'Smart India Hackathon', imageUrl: '/images/sih-1.jpeg' },
      { id: 'sih-2', name: 'Smart India Hackathon', imageUrl: '/images/sih-2.jpeg' },
    ],
  },
  {
    id: 'trash',
    label: 'Trash',
    items: [
      { id: 'trash-1', name: 'Trash', imageUrl: '/images/trash-1.png' },
      { id: 'trash-2', name: 'Trash', imageUrl: '/images/trash-2.png' },
    ],
  },
]

const Tile = ({ item, onOpen, style = {} }) => (
  <button
    type="button"
    onClick={() => onOpen(item)}
    className="group relative block h-full w-full overflow-hidden text-left active:opacity-80"
    style={style}
  >
    <img
      src={item.imageUrl}
      alt={item.name}
      className="h-full w-full object-cover transition duration-200 group-active:scale-[0.98]"
      loading="lazy"
    />
  </button>
)

const GAP = 2

const PhotoGrid = ({ items, onOpen }) => {
  const count = items.length

  if (count === 1) {
    return (
      <div className="overflow-hidden rounded-xl shadow-sm" style={{ height: 190 }}>
        <Tile item={items[0]} onOpen={onOpen} />
      </div>
    )
  }

  if (count === 2) {
    return (
      <div
        className="overflow-hidden rounded-xl shadow-sm"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: GAP,
          height: 190,
          background: 'var(--window-content-bg)',
        }}
      >
        {items.map((item) => <Tile key={item.id} item={item} onOpen={onOpen} />)}
      </div>
    )
  }

  if (count === 3) {
    return (
      <div
        className="overflow-hidden rounded-xl shadow-sm"
        style={{
          display: 'flex',
          gap: GAP,
          height: 220,
          background: 'var(--window-content-bg)',
        }}
      >
        <div style={{ flex: 2 }}>
          <Tile item={items[0]} onOpen={onOpen} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: GAP }}>
          <div style={{ flex: 1 }}><Tile item={items[1]} onOpen={onOpen} /></div>
          <div style={{ flex: 1 }}><Tile item={items[2]} onOpen={onOpen} /></div>
        </div>
      </div>
    )
  }

  if (count === 4) {
    return (
      <div
        className="overflow-hidden rounded-xl shadow-sm"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: GAP,
          height: 260,
          background: 'var(--window-content-bg)',
        }}
      >
        {items.map((item) => <Tile key={item.id} item={item} onOpen={onOpen} />)}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
      <div
        className="overflow-hidden rounded-t-xl"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: GAP,
          height: 170,
          background: 'var(--window-content-bg)',
        }}
      >
        <Tile item={items[0]} onOpen={onOpen} />
        <Tile item={items[1]} onOpen={onOpen} />
        <Tile item={items[2]} onOpen={onOpen} />
      </div>
      <div
        className="overflow-hidden rounded-b-xl shadow-sm"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${items.slice(3).length}, 1fr)`,
          gap: GAP,
          height: 120,
          background: 'var(--window-content-bg)',
        }}
      >
        {items.slice(3).map((item) => <Tile key={item.id} item={item} onOpen={onOpen} />)}
      </div>
    </div>
  )
}

const MobilePhotos = () => {
  const { push } = useMobileWindowStore()

  const handleOpenImage = (item) => {
    push({
      id: `mobile-photo-${item.id}`,
      title: item.name,
      component: 'imagefile',
      props: {
        file: {
          name: item.name,
          imageUrl: item.imageUrl,
        },
      },
    })
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-y-auto overflow-x-hidden px-4 pb-8 pt-4 font-['SF_Pro_Text','SF_Pro_Display','-apple-system','BlinkMacSystemFont','Segoe_UI',sans-serif]"
      style={{ background: 'var(--window-content-bg)', color: 'var(--window-text)' }}
    >
      <div className="space-y-6">
        {SECTIONS.map((section, i) => (
          <section key={section.id}>
            {i > 0 && (
              <div className="mb-5 border-t" style={{ borderColor: 'var(--window-divider)' }} />
            )}

            <div className="mb-2.5 flex items-baseline justify-between">
              <h2
                className="text-[17px] font-bold leading-none tracking-[-0.3px]"
                style={{ color: 'var(--contact-title)' }}
              >
                {section.label}
              </h2>
              <span className="text-[10px] tabular-nums" style={{ color: 'var(--window-muted)' }}>
                {section.items.length} {section.items.length === 1 ? 'photo' : 'photos'}
              </span>
            </div>

            <PhotoGrid items={section.items} onOpen={handleOpenImage} />
          </section>
        ))}
      </div>

      <p className="pb-2 pt-8 text-center text-[10px]" style={{ color: 'var(--window-muted)' }}>
        {SECTIONS.reduce((acc, s) => acc + s.items.length, 0)} photos
      </p>
    </div>
  )
}

export default MobilePhotos
