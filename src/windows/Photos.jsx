import { useMemo } from 'react'
import WindowControls from '#/components/WindowControls'
import WindowWrapper from '#/hoc/WindowWrapper'
import useWindowStore from '#/store/Window'
import { buildTimelineGroups } from './photos/timelineData.js'

const Photos = () => {
  const { openWindow } = useWindowStore()
  const timelineGroups = useMemo(() => buildTimelineGroups(), [])

  const handleOpenImage = (item) => {
    openWindow('imgfile', {
      name: item.name,
      imageUrl: item.imageUrl,
    })
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col font-['SF_Pro_Text','SF_Pro_Display','-apple-system','BlinkMacSystemFont','Segoe_UI',sans-serif]"
      style={{ background: 'var(--window-content-bg)', color: 'var(--window-text)' }}
    >
      <div
        id="window-header"
        className="relative flex h-[38px] shrink-0 items-center justify-center border-b"
        style={{ borderColor: 'var(--window-divider)', background: 'var(--contact-header-bg)' }}
      >
        <div className="absolute left-[10px]">
          <WindowControls target="photos" />
        </div>
        <span className="text-[13px] font-semibold tracking-[-0.1px]" style={{ color: 'var(--contact-title)' }}>
          Gallery
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div
          className="min-h-0 flex-1 overflow-y-auto px-5 py-5"
          style={{ background: 'var(--window-content-bg)', scrollBehavior: 'smooth' }}
        >
          <div className="space-y-8">
            {timelineGroups.map((group, index) => {
              const previousGroup = timelineGroups[index - 1]
              const showYear = !previousGroup || previousGroup.year !== group.year

              return (
                <div key={group.id}>
                  {showYear ? (
                    <div
                      className="mb-3 text-[28px] font-bold leading-none tracking-[-0.6px]"
                      style={{ color: 'var(--contact-title)' }}
                    >
                      {group.year}
                    </div>
                  ) : null}

                  <section className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[15px] font-semibold tracking-[-0.1px]" style={{ color: 'var(--window-text)' }}>
                          {group.date}
                        </p>
                        <p className="mt-1 text-[12px]" style={{ color: 'var(--window-muted)' }}>
                          {group.label}
                        </p>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: 'var(--window-muted)' }}>
                        {group.items.length} items
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {group.items.map((item) => (
                        <div key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleOpenImage(item)}
                            className="group relative aspect-square w-full overflow-hidden rounded-[18px] border text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                            style={{
                              borderColor: 'var(--window-divider)',
                              background: 'var(--window-subtle-bg)',
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 via-black/10 to-transparent px-3 py-2">
                              <p className="truncate text-[11px] font-medium text-white">{item.source}</p>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )
            })}
          </div>

          <div className="pb-2 pt-6 text-center text-[12px]" style={{ color: 'var(--window-muted)' }}>
            End of timeline
          </div>
        </div>
      </div>
    </div>
  )
}

const PhotosWindow = WindowWrapper(Photos, 'photos')

export default PhotosWindow
